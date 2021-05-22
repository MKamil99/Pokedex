import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import { DetailsAppBar, PokemonGeneralInfo, PokemonStats } from '../../components';
import { PokemonDataContext } from '../../contexts';

export default function General() {
  const { currentPokemon } = useContext(PokemonDataContext);
  const colors = useTheme().colors;

  return (
    <>
      {currentPokemon ? (
        <>
          <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <DetailsAppBar color={currentPokemon.color} sprite={currentPokemon.sprite} />
            <ScrollView>
              <PokemonGeneralInfo />
              <PokemonStats />
            </ScrollView>
          </SafeAreaView>
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
