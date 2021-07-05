import {Action} from 'redux';
import {ActionEnum} from '../ActionEnum';

export interface ExitAction extends Action {
  // Timeout of force exiting
  timeout: number
}

export interface UnexitAction extends Action {
}

export const CreateExitAction = (timeout: number = 3000): ExitAction => {
  return {
    type: ActionEnum.APP_EXIT,
    timeout,
  };
};

export const CreateUnexitAction = (): UnexitAction => {
  return {
    type: ActionEnum.APP_UNEXIT,
  };
};

export type ExitActionType = ExitAction | UnexitAction;

