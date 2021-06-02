import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';

import { DetailsAppBar, PokemonMovesList, VersionPanel } from '../../components';
import GetOrientation from '../../utilities/GetOrientation';
import IsPortrait from '../../utilities/IsPortrait';

export default function Moves({ color, sprite, moves }) {
  const colors = useTheme().colors;
  const [currentStyle, setCurrentStyle] = useState(
    IsPortrait(GetOrientation()) ? stylesPortrait : stylesLandscape
  );
  const [version, setVersion] = useState(moves.length > 0 ? moves[0].versions[0].name : null);
  const versionList = new Set();

  const moveList = moves.filter((move) => move.versions.some((item) => item.name === version));

  moves.forEach((move) => {
    move.versions.forEach((ver) => {
      versionList.add(ver.name);
    });
  });

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {
      ScreenOrientation.getOrientationAsync().then((it) => {
        setCurrentStyle(IsPortrait(it) ? stylesPortrait : stylesLandscape);
      });
    });
  }, []);

  return (
    <>
      <SafeAreaView style={[currentStyle.container, { backgroundColor: colors.background }]}>
        <DetailsAppBar color={color} sprite={sprite} />
        {version ? (
          <ScrollView style={currentStyle.contentArea}>
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
          <View style={currentStyle.clear}>
            <Text>NO MOVES</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const stylesPortrait = StyleSheet.create({
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

const stylesLandscape = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
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
