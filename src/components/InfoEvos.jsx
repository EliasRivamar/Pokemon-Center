import { PokeballUI } from "./PokeballGrid"

export function EvosGrid({isVariant, isMega, isGmax, evoLine, loadedImg, handleLoad, pokemon}) {
  return (
    <>
      {isVariant === 'neutral'
      ?
      (
        <>
        {!isMega && !isGmax
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
                      :
                      <>
                      {
                      isMega
                      ? 
                      evoLine.mega.map((evo) => {
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
                        :
                        isGmax
                        ?
                        evoLine.gmax.map((evo) => {
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
                        :
                        <></> }
                      </>
                        }
        </>
      )
      : 
      <>
        {evoLine[isVariant].map((evo) => {
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
      </>
      }
    </>
  )
}