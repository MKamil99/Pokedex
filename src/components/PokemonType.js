import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

export default function PokemonType({ containerStyle, textStyle, type }) {
  const colors = useTheme().colors;
  const typeColor = colors.pokemon.types[type];
  return (
    <View style={[styles.container, { backgroundColor: typeColor }, containerStyle]}>
      <Text style={[styles.content, { color: colors.caption }, textStyle]}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: RFValue(2),
    width: RFValue(70),
    borderRadius: RFValue(10),
  },
  content: {
    fontSize: RFValue(12),
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: 'black',
    textShadowRadius: RFValue(10),
  },
});
