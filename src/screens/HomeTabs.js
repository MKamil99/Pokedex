import React, { useState } from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import Home from './Home';

const HomeRoute = () => <Home />;
const FavouriteRoute = () => <Home />;

export default function HomeTabs() {
  const colors = useTheme().colors;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'favourites', title: 'Favourites', icon: 'heart' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    favourites: FavouriteRoute,
  });

  return (
    <BottomNavigation
      activeColor={colors.primary}
      barStyle={{ backgroundColor: colors.white }}
      inactiveColor='#808080'
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
    />
  );
}
