import React, {Component, RefObject} from 'react';
import {FlatList, NativeSyntheticEvent, Text, TextInput, TextInputKeyPressEventData, View} from 'react-native';
import {FullTheme, useTheme} from 'react-native-elements';

export type TaskType = {
  text: string,
}

class TaskInputInner extends Component<{
  theme: Partial<FullTheme>,
  taskList?: TaskType[],
  disabled?: boolean,
  onChange?: (taskList: TaskType[], index: number) => void,
}, {
  taskList: TaskType[],
}> {
  inputRef: RefObject<TextInput>[] = [React.createRef<TextInput>()];

  state = {
    taskList: [{text: ''}],
  };

  public componentDidMount(): void {
    if (this.props.taskList && this.props.taskList.length !== 0) {
      this.inputRef.splice(0);
      for (let i = 0; i < this.props.taskList.length; i++) {
        this.inputRef.push(React.createRef<TextInput>());
      }
      this.setState({
        taskList: this.props.taskList,
      });
    }
  }

  handleKeyPressCreator = (index: number): ((e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void) => {
    return (e) => {
      if (e.nativeEvent.key !== 'Backspace') return;
      if (index === 0) return;
      if (this.state.taskList[index].text !== '') return;
      let {taskList} = this.state;
      taskList.splice(index, 1);
      this.inputRef.splice(index, 1);
      this.setState({
        taskList,
      }, () => {
        this.inputRef[index - 1].current?.focus();
        if (this.props.onChange) {
          this.props.onChange(taskList, index);
        }
      });
    };
  };

  handleSubmitCreator = (index: number): (() => void) => {
    return () => {
      let {taskList} = this.state;
      taskList.splice(index + 1, 0, {text: ''});
      this.inputRef.splice(index + 1, 0, React.createRef<TextInput>());
      this.setState({
        taskList,
      }, () => {
        this.inputRef[index + 1].current?.focus();
        if (this.props.onChange) {
          this.props.onChange(taskList, index);
        }
      });
    };
  };

  handleOnChangeCreator = (index: number): (text: string) => void => {
    return (text) => {
      let {taskList} = this.state;
      taskList[index] = {text};
      this.setState({
        taskList,
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(taskList, index);
        }
      });
    };
  };

  render() {
    return (
      <FlatList
        style={{
          flex: 1,
        }}
        data={this.state.taskList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={info => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: '#9994',
              borderTopWidth: info.index === 0 ? 0 : 1,
              height: 43,
            }}
          >
            <Text
              style={{
                color: this.props.theme.colors?.text,
                marginLeft: 10,
                marginRight: 5,
              }}
            >
              ●
            </Text>
            {
              this.props.disabled ? (
                <Text
                  style={{
                    color: this.props.theme.colors?.text,
                    fontSize: 15,
                    flex: 1,
                  }}
                >
                  {this.state.taskList[info.index].text}
                </Text>
              ) : (
                <TextInput
                  defaultValue={this.state.taskList[info.index].text}
                  style={{
                    color: this.props.theme.colors?.text,
                    fontSize: 15,
                    flex: 1,
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                  }}
                  ref={this.inputRef[info.index]}
                  blurOnSubmit={false}
                  onSubmitEditing={this.handleSubmitCreator(info.index)}
                  onKeyPress={this.handleKeyPressCreator(info.index)}
                  onChangeText={this.handleOnChangeCreator(info.index)}
                />
              )
            }
          </View>
        )}
      />
    );
  }
}

export default function TaskInput({disabled, taskList, onChange}: {
  taskList?: TaskType[],
  disabled?: boolean,
  onChange?: (taskList: TaskType[], index: number) => void,
}) {
  const {theme} = useTheme();
  return (<TaskInputInner disabled={disabled} theme={theme} taskList={taskList} onChange={onChange}/>);
}
