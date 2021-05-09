import React, { useCallback, useContext } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PokemonCard from './PokemonCard';
import { PokemonDataContext } from '../contexts/PokemonDataContext';

export default function PokemonsList({ pokemons, refresh }) {
  const { updateCurrentPokemonId } = useContext(PokemonDataContext);
  const navigation = useNavigation();

  const renderPokemonCard = useCallback(
    ({ item: { id, name, height, weight, sprite, types, color } }) => (
      <PokemonCard
        onPress={() => {
          navigation.navigate('Details');
          updateCurrentPokemonId(id);
        }}
        id={id}
        name={name}
        height={height}
        weight={weight}
        sprite={sprite}
        types={types}
        color={color}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString());

  return (
    <FlatList
      data={pokemons}
      renderItem={renderPokemonCard}
      keyExtractor={keyExtractor}
      extraData={refresh}
      numColumns={2}
    />
  );
}
