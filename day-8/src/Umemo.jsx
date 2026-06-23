import React, { useMemo, useState } from 'react'

function Umemo() {

    const [num, setnum] = useState(0)
    const [count, setcount] = useState(0)

    const cube = (num) => {
        console.log("Calculation is done");
        return Math.pow(num, 3)
    }

    //without memo
    // const result=cube(num) 

    //with memo (2 ways to write)
    // const result = useMemo(() => {
    //     return cube(num)
    // }, [num]);

    const result = useMemo(()=>cube(num),[num])

    return (
        <div>
            <input type="text" value={num} onChange={(e) => { setnum(e.target.value) }} />
            <h1>CUbe of the number is {result}</h1>

            <button onClick={() => { setcount(count + 1) }}>Counter ++</button>
            <h1>Counter: {count}</h1>

        </div>
    )
}

export default Umemo
