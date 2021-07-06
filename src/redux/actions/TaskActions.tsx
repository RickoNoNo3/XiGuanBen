import {Action} from 'redux';
import {ActionEnum} from '../ActionEnum';
import {TaskType} from '../../components/TaskInput';

export namespace TaskActions {
  export interface SetTaskAction extends Action {
    taskList: TaskType[]
  }

  export const SetTask = (taskList: TaskType[] = []): SetTaskAction => {
    return {
      type: ActionEnum.TASK_SET,
      taskList,
    };
  };
}

export type TaskActionsType = TaskActions.SetTaskAction;

