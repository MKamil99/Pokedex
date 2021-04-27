// This file contains all methods responsible for communicating with PokeApi

// List of all pokemons:
export const allPokemons = () => {
  return fetch('https://pokeapi.co/api/v2/pokemon/?limit=1118')
    .then((response) => response.json())
    .then((json) => json.results)
    .catch((error) => console.log(error));
};

// Pokemon details (for now, the input should be an integer):
export const pokemonByNameOrNumber = (input) => {
  if (isNaN(input) || input.length == 0) return;

  return Promise.all([
    // name, number, height, weight, types, stats, sprites and moves:
    fetch('https://pokeapi.co/api/v2/pokemon/' + input).then((response) => response.json()),

    // color and generation:
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + input).then((response) => response.json()),

    // evolution chain:
    fetch('https://pokeapi.co/api/v2/evolution-chain/' + input).then((response) => response.json()),
  ])

    .then((jsons) => preparePokemonObject(jsons))
    .catch((error) => console.error(error));
};

// Filtering specific pokemon's JSON response and creating custom object:
const preparePokemonObject = (jsons) => {
  return {
    id: jsons[0].id,
    name: jsons[0].name.charAt(0).toUpperCase() + jsons[0].name.slice(1),
    height: Number(jsons[0].height) / 10 + ' m',
    weight: Number(jsons[0].weight) / 10 + ' kg',
    sprite: jsons[0].sprites.other['official-artwork'].front_default,
    types: jsons[0].types.map((i) => i.type).map((i) => i.name),
    //"stats": jsons[0].stats.map(i => [i.stat.name, i.base_stat]),
    //"moves": jsons[0].moves, // This one needs a lot of reshaping, maybe it should be in another function?
    color: jsons[1].color.name,
    //"generation": jsons[1].generation.name,
    //"evolution chain": jsons[2] // This one needs a lot of reshaping, maybe it should be in another function?
  };
};
