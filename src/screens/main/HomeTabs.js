import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import Favourites from './Favourites';
import Home from './Home';

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabs() {
  const colors = useTheme().colors;

  return (
    <Tab.Navigator
      activeColor={colors.primary}
      barStyle={{ backgroundColor: colors.white }}
      inactiveColor='#808080'
      shifting={true}
    >
      <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: 'home' }} />
      <Tab.Screen name='heart' component={Favourites} options={{ tabBarIcon: 'information' }} />
    </Tab.Navigator>
  );
}
