import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { DetailsAppBar } from '../../components';
import { PokemonDataContext } from '../../contexts';

export default function Moves() {
  const { currentPokemon } = useContext(PokemonDataContext);

  return (
    <>
      {currentPokemon ? (
        <>
          <DetailsAppBar color={currentPokemon.color} sprite={currentPokemon.sprite} />
          <SafeAreaView style={styles.ListContainer}>
            <Text>[Moves]</Text>
          </SafeAreaView>
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
