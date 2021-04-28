import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { DetailsAppBar } from '../../components';

export default function Moves() {
  // Just for testing:
  const example = {
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    color: 'green',
  };

  return (
    <>
      <DetailsAppBar {...example} />
      <SafeAreaView style={styles.ListContainer}>
        <Text>[Moves]</Text>
      </SafeAreaView>
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
