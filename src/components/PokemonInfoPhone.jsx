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
import typeAn from '../data/type-data.json'
import { TypeTable } from './TypeTable'
import { ButtonPhone } from './ButtonsPhone'

function getTypeImage(type) {
  const numType = typeNum.find((t) => t.type === type)
  return numType.num
}
function calculateDefense(pokemon, typeNameStaticDefense, tableTypesDefense) {
  pokemon.types.map((type) => {
    typeAn.types.map((typeName) => {
      typeNameStaticDefense[typeName] =
        typeAn.defense[type][typeName] * typeNameStaticDefense[typeName]
    })
  })
  typeAn.types.map((typeName) => {
    switch (typeNameStaticDefense[typeName]) {
      case 4:
        tableTypesDefense.x4.push(typeName)
        break
      case 2:
        tableTypesDefense.x2.push(typeName)
        break
      case 1:
        tableTypesDefense.x1.push(typeName)
        break
      case 0.5:
        tableTypesDefense['x0.5'].push(typeName)
        break
      case 0.25:
        tableTypesDefense['x0.25'].push(typeName)
        break
      case 0:
        tableTypesDefense.x0.push(typeName)
        break
    }
  })
}
function calculateAttack(pokemon, typeNameStaticAttack, tableTypesAttack) {
  pokemon.types.map((type) => {
    typeAn.types.map((typeName) => {
      typeNameStaticAttack[typeName] =
        typeAn.attack[type][typeName] * typeNameStaticAttack[typeName]
    })
  })
  typeAn.types.map((typeName) => {
    switch (typeNameStaticAttack[typeName]) {
      case 4:
        tableTypesAttack.x4.push(typeName)
        break
      case 2:
        tableTypesAttack.x2.push(typeName)
        break
      case 1:
        tableTypesAttack.x1.push(typeName)
        break
      case 0.5:
        tableTypesAttack['x0.5'].push(typeName)
        break
      case 0.25:
        tableTypesAttack['x0.25'].push(typeName)
        break
      case 0:
        tableTypesAttack.x0.push(typeName)
        break
    }
  })
}

