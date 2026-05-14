import { useTheme } from '../hooks/useTheme'
import { Link} from 'react-router-dom'
import poke from '../data/pokedex.json'
import { useGen } from '../hooks/useGen'
import { getGenerations } from '../services/getGenerations.js'
import { useEffect } from 'react'
import { LightModeIcon } from '../icons/LightModeIcon.jsx'
import { DarkModeIcon } from '../icons/DarkModeIcon.jsx'
import { CustomSelect } from './CustomSelect.jsx'
import { SearchBar } from './SearchBar.jsx'
import { useState } from 'react'
import { PokemonSearched } from './ShowPokemonSearch.jsx'





export function Header({setLoadedImg, setGen, loadedImg,
  handleLoad}) {
  const { theme, setTheme } = useTheme()
  const { genInput, setGenInput } = useGen()
  const [searchValue, setSearchValue] = useState("")
  useEffect(() => {
    async function getGen() {
      setLoadedImg(new Set())
      const poke_generation = await getGenerations(genInput)
      setGen(new Set(poke_generation.map((p) => p.name)))
    }
    getGen()
  }, [genInput])

  function handleChange(e){
    const value = e.target.value
    setSearchValue(value)
  }

  const filteredPokemons = searchValue === ''
  ? poke
  : poke.filter(p => { return p.slug.includes(searchValue.toLowerCase())})

  return (
    <header className="items-center m-5 relative">
      <Link to={'/'} className='items-center'>
        <h1 className="text-text-primary-light dark:text-text-primary-dark text-3xl text-center pb-5 font-display">
          PokeChoose
        </h1>
      </Link>
      <div className='flex items-center justify-center gap-2 relative'>
        <div className='relative place-items-center'>
          <SearchBar onChange={handleChange}/>
          <div className='lg:w-90 w-70 h-75 lg:h-80 p-2.5 absolute top-7.5 z-33 overflow-y-scroll overflow-x-hidden'>
            { searchValue === ""  ? <></> :  <PokemonSearched filteredPokemons={filteredPokemons} loadedImg={loadedImg} handleLoad={handleLoad}/>}
          </div>
        </div>
        <div>
          <CustomSelect value={genInput} onChange={(value) => setGenInput(value)} options={[1,2,3,4,5,6,7,8,9]}/>
        </div>
      </div>
        <div className="flex items-center gap-2 p-0 rounded-lg bg-bg-light dark:bg-bg-dark border border-bor-light dark:border-bor-dark absolute right-0 top-0 ">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`px-3 py-3 rounded-md text-sm transition-all flex items-center gap-1 cursor-pointer group hover:bg-bg-dark/20 dark:hover:bg-bg-second-dark duration-300 ease-in-out
                                  `}
          >
            {theme === 'dark' ? (
              <>
                <div className="text-white" theme={theme}>
                  {' '}
                  <DarkModeIcon/>
                </div>
              </>
            ) : (
              <>
                <div theme={theme}>
                  <LightModeIcon/>
                </div>
              </>
            )}
          </button>
        </div>
    </header>
  )
}
