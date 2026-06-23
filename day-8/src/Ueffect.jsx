import { useEffect, useState } from "react"


function Ueffect() {

    const [count1,setcount1] = useState(0)

    useEffect(()=>{
        setTimeout(()=>{
            setcount1(count1=>count1+1);
        },2000)
    })

    const [count2,setcount2] = useState(0)
    
    useEffect(()=>{
        setTimeout(()=>{
            setcount2(count2=>count2+1);
        },2000)
    },[])

        const [count3,setcount3] = useState(0)
    
    useEffect(()=>{
        setTimeout(()=>{
            setcount3(count3=>count3+1);
        },2000)
    },[count3])

  return (
    <div>
      <h1>Rendered {count1} times (no dependecy)</h1>
      <h1>Rendered {count2} times (empty dependecy)</h1>
      <h1>Rendered {count3} times (with dependecy)</h1>


    </div>
  )
}

export default Ueffect
