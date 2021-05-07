import React, { createContext, useEffect, useState } from 'react';

import { morePokemons } from '../Data';

export const PokemonDataContext = createContext();

export const PokemonDataProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState();
  const [pokemons, setPokemons] = useState();
  const [currentPokemonId, setCurrentPokemonId] = useState();
  const [currentPokemon, setCurrentPokemon] = useState();
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    morePokemons(1, 100).then((pokemons) => {
      setPokemons(pokemons);
      setAllPokemons(pokemons);
    });
  }, []);

  useEffect(() => {
    if (pokemons) {
      setCurrentPokemon(pokemons.find((element) => element.id == currentPokemonId));
    }
  }, [currentPokemonId]);

  useEffect(() => {
    if (filters) {
      filterPokemons();
    } else {
      setPokemons(allPokemons);
    }
    setRefresh((item) => !item);
  }, [filters]);

  const resetCurrentPokemon = () => setCurrentPokemon(null);

  const updateCurrentPokemonId = (id) => setCurrentPokemonId(id);

  const sortPokemons = (value) => {
    switch (value) {
      case 'ascending-id':
        setAllPokemons((items) => items.sort((a, b) => a.id > b.id));
        break;
      case 'descending-id':
        setAllPokemons((items) => items.sort((a, b) => b.id > a.id));
        break;
      case 'ascending-alphabet':
        setAllPokemons((items) => items.sort((a, b) => a.name > b.name));
        break;
      case 'descending-alphabet':
        setAllPokemons((items) => items.sort((a, b) => b.name > a.name));
        break;
    }

    if (filters) {
      filterPokemons();
    } else {
      setPokemons(allPokemons);
    }
    setRefresh((item) => !item);
  };

  const updatePokemonFilters = (generations, types) => {
    if (generations.length === 0 && types.length === 0) {
      setFilters(null);
    } else {
      setFilters({ generations, types });
    }
  };

  const filterPokemons = () => {
    setPokemons(
      allPokemons.filter((item) => {
        if (filters.generations.length > 0 && filters.types.length > 0) {
          return (
            filters.generations.includes(item.generation) &&
            item.types.some((type) => filters.types.includes(type))
          );
        } else if (filters.generations.length > 0) {
          return filters.generations.includes(item.generation);
        } else if (filters.types.length > 0) {
          return item.types.some((type) => filters.types.includes(type));
        } else {
          return allPokemons;
        }
      })
    );
  };

  return (
    <PokemonDataContext.Provider
      value={{
        currentPokemon,
        updatePokemonFilters,
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
