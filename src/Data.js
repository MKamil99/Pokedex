// This file contains all methods responsible for communicating with PokeApi

// List of all pokemons:
export const allPokemons = () => {
  return fetch('https://pokeapi.co/api/v2/pokemon/?limit=1118')
    .then((response) => response.json())
    .then((json) => json.results)
    .catch((error) => console.log(error));
};

// List of some pokemon objects (with their details):
export const morePokemons = (start, end) => {
  const promises = [];

  // Search for pokemons only if the interval is correct (0 < start <= end):
  if (typeof start == 'number' && typeof end == 'number' && start > 0 && end >= start)
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
    fetch('https://pokeapi.co/api/v2/pokemon/' + input).then((response) =>
      response.status == '404' ? 'Not found' : response.json()
    ),

    // color, generation and url to evolution chain:
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + input).then((response) =>
      response.status == '404' ? 'Not found' : response.json()
    ),
  ])

    .then((jsons) => preparePokemonObject(jsons))
    .catch((error) => console.error(error));
};

// Filtering specific pokemon's JSON response and creating custom object:
const preparePokemonObject = (jsons) => {
  // Pokemon hasn't been found:
  if (jsons.includes('Not found')) return;

  // Pokemon has been found:
  return {
    id: jsons[0].id,
    name: jsons[0].name.charAt(0).toUpperCase() + jsons[0].name.slice(1),
    height: Number(jsons[0].height) / 10,
    weight: Number(jsons[0].weight) / 10,
    sprite: jsons[0].sprites.other['official-artwork'].front_default,
    types: jsons[0].types.map((i) => i.type).map((i) => i.name),
    stats: jsons[0].stats.map((i) => [i.stat.name, i.base_stat]),
    //moves: jsons[0].moves, // This one needs a lot of reshaping, maybe it should be in another function?
    color: jsons[1].color.name,
    generation: jsons[1].generation.name,
    evolution_chain: jsons[1].evolution_chain.url,
  };
};
