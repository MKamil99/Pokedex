import React from 'react';
import { useTheme, Surface, Button, Text } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DetailsAppBar({ color, sprite }) {
  const colors = useTheme().colors;
  const isDarkTheme = useTheme().dark;
  const navigation = useNavigation();

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
          <Text style={[styles.buttonContent, { color: colors.caption }]}>Pokedex</Text>
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
    fontFamily: 'RobotoSlab_400Regular',
    textTransform: 'capitalize',
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
