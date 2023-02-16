import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useEffect, useState } from 'react';

const supportedMimeTypesByTheBackEnd = [
  'image/jpeg',
  'image/png',
  'image/heif',
  'image/heic',
  'image/heif-sequence',
  'image/heic-sequence',
];

function useGallery() {
  const [photos, setphotos] = useState([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    console.log('Loadiamges');
    CameraRoll.getPhotos({
      first: 15,
      groupTypes: 'All',
      assetType: 'Photos',
      after: pagination?.endCursor,
      mimeTypes: supportedMimeTypesByTheBackEnd,
    })
      .then(result => {
        setphotos(prev => [...prev, ...result.edges]);
        setPagination({
          hasNextPage: result.page_info.has_next_page,
          endCursor: result.page_info.end_cursor,
        });
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  return {
    photos,
    loadImages,
    hasNextPage: pagination?.hasNextPage,
  };
}

export default useGallery;
