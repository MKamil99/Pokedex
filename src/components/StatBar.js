import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function StatBar({ name, value, color }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.barContainer}>
        <View style={styles.backgroundBar}>
          <View style={[styles.bar, { backgroundColor: color, width: `${(value / 255) * 100}%` }]}>
            <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 12,
  },
  name: {
    fontSize: 15,
    includeFontPadding: false,
    textAlign: 'right',
    width: '15%',
  },
  barContainer: {
    width: '85%',
    paddingLeft: 8,
  },
  backgroundBar: {
    width: '100%',
    height: 18,
    backgroundColor: '#C4C4C4',
    borderRadius: 9,
  },
  bar: {
    height: 18,
    borderRadius: 9,
  },
  value: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});
