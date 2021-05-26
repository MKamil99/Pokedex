import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

export default EvolutionArrow = ({ data, color }) => {
  const colors = useTheme().colors;
  const arrow = require('../../assets/next.png');
  const pokemonColor = colors.pokemon.background[color];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data}</Text>
      <Image style={styles.image} source={arrow} tintColor={pokemonColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  text: {
    fontSize: 18,
    lineHeight: 18,
    marginRight: 5,
  },
  image: {
    height: 32,
    width: 32,
  },
});
