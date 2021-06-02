import { Dimensions } from 'react-native';

export default function CalculateColumns() {
  return Math.floor((Dimensions.get('window').width - 8) / 170);
}
