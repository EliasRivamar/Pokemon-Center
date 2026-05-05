

const getAbilities = async(ability) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
    const data = await res.json()
    return data
  }
  catch (e) {
    console.log('Error while fetching PokeApi Ability', e)
  }
}
export { getAbilities }