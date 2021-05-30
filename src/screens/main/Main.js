import React, { useContext, memo } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { MainAppBar, PokemonsList, CustomFAB, CustomSearchBar } from '../../components';
import { PokemonDataContext } from '../../contexts';

const SearchBar = () => {
  const { updateMatchingOrIDValue, updateIsSearching, searchQuery, updateSearchQuery } = useContext(
    PokemonDataContext
  );
  return (
    <CustomSearchBar
      onClose={() => {
        updateIsSearching(false);
        updateMatchingOrIDValue('');
        updateSearchQuery('');
      }}
      onSubmit={(query) => updateMatchingOrIDValue(query)}
      searchQuery={searchQuery}
      setSearchQuery={updateSearchQuery}
    />
  );
};

const Template = memo(({ pokemons }) => {
  const { refresh, isSearching, updateIsSearching } = useContext(PokemonDataContext);
  const colors = useTheme().colors;

  return (
    <>
      {isSearching ? <SearchBar /> : <MainAppBar />}
      <SafeAreaView style={[styles.ListContainer, { backgroundColor: colors.backgroundColor }]}>
        <View style={{ paddingHorizontal: 4 }}>
          <PokemonsList pokemons={pokemons} refresh={refresh} />
        </View>
      </SafeAreaView>
      <CustomFAB isVisible={!isSearching} onPress={() => updateIsSearching(true)} />
    </>
  );
});

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
    width: '100%',
  },
});

const Home = () => {
  const { pokemons } = useContext(PokemonDataContext);
  return <Template pokemons={pokemons} />;
};
const Favourites = () => {
  const { favouritePokemons } = useContext(PokemonDataContext);
  return <Template pokemons={favouritePokemons} />;
};

Home.whyDidYouRender = true;
Favourites.whyDidYouRender = true;
export { Favourites, Home };
