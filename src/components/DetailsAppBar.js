import React, { useEffect, useState } from 'react';
import { useTheme, Surface, Button } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { isPortrait } from '../orientation';

export default function DetailsAppBar({ color, sprite }) {
  const colors = useTheme().colors;
  const isDarkTheme = useTheme().dark;
  const navigation = useNavigation();
  let styles = isPortrait() ? stylesPortrait : stylesLandscape;

  return (
    <Surface
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? colors.primary : colors.pokemon.background[color] },
      ]}
    >
      <View style={styles.leftCorner}>
        <Button
          icon='arrow-left'
          color={colors.caption}
          labelStyle={styles.buttonContent}
          onPress={() => navigation.navigate('Home')}
        >
          Pokedex
        </Button>
      </View>
      <Image style={styles.image} source={sprite} resizeMode='contain' />
    </Surface>
  );
}

const stylesPortrait = StyleSheet.create({
  leftCorner: {
    flexDirection: 'row',
  },
  buttonContent: {
    fontSize: RFValue(20),
    textTransform: 'capitalize',
  },
  container: {
    width: '100%',
    borderBottomLeftRadius: RFValue(30),
    borderBottomRightRadius: RFValue(30),
    elevation: 8,
  },
  image: {
    width: RFValue(180),
    height: RFValue(180),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
  },
});

const stylesLandscape = StyleSheet.create({
  leftCorner: {
    flexDirection: 'row',
  },
  buttonContent: {
    fontSize: RFValue(20),
    textTransform: 'capitalize',
  },
  container: {
    width: RFValue(180),
    borderTopRightRadius: RFValue(30),
    borderBottomRightRadius: RFValue(30),
    elevation: 8,
  },
  image: {
    width: RFValue(180),
    height: RFValue(180),
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1,
  },
});
