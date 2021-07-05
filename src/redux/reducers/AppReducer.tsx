import {Reducer} from 'redux';
import {AppState} from '../states/AppState';
import {ExitAction, ExitActionType} from '../actions/ExitActions';
import {ActionEnum} from '../ActionEnum';

export const AppReducer: Reducer<AppState, ExitActionType> = (state, action) => {
  let newState = {...(state ?? new AppState())};
  switch (action.type) {
    case ActionEnum.APP_EXIT: {
      newState.exiting = true;
      newState.exitingTimeout = (action as ExitAction).timeout;
      break;
    }
    case ActionEnum.APP_UNEXIT: {
      newState.exiting = false;
      newState.exitingTimeout = 0;
      break;
    }
  }
  return newState;
};

