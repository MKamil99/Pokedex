import * as ScreenOrientation from 'expo-screen-orientation';
import { Dimensions } from 'react-native';

export default function GetOrientation() {
  return Dimensions.get('window').width < Dimensions.get('window').height
    ? ScreenOrientation.Orientation.PORTRAIT_UP
    : ScreenOrientation.Orientation.LANDSCAPE_LEFT;
}
