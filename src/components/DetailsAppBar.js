import React, { useEffect } from 'react';
import { useTheme, Surface, Button } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react/cjs/react.development';
import GetOrientation from '../utilities/GetOrientation';
import IsPortrait from '../utilities/IsPortrait';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function DetailsAppBar({ color, sprite }) {
  const colors = useTheme().colors;
  const isDarkTheme = useTheme().dark;
  const navigation = useNavigation();
  const [currentStyle, setCurrentStyle] = useState(
    IsPortrait(GetOrientation()) ? stylesPortrait : stylesLandscape
  );

  useEffect(() => {
    let isMounted = true;
    ScreenOrientation.addOrientationChangeListener(() => {
      if (isMounted)
        setCurrentStyle(IsPortrait(GetOrientation()) ? stylesPortrait : stylesLandscape);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Surface
      style={[
        currentStyle.container,
        { backgroundColor: isDarkTheme ? colors.primary : colors.pokemon.background[color] },
      ]}
    >
      <View style={currentStyle.leftCorner}>
        <Button
          icon='arrow-left'
          color={colors.caption}
          labelStyle={currentStyle.buttonContent}
          onPress={() => navigation.navigate('Home')}
        >
          Pokedex
        </Button>
      </View>
      <Image style={currentStyle.image} source={sprite} resizeMode='contain' />
    </Surface>
  );
}

const stylesPortrait = StyleSheet.create({
  leftCorner: {
    flexDirection: 'row',
  },
  buttonContent: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
  container: {
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
  },
  image: {
    width: 180,
    height: 180,
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
    fontSize: 20,
    textTransform: 'capitalize',
  },
  container: {
    width: 180,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
  },
  image: {
    width: 180,
    height: 180,
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1,
  },
});
