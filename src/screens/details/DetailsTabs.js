import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import Evolution from './Evolution';
import General from './General';
import Moves from './Moves';
import { fetchAllMoves, fetchEvolutionChain, pokemonByNameOrNumber } from '../../contexts';
import { CustomActivityIndicator } from '../../components';

const Tab = createMaterialBottomTabNavigator();

export default function DetailsTabs({ route }) {
  const { id } = route.params;
  const colors = useTheme().colors;
  const isDarkTheme = useTheme().dark;
  const navigation = useNavigation();

  const [pokemon, setPokemon] = useState(null);
  const [generalProps, setGeneralProps] = useState(null);
  const [movesProps, setMovesProps] = useState(null);
  const [evolutionProps, setEvolutionProps] = useState(null);

  // Picking appropriate color for tab, indicator or status bar:
  const pickColor = (color) =>
    pokemon && !isDarkTheme ? colors.pokemon.backgroundDark[pokemon.color] : color;

  // Fetching details:
  useEffect(() => {
    pokemonByNameOrNumber(id).then((data) => setPokemon(data));
  }, []);

  // Displaying details:
  useEffect(() => {
    if (pokemon) {
      // Status Bar:
      setStatusBarBackgroundColor(pickColor(colors.primaryDark), true);
      // General:
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
      // Moves:
      fetchAllMoves(pokemon.moves).then((moves) =>
        setMovesProps({
          moves: moves,
          color: pokemon.color,
          sprite: pokemon.sprite,
        })
      );
      // Evolution Chain:
      fetchEvolutionChain(pokemon.evolution_chain).then((chain) => {
        setEvolutionProps({
          chain: chain,
          color: pokemon.color,
          sprite: pokemon.sprite,
        });
      });
    }
  }, [pokemon]);

  // Changing Status Bar color after changing screen:
  useEffect(() => {
    navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(pickColor(colors.primaryDark), true);
    });
    navigation.addListener('blur', () => {
      setStatusBarBackgroundColor(colors.primaryDark, true);
    });
  }, []);

  return (
    <Tab.Navigator
      activeColor={pickColor(colors.activeTab)}
      barStyle={{ backgroundColor: colors.bottomBar }}
      inactiveColor={colors.inactiveTab}
      shifting={true}
    >
      <Tab.Screen name='General' options={{ tabBarIcon: 'information' }}>
        {() =>
          generalProps ? (
            <General {...generalProps} />
          ) : (
            <CustomActivityIndicator color={pickColor(colors.activityIndicator)} />
          )
        }
      </Tab.Screen>
      <Tab.Screen name='Moves' options={{ tabBarIcon: 'paw' }}>
        {() =>
          movesProps ? (
            <Moves {...movesProps} />
          ) : (
            <CustomActivityIndicator color={pickColor(colors.activityIndicator)} />
          )
        }
      </Tab.Screen>
      <Tab.Screen name='Evolution' options={{ tabBarIcon: 'atom' }}>
        {() =>
          evolutionProps ? (
            <Evolution {...evolutionProps} />
          ) : (
            <CustomActivityIndicator color={pickColor(colors.activityIndicator)} />
          )
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
}
