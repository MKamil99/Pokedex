import React, { createContext, useEffect, useState } from 'react';

import { morePokemons } from '../Data';

export const PokemonDataContext = createContext();

export const PokemonDataProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState();
  const [currentPokemonId, setCurrentPokemonId] = useState();
  const [currentPokemon, setCurrentPokemon] = useState();
  const [refresh, setRefresh] = useState(false);
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

  const sortPokemons = (value) => {
    switch (value) {
      case 'ascending-id':
        setPokemons((items) => items.sort((a, b) => a.id > b.id));
        break;
      case 'descending-id':
        setPokemons((items) => items.sort((a, b) => b.id > a.id));
        break;
      case 'ascending-alphabet':
        setPokemons((items) => items.sort((a, b) => a.name > b.name));
        break;
      case 'descending-alphabet':
        setPokemons((items) => items.sort((a, b) => b.name > a.name));
        break;
    }

    setRefresh((item) => !item);
  };

  return (
    <PokemonDataContext.Provider
      value={{
        currentPokemon,
        pokemons,
        refresh,
        resetCurrentPokemon,
        sortPokemons,
        updateCurrentPokemonId,
      }}
    >
      {children}
    </PokemonDataContext.Provider>
  );
};
