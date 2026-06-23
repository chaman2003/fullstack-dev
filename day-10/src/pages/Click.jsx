import React from 'react'

function Click() {


      const handleClick = () => {
    alert("Clicked")
  }


  return (
    <div>
       <button onClick={handleClick} value={name} >handleClick</button>
      <br />
    </div>
  )
}

export default Click
