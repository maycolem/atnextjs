/* eslint-disable no-var */
import Head from 'next/head'
import { CalimacoClient, session } from '@calimaco/base'
import React, { useEffect, useState } from 'react'
import cfg from 'config/config'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import loadingIMG from 'public/assets/casino/loading-game.gif'
import styled from 'styled-components'
import { Session } from 'services/Session'
import MuiPronto from 'components/shared/mui-pronto/MuiPronto'

const Bingo = () => {
    const [url, setUrl] = useState('')
    const user = Session().getUser()
    const [heightHeader, setHeightHeader] = useState(0)

    useEffect(() => {
        const time = setTimeout(() => {
            const header = document.getElementById('layout-default-at-apuesta')
            setHeightHeader(header?.offsetHeight)
        }, 200)
        return () => clearTimeout(time)
    }, [user])
    const cbEffect = async () => {
        const client = new CalimacoClient(cfg)
        if (user !== undefined && user?.session !== null) {
            const data = await client.getProviderInfo('end2end', user?.session)
            const launcherUrl =
                `${process.env.REACT_APP_CALIMACO_API_BASE}/providers/end2end/opener` +
                '?session=' +
                data.session +
                '&company=' +
                data.company +
                '&machine=end2end-base&external_id=end2end-base&type=BINGO'
            setUrl(launcherUrl)
        }
    }
    useEffect(() => {
        cbEffect()
    }, [])

    return (
        <StyledS>
            <MuiPronto subtitle="BINGO"></MuiPronto>
        </StyledS>
    )

    // return (
    //   <>
    //     <Head>
    //       <title>Juega al Bingo Online | Apuesta Total</title>
    //       <meta content="Juega al Bingo Online | Apuesta Total" property="og:title" />
    //       <meta content="Juega al Bingo Online | Apuesta Total" itemProp="name" />
    //       <meta content="Juega al Bingo Online | Apuesta Total" name="twitter:title" />
    //       <meta
    //         content="Encuentra los mejores juegos de Bingo online, tragamonedas, ruletas y más en Apuesta Total."
    //         name="description"
    //       />
    //       <meta
    //         content="Encuentra los mejores juegos de Bingo online, tragamonedas, ruletas y más en Apuesta Total."
    //         property="og:description"
    //       />
    //       <meta
    //         content="Encuentra los mejores juegos de Bingo online, tragamonedas, ruletas y más en Apuesta Total."
    //         itemProp="description"
    //       />
    //       <meta
    //         content="Encuentra los mejores juegos de Bingo online, tragamonedas, ruletas y más en Apuesta Total."
    //         name="twitter:description"
    //       />
    //       <meta
    //         content="apuesta total, torneos, poker, juegos, recargas, Bingo, Bet Games, TV Bet, ruleta rusa, yan ken po, tragamonedas online, torneos de Bingo, premios"
    //         name="keywords"
    //       />
    //       <meta
    //         content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
    //         property="og:image"
    //       />
    //       <meta
    //         content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
    //         name="image"
    //       />
    //       <meta
    //         content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
    //         property="og:image:secure_url"
    //       />
    //       <meta
    //         content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
    //         itemProp="image"
    //       />
    //       <meta
    //         content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
    //         name="twitter:image"
    //       />
    //       <meta content="1145" property="og:image:width" />
    //       <meta content="513" property="og:image:height" />
    //       <meta content="website" property="og:type" />
    //       <meta content="https://www.apuestatotal.com/Bingo" property="og:url" />
    //       <meta content="summary" name="twitter:card" />
    //       <meta content="text/html; charset=utf-8" httpEquiv="content-type" />
    //       <meta content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=0" name="viewport" />
    //       <meta content="true" name="HandheldFriendly" />
    //       <meta content="telephone=no" name="format-detection" />
    //       <meta content="YES" name="apple-mobile-web-app-capable" />
    //       <link href="https://www.apuestatotal.com/Bingo" rel="canonical" />
    //       <link href="/favicon.ico" rel="icon" />
    //     </Head>

    //     <>
    //       <IframeS $heightHeader={heightHeader} $heightWindow={window?.innerHeight}>
    //         <iframe className="frame" src={url}></iframe>
    //       </IframeS>
    //     </>
    //   </>
    // )
}

export default Bingo

const StyledS = styled.div`
    position: relative;
    width: calc(100% + 28px);
    right: 14px;
    ${MEDIA_QUERIES.min_width.desktopS} {
        width: calc(100% + 100px);
        right: 50px;
    }
`

const IframeS = styled.div`
    position: relative;
    right: 14px;
    width: calc(100% + 28px);
    position: relative;
    height: ${(p) => `calc(${p.$heightWindow ? `${p.$heightWindow}px` : `100vh`} - ${p.$heightHeader}px)`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: url(${loadingIMG.src}) center center no-repeat;
    background-size: 100px;
    ${MEDIA_QUERIES.min_width.desktopXS} {
        height: ${(p) => `calc(100vh - ${p.$heightHeader}px)`};
        right: 50px;
        width: calc(100% + 100px);
    }
    .window-options {
        background: black;
        color: white;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0rem 0.3rem;
        .option {
            cursor: pointer;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0;
            min-width: initial;
            color: ${(p) => p.theme.palette.light.main};
        }

        svg {
            font-size: 1.2rem;
        }
    }
    .frame {
        width: 100%;
        border: 0;
        flex: 1;
    }
`
