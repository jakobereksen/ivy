import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../../colors';

const CarousselProgress = ({
  progress,
  dotCount,
}: {
  progress: number;
  dotCount: number;
}) => {
  return (
    <View style={styles.container}>
      {Array.from(Array(dotCount)).map((item, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dotBase,
              index === progress ? styles.dotSelected : styles.dotUnselected,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dotBase: {
    height: 10,
    width: 10,
    borderRadius: 10,
    margin: 5,
  },
  dotSelected: {
    backgroundColor: colors.primary,
  },
  dotUnselected: {backgroundColor: colors.inactiveDark},
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default CarousselProgress;
