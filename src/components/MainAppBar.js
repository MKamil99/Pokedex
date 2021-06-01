import React, { useState, useContext } from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';

import SortingMenu from './SortingMenu';
import { ThemeDataContext } from '../contexts';

export default function MainAppBar() {
  const colors = useTheme().colors;
  const navigation = useNavigation();
  const { switchTheme } = useContext(ThemeDataContext);

  const [isSortingVisible, setIsSortingVisible] = useState(false);

  setStatusBarBackgroundColor(colors.primaryDark);
  setStatusBarStyle('light');

  return (
    <Appbar>
      <Appbar.Content title='Pokedex' />
      <Appbar.Action icon='filter-menu' onPress={() => navigation.navigate('Filter')} />
      <SortingMenu
        anchor={
          <Appbar.Action
            color={colors.caption}
            icon='sort'
            onPress={() => setIsSortingVisible(true)}
          />
        }
        onDismiss={() => setIsSortingVisible(false)}
        visible={isSortingVisible}
      />

      <Appbar.Action icon='theme-light-dark' onPress={() => switchTheme()} />
    </Appbar>
  );
}
