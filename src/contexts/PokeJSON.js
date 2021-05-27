// Filtering specific pokemon's JSON response and creating custom object:
export const preparePokemonObject = (jsons) => {
  return {
    id: jsons[0].id,
    name: jsons[0].name.charAt(0).toUpperCase() + jsons[0].name.slice(1),
    height: Number(jsons[0].height) / 10,
    weight: Number(jsons[0].weight) / 10,
    sprite: { uri: jsons[0].sprites.other['official-artwork'].front_default },
    types: jsons[0].types.map((i) => i.type).map((i) => i.name),
    stats: jsons[0].stats.map((i) => [i.stat.name, i.base_stat]),
    moves: jsons[0].moves.map((move) => prepareMoveJSON(move)),
    color: jsons[1].color.name,
    generation: jsons[1].generation.name.split('-')[1].toUpperCase(),
    evolution_chain: jsons[1].evolution_chain.url,
  };
};

// Filtering specific move's short JSON to retrieve only URL and names of versions:
const prepareMoveJSON = (json) => {
  return {
    url: json.move.url,
    versions: json.version_group_details.map((version) => ({
      name: version.version_group.name,
      learned_at: version.level_learned_at,
      learn_method: version.move_learn_method.name,
    })),
  };
};

// Filtering specific move's full JSON to retrieve only name, type, PP, power and accuracy:
export const prepareMoveDetailsJSON = (response, versions) => {
  return {
    name: response.name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    type: response.type.name,
    pp: response.pp ? response.pp : '-',
    pwr: response.power ? response.power : '-',
    acc: response.accuracy ? response.accuracy : '-',
    versions: versions,
  };
};

// Filtering specific evolution chain's JSON to retrieve only IDs of pokemons and ways of evolving:
export const prepareEvolutionJSON = (response, speciesURL) => {
  const getID = (species) => species.url.replace(speciesURL, '').replace('/', '');
  const getForms = (content) => {
    return {
      pokemonID: getID(content.species),
      evolvedBecause: content.evolution_details.map((reason) => ({
        item: reason.item ? reason.item.name : null,
        level: reason.min_level,
        happiness: reason.min_happiness,
      })),
      evolvesTo: content.evolves_to.map((form) => getForms(form)),
    };
  };
  return getForms(response.chain);
};
