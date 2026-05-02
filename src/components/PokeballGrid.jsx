import { Link } from "react-router-dom";

export function PokeballUI({p, isLoaded, handleLoad, isClickable}) {
  return (
      isClickable === true ? 
      <Link to={`/${p.name}`}>
      <div
        key={p.name}
        className=" flex relative flex-col bg-bg-light dark:bg-bg-dark items-center justify-center rounded-full border-2 border-bg-second-light dark:border-bg-second-dark w-30 h-30 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
      >
        <div
          className={`absolute text-text-primary-light dark:text-text-primary-dark -mt-23 -ml-24 lg:-ml-27 z-20 text-sm font-bold transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {p.id}
        </div>
        {!isLoaded && (
          <div
            className={`w-29.5 h-29.5 lg:w-29.5 lg:h-29.5 bg-gray-300 dark:bg-bg-second-light/20 animate-pulse rounded-full absolute transition-opacity duration-1000 ease-in-out z-20 ${!isLoaded ? 'opacity-100' : 'opacity-0'}`}
          ></div>
        )}
        <img
          className={`z-30 w-22 h-22 lg:w-24 lg:h-24 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => handleLoad(p.name)}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
          alt={p.name}
        />
        <div className="bg-bg-light dark:bg-bg-dark w-10 h-10 rounded-full absolute z-21 -mt-1 lg:mt-1"></div>
        <div className="bg-bg-second-light dark:bg-bg-second-dark w-full lg:w-30 h-14.5 lg:h-15 rounded-b-[99999px] absolute mt-14.5 lg:mt-15 z-20"></div>
        <p
          className={`text-center text-text-primary-dark dark:text-text-primary-dark z-21 -mt-4 mb-3 lg:-mt-3 lg:mb-3 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {p.name}
        </p>
      </div>
    </Link>
    :
      <div
        key={p.name}
        className=" flex relative flex-col bg-bg-light dark:bg-bg-dark items-center justify-center rounded-full border-2 border-bg-second-light dark:border-bg-second-dark w-30 h-30"
      >
        <div
          className={`absolute text-text-primary-light dark:text-text-primary-dark -mt-23 -ml-24 lg:-ml-27 z-20 text-sm font-bold transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {p.id}
        </div>
        {!isLoaded && (
          <div
            className={`w-29.5 h-29.5 lg:w-29.5 lg:h-29.5 bg-gray-300 dark:bg-bg-second-light/20 animate-pulse rounded-full absolute transition-opacity duration-1000 ease-in-out z-20 ${!isLoaded ? 'opacity-100' : 'opacity-0'}`}
          ></div>
        )}
        <img
          className={`z-30 w-22 h-22 lg:w-24 lg:h-24 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-50' : 'opacity-0'}`}
          onLoad={() => handleLoad(p.name)}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
          alt={p.name}
        />
        <div className="bg-bg-light dark:bg-bg-dark w-10 h-10 rounded-full absolute z-21 -mt-1 lg:mt-1"></div>
        <div className="bg-bg-second-light dark:bg-bg-second-dark w-full lg:w-30 h-14.5 lg:h-15 rounded-b-[99999px] absolute mt-14.5 lg:mt-15 z-20"></div>
        <p
          className={`text-center text-text-primary-dark dark:text-text-primary-dark z-21 -mt-4 mb-3 lg:-mt-3 lg:mb-3 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {p.name}
        </p>
      </div>
  )
}
