import styled from '@emotion/styled'
import Head from 'next/head'
import React from 'react'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const Sorteos = () => {
  return (
    <>
      <Head>
        <title>Sorteo Camisas  | Apuesta Total</title>
      </Head>

      <ContentSFrameS>
        <iframe src="https://camisetas.apuestatotal.com/" />
      </ContentSFrameS>
    </>
  )
}

export default Sorteos

const ContentSFrameS = styled.div`
  & {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: calc(100% + 28px);
    position: relative;
    right: 14px;
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
