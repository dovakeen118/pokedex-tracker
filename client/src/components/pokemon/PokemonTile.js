import React from "react";
import { Link } from "react-router-dom";

const PokemonTile = ({ id, name, image, types, pokeApiId }) => {
  return (
    <div className="cell small-6 medium-4 large-3 callout text-center box-border">
      <Link to={`/pokemon/${id}`}>
        <img src={image} alt={name} />
      </Link>

      <p># {pokeApiId}</p>

      <Link to={`/pokemon/${id}`}>
        <h3 className="capitalize-text">{name}</h3>
      </Link>

      <p>{types}</p>
    </div>
  );
};

export default PokemonTile;
