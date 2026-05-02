import pokedex from '../data/pokedex.json'

import { PokeballUI } from './PokeballGrid'

export function PokemonsGrid({ gen, loadedImg, handleLoad }) {

  const pokemonsFiltrados = pokedex.filter((p) => gen.has(p.slug))
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2 m-4 justify-center items-center">
      {pokemonsFiltrados.map((p) => {
        const isLoaded = loadedImg.has(p.name)
        return (
          <PokeballUI p={p} isLoaded={isLoaded} handleLoad={handleLoad} isClickable={true}></PokeballUI>
        )
      })}
    </div>
  )
}
