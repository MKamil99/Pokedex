import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { PokemonDataContext } from '../contexts';

import StatBar from '../components/StatBar';

export default function PokemonStats() {
  const { currentPokemon } = useContext(PokemonDataContext);
  //const statsNames = currentPokemon.stats.map(i => i[0]);
  const statsValues = currentPokemon.stats.map((i) => i[1]);
  const colors = useTheme().colors;
  const stats = colors.pokemon.stats;

  return (
    <>
      {currentPokemon ? (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
          <Text style={styles.header}>Base stats</Text>
          <StatBar name='HP' value={statsValues[0]} color={stats.hp} />
          <StatBar name='ATK' value={statsValues[1]} color={stats.attack} />
          <StatBar name='DEF' value={statsValues[2]} color={stats.defense} />
          <StatBar name='SP ATK' value={statsValues[3]} color={stats.specialAttack} />
          <StatBar name='SP DEF' value={statsValues[4]} color={stats.specialDefence} />
          <StatBar name='SPD' value={statsValues[5]} color={stats.speed} />

          <Text style={styles.total}>{`TOTAL ${statsValues.reduce(
            (result, number) => result + number
          )}`}</Text>
        </View>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </>
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
