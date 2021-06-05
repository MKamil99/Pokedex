import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RFValue } from 'react-native-responsive-fontsize';

import { DetailsAppBar, EvolutionArrow, EvolutionCard } from '../../components';
import { isPortrait } from '../../orientation';

export default function Evolution({ color, sprite, chain }) {
  const colors = useTheme().colors;
  const [width, setWidth] = useState(
    isPortrait() ? Dimensions.get('window').width : Dimensions.get('window').width - RFValue(180)
  );
  const [styles, setStyles] = useState(isPortrait() ? stylesPortrait : stylesLandscape);

  const orientationChangeHandler = () => {
    setWidth(
      isPortrait() ? Dimensions.get('window').width : Dimensions.get('window').width - RFValue(180)
    );
    setStyles(isPortrait() ? stylesPortrait : stylesLandscape);
  };

  useEffect(() => {
    let subscription = ScreenOrientation.addOrientationChangeListener(orientationChangeHandler);
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const tier1 = chain;
  const tier2 = chain.evolvesTo;
  const tier3 = tier2.length == 1 ? tier2[0].evolvesTo : [];

  const addEvolutionArrow = (nextForm) => {
    if (nextForm.evolvedBecause[0].level)
      return <EvolutionArrow data={nextForm.evolvedBecause[0].level + ' lvl'} color={color} />;
    else if (nextForm.evolvedBecause[0].item)
      return (
        <EvolutionArrow
          data={nextForm.evolvedBecause[0].item
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
          color={color}
        />
      );
    else if (nextForm.evolvedBecause[0].happiness)
      return <EvolutionArrow data={'Happiness'} color={color} />;
    else return <EvolutionArrow data={''} color={color} />;
  };

  const addEvolutionTier = (tier) => {
    if (tier.length == 1)
      return (
        <View>
          {addEvolutionArrow(tier[0])}
          <EvolutionCard color={color} id={tier[0].pokemonID} />
        </View>
      );
    else if (tier.length > 1)
      return (
        <ScrollView horizontal={true} pagingEnabled={true} persistentScrollbar={true}>
          {tier.map((it, i) => (
            <View key={i} style={{ width: width, paddingBottom: RFValue(16) }}>
              {addEvolutionArrow(it)}
              <EvolutionCard color={color} id={it.pokemonID} />
            </View>
          ))}
        </ScrollView>
      );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <DetailsAppBar color={color} sprite={sprite} />
      <ScrollView style={styles.contentArea}>
        <View style={{ paddingBottom: RFValue(16) }}>
          <EvolutionCard color={color} id={tier1.pokemonID} />
          {addEvolutionTier(tier2)}
          {addEvolutionTier(tier3)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesPortrait = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  contentArea: {
    width: 'auto',
  },
});

const stylesLandscape = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
  },
  contentArea: {
    width: 'auto',
  },
});
