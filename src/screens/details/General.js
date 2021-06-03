import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';

import { DetailsAppBar, PokemonGeneralInfo, PokemonStats } from '../../components';
import { isPortrait } from '../../orientation';

export default function General({ id, name, weight, height, stats, types, color, sprite }) {
  const colors = useTheme().colors;
  const [styles, setStyles] = useState(isPortrait() ? stylesPortrait : stylesLandscape);

  const generalInfoProps = { id, name, types, weight, height };

  const orientationChangeHandler = () => {
    setStyles(isPortrait() ? stylesPortrait : stylesLandscape);
  };

  useEffect(() => {
    let subscription = ScreenOrientation.addOrientationChangeListener(orientationChangeHandler);
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <DetailsAppBar color={color} sprite={sprite} />
      <ScrollView>
        <View style={{ paddingHorizontal: 8 }}>
          <PokemonGeneralInfo {...generalInfoProps} />
          <PokemonStats stats={stats} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesPortrait = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

const stylesLandscape = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
});
