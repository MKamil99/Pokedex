import { DefaultTheme, DarkTheme } from 'react-native-paper';

export const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0070B8',
    primaryDark: '#004588',
    white: '#ffffff',
    pokemon: {
      types: {
        attack: '#FFC800',
        bug: '#568203',
        dark: '#0E0212',
        dragon: '#002147',
        fairy: '#DE6FA1',
        fighting: '#8B0000',
        fire: '#FF4500',
        flying: '#ACACE6',
        ghost: '#BEBEBE',
        grass: '#006600',
        ground: '#AF6E4D',
        ice: '#87CEFA',
        normal: '#976D6D',
        poison: '#702670',
        psychic: '#32174D',
        rock: '#967117',
        steal: '#5F8A8B',
        water: '#1974D2',
      },
    },
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
};
