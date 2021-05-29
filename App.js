import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './wdyr';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_700Bold,
} from '@expo-google-fonts/roboto-slab';
import AppLoading from 'expo-app-loading';

import { DetailsTabs, Filter, HomeTabs } from './src/screens';
import { PokemonDataProvider } from './src/contexts';
import { ThemeDataProvider } from './src/contexts/ThemeDataContext';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold,
  });

  return (
    <>
      {fontsLoaded ? (
        <PokemonDataProvider>
          <ThemeDataProvider>
            <NavigationContainer>
              <Stack.Navigator headerMode='none' initialRouteName='Home'>
                <Stack.Screen name='Home' component={HomeTabs} />
                <Stack.Screen name='Details' component={DetailsTabs} />
                <Stack.Screen name='Filter' component={Filter} />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeDataProvider>
        </PokemonDataProvider>
      ) : (
        <AppLoading />
      )}
    </>
  );
}
