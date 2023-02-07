/* eslint-disable camelcase */
import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { LobbyCard } from './index'
import { Lobby } from '@interfaces/index'

interface Props {
    lobbies: Lobby[]
    pathname: string
    section: string
}

export const LobbyCards = ({ lobbies, pathname, section }: Props) => {
    return (
        <Styled>
            {lobbies?.map((lobby, i) => {
                return <LobbyCard key={i} lobby={lobby} pathname={pathname} section={section}></LobbyCard>
            })}
        </Styled>
    )
}

const Styled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-template-rows: masonry;
    grid-auto-flow: dense;
    align-tracks: end;
    gap: 7px;
    ${MEDIA_QUERIES.min_width.mobileL} {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
    ${MEDIA_QUERIES.min_width.tabletL} {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
    > .wrapper {
        display: grid;
        grid-template-rows: masonry;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }
`
