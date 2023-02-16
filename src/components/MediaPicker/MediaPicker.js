import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNModal from 'react-native-modal';
import MediaPickerHeader from './MediaPickerHeader';
import MediaGrid from './MediaGrid';

function MediaPicker({ isModalVisible }) {
  return (
    <RNModal
      // swipeDirection={'down'}
      propagateSwipe
      isVisible={isModalVisible}
      style={styles.wrapper}>
      <View style={styles.container}>
        <MediaPickerHeader onCancel={() => console.log('Hide modal')} />
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
    backgroundColor: 'white',
    height: '70%',
  },
  gridWrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default MediaPicker;
