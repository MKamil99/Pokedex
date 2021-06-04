import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';

import { DetailsTabsNavigator, Filter, HomeTabsNavigator, NoConnection } from './src/screens';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [isConnection, setIsConnection] = useState(false);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsConnection(state.isConnected);
    });
  }, []);

  return (
    <RootStack.Navigator headerMode='none'>
      {isConnection ? (
        <RootStack.Screen name='Internet' component={InnerRootNavigator} />
      ) : (
        <RootStack.Screen name='NoInternet' component={NoConnection} />
      )}
    </RootStack.Navigator>
  );
};

const InnerRootStack = createStackNavigator();

const InnerRootNavigator = () => (
  <InnerRootStack.Navigator headerMode='none'>
    <InnerRootStack.Screen name='Home' component={HomeNavigator} />
    <InnerRootStack.Screen name='Details' component={DetailsTabsNavigator} />
  </InnerRootStack.Navigator>
);

const HomeStack = createStackNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator headerMode='none'>
    <HomeStack.Screen name='Home' component={HomeTabsNavigator} />
    <HomeStack.Screen name='Filter' component={Filter} />
  </HomeStack.Navigator>
);
