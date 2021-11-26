import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CircleButton from '../components/CircleButton';
import { colors, defaults } from '../config';
import Toolbar from '../components/Toolbar';

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

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [animateSettings, setAnimateSettings] = useState(false);
  const toggleSettings = () => {
    setAnimateSettings(true);
    setSettingsVisible(!settingsVisible);
  };

  const [settings, setSettings] = useState({});
  const [activeSettings, setActiveSettings] = useState({});

  const onSettingsSet = (title, value) => {
    const buf = JSON.parse(JSON.stringify(activeSettings));
    buf[title] = value;
    setActiveSettings(buf);
  };

  useEffect(() => {
    (async () => {
      if (!activeSettings.Ratios) return;
      const sizes = await cameraRef.current.getAvailablePictureSizesAsync(activeSettings.Ratios);
      const buf = JSON.parse(JSON.stringify(settings));
      buf.Sizes = sizes;
      setSettings(buf);
    })();
  }, [activeSettings])

  const cameraReady = () => {
    (async () => {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();
      const sizes = await cameraRef.current.getAvailablePictureSizesAsync(ratios[defaults.Ratios]);
      setSettings({
        'Flash Mode': Camera.Constants.FlashMode,
        'White Balance': Camera.Constants.WhiteBalance,
        Ratios: ratios,
        Sizes: sizes
      });
    })();
  };

  // render
  if (permGranted) {
    return (
      <View style={styles.container}>
        <Toolbar
          visible={settingsVisible}
          animate={animateSettings}
          settings={settings}
          onSettingsSet={onSettingsSet}
        />
        <Camera
          onCameraReady={cameraReady}
          type={cameraType}
          style={styles.camera}
          ref={cameraRef}
          flashMode={activeSettings['Flash Mode']}
          whiteBalance={activeSettings['White Balance']}
          ratio={activeSettings['Ratios']}
          pictureSize={activeSettings['Sizes']}
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
        <CircleButton
          onPress={toggleSettings}
          style={styles.settingsBtn}
          name="cog"
          size={30}
        />
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={colors.primary}
          animating={photoInProgress}
        />
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
    height: 80,
    transform: [
      {
        translateX: -40
      }
    ]
  },
  revBtn: {
    position: 'absolute',
    bottom: 40,
    left: '15%',
    width: 70,
    height: 70
  },
  settingsBtn: {
    position: 'absolute',
    bottom: 40,
    right: '15%',
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
