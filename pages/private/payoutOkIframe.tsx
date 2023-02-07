import React from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import CreditScoreIcon from '@mui/icons-material/CreditScore'
import { PATHS } from '@routes/paths/PATHS'

const payoutOkIframe = () => {
    const handleOnclick = () => {
        window.top.location = PATHS.CUENTA_RETIRO_ESTADO_DE_SOLICITUD.url
    }

    return (
        <StyledWrapper>
            <h1>
                <CreditScoreIcon></CreditScoreIcon>
                <span>Retiro exitoso</span>
            </h1>
            <p>Tu retiro se realizó con éxito</p>
            <StyledButton onClick={handleOnclick} variant="outlined" color="success2">
                Ver retiro
            </StyledButton>
        </StyledWrapper>
    )
}

export default payoutOkIframe

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
                color: ${(p) => p.theme.palette.success2.main};
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
