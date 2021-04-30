import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

import { MainAppBar } from '../../components';

export default function Favourites() {
  return (
    <>
      <MainAppBar />
      <SafeAreaView style={styles.ListContainer}>
        <Text>[Favourites]</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
