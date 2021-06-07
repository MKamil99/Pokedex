import React, { useEffect } from 'react';
import { BackHandler, View, Image, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function NoConnection() {
  const fontBold = useTheme().fonts.bold;
  const colors = useTheme().colors;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
  }, []);

  return (
    <View style={[style.container, { backgroundColor: colors.background }]}>
      <Image
        style={style.image}
        source={require('../../assets/sadpokemon.jpg')}
        resizeMode='contain'
      />
      <Text style={[style.offlineText, { ...fontBold }]}>You're offline.</Text>
      <Text style={style.descriptionText}>
        To use this application, you need to connect to the internet.
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '20%',
  },
  image: {
    maxWidth: '150%',
    borderRadius: 5,
  },
  offlineText: {
    textAlign: 'center',
    fontSize: 20,
  },
  descriptionText: {
    textAlign: 'center',
  },
});
