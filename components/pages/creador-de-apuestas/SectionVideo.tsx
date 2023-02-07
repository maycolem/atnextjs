import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Vimeo from '@u-wave/react-vimeo'

export const SectionVideo = () => {
    const [paused, setPaused] = useState(true)
    const d = document

    useEffect(() => {
        const callback = (entries, observer) => {
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
        const observer = new IntersectionObserver(callback, { threshold: 1 })
        const $StyledFrame = d.querySelector('.player-vimeo-component-4324324343')
        if ($StyledFrame) {
            observer.observe($StyledFrame)
        }

        return () => {
            observer.disconnect()
        }
    }, [paused, setPaused])

    const handleOnPlay = () => setPaused(false)
    const handlePause = () => setPaused(true)

    return (
        <Styled>
            {/* <StyledTitleSection>Recuerda</StyledTitleSection> */}
            {/* <StyledSubTitle>
                <p>
                    Si utilizas el Creador de apuestas <b>no podrás añadir más partidos al ticket</b>. Es una herramienta ideal cuando
                    tienes muy bien estudiado un evento determinado.
                </p>
            </StyledSubTitle> */}
            <StyledTitleSection>¿NECESITAS UN EJEMPLO?</StyledTitleSection>
            <StyledSubTitle>
                <p>
                    Dale play al video y asegúrate de entender al 100% nuestro <b>Creador de apuestas</b>. ¡Buena suerte, sobrin@!.
                </p>
            </StyledSubTitle>
            <StyledVimeo
                // allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                autopause
                autoplay={false}
                className="player-vimeo-component-4324324343"
                frameBorder="0"
                onPause={handlePause}
                onPlay={handleOnPlay}
                paused={paused}
                video="https://player.vimeo.com/video/762430292?h=8b4eb3b4d9%22"
            ></StyledVimeo>
        </Styled>
    )
}
interface PropsStyled {
    allowFullScreen?: any
    frameBorder?: any
}

const StyledVimeo = styled(Vimeo)<PropsStyled>`
    margin: auto;
    width: 100%;
    aspect-ratio: 4/5;
    max-width: 600px;
    iframe {
        height: 100%;
        width: 100%;
    }
`
const StyledSubTitle = styled.div`
    text-align: center;
    font-weight: 400;
    /* width: 90%; */
    max-width: 900px;
    margin: auto;
    width: 80%;
    /* text-align: justify; */
    > p {
        margin-bottom: 10px;
        word-spacing: 3px;
        line-height: 1.4;
    }
`
const Styled = styled.section`
    max-width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    ${StyledSubTitle} {
        margin-bottom: 2rem;
    }
`
const StyledTitleSection = styled.div`
    color: ${primaryMainColor};
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
`
function primaryMainColor(p) {
    return p.theme.palette.primary.main
}
