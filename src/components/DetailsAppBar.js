import React, { useContext } from 'react';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { useTheme, Surface, Button } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemeDataContext } from '../contexts/ThemeDataContext';

export default function DetailsAppBar({ color, sprite }) {
  const { currentTheme } = useContext(ThemeDataContext);
  const colors = useTheme().colors;
  const navigation = useNavigation();

  setStatusBarBackgroundColor(
    currentTheme.dark ? colors.primaryDark : colors.pokemon.backgroundDark[color]
  );

  return (
    <Surface
      style={[
        styles.container,
        { backgroundColor: currentTheme.dark ? colors.primary : colors.pokemon.background[color] },
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
      <Image style={styles.image} source={sprite} />
    </Surface>
  );
}

const styles = StyleSheet.create({
  leftCorner: {
    top: 30,
    flexDirection: 'row',
  },
  buttonContent: {
    fontSize: 20,
  },
  container: {
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
