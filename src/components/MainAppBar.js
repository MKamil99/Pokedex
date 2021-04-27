import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

export default function MainAppBar() {
  const colors = useTheme().colors;

  setStatusBarBackgroundColor(colors.primaryDark);

  return (
    <Appbar.Header>
      <Appbar.Content title='Pokedex' />
      <Appbar.Action icon='filter-menu' />
      <Appbar.Action icon='sort' />
      <Appbar.Action icon='theme-light-dark' />
    </Appbar.Header>
  );
}
