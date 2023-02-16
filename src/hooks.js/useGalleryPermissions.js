import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import {
  iosReadGalleryPermission,
  iosRequestReadWriteGalleryPermission,
} from '@react-native-camera-roll/camera-roll';

function useGalleryPermissions() {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = () => {
    iosRequestReadWriteGalleryPermission()
      .then(status => {
        if (['limited', 'granted'].includes(status)) {
          setHasPermission(true);
        }
      })
      .catch(error => console.log(error));
  };

  const requestPermission = async () => {
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
        console.log(error);
      });
  };

  return {
    hasPermission,
    requestPermission,
  };
}

export default useGalleryPermissions;
