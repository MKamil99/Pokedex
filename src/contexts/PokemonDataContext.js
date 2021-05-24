import React, { createContext, useEffect, useRef, useState } from 'react';

import { loadFavouritesIds, saveFavouritesIds } from './StorageActions';
import { fetchAllPokemons } from './PokeApiData';
export const PokemonDataContext = createContext();

export const PokemonDataProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [favouritePokemons, setFavouritePokemons] = useState([]);

  const [filters, setFilters] = useState({ generations: [], types: [] });
  const [sortingValue, setSortingValue] = useState('ascending-id');

  const isPokemonsInit = useRef(true);
  const isSortingInit = useRef(true);

  const [refresh, setRefresh] = useState(false);

  // load pokemons on init app
  useEffect(() => {
    fetchAllPokemons().then((pokemons) => loadPokemons(pokemons));
  }, []);

  // sort pokemons whenever sortingValue changes
  useEffect(() => {
    if (isSortingInit.current) {
      isSortingInit.current = false;
    } else {
      sortPokemons();
    }
  }, [sortingValue]);

  // filter pokemons whenever filter or allPokemons array change
  useEffect(() => {
    if (isPokemonsInit.current) {
      isPokemonsInit.current = false;
    } else {
      filterPokemons(allPokemons);
      setRefresh((item) => !item);
    }
  }, [filters, allPokemons]);

  // update list of favourite pokemons
  const updateFavouritePokemons = (pokemons) =>
    setFavouritePokemons(pokemons.filter((item) => item.isFavourite));

  // update sorting value to sort the lists
  const updateSortingValue = (value) => setSortingValue(value);

  // update filters to show only specific pokemons
  const updatePokemonFilters = (generations, types) => setFilters({ generations, types });

  // change pokemon with given id to favourite one and also update favourites array on local storage
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

  // load favourite pokemons from local storage and init them (used in useEffect)
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

  // sorting pokemons (used in useEffect)
  const sortPokemons = () => {
    let sortedPokemons = allPokemons;
    switch (sortingValue) {
      case 'ascending-id':
        sortedPokemons.sort((a, b) => a.id - b.id);
        break;
      case 'descending-id':
        sortedPokemons.sort((a, b) => b.id - a.id);
        break;
      case 'ascending-alphabet':
        sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'descending-alphabet':
        sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    setAllPokemons(sortedPokemons);
    filterPokemons(sortedPokemons); // we need to filter pokemons again when we sort pokemons
    setRefresh((item) => !item); // after everything is set we refresh data to indicate change to flatList
  };

  // filtering pokemons
  const filterPokemons = (sortedPokemons) => {
    if (filters.generations.length == 0 && filters.types == 0) {
      // if there are no filters we just want to set pokemons
      setPokemons(sortedPokemons);
      updateFavouritePokemons(sortedPokemons);
    } else {
      // if there are filters we are filtering based on given filters

      // first we filter pokemons on home view
      setPokemons(
        sortedPokemons.filter((item) => {
          if (filters.generations.length > 0 && filters.types.length > 0) {
            return (
              filters.generations.includes(item.generation) &&
              item.types.some((type) => filters.types.includes(type.name))
            );
          } else if (filters.generations.length > 0) {
            return filters.generations.includes(item.generation);
          } else if (filters.types.length > 0) {
            return item.types.some((type) => filters.types.includes(type.name));
          } else {
            return sortedPokemons;
          }
        })
      );

      // we also filter pokemon on favourites view
      setFavouritePokemons(
        sortedPokemons
          .filter((item) => item.isFavourite)
          .filter((item) => {
            if (filters.generations.length > 0 && filters.types.length > 0) {
              return (
                filters.generations.includes(item.generation) &&
                item.types.some((type) => filters.types.includes(type.name))
              );
            } else if (filters.generations.length > 0) {
              return filters.generations.includes(item.generation);
            } else if (filters.types.length > 0) {
              return item.types.some((type) => filters.types.includes(type));
            } else {
              return sortedPokemons;
            }
          })
      );
    }
  };

  return (
    <PokemonDataContext.Provider
      value={{
        favouritePokemons,
        pokemons,
        refresh,
        sortingValue,
        toggleFavourite,
        updatePokemonFilters,
        updateSortingValue,
      }}
    >
      {children}
    </PokemonDataContext.Provider>
  );
};
