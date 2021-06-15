import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TouchableRipple, Text, useTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PokemonType from './PokemonType';

export default function PokemonMovesList({ moves, onSortPress, sortValue }) {
  const colors = useTheme().colors;
  const fontMedium = useTheme().fonts.medium;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <View style={{ flex: 5 }}>
          <TouchableRipple
            style={{ alignSelf: 'center', paddingHorizontal: 5 }}
            onPress={() =>
              onSortPress((value) => (value === 'name-asc' ? 'name-desc' : 'name-asc'))
            }
          >
            <View style={[styles.headerContainer]}>
              <Text style={[styles.headerText, { ...fontMedium }]}>Name</Text>
              <MaterialCommunityIcons
                name={`arrow-${sortValue === 'name-asc' ? 'up' : 'down'}`}
                size={18}
                style={{ marginLeft: 5 }}
                color='black'
              />
            </View>
          </TouchableRipple>
        </View>
        <Text style={[styles.headerText, { ...fontMedium, flex: 2 }]}>Type</Text>
        <Text style={[styles.headerText, { ...fontMedium, flex: 1 }]}>PP</Text>
        <Text style={[styles.headerText, { ...fontMedium, flex: 1 }]}>Pwr</Text>
        <Text style={[styles.headerText, { ...fontMedium, flex: 1 }]}>Acc</Text>
      </View>
      <ScrollView>
        {moves.map((move, i) => (
          <View style={styles.row} key={move.name}>
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
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
