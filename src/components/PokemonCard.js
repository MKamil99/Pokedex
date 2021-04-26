import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PokemonType from './PokemonType';

export default function PokemonCard({ id, name, height, weight, sprite, types, color }) {
  return (
    <Surface style={styles.container}>
      <Text style={[styles.id, { color: 'black' }]}>{'#' + id}</Text>
      <MaterialCommunityIcons
        style={styles.favourite}
        name='heart-outline'
        size={24}
        color='black'
      />
      <Image style={styles.image} source={{ uri: sprite }} />
      <Text style={[styles.name, { color: 'black' }]}>{name}</Text>
      <View style={styles.typesContainer}>
        {types.map((type) => (
          <PokemonType type={type} passedStyle={{ marginHorizontal: 5 }} />
        ))}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 12,
  },
  id: {
    position: 'absolute',
    left: 10,
    top: 10,
    fontSize: 18,
  },
  favourite: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  name: {
    fontSize: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
});
