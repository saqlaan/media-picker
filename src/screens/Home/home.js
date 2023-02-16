import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNModal from 'react-native-modal';
import { MediaPicker } from '../../components/MediaPicker';

const IMAGE_SIZE = Dimensions.get('screen').width / 3;

function Home() {
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 10,
      groupTypes: 'All',
      assetType: 'Photos',
    })
      .then(photos => {
        setGalleryPhotos(photos.edges);
      })
      .catch(error => {});
  }, []);

  const _closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Open media picker" onPress={() => setModalVisible(true)} />
      <MediaPicker isModalVisible={isModalVisible} closeModal={_closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
});

export default Home;
