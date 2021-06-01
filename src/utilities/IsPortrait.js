import * as ScreenOrientation from 'expo-screen-orientation';

export default function IsPortrait(orientation) {
  return orientation == ScreenOrientation.Orientation.PORTRAIT_DOWN ||
    orientation == ScreenOrientation.Orientation.PORTRAIT_UP
    ? true
    : false;
}
