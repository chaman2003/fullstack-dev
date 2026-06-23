import { useState } from "react";
import { useEffect } from "react";

function UseStatee() {
  var [i,seti]=useState(1);

  const addvalue=()=>{
    seti(i+1);
  }

  const subvalue=()=>{
    seti(i-1);
  }


  useEffect(() => {
    console.log(`Count is now: ${i} (Missingdepency " ")`);
  }
); 

  useEffect(() => {
    console.log(`Count is now: ${i} (Empty dependency) " [] " `);
  },[]
); 

  useEffect(() => {
    console.log(`Count is now: ${i} (With Dependency) " [Value] "`);
  },[i]
); 

  return (

    <div>
      i is {i}
      <button onClick={addvalue}>click to change bro </button>
      <button onClick={subvalue}>click to change bro </button>
    </div>
  )
}
export default UseStatee
