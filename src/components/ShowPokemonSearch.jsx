import { Link } from "react-router-dom";
import typeNum from '../data/types.json'
import { useState } from "react";

function getTypeImage(type) {
  const numType = typeNum.find((t) => t.type === type)
  return numType.num
}
export function PokemonSearched ({filteredPokemons, loadedImg, handleLoad, setSearchValue}){
    const [isFallback, setIsFallback] = useState(false)
  return(
<>
    {
      filteredPokemons.length !== 0 ?
      filteredPokemons.slice(0,10).map((p) => {
        const isLoaded = loadedImg.has(p.name)
        return(
          <div key={p.name} className=' w-full h-18 items-center' onClick={() => setSearchValue('')}>
            <Link to={`/${p.apiName}`} className="items-center">
              <div
                key={p.name}
                className=" flex w-full border z-32 border-bor-light dark:border-bor-dark rounded-lg bg-bg-light dark:bg-bg-dark hover:bg-bg-second-light dark:hover:bg-bg-second-dark h-full transition-all duration-300 ease-in-out cursor-pointer p-2 items-center"
              >
                <img
                  className={`w-12 h-12 lg:w-18 lg:h-18 transition-opacity lg:-mt-2 duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isFallback ? 'scale-100' : ''}`}
                  onError={(e) => {
                    setIsFallback(true)
                    e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`
                  }}
                  onLoad={() => handleLoad(p.name)}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                  alt={p.name}
                />
                <p
                  className={`w-[40%] font-display text-center text-text-primary-light dark:text-text-primary-dark transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                >
                  {p.name}
                </p>
                {p.types.map((type) => (
                <div
                  key={type}
                  className="flex w-[30%] flex-col place-items-center mt-1 lg:ml-2 lg:gap-1"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/small/${getTypeImage(type)}.png`}
                    className="size-7 items-center mr-1"
                    alt={`${type}`}
                  />
                  <p className="font-display text-center text-sm text-black dark:text-white py-1 px-2">
                    {type}
                  </p>
                </div>
              ))}
              </div>
            </Link>
          </div>
        )
      } 
    )
    : <div className=' w-full h-10 items-center'>
      <div
        className=" flex w-full min-w-0 flex-1 overflow-hidden border z-32 border-bor-light dark:border-bor-dark rounded-lg bg-bg-light dark:bg-bg-dark hover:bg-bg-second-light dark:hover:bg-bg-second-dark h-full transition-all duration-300 ease-in-out cursor-pointer p-2"
      >
        <p
                  className={`w-full font-display text-center text-text-primary-light dark:text-text-primary-dark transition-opacity duration-1000 ease-in-out`}
                >
                  No Results
                </p>
      </div>
  </div>
    }
</>
  )
}