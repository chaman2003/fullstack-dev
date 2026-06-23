import { useState } from "react";

function UseStatee() {
  var [i,seti]=useState(1);

  const changevalue=()=>{
    seti(i+1);
  }

  return (

    <div>
      i is {i}
      <button onClick={changevalue}>click here to change the value </button>
    </div>
  )
}
export default UseStatee
