import React, { createContext, useEffect, useRef, useState } from 'react';

import { allPokemonsFromAPI, morePokemons } from './PokeApiData';

export const PokemonDataContext = createContext();

export const PokemonDataProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemonId, setCurrentPokemonId] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({ generations: [], types: [] });
  const [renderedPokemonId, setRenderedPokemonId] = useState(0);

  const isInit = useRef(true);

  useEffect(() => {
    allPokemonsFromAPI().then((pokemons) => {
      setPokemons(pokemons);
      setAllPokemons(pokemons);
      setRenderedPokemonId(1);
    });
  }, []);

  const step = 50;
  useEffect(() => {
    if (
      allPokemons.length > 0 &&
      renderedPokemonId > 0 &&
      renderedPokemonId <= allPokemons[allPokemons.length - 1].id
    ) {
      morePokemons(renderedPokemonId, renderedPokemonId + step - 1)
        .then((pokemons) => pokemons.map((pokemon) => updatePokemonObject(pokemon)))
        .then(() => setRenderedPokemonId(renderedPokemonId + step));
    }
  }, [renderedPokemonId]);

  useEffect(() => {
    if (pokemons) {
      setCurrentPokemon(pokemons.find((element) => element.id == currentPokemonId));
    }
  }, [currentPokemonId]);

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
    } else {
      filterPokemons();
      setRefresh((item) => !item);
    }
  }, [filters]);

  const resetCurrentPokemon = () => setCurrentPokemonId(null);

  const updatePokemonObject = (newPokemonObject) => {
    let index = pokemons.findIndex((pokemon) => pokemon.id == newPokemonObject.id);
    if (index >= 0) {
      let newPokemons = pokemons;
      newPokemons[index] = newPokemonObject;
      setPokemons(newPokemons);
    }
  };

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

    if (filters.generations.length > 0 || filters.types.length > 0) {
      filterPokemons();
    } else {
      setPokemons(allPokemons);
    }
    setRefresh((item) => !item);
  };

  const updatePokemonFilters = (generations, types) => {
    setFilters({ generations, types });
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
        updatePokemonObject,
      }}
    >
      {children}
    </PokemonDataContext.Provider>
  );
};
