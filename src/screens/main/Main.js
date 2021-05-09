import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { MainAppBar, PokemonsList } from '../../components';
import { PokemonDataContext } from '../../contexts';

const Template = ({ pokemons, refresh }) => {
  return (
    <>
      <MainAppBar />
      <SafeAreaView style={styles.ListContainer}>
        <PokemonsList pokemons={pokemons} refresh={refresh} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export const Home = () => {
  const { pokemons, refresh } = useContext(PokemonDataContext);
  return <Template pokemons={pokemons} refresh={refresh} />;
};
export const Favourites = () => {
  const { pokemons, refresh } = useContext(PokemonDataContext);
  return <Template pokemons={pokemons} refresh={refresh} />;
};
