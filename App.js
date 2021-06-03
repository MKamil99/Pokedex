import React, { useEffect, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';

import { DetailsTabs, Filter, HomeTabs, NoConnection } from './src/screens';
import { PokemonDataProvider, ThemeDataProvider } from './src/contexts';

const Stack = createStackNavigator();

export default function App() {
  const [isConnection, setIsConnection] = useState(false);
  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold,
  });

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsConnection(state.isConnected);
    });
  }, []);

  return (
    <>
      {fontsLoaded ? (
        <SafeAreaView style={{ flex: 1 }}>
          <PokemonDataProvider>
            <ThemeDataProvider>
              <NavigationContainer>
                <Stack.Navigator headerMode='none' initialRouteName='Home'>
                  <Stack.Screen name='Home' component={HomeTabs} />
                  <Stack.Screen name='Details' component={DetailsTabs} />
                  <Stack.Screen name='Filter' component={Filter} />
                  <Stack.Screen name='NoConnection' component={NoConnection} />
                </Stack.Navigator>
              </NavigationContainer>
            </ThemeDataProvider>
          </PokemonDataProvider>
        </SafeAreaView>
      ) : (
        <AppLoading />
      )}
    </>
  );
}
