import { combineEpics } from 'redux-observable';

import { todosEpics } from './features/todo/epics';

export const rootEpic = combineEpics(todosEpics);
