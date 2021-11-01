import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Camera } from 'expo-camera';

const CameraScreen = () => {
    const [permGranted, setPermGranted] = useState(null);

    useEffect(() => {
        (async () => {
            setPermGranted((await Camera.requestCameraPermissionsAsync()).status === 'granted');
        })();
    }, []);

    const cameraRef = useRef();

    if (permGranted) {
        return (
            <Camera style={styles.camera} ref={cameraRef}></Camera>
        )
    } else if (permGranted === false) {
        return (
            <View style={styles.error}>
                <Text style={styles.errorTxt}>You have denied access to your camera</Text>
            </View>
        )
    } else {
        return null;
    }
}

export default CameraScreen

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
        fontSize: 32,
    },
    camera: {
        flex: 1
    }
})
