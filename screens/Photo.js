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

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: route.params.item.uri }} />
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
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});
