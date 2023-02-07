import React, { useEffect, useState } from 'react'

const useSimpleTimer = (timeDefault = 0) => {
    const [timer, setTimer] = useState(timeDefault)
    const [inCountDown, setInCountDown] = useState(false)

    const runTimer = (seconds) => {
        setInCountDown(true)
        setTimer(seconds)
    }

    useEffect(() => {
        let myInterval
        if (timer > 0) {
            myInterval = setInterval(() => {
                setTimer(timer - 1)
                if (timer < 1) {
                    clearInterval(myInterval)
                }
            }, 1000)
        }
        if (timer < 1) {
            setInCountDown(false)
        }
        return () => {
            clearInterval(myInterval)
        }
    }, [timer])

    useEffect(() => {
        return () => {
            setInCountDown(false)
            setTimer(0)
        }
    }, [])

    return { timer, runTimer, inCountDown }
}

export default useSimpleTimer
