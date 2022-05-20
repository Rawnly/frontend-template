import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic } from './epic';
import todoSlice from './features/todo/todo.duck';

const epicMiddleware = createEpicMiddleware({
	dependencies: {},
});

export const store = configureStore({
	middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
	devTools: true,
	reducer: {
		todo: todoSlice.reducer,
	},
});

epicMiddleware.run(rootEpic);

export const makeStore = (): typeof store => store;

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
