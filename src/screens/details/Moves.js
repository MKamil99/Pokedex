import React from 'react';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

import DetailsAppBar from '../../components/DetailsAppBar';
import PokemonMovesList from '../../components/PokemonMovesList';
import VersionPanel from '../../components/VersionPanel';

export default function Moves({ color, sprite, moves }) {
  const colors = useTheme().colors;
  const [version, setVersion] = useState('red-blue');
  var moveList = [];
  var versionList = new Set();

  moves.forEach((move) => {
    move.versions.forEach((ver) => {
      if (ver.name == version) {
        moveList.push(move);
      }
    });
  });

  moves.forEach((move) => {
    move.versions.forEach((ver) => {
      versionList.add(ver.name);
    });
  });

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <DetailsAppBar color={color} sprite={sprite} />
        <ScrollView style={styles.contentArea}>
          <VersionPanel
            version={version}
            versionList={Array.from(versionList)}
            setVersion={setVersion}
          />
          <PokemonMovesList moves={moveList} />
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
    width: '100%',
    paddingHorizontal: 8,
  },
});
