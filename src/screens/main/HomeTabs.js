import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import { Favourites, Home } from './Main';

const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  const colors = useTheme().colors;

  return (
    <Tab.Navigator
      activeColor={colors.activeTab}
      barStyle={{ backgroundColor: colors.bottomBar }}
      inactiveColor={colors.inactiveTab}
      shifting={true}
    >
      <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: 'home' }} />
      <Tab.Screen name='Favourites' component={Favourites} options={{ tabBarIcon: 'heart' }} />
    </Tab.Navigator>
  );
}

HomeTabs.whyDidYouRender = true;
export default HomeTabs;
