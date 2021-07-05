import {combineReducers, createStore} from 'redux';
import {AppReducer} from './reducers/AppReducer';

export const GlobalStore = createStore(combineReducers({
  app: AppReducer,
}));
