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
import {
  createStackNavigator,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import OnboardingScreen from './src/components/screens/OnboardingScreen';
import WriteScreen from './src/components/screens/WriteScreen';
import PrioritizeScreen from './src/components/screens/PrioritizeScreen';
import DoScreen from './src/components/screens/DoScreen';
import {Provider} from 'react-redux';
import configureStore from './src/logic';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {StyleSheet, View} from 'react-native';
import colors from './src/colors';
import {useSelector} from 'react-redux/lib/hooks/useSelector';
import {AppState, Phase} from './src/logic/model';

const {store, persistor} = configureStore();

const InitialScreen = ({navigation}: NavigationStackScreenProps) => {
  const hasCompletedOnboarding = useSelector(
    (state: AppState) => state.hasCompletedOnBoarding,
  );
  const phase = useSelector((state: AppState) => state.phase);

  console.log(phase, hasCompletedOnboarding);

  if (!hasCompletedOnboarding) {
    navigation.navigate('onboarding');
  } else {
    switch (phase) {
      case Phase.do:
        navigation.navigate('do');
        break;
      case Phase.write:
        navigation.navigate('write');
        break;
      case Phase.prioritize:
        navigation.navigate('prioritize');
        break;
    }
  }

  return <View style={styles.view} />;
};

const styles = StyleSheet.create({
  view: {flex: 1, alignSelf: 'stretch', backgroundColor: colors.background},
});

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
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const RootNavigator = createSwitchNavigator({
  initial: {
    screen: InitialScreen,
    navigationOptions: {gesturesEnabled: false},
  },
  app: AppNavigator,
});

const AppContainer = createAppContainer(RootNavigator);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);

export default App;
