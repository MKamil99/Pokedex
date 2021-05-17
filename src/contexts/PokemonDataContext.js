import React, { createContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { allPokemonsFromAPI, morePokemons } from './PokeApiData';

export const PokemonDataContext = createContext();

export const PokemonDataProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [favouritePokemons, setFavouritePokemons] = useState([]);

  const [currentPokemonId, setCurrentPokemonId] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const [filters, setFilters] = useState({ generations: [], types: [] });
  const [sortingValue, setSortingValue] = useState('ascending-id');
  const [renderedPokemonId, setRenderedPokemonId] = useState(0);

  const isPokemonsInit = useRef(true);
  const isSortingInit = useRef(true);

  // load pokemons on init app
  useEffect(() => {
    allPokemonsFromAPI().then((pokemons) => {
      loadPokemons(pokemons);
    });
  }, []);

  // re-render pokemons batch by batch
  const step = 50;
  useEffect(() => {
    if (
      allPokemons.length > 0 &&
      renderedPokemonId > 0 &&
      renderedPokemonId <= allPokemons[allPokemons.length - 1].id
    ) {
      morePokemons(renderedPokemonId, renderedPokemonId + step - 1)
        .then((pokemons) => pokemons.map((pokemon) => updatePokemonObject(pokemon)))
        .then(() => updateFavouritePokemons(allPokemons))
        .then(() => setRenderedPokemonId(renderedPokemonId + step));
    }
  }, [renderedPokemonId]);

  // sort pokemons whenever sortingValue changes
  useEffect(() => {
    if (isSortingInit.current) {
      isSortingInit.current = false;
    } else {
      sortPokemons();
    }
  }, [sortingValue]);

  // set current pokemon for detail view whenever currentPokemonId changes
  useEffect(() => {
    if (pokemons) {
      setCurrentPokemon(pokemons.find((element) => element.id == currentPokemonId));
    }
  }, [currentPokemonId]);

  // filter pokemons whenever filter or allPokemons array change
  useEffect(() => {
    if (isPokemonsInit.current) {
      isPokemonsInit.current = false;
    } else {
      filterPokemons(allPokemons);
      setRefresh((item) => !item);
    }
  }, [filters, allPokemons]);

  // reset currentPokemon to prevent in detail view loading previously chosen pokemon
  const resetCurrentPokemon = () => setCurrentPokemonId(null);

  const updateFavouritePokemons = (pokemons) =>
    setFavouritePokemons(pokemons.filter((item) => item.isFavourite));

  // update pokemon's basic JSON with full JSON
  const updatePokemonObject = (newPokemonObject) => {
    let index = allPokemons.findIndex((pokemon) => pokemon.id == newPokemonObject.id);
    if (index >= 0) {
      let newPokemons = allPokemons;
      let isFavourite = newPokemons[index].isFavourite;
      newPokemons[index] = newPokemonObject;
      newPokemons[index].isFavourite = isFavourite;
      setPokemons(newPokemons);
    }
  };

  const updateSortingValue = (value) => setSortingValue(value);

  const updateCurrentPokemonId = (id) => setCurrentPokemonId(id);

  const updatePokemonFilters = (generations, types) => {
    // if we pass empty arrays we want to set filters to null
    if (generations.length === 0 && types.length === 0) {
      setFilters(null);
    } else {
      setFilters({ generations, types });
    }
  };

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
    setRenderedPokemonId(1);
  };

  // AsyncStorage functionality to load favourite pokemons from local storage
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

  // AsyncStorage functionality to save favourite pokemons from local storage
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

  // sorting pokemons (used in useEffect)
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
    filterPokemons(sortedPokemons); // we need to filter pokemons again when we sort pokemons
    setRefresh((item) => !item); // after everything is set we refresh data to indicate change to flatList
  };

  const filterPokemons = (sortedPokemons) => {
    if (!filters) {
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
              item.types.some((type) => filters.types.includes(type))
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

      // we also filter pokemon on favourites view
      setFavouritePokemons(
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
              return sortedPokemons;
            }
          })
      );
    }
  };

  return (
    <PokemonDataContext.Provider
      value={{
        currentPokemon,
        favouritePokemons,
        pokemons,
        refresh,
        sortingValue,
        resetCurrentPokemon,
        toggleFavourite,
        updatePokemonFilters,
        updateCurrentPokemonId,
        updatePokemonObject,
        updateSortingValue,
      }}
    >
      {children}
    </PokemonDataContext.Provider>
  );
};
