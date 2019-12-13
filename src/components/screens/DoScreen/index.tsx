import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Animated,
  Alert,
  Image,
} from 'react-native';
import colors from '../../../colors';
import PrimaryButton from '../../common/PrimaryButton';
import Checkmark from './assets/checkmark.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Get things done</Text>
      </View>

      <View style={styles.listContainer}>
        <ListItem state={TaskState.Done} label="done" />

        <ListItem state={TaskState.Done} label="upnext" />

        <ListItem state={TaskState.UpNext} label="todo" />

        <ListItem state={TaskState.ToDo} label="todo" />
        <ListItem state={TaskState.ToDo} label="todo" />
        <ListItem state={TaskState.ToDo} label="todo" />
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton label="Plan next day" onPress={() => {}} outline />
      </View>
    </SafeAreaView>
  );
};

enum TaskState {
  Done = 'DONE',
  UpNext = 'UPNEXT',
  ToDo = 'TODO',
}

const ListItem = ({
  state,
  label,
  onPress,
}: {
  state: TaskState;
  label: string;
  onPress: () => void;
}) => {
  const [opacity] = React.useState(new Animated.Value(0));
  const [checkBoxColor] = React.useState(new Animated.Value(0));

  const [lineWidth] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    switch (state) {
      case TaskState.Done:
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 1000,
          }),
          Animated.timing(checkBoxColor, {duration: 1000, toValue: 0}),
          Animated.timing(lineWidth, {duration: 1000, toValue: 100}),
        ]).start();
        break;

      case TaskState.UpNext:
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
          }),
          Animated.timing(checkBoxColor, {duration: 1000, toValue: 1}),
          Animated.timing(lineWidth, {duration: 1000, toValue: 0}),
        ]).start();

        break;

      case TaskState.ToDo:
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 1000,
          }),
          Animated.timing(checkBoxColor, {duration: 1000, toValue: 0}),
          Animated.timing(lineWidth, {duration: 1000, toValue: 0}),
        ]).start();

        break;
    }
  }, [state]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
          },
          {opacity},
        ]}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              width: 210,
              fontFamily:
                state === TaskState.UpNext
                  ? 'OpenSans-SemiBold'
                  : 'OpenSans-Regular',
              fontSize: 18,
              color: colors.textDark,
              textAlign: 'center',
            }}>
            {label}
          </Text>

          <View style={{width: 25}} />

          <Animated.View
            style={[
              {
                height: 2,
                backgroundColor: colors.textDark,
                borderRadius: 1,
                position: 'absolute',
                top: 14,
              },
              {width: lineWidth},
            ]}
          />
        </View>

        <Animated.View
          style={[
            {
              height: 25,
              width: 25,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            },
            {
              backgroundColor: checkBoxColor.interpolate({
                inputRange: [0, 1],
                outputRange: [colors.inactiveDark, colors.primary],
              }),
            },
          ]}>
          {state === TaskState.Done ? <Image source={Checkmark} /> : null}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignSelf: 'stretch', alignItems: 'center'},
  header: {
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 24,
    color: colors.secondary,
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingBottom: 20,
  },
});

export default DoScreen;
