

const getPokemon = async(id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()
    return data
  }
  catch (e) {
    console.log('Error while fetching PokeApi Single Pokemon', e)
  }
}
export { getPokemon }