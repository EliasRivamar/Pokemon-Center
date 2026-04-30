import pokedex from '../data/pokedex.json'
import { getGenerations } from '../services/getGenerations'
import { useState, useEffect } from 'react'

export function PokemonsGrid({ genInput }) {
  const [gen, setGen] = useState(new Set())
  const [loadedImg, setLoadedImg] = useState(new Set())
  useEffect(() => {
    async function getGen() {
      setLoadedImg(new Set())
      const poke_generation = await getGenerations(genInput)
      setGen(new Set(poke_generation.map((p) => p.name)))
    }
    getGen()
  }, [genInput])

  const handleLoad = (name) => {
    setLoadedImg((prev) => new Set(prev).add(name))
  }

  const pokemonsFiltrados = pokedex.filter((p) => gen.has(p.slug))
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2 justify-center items-center">
      {pokemonsFiltrados.map((p) => {
        const isLoaded = loadedImg.has(p.name)
        return (
          <div
            key={p.name}
            className=" flex flex-col bg-bg-light dark:bg-bg-dark items-center justify-center rounded-full border-2 border-bg-second-light dark:border-bg-second-dark"
          >
            <div className={`absolute text-text-primary-light dark:text-text-primary-dark -mt-23 -ml-24 lg:-ml-27 z-20 text-sm font-bold transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {p.id}
            </div>
            {!isLoaded && (
              <div className={`w-27 h-27 lg:w-26 lg:h-26 bg-gray-300 dark:bg-bg-second-light/20 animate-pulse rounded-full absolute transition-opacity duration-1000 ease-in-out ${!isLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
            )}
            <img
              className={`z-10 w-22 h-22 lg:w-24 lg:h-24 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => handleLoad(p.name)}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              alt={p.name}
            />
            <div className="bg-bg-light dark:bg-bg-dark w-10 h-10 rounded-full absolute z-9 -mt-1 lg:mt-1"></div>
            <div className="bg-bg-second-light dark:bg-bg-second-dark w-27 lg:w-30 h-14.5 lg:h-15 rounded-b-[99999px] absolute mt-13 lg:mt-15 z-0"></div>
            <p className={`text-center text-text-primary-dark dark:text-text-primary-dark z-10 -mt-4 mb-3 lg:-mt-3 lg:mb-3 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {p.name}
            </p>
          </div>
        )
      })}
    </div>
  )
}
