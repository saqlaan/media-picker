import { Dimensions, Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const GRID_IMAGE_SIZE = Dimensions.get('screen').width / 3;
