import React, { createContext, useEffect, useRef, useState } from 'react';

import { allPokemonsFromAPI, morePokemons } from './PokeApiData';
import { loadFavouritesIds, saveFavouritesIds } from './StorageActions';

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
    // old variant:
    morePokemons(1, 898).then((pokemons) => {
      loadPokemons(pokemons);
    });

    // new variant:
    // allPokemonsFromAPI().then((pokemons) => {
    //  loadPokemons(pokemons, true);
    // });

    // mixed variant:
    //allPokemonsFromAPI()
    //.then((pokemons) => morePokemons(1, pokemons.length))
    //.then((pokemons) => loadPokemons(pokemons));
  }, []);

  // re-render pokemons batch by batch (new variant, uses allPokemonsFromAPI)
  const step = 300;
  useEffect(() => {
    if (
      allPokemons.length > 0 &&
      renderedPokemonId > 0 &&
      renderedPokemonId <= allPokemons[allPokemons.length - 1].id
    ) {
      // download pokemons from API:
      morePokemons(renderedPokemonId, renderedPokemonId + step - 1)
        // re-render main list:
        .then((pokemons) => pokemons.map((pokemon) => updatePokemonObject(pokemon)))
        // go to next batch:
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

  // update list of favourite pokemons
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
      setAllPokemons(newPokemons);
    }
  };

  // update sorting value to sort the lists
  const updateSortingValue = (value) => setSortingValue(value);

  // update current pokemon_id to trigger use effect with setting current pokemon
  const updateCurrentPokemonId = (id) => setCurrentPokemonId(id);

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
  const loadPokemons = async (pokemons, startRerendering = false) => {
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
    if (startRerendering) setRenderedPokemonId(1);
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
