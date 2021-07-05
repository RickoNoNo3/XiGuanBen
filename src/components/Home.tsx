// noinspection JSUnreachableSwitchBranches

import React, {Component} from 'react';
import {Animated, AppState, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FAB, FullTheme, Header, Icon, useTheme} from 'react-native-elements';
import {Route, useRoute} from '@react-navigation/native';
import Memorizing from './Memorizing';
import {getBottomSpace} from 'react-native-iphone-x-helper';

enum StatusEnum {
  Memorizing,
  Checking,
  Reading,
}

class Home extends Component<{
  navigation: StackNavigationProp<any>,
  theme: Partial<FullTheme>
  route: Route<any, any>
}, {
  status: StatusEnum,
}> {
  goingNext: boolean = false;

  state = {
    status: StatusEnum.Memorizing,
    ani: {
      checkingFlex: new Animated.Value(0),
      checkingDisplay: false,
      memoryFlex: new Animated.Value(10),
      memoryDisplay: true,
      dividerHeight: new Animated.Value(10),
      dividerDisplay: true,
    },
  };

  public componentDidMount(): void {
    if (this.props.route.params?.directly) {
      this.setState({
        status: StatusEnum.Reading,
      });
    }
    AppState.addEventListener('blur', () => {
      this.props.navigation.replace('Welcome');
    });
  }

  next = () => {
    if (this.goingNext) return;
    this.goingNext = true;
    setTimeout(() => {
      this.goingNext = false;
    }, 500);
    switch (this.state.status) {
      case StatusEnum.Memorizing:
        const newState = {...this.state};
        newState.ani.checkingDisplay = true;
        this.setState(newState, () => {
          Animated.timing(this.state.ani.checkingFlex, {
            useNativeDriver: false,
            toValue: 15,
            duration: 200,
          }).start();
          this.setState({
            status: StatusEnum.Checking,
          });
        });
        break;
      case StatusEnum.Checking:
        Animated.parallel([
          Animated.timing(this.state.ani.memoryFlex, {
            useNativeDriver: false,
            toValue: 1,
            duration: 200,
          }),
          Animated.timing(this.state.ani.dividerHeight, {
            useNativeDriver: false,
            toValue: 0,
            duration: 200,
          }),
        ]).start(() => {
          const newState = {...this.state};
          newState.ani.memoryDisplay = false;
          newState.ani.dividerDisplay = false;
          this.setState(newState, () => {
            this.setState({
              status: StatusEnum.Reading,
            });
          });
        });
        break;
    }
  };

  renderHeaderTitle = () => {
    switch (this.state.status) {
      case StatusEnum.Memorizing: {
        return `回忆 ${this.props.route.params?.taskCnt} 个任务`;
      }
      case StatusEnum.Checking: {
        return `检查回忆`;
      }
      case StatusEnum.Reading: {
        return `任务列表`;
      }
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.theme.colors?.background,
          // paddingTop: getStatusBarHeight(), 有Header
          paddingBottom: getBottomSpace(),
        }}
      >
        <Header
          centerComponent={{text: this.renderHeaderTitle()}}
          containerStyle={{
            borderBottomWidth: 0,
          }}
        />
        <Animated.View
          style={{
            flex: this.state.ani.memoryFlex,
            display: this.state.ani.memoryDisplay ? 'flex' : 'none',
          }}
        >
          <Memorizing disabled={this.state.status !== StatusEnum.Memorizing}/>
        </Animated.View>
        <Animated.View
          style={{
            flex: this.state.ani.checkingFlex,
            display: this.state.ani.checkingDisplay ? 'flex' : 'none',
          }}
        >
          <Animated.View style={{
            display: this.state.ani.dividerDisplay ? 'flex' : 'none',
            height: this.state.ani.dividerHeight,
            width: '100%',
            backgroundColor: this.props.theme.colors?.primary,
          }}/>
          <Memorizing disabled={this.state.status !== StatusEnum.Reading}/>
        </Animated.View>
        <FAB
          style={{
            display: this.state.status === StatusEnum.Reading ? 'none' : 'flex',
            position: 'absolute',
            bottom: 15,
            right: 15,
          }}
          useForeground={true}
          iconPosition="right"
          icon={<Icon name="chevron-right"/>}
          title="下一步"
          titleStyle={{color: this.props.theme.colors?.text}}
          containerStyle={{
            borderWidth: 0,
            display: this.state.status === StatusEnum.Reading ? 'none' : 'flex',
            backgroundColor: this.props.theme.colors?.primary,
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
          buttonStyle={{
            backgroundColor: 'transparent',
          }}
          onPress={this.next}
        />
      </View>
    );
  }
}

export default (props) => <Home {...props} theme={useTheme().theme} route={useRoute()}/>;
