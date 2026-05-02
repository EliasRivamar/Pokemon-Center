import { PokemonsGrid } from './components/PokemonsGrid.jsx'
import { useTheme } from './hooks/useTheme'
import { useGen } from './hooks/useGen'
import { PokemonInfo } from './components/PokemonInfo.jsx'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { getGenerations } from './services/getGenerations.js'
import { useEffect } from 'react'

function App() {
  const { theme, setTheme } = useTheme()
  const { genInput, setGenInput } = useGen()
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
  
  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-bg-light dark:bg-bg-dark pt-6">
        <header className="flex items-center justify-center">
          <h1 className="text-text-primary-light dark:text-text-primary-dark items-center text-3xl text-center pb-5 font-display">
            Pokemon Center
          </h1>
          <div className="flex items-center gap-2 p-1 rounded-lg bg-background-light dark:bg-surface-dark border border-bor-light dark:border-bor-dark ">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-1 hover:bg-primary/20 cursor-pointer
                            `}
            >
              {theme === 'dark' ? (
                <>
                  <div className="text-white" theme={theme}>
                    {' '}
                    Dark
                  </div>
                </>
              ) : (
                <>
                  <div className="text-black" theme={theme}>
                    {' '}
                    White
                  </div>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-lg bg-background-light dark:bg-surface-dark border border-bor-light dark:border-bor-dark ">
            <label htmlFor="gen" className="text-black dark:text-white">Generation</label>
            <select name="gen" id="gen" value={genInput} onChange={ e => setGenInput(e.target.value)}>
              <option value="1" className="text-black dark:text-white">1</option>
              <option value="2" className="text-black dark:text-white">2</option>
              <option value="3" className="text-black dark:text-white">3</option>
              <option value="4" className="text-black dark:text-white">4</option>
              <option value="5" className="text-black dark:text-white">5</option>
              <option value="6" className="text-black dark:text-white">6</option>
              <option value="7" className="text-black dark:text-white">7</option>
              <option value="8" className="text-black dark:text-white">8</option>
              <option value="9" className="text-black dark:text-white">9</option>
            </select>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<PokemonsGrid gen={gen} loadedImg={loadedImg} handleLoad={handleLoad} />} />
          <Route path="/:name" element={<PokemonInfo loadedImg={loadedImg} handleLoad={handleLoad} />} />
        </Routes>
        
        {/* <PokemonInfo/> */}
      </div>
    </>
  )
}

export default App
