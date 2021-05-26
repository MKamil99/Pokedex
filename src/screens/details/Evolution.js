import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

import { DetailsAppBar } from '../../components';
import EvolutionCard from '../../components/EvolutionCard';

export default function Evolution({ color, sprite, chain }) {
  const colors = useTheme().colors;

  var tier1 = chain;
  var tier2 = chain.evolvesTo;
  var tier3;

  if (tier2.length == 1) {
    tier3 = tier2[0].evolvesTo;
  } else {
    tier3 = [];
  }

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <DetailsAppBar color={color} sprite={sprite} />
        <ScrollView style={styles.contentArea}>
          <View style={{ paddingBottom: 16 }}>
            <EvolutionCard color={color} id={tier1.pokemonID} />

            {tier2.length == 1 && <EvolutionCard color={color} id={tier2[0].pokemonID} />}
            {tier2.length > 1 && (
              <ScrollView horizontal={true} pagingEnabled={true} persistentScrollbar={true}>
                {tier2.map((it, i) => (
                  <View
                    key={i}
                    style={{ width: Dimensions.get('window').width, paddingBottom: 16 }}
                  >
                    <EvolutionCard color={color} id={it.pokemonID} />
                  </View>
                ))}
              </ScrollView>
            )}

            {tier3.length == 1 && <EvolutionCard color={color} id={tier3[0].pokemonID} />}
            {tier3.length > 1 && (
              <ScrollView horizontal={true} pagingEnabled={true} persistentScrollbar={true}>
                {tier3.map((it, i) => (
                  <View
                    key={i}
                    style={{ width: Dimensions.get('window').width, paddingBottom: 16 }}
                  >
                    <EvolutionCard color={color} id={it.pokemonID} />
                  </View>
                ))}
              </ScrollView>
            )}
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
