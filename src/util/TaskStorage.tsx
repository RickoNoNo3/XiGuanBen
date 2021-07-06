import AsyncStorage from '@react-native-async-storage/async-storage';
import {TaskType} from '../components/TaskInput';

export const TaskStorage = {
  get: async () => {
    const res = await AsyncStorage.getItem('taskList');
    if (res == null) return undefined;
    return JSON.parse(res) as TaskType[];
  },
  set: async (taskList: TaskType[]) => {
    let res = false;
    await AsyncStorage.setItem('taskList', JSON.stringify(taskList)).then(() => {
      res = true;
    }).catch(ignore => {
      res = false;
    });
    return res;
  },
};
