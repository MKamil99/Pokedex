import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import StatBar from '../components/StatBar';

export default function PokemonStats({ hp, atk, def, satk, sdef, spd }) {
  const colors = useTheme().colors;
  const stats = colors.pokemon.stats;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={styles.header}>Base stats</Text>
      <StatBar name='HP' value={hp} color={stats.hp} />
      <StatBar name='ATK' value={atk} color={stats.attack} />
      <StatBar name='DEF' value={def} color={stats.defense} />
      <StatBar name='SP ATK' value={satk} color={stats.specialAttack} />
      <StatBar name='SP DEF' value={sdef} color={stats.specialDefence} />
      <StatBar name='SPD' value={spd} color={stats.speed} />

      <Text style={styles.total}>{`TOTAL ${hp + atk + def + satk + sdef + spd}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    padding: 8,
    borderRadius: 20,
    elevation: 8,
  },
  header: {
    fontSize: 20,
    includeFontPadding: false,
    lineHeight: 20,
    textAlign: 'center',
  },
  stat: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statName: {
    fontSize: 15,
    includeFontPadding: false,
    textAlign: 'right',
    width: '15%',
  },
  bar: {
    width: '100%',
    height: 18,
    backgroundColor: '#C4C4C4',
    borderRadius: 9,
  },
  barStat: {
    width: '30%',
    backgroundColor: 'red',
    height: 18,
    borderRadius: 9,
  },
  total: {
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center',
  },
});
