import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import PokemonType from '../components/PokemonType';

export default function PokemonMovesList({ moves }) {
  const colors = useTheme().colors;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { flex: 5 }]}>Name</Text>
        <Text style={[styles.headerText, { flex: 2 }]}>Type</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>PP</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>Pwr</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>Acc</Text>
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
    borderRadius: 20,
    padding: 8,
    elevation: 8,
    flexDirection: 'column',
    marginTop: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  textRow: {
    fontSize: 15,
    textAlign: 'center',
  },
});
