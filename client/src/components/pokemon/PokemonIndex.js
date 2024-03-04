import React, { useEffect, useState } from "react";

import getPokemon from "../../apiClient/getPokemon";

import PokemonTile from "./PokemonTile";

const PokemonIndex = (props) => {
  const [pokemon, setPokemon] = useState([]);

  const getAllPokemon = async () => {
    const pokemon = await getPokemon();
    setPokemon(pokemon);
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  const pokemonList = pokemon.map((pokemon) => {
    return <PokemonTile key={pokemon.id} {...pokemon} />;
  });

  return (
    <>
      <h1 className="text-center">Pokémon (Gen 1)</h1>
      <div className="grid-x grid-margin-x callout primary box-border" id="pokemon-index-list">
        {pokemonList}
      </div>
    </>
  );
};

export default PokemonIndex;
