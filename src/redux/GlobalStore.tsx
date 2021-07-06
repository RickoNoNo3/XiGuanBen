import {combineReducers, createStore} from 'redux';
import {TaskReducer} from './reducers/TaskReducer';

export const GlobalStore = createStore(combineReducers({
  task: TaskReducer,
}));
