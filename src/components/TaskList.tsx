import React from 'react';
import TaskInput, {TaskType} from './TaskInput';
import {useTheme} from 'react-native-elements';

export default function TaskList({disabled, taskList, onChange}: {
  taskList?: TaskType[],
  disabled?: boolean,
  onChange?: (taskList: TaskType[], index: number) => void,
}) {
  const {theme} = useTheme();
  return (<TaskInput disabled={disabled} theme={theme} taskList={taskList} onChange={onChange}/>);
}

