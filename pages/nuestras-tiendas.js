import styled from '@emotion/styled'
import WeAreWorking from 'components/shared/WeAreWorking/WeAreWorking'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Session } from 'services/Session'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import Floodlight from '../components/shared/floodlight/Floodlight'

const Tiendas = () => {
    const user = Session().getUser()
    const [heightHeader, setHeightHeader] = useState(0)

    const a = Math.random() * 10000000000000 + ''
    const b = Math.random() * 10000000000000 + ''

    useEffect(() => {
        const time = setTimeout(() => {
            const header = document.getElementById('layout-default-at-apuesta')
            setHeightHeader(header?.offsetHeight)
        }, 200)
        return () => clearTimeout(time)
    }, [user])

    useEffect(() => {
        let iframe = document.createElement('iframe')
        iframe.src = `https://11210665.fls.doubleclick.net/activityi;src=11210665;type=ma_aptot;cat=tie_lnp2;gdpr=;gdpr_consent=;ord=${a}?`
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        setTimeout(() => {
            let iframe = document.createElement('iframe')
            iframe.src = `https://11210665.fls.doubleclick.net/activityi;src=11210665;type=ma_aptot;cat=tie_tim2;gdpr=;gdpr_consent=;ord=${b}?`

            iframe.style.display = 'none'
            document.body.appendChild(iframe)
        }, 20000)
        return () => clearTimeout(iframe)
    }, [])

    return (
        <>
            <Head>
                <title>Encuentra Nuestras Tiendas | Apuesta Total</title>
                <meta content="Encuentra Nuestras Tiendas | Apuesta Total" property="og:title" />
                <meta content="Encuentra Nuestras Tiendas | Apuesta Total" itemProp="name" />
                <meta content="Encuentra Nuestras Tiendas | Apuesta Total" name="twitter:title" />
                <meta
                    content="Visítenos en cualquiera de nuestras tiendas a nivel nacional. Encuentra tu tienda más cercana en el mapa."
                    name="description"
                />
                <meta
                    content="Visítenos en cualquiera de nuestras tiendas a nivel nacional. Encuentra tu tienda más cercana en el mapa."
                    property="og:description"
                />
                <meta
                    content="Visítenos en cualquiera de nuestras tiendas a nivel nacional. Encuentra tu tienda más cercana en el mapa."
                    itemProp="description"
                />
                <meta
                    content="Visítenos en cualquiera de nuestras tiendas a nivel nacional. Encuentra tu tienda más cercana en el mapa."
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
                <meta content="https://www.apuestatotal.com/nuestras-tiendas" property="og:url" />
                <meta content="summary" name="twitter:card" />
                <meta content="text/html; charset=utf-8" httpEquiv="content-type" />
                <meta content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=0" name="viewport" />
                <meta content="true" name="HandheldFriendly" />
                <meta content="telephone=no" name="format-detection" />
                <meta content="YES" name="apple-mobile-web-app-capable" />
                <link href="https://www.apuestatotal.com/nuestras-tiendas" rel="canonical" />
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <ContentSFrameS $heightHeader={heightHeader} $heightWindow={window?.innerHeight}>
                <iframe frameBorder="0" scrolling="no" src="https://gestion.apuestatotal.com/services/shopsv2/" />
            </ContentSFrameS>
        </>
    )
}

export default Tiendas
const ContentSFrameS = styled.div`
    & {
        /* min-height: 100vh; */
        display: flex;
        flex-direction: column;
        width: calc(100% + 28px);
        position: relative;
        right: 14px;
        height: ${(p) => `calc(${p.$heightWindow ? `${p.$heightWindow}px` : `100vh`} - ${p.$heightHeader}px - 50px)`};
        min-height: 750px;
        ${MEDIA_QUERIES.min_width.desktopS} {
            width: calc(100% + 100px);
            height: ${(p) => `calc(100vh - ${p.$heightHeader}px)`};
            right: 50px;
        }
        > iframe {
            flex: 1;
            height: 100%;
            width: 100%;
        }
    }
`
