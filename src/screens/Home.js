import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MainAppBar, PokemonCard } from '../components';
import { pokemonByNameOrNumber } from '../Data';

const renderPokemonCard = ({ item }) => {
  return <PokemonCard {...item} />;
};

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      for (i = 1; i < 10; i++) {
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
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
