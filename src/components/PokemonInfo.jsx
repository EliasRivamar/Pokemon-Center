import poke from '../data/pokedex.json'
import typeNum from '../data/types.json'
import { ShowStat } from './ShowStat'
import { getPokemon } from '../services/getPokemon'
import { useEffect, useState } from 'react'
import evolutions from '../data/evolutionLines.json'
import { useParams } from 'react-router-dom'
import { PokeballUI } from './PokeballGrid'

function getTypeImage({ type }) {
  const numType = typeNum.find((t) => t.type === type)
  return numType.num
}

export function PokemonInfo({loadedImg, handleLoad}) {
  const {name} = useParams()
  const pokemon = poke.find(( n ) => n.name === name)
  const stats = poke.find(({ id }) => id === pokemon.id)
  const evoLine = evolutions.find((e) =>
    e.evolutionLine.some((p) => p.id === pokemon.id),
  )
  const [pokemonInfo, setPokemonInfo] = useState([])
  useEffect(() => {
    async function getInfoPokemon() {
      const pokeInfo = await getPokemon(pokemon.id)
      setPokemonInfo(pokeInfo)
    }
    getInfoPokemon()
  }, [pokemon])

  return (
    <article className="w-full h-[87.7vh] lg:overflow-hidden">
      <div className="flex justify-center lg:flex-col-3 w-full h-[50vh] lg:h-[60vh] bg-bg-light dark:bg-bg-dark">
        <div className="basis-2/5 lg:flex lg:flex-col hidden place-items-center m-5">
          <section className="grid grid-rows-6 w-full h-full">
            <ShowStat name={'PS'} stat={stats.stats.hp}></ShowStat>
            <ShowStat name={'Attack'} stat={stats.stats.atk}></ShowStat>
            <ShowStat name={'Defense'} stat={stats.stats.def}></ShowStat>
            <ShowStat name={'Sp. Atk'} stat={stats.stats.spa}></ShowStat>
            <ShowStat name={'Sp. Def'} stat={stats.stats.spd}></ShowStat>
            <ShowStat name={'Speed'} stat={stats.stats.spe}></ShowStat>
          </section>
        </div>
        <div
          key={`${stats.slug}`}
          className="flex flex-col lg:basis-1/5 items-center relative"
        >
          <h1 className="font-display text-2xl text-black dark:text-white">
            {stats.name}
          </h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${stats.id}.gif`}
            className="absolute bottom-23 scale-255"
            alt={`${stats.slug}`}
          />
        </div>
        <div className="basis-2/5 lg:flex lg:flex-col hidden place-items-center m-5">
          <section className="w-full h-full">
            <div className="flex justify-end gap-3">
              {pokemon.types.map((type) => (
                <div
                  key={type}
                  className="flex flex-col place-items-center gap-1"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/small/${getTypeImage({ type })}.png`}
                    className="size-13 items-center mr-1"
                    alt={`${type}`}
                  />
                  <p className="font-display text-center  text-black dark:text-white py-1 px-2">
                    {type}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <p className="font-display text-center  text-black dark:text-white py-1 px-2">
                Height: {(pokemonInfo.height * 0.3048).toFixed(2)} m
              </p>
              <p className="font-display text-center  text-black dark:text-white py-1 px-2">
                Weight: {Math.round(pokemonInfo.weight * 0.4535924)} kg
              </p>
            </div>
            <div className="flex gap-2">
              {evoLine.evolutionLine.map((evo) => {
                const isLoaded = loadedImg.has(evo.name)
                return evo.name === name ?
                  <PokeballUI p={evo} isLoaded={isLoaded} handleLoad={handleLoad} isClikable={false}/>
                : 
                <PokeballUI p={evo} isLoaded={isLoaded} handleLoad={handleLoad} isClickable={true}/>
              })}
            </div>
          </section>
        </div>
      </div>
      <div className="flex w-full h-full bg-bg-second-light dark:bg-bg-second-dark rounded-t-4xl"></div>
    </article>
  )
}
