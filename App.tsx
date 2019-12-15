/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import OnboardingScreen from './src/components/screens/OnboardingScreen';
import WriteScreen from './src/components/screens/WriteScreen';
import PrioritizeScreen from './src/components/screens/PrioritizeScreen';
import DoScreen from './src/components/screens/DoScreen';
import {Provider} from 'react-redux';
import store from './src/logic';
import {createAppContainer} from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {gesturesEnabled: false},
    },
    write: {
      screen: WriteScreen,
      navigationOptions: {gesturesEnabled: false},
    },
    prioritize: {
      screen: PrioritizeScreen,
    },
    do: {
      screen: DoScreen,
      navigationOptions: {gesturesEnabled: false},
    },
  },
  {
    initialRouteName: 'prioritize',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
