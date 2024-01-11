import {useEffect, useRef, useState} from 'react'

const toDays = (time: number) => Math.floor(time / (1000 * 60 * 60 * 24))
const toHours = (time: number) => Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
const toMinutes = (time: number) => Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
const toSeconds = (time: number) => Math.floor((time % (1000 * 60)) / 1000)

const useTimer = (endTime: number) => {
    let remainingTime = endTime - Date.now()
    const timerRef = useRef<number | null>(null)

    const [days, setDays] = useState(toDays(remainingTime))
    const [hours, setHours] = useState(toHours(remainingTime))
    const [minutes, setMinutes] = useState(toMinutes(remainingTime))
    const [seconds, setSeconds] = useState(toSeconds(remainingTime))

    const calculateTime = () => {
        remainingTime = endTime - Date.now()

        setDays(toDays(remainingTime))
        setHours(toHours(remainingTime))
        setMinutes(toMinutes(remainingTime))
        setSeconds(toSeconds(remainingTime))

        if (remainingTime <= 0) {
            clearInterval(timerRef.current!)
            setDays(0)
            setHours(0)
            setMinutes(0)
            setSeconds(0)
        }
    }

    useEffect(() => {
        timerRef.current = setInterval(calculateTime, 1000)
        return () => clearInterval(timerRef.current!)
    }, [endTime])

    return {days, hours, minutes, seconds}
}

export default useTimer
