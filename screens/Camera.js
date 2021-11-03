import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ToastAndroid, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CircleButton from '../components/CircleButton';
import {colors} from '../config';

const CameraScreen = ({ navigation }) => {
  const [permGranted, setPermGranted] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [photoInProgress, setPhotoInProgress] = useState(false);

  useEffect(() => {
    (async () => {
      setPermGranted(
        (await Camera.requestCameraPermissionsAsync()).status === 'granted'
      );
    })();
  }, []);

  const cameraRef = useRef(null);

  const reverse = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePhoto = () => {
    if (!cameraRef.current) return;
    if (photoInProgress) return;

    (async () => {
      setPhotoInProgress(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0,
        base64: false,
        exif: false
      });
      ToastAndroid.show(
        'Photo taken',
        ToastAndroid.CENTER,
        ToastAndroid.CENTER
      );
      await MediaLibrary.createAssetAsync(photo.uri);
      ToastAndroid.show(
        'Photo saved',
        ToastAndroid.CENTER,
        ToastAndroid.CENTER
      );
      setPhotoInProgress(false);
    })();
  };

  // render
  if (permGranted) {
    return (
      <View style={styles.container}>
        <Camera
          autoFocus={Camera.Constants.AutoFocus.off}
          type={cameraType}
          style={styles.camera}
          ref={cameraRef}
        ></Camera>
        <CircleButton
          onPress={takePhoto}
          style={styles.addBtn}
          name="circle"
          size={50}
        />
        <CircleButton
          onPress={reverse}
          style={styles.revBtn}
          name="undo-alt"
          size={30}
        />
        <ActivityIndicator style={styles.loader} size="large" color={colors.primary} animating={photoInProgress} />
      </View>
    );
  } else if (permGranted === false) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorTxt}>
          You have denied access to your camera
        </Text>
      </View>
    );
  } else {
    return null;
  }
};

export default CameraScreen;

const styles = StyleSheet.create({
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  errorTxt: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    fontSize: 32
  },
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  addBtn: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    width: 80,
    height: 80
  },
  revBtn: {
    position: 'absolute',
    bottom: 40,
    left: '20%',
    width: 70,
    height: 70
  },
  loader: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: '40%',
    left: '50%',
    transform: [
      {
        translateX: -50
      },
      {
        scale: 2
      }
    ]
  }
});
