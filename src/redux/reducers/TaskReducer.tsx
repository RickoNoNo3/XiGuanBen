import {Reducer} from 'redux';
import {TaskState} from '../states/TaskState';
import {TaskActions, TaskActionsType} from '../actions/TaskActions';
import {ActionEnum} from '../ActionEnum';

export const TaskReducer: Reducer<TaskState, TaskActionsType> = (state, action) => {
  let newState = {...(state ?? new TaskState())};
  switch (action.type) {
    case ActionEnum.TASK_SET: {
      newState.taskList = (action as TaskActions.SetTaskAction).taskList;
      break;
    }
  }
  return newState;
};

