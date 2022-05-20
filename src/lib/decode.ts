import * as OE from 'fp-ts-rxjs/lib/ObservableEither';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { Decoder, Errors } from 'io-ts';

export const decodeError = (e: Errors): Error => {
	const missingKeys = e.map(e => e.context.map(({ key }) => key).join('.'));
	return new Error(`${missingKeys}`);
};

export const decode =
	<T, U = unknown>(decoder: Decoder<U, T>) =>
	(response: U): TE.TaskEither<Error, T> =>
		pipe(TE.fromEither(decoder.decode(response)), TE.mapLeft(decodeError));

export const decode$ =
	<T, U = unknown>(decoder: Decoder<U, T>) =>
	(response: U): OE.ObservableEither<Error, T> =>
		pipe(TE.fromEither(decoder.decode(response)), TE.mapLeft(decodeError), OE.fromTaskEither);
