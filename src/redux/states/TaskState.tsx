import {TaskType} from '../../components/TaskInput';

export class TaskState {
  constructor(
    public taskList?: TaskType[],
  ) {}
}
