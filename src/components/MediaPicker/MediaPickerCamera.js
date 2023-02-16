import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import cameraIcon from '../../assets/icons/camera.png';
import useCameraPermissions from '../../hooks.js/useCameraPermissions';

function MediaPickerCamera() {
  const { device, hasPermission, requestPermission } = useCameraPermissions();

  const renderWithoutCamera = () => (
    <View style={styles.errorContainer}>
      <Pressable onPress={requestPermission}>
        <Text style={styles.enableButtonText}>Allow Camera</Text>
      </Pressable>
    </View>
  );

  if (hasPermission && device) {
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
