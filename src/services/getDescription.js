

const getDescription = async(url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }
  catch (e) {
    console.log('Error while fetching PokeApi Description', e)
  }
}
export { getDescription }