import { useEffect, useState } from 'react';
import {
  Alert,
  AppState,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { iosRequestReadWriteGalleryPermission } from '@react-native-camera-roll/camera-roll';

const androidPermission =
  Platform.Version >= 33
    ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
    : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

function useGalleryPermissions() {
  const [hasPermission, setHasPermission] = useState(false);

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

  const checkPermissions = async () => {
    if (Platform.OS === 'ios') {
      iosRequestReadWriteGalleryPermission()
        .then(status => {
          if (['limited', 'granted'].includes(status)) {
            setHasPermission(true);
          }
        })
        .catch(error => console.log(error));
    } else {
      const isGranted = await PermissionsAndroid.check(androidPermission);
      if (isGranted) {
        setHasPermission(true);
      }
      const status = await PermissionsAndroid.request(androidPermission);
      if (status === 'granted') {
        setHasPermission(true);
      }
    }
  };

  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      iosRequestReadWriteGalleryPermission()
        .then(async res => {
          if (res === 'denied') {
            Alert.alert(
              'Gallery Permission',
              'To get photos from gallery please allow our app in settings',
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
        })
        .catch(error => {
          setHasPermission(false);
        });
    } else {
      Linking.openSettings();
    }
  };

  return {
    hasPermission,
    requestPermission,
  };
}

export default useGalleryPermissions;
