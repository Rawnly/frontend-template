import { type SetStateAction } from 'react';

import { Fn } from '~types/helpers';

type GetStateTypeFromAction<T> = T extends SetStateAction<infer U> ? U : never;

export function getActionValue<T>(action: T, value: GetStateTypeFromAction<T>): GetStateTypeFromAction<T> {
	return action instanceof Function ? action(value) : action;
}

type MakeFunctional = <T extends Fn>(...params: Parameters<T>) => (fn: T) => ReturnType<T>;

export const executePrev: MakeFunctional =
	(...params) =>
	fn =>
		fn(...params);
