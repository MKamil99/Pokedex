import React, { useState } from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

import SortingMenu from './SortingMenu';

export default function MainAppBar() {
  const colors = useTheme().colors;
  const [isSortingVisible, setIsSortingVisible] = useState(false);

  setStatusBarBackgroundColor(colors.primaryDark);

  return (
    <Appbar.Header>
      <Appbar.Content title='Pokedex' />
      <Appbar.Action icon='filter-menu' />
      <SortingMenu
        anchor={
          <Appbar.Action
            color={colors.white}
            icon='sort'
            onPress={() => setIsSortingVisible(true)}
          />
        }
        onDismiss={() => setIsSortingVisible(false)}
        visible={isSortingVisible}
      />

      <Appbar.Action icon='theme-light-dark' />
    </Appbar.Header>
  );
}
