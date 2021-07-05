import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, FullTheme, Text, useTheme} from 'react-native-elements';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {GlobalStore} from '../redux/GlobalStore';

class Welcome extends Component<{
  theme: Partial<FullTheme>,
  navigation: StackNavigationProp<any>,
}, {
  taskCnt: number,
}> {
  state = {
    taskCnt: 0,
  };

  public componentDidMount(): void {
    const taskCnt = 2;
    if (taskCnt) {
      this.setState({
        taskCnt,
      });
    } else {
      this.gotoReading();
    }
  }

  gotoMemorizing = () => {
    this.props.navigation.replace('Home', {
      directly: false,
      taskCnt: this.state.taskCnt,
    });
  };

  gotoReading = () => {
    this.props.navigation.replace('Home', {
      directly: true,
    });
  };

  render() {
    if (this.state.taskCnt <= 0) {
      return null;
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.theme.colors?.primary,
          paddingTop: getStatusBarHeight(),
          paddingBottom: getBottomSpace(),
        }}
      >
        <Text
          h3
          style={{
            flex: 2,
            textAlign: 'center',
            textAlignVertical: 'bottom',
            paddingBottom: '20%',
          }}
        >
          您当前有 {this.state.taskCnt} 个任务
        </Text>
        <View
          style={{
            flex: 3,
            alignItems: 'center',
          }}
        >
          <Button
            title="回忆任务"
            containerStyle={{
              marginBottom: 10,
              backgroundColor: this.props.theme.colors?.secondary,
            }}
            onPress={this.gotoMemorizing}
          />
          <Button
            title="直接查看"
            onPress={this.gotoReading}
          />
        </View>
      </View>
    );
  }
}

export default () => (<Welcome navigation={useNavigation()} theme={useTheme().theme}/>);
