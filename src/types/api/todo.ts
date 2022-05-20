import * as t from 'io-ts';

const Todo = t.type({
	id: t.number,
	title: t.string,
	completed: t.boolean,
	userId: t.number,
});

type Todo = t.TypeOf<typeof Todo>;

export { Todo };
