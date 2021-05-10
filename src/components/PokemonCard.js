import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, Surface, useTheme, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PokemonType from './PokemonType';

export default function PokemonCard({
  onPress,
  onPressFavourite,
  isFavourite,
  id,
  color,
  name,
  sprite,
  types,
}) {
  const colors = useTheme().colors;
  const cardColor = colors.pokemon.background[color];

  return (
    <Surface style={[styles.container, { backgroundColor: cardColor }]}>
      <TouchableRipple borderless={true} style={styles.touch} onPress={() => onPress()}>
        <>
          <Text style={[styles.id, { color: 'black' }]}>
            {'#' + id.toString().padStart(3, '0')}
          </Text>
          <MaterialCommunityIcons
            style={styles.favourite}
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={24}
            color='black'
            onPress={() => onPressFavourite()}
          />
          <View style={styles.innerContainer}>
            <Image style={styles.image} source={{ uri: sprite }} />
            <Text style={[styles.name, { color: 'black' }]}>{name}</Text>
            <View style={styles.typesContainer}>
              {types.map((type, i) => (
                <PokemonType key={i} type={type} passedStyle={{ marginHorizontal: 5 }} />
              ))}
            </View>
          </View>
        </>
      </TouchableRipple>
    </Surface>
  );
}

const CARD_BORDER_RADIUS = 12;

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    borderRadius: CARD_BORDER_RADIUS,
  },
  touch: {
    width: '100%',
    height: '100%',
    borderRadius: CARD_BORDER_RADIUS,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
    width: 85,
    height: 85,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '80%',
  },
});
