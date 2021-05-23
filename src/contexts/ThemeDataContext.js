import React, { createContext, useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { CustomTheme, CustomDarkTheme } from '../theme';
import { loadThemeSettings, saveThemeSettings } from './StorageActions';

export const ThemeDataContext = createContext();
export const ThemeDataProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(CustomTheme);

  useEffect(() => {
    loadSettings();
  }, []);

  // Loading settings from storage:
  const loadSettings = async () => {
    const savedTheme = await loadThemeSettings();
    if (savedTheme) setCurrentTheme(savedTheme == 'dark' ? CustomDarkTheme : CustomTheme);
  };

  // Button action: switching theme and saving in Async Storage:
  const switchTheme = () => {
    setCurrentTheme(currentTheme == CustomTheme ? CustomDarkTheme : CustomTheme);
    saveThemeSettings(currentTheme == CustomTheme ? 'dark' : 'light');
  };

  return (
    <ThemeDataContext.Provider value={{ switchTheme }}>
      <PaperProvider theme={currentTheme}>{children}</PaperProvider>
    </ThemeDataContext.Provider>
  );
};
