import React, { useEffect, useRef, useState } from 'react'

function Uref() {

    // before
    // const [count , setcount] =useState(0)
    // useEffect(()=>{
    //     setcount(prev=>prev+1)
    // })

    const [value, setvalue] = useState(0)
    const count = useRef(0)

    useEffect(() => {
        count.current = count.current + 1
    });

    // dom manipulation
    const inputelem = useRef()

    const btnclicked = () => {
        console.log(inputelem.current);
        inputelem.current.style.background = "blue"
    }
    const  buttonRef = useRef();
    console.log(buttonRef);

    buttonRef.current.textContent = "hello";

    return (
        <div>
            <button onClick={() => { setvalue(prev => prev + 1) }}>+</button>
            <h1>{value}</h1>
            <button onClick={() => { setvalue(prev => prev - 1) }}>-</button>
            <h1>Render Count: {count.current}</h1>

            {/* dom manipulation */}
            <input type="text" ref={inputelem} />
            <button onClick={btnclicked}>Submit</button>
            <button ref={buttonRef}>ref</button>
        </div>
    )
}

export default Uref
