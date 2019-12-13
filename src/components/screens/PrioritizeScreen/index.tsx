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
  Alert,
} from 'react-native';
import Back from './assets/back.png';
import colors from '../../../colors';
import PrimaryButton from '../../common/PrimaryButton';
import DraggableFlatList from 'react-native-draggable-flatlist';

const PrioritizeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonContainer}>
          <Image source={Back} />
        </TouchableOpacity>
        <Text style={styles.title}>Prioritize</Text>
        <View style={styles.backButtonContainer} />
      </View>
      <View style={styles.outerListContainer}>
        <View style={styles.listContainer}>
          <View style={styles.numberLabelContainer}>
            <Text style={styles.numberLabel}>1</Text>
            <Text style={styles.numberLabel}>2</Text>
            <Text style={styles.numberLabel}>3</Text>
            <Text style={styles.numberLabel}>4</Text>
            <Text style={styles.numberLabel}>5</Text>
            <Text style={styles.numberLabel}>6</Text>
          </View>

          <View
            style={{
              height: Dimensions.get('window').height > 600 ? 420 : 360,
              width: 210,
            }}>
            <DraggableFlatList
              data={[
                'close deal',
                'do other stuff',
                'somethung',
                'cook',
                'study',
                'somethi',
              ]}
              renderItem={renderItem}
              keyExtractor={(item, index) => `draggable-item-${item}`}
              onDragEnd={({data}) => {}}
            />
          </View>
          <View style={styles.numberLabelContainer} />
        </View>
      </View>

      <PrimaryButton onPress={() => {}} label="Continue" />
    </SafeAreaView>
  );
};

const renderItem = ({item, index, drag, isActive}) => {
  return <DragItem label={item} drag={drag} isActive={isActive} />;
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
        <Text style={styles.dragItemLabel}>{label}</Text>
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
    marginBottom: 20,
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
});

export default PrioritizeScreen;
