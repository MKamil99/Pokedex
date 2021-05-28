import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

export default function CustomFAB({ onPress, isVisible }) {
  const colors = useTheme().colors;

  return (
    <FAB
      style={[styles.fab, { backgroundColor: colors.bottomBar }]}
      icon='magnify'
      color={colors.activeTab}
      onPress={() => onPress()}
      visible={isVisible}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
