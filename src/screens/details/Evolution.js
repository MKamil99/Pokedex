import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

import { DetailsAppBar, EvolutionArrow, EvolutionCard } from '../../components';

export default function Evolution({ color, sprite, chain }) {
  const colors = useTheme().colors;

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
        <View style={{ width: Dimensions.get('window').width }}>
          {addEvolutionArrow(tier[0])}
          <EvolutionCard color={color} id={tier[0].pokemonID} />
        </View>
      );
    else if (tier.length > 1)
      return (
        <ScrollView horizontal={true} pagingEnabled={true} persistentScrollbar={true}>
          {tier.map((it, i) => (
            <View key={i} style={{ width: Dimensions.get('window').width, paddingBottom: 16 }}>
              {addEvolutionArrow(it)}
              <EvolutionCard color={color} id={it.pokemonID} />
            </View>
          ))}
        </ScrollView>
      );
  };

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <DetailsAppBar color={color} sprite={sprite} />
        <ScrollView style={styles.contentArea}>
          <View style={{ paddingBottom: 16 }}>
            <EvolutionCard color={color} id={tier1.pokemonID} />
            {addEvolutionTier(tier2)}
            {addEvolutionTier(tier3)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  contentArea: {
    width: 'auto',
  },
});
