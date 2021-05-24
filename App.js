import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './wdyr';

import { DetailsTabs, Filter, HomeTabs } from './src/screens';
import { PokemonDataProvider } from './src/contexts';
import { ThemeDataProvider } from './src/contexts/ThemeDataContext';

const Stack = createStackNavigator();

export default function App() {
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
