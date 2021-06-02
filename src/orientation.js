import * as ScreenOrientation from 'expo-screen-orientation';
import { Dimensions } from 'react-native';

// Calculating number of columns to render (depending on screen width):
export const calculateColumns = () => {
  return Math.floor((Dimensions.get('window').width - 8) / 170);
};

// Checking if device is in portrait orientation:
export const isPortrait = () => {
  let orientation = getOrientation();
  return orientation == ScreenOrientation.Orientation.PORTRAIT_DOWN ||
    orientation == ScreenOrientation.Orientation.PORTRAIT_UP
    ? true
    : false;
};

const getOrientation = () => {
  return Dimensions.get('window').width < Dimensions.get('window').height
    ? ScreenOrientation.Orientation.PORTRAIT_UP
    : ScreenOrientation.Orientation.LANDSCAPE_LEFT;
};
