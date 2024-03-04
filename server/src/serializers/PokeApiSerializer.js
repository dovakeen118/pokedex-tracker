class PokeApiSerializer {
  static getDetails({ pokemon }) {
    const { name } = pokemon;
    const image = pokemon.sprites.front_default;
    const pokeApiId = pokemon.id;
    const types = pokemon.types.map((type) => type.type.name).join(", ");

    const getBaseStat = (pokemonStats, statName) => {
      const statEntry = pokemonStats.find((stat) => stat.stat.name === statName);
      return statEntry ? statEntry.base_stat : null;
    };

    const hp = getBaseStat(pokemon.stats, "hp");
    const attack = getBaseStat(pokemon.stats, "attack");
    const defense = getBaseStat(pokemon.stats, "defense");
    const specialAttack = getBaseStat(pokemon.stats, "special-attack");
    const specialDefense = getBaseStat(pokemon.stats, "special-defense");
    const speed = getBaseStat(pokemon.stats, "speed");

    return {
      name,
      image,
      pokeApiId,
      types,
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed,
    };
  }
}

export default PokeApiSerializer;
