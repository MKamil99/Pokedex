import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';

import DetailsTabsNavigator from './DetailsTabsNavigator';
import HomeTabsNavigator from './HomeTabsNavigator';
import { Filter, NoConnection } from '../screens';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnection, setIsConnection] = useState(false);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsConnection(state.isConnected);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? null : (
    <>
      <RootStack.Navigator headerMode='none'>
        {isConnection ? (
          <RootStack.Screen name='Internet' component={MainNavigator} />
        ) : (
          <RootStack.Screen name='NoInternet' component={NoConnection} />
        )}
      </RootStack.Navigator>
    </>
  );
};

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
    <HomeStack.Screen name='Home' component={HomeTabsNavigator} />
    <HomeStack.Screen name='Filter' component={Filter} />
  </HomeStack.Navigator>
);
