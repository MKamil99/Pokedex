import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { MainAppBar, PokemonCard } from '../components';
import { pokemonByNameOrNumber } from '../Data';

export default function Home() {
  const [data, setData] = useState([]);

  const renderPokemonCard = useCallback(({ item }) => <PokemonCard {...item} />, []);
  const keyExtractor = useCallback((item) => item.id.toString());

  useEffect(() => {
    const fetchData = async () => {
      for (i = 1; i < 30; i++) {
        pokemonByNameOrNumber(i).then((pokemon) => {
          setData((prev) => [...prev, pokemon]);
        });
      }
    };
    fetchData();
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
  },
});
