import styled from '@emotion/styled'
import React from 'react'

const Lobby = ({ children }) => {
    return <LobbyS>{children}</LobbyS>
}

export default Lobby
const LobbyS = styled.div`
    & {
        position: relative;
        display: flex;
        flex-direction: column;
    }
`
