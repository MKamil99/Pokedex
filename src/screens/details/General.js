import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { DetailsAppBar, PokemonGeneralInfo, PokemonStats } from '../../components';

export default function General({ id, name, weight, height, stats, types, color, sprite }) {
  const colors = useTheme().colors;

  const generalInfoProps = { id, name, types, weight, height };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <DetailsAppBar color={color} sprite={sprite} />
      <ScrollView>
        <PokemonGeneralInfo {...generalInfoProps} />
        <PokemonStats stats={stats} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
