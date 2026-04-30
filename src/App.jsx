import { PokemonsGrid } from './components/PokemonsGrid.jsx'
import { useTheme } from './hooks/useTheme'
import { useGen } from './hooks/useGen'

function App() {
  const { theme, setTheme } = useTheme()
  const { genInput, setGenInput } = useGen()
  return (
    <>
      <div className="h-auto w-full bg-bg-light dark:bg-bg-dark justify-center p-6">
        <header className="flex items-center justify-center">
          <h1 className="text-text-primary-light dark:text-text-primary-dark items-center text-2xl text-center pb-5">
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
            <label for="gen" className="text-black dark:text-white">Generation</label>
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
        <PokemonsGrid genInput={genInput} />
      </div>
    </>
  )
}

export default App
