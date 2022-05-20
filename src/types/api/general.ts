import * as t from 'io-ts';

import { isAxiosError } from '~types/guards';

export const SerializedError = t.type({
	detail: t.string,
	errorCode: t.string,
	status: t.number,
	title: t.string,
});

export type SerializedError = t.TypeOf<typeof SerializedError>;

export const serializeError = (error: Error): SerializedError => {
	if (isAxiosError(error)) {
		const r = error.response?.data ?? {};

		if (SerializedError.is(r)) {
			return r;
		}

		return {
			detail: error.message,
			errorCode: 'UNKNOWN',
			status: error.response?.status ?? 500,
			title: 'Unknown error',
		};
	}

	return {
		detail: error.message,
		errorCode: 'UNKNOWN',
		status: 500,
		title: 'Unknown error',
	};
};

export const unknownError: SerializedError = serializeError(new Error('Unknown error'));
