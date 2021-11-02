import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../config';

const PhotoItem = ({ item, height, width, navigation, onSelect, selectMode }) => {
  const { id, uri, selected } = item;

  const onPress = () => {
    if (selectMode) {
      onSelect(id);
      return;
    }
    navigation.navigate('Photo', { item });
  };
  
  const onLongPress = () => {
    onSelect(id);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        ...styles.container,
        height: height,
        maxWidth: width,
      }}
    >
      <Image style={styles.img} source={{ uri }} />
      <Text style={styles.label}>
        {id}
        {selected}
      </Text>
      {selected ? (
        <View style={styles.checkContainer}>
          <FontAwesome5
            style={styles.check}
            style={styles.check}
            name="check-circle"
            solid
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    borderRadius: 10
  },
  img: {
    flex: 1,
    borderRadius: 10
  },
  label: {
    position: 'absolute',
    color: 'white',
    fontFamily: 'Nunito_bold',
    bottom: 15,
    right: 15,
    fontSize: 18
  },
  checkContainer: {
    position: 'absolute',
    top: 0,
    borderRadius: 10,
    left: 0,
    margin: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colors.primaryDark}80`
  },
  check: {
    fontSize: 80,
    color: colors.primary
  }
});
