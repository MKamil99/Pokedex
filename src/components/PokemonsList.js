import React, { memo, useCallback, useContext } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PokemonCard from './PokemonCard';
import { PokemonDataContext } from '../contexts';
import CalculateColumns from '../utilities/CalculateColumns';

const PokemonsList = memo(({ pokemons, refresh }) => {
  const { toggleFavourite } = useContext(PokemonDataContext);
  const navigation = useNavigation();
  const onPokemonPress = useCallback((id) => {
    navigation.navigate('Details', { id });
  }, []);

  const columns = CalculateColumns();

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
      columns={columns}
    />
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
});

PokemonsList.whyDidYouRender = true;
export default PokemonsList;
