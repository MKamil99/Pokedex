// This file contains all methods responsible for communicating with PokeApi.

import { preparePokemonObject } from './PokeJSON';

const mainURL = 'https://pokeapi.co/api/v2/';
const pokemonURL = mainURL + 'pokemon/';
const speciesURL = mainURL + 'pokemon-species/';
const allPokemonsURL = 'https://mim-pokedex-api.herokuapp.com/pokemons?limit=10000';

export const fetchAllPokemons = async () => {
  const response = await fetch(allPokemonsURL);
  if (!response.ok) {
    console.log(response.status);
    return [];
  }
  const data = await response.json();
  // add isFavourite field to every pokemon by default false
  const pokemons = data.results.map((pok) => {
    pok.isFavourite = false;
    return pok;
  });

  return pokemons;
};

// Pokemon details:
export const pokemonByNameOrNumber = async (input) => {
  if (isNaN(input) || input.length == 0) return;

  try {
    const jsons = await Promise.all([
      // name, number, height, weight, types, stats, sprite and moves:
      fetch(pokemonURL + input).then((response) =>
        response.status == '404' ? 'Not found' : response.json()
      ),

      // color, generation and url to evolution chain:
      fetch(speciesURL + input).then((response) =>
        response.status == '404' ? 'Not found' : response.json()
      ),
    ]);
    return preparePokemonObject(jsons);
  } catch (error) {
    return console.error(error);
  }
};
