import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
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

  const renderheader = () => (
    <View style={styles.headerStyle}>
      <View style={styles.cameraContainer} />
      <View
        style={{ flexDirection: 'row', flexWrap: 1, width: IMAGE_SIZE * 2 }}>
        {galleryPhotos.slice(0, 4).map(item => (
          <Image
            style={styles.imageStyle}
            source={{ uri: `${item.node.image.uri}.${item.node.extension}` }}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </Pressable>
      <MediaPicker isModalVisible={isModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 42,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  imageStyle: {
    borderWidth: 0.5,
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
  cameraContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE * 2,
    backgroundColor: 'black',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
    // backgroundColor: 'red',
  },
  modalView: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Home;
