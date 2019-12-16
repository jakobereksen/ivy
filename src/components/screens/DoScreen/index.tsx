import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Animated,
  Image,
  Easing,
  Alert,
} from 'react-native';
import colors from '../../../colors';
import PrimaryButton from '../../common/PrimaryButton';
import Checkmark from './assets/checkmark.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {useSelector} from 'react-redux/lib/hooks/useSelector';
import {useDispatch} from 'react-redux/lib/hooks/useDispatch';
import {AppState, Phase} from '../../../logic/model';
import {
  toggleTaskStateAction,
  setTasksAction,
  setPhaseAction,
} from '../../../logic/actions';

const DoScreen = ({navigation}: NavigationStackScreenProps) => {
  const tasks = useSelector((state: AppState) => state.tasks);
  const dispatch = useDispatch();

  const hasCompletedAllTasks = tasks.filter(item => !item.isDone).length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Get things done</Text>
      </View>

      <View style={styles.listContainer}>
        {tasks.map((task, index) => {
          let state = TaskState.ToDo;

          if (task.isDone) {
            state = TaskState.Done;
          }
          let nextUpIndex = 0;
          for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            if (!element.isDone) {
              nextUpIndex = index;
              break;
            }
            nextUpIndex = -1;
          }

          if (nextUpIndex === index) {
            state = TaskState.UpNext;
          }

          return (
            <ListItem
              state={state}
              label={task.text}
              key={index}
              onPress={() => {
                dispatch(toggleTaskStateAction({index}));
              }}
            />
          );
        })}
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label="Plan next day"
          onPress={() => {
            const goToNextScreen = () => {
              const remainingTasks = tasks.filter(task => !task.isDone);

              if (remainingTasks.length === 0) {
                remainingTasks.push({text: '', isDone: false, key: 0});
              }

              dispatch(setTasksAction({tasks: remainingTasks}));
              dispatch(setPhaseAction({phase: Phase.write}));
              navigation.navigate('write');
            };

            if (!hasCompletedAllTasks) {
              Alert.alert(
                'Are you sure?',
                'You have not yet completed all tasks.',
                [
                  {
                    text: 'Plan next day',
                    onPress: goToNextScreen,
                    style: 'default',
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
            } else {
              goToNextScreen();
            }
          }}
          outline={!hasCompletedAllTasks}
        />
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
  const [opacity] = React.useState(new Animated.Value(0.5));
  const [checkBoxColor] = React.useState(new Animated.Value(0));
  const [lineWidth] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    switch (state) {
      case TaskState.Done:
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(checkBoxColor, {
            duration: 400,
            toValue: 0,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(lineWidth, {
            duration: 600,
            toValue: 1,
            easing: Easing.inOut(Easing.ease),
          }),
        ]).start();
        break;

      case TaskState.UpNext:
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(checkBoxColor, {
            duration: 400,
            toValue: 1,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(lineWidth, {
            duration: 600,
            toValue: 0,
            easing: Easing.inOut(Easing.ease),
          }),
        ]).start();

        break;

      case TaskState.ToDo:
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(checkBoxColor, {
            duration: 400,
            toValue: 0,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(lineWidth, {
            duration: 400,
            toValue: 0,
            easing: Easing.inOut(Easing.ease),
          }),
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
            width: 240,
          },
          {opacity},
        ]}>
        <View style={{width: 25}} />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            numberOfLines={1}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              maxWidth: 170,
              width: '100%',
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
          <Animated.View
            style={[
              {
                height: 2,
                backgroundColor: colors.textDark,
                opacity: 0.7,
                borderRadius: 1,
                position: 'absolute',
                top: 14,
              },
              {
                width: lineWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
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
