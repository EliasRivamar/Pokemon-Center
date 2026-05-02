

function getPorcentaje(stat) {
  const porcentaje = Math.round((stat / 255) * 100)
  return porcentaje
}

function getColor(stat){
  if(stat>=1 && stat<=59){
    return 'red'
  } else if(stat<= 99){
    return 'rgb(245, 174, 22)'
  } else if(stat<=119){
    return 'rgb(12, 242, 116)'
  }
  return 'rgb(184, 12, 242)'
}

export function ShowStat({name, stat}) {
  return (
    <div className="grid grid-cols-[108px_40px_69%] gap-2 place-items-center">
      <h1 className="font-display text-xl text-black dark:text-white text-center">
        {name}
      </h1>
      <h1 className="font-display text-xl text-black dark:text-white">
        {stat}
      </h1>
      <div className=" w-full h-2.5 dark:bg-bg-second-dark bg-gray-300 rounded-2xl rounded-l-5xl">
        <div
          style={{ width: `${getPorcentaje(stat)}%`, backgroundColor: getColor(stat)}}
          className={`h-2.5 rounded-2xl`}
        ></div>
      </div>
    </div>
  )
}
