import React, { useContext, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import { Favourites, Home } from './Main';
import { PokemonDataContext } from '../../contexts';

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabs({ navigation }) {
  const colors = useTheme().colors;
  const { resetCurrentPokemon } = useContext(PokemonDataContext);

  useEffect(() => {
    navigation.addListener('focus', () => {
      resetCurrentPokemon();
    });
  }, []);

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
