import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import StatBar from './StatBar';

export default function PokemonStats({ stats }) {
  const colors = useTheme().colors;
  const statsColors = colors.pokemon.stats;
  const statsValues = stats.map((stat) => stat[1]);

  const statBarsValues = [
    { name: 'HP', value: statsValues[0], color: statsColors.hp },
    { name: 'ATK', value: statsValues[1], color: statsColors.attack },
    { name: 'DEF', value: statsValues[2], color: statsColors.defense },
    { name: 'SP ATK', value: statsValues[3], color: statsColors.specialAttack },
    { name: 'SP DEF', value: statsValues[4], color: statsColors.specialDefence },
    { name: 'SPD', value: statsValues[5], color: statsColors.speed },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.header, { color: colors.cardCaption }]}>Base stats</Text>
      {statBarsValues.map((barValues, index) => (
        <StatBar key={index} {...barValues} />
      ))}
      <Text style={[styles.total, { color: colors.cardCaption }]}>{`TOTAL ${statsValues.reduce(
        (result, number) => result + number
      )}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 'auto',
    padding: 8,
    borderRadius: 20,
    elevation: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    includeFontPadding: false,
    lineHeight: 20,
    textAlign: 'center',
  },
  total: {
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center',
  },
});
