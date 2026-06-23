import React from 'react'

function Header() {

    console.log("Header Rendered");
    
  return (

    <div>
      <h1>Header :p</h1>
    </div>
  )
}

export default React.memo(Header)
