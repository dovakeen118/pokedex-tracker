import React, { useEffect, useState } from "react";

import getPokemonDetails from "../../apiClient/getPokemonDetails";

import StatBarChart from "./StatBarChart";

const PokemonShow = (props) => {
  const [pokemon, setPokemon] = useState({ stats: [] });

  const getPokemonDetailData = async () => {
    const { id } = props.match.params;
    const pokemon = await getPokemonDetails({ pokemonId: id });
    setPokemon(pokemon);
  };

  useEffect(() => {
    getPokemonDetailData();
  }, []);

  return (
    <>
      <div className="grid-x grid-margin-x">
        <img src={pokemon.image} alt={pokemon.name} className="cell medium-3" />
        <div className="cell medium-9">
          <h1 className="capitalize-text">{pokemon.name}</h1>
          <p>National # {pokemon.pokeApiId}</p>
          <p>Type: {pokemon.types}</p>
        </div>
      </div>
      <StatBarChart stats={pokemon.stats} />
    </>
  );
};

export default PokemonShow;
