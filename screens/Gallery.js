import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  FlatList,
  Dimensions
} from 'react-native';
import { colors } from '../config';
import Button from '../components/Button';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome5 } from '@expo/vector-icons';
import PhotoItem from '../components/PhotoItem';
import { useFocusEffect } from '@react-navigation/native';

const Gallery = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [columnCount, setColumnCount] = useState(2);
  const [gridDisplay, setGridDisplay] = useState(true);

  const loadAssets = async () => {
    const assets = await MediaLibrary.getAssetsAsync({
      first: 30,
      mediaType: 'photo',
      sortBy: 'creationTime'
    });

    setPhotos(assets.assets);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await loadAssets();
      })();

      return () => {
        setPhotos([]);
      }
    }, [])
  );

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.showWithGravity(
          'Permission to Gallery denied',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        return;
      }

      await loadAssets();

      const width = Dimensions.get('window').width;
      if (width > 400) {
        setColumnCount(3);
      }
      if (width > 768) {
        setColumnCount(4);
      }
    })();
  }, []);
  const itemHeight = Dimensions.get('window').width / columnCount;

  const onSelect = (id) => {
    const buf = [...photos];
    const photo = buf.find(p => p.id === id);
    photo.selected = !photo.selected;
    setPhotos(buf);
  };

  const onDelete = () => {
    const selected = photos.filter(p => p.selected);
    if (selected.length === 0) {
      ToastAndroid.show('Select image!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      return;
    }

    (async () => {
      await MediaLibrary.deleteAssetsAsync(selected);
      await loadAssets();
    })();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.btn} onPress={() => setGridDisplay(!gridDisplay)}>
          {gridDisplay ? (
            <FontAwesome5 style={styles.txt} name={'list'} />
          ) : (
            <FontAwesome5 style={styles.txt} name={'th'} />
          )}
        </Button>
        <Button
          style={styles.btn}
          onPress={() => navigation.navigate('Camera')}
        >
          <FontAwesome5 style={styles.txt} name={'camera'} />
        </Button>
        <Button style={styles.btn} onPress={onDelete}>
          <FontAwesome5 style={styles.txt} name={'trash'} />
        </Button>
      </View>
      <FlatList
        numColumns={gridDisplay ? columnCount : 1}
        key={columnCount + gridDisplay}
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PhotoItem
            item={item}
            width={gridDisplay ? itemHeight : null}
            height={itemHeight}
            navigation={navigation}
            onSelect={onSelect}
          />
        )}
      />
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btn: {
    flex: 1
  },
  txt: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center'
  }
});
