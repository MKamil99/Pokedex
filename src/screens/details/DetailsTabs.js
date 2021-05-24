import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import Evolution from './Evolution';
import General from './General';
import Moves from './Moves';
import { pokemonByNameOrNumber } from '../../contexts/PokeApiData';
import { CustomActivityIndicator } from '../../components';

const Tab = createMaterialBottomTabNavigator();

export default function DetailsTabs({ route }) {
  const { id } = route.params;
  const colors = useTheme().colors;

  const [pokemon, setPokemon] = useState(null);
  const [generalProps, setGeneralProps] = useState(null);
  const [movesProps, setMovesProps] = useState(null);
  const [evolutionProps, setEvolutionProps] = useState(null);

  useEffect(() => {
    pokemonByNameOrNumber(id).then((data) => setPokemon(data));
  }, []);

  useEffect(() => {
    if (pokemon) {
      setGeneralProps({
        id: pokemon.id,
        name: pokemon.name,
        weight: pokemon.weight,
        height: pokemon.height,
        stats: pokemon.stats,
        types: pokemon.types,
        color: pokemon.color,
        sprite: pokemon.sprite,
      });
      // TODO
      // setMovesProps(null);
      // setEvolutionProps(null);
    }
  }, [pokemon]);

  return (
    <Tab.Navigator
      activeColor={colors.activeTab}
      barStyle={{ backgroundColor: colors.bottomBar }}
      inactiveColor={colors.inactiveTab}
      shifting={true}
    >
      <Tab.Screen name='General' options={{ tabBarIcon: 'information' }}>
        {() => (generalProps ? <General {...generalProps} /> : <CustomActivityIndicator />)}
      </Tab.Screen>
      <Tab.Screen name='Moves' options={{ tabBarIcon: 'paw' }}>
        {() => (movesProps ? <Moves {...movesProps} /> : <CustomActivityIndicator />)}
      </Tab.Screen>
      <Tab.Screen name='Evolution' options={{ tabBarIcon: 'atom' }}>
        {() => (evolutionProps ? <Evolution {...evolutionProps} /> : <CustomActivityIndicator />)}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
