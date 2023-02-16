import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import tickIcon from '../../assets/icons/check.png';
import { GRID_IMAGE_SIZE, isAndroid } from '../../utils.js/constants';

function MediaGridImage({ node, onImageSelected, onImageUnSelected }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSection = useCallback(() => {
    if (isSelected) {
      onImageUnSelected(node);
    } else {
      onImageSelected(node);
    }
    setIsSelected(value => !value);
  }, [isSelected]);

  return (
    <Pressable onPress={handleSection} style={styles.imageContainer}>
      {isAndroid ? (
        <Image style={styles.imageStyle} source={{ uri: node.image.uri }} />
      ) : (
        <Image
          style={styles.imageStyle}
          source={{ uri: `${node.image.uri}.${node.extension}` }}
        />
      )}
      {isSelected ? (
        <Image
          style={styles.selectedImage}
          width={50}
          height={50}
          source={tickIcon}
        />
      ) : (
        <View style={styles.unSelected} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 0.5,
    height: GRID_IMAGE_SIZE,
    width: GRID_IMAGE_SIZE,
    backgroundColor: '#1a1a1a',
  },
  imageStyle: {
    aspectRatio: 1,
  },
  selectedImage: {
    position: 'absolute',
    width: 26,
    height: 26,
    right: 5,
    top: 5,
  },
  unSelected: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default MediaGridImage;
