import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const PhotoItem = ({
  item,
  height,
  width,
  navigation,
  onSelect,
}) => {
  const { id, uri, selected } = item;

  const onPress = () => {
    navigation.navigate('Photo', { item });
  };

  const onLongPress = () => {
    onSelect(id);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ ...styles.container, height: height, maxWidth: width, backgroundColor: selected ? 'red' : '' }}
    >
      <Image style={styles.img} source={{ uri }} />
      <Text style={styles.label}>{id}{selected}</Text>
    </TouchableOpacity>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10
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
  }
});
