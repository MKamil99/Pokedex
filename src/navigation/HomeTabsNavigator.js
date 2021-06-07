import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import { Favourites, Home } from '../screens';

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabsNavigator() {
  const colors = useTheme().colors;

  return (
    <Tab.Navigator
      activeColor={colors.activeTab}
      barStyle={{ backgroundColor: colors.bottomBar }}
      inactiveColor={colors.inactiveTab}
      shifting={true}
      backBehavior='none'
      initialRouteName='All'
    >
      <Tab.Screen
        name='All'
        component={Home}
        options={{ tabBarIcon: 'home', tabBarLabel: 'Home' }}
      />
      <Tab.Screen name='Favourites' component={Favourites} options={{ tabBarIcon: 'heart' }} />
    </Tab.Navigator>
  );
}
