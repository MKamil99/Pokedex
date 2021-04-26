import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ApiTesting from './src/screens/ApiTesting';
import { CustomTheme } from './src/theme';
const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={CustomTheme}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='ApiTesting' component={ApiTesting} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
