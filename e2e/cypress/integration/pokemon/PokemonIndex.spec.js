/// <reference types="cypress" />

import pokemonJson from "../../fixtures/pokemon.json";

describe("As a user viewing the list of Pokemon", () => {
  const firstPokemonJson = pokemonJson.pokemon[0];
  const thirdPokemonJson = pokemonJson.pokemon[2];

  beforeEach(() => {
    cy.task("db:truncate", "Pokemon");
    cy.task("db:insert", { modelName: "Pokemon", json: pokemonJson.pokemon });

    cy.visit("/");
  });

  it("should display information about each Pokemon", () => {
    cy.get("#pokemon-index-list").children().should("have.length", pokemonJson.pokemon.length);

    cy.get("#pokemon-index-list > :nth-child(1)").contains(firstPokemonJson.name);
    cy.get("#pokemon-index-list > :nth-child(1)").contains(firstPokemonJson.types);
    cy.get("#pokemon-index-list > :nth-child(1)").contains(firstPokemonJson.pokeApiId);
    cy.get("#pokemon-index-list > :nth-child(1)")
      .find("img")
      .should("have.attr", "src")
      .should("include", firstPokemonJson.image);

    cy.get("#pokemon-index-list > :nth-child(3)").contains(thirdPokemonJson.name);
    cy.get("#pokemon-index-list > :nth-child(3)").contains(thirdPokemonJson.types);
    cy.get("#pokemon-index-list > :nth-child(3)").contains(thirdPokemonJson.pokeApiId);
    cy.get("#pokemon-index-list > :nth-child(3)")
      .find("img")
      .should("have.attr", "src")
      .should("include", thirdPokemonJson.image);
  });

  describe("there is a clickable link for each Pokemon", () => {
    let pokemonId;
    beforeEach(() => {
      cy.task("db:find", {
        modelName: "Pokemon",
        conditions: { pokeApiId: firstPokemonJson.pokeApiId },
      }).then((pokemonData) => {
        pokemonId = pokemonData[0].id;
      });
    });

    it("should navigate to the details page of the Pokemon", () => {
      cy.get("#pokemon-index-list > :nth-child(1)").contains(firstPokemonJson.name).click();
      cy.url().should("include", `/pokemon/${pokemonId}`);
    });
  });
});
