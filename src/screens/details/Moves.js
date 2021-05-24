import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { DetailsAppBar } from '../../components';

export default function Moves({ color, sprite }) {
  const colors = useTheme().colors;

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <DetailsAppBar color={color} sprite={sprite} />
        <Text style={{ color: colors.cardCaption }}>[Moves]</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
});
