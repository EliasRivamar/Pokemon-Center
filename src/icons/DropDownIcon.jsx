import ChevronDown from '../assets/chevronDown.svg?react'


export function DropDownIcon({isActive}) {
  return (
    <ChevronDown className={`fill-text-primary-light dark:fill-text-primary-dark
      ${isActive ?'rotate-180' : '' }`}/>
  )
}