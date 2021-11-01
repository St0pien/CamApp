import React from 'react'
import { StyleSheet } from 'react-native'
import Button from './Button'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import {colors} from '../config';

const CircleButton = (props) => {
  return (
    <Button style={{...props.style, ...styles.btn}} onPress={props.onPress}>
      <FontAwesome5 style={{ ...styles.ico, fontSize: props.size }} name={props.name} solid/>
    </Button>
  )
}

export default CircleButton

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.dark,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ico: {
    color: colors.primary
  }
})
