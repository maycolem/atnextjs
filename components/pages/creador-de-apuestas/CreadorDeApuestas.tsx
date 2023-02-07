import React, { useState } from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { SectionBanner, SectionVideo, Timeline } from './index'
export const CreadorDeApuestas = () => {
    // https://www.c-sharpcorner.com/blogs/get-data-from-xml-content-using-javascript
    const [showContentVideo, setShowContentVideo] = useState(false)

    return (
        <Styled>
            <div className="wrapper-full-page">
                <SectionBanner />
                <StyledSubTitle>
                    <p>
                        Sobrin@, el <b className="nowrap">creador de apuesta</b> te permite combinar diversos mercados de un mismo evento,
                        lo que aumentará el multiplicador de tu jugada.{' '}
                    </p>
                    {/* <p>
                        <i>
                            Sugerencia: combinar los pasos 1 y 2. Se supone que el cliente ya sabe jugar y mejor no desperdiciar segundos de
                            su atención enseñándole a entrar al partido/evento.
                        </i>
                    </p> */}
                </StyledSubTitle>
                <StyledTitleTimeline>5 pasos para ser pro</StyledTitleTimeline>
                <Timeline
                    onShowLastItem={(isShow) => {
                        setShowContentVideo(isShow)
                    }}
                />

                {showContentVideo && <SectionVideo />}
            </div>
        </Styled>
    )
}

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

const Styled = styled.main`
    background: ${lightMainColor};
    position: relative;
    width: calc(100% + 28px);
    right: 14px;
    padding: 1rem;
    ${MEDIA_QUERIES.min_width.desktopS} {
        width: calc(100% + 100px);
        right: 50px;
    }
    > .wrapper-full-page {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 1000px;
        margin: auto;
    }
`

const StyledTitleTimeline = styled.div`
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
    color: ${primaryMainColor};
    margin-bottom: 10px;
    margin-top: 10px;
`

function primaryMainColor(p) {
    return p.theme.palette.primary.main
}
function lightMainColor(p) {
    return p.theme.palette.light.main
}
