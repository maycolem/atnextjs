import { PATHS } from '@routes/paths/PATHS'
import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Link from 'next/link'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import { dtBackToRetiros } from './dt'
import styled from 'styled-components'

export const BackMethodsLink = ({ maxWidth = '700px' }) => {
    return (
        <StyledBack>
            <Link href={PATHS.CUENTA_RETIRO.url} legacyBehavior>
                <StyledLink $maxWidth={maxWidth} href={PATHS.CUENTA_RETIRO.url} onClick={dtBackToRetiros}>
                    <KeyboardBackspaceIcon /> <span>Elegir otro método de retiro</span>
                </StyledLink>
            </Link>
        </StyledBack>
    )
}
interface PropsStyled {
    $maxWidth?: string
}
const StyledBack = styled.div`
    padding: 10px 30px;
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 10px 40px;
    }
`
const StyledLink = styled.a<PropsStyled>`
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${(p) => p.theme.palette.info2.main};
    max-width: ${(p) => p.$maxWidth};
    margin: auto;
`
