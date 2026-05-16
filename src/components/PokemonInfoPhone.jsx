import poke from '../data/pokedex.json'
import typeNum from '../data/types.json'
import { ShowStat } from './ShowStat'
import { getPokemon } from '../services/getPokemon'
import { getAbilities } from '../services/getAbilities'
import { useEffect, useState } from 'react'
import { EvosGrid } from './InfoEvos'
import evolutions from '../data/evolutionLines.json'
import { Link, useParams } from 'react-router-dom'
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
  const [isGmax, setIsGmax] = useState(false)
  const [isVariant, setIsVariant] = useState('neutral')
  const [ATDEFOption, setATDEFOption] = useState('Defensive Matchups')
  const [descriptionPoke, setDescriptionPoke] = useState([])
  const [isFallback, setIsFallback] = useState(false)
  const [abilities, setAbilities] = useState([])
  const [pokemonInfo, setPokemonInfo] = useState([])
  const [option, setOption] = useState('Info')
  const pokemon = poke.find((n) => n.apiName === name)
  const stats = poke.find(({ id }) => id === pokemon.id)
  const evoLine = evolutions.find(
      (e) =>
        e.evolutionLine.some((p) => p.id === pokemon.id) ||
        e.mega.some((p) => p.apiName === name) ||
        e.gmax.some((p) => p.apiName === name) ||
        e.alola.some((p) => p.apiName === name) ||
        e.hisui.some((p) => p.apiName === name) ||
        e.paldea.some((p) => p.apiName === name),
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
  const variations = ['alola', 'galar', 'hisui', 'paldea']

  useEffect(() => {
    async function getInfoPokemon() {
      setIsFallback(false)
      const pokeInfo = await getPokemon(name)
      setPokemonInfo(pokeInfo)
      const pokeDescription = await getDescription(pokeInfo.species.url)
      setDescriptionPoke(pokeDescription)
      if(pokemon.name.includes('Mega')){
              setIsMega(true)
      }
      if(pokemon.name.includes('Gmax')){
        setIsGmax(true)
      }
      if(pokemon.name.includes('Alolan')){
        setIsVariant('alola')
      } else if(pokemon.name.includes('Galarian')){
        setIsVariant('galar')
      }
      else if(pokemon.name.includes('Hisuaian')){
        setIsVariant('hisuan')
      }
      else if(pokemon.name.includes('Paldean')){
        setIsVariant('paldea')
      }
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
  }, [name])

  return (
    <article className="w-full h-full">
      <div className="justify-center w-full h-[50vh] bg-bg-light dark:bg-bg-dark">
        <div
          key={`${stats.slug}`}
          className="flex flex-col items-center h-full relative p-2"
        >
          <h1 className="font-display text-5xl text-black dark:text-white text-center">
            {stats.name}
          </h1>
          <div className="flex w-full relative items-center justify-center">
            {/* Mega */}
            <div className="flex gap-2 absolute right-2 mb-3">
              {isMega === false ? (
                evoLine.mega?.length > 0 ? (
                  <Link
                    to={`/${evoLine.mega[0].apiName}`}
                    onClick={() => {setIsMega(true); setIsGmax(false)}}
                    className="z-30"
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
                  to={`/${evoLine.evolutionLine[0].apiName}`}
                  onClick={() => setIsMega(false)}
                  className="z-30"
                >
                  <img
                    className="size-10 hover:grayscale transition-all ease-in-out duration-400"
                    src={'../../public/megaIconIdle.png'}
                    alt={'mega'}
                  />
                </Link>
              )}
              {isGmax === false ? (
                evoLine.gmax?.length > 0 ? (
                  <Link
                    to={`/${evoLine.gmax[0].apiName}`}
                    onClick={() => {setIsGmax(true); setIsMega(false)}}
                    className="z-30"
                  >
                    <img
                      className="size-10 grayscale hover:grayscale-0 transition-all ease-in-out duration-400"
                      src={'../../public/gigantamax.png'}
                      alt={'gmax'}
                    />
                  </Link>
                ) : (
                  <></>
                )
              ) : (
                <Link
                  to={`/${evoLine.evolutionLine[0].apiName}`}
                  onClick={() => setIsGmax(false)}
                  className="z-30"
                >
                  <img
                    className="size-10 hover:grayscale transition-all ease-in-out duration-400"
                    src={'../../public/gigantamax.png'}
                    alt={'gmax'}
                  />
                </Link>
              )}
            </div>
            {/* Types */}
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
            className={`absolute z-0 ${isFallback ? 'scale-80 bottom-0' : 'scale-285 bottom-20'}`}
            alt={`${stats.slug}`}
          />
        </div>
      </div>
      <div className="w-full h-auto bg-bg-second-light dark:bg-bg-second-dark rounded-t-4xl p-5 relative z-20">
        <header className=" flex w-full h-14 relative">
          <ButtonPhone option={option} text={'Info'} setOption={setOption} />
          <ButtonPhone option={option} text={'Stats'} setOption={setOption} />
          <ButtonPhone
            option={option}
            text={'Type Char'}
            setOption={setOption}
          />
          <ButtonPhone
            option={option}
            text={'Evos\n/ Variations'}
            setOption={setOption}
          />
        </header>
        <div class="w-full h-0.5 bg-linear-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent my-2"></div>
        <div className="relative"></div>
        <div className='"w-full min-h-[70vh] h-auto bg-bg-second-light dark:bg-bg-second-dark rounded-t-4xl p-5'>
          {option === 'Info' ? (
            <div className="flex flex-col w-full h-full justify-start">
              <div className="flex gap-4 text-center justify-center">
                <p className="font-display text-center text-text-primary-light dark:text-text-primary-dark py-1 px-2">
                  Height: {(pokemonInfo.height * 0.1).toFixed(2)} m
                </p>
                <p className="font-display text-center text-text-primary-light dark:text-text-primary-dark py-1 px-2">
                  Weight: {Math.round(pokemonInfo.weight / 10)} kg
                </p>
              </div>
              <p className="font-display text-center text-text-primary-dark py-1 px-2">
                {description?.flavor_text}
              </p>
              <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent my-2"></div>
              <div className="w-full h-auto flex-col">
                <h1 className="font-display text-3xl text-text-primary-dark dark:text-text-primary-dark text-center">
                  Abilities
                </h1>
                {abilities.map((a) => {
                  const effect = a.flavor_text_entries.find(
                    (e) => e.language.name === 'en',
                  )
                  return (
                    <div
                      key={a.name}
                      className="w-full h-auto gap-3 place-items-center pt-3"
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
            </div>
          ) : option === 'Stats' ? (
            <div className="flex flex-col w-full h-full place-items-center">
              <section className="grid grid-rows-[60px_60px_60px_60px_60px_60px] w-full h-full">
                <ShowStat name={'PS'} stat={stats.stats.hp}></ShowStat>
                <ShowStat name={'Attack'} stat={stats.stats.atk}></ShowStat>
                <ShowStat name={'Defense'} stat={stats.stats.def}></ShowStat>
                <ShowStat name={'Sp. Atk'} stat={stats.stats.spa}></ShowStat>
                <ShowStat name={'Sp. Def'} stat={stats.stats.spd}></ShowStat>
                <ShowStat name={'Speed'} stat={stats.stats.spe}></ShowStat>
              </section>
            </div>
          ) : option === 'Type Char' ? (
            <>
              <div className=" w-full">
                <header className="flex place-items-center gap-10 h-10 justify-center w-full">
                  <ButtonPhone
                    option={ATDEFOption}
                    text={'Defensive Matchups'}
                    setOption={setATDEFOption}
                  />
                  <ButtonPhone
                    option={ATDEFOption}
                    text={'Offensive Matchups'}
                    setOption={setATDEFOption}
                  />
                </header>
                {ATDEFOption === 'Defensive Matchups' ? (
                  <div className="w-full h-auto flex flex-col ">
                    {calculateDefense(
                      pokemon,
                      typeNameStaticDefense,
                      tableTypesDefense,
                    )}
                    <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent my-2"></div>
                    <h1 className="font-display text-sm text-white">
                      Weaknesses
                    </h1>
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
                      <TypeTable
                        tableTypes={tableTypesDefense}
                        x={'x4'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
                      <TypeTable
                        tableTypes={tableTypesDefense}
                        x={'x2'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                    <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                    <h1 className="font-display text-sm text-white">Neutral</h1>
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
                      <TypeTable
                        tableTypes={tableTypesDefense}
                        x={'x1'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                    <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                    <h1 className="font-display text-sm text-white">
                      Resistence
                    </h1>
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
                      <TypeTable
                        tableTypes={tableTypesDefense}
                        x={'x0.5'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
                      <TypeTable
                        tableTypes={tableTypesDefense}
                        x={'x0.25'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                    <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                    <h1 className="font-display text-sm text-white">
                      Inmunnities
                    </h1>
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
                      <TypeTable
                        tableTypes={tableTypesDefense}
                        x={'x0'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                  </div>
                ) : (
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
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
                      <TypeTable
                        tableTypes={tableTypesAttack}
                        x={'x4'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
                      <TypeTable
                        tableTypes={tableTypesAttack}
                        x={'x2'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                    <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                    <h1 className="font-display text-sm text-white">Neutral</h1>
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
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
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
                      <TypeTable
                        tableTypes={tableTypesAttack}
                        x={'x0.5'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                    <div className="grid grid-cols-[17%_83%] items-center gap-2 my-2">
                      <TypeTable
                        tableTypes={tableTypesAttack}
                        x={'x0.25'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                    <div class="w-full flex h-0.5 bg-gradient-to-r from-transparent via-bg-light dark:via-bg-dark to-transparent mb-2"></div>
                    <h1 className="font-display text-sm text-white">
                      No Effect
                    </h1>
                    <div className="grid grid-cols-[17%_83%] items-center gap-2">
                      <TypeTable
                        tableTypes={tableTypesAttack}
                        x={'x0'}
                        getTypeImage={getTypeImage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : option === 'Evos\n/ Variations' ? (
            <>
              <h1 className="font-display text-3xl text-text-primary-dark dark:text-text-primary-dark text-center">
                Evolutions
              </h1>
              <div className="grid grid-cols-3 w-full gap-6 justify-center mr-15 scale-85">
                <EvosGrid
                              isVariant={isVariant}
                              isMega={isMega}
                              isGmax={isGmax}
                              evoLine={evoLine}
                              loadedImg={loadedImg}
                              handleLoad={handleLoad}
                              pokemon={pokemon}
                            />
              </div>
              <h1 className="font-display text-3xl text-text-primary-dark dark:text-text-primary-dark text-center my-2">
                Variants
              </h1>
              <div className="flex gap-2 place-content-center items-center w-full h-auto">
                {variations.map((variation) => {
                                if (pokemon.apiName.includes(variation)) {
                                  return evoLine.evolutionLine.map((evo) => {
                                    return pokemon.name.includes(evo.name) ? (
                                      <Link key={evo.name} to={`/${evo.name}`} onClick={() => setIsVariant("neutral")}>
                                        <p className="text-text-primary-light dark:text-text-primary-dark font-display bg-bg-light dark:bg-bg-dark py-2 px-3 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                                          Normal
                                        </p>
                                      </Link>
                                    ) : null
                                  })
                                }
                
                                return evoLine[variation]?.map((evo) => {
                                  return evo.name.includes(pokemon.name) ? (
                                    <Link
                                      key={evo.apiName}
                                      to={`/${evo.apiName}`}
                                      onClick={() => setIsVariant(variation)}
                                    >
                                      <p className="text-white font-display bg-bg-light dark:bg-bg-dark py-2 px-3 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                                        {variation.charAt(0).toUpperCase() + variation.slice(1)}
                                      </p>
                                    </Link>
                                  ) : null
                                })
                              })}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </article>
  )
}
