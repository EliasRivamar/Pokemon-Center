export function ButtonPhone({ option, text, setOption }) {
  return (
    <>
      {text.includes('Info') ||
      text.includes('Stats') ||
      text.includes('Type Char') ||
      text.includes("Evos\n/ Variations") ? (
        <button
          className={`font-display p-5 bg-bg-second-light z-30 dark:bg-bg-second-dark rounded-2xl items-center text-sm text-text-primary-dark dark:text-text-primary-dark text-center transition-transform duration-400 ease-in-out cursor-pointer ${option === text ? '-translate-y-14 pointer-events-none' : 'translate-y-0'} active:scale-105`}
          onClick={() => setOption(text)}
        >
          {text}
        </button>
      ) : (
        <button
          className={`font-display p-5  rounded-2xl items-center text-sm text-center transition-transform duration-300 ease-in-out z-30 ${option === text ? 'text-text-primary-dark dark:text-text-primary-dark pointer-events-none scale-115' : 'text-text-primary-light dark:text-text-secondary-light'} active:scale-110 cursor-pointer`}
          onClick={() => setOption(text)}
        >
          {text}
        </button>
      )}
    </>
  )
}
