import styled from '@emotion/styled'
import WeAreWorking from 'components/shared/WeAreWorking/WeAreWorking'
import Head from 'next/head'
import React from 'react'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const PuntosVirtuales = () => {
    return (
        <>
            <Head>
                <title>Puntos Virtuales | Apuesta Total</title>
            </Head>

            <ContentSFrameS>
                <iframe src="https://sorteos.apuestatotal.com/puntos-virtuales/" />
            </ContentSFrameS>
        </>
    )
}

export default PuntosVirtuales

const ContentSFrameS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        width: calc(100% + 28px);
        position: relative;
        right: 14px;
        min-height: 2000px;
        ${MEDIA_QUERIES.min_width.desktopS} {
            width: calc(100% + 100px);
            right: 50px;
        }
        > iframe {
            border: 0;
            min-height: inherit;
        }
    }
`
