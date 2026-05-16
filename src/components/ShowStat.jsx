

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
    <div className="grid lg:grid-cols-[108px_70%] grid-cols-[65px_70%] gap-2 place-items-center">
      <h1 className="font-display lg:text-xl text-text-primary-dark lg:text-black dark:text-white text-center">
        {name}
      </h1>
      <div className=" w-full lg:h-5 lg:dark:bg-bg-second-dark dark:bg-bg-dark bg-gray-300 rounded-2xl rounded-l-5xl">
        <div
          style={{ width: `${getPorcentaje(stat)}%`, backgroundColor: getColor(stat)}}
          className={`h-5 rounded-2xl relative`}
        ><p style={{right: stat<=25 ? '-28px' : '-28px'}} className='absolute font-display dark:text-text-primary-dark'>{stat}</p></div>
      </div>
    </div>
  )
}
