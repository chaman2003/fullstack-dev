import React, { useEffect, useRef } from 'react'

function Ref() {

    const inpRef = useRef(0)

    useEffect(() => {
        console.log("Componenet Rendered");
    })

    const click = () => {
        inpRef.current.style.backgroundColor = "red"
    }
    return (

        <div>
            <button onClick={click} >Click</button>
            <input type="text" ref={inpRef} />
        </div>
    )
}
export default Ref
