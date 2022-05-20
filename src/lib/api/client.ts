import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as OE from 'fp-ts-rxjs/ObservableEither';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

import { SerializedError, serializeError } from '~types/api/general';

import { client } from './init';

export const request = <T, D = unknown>(
	url: string,
	config: AxiosRequestConfig<D> = {}
): OE.ObservableEither<SerializedError, T> =>
	pipe(
		TE.tryCatch(
			() =>
				client.request<T, AxiosResponse<T>, D>({
					url,
					...config,
				}),
			error => (error instanceof Error ? serializeError(error) : serializeError(new Error('Unknown Error')))
		),
		TE.map(r => r.data),
		OE.fromTaskEither
	);

const get = <T>(url: string, config: AxiosRequestConfig = {}) => request<T>(url, { ...config, method: 'GET' });

const post = <T, D = unknown>(url: string, payload?: D, config: AxiosRequestConfig<D> = {}) =>
	request<T>(url, { ...config, method: 'POST', data: payload });

const put = <T, D = unknown>(url: string, payload?: D, config: AxiosRequestConfig<D> = {}) =>
	request<T>(url, { ...config, method: 'PUT', data: payload });

const _delete = <T, D = unknown>(url: string, payload?: D, config: AxiosRequestConfig<D> = {}) =>
	request<T>(url, { ...config, method: 'DELETE', data: payload });

const api = {
	get,
	post,
	put,
	delete: _delete,
	request,
};

export default api;
