import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import cameraIcon from '../../assets/icons/camera.png';
import useCameraPermissions from '../../hooks/useCameraPermissions';
import { GRID_IMAGE_SIZE } from '../../utils.js/constants';
import { RNCamera } from 'react-native-camera';

function MediaPickerCamera() {
  const { hasPermission, requestPermission } = useCameraPermissions();

  const renderWithoutCamera = () => (
    <View style={styles.errorContainer}>
      <Pressable onPress={requestPermission}>
        <Text style={styles.enableButtonText}>Allow Camera</Text>
      </Pressable>
    </View>
  );

  if (hasPermission) {
    return (
      <View style={styles.cameraContainer}>
        <RNCamera
          style={styles.cameraStyle}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
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
  cameraStyle: {
    width: GRID_IMAGE_SIZE,
    height: GRID_IMAGE_SIZE * 2,
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
