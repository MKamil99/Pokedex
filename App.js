import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import NetInfo from '@react-native-community/netinfo';

import { DetailsTabs, Filter, HomeTabs } from './src/screens';
import { PokemonDataProvider, ThemeDataProvider } from './src/contexts';
import { View, StatusBar } from 'react-native';

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
      {isConnection ? (
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
                    </Stack.Navigator>
                  </NavigationContainer>
                </ThemeDataProvider>
              </PokemonDataProvider>
            </SafeAreaView>
          ) : (
            <AppLoading />
          )}
        </>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: '20%',
          }}
        >
          <Text>
            There is no internet connection. To use this app u need to connect with the internet.
          </Text>
        </SafeAreaView>
      )}
    </>
  );
}
