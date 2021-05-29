import React from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_700Bold,
} from '@expo-google-fonts/roboto-slab';
import './wdyr';

import { DetailsTabs, Filter, HomeTabs } from './src/screens';
import { PokemonDataProvider } from './src/contexts';
import { ThemeDataProvider } from './src/contexts/ThemeDataContext';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
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
    );
  }
}
