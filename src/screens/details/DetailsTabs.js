import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import Evolution from './Evolution';
import General from './General';
import Moves from './Moves';

const Tab = createMaterialBottomTabNavigator();

export default function DetailsTabs() {
  const colors = useTheme().colors;

  return (
    <Tab.Navigator
      activeColor={colors.activeTab}
      barStyle={{ backgroundColor: colors.bottomBar }}
      inactiveColor={colors.inactiveTab}
      shifting={true}
    >
      <Tab.Screen name='General' component={General} options={{ tabBarIcon: 'information' }} />
      <Tab.Screen name='Moves' component={Moves} options={{ tabBarIcon: 'paw' }} />
      <Tab.Screen name='Evolution' component={Evolution} options={{ tabBarIcon: 'atom' }} />
    </Tab.Navigator>
  );
}
