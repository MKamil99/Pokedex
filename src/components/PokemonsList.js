import React, { memo, useCallback, useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import PokemonCard from './PokemonCard';
import { PokemonDataContext } from '../contexts';
import CalculateColumns from '../utilities/CalculateColumns';

const PokemonsList = memo(({ pokemons, refresh }) => {
  const { toggleFavourite } = useContext(PokemonDataContext);
  const navigation = useNavigation();
  const onPokemonPress = useCallback((id) => {
    navigation.navigate('Details', { id });
  }, []);
  var columns = CalculateColumns();

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {
      columns = CalculateColumns();
    });
  }, []);

  const renderPokemonCard = ({
    item: { id, isFavourite, name, height, weight, sprite, types, color },
  }) => (
    <PokemonCard
      onPress={() => onPokemonPress(id)}
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
  );

  const keyExtractor = useCallback((item) => item.id.toString());

  return (
    <FlatList
      key={columns}
      data={pokemons}
      renderItem={renderPokemonCard}
      keyExtractor={keyExtractor}
      extraData={refresh}
      numColumns={columns}
    />
  );
});

PokemonsList.whyDidYouRender = true;
export default PokemonsList;
