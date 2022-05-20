import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { match, P } from 'ts-pattern';
import { RequireAtLeastOne } from 'type-fest';

import { State } from '@store/store';
import { Todo } from '~types/api/todo';

// Require at least 1 property (no id)
type TodoUpdatePayload = RequireAtLeastOne<Omit<Todo, 'id'>, keyof Omit<Todo, 'id'>>;

const updateTodo = (todos: Todo[], query: P.Pattern<Todo>, updatePayload: TodoUpdatePayload): Todo[] =>
	todos.map(todo =>
		match(todo)
			.with(query, t => ({ ...t, ...updatePayload }))
			.otherwise(t => t)
	);

export enum LoadingState {
	IDLE = 'IDLE',
	LOADING = 'LOADING',
}

export interface ITodosStateSlice {
	todos: Todo[];
	status: LoadingState;
}

const initialState: ITodosStateSlice = {
	todos: [],
	status: LoadingState.IDLE,
};

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		fetchTodos: state => {
			state.status = LoadingState.LOADING;
		},
		fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
			state.status = LoadingState.IDLE;
			state.todos = action.payload;
		},
		fetchTodosFail: (state, action: PayloadAction<any>) => {
			// Log the error
			// TODO: handle this somehow
			console.error(action.payload);

			//  reset the state
			state.status = LoadingState.IDLE;
			state.todos = [];
		},

		updateTodo: (state, { payload: { id, ...payload } }: PayloadAction<TodoUpdatePayload & { id: Todo['id'] }>) => {
			state.status = LoadingState.LOADING;

			// Update data locally then execute the update api call via EPIC
			state.todos = updateTodo(state.todos, { id }, payload);
		},
		updateTodoSucces: (state, action: PayloadAction<Todo>) => {
			state.status = LoadingState.IDLE;

			// Update data locally with server response
			state.todos = updateTodo(state.todos, { id: action.payload.id }, action.payload);
		},
	},
});

export default todoSlice;

// Selectors

const getSlice = (s: State) => s.todo;

const getTodos = createSelector(getSlice, s => s.todos);

export const todosSelectors = {
	getTodos,
};
