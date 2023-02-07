import React from 'react'
import styled from 'styled-components'
import BANNER_IMAGE from './assets/Cab_Creador-de-Apuestas.jpg'

export const SectionBanner = () => {
    const BANNER_IMAGE_SRC = BANNER_IMAGE.src

    return (
        <Styled>
            <img alt="banner creador de apuesta" src={BANNER_IMAGE_SRC} />
        </Styled>
    )
}

const Styled = styled.div`
    width: 100%;
    margin-bottom: 10px;
    > img {
        border-radius: 1rem;
        height: initial;
    }
`
