// Filtering specific pokemon's JSON response and creating custom object - main version:
export const preparePokemonObject = (jsons) => {
  // Pokemon hasn't been found:
  if (jsons.includes('Not found')) return;

  // Pokemon has been found:
  return {
    id: jsons[0].id,
    isFavourite: false,
    name: jsons[0].name.charAt(0).toUpperCase() + jsons[0].name.slice(1),
    height: Number(jsons[0].height) / 10,
    weight: Number(jsons[0].weight) / 10,
    sprite: { uri: jsons[0].sprites.other['official-artwork'].front_default },
    types: jsons[0].types.map((i) => i.type).map((i) => i.name),
    stats: jsons[0].stats.map((i) => [i.stat.name, i.base_stat]),
    moves: jsons[0].moves, // This one needs a lot of reshaping
    color: jsons[1].color.name,
    generation: jsons[1].generation.name.split('-')[1].toUpperCase(),
    evolution_chain: jsons[1].evolution_chain.url,
    isLoaded: true,
  };
};

// Filtering specific pokemon's JSON response and creating custom object - basic version:
export const prepareBasicPokemonObject = (pokemon, pokemonURL) => {
  return {
    id: Number(pokemon.url.replace(pokemonURL, '').replace('/', '')),
    isFavourite: false,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    sprite: require('../../assets/placeholder.png'), // pokeball
    types: [],
    color: 'white',
    isLoaded: false,
  };
};
