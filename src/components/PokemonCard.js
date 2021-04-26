import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PokemonCard({ id, name, height, weight, sprite, types, color }) {
  return (
    <Surface style={styles.container}>
      <Text style={styles.id}>{'#' + id}</Text>
      <MaterialCommunityIcons
        style={styles.favourite}
        name='heart-outline'
        size={24}
        color='black'
      />
      <Image style={styles.image} source={{ uri: sprite }} />
      <Text style={{ color: 'black' }}>{name || 'asf'}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  id: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  favourite: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});
