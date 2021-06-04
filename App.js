import React from 'react';
import './wdyr';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_700Bold,
} from '@expo-google-fonts/roboto-slab';
import AppLoading from 'expo-app-loading';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PokemonDataProvider, ThemeDataProvider } from './src/contexts';
import Navigation from './Navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold,
  });

  return (
    <>
      {fontsLoaded ? (
        <SafeAreaView style={{ flex: 1 }}>
          <PokemonDataProvider>
            <ThemeDataProvider>
              <Navigation />
            </ThemeDataProvider>
          </PokemonDataProvider>
        </SafeAreaView>
      ) : (
        <AppLoading />
      )}
    </>
  );
}
