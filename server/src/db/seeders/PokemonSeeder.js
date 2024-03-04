import PokeApiClient from "../../apiClient/PokeApiClient.js";
import PokeApiSerializer from "../../serializers/PokeApiSerializer.js";

import Pokemon from "../../models/Pokemon.js";

class PokemonSeeder {
  static async seed() {
    const pokemonList = await this.getPokemonData();
    const serializedPokemonList = await this.serializePokemon({ pokemonList });

    await Promise.all(
      serializedPokemonList.map(async (pokemon) => {
        const foundPokemon = await Pokemon.query().findOne({ pokeApiId: pokemon.pokeApiId });
        if (!foundPokemon) {
          await Pokemon.query().insert(pokemon);
        }
      }),
    );
  }

  static async getPokemonData() {
    const { results: pokemonData } = await PokeApiClient.getPokemon(150);

    return Promise.all(
      pokemonData.map(async (pokemon) =>
        PokeApiClient.getPokemonDetails({ pokemonIdUrl: pokemon.url }),
      ),
    );
  }

  static async serializePokemon({ pokemonList }) {
    return pokemonList.map((pokemon) => PokeApiSerializer.getDetails({ pokemon }));
  }
}

export default PokemonSeeder;
