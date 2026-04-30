

const getGenerations = async(generation) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/generation/${generation}/`)
    const data = await res.json()
    return data.pokemon_species
  }
  catch (e) {
    console.log('Error while fetching PokeApi Generations', e)
  }
}
export { getGenerations }