import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { MainAppBar, PokemonCard } from '../../components';
import { morePokemons } from '../../Data';

export default function Home() {
  const [data, setData] = useState([]);

  const renderPokemonCard = useCallback(({ item }) => <PokemonCard {...item} />, []);
  const keyExtractor = useCallback((item) => item.id.toString());

  useEffect(() => {
    morePokemons(1, 100).then((pokemons) => setData(pokemons));
  }, []);

  return (
    <>
      <MainAppBar />
      <SafeAreaView style={styles.ListContainer}>
        <FlatList
          data={data}
          renderItem={renderPokemonCard}
          keyExtractor={keyExtractor}
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
