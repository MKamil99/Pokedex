// This file contains all methods responsible for communicating with PokeApi.

import { preparePokemonObject, prepareMoveDetailsJSON, prepareEvolutionJSON } from './PokeJSON';

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
  const pokemons = data.results.map((pokemon) => {
    pokemon.isFavourite = false;
    pokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    return pokemon;
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

// Retrieve all specific pokemon moves' details:
export const fetchAllMoves = async (moves) => {
  const promises = [];

  for (let i = 0; i < moves.length; i++) promises.push(moveByURL(moves[i].url, moves[i].versions));

  return Promise.all(promises);
};

// Move details:
const moveByURL = async (url, versions) => {
  const response = await fetch(url);
  if (!response.ok) {
    console.log(response.status);
    return null;
  }
  const move = await response.json();
  return prepareMoveDetailsJSON(move, versions);
};

// Evolution Chain details:
export const fetchEvolutionChain = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    console.log(response.status);
    return null;
  }
  const chain = await response.json();
  return prepareEvolutionJSON(chain, speciesURL);
};
