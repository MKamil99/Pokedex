import React, { useContext } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Divider, Menu, RadioButton, Text, useTheme } from 'react-native-paper';

import { PokemonDataContext } from '../contexts';

const sortingValues = ['ascending', 'descending'];

const SortingParam = ({ name, value }) => {
  const colors = useTheme().colors;
  return (
    <View>
      <Text style={styles.paramTitle}>{name}</Text>
      {sortingValues.map((item, index) => (
        <RadioButton.Item
          key={index}
          color={colors.activeRadioButton}
          labelStyle={styles.radioButtonValue}
          style={styles.radioButtonContainer}
          label={item}
          value={`${item}-${value}`}
        />
      ))}
    </View>
  );
};

const sortingParams = [
  { value: 'id', name: 'id' },
  { value: 'alphabet', name: 'alphabet (A-Z)' },
];

export default function SortingMenu({ anchor, visible, onDismiss }) {
  const { sortingValue, updateSortingValue } = useContext(PokemonDataContext);

  const { width } = Dimensions.get('window');
  const menuWidth = 200;

  return (
    <Menu
      anchor={anchor}
      style={[styles.menu, { width: menuWidth, left: width - menuWidth - 8 }]}
      contentStyle={styles.menuContent}
      onDismiss={() => onDismiss()}
      visible={visible}
    >
      <Text style={styles.mainTitle}>Sort by</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          updateSortingValue(value);
          onDismiss();
        }}
        value={sortingValue}
      >
        {sortingParams.map((item, index) => (
          <React.Fragment key={index}>
            <SortingParam name={item.name} value={item.value} />
            {index != sortingParams.length - 1 && <Divider style={styles.divider} />}
          </React.Fragment>
        ))}
      </RadioButton.Group>
    </Menu>
  );
}

const APPBAR_HEIGHT = 86;
const MENU_BORDER_RADIUS = 12;

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: APPBAR_HEIGHT + 8,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderRadius: MENU_BORDER_RADIUS,
  },
  menuContent: {
    borderRadius: MENU_BORDER_RADIUS,
    flex: 1,
    paddingHorizontal: 18,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 20,
    fontFamily: 'RobotoSlab_700Bold',
    textAlign: 'center',
    paddingVertical: 4,
  },
  paramTitle: {
    fontSize: 16,
    fontFamily: 'RobotoSlab_700Bold',
    textTransform: 'capitalize',
    marginVertical: 8,
  },
  radioButtonContainer: {
    paddingHorizontal: 0,
  },
  radioButtonValue: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  divider: {
    marginVertical: 12,
  },
});
