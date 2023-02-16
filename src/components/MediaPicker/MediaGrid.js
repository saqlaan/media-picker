import React, { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import ImageItem from './MediaGridImage';
import useGallery from '../../hooks.js/useGallery';
import MediaPickerCamera from './MediaPickerCamera';
import useGalleryPermissions from '../../hooks.js/useGalleryPermissions';

const IMAGE_SIZE = Dimensions.get('screen').width / 3;

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

  const _onSelected = useCallback(
    photo => {
      if (isPhotoSelected(photo)) {
        const updatedSelectedPhotos = selectedPhotos.filter(
          selectedPhoto =>
            selectedPhoto.image.filename !== photo.image.filename,
        );
        setSelectedPhotos(updatedSelectedPhotos);
      } else {
        setSelectedPhotos([...selectedPhotos, photo]);
      }
    },
    [selectedPhotos],
  );

  const isPhotoSelected = photo => {
    return selectedPhotos.includes(photo);
  };

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
    />
  );
}

const styles = StyleSheet.create({
  flatListStyle: {
    backgroundColor: '#1a1a1a',
  },
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
