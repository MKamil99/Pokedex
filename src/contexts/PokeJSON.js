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

// Filtering specific move's JSON to retrieve only URL and names of versions:
const prepareMoveJSON = (json) => {
  return {
    url: json.move.url,
    versions: json.version_group_details.map((version) => version.version_group.name),
  };
};
