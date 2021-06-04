import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

export default function StatBar({ name, value, color }) {
  const colors = useTheme().colors;
  const fontRegular = useTheme().fonts.regular;

  return (
    <View style={styles.container}>
      <Text style={[styles.name, { ...fontRegular, color: colors.cardCaption }]}>{name}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.backgroundBar, { backgroundColor: colors.statBarBackground }]}>
          <View style={[styles.bar, { backgroundColor: color, width: `${(value / 255) * 100}%` }]}>
            <Text style={[styles.value, { ...fontRegular }]}>{value}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: RFValue(12),
  },
  name: {
    fontSize: RFValue(15),
    includeFontPadding: false,
    textAlign: 'right',
    width: '15%',
  },
  barContainer: {
    width: '85%',
    paddingLeft: RFValue(8),
  },
  backgroundBar: {
    width: '100%',
    height: RFValue(18),
    borderRadius: RFValue(9),
  },
  bar: {
    height: RFValue(18),
    borderRadius: RFValue(9),
  },
  value: {
    color: 'white',
    fontSize: RFValue(12),
    textAlign: 'center',
  },
});
