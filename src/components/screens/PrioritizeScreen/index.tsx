import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Back from './assets/back.png';
import colors from '../../../colors';
import PrimaryButton from '../../common/PrimaryButton';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {useSelector, useDispatch} from 'react-redux';
import {AppState, Phase} from '../../../logic/model';
import {setTasksAction, setPhaseAction} from '../../../logic/actions';
import PushNotification from 'react-native-push-notification';

const messages = [
  {title: 'Hey', message: `Dont't forget to plan your next day.`},
  {title: 'We gotcha', message: `Remember planning tomorrows tasks.`},
  {
    title: 'Feeling good?',
    message: `Focus that energy into planning tomorrow.`,
  },
];

const scheduleReminder = () => {
  var {message, title} = messages[Math.floor(Math.random() * messages.length)];
  const today = new Date();
  const date = new Date(today);
  date.setDate(date.getDate() + 1);
  date.setHours(19.5, 0, 0, 0);

  PushNotification.cancelAllLocalNotifications();
  PushNotification.localNotificationSchedule({
    title,
    message,
    date,
  });
};

const PrioritizeScreen = ({navigation}: NavigationStackScreenProps) => {
  const tasks = useSelector((state: AppState) => state.tasks);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => {
            navigation.goBack(null);
          }}>
          <Image source={Back} />
        </TouchableOpacity>
        <Text style={styles.title}>Prioritize</Text>
        <View style={styles.backButtonContainer} />
      </View>
      <View style={styles.outerListContainer}>
        <View style={styles.listContainer}>
          <View style={styles.numberLabelContainer}>
            {[...Array(6).keys()]
              .map(x => x + 1)
              .map(item => (
                <Text style={styles.numberLabel} key={item}>
                  {item}
                </Text>
              ))}
          </View>

          <View
            style={{
              height: Dimensions.get('window').height > 600 ? 420 : 360,
              width: 210,
            }}>
            <DraggableFlatList
              data={tasks}
              renderItem={renderItem}
              keyExtractor={item => 'some-key-' + item.key}
              onDragEnd={({data}) => {
                dispatch(setTasksAction({tasks: data}));
              }}
            />
          </View>
          <View style={styles.numberLabelContainer} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={() => {
            dispatch(setPhaseAction({phase: Phase.do}));
            navigation.navigate('do');
            scheduleReminder();
          }}
          label="Continue"
        />
      </View>
    </SafeAreaView>
  );
};

const renderItem = ({item, index, drag, isActive}) => {
  return <DragItem label={item.text} drag={drag} isActive={isActive} />;
};

const DragItem = ({
  label,
  drag,
  isActive,
}: {
  label: string;
  drag: () => void;
  isActive: boolean;
}) => {
  const [opacity] = React.useState(new Animated.Value(1));
  const [scale] = React.useState(new Animated.Value(1));

  React.useEffect(() => {
    if (isActive) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 200,
        }),
        Animated.timing(scale, {duration: 400, toValue: 1.1}),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
        }),
        Animated.timing(scale, {duration: 400, toValue: 1}),
      ]).start();
    }
  }, [isActive]);

  return (
    <TouchableOpacity onPressIn={drag} activeOpacity={1}>
      <Animated.View style={[styles.dragItem, {opacity, transform: [{scale}]}]}>
        <Text style={styles.dragItemLabel} numberOfLines={1}>
          {label}
        </Text>
        <View style={styles.dragIndicator} />
      </Animated.View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  dragItem: {
    width: 210,
    height: 50,
    marginTop: Dimensions.get('window').height > 600 ? 10 : 5,
    marginBottom: Dimensions.get('window').height > 600 ? 10 : 5,
    backgroundColor: colors.inactiveLight,
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dragItemLabel: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    color: '#737373',
    maxWidth: 150,
    width: '100%',
  },
  dragIndicator: {
    width: 18,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 24,
    color: colors.secondary,
  },
  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonContainer: {width: 10},
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberLabelContainer: {
    width: 45,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  numberLabel: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: colors.secondary,
  },
  outerListContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingBottom: 20,
  },
});

export default PrioritizeScreen;
