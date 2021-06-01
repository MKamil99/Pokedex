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
  const [orientation, setOrientation] = useState(GetOrientation());

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {
      ScreenOrientation.getOrientationAsync().then((it) => {
        setOrientation(it);
      });
    });
  }, []);

  const view = (orientation) => {
    if (IsPortrait(orientation)) {
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
          <Image style={styles.image} source={sprite} />
        </Surface>
      );
    } else {
      return (
        <Surface
          style={[
            stylesLandscape.container,
            { backgroundColor: isDarkTheme ? colors.primary : colors.pokemon.background[color] },
          ]}
        >
          <View style={stylesLandscape.leftCorner}>
            <Button
              icon='arrow-left'
              color={colors.caption}
              labelStyle={stylesLandscape.buttonContent}
              onPress={() => navigation.navigate('Home')}
            >
              Pokedex
            </Button>
          </View>
          <Image style={stylesLandscape.image} source={sprite} resizeMode='contain' />
        </Surface>
      );
    }
  };

  return view(orientation);
}

const styles = StyleSheet.create({
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
