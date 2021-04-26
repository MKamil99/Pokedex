import { DefaultTheme, DarkTheme } from 'react-native-paper';

export const CustomTheme = {
  ...DefaultTheme,
  colors: {
    primary: '#0070B8',
    primaryDark: '#004588',
    ...DefaultTheme.colors,
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
};
