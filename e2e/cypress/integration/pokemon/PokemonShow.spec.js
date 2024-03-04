/// <reference types="cypress" />

import pokemonJson from "../../fixtures/pokemon.json";

describe("As a user viewing details about a Pokemon", () => {
  const firstPokemonJson = pokemonJson.pokemon[0];

  beforeEach(() => {
    let pokemonId;
    cy.task("db:truncate", ["Pokemon", "User"]);
    cy.task("db:insert", { modelName: "Pokemon", json: pokemonJson.pokemon });
    cy.task("db:find", {
      modelName: "Pokemon",
      conditions: { pokeApiId: firstPokemonJson.pokeApiId },
    }).then((pokemonData) => {
      cy.log(pokemonData[0].id);
      pokemonId = pokemonData[0].id;
      cy.visit(`/pokemon/${pokemonId}`);
    });
  });

  it("should display details for the Pokemon", () => {
    cy.contains(firstPokemonJson.name);
    cy.contains(`National # ${firstPokemonJson.pokeApiId}`);
    cy.contains(`Type: ${firstPokemonJson.types}`);
  });
});
