import { useState } from 'react'

function UseStatee() {

  var i = 1;
  var [j, setj] = useState(1);

    const changevalue=()=>{
        i=i+1;
        setj(j+1)
    }


  return (
    <div>
      i is {i}

      j is {j}
      <button onClick={changevalue}>Click to change value</button>
    </div>
  )
}

export default UseStatee
