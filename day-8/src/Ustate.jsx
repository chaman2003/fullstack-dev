import { use, useState } from "react";

function Ustate() {

  let [color, setcolor] = useState("secret🤫")

  const changeColor = (color) => {
    setcolor('Blue')
  }

  let [specs, setSpecs] = useState({
    processor: "idk", ram: "idk", storage: "idk", pcolor: "idk"
  })

  const revealspecs = () => {
    setSpecs({
      processor: "Mediatek", ram: "12gb", storage: "512gb", pcolor: "Yellow , Black , White"
    })

  }

const [count, setcount] = useState(0)

const addcart=()=>{
  setcount(count+1)
}


  return (
    <div>
      <h1>My favourite color is {color}</h1>
      <button onClick={changeColor}>Reveal color</button>

      <h1>Phone is Poco💣 </h1>
      <h2>{specs.processor} , {specs.ram}, {specs.storage} </h2>
      <button onClick={revealspecs}>Show more info</button>
      <h4>Color Options are : {specs.pcolor}</h4>
      <button onClick={revealspecs}>Reveal color</button>

    <h1>Liked the Product?</h1>
    <h2>🛒{count} added to cart</h2>
    <button onClick={addcart}> Click to add to add to cart </button>

    </div>
  )
}

export default Ustate
