import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { pokemonByNameOrNumber } from '../contexts/PokeApiData';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import PokemonType from '../components/PokemonType';

export default EvolutionCard = ({ color, id }) => {
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
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 164,
    flexDirection: 'row',
    borderRadius: 20,
    elevation: 8,
    marginTop: 16,
    marginHorizontal: 8,
  },
  tmpContainer: {
    width: 'auto',
    height: 164,
    flexDirection: 'row',
    borderRadius: 20,
    elevation: 8,
    marginTop: 16,
    marginHorizontal: 8,
  },
  pokemonContainer: {
    height: '100%',
    width: '50%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  image: {
    height: 132,
    width: 132,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  info: {
    height: '100%',
    width: '50%',
  },
  pokemonName: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 8,
  },
  pokemonId: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  typeBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  typeContainer: {
    width: '50%',
    borderRadius: 100,
  },
  typeText: {
    fontSize: 16,
  },
});
