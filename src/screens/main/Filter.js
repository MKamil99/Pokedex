import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Chip, Divider, Text, useTheme } from 'react-native-paper';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';

import { PokemonDataContext } from '../../contexts/PokemonDataContext';

const FilterAppbar = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title='Filter by' />
    </Appbar.Header>
  );
};

const initGenerations = [
  { value: 'I', isSelected: false },
  { value: 'II', isSelected: false },
  { value: 'III', isSelected: false },
  { value: 'IV', isSelected: false },
  { value: 'V', isSelected: false },
  { value: 'VI', isSelected: false },
  { value: 'VII', isSelected: false },
  { value: 'VIII', isSelected: false },
];

const initTypes = [
  { value: 'bug', isSelected: false },
  { value: 'dark', isSelected: false },
  { value: 'dragon', isSelected: false },
  { value: 'electric', isSelected: false },
  { value: 'fairy', isSelected: false },
  { value: 'fighting', isSelected: false },
  { value: 'fire', isSelected: false },
  { value: 'flying', isSelected: false },
  { value: 'ghost', isSelected: false },
  { value: 'grass', isSelected: false },
  { value: 'ground', isSelected: false },
  { value: 'ice', isSelected: false },
  { value: 'normal', isSelected: false },
  { value: 'poison', isSelected: false },
  { value: 'psychic', isSelected: false },
  { value: 'rock', isSelected: false },
  { value: 'steel', isSelected: false },
  { value: 'water', isSelected: false },
];

export default function Filter() {
  const navigation = useNavigation();
  const colors = useTheme().colors;
  setStatusBarBackgroundColor(colors.primaryDark);
  const { updatePokemonFilters } = useContext(PokemonDataContext);
  const [generations, setGenerations] = useState(initGenerations);
  const [types, setTypes] = useState(initTypes);

  useEffect(() => {
    navigation.addListener('blur', () => {
      const generationValues = generations
        .filter((item) => item.isSelected)
        .map((item) => item.value);

      const typeValues = types.filter((item) => item.isSelected).map((item) => item.value);

      updatePokemonFilters(generationValues, typeValues);
    });
  }, []);

  return (
    <>
      <FilterAppbar />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Generations</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.generationsContainer}
        >
          {generations.map((generation, index) => (
            <Chip
              style={styles.chip}
              textStyle={styles.chipText}
              key={index}
              selected={generation.isSelected}
              onPress={() =>
                setGenerations((items) =>
                  items.map((item) => {
                    if (item.value == generation.value) {
                      item.isSelected = !item.isSelected;
                    }
                    return item;
                  })
                )
              }
            >
              {generation.value}
            </Chip>
          ))}
        </ScrollView>
        <Divider style={styles.divider} />
        <Text style={styles.title}>Types</Text>
        <View style={styles.typesContainer}>
          {types.map((type, index) => (
            <Chip
              style={styles.chip}
              textStyle={styles.chipText}
              key={index}
              selected={type.isSelected}
              onPress={() =>
                setTypes((items) =>
                  items.map((item) => {
                    if (item.value == type.value) {
                      item.isSelected = !item.isSelected;
                    }
                    return item;
                  })
                )
              }
            >
              {type.value}
            </Chip>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  generationsContainer: {
    marginHorizontal: -6,
    marginVertical: -8,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: -6,
    marginVertical: -8,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  divider: {
    marginVertical: 30,
  },
  chip: {
    marginHorizontal: 6,
    marginVertical: 8,
  },
  chipText: {
    fontSize: 16,
  },
});
