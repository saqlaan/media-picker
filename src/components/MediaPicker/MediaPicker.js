import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNModal from 'react-native-modal';
import MediaPickerHeader from './MediaPickerHeader';
import MediaGrid from './MediaGrid';

function MediaPicker({ isModalVisible, closeModal }) {
  return (
    <RNModal
      swipeDirection={'down'}
      onSwipeComplete={closeModal}
      onBackdropPress={closeModal}
      propagateSwipe
      isVisible={isModalVisible}
      style={styles.wrapper}>
      <View style={styles.container}>
        <MediaPickerHeader onCancel={closeModal} />
        <MediaGrid />
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#000',
    height: '70%',
  },
  gridWrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default MediaPicker;
