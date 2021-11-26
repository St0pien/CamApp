import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import RadioButton from './RadioButton'
import {colors, defaults} from '../config';

const RadioGroup = ({ title, data, onChange }) => {
  if (!data) return null;

  if (!(data instanceof Array)) data = Object.keys(data);
  const [chosen, setChosen] = useState(defaults[title] ? defaults[title] : 0);
  const choose = index => {
    setChosen(index);
    onChange(title, data[index]);
  }

  useEffect(() => {
    choose(defaults[title] ? defaults[title] : 0);
  }, []);

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
