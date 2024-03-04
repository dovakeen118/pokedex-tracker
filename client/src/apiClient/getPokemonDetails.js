const getPokemonDetails = async ({ pokemonId }) => {
  try {
    const response = await fetch(`/api/v1/pokemon/${pokemonId}`);
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    const responseBody = await response.json();
    return responseBody.pokemon;
  } catch (error) {
    console.error(`Error in Fetch: ${error}`);
  }
};

export default getPokemonDetails;
