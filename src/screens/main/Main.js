import React, { useContext, memo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { MainAppBar, PokemonsList } from '../../components';
import { PokemonDataContext } from '../../contexts';

const Template = memo(({ pokemons, refresh }) => {
  const colors = useTheme().colors;
  return (
    <>
      <MainAppBar />
      <SafeAreaView style={[styles.ListContainer, { backgroundColor: colors.backgroundColor }]}>
        <PokemonsList pokemons={pokemons} refresh={refresh} />
      </SafeAreaView>
    </>
  );
});

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

const Home = () => {
  const { pokemons, refresh } = useContext(PokemonDataContext);
  return <Template pokemons={pokemons} refresh={refresh} />;
};
const Favourites = () => {
  const { favouritePokemons, refresh } = useContext(PokemonDataContext);
  return <Template pokemons={favouritePokemons} refresh={refresh} />;
};

Home.whyDidYouRender = true;
Favourites.whyDidYouRender = true;
export { Favourites, Home };
