import React from 'react';
import { MainAppBar } from '../components';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

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
