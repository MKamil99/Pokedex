import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer, CommonActions, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';

import DetailsTabsNavigator from './DetailsTabsNavigator';
import HomeTabsNavigator from './HomeTabsNavigator';
import { Filter, NoConnection } from '../screens';

export default function Navigation() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigationRef = useRef(null);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isConnected) {
      navigationRef.current?.dispatch(CommonActions.navigate('Internet'));
    } else {
      navigationRef.current?.dispatch(CommonActions.navigate('NoInternet'));
    }
  }, [isConnected]);

  return isLoading ? null : (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator();

const RootNavigator = () => (
  <RootStack.Navigator headerMode='none'>
    <RootStack.Screen name='Internet' component={MainNavigator} />
    <RootStack.Screen name='NoInternet' component={NoConnection} />
  </RootStack.Navigator>
);

const MainRootStack = createStackNavigator();

const MainNavigator = () => (
  <MainRootStack.Navigator headerMode='none'>
    <MainRootStack.Screen name='Home' component={HomeNavigator} />
    <MainRootStack.Screen name='Details' component={DetailsTabsNavigator} />
  </MainRootStack.Navigator>
);

const HomeStack = createStackNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator headerMode='none'>
    <HomeStack.Screen name='HomeTabs' component={HomeTabsNavigator} />
    <HomeStack.Screen name='Filter' component={Filter} />
  </HomeStack.Navigator>
);
