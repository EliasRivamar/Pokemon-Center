import { PokemonsGrid } from './components/PokemonsGrid.jsx'
import { PokemonInfoResize } from './components/PokemonInfoResize.jsx'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { Header } from './components/Header.jsx'

function App() {
  const [gen, setGen] = useState(new Set())
  const [loadedImg, setLoadedImg] = useState(new Set())

  const handleLoad = (name) => {
    setLoadedImg((prev) => new Set(prev).add(name))
  }

  return (
    <div className="flex flex-col h-auto w-full bg-bg-light dark:bg-bg-dark">
      <Header setLoadedImg={setLoadedImg} setGen={setGen} loadedImg={loadedImg}
              handleLoad={handleLoad}/>
      <Routes>
        <Route
          path="/"
          element={
            <PokemonsGrid
              gen={gen}
              loadedImg={loadedImg}
              handleLoad={handleLoad}
            />
          }
        />
        <Route
          path="/:name"
          element={
            <PokemonInfoResize loadedImg={loadedImg} handleLoad={handleLoad} />
          }
        />
      </Routes>
    </div>
  )
}

export default App
