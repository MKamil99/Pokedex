import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ApiTesting, HomeTabs, DetailsTabs } from './src/screens';
import { CustomTheme } from './src/theme';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={CustomTheme}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none' initialRouteName='Home'>
          <Stack.Screen name='ApiTesting' component={ApiTesting} />
          <Stack.Screen name='Home' component={HomeTabs} />
          <Stack.Screen name='Details' component={DetailsTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
