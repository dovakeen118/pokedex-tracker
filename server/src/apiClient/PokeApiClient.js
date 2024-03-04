import got from "got";

class PokeApiClient {
  static parsePokemonResponse(response) {
    return JSON.parse(response.body);
  }

  static async getPokemon(limit) {
    const response = await got(`https://pokeapi.co/api/v2/pokemon?limit=${limit || 20}`);
    return this.parsePokemonResponse(response);
  }

  static async getPokemonDetails({ pokemonIdUrl }) {
    const response = await got(pokemonIdUrl);
    return this.parsePokemonResponse(response);
  }
}

export default PokeApiClient;
