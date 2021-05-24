import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { DetailsAppBar, PokemonGeneralInfo, PokemonStats } from '../../components';

export default function General({ id, name, weight, height, stats, types, color, sprite }) {
  const colors = useTheme().colors;
  const isDarkTheme = useTheme().dark;
  const navigation = useNavigation();

  const generalInfoProps = { id, name, types, weight, height };

  useEffect(() => {
    setStatusBarBackgroundColor(
      isDarkTheme ? colors.primaryDark : colors.pokemon.backgroundDark[color],
      true
    );
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(
        isDarkTheme ? colors.primaryDark : colors.pokemon.backgroundDark[color],
        true
      );
    });
    navigation.addListener('blur', () => {
      setStatusBarBackgroundColor(colors.primaryDark, true);
    });
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <DetailsAppBar color={color} sprite={sprite} />
      <ScrollView>
        <PokemonGeneralInfo {...generalInfoProps} />
        <PokemonStats stats={stats} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
