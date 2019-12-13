import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import colors from '../../../colors';

const WriteScreen = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
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
                fill={30}
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
            contentContainerStyle={styles.scrollViewContentContainer}>
            <TaskInput value={'qwe'} />
            <TaskInput value={'qwe'} />
            <TaskInput value={'qwe'} />
            <AddTaskButton onPress={() => {}} />
          </ScrollView>
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
}: {
  onChangeText?: (text: string) => void;
  value: string;
}) => (
  <View style={styles.taskInputContainer}>
    <View style={styles.dot} />
    <TextInput
      onChangeText={onChangeText}
      value={value}
      style={styles.taskInputText}
    />
    <View style={{width: 10}} />
  </View>
);

const styles = StyleSheet.create({
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
