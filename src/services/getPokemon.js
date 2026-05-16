

const getPokemon = async(name) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`)
    const data = await res.json()
    return data
  }
  catch (e) {
    console.log('Error while fetching PokeApi Single Pokemon', e)
  }
}
export { getPokemon }