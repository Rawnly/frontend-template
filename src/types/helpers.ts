export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

export type Expect<T extends true> = T;

export type With<T, K extends keyof T, U extends T[K]> = T & {
	[P in K]: U;
};

export type KeysOfType<T, T1> = {
	[P in keyof T]: T[P] extends T1 ? P : never;
}[keyof T];

export type NullableKeys<T> = T extends Record<string, unknown> ? { [P in keyof T]: T[P] | null } : T | null;

export type Nullable<T> = T | null;

export type Identifiable<T = number> = {
	id: T;
};

export type StateFromFunctions<T extends [...any]> = T extends [infer F, ...infer R]
	? F extends (...args: any) => unknown
		? StateFromFunctions<R> & ReturnType<F>
		: unknown
	: unknown;

export type Mapper<T, U> = (item: T) => U;

export type RemoveFunctionProps<T> = {
	[K in keyof T as T[K] extends () => unknown ? never : K]: T[K];
};

export type Entry<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T];

export type Prefix<T, K extends string | symbol | number> = {
	[P in K]: T;
};

export type Fn = (...args: any) => any;
export type OmitFilter<T extends object, U> = {
	[K in keyof T as T[K] extends U ? never : K]: T[K];
};
