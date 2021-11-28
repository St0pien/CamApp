import { useState } from 'react';
import { Camera } from 'expo-camera';
import { ToastAndroid } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function usePhotoTaking(cameraRef) {
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [photoInProgress, setPhotoInProgress] = useState(false);

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

  return { cameraType, photoInProgress, reverse, takePhoto };
}
