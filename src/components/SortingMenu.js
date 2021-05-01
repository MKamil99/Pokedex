import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Menu, RadioButton, Text } from 'react-native-paper';

const SortingItem = ({ content }) => (
  <View style={styles.itemContainer}>
    <Text>{content}</Text>
    <RadioButton value={content} status={true} />
  </View>
);

export default function SortingMenu({ anchor }) {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Menu anchor={anchor} style={styles.menu} visible={true}>
      <View style={styles.container}>
        <Text>Sort by</Text>
        <Text>Alphabet (A-Z)</Text>
        <SortingItem content='Ascending' />
        <SortingItem content='Descending' />
        <Divider />
        <Text>Id</Text>
        <SortingItem content='Ascending' />
        <SortingItem content='Descending' />
      </View>
    </Menu>
  );
}

const APPBAR_HEIGHT = 90;
const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: APPBAR_HEIGHT,
    right: 8,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderRadius: 12,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    padding: 8,
  },
});
