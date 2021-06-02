import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
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
        <>
          {isConnection ? (
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
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: '20%',
              }}
            >
              <Image
                style={{ maxWidth: '150%' }}
                source={require('./assets/sadpokemon.jpg')}
                resizeMode='contain'
              />
              <Text style={{ textAlign: 'center', fontFamily: 'RobotoSlab_700Bold', fontSize: 20 }}>
                You're offline.
              </Text>
              <Text style={{ textAlign: 'center', fontFamily: 'RobotoSlab_400Regular' }}>
                To use this application, you need to connect to the internet.
              </Text>
            </View>
          )}
        </>
      ) : (
        <AppLoading />
      )}
    </>
  );
}
