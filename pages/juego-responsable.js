import React from 'react'
import Head from 'next/head'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
const ResGaming = () => {
    const { data } = useGetFragmentQuery({
        fragment: 'SEC_JUEGO_RESPONSABLE',
    })
    return (
        <>
            <Head>
                <title>Juego Responsable | Apuesta Total</title>
                <meta content="Juego Responsable | Apuesta Total" property="og:title" />
                <meta content="Juego Responsable | Apuesta Total" itemProp="name" />
                <meta content="Juego Responsable | Apuesta Total" name="twitter:title" />
                <meta
                    content="Encuentra recomendaciones importantes para que disfrutes de los juegos y más en Apuesta Total"
                    name="description"
                />
                <meta
                    content="Encuentra recomendaciones importantes para que disfrutes de los juegos y más en Apuesta Total"
                    property="og:description"
                />
                <meta
                    content="Encuentra recomendaciones importantes para que disfrutes de los juegos y más en Apuesta Total"
                    itemProp="description"
                />
                <meta
                    content="Encuentra recomendaciones importantes para que disfrutes de los juegos y más en Apuesta Total"
                    name="twitter:description"
                />
                <meta
                    content="apuesta total, torneos, poker, juegos, recargas, casino, Bet Games, TV Bet, ruleta rusa, yan ken po, tragamonedas online, torneos de casino, premios"
                    name="keywords"
                />
                <meta
                    content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
                    property="og:image"
                />
                <meta
                    content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
                    name="image"
                />
                <meta
                    content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
                    property="og:image:secure_url"
                />
                <meta
                    content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
                    itemProp="image"
                />
                <meta
                    content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
                    name="twitter:image"
                />
                <meta content="1145" property="og:image:width" />
                <meta content="513" property="og:image:height" />
                <meta content="website" property="og:type" />
                <meta content="https://www.apuestatotal.com/juego-responsable" property="og:url" />
                <meta content="summary" name="twitter:card" />
                <meta content="text/html; charset=utf-8" httpEquiv="content-type" />
                <meta content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=0" name="viewport" />
                <meta content="true" name="HandheldFriendly" />
                <meta content="telephone=no" name="format-detection" />
                <meta content="YES" name="apple-mobile-web-app-capable" />
                <link href="https://www.apuestatotal.com/juego-responsable" rel="canonical" />
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <StyledS>
                <FragmentCustomAT fragment={data ?? ''}></FragmentCustomAT>
            </StyledS>
        </>
    )
}

export default ResGaming
const StyledS = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    position: relative;
    justify-content: center;
    background: ${(p) => p.theme.background};
    width: calc(100% + 28px);
    right: 14px;
    padding: 1rem;
    ${MEDIA_QUERIES.min_width.desktopS} {
        width: calc(100% + 100px);
        right: 50px;
    }
`
