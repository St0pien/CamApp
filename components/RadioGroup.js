import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import RadioButton from './RadioButton'
import {colors} from '../config';

const RadioGroup = ({ title, data, chosen, onChange }) => {
  if (!data) return null;

  if (!(data instanceof Array)) data = Object.keys(data);
  const index = data.indexOf(chosen);
  chosen = index > -1 ? index : 0;
  const choose = index => {
    onChange(title, data[index]);
  }

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {data.map((item, index) => (
        <TouchableOpacity key={Math.random()} onPress={() => choose(index)} style={styles.entry}>
          <RadioButton isActive={index == chosen} />
          <Text style={styles.label}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default RadioGroup

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontSize: 36,
    margin: 10,
    fontFamily: 'Nunito_bold'
  },
  entry: {
    marginTop: 10,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginLeft: 20,
    fontFamily: 'Nunito'
  }
})
