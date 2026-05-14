
function getColor(x){
  if(x === "x0"){
    return "brown"
  }
  if(x === "x0.25"){
    return "rgb(170, 12, 12)"
  }
  if(x === "x0.5"){
    return 'red'
  }
  if(x === "x1"){
    return 'rgb(245, 174, 22)'
  }
  if(x === "x2"){
    return 'rgb(12, 242, 116)'
  }
  return 'rgb(184, 12, 242)'
}

export function TypeTable({ tableTypes, x, getTypeImage }) {
  return (
    <>
      {tableTypes[x].length > 0 ? (
        <h1 style={{ backgroundColor: getColor(x)}} className={`font-display text-center text-sm text-black dark:text-white py-1 px-2 rounded-xl`}>
          {x}
        </h1>
      ) : (
        <></>
      )}
      <div className="grid grid-cols-5 gap-2">
        {tableTypes[x].length > 0 ? (
          tableTypes[x].map((a) => (
            <div key={a} className="flex flex-col place-items-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/small/${getTypeImage(a)}.png`}
                className="size-8 place-items-center"
                alt={`${a}`}
              />
              <p className="font-display text-center text-[10px] text-white">
                {a}
              </p>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
