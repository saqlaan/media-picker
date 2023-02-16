import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import ImageItem from './ImageItem';
import useGallery from '../../hooks.js/useGallery';

const IMAGE_SIZE = Dimensions.get('screen').width / 3;

function MediaGrid({}) {
  const { photos, hasNextPage, loadImages } = useGallery();
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const _onEndReached = useCallback(() => {
    if (!hasNextPage) {
      return;
    }
    loadImages();
  }, [hasNextPage, loadImages]);

  const _onSelected = useCallback(
    photo => {
      if (isPhotoSelected(photo)) {
        const updatedSelectedPhotos = selectedPhotos.filter(
          selectedPhoto =>
            selectedPhoto.image.filename !== photo.image.filename,
        );
        setSelectedPhotos(updatedSelectedPhotos);
      } else {
        setSelectedPhotos(selectedPhotos => [...selectedPhotos, photo]);
      }
    },
    [selectedPhotos],
  );

  const isPhotoSelected = photo => {
    return selectedPhotos.includes(photo);
  };

  const renderheader = () => (
    <View style={styles.headerStyle}>
      <View style={styles.cameraContainer} />
      <View style={styles.headerImagesRow}>
        {photos.slice(0, 4).map(item => (
          <ImageItem
            key={item.node.image.filename}
            node={item.node}
            isSelected={isPhotoSelected(item.node)}
            onSelected={() => _onSelected(item.node)}
          />
        ))}
      </View>
    </View>
  );

  const _renderItem = useCallback(
    ({ item }) => (
      <ImageItem
        node={item.node}
        isSelected={isPhotoSelected(item.node)}
        onSelected={() => _onSelected(item.node)}
      />
    ),
    [_onSelected],
  );

  return (
    <FlatList
      style={{backgroundColor: '#1a1a1a'}}
      data={photos.slice(4)}
      key={node => node.image.filename}
      renderItem={_renderItem}
      numColumns={3}
      horizontal={false}
      ListHeaderComponent={renderheader()}
      onEndReached={_onEndReached}
    />
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  cameraContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE * 2,
    backgroundColor: '#fff',
  },
  headerImagesRow: {
    flexDirection: 'row',
    flexWrap: 1,
    width: IMAGE_SIZE * 2,
  },
});

export default MediaGrid;
