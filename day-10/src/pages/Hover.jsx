import React from 'react'

function Hover() {

 const handleMouseOver = () => {
    alert(" hovered")
  }

  return (
    <div>
      <button onMouseOver={handleMouseOver} ><h1>hi bro</h1></button>
      <br />
    </div>
  )
}

export default Hover
