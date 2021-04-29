import React, { createContext, useEffect, useState } from 'react';
import { morePokemons } from '../Data';

export const PokemonDataContext = createContext();

export const PokemonDataProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState();
  const [currentPokemon, setCurrentPokemon] = useState();

  useEffect(() => {
    morePokemons(1, 100).then((pokemons) => setPokemons(pokemons));
  }, []);

  const updateCurrentPokemon = (id) =>
    setCurrentPokemon(pokemons.find((element) => element.id == id));

  return (
    <PokemonDataContext.Provider value={{ pokemons, currentPokemon, updateCurrentPokemon }}>
      {children}
    </PokemonDataContext.Provider>
  );
};
