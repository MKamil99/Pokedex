import React, { createContext, useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';

import { CustomTheme, CustomDarkTheme } from '../theme';
import { loadThemeSettings, saveThemeSettings } from './StorageActions';
import { calculateColumns } from '../orientation';

export const ThemeDataContext = createContext();
export const ThemeDataProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(CustomTheme);
  const [columns, setColumns] = useState(calculateColumns());

  useEffect(() => {
    loadSettings();
    ScreenOrientation.addOrientationChangeListener(() => {
      setColumns(calculateColumns());
    });
  }, []);

  // Loading settings from storage:
  const loadSettings = async () => {
    const savedTheme = await loadThemeSettings();
    if (savedTheme) setCurrentTheme(savedTheme == 'dark' ? CustomDarkTheme : CustomTheme);
  };

  // Button action: switching theme and saving in Async Storage:
  const switchTheme = () => {
    setCurrentTheme((theme) => (theme == CustomTheme ? CustomDarkTheme : CustomTheme));
    saveThemeSettings(currentTheme == CustomTheme ? 'dark' : 'light');
  };

  return (
    <ThemeDataContext.Provider value={{ switchTheme, columns }}>
      <PaperProvider theme={currentTheme}>{children}</PaperProvider>
    </ThemeDataContext.Provider>
  );
};
