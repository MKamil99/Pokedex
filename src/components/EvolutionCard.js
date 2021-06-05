import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

import { pokemonByNameOrNumber } from '../contexts';
import CustomActivityIndicator from './CustomActivityIndicator';
import PokemonType from './PokemonType';

export default function EvolutionCard({ color, id }) {
  const colors = useTheme().colors;
  const isDarkTheme = useTheme().dark;
  const activityIndicator = isDarkTheme
    ? colors.activityIndicator
    : colors.pokemon.background[color];

  const [pokemonColor, setPokemonColor] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    pokemonByNameOrNumber(id).then((data) => {
      setPokemon(data);
      setPokemonColor(
        isDarkTheme ? colors.evolutionCardBackground : colors.pokemon.background[data.color]
      );
    });
  }, []);

  return (
    <>
      {pokemon ? (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
          <View style={[styles.pokemonContainer, { backgroundColor: pokemonColor }]}>
            <Image style={styles.image} source={pokemon.sprite} />
          </View>
          <View style={styles.info}>
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
            <Text style={styles.pokemonId}>{'#' + pokemon.id.toString().padStart(3, '0')}</Text>
            <View style={styles.typeBox}>
              {pokemon.types.map((type, index) => (
                <PokemonType
                  key={index}
                  type={type}
                  containerStyle={styles.typeContainer}
                  textStyle={styles.typeText}
                />
              ))}
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.tmpContainer, { backgroundColor: colors.card }]}>
          <View style={{ width: '100%' }}>
            <CustomActivityIndicator color={activityIndicator} />
          </View>
        </View>
      )}
    </>
  );
}

const SPRITE_SIZE = RFValue(132);
const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: RFValue(164),
    flexDirection: 'row',
    borderRadius: RFValue(20),
    elevation: 8,
    marginTop: RFValue(16),
    marginHorizontal: RFValue(8),
  },
  tmpContainer: {
    width: 'auto',
    height: RFValue(164),
    flexDirection: 'row',
    borderRadius: RFValue(20),
    elevation: 8,
    marginTop: RFValue(16),
    marginHorizontal: RFValue(8),
  },
  pokemonContainer: {
    height: '100%',
    width: '50%',
    maxWidth: SPRITE_SIZE * 1.4,
    borderTopLeftRadius: RFValue(20),
    borderBottomLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(100),
    borderBottomRightRadius: RFValue(100),
  },
  image: {
    height: SPRITE_SIZE,
    width: SPRITE_SIZE,
    marginHorizontal: RFValue(16),
    marginVertical: RFValue(16),
  },
  info: {
    height: '100%',
    width: '50%',
  },
  pokemonName: {
    fontSize: RFValue(25),
    textAlign: 'center',
    paddingTop: RFValue(8),
  },
  pokemonId: {
    fontSize: RFValue(20),
    textAlign: 'center',
    lineHeight: RFValue(20),
  },
  typeBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  typeContainer: {
    width: '50%',
    borderRadius: RFValue(100),
  },
  typeText: {
    fontSize: RFValue(16),
  },
});
