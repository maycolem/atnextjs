import MuiPronto from 'components/shared/mui-pronto/MuiPronto'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const ToritoDeOro = () => {
    return (
        <>
            <Head>
                <title>Torito | Apuesta Total</title>
            </Head>
            <Styled>
                <MuiPronto subtitle="TORITO DE ORO"></MuiPronto>
            </Styled>
        </>
    )
}

export default ToritoDeOro

const Styled = styled.div`
    position: relative;
    width: calc(100% + 28px);
    right: 14px;
    display: flex;

    ${MEDIA_QUERIES.min_width.desktopS} {
        width: calc(100% + 100px);
        right: 50px;
    }
`
