/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { PATHS } from 'routes/paths/PATHS'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
export const PayoutError = () => {
    const [message, setMessage] = useState('')
    function gup(name: string, url: string) {
        if (!url) url = location.href
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
        var regexS = '[\\?&]' + name + '=([^&#]*)'
        var regex = new RegExp(regexS)
        var results = regex.exec(url)
        return results == null ? null : results[1]
    }
    const keyErrors = [
        { key: 'LIMIT_TRANSACTION', message: 'El monto a retirar no cumple con los límites por transacción' },
        { key: 'PENDING_PAYOUT', message: 'Tienes un retiro pendiente' },
        { key: 'GENERAL_ERROR', message: 'Ocurrió un error' },
    ]
    useEffect(() => {
        const param = gup('payoutError', window.location.href)
        const filterKeyErrors = keyErrors.filter((item) => item.key === param)
        if (filterKeyErrors.length > 0) {
            const error = filterKeyErrors[0]
            console.log(filterKeyErrors[0])
            setMessage(error.message)
        } else {
            setMessage('Ocurrió un error')
        }
    }, [])

    const handleOnclick = () => {
        window.top.location = PATHS.CUENTA_RETIRO.url
    }

    return (
        <StyledWrapper>
            <h1>
                <DoDisturbIcon></DoDisturbIcon>
                <span>Retiro denegado</span>
            </h1>
            <p>{message}</p>
            <StyledButton onClick={handleOnclick} variant="outlined">
                Volver a métodos de retiro
            </StyledButton>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    & {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 4rem 1rem;
        gap: 1rem;
        margin: auto;
        > h1 {
            font-size: 1.4rem;
            font-weight: 500;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 3px;
            > svg {
                color: ${(p) => p.theme.palette.primary.main};
                font-size: 1.8rem;
            }
        }
        > p {
            font-size: 1rem;
            text-align: center;
        }
    }
`
const StyledButton = styled(Button)`
    && {
        text-transform: initial;
        padding: 0.9rem 2rem;
        font-size: 1rem;
        transition: 200ms;
        font-weight: 500 !important;
        font-family: Rubik;
    }
`
