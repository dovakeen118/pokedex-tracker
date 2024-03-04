/// <reference types="Cypress" />

import pokemonJson from "../../../fixtures/pokemon.json";

describe("pokemonRouter", () => {
  beforeEach(() => {
    cy.task("db:truncate", "Pokemon");
    cy.task("db:insert", { modelName: "Pokemon", json: pokemonJson.pokemon });
  });

  describe("GET /pokemon", () => {
    it("has a successful status code", () => {
      cy.request("/api/v1/pokemon").its("status").should("equal", 200);
    });

    it("has a JSON response type", () => {
      cy.request("/api/v1/pokemon")
        .its("headers")
        .its("content-type")
        .should("include", "application/json");
    });

    it("returns all Pokemon ordered by pokeApiId ascending", () => {
      cy.request("/api/v1/pokemon").should((response) => {
        expect(response.body.pokemon.length).to.equal(pokemonJson.pokemon.length);
        expect(response.body.pokemon[0].name).to.equal(pokemonJson.pokemon[0].name);
        expect(response.body.pokemon[1].name).to.equal(pokemonJson.pokemon[1].name);
        expect(response.body.pokemon[2].name).to.equal(pokemonJson.pokemon[2].name);

        expect(parseInt(response.body.pokemon[0].pokeApiId)).to.be.lessThan(
          parseInt(response.body.pokemon[1].pokeApiId),
        );
        expect(parseInt(response.body.pokemon[1].pokeApiId)).to.be.lessThan(
          parseInt(response.body.pokemon[2].pokeApiId),
        );
      });
    });
  });

  describe("GET /pokemon/:id", () => {
    const pokemonObject = pokemonJson.pokemon[0];
    let pokemonId;

    beforeEach(() => {
      cy.task("db:truncate", "Pokemon");
      cy.task("db:insert", { modelName: "Pokemon", json: pokemonObject });

      cy.task("db:find", {
        modelName: "Pokemon",
        conditions: { pokeApiId: pokemonObject.pokeApiId },
      }).then((foundPokemon) => {
        pokemonId = foundPokemon[0].id;
      });
    });

    it("has a successful status code", () => {
      cy.request(`/api/v1/pokemon/${pokemonId}`).its("status").should("equal", 200);
    });

    it("has a JSON response type", () => {
      cy.request(`/api/v1/pokemon/${pokemonId}`)
        .its("headers")
        .its("content-type")
        .should("include", "application/json");
    });

    it("returns the Pokemon serialized with stats", () => {
      cy.log(pokemonObject);
      cy.request(`/api/v1/pokemon/${pokemonId}`).should((response) => {
        expect(response.body.pokemon.name).to.equal(pokemonObject.name);
        expect(response.body.pokemon.image).to.equal(pokemonObject.image);
        expect(response.body.pokemon.pokeApiId).to.equal(pokemonObject.pokeApiId);
        expect(response.body.pokemon.types).to.equal(pokemonObject.types);

        expect(response.body.pokemon.stats.length).to.equal(6);
        expect(response.body.pokemon.stats[0]).to.eql(["HP", pokemonObject.hp]);
        expect(response.body.pokemon.stats[1]).to.eql(["Attack", pokemonObject.attack]);
        expect(response.body.pokemon.stats[2]).to.eql(["Defense", pokemonObject.defense]);
        expect(response.body.pokemon.stats[3]).to.eql([
          "Special Attack",
          pokemonObject.specialAttack,
        ]);
        expect(response.body.pokemon.stats[4]).to.eql([
          "Special Defense",
          pokemonObject.specialDefense,
        ]);
        expect(response.body.pokemon.stats[5]).to.eql(["Speed", pokemonObject.speed]);

        expect(response.body.pokemon).to.not.have.property("createdAt");
        expect(response.body.pokemon).to.not.have.property("updatedAt");
      });
    });
  });
});
