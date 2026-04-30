import pokedex from '../data/pokemin.json'

export function PokemonsGrid() {
  return (
    <div className='grid grid-cols-10'>
      {
                  pokedex.map(p => (
                    <div key={p.name}>
                      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${p.id}.gif`} alt={p.name}/>
                        <h1 className='text-white'>{p.name}</h1>
                    </div>
                  ))
        }
    </div>
  )
}