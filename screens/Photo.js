import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import CircleButton from '../components/CircleButton';
import {colors} from '../config';

const Photo = ({ navigation, route }) => {
  const share = async () => {
    Sharing.shareAsync(route.params.item.uri);
  }

  const deleteItem = async () => {
    try {
      await MediaLibrary.deleteAssetsAsync(route.params.item);
      navigation.goBack();
    } catch{}
  }

  const width = route.params.item.width;
  const height = route.params.item.height;
  const bigger = width < height ? height : width;
  const smaller = width > height ? height : width;

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: route.params.item.uri }} />
      <Text style={styles.sizeLabel}>{bigger} x {smaller}</Text>
      <View style={styles.buttons}>
        <CircleButton onPress={share} name="share-alt" size={50} />
        <CircleButton onPress={deleteItem} name="trash" size={50} />
      </View>
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.dark
  },
  img: {
    flex: 3,
    borderRadius: 20
  },
  sizeLabel: {
    fontSize: 24,
    paddingVertical: 10,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: 'Nunito'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});
