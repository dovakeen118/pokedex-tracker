import PokeApiSerializer from "../../serializers/PokeApiSerializer.js";

describe("PokeApiSerializer", () => {
  describe("#getDetails", () => {
    it("should return base statistics for a Pokemon", () => {
      const pokeApiData = {
        base_experience: 64,
        id: "1",
        name: "bulbasaur",
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
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

      const serializedData = PokeApiSerializer.getDetails({ pokemon: pokeApiData });
      expect(Object.keys(serializedData).length).toEqual(10);

      expect(serializedData.name).toEqual(pokeApiData.name);
      expect(serializedData.image).toEqual(pokeApiData.sprites.front_default);
      expect(serializedData.pokeApiId).toEqual(pokeApiData.id);
      expect(serializedData.types).toEqual("grass, poison");
      expect(serializedData.hp).toEqual(45);
      expect(serializedData.attack).toEqual(49);
      expect(serializedData.defense).toEqual(49);
      expect(serializedData.specialAttack).toEqual(65);
      expect(serializedData.specialDefense).toEqual(65);
      expect(serializedData.speed).toEqual(45);
    });
  });
});
