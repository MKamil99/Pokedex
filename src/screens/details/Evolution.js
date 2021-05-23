import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import { DetailsAppBar } from '../../components';
import { PokemonDataContext } from '../../contexts';

export default function Evolution() {
  const { currentPokemon } = useContext(PokemonDataContext);
  const colors = useTheme().colors;

  return (
    <>
      {currentPokemon ? (
        <>
          <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <DetailsAppBar color={currentPokemon.color} sprite={currentPokemon.sprite} />
            <Text style={{ color: colors.cardCaption }}>[Evolution]</Text>
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
    alignItems: 'center',
  },
});
