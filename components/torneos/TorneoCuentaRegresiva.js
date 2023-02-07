import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const TorneoCuentaRegresiva = ({ className, init, end }) => {
    const [days, setDays] = useState('')
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')
    useEffect(() => {
        const rest = new Date(end?.replace(' ', 'T'))

        const _end = new Date(rest).getTime()
        const interval = setInterval(() => {
            const currentDate = new Date().getTime()
            const distance = _end - currentDate
            const _days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const _hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const _minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const _seconds = Math.floor((distance % (1000 * 60)) / 1000)
            setDays(_days)
            setHours(_hours)
            setMinutes(_minutes)
            setSeconds(_seconds)
        }, 1000)
        return () => clearInterval(interval)
    }, [init, end])

  

    return (
        <TorneoCuentaRegresivaS className={className}>
            <BlockS>
                <span>{days}</span>
                <span className="bottom">Día</span>
            </BlockS>
            <span></span>
            <BlockS>
                <span>{hours}</span>
                <span className="bottom">Hora</span>
            </BlockS>
            <span className="points">:</span>
            <BlockS>
                <span>{minutes}</span>
                <span className="bottom">Min.</span>
            </BlockS>
            <span className="points">:</span>
            <BlockS>
                <span>{seconds}</span>
                <span className="bottom">Seg.</span>
            </BlockS>
        </TorneoCuentaRegresivaS>
    )
}

export default TorneoCuentaRegresiva
const TorneoCuentaRegresivaS = styled.div`
    & {
        display: grid;
        grid-template-columns: 1fr 0.4fr 1fr 0.4fr 1fr 0.4fr 1fr;
        align-items: center;
        > .points {
            text-align: center;
        }
    }
`
const BlockS = styled.div`
    font-size: 1.1rem;
    font-weight: 500;
    text-transform: uppercase;
    padding: 1rem 0;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    > .bottom {
        font-size: 0.5rem;
        text-transform: capitalize;
    }
`
