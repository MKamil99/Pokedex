import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { allPokemons, pokemonByNameOrNumber } from './Data';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataToDisplay, setDataToDisplay] = useState("");
  useEffect(() => {
    pokemonByNameOrNumber(4, setDataToDisplay, setIsLoading, false); 
    console.log("Used Effect!")}, 
  []);

  return (
    isLoading 
    ? 
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View> 
    :
    <View style={styles.container}>
      <Text>{dataToDisplay.number}. {dataToDisplay.name}</Text>
      <Text>{dataToDisplay.weight} {dataToDisplay.height}</Text>
      <Text>{dataToDisplay.types.map(i => " " + i + " ")}</Text>
      <Text>{dataToDisplay.color}</Text>
      <Image style={styles.logo} source={{uri: dataToDisplay.sprite}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  }
});
