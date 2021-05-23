import React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';

export default function CustomActivityIndicator() {
  const colors = useTheme().colors;

  return <ActivityIndicator size='large' color={colors.primary} style={{ flex: 1 }} />;
}
