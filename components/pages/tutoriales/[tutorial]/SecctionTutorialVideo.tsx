import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { NextRouter, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import tutorialsArray from '../dataTutoriales'
import Vimeo from '@u-wave/react-vimeo'
import styled from 'styled-components'
import { delay } from '@helpers/delay'
import { Breadcrumbs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { PATHS } from '@routes/paths/PATHS'
import Link from 'next/link'

const SecctionTutorialVideo = () => {
    const [paused, setPaused] = useState(true)
    const doc = document
    const handleOnPlay = () => setPaused(false)
    const handlePause = () => setPaused(true)

    const router: NextRouter = useRouter()
    const query = router?.query
    const pathnameKey = query?.tutorial || ''
    const tutorialFilter = tutorialsArray?.filter((item) => item.key === pathnameKey)
    const tutorial = tutorialFilter[0]
    const dataHref = window?.location?.href || null

    if (!tutorial) return <div className="">no se encontro video</div>

    useEffect(() => {
        if (typeof window !== 'undefined' && 'FB' in window) {
            delay(500).then(() => {
                const fb = (window as any).FB
                fb.XFBML.parse(document.getElementById('fb-comments'))
            })
        }
    }, [router])

    useEffect(() => {
        const callback = (entries) => {
            entries.forEach(async (entry) => {
                if (entry.target.matches('.player-vimeo-component-4324324343')) {
                    if (entry.isIntersecting) {
                        // setPaused(false)
                    } else {
                        setPaused(true)
                    }
                }
            })
        }
        const observer = new IntersectionObserver(callback, { threshold: [0.4, 0.7], rootMargin: '0px', root: null })
        const $StyledFrame = doc.querySelector('.player-vimeo-component-4324324343')
        if ($StyledFrame) {
            observer.observe($StyledFrame)
        }

        return () => {
            observer.disconnect()
        }
    }, [paused, setPaused])

    const breadcrumbs = [
        <Link key="1" href={PATHS.TURORIALES.url}>
            Tutoriales
        </Link>,
        <Typography key="2" color="red">
            {tutorial?.title}
        </Typography>,
    ]

    return (
        <>
            <Styled>
                <StyledTitle>
                    {' '}
                    <StyleBread separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        {breadcrumbs}
                    </StyleBread>
                </StyledTitle>
                <StyledDivider>
                    <div></div>
                </StyledDivider>
                <StyledGrid>
                    <StyledTitle>{tutorial?.title}</StyledTitle>
                    <StyledParagraph>
                        {tutorial?.completeDescription}.
                        {pathnameKey === 'como-recargar-tu-cuenta-web-por-teleservicios' ||
                        pathnameKey === 'como-jugar-carrera-de-galgos-por-teleservicios' ||
                        pathnameKey === 'como-jugar-a-la-ruleta-virtual-en-teleservicios' ||
                        pathnameKey === 'como-cobrar-tus-tickets-de-tienda-por-teleservicios' ? (
                            <StyledAs href="https://teleservicios.at/juega/" target="_blank">
                                <br></br>
                                Escríbenos aquí
                            </StyledAs>
                        ) : (
                            ''
                        )}
                    </StyledParagraph>
                    <StyledVimeo
                        // allow="autoplay; fullscreen; picture-in-picture"
                        autopause
                        showByline
                        autoplay
                        className="player-vimeo-component-4324324343"
                        onPause={handlePause}
                        onPlay={handleOnPlay}
                        paused={paused}
                        video={tutorial?.src}
                    ></StyledVimeo>
                </StyledGrid>
                <StyledCommentFB id="fb-comments">
                    <div className="fb-comments" data-href={dataHref} data-numposts="5" data-width="100%" style={{ width: '100%' }}></div>
                </StyledCommentFB>
            </Styled>
        </>
    )
}

export default SecctionTutorialVideo

const StyledVimeo = styled(Vimeo)`
    aspect-ratio: 3/5;
    width: 100%;
    max-width: 320px;
    margin: auto;
    display: flex;
    ${MEDIA_QUERIES.min_width.tabletL} {
        max-width: initial;
        grid-row: span 2;
        order: 1;
    }
    > iframe {
        height: 100%;
        width: 100%;
    }
`
const StyledCommentFB = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`
const Styled = styled.div`
    padding: 0 14px;
    width: 100%;
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 0px;
    }
`
const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    /* grid-auto-flow:dense ; */
    /* grid-auto-rows: minmax(min-content, max-content);                 */
    gap: 1.5rem;
    max-width: 700px;
    margin: auto;
    ${MEDIA_QUERIES.min_width.tabletL} {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto 1fr;
    }
`
const StyledTitle = styled.div`
    font-size: 1.2rem;
    color: ${(p) => p.theme.palette.primary.main};
    ${MEDIA_QUERIES.min_width.tabletL} {
        order: 2;
    }
`

const StyledParagraph = styled.div`
    text-align: justify;
    text-justify: inter-word;
    margin-left: 0.5rem;
    ${MEDIA_QUERIES.min_width.tabletL} {
    }
    order: 3;
`
const StyledDivider = styled.div`
    margin-bottom: 1.5rem;
    > div {
        background: ${(p) => p.theme.palette.primary.main};
        height: 3px;
    }
`

const StyleBread = styled(Breadcrumbs)`
    padding-bottom: 1rem;
    font-size: 1.5rem;
`

const StyledAs = styled.a`
    color: red;
    font-weight: 400;
    font-weight: bold;
`
