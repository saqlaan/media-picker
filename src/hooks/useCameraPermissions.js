import { useEffect, useState } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Alert, Linking } from 'react-native';

function useCameraPermissions() {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    checkPermissions();
  }, [devices]);

  const checkPermissions = () => {
    Camera.getCameraPermissionStatus().then(status => {
      if (status === 'authorized') {
        setHasPermission(true);
      }
    });
  };

  const requestPermission = async () => {
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

  return {
    hasPermission,
    requestPermission,
    device,
  };
}

export default useCameraPermissions;
