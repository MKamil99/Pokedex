import React, { createContext, useEffect, useState } from 'react';

import { morePokemons } from '../Data';

export const PokemonDataContext = createContext();

export const PokemonDataProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState();
  const [currentPokemonId, setCurrentPokemonId] = useState();
  const [currentPokemon, setCurrentPokemon] = useState();

  useEffect(() => {
    morePokemons(1, 100).then((pokemons) => setPokemons(pokemons));
  }, []);

  useEffect(() => {
    if (pokemons) {
      setCurrentPokemon(pokemons.find((element) => element.id == currentPokemonId));
    }
  }, [currentPokemonId]);

  const resetCurrentPokemon = () => setCurrentPokemon(null);

  const updateCurrentPokemonId = (id) => setCurrentPokemonId(id);

  return (
    <PokemonDataContext.Provider
      value={{ currentPokemon, pokemons, resetCurrentPokemon, updateCurrentPokemonId }}
    >
      {children}
    </PokemonDataContext.Provider>
  );
};
