import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../config';

const RadioButton = ({ isActive }) => {
  return (
    <View style={styles.radioContainer}>
      {isActive ? <View style={styles.radioFiller}></View> : null}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioContainer: {
    width: 35,
    height: 35,
    borderRadius: 100,
    borderColor: colors.primaryDark,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioFiller: {
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: colors.primaryDark
  }
});
