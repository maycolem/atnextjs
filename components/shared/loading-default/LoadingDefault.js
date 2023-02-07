import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'
const LoadingDefault = ({ loading = false, size = 30, minHeight = '100px', color = 'primary' }) => {
    if (!loading) {
        return null
    }
    return (
        <Styled $minHeight={minHeight}>
            <CircularProgress color={color} size={size} />
        </Styled>
    )
}

export default LoadingDefault
const Styled = styled.div`
    & {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: ${(p) => p.$minHeight};
        width: 100%;
    }
`
