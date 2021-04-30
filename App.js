import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DetailsTabs, HomeTabs } from './src/screens';
import { CustomTheme } from './src/theme';
import { PokemonDataProvider } from './src/contexts';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PokemonDataProvider>
      <PaperProvider theme={CustomTheme}>
        <NavigationContainer>
          <Stack.Navigator headerMode='none' initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeTabs} />
            <Stack.Screen name='Details' component={DetailsTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PokemonDataProvider>
  );
}
