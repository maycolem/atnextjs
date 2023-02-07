import styled from 'styled-components'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FONTS_SIZE } from 'styles/FONTS_SIZE'
import casinoDolarIMG from 'public/assets/404/casinodolar.png'
import dolarIMG from 'public/assets/404/dolar.png'
import futamericanIMG from 'public/assets/404/futamerican.png'
import futboldollarIMG from 'public/assets/404/futboldollar.png'
import pinponIMG from 'public/assets/404/pinpon.png'
import pinpondollarIMG from 'public/assets/404/pinpondollar.png'
import tenisIMG from 'public/assets/404/tenis.png'
import { delay } from 'helpers/delay'
const Custom404 = () => {
    const [hiddenPage, showHiddenPage] = useState(false)

    useEffect(() => {
        delay(1500).then(() => showHiddenPage(true))
    }, [])

    if (hiddenPage) {
        return (
            <Styled>
                <StyledIcon className="top">
                    <div>
                        <img alt="Banner Apuesta Total" src={futboldollarIMG.src} />
                    </div>
                    <div>
                        <img alt="Banner Apuesta Total" src={dolarIMG.src} />
                    </div>
                    <div>
                        <img alt="Banner Apuesta Total" src={tenisIMG.src} />
                    </div>
                    <div>
                        <img alt="Banner Apuesta Total" src={futamericanIMG.src} />
                    </div>
                </StyledIcon>
                <div className="wrapper">
                    <StyledTitle>404</StyledTitle>
                    <p className="subtitle">¡Uy sobrin@! La página que buscabas no está disponible.</p>
                    <p className="normal">
                        Por favor revisa que esté bien escrita la dirección y sigue jugando con nosotros porque para ganar, hay que creer.
                    </p>
                    <Link href={'/'}>Regresar a la página principal</Link>
                </div>
                <StyledIcon className="bottom">
                    <div>
                        <img alt="Banner Apuesta Total" src={pinponIMG.src} />
                    </div>
                    <div>
                        <img alt="Banner Apuesta Total" src={casinoDolarIMG.src} />
                    </div>
                    <div>
                        <img alt="Banner Apuesta Total" src={pinpondollarIMG.src} />
                    </div>
                </StyledIcon>
            </Styled>
        )
    }

    return <div className=""></div>
}

export default Custom404
const StyledIcon = styled.div`
    & {
        display: flex;
        width: 100%;
        justify-content: space-between;
        max-width: 700px;
        margin-bottom: -2rem;
        gap: 1rem;
        img {
            max-width: fit-content;
            height: auto;
        }
        &.bottom {
            margin-bottom: -0rem;
            margin-top: 1rem;
        }
    }
`
const Styled = styled.div`
    display: grid;
    place-items: center;
    padding-top: 3rem;
    padding-bottom: 3rem;

    & {
        .wrapper {
            max-width: 600px;
            margin: auto;
            gap: 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                max-width: 100px;
            }
        }
        * {
            color: ${(p) => p.theme.palette.primary.main};
            text-align: center;
        }
        .subtitle {
            font-size: ${FONTS_SIZE.xxl};
        }
        .normal {
            color: ${(p) => p.theme.palette.alternate9.main};
            max-width: 500px;
        }
        a {
            margin-top: 0.5rem;
            text-decoration: underline;
            text-underline-offset: 5px;
            font-size: ${FONTS_SIZE.sm};
        }
    }
`
const StyledTitle = styled.h1`
    font-size: clamp(${FONTS_SIZE.heading8}, 11vw, ${FONTS_SIZE.heading10});
    font-weight: 400;
    margin-bottom: -1rem;
`
