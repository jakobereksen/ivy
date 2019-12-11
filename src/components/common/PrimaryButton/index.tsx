import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import colors from '../../../colors';

const PrimaryButton = ({
  onPress,
  label,
  outline,
}: {
  onPress: () => void;
  label: string;
  outline?: boolean;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.base, outline ? styles.outline : styles.normal]}>
        <Text
          style={[
            styles.baseLabel,
            outline ? styles.outlineLabel : styles.normalLabel,
          ]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 50,
    width: 240,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outline: {borderColor: colors.primary, borderWidth: 2},
  normal: {backgroundColor: colors.primary},
  baseLabel: {fontFamily: 'OpenSans-SemiBold', fontSize: 18},
  outlineLabel: {color: colors.primary},
  normalLabel: {color: colors.background},
});

export default PrimaryButton;
