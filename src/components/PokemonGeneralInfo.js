import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

import PokemonType from './PokemonType';

export default function PokemonGeneralInfo({ id, name, types, weight, height }) {
  const colors = useTheme().colors;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.name, { color: colors.cardCaption }]}>{name}</Text>

      <Text style={[styles.id, { color: colors.cardCaption }]}>
        {'#' + id.toString().padStart(3, '0')}
      </Text>

      <View style={styles.typesContainer}>
        {types.map((type, index) => (
          <PokemonType
            key={index}
            type={type}
            containerStyle={styles.typeContainer}
            textStyle={styles.typeText}
          />
        ))}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={[styles.infoText, { color: colors.cardCaption }]}>Weight</Text>
          <Text style={styles.infoData}>{weight.toFixed(1) + ' KG'}</Text>
        </View>

        <View style={styles.info}>
          <Text style={[styles.infoText, { color: colors.cardCaption }]}>Height</Text>
          <Text style={styles.infoData}>{height.toFixed(2) + ' M'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 'auto',
    borderRadius: RFValue(20),
    padding: RFValue(8),
    elevation: RFValue(8),
    marginTop: RFValue(16),
  },
  name: {
    fontSize: RFValue(30),
    textAlign: 'center',
    lineHeight: RFValue(30),
  },
  id: {
    fontSize: RFValue(20),
    textAlign: 'center',
    lineHeight: RFValue(20),
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: RFValue(8),
  },
  typeContainer: {
    width: RFValue(130),
    height: RFValue(30),
    borderRadius: RFValue(15),
  },
  typeText: {
    fontSize: RFValue(20),
  },
  infoContainer: {
    flexDirection: 'row',
    paddingTop: RFValue(8),
  },
  info: {
    width: '50%',
  },
  infoText: {
    textAlign: 'center',
    fontSize: RFValue(15),
  },
  infoData: {
    textAlign: 'center',
    fontSize: RFValue(20),
  },
});
