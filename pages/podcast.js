import styled from '@emotion/styled'
import WeAreWorking from 'components/shared/WeAreWorking/WeAreWorking'
import Head from 'next/head'
import React from 'react'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const Podcast = () => {
    return (
        <>
            <Head>
                <title>Podcast | Apuesta Total</title>
            </Head>

            <ContentSFrameS>
                <iframe frameBorder="0" scrolling="no" src="https://sorteos.apuestatotal.com/podcast" />
            </ContentSFrameS>
        </>
    )
}

export default Podcast
const ContentSFrameS = styled.div`
    & {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        width: calc(100% + 28px);
        position: relative;
        right: 14px;
        min-height: 1200px;
        ${MEDIA_QUERIES.min_width.desktopS} {
            width: calc(100% + 100px);
            right: 50px;
        }
        > iframe {
            flex: 1;
            height: 100%;
            width: 100%;
        }
    }
`
