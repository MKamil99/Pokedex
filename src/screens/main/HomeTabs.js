import React, { useContext, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import Favourites from './Favourites';
import Home from './Home';
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
      activeColor={colors.primary}
      barStyle={{ backgroundColor: colors.white }}
      inactiveColor='#808080'
      shifting={true}
    >
      <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: 'home' }} />
      <Tab.Screen name='Favourites' component={Favourites} options={{ tabBarIcon: 'heart' }} />
    </Tab.Navigator>
  );
}
