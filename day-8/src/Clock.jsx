import { useEffect, useState } from "react"
function Clock() {
    const [time, settime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            settime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    function formatClock() {
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let seconds = time.getSeconds()
        let meridian = hours >= 12 ? "PM" : "AM"
        hours = hours % 12 || 12
        return `${addprev(hours)} :${addprev(minutes)} :${addprev(seconds)}. ${meridian}`
    }
    function addprev(num) {
        return ((num < 10 ? "0" : "") + num)
    }

    return (
        <div>
            <h1> Time is: {formatClock()}
            </h1>
        </div>
    )
}

export default Clock
