import useMatchMedia from 'react-use-match-media'
import { PokemonInfo } from './PokemonInfo'
import {PokemonInfoPhone} from './PokemonInfoPhone'
export function PokemonInfoResize({loadedImg, handleLoad}){
  const isWideViewport = useMatchMedia('(min-width: 600px)');
  return (
    <>
    {isWideViewport ? <PokemonInfo loadedImg={loadedImg} handleLoad={handleLoad}/> : <PokemonInfoPhone loadedImg={loadedImg} handleLoad={handleLoad}/>}
    </>
  )
}