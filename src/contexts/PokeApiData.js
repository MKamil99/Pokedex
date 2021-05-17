// This file contains all methods responsible for communicating with PokeApi.

import { prepareBasicPokemonObject, preparePokemonObject } from './PokeJSON';

const mainURL = 'https://pokeapi.co/api/v2/';
const pokemonURL = mainURL + 'pokemon/';
const speciesURL = mainURL + 'pokemon-species/';
const allPokemonsURL = pokemonURL + '?limit=1118';

// List of all pokemons:
export const allPokemonsFromAPI = () => {
  return fetch(allPokemonsURL)
    .then((response) => response.json())
    .then((json) => json.results.map((pokemon) => prepareBasicPokemonObject(pokemon, pokemonURL)))
    .then((pokemons) => pokemons.filter((value) => value.id < 10000)) // removing mega-evolutions
    .catch((error) => console.log(error));
};

// List of some pokemon objects (with their details):
export const morePokemons = (start, end) => {
  const promises = [];

  // Search for pokemons only if the interval is correct (0 < start <= end):
  if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start)
    for (let i = Math.round(start); i <= Math.round(end); i++)
      promises.push(pokemonByNameOrNumber(i));

  // Return the output asynchronously and get rid of undefined pokemons (response with 404 status):
  return Promise.all(promises).then((pokemons) => pokemons.filter((value) => value != undefined));
};

// Pokemon details:
export const pokemonByNameOrNumber = (input) => {
  if (isNaN(input) || input.length == 0) return;

  return Promise.all([
    // name, number, height, weight, types, stats, sprite and moves:
    fetch(pokemonURL + input).then((response) =>
      response.status == '404' ? 'Not found' : response.json()
    ),

    // color, generation and url to evolution chain:
    fetch(speciesURL + input).then((response) =>
      response.status == '404' ? 'Not found' : response.json()
    ),
  ])
    .then((jsons) => preparePokemonObject(jsons))
    .catch((error) => console.error(error));
};
