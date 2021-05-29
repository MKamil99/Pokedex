import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

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
    paddingVertical: 2,
    width: 60,
    borderRadius: 10,
  },
  content: {
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: 'black',
    textShadowRadius: 10,
    fontFamily: 'RobotoSlab_400Regular',
  },
});
