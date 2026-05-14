export function ButtonPhone ({option, text, setOption}){
  return(
    <button className={`font-display p-5 bg-bg-second-light dark:bg-bg-second-dark rounded-2xl items-center text-sm text-text-primary-dark dark:text-text-primary-dark text-center transition-transform duration-400 ease-in-out ${option === text ? "-translate-y-14 pointer-events-none" : "translate-y-0"} active:scale-105`} onClick={() => setOption(text)}>
                {text}
              </button>
  )
}