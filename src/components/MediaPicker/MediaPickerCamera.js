import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppState,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import cameraIcon from '../../assets/icons/camera.png';

function MediaPickerCamera() {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    checkPermissions();
  }, [devices]);

  useEffect(() => {
    AppState.addEventListener('focus', () => {
      checkPermissions();
    });
  }, []);

  const checkPermissions = () => {
    Camera.getCameraPermissionStatus().then(status => {
      if (status === 'authorized') {
        setHasPermission(true);
      }
    });
  };

  const requestPermissions = async () => {
    Camera.requestCameraPermission()
      .then(async res => {
        if (res === 'denied') {
          Alert.alert(
            'Camera Permissions',
            'To use camera you need to enable camera in settings',
            [
              {
                text: 'Goto Settings',
                onPress: () => Linking.openSettings(),
              },
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
            ],
          );
        } else if (res === 'authorized') {
          setHasPermission(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderWithoutCamera = () => (
    <View style={styles.errorContainer}>
      <Pressable onPress={requestPermissions}>
        <Text style={styles.enableButtonText}>Allow Camera</Text>
      </Pressable>
    </View>
  );

  if (hasPermission) {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
        <Image style={styles.iconStyle} source={cameraIcon} />
      </View>
    );
  } else {
    return renderWithoutCamera();
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enableButtonText: {
    color: '#06c',
  },
  iconStyle: {
    width: 27,
    height: 27,
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default MediaPickerCamera;
