import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { DetailsAppBar, PokemonGeneralInfo, PokemonStats } from '../../components';
import { PokemonDataContext } from '../../contexts';

export default function General() {
  const { currentPokemon } = useContext(PokemonDataContext);

  return (
    <>
      {currentPokemon ? (
        <>
          <DetailsAppBar color={currentPokemon.color} sprite={currentPokemon.sprite} />
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <PokemonGeneralInfo style={styles.singleComponent} />
              <PokemonStats style={styles.singleComponent} />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
