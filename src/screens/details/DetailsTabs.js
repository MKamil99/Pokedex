import React, { useState } from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import Evolution from './Evolution';
import General from './General';
import Moves from './Moves';

const GeneralRoute = () => <General />;
const MovesRoute = () => <Moves />;
const EvolutionRoute = () => <Evolution />;

export default function DetailsTabs() {
  const colors = useTheme().colors;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'general', title: 'General', icon: 'information' },
    { key: 'moves', title: 'Moves', icon: 'paw' },
    { key: 'evolution', title: 'Evolution', icon: 'atom' },
    // alternatives for evolution: atom, lan, source-branch,
    // tournament, vector-polyline, chart-timeline-variant
  ]);

  const renderScene = BottomNavigation.SceneMap({
    general: GeneralRoute,
    moves: MovesRoute,
    evolution: EvolutionRoute,
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
