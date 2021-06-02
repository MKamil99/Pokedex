import React, { memo, useState, useEffect } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { Text, useTheme, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import PokemonType from './PokemonType';
import { calculateColumns } from '../orientation';

export default memo(
  ({ onPress, onPressFavourite, isFavourite, id, color, name, sprite, types }) => {
    const colors = useTheme().colors;
    const [cardSize, setCardSize] = useState(
      (Dimensions.get('window').width - VIEW_MARGIN) / calculateColumns() - CARD_MARGIN * 2
    );

    useEffect(() => {
      ScreenOrientation.addOrientationChangeListener(() => {
        setCardSize(
          (Dimensions.get('window').width - VIEW_MARGIN) / calculateColumns() - CARD_MARGIN * 2
        );
      });
    }, []);

    return (
      <TouchableRipple
        borderless={true}
        style={[
          styles.card,
          { backgroundColor: colors.pokemon.background[color], width: cardSize, height: cardSize },
        ]}
        onPress={() => onPress()}
      >
        <View style={styles.container}>
          <View style={styles.header}>
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
          </View>

          <Image style={styles.image} source={{ uri: sprite }} resizeMode='contain' />

          <Text style={[styles.name, { color: 'black' }]}>{name}</Text>

          {
            <View style={styles.typesContainer}>
              {types.map((type, i) => (
                <PokemonType key={i} type={type.name} passedStyle={{ marginHorizontal: 5 }} />
              ))}
            </View>
          }
        </View>
      </TouchableRipple>
    );
  }
);

const CARD_BORDER_RADIUS = 12;
const CARD_MARGIN = 4;
const VIEW_MARGIN = 8;

const styles = StyleSheet.create({
  card: {
    margin: CARD_MARGIN,
    padding: 8,
    paddingBottom: 16,
    borderRadius: CARD_BORDER_RADIUS,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  id: {
    fontSize: 18,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 8,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
