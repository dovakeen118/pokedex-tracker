class PokemonSerializer {
  static statsArray(pokemon) {
    return [
      ["HP", pokemon.hp],
      ["Attack", pokemon.attack],
      ["Defense", pokemon.defense],
      ["Special Attack", pokemon.specialAttack],
      ["Special Defense", pokemon.specialDefense],
      ["Speed", pokemon.speed],
    ];
  }

  static getDetails(pokemon) {
    const allowedAttributes = ["id", "name", "image", "pokeApiId", "types"];
    let serializedPokemon = {};

    for (const attribute of allowedAttributes) {
      serializedPokemon[attribute] = pokemon[attribute];
    }

    serializedPokemon.stats = this.statsArray(pokemon);

    return serializedPokemon;
  }
}

export default PokemonSerializer;
