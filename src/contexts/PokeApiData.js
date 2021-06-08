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
      fetch(pokemonURL + input).then((response) => {
        if (!response.ok) {
          return null;
        } else {
          return response.json();
        }
      }),

      // color, generation and url to evolution chain:
      fetch(speciesURL + input).then((response) => {
        if (!response.ok) {
          return null;
        } else {
          return response.json();
        }
      }),
    ]);
    if (jsons.includes(null)) {
      return null;
    } else {
      return preparePokemonObject(jsons);
    }
  } catch (error) {
    return null;
  }
};

// Retrieve all specific pokemon moves' details:
export const fetchAllMoves = async (moves) => {
  const promises = [];

  for (let i = 0; i < moves.length; i++) promises.push(moveByURL(moves[i].url, moves[i].versions));

  const result = await Promise.all(promises);
  return result.filter((move) => move !== null);
};

// Move details:
const moveByURL = async (url, versions) => {
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  const move = await response.json();
  return prepareMoveDetailsJSON(move, versions);
};

// Evolution Chain details:
export const fetchEvolutionChain = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  const chain = await response.json();
  return prepareEvolutionJSON(chain, speciesURL);
};
