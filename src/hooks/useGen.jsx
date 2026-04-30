import { useEffect, useState } from "react";

export function useGen(){
  const [genInput, setGenInput] = useState(
      () => (localStorage.getItem("gen")) || "1"
    );
  
    useEffect(() => {
      if (genInput === "1") {
        localStorage.setItem("gen", "1");
      } else {
        localStorage.setItem("gen", "4");
      }
    }, [genInput]);
    return {genInput, setGenInput}
}