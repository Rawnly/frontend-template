import { combineEpics, Epic } from 'redux-observable';
import { catchError, of, filter, mergeMap } from 'rxjs';

import api from '@lib/api/client';
import { foldW } from '@lib/operators';
import { unknownError } from '~types/api/general';
import { Todo } from '~types/api/todo';

import todoSlice from './todo.duck';

const fetchTodos: Epic = action$ =>
	action$.pipe(
		filter(todoSlice.actions.fetchTodos.match),
		mergeMap(() =>
			api.get<Todo[]>('/todos').pipe(
				foldW(todoSlice.actions.fetchTodosFail, todoSlice.actions.fetchTodosSuccess),
				catchError(() => of(todoSlice.actions.fetchTodosFail(unknownError)))
			)
		)
	);

const updateTodo: Epic = action$ =>
	action$.pipe(
		filter(todoSlice.actions.updateTodo.match),
		mergeMap(({ payload }) =>
			api.put<Todo>(`/todos/${payload.id}`, payload).pipe(
				foldW(todoSlice.actions.fetchTodos, todoSlice.actions.updateTodoSucces),
				catchError(() => of(todoSlice.actions.fetchTodosFail(unknownError)))
			)
		)
	);

export const todosEpics = combineEpics(fetchTodos, updateTodo);
