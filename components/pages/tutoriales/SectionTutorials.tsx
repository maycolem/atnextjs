import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import Tutoriales from '../../pages/tutoriales/Tutoriales'

const SectionTutorials = () => {
    return (
        <Styled>
            <StyledTitle>Tutoriales</StyledTitle>
            <StyledParagraph>
                ¡Bienvenido a nuestra sección de tutoriales! Aquí hallarás una variedad de videos que te enseñarán a navegar como un campeón en
                nuestra web. Aprende a revisar tus apuestas, cómo hacer cashout, cómo recargar, etc. Asimismo, hay videos para entender nuevas
                herramientas como el creador de apuestas, mercados difíciles como los hándicaps y opciones orientadas a cada deporte fuera del fútbol.
                ¡Adelante!.
            </StyledParagraph>
            <StyledDivider>
                <div></div>
            </StyledDivider>
            <Tutoriales />
        </Styled>
    )
}

export default SectionTutorials
const StyledDivider = styled.div`
    margin-bottom: 1.5rem;
    > div {
        background: ${(p) => p.theme.palette.primary.main};
        height: 3px;
    }
`
const Styled = styled.div`
    padding: 0 14px;
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 0px;
    }
`
const StyledTitle = styled.h1`
    text-transform: capitalize;
    margin-bottom: 1rem;
    color: ${(p) => p.theme.palette.dark3.main};
    font-size: 1.7rem;
`
const StyledParagraph = styled.p`
    font-weight: 400;
    color: ${(p) => p.theme.palette.alternate13.main};
    margin-bottom: 1.5rem;
`
