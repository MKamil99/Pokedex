import React, { useContext } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Divider, Menu, RadioButton, Text, useTheme } from 'react-native-paper';

import { PokemonDataContext } from '../contexts';

const sortingValues = ['ascending', 'descending'];

const SortingParam = ({ name, value }) => {
  const colors = useTheme().colors;
  const fontBold = useTheme().fonts.bold;
  return (
    <View>
      <Text style={[styles.paramTitle, { ...fontBold }]}>{name}</Text>
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
  const fontBold = useTheme().fonts.bold;

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
      <Text style={[styles.mainTitle, { ...fontBold }]}>Sort by</Text>
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
    borderRadius: MENU_BORDER_RADIUS,
  },
  menuContent: {
    borderRadius: MENU_BORDER_RADIUS,
    paddingHorizontal: 18,
  },
  mainTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  paramTitle: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  radioButtonContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  radioButtonValue: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  divider: {
    marginVertical: 12,
  },
});
