import got from "got";

import PokeApiClient from "../../apiClient/PokeApiClient.js";

jest.mock("got");

const pokemonData = {
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
  ],
};

const pokemonDetails = {
  base_experience: 64,
  id: "1",
  name: "bulbasaur",
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  stats: [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 49, stat: { name: "defense" } },
    { base_stat: 65, stat: { name: "special-attack" } },
    { base_stat: 65, stat: { name: "special-defense" } },
    { base_stat: 45, stat: { name: "speed" } },
  ],
  types: [
    { slot: 1, type: { name: "grass" } },
    { slot: 2, type: { name: "poison" } },
  ],
  weight: 69,
};

describe("PokeApiClient", () => {
  describe(".getPokemon", () => {
    let mockResponse;

    beforeEach(() => {
      mockResponse = {
        body: JSON.stringify(pokemonData),
      };
      got.mockResolvedValue(mockResponse);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should retrieve Pokemon from the PokeApi", async () => {
      const mockedPokemon = await PokeApiClient.getPokemon();

      expect(mockedPokemon).toEqual(pokemonData);
      expect(mockedPokemon.length).toEqual(pokemonData.length);
    });
  });

  describe(".getPokemonDetails", () => {
    let mockResponse;

    beforeEach(() => {
      mockResponse = {
        body: JSON.stringify(pokemonDetails),
      };
      got.mockResolvedValue(mockResponse);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should retrieve details for a single pokemon", async () => {
      const mockedPokemonDetails = await PokeApiClient.getPokemonDetails({
        pokemonIdUrl: pokemonData.results[0].url,
      });

      expect(mockedPokemonDetails.id).toEqual(pokemonDetails.id);
      expect(mockedPokemonDetails.name).toEqual(pokemonDetails.name);
    });
  });
});
