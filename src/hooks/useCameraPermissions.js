import { useEffect, useState } from 'react';
import { request, PERMISSIONS, check } from 'react-native-permissions';
import { Alert, Linking, AppState } from 'react-native';
import { isAndroid } from '../utils.js/constants';

function useCameraPermissions() {
  const [hasPermission, setHasPermission] = useState(false);
  const CAMERA_PERMISSION = isAndroid
    ? PERMISSIONS.ANDROID.CAMERA
    : PERMISSIONS.IOS.CAMERA;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkPermissions();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = () => {
    check(CAMERA_PERMISSION).then(status => {
      if (status === 'granted') {
        setHasPermission(true);
      }
    });
  };

  const requestPermission = async () => {
    request(CAMERA_PERMISSION).then(async res => {
      if (res === 'unavailable' || res === 'denied') {
        Alert.alert(
          'Camera Permission',
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
      } else if (res == 'blocked') {
        Alert.alert(
          'Camera Permission',
          'Camera blocked. Please allow camera permissions in the settings',
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
      } else if (res === 'granted') {
        setHasPermission(true);
      }
    });
  };

  return {
    hasPermission,
    requestPermission,
  };
}

export default useCameraPermissions;
