import React, {Fragment, useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ReturnKeyType,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import colors from '../../../colors';
import {useSelector} from 'react-redux/lib/hooks/useSelector';
import {useDispatch} from 'react-redux/lib/hooks/useDispatch';
import {AppState, Phase} from '../../../logic/model';
import {
  setTaskTextAction,
  addTaskAction,
  removeTaskAction,
  setPhaseAction,
} from '../../../logic/actions';
import PrimaryButton from '../../common/PrimaryButton';
import {NavigationStackScreenProps} from 'react-navigation-stack';

const WriteScreen = ({navigation}: NavigationStackScreenProps) => {
  const tasks = useSelector((state: AppState) => state.tasks);
  const dispatch = useDispatch();

  const refContainers = [...Array(6)].map(() => useRef(null));
  const scrollViewRefContainer = useRef(null);

  const canContinue = tasks.length === 6 && tasks[5].text !== '';

  useEffect(() => {
    if (canContinue) {
      scrollViewRefContainer.current.scrollToEnd();
    }
  }, [canContinue]);

  const goToNextPhase = () => {
    dispatch(setPhaseAction({phase: Phase.prioritize}));
    navigation.navigate('prioritize');
  };

  return (
    <Fragment>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Write down six tasks {'\n'}for tomorrow
            </Text>
            <View style={{height: 50, width: 50}}>
              <AnimatedCircularProgress
                size={50}
                width={4}
                fill={(100 / 6) * tasks.filter(task => task.text !== '').length}
                lineCap="round"
                tintColor={colors.primary}
                backgroundColor={colors.background}>
                {fill => (
                  <Text style={styles.progressText}>
                    {Math.round(fill / (100 / 6))}/6
                  </Text>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContentContainer}
            ref={scrollViewRefContainer}
            keyboardShouldPersistTaps="handled">
            {tasks.map((task, index) => {
              return (
                <TaskInput
                  key={task.key}
                  onChangeText={text => {
                    dispatch(setTaskTextAction({text, index}));
                  }}
                  value={task.text}
                  textInputRef={refContainers[index]}
                  returnKeyType={index === 5 ? 'done' : 'next'}
                  onSubmitEditing={() => {
                    if (
                      refContainers[index + 1] &&
                      refContainers[index + 1].current
                    ) {
                      refContainers[index + 1].current.focus();
                    } else if (index < 5) {
                      dispatch(
                        addTaskAction({task: {text: '', isDone: false}}),
                      );
                    } else if (
                      tasks.filter(task => task.text === '').length === 0
                    ) {
                      goToNextPhase();
                    }
                  }}
                  onKeyPress={event => {
                    if (
                      event.nativeEvent.key === 'Backspace' &&
                      task.text === '' &&
                      index > 0
                    ) {
                      dispatch(removeTaskAction({index}));
                      refContainers[index - 1].current.focus();
                    }
                  }}
                />
              );
            })}
            {tasks.length < 6 ? (
              <AddTaskButton
                onPress={() => {
                  dispatch(addTaskAction({task: {text: '', isDone: false}}));
                }}
              />
            ) : null}
          </ScrollView>
          {tasks.length === 6 &&
          tasks.filter(task => task.text === '').length === 0 ? (
            <View style={styles.nextButtonContainer}>
              <PrimaryButton
                label="Next"
                onPress={() => {
                  goToNextPhase();
                }}
              />
            </View>
          ) : null}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Fragment>
  );
};

const AddTaskButton = ({onPress}: {onPress: () => void}) => (
  <TouchableOpacity onPress={onPress} style={styles.addTaskButtonContainer}>
    <Text style={styles.addTaskButton}>+ next Task</Text>
  </TouchableOpacity>
);

const TaskInput = ({
  onChangeText,
  value,
  textInputRef,
  onSubmitEditing,
  returnKeyType,
  onKeyPress,
}: {
  onChangeText?: (text: string) => void;
  value: string;
  textInputRef: any;
  onSubmitEditing: () => void;
  returnKeyType: ReturnKeyType;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
}) => (
  <View style={styles.taskInputContainer}>
    <View style={styles.dot} />
    <TextInput
      onChangeText={onChangeText}
      value={value}
      style={styles.taskInputText}
      numberOfLines={1}
      placeholder="enter Task"
      ref={textInputRef}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      autoFocus
      onKeyPress={onKeyPress}
      placeholderTextColor={colors.textLight}
    />
    <View style={{width: 10}} />
  </View>
);

const styles = StyleSheet.create({
  nextButtonContainer: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  scrollView: {
    alignSelf: 'stretch',
    flex: 1,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  taskInputText: {
    color: colors.textDark,
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    width: 180,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: colors.textDark,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  addTaskButton: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: colors.primary,
  },
  addTaskButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 24,
    color: colors.secondary,
  },
  progressText: {fontFamily: 'OpenSans-Bold', fontSize: 18},
});

export default WriteScreen;
