import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function PokemonType({ passedStyle, type }) {
  const colors = useTheme().colors;
  const typeColor = colors.pokemon.types[type];
  return (
    <View style={[styles.container, { backgroundColor: typeColor }, passedStyle]}>
      <Text style={{ fontSize: 12, color: colors.white }}>{type.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
});
