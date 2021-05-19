import React, { useCallback, useContext } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PokemonCard from './PokemonCard';
import { PokemonDataContext } from '../contexts/PokemonDataContext';

export default function PokemonsList({ pokemons, refresh }) {
  const { toggleFavourite, updateCurrentPokemonId } = useContext(PokemonDataContext);
  const navigation = useNavigation();

  const renderPokemonCard = useCallback(
    ({ item: { id, isFavourite, name, height, weight, sprite, types, color, isLoaded } }) => (
      <PokemonCard
        onPress={() => {
          if (isLoaded) {
            navigation.navigate('Details');
            updateCurrentPokemonId(id);
          }
        }}
        id={id}
        name={name}
        height={height}
        weight={weight}
        sprite={sprite}
        types={types}
        color={color}
        isFavourite={isFavourite}
        onPressFavourite={() => toggleFavourite(id)}
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
