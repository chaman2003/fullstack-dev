import React, { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'

function Ucallback() {

const [count,setcount] = useState(0)

const add=()=>{
    setcount(count+1)
}

//store the function in cache memeory without rerender
const newfunction= useCallback(()=>{},[]) 

  return (
    <>
    <Header newfunction={newfunction}/>
    <div>
        <h1>Count : {count}</h1>
      <button onClick={add}>+</button>
    </div>
    </>
  )
}

export default Ucallback
