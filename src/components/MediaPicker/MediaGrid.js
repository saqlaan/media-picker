import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native';
import ImageItem from './MediaGridImage';
import useGallery from '../../hooks/useGallery';
import MediaPickerCamera from './MediaPickerCamera';
import useGalleryPermissions from '../../hooks/useGalleryPermissions';
import { GRID_IMAGE_SIZE } from '../../utils.js/constants';

function MediaGrid() {
  const { photos, hasNextPage, loadImages } = useGallery();
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const { hasPermission, requestPermission } = useGalleryPermissions();

  const _onEndReached = useCallback(() => {
    if (!hasNextPage) {
      return;
    }
    loadImages();
  }, [hasNextPage, loadImages]);

  const handleImageSelected = useCallback(
    node => {
      setSelectedPhotos([...selectedPhotos, node]);
    },
    [selectedPhotos],
  );

  const handleImageUnSelected = useCallback(
    node => {
      const filteredImages = selectedPhotos.filter(
        photos => photos.image.filename !== node.image.filename,
      );
      setSelectedPhotos([...filteredImages]);
    },
    [selectedPhotos],
  );

  const renderheader = () => (
    <View style={styles.headerStyle}>
      <View style={styles.cameraContainer}>
        <MediaPickerCamera />
      </View>
      <View style={styles.headerImagesRow}>
        {photos.slice(0, 4).map(item => (
          <ImageItem
            key={item.node.image.filename}
            node={item.node}
            onImageSelected={handleImageSelected}
            onImageUnSelected={handleImageUnSelected}
          />
        ))}
      </View>
    </View>
  );

  const _renderItem = useCallback(
    ({ item }) => (
      <ImageItem
        node={item.node}
        onImageSelected={handleImageSelected}
        onImageUnSelected={handleImageUnSelected}
      />
    ),
    [handleImageSelected, handleImageUnSelected],
  );

  const _emptyComponent = () => {
    if (photos.length === 0 && !hasPermission) {
      return (
        <View style={styles.errorContainer}>
          <Pressable onPress={requestPermission}>
            <Text style={styles.enableButtonText}>
              Allow app to access gallery
            </Text>
          </Pressable>
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      data={photos.slice(4)}
      key={node => node.image.filename}
      renderItem={_renderItem}
      numColumns={3}
      horizontal={false}
      ListHeaderComponent={renderheader()}
      initialNumToRender={20}
      onEndReached={_onEndReached}
      refreshControl={false}
      pinchGestureEnabled={false}
      scrollToOverflowEnabled={false}
      ListEmptyComponent={_emptyComponent()}
      removeClippedSubviews={true}
    />
  );
}

const styles = StyleSheet.create({
  flatListStyle: {
    backgroundColor: '#1a1a1a',
  },
  headerStyle: {
    flexDirection: 'row',
  },
  cameraContainer: {
    width: GRID_IMAGE_SIZE,
    height: GRID_IMAGE_SIZE * 2,
    backgroundColor: '#fff',
  },
  headerImagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: GRID_IMAGE_SIZE * 2,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  enableButtonText: {
    color: '#06c',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default MediaGrid;
