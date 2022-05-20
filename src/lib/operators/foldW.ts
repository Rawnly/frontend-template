import * as E from 'fp-ts/Either';
import { OperatorFunction, map } from 'rxjs';

const foldW = <E, T, E1 = E, T1 = T>(
	onError: (err: E) => E1,
	onSuccess: (data: T) => T1
): OperatorFunction<E.Either<E, T>, E1 | T1> => map(E.foldW(onError, onSuccess));

export default foldW;
