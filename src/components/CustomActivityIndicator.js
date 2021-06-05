import React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';

export default function CustomActivityIndicator({ color }) {
  const colors = useTheme().colors;

  return (
    <ActivityIndicator
      size='large'
      color={color}
      style={{ flex: 1, backgroundColor: colors.background }}
    />
  );
}
