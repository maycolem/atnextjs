import { LoadingButton } from '@mui/lab'
import { FormControl, FormLabel } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import BonosCards from './BonosCards'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
const MisBonos = () => {
    return (
        <MisBonosS>
            <BonosCards></BonosCards>
        </MisBonosS>
    )
}

export default MisBonos

const MisBonosS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        background: ${(p) => p.theme.palette.alternate12.main};
    }
`
