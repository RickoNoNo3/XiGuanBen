import React, {Component} from 'react';
import {Animated, View} from 'react-native';
import {Button, FullTheme, Text, useTheme} from 'react-native-elements';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {TaskStorage} from '../util/TaskStorage';
import {TaskType} from './TaskInput';
import {Colors} from '../configs/GlobalTheme';

class Welcome extends Component<{
  theme: Partial<FullTheme>,
  navigation: StackNavigationProp<any>,
}, {
  taskCnt: number,
  taskList?: TaskType[],
}> {
  state = {
    taskCnt: 0,
    taskList: [] as TaskType[],
    ani: {
      opacity: new Animated.Value(0),
    },
  };

  public componentDidMount(): void {
    setTimeout(() => {
      TaskStorage.get().then(taskList => {
        const taskCnt = (taskList ?? []).length;
        this.setState({
          taskCnt,
          taskList,
        }, () => {
          if (taskCnt <= 0) {
            this.gotoReading();
          } else {
            Animated.timing(this.state.ani.opacity, {
              useNativeDriver: false,
              toValue: 1,
              duration: 200,
            }).start();
          }
        });
      }).catch(ignore => {});
    }, 600);
  }

  gotoMemorizing = () => {
    this.props.navigation.replace('Home', {
      directly: false,
      taskCnt: this.state.taskCnt,
      taskList: this.state.taskList,
    });
  };

  gotoReading = () => {
    this.props.navigation.replace('Home', {
      directly: true,
      taskList: this.state.taskList,
    });
  };

  render() {
    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: this.props.theme.colors?.primary,
          paddingTop: getStatusBarHeight(),
          paddingBottom: getBottomSpace(),
          opacity: this.state.ani.opacity,
        }}
      >
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-end',
            paddingBottom: '20%',
          }}
        >
          <Text h3 style={{textAlign: 'center'}}>
            您当前有 {this.state.taskCnt} 个任务
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            alignItems: 'center',
          }}
        >
          <Button
            title="回忆任务"
            containerStyle={{
              marginBottom: 20,
              backgroundColor: this.props.theme.colors?.secondary,
            }}
            onPress={this.gotoMemorizing}
          />
          <Button
            title="直接查看"
            containerStyle={{
              // backgroundColor: Colors.red,
            }}
            onPress={this.gotoReading}
          />
        </View>
      </Animated.View>
    );
  }
}

export default () => (<Welcome navigation={useNavigation()} theme={useTheme().theme}/>);
