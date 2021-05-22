import React, { createContext, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { CustomTheme, CustomDarkTheme } from '../theme';

export const ThemeDataContext = createContext();
export const ThemeDataProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(CustomTheme);
  const switchTheme = () =>
    setCurrentTheme(currentTheme == CustomTheme ? CustomDarkTheme : CustomTheme);

  return (
    <ThemeDataContext.Provider value={{ currentTheme, switchTheme }}>
      <PaperProvider theme={currentTheme}>{children}</PaperProvider>
    </ThemeDataContext.Provider>
  );
};
