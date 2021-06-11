import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RFValue } from 'react-native-responsive-fontsize';

import { DetailsAppBar, PokemonMovesList, VersionPanel } from '../../components';
import { isPortrait } from '../../orientation';

export default function Moves({ allMoves, color, currentVersion, sprite, versions }) {
  const colors = useTheme().colors;
  const [styles, setStyles] = useState(isPortrait() ? stylesPortrait : stylesLandscape);

  const [version, setVersion] = useState(currentVersion);
  const [moves, setMoves] = useState([]);
  const [sorting, setSorting] = useState('name-asc');

  const isInitRender = useRef(true);

  const orientationChangeHandler = () => {
    setStyles(isPortrait() ? stylesPortrait : stylesLandscape);
  };

  useEffect(() => {
    let subscription = ScreenOrientation.addOrientationChangeListener(orientationChangeHandler);
    setMoves(sortMoves(allMoves));
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  useEffect(() => {
    if (!isInitRender.current) {
      setMoves((moves) => {
        const filteredMoves = moves.filter((move) =>
          move.versions.some((item) => item.name === version)
        );
        return sortMoves(filteredMoves);
      });
    }
  }, [version]);

  useEffect(() => {
    if (!isInitRender.current) {
      setMoves((values) => sortMoves(values));
    }
  }, [sorting]);

  useEffect(() => {
    isInitRender.current = false;
  }, []);

  const sortMoves = (moves) => {
    switch (sorting) {
      case 'name-asc':
        return [...moves.sort((a, b) => a.name.localeCompare(b.name))];
      case 'name-desc':
        return [...moves.sort((a, b) => b.name.localeCompare(a.name))];
      default:
        return moves;
    }
  };

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <DetailsAppBar color={color} sprite={sprite} />
        {version ? (
          <ScrollView style={styles.contentArea}>
            <View style={{ paddingHorizontal: RFValue(8) }}>
              <VersionPanel version={version} versionList={versions} setVersion={setVersion} />
              <PokemonMovesList moves={moves} onSortPress={setSorting} sortValue={sorting} />
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
