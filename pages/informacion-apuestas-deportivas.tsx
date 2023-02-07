import NavbarNoticia from '@components/Menu/NavbarNoticia'
import { Meta } from '@components/Meta'
import ContentApuestaDeportiva from '@components/Noticias/ContentApuestaDeportiva'
import { Container } from '@mui/material'
import hexAlpha from 'hex-alpha'
import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const ContenidoApuestaDeportiva = () => {
    return (
        <>
            <Meta
                title="Información Apuestas Deportivas"
                description="Encuentra toda la información de apuestas deportivas y más en Apuesta Total"
                canonical="/informacion-apuestas-deportivas"
            />
            <StyledS>
                <NavbarNoticia />

                <ContentStyle>
                    <Container fixed maxWidth="lg">
                        <ContentApuestaDeportiva />
                    </Container>
                </ContentStyle>
            </StyledS>
        </>
    )
}

export default ContenidoApuestaDeportiva

const StyledS = styled.div`
    background-color: ${(p) => p.theme.background};
    position: relative;
    width: calc(100% + 28px);
    right: 14px;
    ${MEDIA_QUERIES.min_width.desktopS} {
        width: calc(100% + 100px);
        right: 50px;
    }
    ${MEDIA_QUERIES.min_width.tabletL} {
        width: calc(100% + 100px);
        right: 50px;
    }
`

const ContentStyle = styled.div`
    background-color: ${(p) => p.theme.background};
    & {
        width: 100%;

        strong {
            font-weight: bold;
            color: ${(p) => hexAlpha(p.theme.contrastText, 0.9)};
        }
        h1 {
            display: block;
            font-size: 2em;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
            margin-left: 1.5em;
            margin-right: 0;
            font-weight: bold;
            font-family: Rubik, Helvetica, Arial, sans-serif;
        }
        h2 {
            display: block;
            font-size: 1.5em;
            margin-top: 0.83em;
            margin-bottom: 0.83em;
            margin-left: 0;
            margin-right: 0;
            font-family: Rubik, Helvetica, Arial, sans-serif;
        }
        h3 {
            display: block;
            font-size: 1.17em;
            margin-top: 1em;
            margin-bottom: 1em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            font-family: Rubik, Helvetica, Arial, sans-serif;
        }
        h4 {
            display: block;
            margin-top: 1.33em;
            margin-bottom: 1.33em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            font-family: Rubik, Helvetica, Arial, sans-serif;
        }
        h5 {
            display: block;
            font-size: 1.2rem;
            font-weight: 600;
            margin-top: 1.67em;
            margin-bottom: 0.5em;
            margin-left: 0;
            margin-right: 0;
            text-align: justify;
            font-family: Rubik;
        }
        h6 {
            display: block;
            font-size: 0.67em;
            margin-top: 2.33em;
            margin-bottom: 2.33em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            font-family: Rubik, Helvetica, Arial, sans-serif;
        }
        p {
            display: block;
            color: ${(p) => hexAlpha(p.theme.contrastText, 0.7)};
            font-style: normal;
            font-weight: 400;
            font-size: 1rem;
            text-align: justify;
            font-family: Rubik;
            padding-top: 20px;
            line-height: 28px;
        }
        ul {
            display: block;
            list-style: initial;
            list-style-type: disc;
            margin-top: 1em;
            margin-bottom: 1em;
            margin-left: 0;
            margin-right: 0;
            padding-left: 40px;
        }
        li {
            display: list-item;
            text-align: initial;
        }
        a {
            text-decoration: none !important;
            color: ${(p) => hexAlpha(p.theme.link, 1)};
            &:link {
                color: (internal value);
                text-decoration: underline;
                cursor: pointer;
            }
            &:visited {
                color: (internal value);
                text-decoration: underline;
                cursor: pointer;
            }
            &:link:active {
                color: (internal value);
            }
            &:visited:active {
                color: (internal value);
            }
        }
    }
`
