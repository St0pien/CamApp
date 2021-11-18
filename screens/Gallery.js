import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  FlatList,
  Dimensions,
  Text,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import { albumName, colors } from '../config';
import Button from '../components/Button';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome5 } from '@expo/vector-icons';
import PhotoItem from '../components/PhotoItem';
import { useFocusEffect } from '@react-navigation/native';

const Gallery = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [columnCount, setColumnCount] = useState(2);
  const [gridDisplay, setGridDisplay] = useState(true);
  const [selectionMode, setSelectionMode] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(false);

  const loadAssets = async (add = false) => {
    setLoadingAssets(true);
    if (!add) deselect();
    const createdBefore = add && photos.length > 0 ? photos[photos.length-1].creationTime : null;
    let album = await MediaLibrary.getAlbumAsync(albumName);
    if (!album) {
      setPhotos([]);
      setLoadingAssets(false);
      return;
    }
    const assets = await MediaLibrary.getAssetsAsync({
      album,
      first: 20,
      mediaType: 'photo',
      sortBy: 'creationTime',
      createdBefore,
    });

    setLoadingAssets(false);
    console.log(photos);
    if (add) {
      setPhotos([...photos, ...assets.assets]);
      return;
    }
    setPhotos(assets.assets);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await loadAssets();
        } catch {}
      })();

      return () => {
        setPhotos([]);
      };
    }, [])
  );

  useEffect(() => {
    const handler = BackHandler.addEventListener('hadrwareBackPress', () => {
      if (selectionMode) {
        deselect();
        return true;
      }
      return false;
    });

    return () => handler.remove();
  }, [selectionMode]);

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
    if (!selectionMode) setSelectionMode(true);
    const buf = [...photos];
    const photo = buf.find((p) => p.id == id);
    photo.selected = !photo.selected;
    setPhotos(buf);
  };

  const deselect = () => {
    setSelectionMode(false);
    const buf = [...photos];
    buf.forEach((p) => (p.selected = false));
    setPhotos(buf);
  };

  const onDelete = () => {
    const selected = photos.filter(p => p.selected);
    if (selected.length === 0) {
      ToastAndroid.show(
        'Select image!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    (async () => {
      try {
        await MediaLibrary.deleteAssetsAsync(selected);
        await loadAssets();
      } catch {}
    })();
  };

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
        onEndReached={() => loadAssets(true)}
        onEndReachedTreshold={0.1}
        renderItem={({ item }) => (
          <PhotoItem
            item={item}
            width={gridDisplay ? itemHeight : null}
            height={itemHeight}
            navigation={navigation}
            onSelect={onSelect}
            selectMode={selectionMode}
          />
        )}
      />
      {loadingAssets ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={colors.primaryDark}
          animating={loadingAssets}
        />
      ) : null}
      {selectionMode ? (
        <Button onPress={deselect} style={styles.modal}>
          <Text style={styles.modalTxt}>Selecting images</Text>
        </Button>
      ) : null}
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
    flex: 1,
    margin: 15
  },
  txt: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center'
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTxt: {
    width: '80%',
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.primaryDark,
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Nunito_bold'
  },
  loader: {
    height: 80,
    transform: [
      {
        scaleX: 1.5
      },
      {
        scaleY: 1.5
      }
    ]
  }
});
