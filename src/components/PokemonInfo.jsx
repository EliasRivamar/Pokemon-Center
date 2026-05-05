import poke from '../data/pokedex.json'
import typeNum from '../data/types.json'
import { ShowStat } from './ShowStat'
import { getPokemon } from '../services/getPokemon'
import { getAbilities } from '../services/getAbilities'
import { useEffect, useState } from 'react'
import evolutions from '../data/evolutionLines.json'
import { Link, useParams } from 'react-router-dom'
import { PokeballUI } from './PokeballGrid'
import { getDescription } from '../services/getDescription'

function getTypeImage({ type }) {
  const numType = typeNum.find((t) => t.type === type)
  return numType.num
}

export function PokemonInfo({ loadedImg, handleLoad }) {
  const { name } = useParams()
  const [isMega, setIsMega] = useState(false)
  const [descriptionPoke, setDescriptionPoke] = useState([])
  const [isFallback, setIsFallback] = useState(false)
  const [abilities, setAbilities] = useState([])
  const id = parseInt(name.split('-')[1])
  const pokemon = poke.find((n) => n.id === id)
  const stats = poke.find(({ id }) => id === pokemon.id)
  const evoLine = evolutions.find(
    (e) =>
      e.evolutionLine.some((p) => p.id === id) ||
      e.mega.some((p) => p.id === id) ||
      e.gmax.some((p) => p.id === id) ||
      e.alola.some((p) => p.id === id) ||
      e.hisui.some((p) => p.id === id) ||
      e.paldea.some((p) => p.id === id),
  )
  const description = descriptionPoke?.flavor_text_entries?.findLast(
    (e) => e.language.name === 'en',
  )

  const [pokemonInfo, setPokemonInfo] = useState([])
  useEffect(() => {
    async function getInfoPokemon() {
      setIsFallback(false)
      const pokeInfo = await getPokemon(id)
      setPokemonInfo(pokeInfo)
      const pokeDescription = await getDescription(pokeInfo.species.url)
      setDescriptionPoke(pokeDescription)
    }
    async function getAllAbilities() {
      // 1. obtener abilities del JSON
      const abilitiesAll = Object.values(pokemon.abilities)

      // 2. normalizar nombres → formato API
      const normalized = abilitiesAll.map((a) =>
        a.toLowerCase().replace(' ', '-'),
      )

      // 3. crear todas las promesas
      const promises = normalized.map((a) => getAbilities(a))

      // 4. esperar TODAS
      const results = await Promise.all(promises)

      // 5. guardar UNA SOLA VEZ
      setAbilities(results)
    }
    getInfoPokemon()
    getAllAbilities()
  }, [id])

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
          <div className="flex gap-2 justify-center mr-15 scale-85">
            {!isMega
              ? evoLine.evolutionLine.map((evo) => {
                  const isLoaded = loadedImg.has(evo.name)
                  return evo.name === pokemon.name ? (
                    <PokeballUI
                      p={evo}
                      isLoaded={isLoaded}
                      handleLoad={handleLoad}
                      isClikable={false}
                    />
                  ) : (
                    <PokeballUI
                      p={evo}
                      isLoaded={isLoaded}
                      handleLoad={handleLoad}
                      isClickable={true}
                    />
                  )
                })
              : evoLine.mega.map((evo) => {
                  const isLoaded = loadedImg.has(evo.name)
                  return evo.name === pokemon.name ? (
                    <PokeballUI
                      p={evo}
                      isLoaded={isLoaded}
                      handleLoad={handleLoad}
                      isClikable={false}
                    />
                  ) : (
                    <PokeballUI
                      p={evo}
                      isLoaded={isLoaded}
                      handleLoad={handleLoad}
                      isClickable={true}
                    />
                  )
                })}
          </div>
        </div>
        <div
          key={`${stats.slug}`}
          className="flex flex-col lg:basis-1/5 items-center relative p-2"
        >
          <h1 className="font-display text-5xl text-black dark:text-white">
            {stats.name}
          </h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${stats.id}.gif`}
            onError={(e) => {
              setIsFallback(true)
              e.target.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stats.id}.png`}
            }
            className={`absolute ${isFallback ? 'scale-120 bottom-15' : 'scale-285 bottom-30'}`}
            alt={`${stats.slug}`}
          />
        </div>
        <div className="basis-2/5 lg:flex lg:flex-col hidden place-items-center m-5">
          <section className="flex flex-col w-full h-full">
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
              <div className="flex gap-2">
                {isMega === false ? (
                  evoLine.mega?.length > 0 ? (
                    <Link
                      to={`/${evoLine.mega[0].name}-${evoLine.mega[0].id}`}
                      onClick={() => setIsMega(true)}
                    >
                      <img
                        className="size-10 grayscale hover:grayscale-0 transition-all ease-in-out duration-400"
                        src={'../../public/megaIconIdle.png'}
                        alt={'mega'}
                      />
                    </Link>
                  ) : (
                    <></>
                  )
                ) : (
                  <Link
                    to={`/${evoLine.evolutionLine[0].name}-${evoLine.evolutionLine[0].id}`}
                    onClick={() => setIsMega(false)}
                  >
                    <img
                      className="size-10 hover:grayscale transition-all ease-in-out duration-400"
                      src={'../../public/megaIconIdle.png'}
                      alt={'mega'}
                    />
                  </Link>
                )}
              </div>
            </div>
            <div className="flex gap-2 place-content-center items-center w-full min-h-30">
              {pokemon.name.includes('Alolan') ? (
                <></>
              ) : (
                evoLine.alola.map((evo) => {
                  return evo.name.includes(pokemon.name) ? (
                    <Link to={`/${evo.name}-${evo.id}`}>
                      <p className="text-white font-display bg-bg-second-light dark:bg-bg-second-dark p-2 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                        {evo.name}
                      </p>
                    </Link>
                  ) : (
                    <></>
                  )
                })
              )}
              {evoLine.galar.map((evo) => {
                return evo.name.includes(pokemon.name) ? (
                  <Link>
                    <p className="text-white font-display bg-bg-second-light dark:bg-bg-second-dark p-2 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                      {evo.name}
                    </p>
                  </Link>
                ) : (
                  <></>
                )
              })}
              {pokemon.name.includes('Hisuian') ? (
                <></>
              ) : (
                evoLine.hisui.map((evo) => {
                  return evo.name.includes(pokemon.name) ? (
                    <Link>
                      <p className="text-white font-display bg-bg-second-light dark:bg-bg-second-dark p-2 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                        {evo.name}
                      </p>
                    </Link>
                  ) : (
                    <></>
                  )
                })
              )}
              {pokemon.name.includes('Paldean') ? (
                <></>
              ) : (
                evoLine.paldea.map((evo) => {
                  return evo.name.includes(pokemon.name) ? (
                    <Link>
                      <p className="text-white font-display bg-bg-second-light dark:bg-bg-second-dark p-2 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                        {evo.name}
                      </p>
                    </Link>
                  ) : (
                    <></>
                  )
                })
              )}
            </div>
            <div className="flex flex-col w-full h-full justify-end">
              <div className="flex gap-4 text-center justify-center">
                <p className="font-display text-center text-black dark:text-white py-1 px-2">
                  Height: {(pokemonInfo.height * 0.1).toFixed(2)} m
                </p>
                <p className="font-display text-center text-black dark:text-white py-1 px-2">
                  Weight: {Math.round(pokemonInfo.weight / 10)} kg
                </p>
              </div>
              <p className="font-display text-center text-black dark:text-white py-1 px-2">
                {description?.flavor_text}
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className="flex w-full h-full bg-bg-second-light dark:bg-bg-second-dark rounded-t-4xl p-5">
        <section className="w-[50%] h-full">
          <h1 className="font-display text-2xl text-text-primary-dark dark:text-text-primary-dark text-center">
            Abilities
          </h1>
          <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
          <div className="w-full h-full flex">
            {abilities.map((a) => {
              const effect = a.flavor_text_entries.find(
                (e) => e.language.name === 'en',
              )
              return (
                <div
                  key={a.name}
                  className="w-full h-auto gap-2 place-items-center "
                >
                  <h2 className="font-display text-xl text-text-primary-dark dark:text-text-primary-dark">
                    {a.name.charAt(0).toUpperCase() + a.name.slice(1)}
                  </h2>
                  <p className="font-display text-center text-sm text-text-primary-light dark:text-text-primary-dark">
                    {effect?.flavor_text}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </article>
  )
}
