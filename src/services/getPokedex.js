import pokedex from '../data/pokemin.json'

const getPokedex = async() => {
  try {
    return pokedex.name
  }
  catch (e) {
    console.log('Error while fetching pokedex.json', e)
  }
}
export { getPokedex }