export function PokemonInfoPhone({ loadedImg, handleLoad }) {
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
  const typeNameStaticDefense = {
    Normal: 1,
    Fire: 1,
    Water: 1,
    Grass: 1,
    Electric: 1,
    Ice: 1,
    Fighting: 1,
    Poison: 1,
    Ground: 1,
    Flying: 1,
    Psychic: 1,
    Bug: 1,
    Rock: 1,
    Ghost: 1,
    Dragon: 1,
    Steel: 1,
    Fairy: 1,
    Dark: 1,
  }
  const typeNameStaticAttack = {
    Normal: 1,
    Fire: 1,
    Water: 1,
    Grass: 1,
    Electric: 1,
    Ice: 1,
    Fighting: 1,
    Poison: 1,
    Ground: 1,
    Flying: 1,
    Psychic: 1,
    Bug: 1,
    Rock: 1,
    Ghost: 1,
    Dragon: 1,
    Steel: 1,
    Fairy: 1,
    Dark: 1,
  }
  const tableTypesDefense = {
    x4: [],
    x2: [],
    x1: [],
    'x0.5': [],
    'x0.25': [],
    x0: [],
  }
  const tableTypesAttack = {
    x4: [],
    x2: [],
    x1: [],
    'x0.5': [],
    'x0.25': [],
    x0: [],
  }

  const [pokemonInfo, setPokemonInfo] = useState([])
  const [option, setOption] = useState('Info')
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
    <article className="w-full h-full">
      <div className="justify-center w-full h-[50vh] bg-bg-light dark:bg-bg-dark">
        {/* High Part */}
        <div
          key={`${stats.slug}`}
          className="flex flex-col items-center h-full relative p-2"
        >
            <h1 className="font-display text-5xl text-black dark:text-white text-center z-20">
              {stats.name}
            </h1>
          <div className='flex w-full relative items-center justify-center'>
            <div className="flex gap-2 absolute right-2 mb-3">
              {isMega === false ? (
                evoLine.mega?.length > 0 ? (
                  <Link
                    to={`/${evoLine.mega[0].name}-${evoLine.mega[0].id}`}
                    onClick={() => setIsMega(true)} className='z-30'
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
                  onClick={() => setIsMega(false)} className='z-30'
                >
                  <img
                    className="size-10 hover:grayscale transition-all ease-in-out duration-400"
                    src={'../../public/megaIconIdle.png'}
                    alt={'mega'}
                  />
                </Link>
              )}
            </div>
          <div className="flex justify-end gap-3">
            {pokemon.types.map((type) => (
              <div
                key={type}
                className="flex flex-col place-items-center gap-1"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/small/${getTypeImage(type)}.png`}
                  className="size-13 items-center mr-1"
                  alt={`${type}`}
                />
                <p className="font-display text-center text-black dark:text-white py-1 px-2">
                  {type}
                </p>
              </div>
            ))}
          </div>
          </div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${stats.id}.gif`}
            onError={(e) => {
              setIsFallback(true)
              e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stats.id}.png`
            }}
            className={`absolute ${isFallback ? 'scale-120 bottom-25' : 'scale-285 bottom-25'}`}
            alt={`${stats.slug}`}
          />
        </div>
        <div className="place-items-center m-5">
          <section className="flex flex-col w-full h-full">
            {/* Variations Part */}
            {/* <div className="flex gap-2 place-content-center items-center w-full min-h-30">
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
            </div> */}
            {/* Info Part */}
            {/* <div className="flex flex-col w-full h-full justify-end">
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
            </div> */}
          </section>
        </div>
      </div>
      <div className="w-full h-auto bg-bg-second-light dark:bg-bg-second-dark rounded-t-4xl p-5">
        <header className=" flex w-full h-14 relative">
          <ButtonPhone option={option} text={"Info"} setOption={setOption}/>
          <ButtonPhone option={option} text={"Stats"} setOption={setOption}/>
          <ButtonPhone option={option} text={"Type Char"} setOption={setOption}/>
          <ButtonPhone option={option} text={"Evos\nVariations"} setOption={setOption}/>
          </header>
          <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent my-2"></div>
          <div className="relative">

    </div>
          {/* Abilities */}
          {/* <div className="w-full h-auto flex-col">
            {abilities.map((a) => {
              const effect = a.flavor_text_entries.find(
                (e) => e.language.name === 'en',
              )
              return (
                <div
                  key={a.name}
                  className="w-full h-auto gap-3 place-items-center pt-7"
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
          </div> */}
        
            {/* Defensive Matchups */}
            {/* <div className=" w-[50%]">
              <header className="flex place-items-center gap-10 h-10 justify-center w-full">
                <h1 className="font-display text-xl text-text-primary-dark dark:text-text-primary-dark text-center">
                  Defensive Matchups
                </h1>
              </header>
              <div className="w-full h-auto flex flex-col ">
                {calculateDefense(
                  pokemon,
                  typeNameStaticDefense,
                  tableTypesDefense,
                )}
                <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent my-2"></div>
                <h1 className="font-display text-sm text-white">Weaknesses</h1>
                <div className="grid grid-cols-[10%_90%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesDefense}
                    x={'x4'}
                    getTypeImage={getTypeImage}
                  />
                </div>
                <div className="grid grid-cols-[10%_87%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesDefense}
                    x={'x2'}
                    getTypeImage={getTypeImage}
                  />
                </div>
                <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                <h1 className="font-display text-sm text-white">Neutral</h1>
                <div className="grid grid-cols-[10%_87%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesDefense}
                    x={'x1'}
                    getTypeImage={getTypeImage}
                  />
                </div>
                <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                <h1 className="font-display text-sm text-white">Resistence</h1>
                <div className="grid grid-cols-[10%_87%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesDefense}
                    x={'x0.5'}
                    getTypeImage={getTypeImage}
                  />
                </div>
                <div className="grid grid-cols-[10%_87%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesDefense}
                    x={'x0.25'}
                    getTypeImage={getTypeImage}
                  />
                </div>
                <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                <h1 className="font-display text-sm text-white">Inmunnities</h1>
                <div className="grid grid-cols-[10%_87%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesDefense}
                    x={'x0'}
                    getTypeImage={getTypeImage}
                  />
                </div>
              </div>
            </div> */}
            
            {/* Ofenssive Matchups */}
            {/* <div className=" w-[50%]">
              <header className="flex place-items-center h-10 gap-10 justify-center w-full">
                <h1 className="font-display text-xl text-text-primary-dark dark:text-text-primary-dark text-center">
                  Offensive Matchups
                </h1>
              </header>
              <div className="w-full h-auto flex flex-col ">
                {calculateAttack(
                  pokemon,
                  typeNameStaticAttack,
                  tableTypesAttack,
                )}
                <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent my-2"></div>
                <h1 className="font-display text-sm text-white">
                  Super Effective
                </h1>
                <div className="grid grid-cols-[10%_90%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesAttack}
                    x={'x4'}
                    getTypeImage={getTypeImage}
                  />
                </div>
                <div className="grid grid-cols-[10%_87%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesAttack}
                    x={'x2'}
                    getTypeImage={getTypeImage}
                  />
                </div>
                <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                <h1 className="font-display text-sm text-white">Neutral</h1>
                <div className="grid grid-cols-[10%_87%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesAttack}
                    x={'x1'}
                    getTypeImage={getTypeImage}
                  />
                </div>
                <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                <h1 className="font-display text-sm text-white">
                  No Very Effective
                </h1>
                <div className="grid grid-cols-[10%_87%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesAttack}
                    x={'x0.5'}
                    getTypeImage={getTypeImage}
                  />
                </div>
                <div className="grid grid-cols-[10%_87%] items-center gap-2 my-2">
                  <TypeTable
                    tableTypes={tableTypesAttack}
                    x={'x0.25'}
                    getTypeImage={getTypeImage}
                  />
                </div>
                <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                <h1 className="font-display text-sm text-white">No Effect</h1>
                <div className="grid grid-cols-[10%_87%] items-center gap-2">
                  <TypeTable
                    tableTypes={tableTypesAttack}
                    x={'x0'}
                    getTypeImage={getTypeImage}
                  />
                </div>
              </div>
            </div> */}

      </div>
    </article>
  )
}
