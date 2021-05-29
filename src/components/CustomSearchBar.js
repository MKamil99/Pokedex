import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Searchbar, useTheme } from 'react-native-paper';

export default function CustomSearchBar({ onClose, onSubmit, searchQuery, setSearchQuery }) {
  const colors = useTheme().colors;
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Appbar.Header>
      <Searchbar
        placeholder='Search by name or ID'
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={[styles.bar, { backgroundColor: colors.searchBarBackground }]}
        icon='arrow-left'
        onIconPress={() => onClose()}
        iconColor={colors.searchBarIcon}
        inputStyle={{ color: colors.searchBarInput, fontFamily: 'RobotoSlab_400Regular' }}
        placeholderTextColor={colors.searchBarPlaceholder}
        onSubmitEditing={() => onSubmit(searchQuery)}
        autoFocus={searchQuery == ''}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderRadius: 0,
    height: '75%',
    width: '98%',
    marginLeft: '1%',
    fontFamily: 'RobotoSlab_400Regular',
  },
});
