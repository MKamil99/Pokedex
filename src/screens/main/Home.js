import React, { useCallback, useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MainAppBar, PokemonCard } from '../../components';
import { PokemonDataContext } from '../../contexts';

export default function Home() {
  const { pokemons, refresh, updateCurrentPokemonId } = useContext(PokemonDataContext);
  const navigation = useNavigation();

  const renderPokemonCard = useCallback(
    ({ item: { id, name, height, weight, sprite, types, color, loaded } }) => (
      <PokemonCard
        onPress={() => {
          if (loaded == true) {
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
      />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString());
  return (
    <>
      <MainAppBar />
      <SafeAreaView style={styles.ListContainer}>
        <FlatList
          data={pokemons}
          renderItem={renderPokemonCard}
          keyExtractor={keyExtractor}
          extraData={refresh}
          numColumns={2}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
