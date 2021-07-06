import React from 'react';
import {Appearance, AppState, AppStateStatus, StatusBar, UIManager} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider, useTheme} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GlobalTheme} from './configs/GlobalTheme';
import {NavOption} from './configs/NavOption';
import {GlobalStore} from './redux/GlobalStore';
import Welcome from './components/Welcome';
import {GetNavTheme} from './configs/NavTheme';
import Home from './components/Home';
import {TaskActions} from './redux/actions/TaskActions';
import {TaskStorage} from './util/TaskStorage';

const Stack = createStackNavigator();

function MyNavigation() {
  const theme = useTheme().theme;
  return (
    <NavigationContainer theme={GetNavTheme(theme)}>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="Welcome"
        screenOptions={{...NavOption.centerFade}}
      >
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

class App extends React.Component {
  refreshTaskList = (state: AppStateStatus) => {
    TaskStorage.get().then(taskList => {
      GlobalStore.dispatch(TaskActions.SetTask(taskList));
    }).catch(ignore => {});
  };

  constructor(props) {
    super(props);
    GlobalStore.subscribe(() => {
      this.forceUpdate();
    });
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  public componentDidMount(): void {
    AppState.addEventListener('change', this.refreshTaskList);
  }

  public componentWillUnmount(): void {
    try {
      AppState.removeEventListener('change', this.refreshTaskList);
    } catch (ignore) {}
  }

  render() {
    const isDark = Appearance.getColorScheme() === 'dark';

    return (
      <SafeAreaProvider>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle={isDark ? 'light-content' : 'dark-content'}/>
        <ThemeProvider theme={isDark ? GlobalTheme.dark : GlobalTheme.light}>
          <MyNavigation/>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}

export default App;
