import React from 'react';
import TaskInput from './TaskInput';
import {useTheme} from 'react-native-elements';

export default function Memorizing(props) {
  const {theme} = useTheme();
  return (<TaskInput {...props} theme={theme} taskList={[{text: 'awd'}, {text: '1'}]}/>);
}

