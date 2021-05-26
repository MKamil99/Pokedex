import React from 'react';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import DetailsAppBar from '../../components/DetailsAppBar';
import PokemonMovesList from '../../components/PokemonMovesList';
import VersionPanel from '../../components/VersionPanel';

export default function Moves({ color, sprite, moves }) {
  const colors = useTheme().colors;
  const [version, setVersion] = useState(moves.length > 0 ? moves[0].versions[0].name : null);
  const versionList = new Set();

  const moveList = moves.filter((move) => move.versions.some((item) => item.name === version));

  moves.forEach((move) => {
    move.versions.forEach((ver) => {
      versionList.add(ver.name);
    });
  });

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <DetailsAppBar color={color} sprite={sprite} />
        {version ? (
          <ScrollView style={styles.contentArea}>
            <View style={{ paddingHorizontal: 8 }}>
              <VersionPanel
                version={version}
                versionList={Array.from(versionList)}
                setVersion={setVersion}
              />
              <PokemonMovesList moves={moveList} />
            </View>
          </ScrollView>
        ) : (
          <View style={styles.clear}>
            <Text>NO MOVES</Text>
          </View>
        )}
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
  },
  clear: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
