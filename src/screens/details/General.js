import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';

import { DetailsAppBar, PokemonGeneralInfo, PokemonStats } from '../../components';
import GetOrientation from '../../utilities/GetOrientation';
import IsPortrait from '../../utilities/IsPortrait';

export default function General({ id, name, weight, height, stats, types, color, sprite }) {
  const colors = useTheme().colors;
  const [currentStyle, setCurrentStyle] = useState(
    IsPortrait(GetOrientation()) ? stylesPortrait : stylesLandscape
  );

  const generalInfoProps = { id, name, types, weight, height };

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {
      ScreenOrientation.getOrientationAsync().then((it) => {
        setCurrentStyle(IsPortrait(it) ? stylesPortrait : stylesLandscape);
      });
    });
  }, []);

  return (
    <SafeAreaView style={[currentStyle.container, { backgroundColor: colors.background }]}>
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
