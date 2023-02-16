import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function MediaPickerHeader({ onCancel }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onCancel} style={styles.closeModal}>
        <Text style={styles.closeModalText}>Cancel</Text>
      </Pressable>
      <Text style={styles.headerTitle}>Gallery</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 500,
  },
  closeModal: {
    position: 'absolute',
    left: 0,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  closeModalText: {
    color: '#447ec6',
    fontSize: 20,
  },
});

export default MediaPickerHeader;
