import React, { createContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { morePokemons } from '../Data';

export const PokemonDataContext = createContext();

export const PokemonDataProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState();
  const [pokemons, setPokemons] = useState();
  const [favouritesPokemons, setFavouritesPokemons] = useState();

  const [currentPokemonId, setCurrentPokemonId] = useState();
  const [currentPokemon, setCurrentPokemon] = useState();
  const [refresh, setRefresh] = useState(false);

  const [filters, setFilters] = useState(null);
  const [sortingValue, setSortingValue] = useState();

  const isPokemonsInit = useRef(true);
  const isSortingInit = useRef(true);

  useEffect(() => {
    morePokemons(1, 100).then((pokemons) => {
      loadPokemons(pokemons);
    });
  }, []);

  useEffect(() => {
    if (isSortingInit.current) {
      isSortingInit.current = false;
    } else {
      sortPokemons();
    }
  }, [sortingValue]);

  useEffect(() => {
    if (pokemons) {
      setCurrentPokemon(pokemons.find((element) => element.id == currentPokemonId));
    }
  }, [currentPokemonId]);

  useEffect(() => {
    if (isPokemonsInit.current) {
      isPokemonsInit.current = false;
    } else {
      filterPokemons(allPokemons);
      setRefresh((item) => !item);
    }
  }, [filters, allPokemons]);

  const resetCurrentPokemon = () => setCurrentPokemon(null);

  const updateFavouritePokemons = (pokemons) =>
    setFavouritesPokemons(pokemons.filter((item) => item.isFavourite));

  const updateSortingValue = (value) => setSortingValue(value);

  const updateCurrentPokemonId = (id) => setCurrentPokemonId(id);

  const updatePokemonFilters = (generations, types) => {
    if (generations.length === 0 && types.length === 0) {
      setFilters(null);
    } else {
      setFilters({ generations, types });
    }
  };

  const toggleFavourite = (id) => {
    setAllPokemons((pokemons) => {
      const editedPokemons = pokemons.map((pokemon) => {
        if (pokemon.id === id) {
          pokemon.isFavourite = !pokemon.isFavourite;
        }
        return pokemon;
      });
      saveFavouritesIds(editedPokemons);
      return editedPokemons;
    });
  };

  const loadPokemons = async (pokemons) => {
    const ids = await loadFavouritesIds(pokemons);
    let pokemonsToLoad = null;
    if (ids) {
      pokemonsToLoad = pokemons.map((pokemon) => {
        if (ids.includes(pokemon.id)) {
          pokemon.isFavourite = !pokemon.isFavourite;
        }
        return pokemon;
      });
    } else {
      pokemonsToLoad = pokemons;
    }
    setPokemons(pokemonsToLoad);
    setAllPokemons(pokemonsToLoad);
    updateFavouritePokemons(pokemons);
  };

  const loadFavouritesIds = async () => {
    try {
      const json = await AsyncStorage.getItem('favouritesIds');
      if (json === null) {
        return null;
      }
      const ids = JSON.parse(json);
      return ids;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const saveFavouritesIds = async (pokemons) => {
    try {
      const json = JSON.stringify(
        pokemons.filter((pokemon) => pokemon.isFavourite).map((pokemon) => pokemon.id)
      );
      await AsyncStorage.setItem('favouritesIds', json);
    } catch (e) {
      console.log(e);
    }
  };

  const sortPokemons = () => {
    let sortedPokemons = allPokemons;
    switch (sortingValue) {
      case 'ascending-id':
        sortedPokemons.sort((a, b) => a.id > b.id);
        break;
      case 'descending-id':
        sortedPokemons.sort((a, b) => b.id > a.id);
        break;
      case 'ascending-alphabet':
        sortedPokemons.sort((a, b) => a.name > b.name);
        break;
      case 'descending-alphabet':
        sortedPokemons.sort((a, b) => b.name > a.name);
        break;
    }

    setAllPokemons(sortedPokemons);
    filterPokemons(sortedPokemons);
    setRefresh((item) => !item);
  };

  const filterPokemons = (sortedPokemons) => {
    if (!filters) {
      setPokemons(sortedPokemons);
      updateFavouritePokemons(sortedPokemons);
    } else {
      setPokemons(
        sortedPokemons.filter((item) => {
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
            throw 'Arrays cannot be empty';
          }
        })
      );
      setFavouritesPokemons(
        sortedPokemons
          .filter((item) => item.isFavourite)
          .filter((item) => {
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
              throw 'Arrays cannot be empty';
            }
          })
      );
    }
  };

  return (
    <PokemonDataContext.Provider
      value={{
        currentPokemon,
        favouritesPokemons,
        pokemons,
        refresh,
        sortingValue,
        resetCurrentPokemon,
        toggleFavourite,
        updatePokemonFilters,
        updateCurrentPokemonId,
        updateSortingValue,
      }}
    >
      {children}
    </PokemonDataContext.Provider>
  );
};
