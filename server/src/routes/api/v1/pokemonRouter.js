import express from "express";

import Pokemon from "../../../models/Pokemon.js";
import PokemonSerializer from "../../../serializers/PokemonSerializer.js";

const pokemonRouter = new express.Router();

pokemonRouter.get("/", async (req, res) => {
  try {
    const pokemon = await Pokemon.query().orderBy("pokeApiId");
    return res.status(200).json({ pokemon });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

pokemonRouter.get("/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.query().findById(req.params.id).throwIfNotFound();
    const serializedPokemon = PokemonSerializer.getDetails(pokemon);
    return res.status(200).json({ pokemon: serializedPokemon });
  } catch (error) {
    return res.status(404).json({ errors: error });
  }
});

export default pokemonRouter;
