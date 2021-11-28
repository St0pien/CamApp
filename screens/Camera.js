import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { Camera } from 'expo-camera';
import CircleButton from '../components/CircleButton';
import { colors } from '../config';
import Toolbar from '../components/Toolbar';
import { Dimensions } from 'react-native';
import CameraSettingsContext from '../contexts/CameraSettingsContext';
import usePhotoTaking from '../utils/photoTaking';
import useCameraSettings from '../utils/cameraSettings';

const CameraScreen = () => {
  const [permGranted, setPermGranted] = useState(null);

  useEffect(() => {
    (async () => {
      setPermGranted(
        (await Camera.requestCameraPermissionsAsync()).status === 'granted'
      );
    })();
  }, []);

  const cameraRef = useRef(null);

  const { cameraType, photoInProgress, takePhoto, reverse } = usePhotoTaking(cameraRef);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [animateSettings, setAnimateSettings] = useState(false);
  const toggleSettings = () => {
    setAnimateSettings(true);
    setSettingsVisible(!settingsVisible);
  };

  const { settings, activeSettings, changeSettings, cameraReady } = useCameraSettings(cameraRef);

  // render
  if (permGranted) {
    let width = '100%',
      height = '100%';
    if (activeSettings.Ratios) {
      const [x, y] = activeSettings.Ratios.split(':');
      width = Dimensions.get('window').width;
      height = (width * x) / y;
    }

    return (
      <CameraSettingsContext.Provider value={{ activeSettings, settings, changeSettings }}>
        <View style={styles.container}>
          <Toolbar
            visible={settingsVisible}
            animate={animateSettings}
          />
          <Camera
            onCameraReady={cameraReady}
            type={cameraType}
            style={{ width, height }}
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
      </CameraSettingsContext.Provider>
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
    flex: 1,
    backgroundColor: 'black'
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
