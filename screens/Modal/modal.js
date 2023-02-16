import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const IMAGE_SIZE = Dimensions.get('screen').width / 3;

function Modal() {
  const [galleryPhotos, setGalleryPhotos] = useState([]);

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
      <View style={{flexDirection: 'row', flexWrap: 1, width: IMAGE_SIZE * 2}}>
        {galleryPhotos.slice(0, 4).map(item => (
          <Image
            style={styles.imageStyle}
            source={{uri: `${item.node.image.uri}.${item.node.extension}`}}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>{galleryPhotos.length}</Text>
      <FlatList
        data={galleryPhotos.slice(3)}
        renderItem={({item}) => {
          return (
            <View>
              <Image
                style={styles.imageStyle}
                source={{uri: `${item.node.image.uri}.${item.node.extension}`}}
              />
            </View>
          );
        }}
        numColumns={3}
        horizontal={false}
        ListHeaderComponent={renderheader()}
      />
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
});

export default Modal;
