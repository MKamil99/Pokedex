import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

import PokemonType from './PokemonType';

export default function PokemonMovesList({ moves }) {
  const colors = useTheme().colors;
  const fontMedium = useTheme().fonts.medium;
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { ...fontMedium, flex: 5 }]}>Name</Text>
        <Text style={[styles.headerText, { ...fontMedium, flex: 2 }]}>Type</Text>
        <Text style={[styles.headerText, { ...fontMedium, flex: 1 }]}>PP</Text>
        <Text style={[styles.headerText, { ...fontMedium, flex: 1 }]}>Pwr</Text>
        <Text style={[styles.headerText, { ...fontMedium, flex: 1 }]}>Acc</Text>
      </View>
      <ScrollView>
        {moves.map((move, i) => (
          <View style={styles.row} key={i}>
            <Text style={[styles.textRow, { flex: 5 }]}>{move.name}</Text>
            <Text style={[styles.textRow, { flex: 2 }]}>
              <PokemonType type={move.type} />
            </Text>
            <Text style={[styles.textRow, { flex: 1 }]}>{move.pp}</Text>
            <Text style={[styles.textRow, { flex: 1 }]}>{move.pwr}</Text>
            <Text style={[styles.textRow, { flex: 1 }]}>{move.acc}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: RFValue(20),
    padding: RFValue(8),
    elevation: 8,
    flexDirection: 'column',
    marginTop: RFValue(16),
    marginBottom: RFValue(16),
  },
  header: {
    flexDirection: 'row',
    paddingVertical: RFValue(5),
  },
  headerText: {
    fontSize: RFValue(15),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: RFValue(4),
  },
  textRow: {
    fontSize: RFValue(15),
    textAlign: 'center',
  },
});
