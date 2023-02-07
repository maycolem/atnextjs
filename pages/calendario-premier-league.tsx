import NavbarNoticia from '@components/Menu/NavbarNoticia'
import { Meta } from '@components/Meta'
import { PATHS } from '@routes/paths/PATHS'
import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const CalendarioPremierLeague = () => {
    return (
        <>
            <Meta
                title="Calendario Premier League 2023"
                description="Encuentra el calendario de partidos de la Premier League 2023 en Apuesta Total"
                canonical={PATHS.CALENDARIO_PREMIER_LEAGUE.url}
            />
            <StyledS>
                <NavbarNoticia />
                <ContentIframe src="https://unanimodeportes.com/datafactory/html/v3/index.html?channel=deportes.futbol.premierleague.fixture&lang=es_LA"></ContentIframe>
            </StyledS>
        </>
    )
}

export default CalendarioPremierLeague

const StyledS = styled.div`
    position: relative;
    width: calc(100% + 28px);
    right: 14px;
    ${MEDIA_QUERIES.min_width.desktopS} {
        width: calc(100% + 100px);
        right: 50px;
    }
`

const ContentIframe = styled.iframe`
    width: 100%;
    height: 100vh;
    border: none;
    ${MEDIA_QUERIES.min_width.tabletL} {
        width: 100%;
    }
`
