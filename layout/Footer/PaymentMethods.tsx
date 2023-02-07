import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import astroIMGTemp from 'public/assets/mi-billetera/recarga/temp/astropay.jpeg'
import niubizIMGTemp from 'public/assets/mi-billetera/recarga/temp/niubiz.png'
import kushkiIMGTemp from 'public/assets/mi-billetera/recarga/temp/kushki.png'
import pagoeIMGTemp from 'public/assets/mi-billetera/recarga/temp/PAGOEFECTIVO_MOVIL_AGENTES_BODEGAS.svg'
import qrIMGTemp from 'public/assets/mi-billetera/recarga/temp/QRVIAPE.svg'
import safetIMGTemp from 'public/assets/mi-billetera/recarga/temp/safety.png'
import teleIMGTemp from 'public/assets/mi-billetera/recarga/temp/teleservicios.png'
import prometeoTemp from 'public/assets/mi-billetera/recarga/temp/100x69px_Logo-recarga-Prometeo-f.png'
import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import { dtHomeClick } from '../dt'
import useMediaQueryAT from '@hooks/useMediaQueryAT'

export const PaymentMethods = () => {
    const mobileL = useMediaQueryAT(MEDIA_QUERIES.min_width.mobileL)
    const repeat: any[] = Array.from({ length: mobileL ? 3 : 2 })
    return (
        <Styled $width={120}>
            <div className="track">
                {repeat.map((_, i) => (
                    <React.Fragment key={i}>
                        <Link
                            href={{
                                pathname: PATHS.CUENTA_RECARGA_METODO_DE_PAGO.url,
                                query: {
                                    methodName: 'ASTROPAY',
                                },
                            }}
                            legacyBehavior
                        >
                            <div onClick={() => dtHomeClick('recargar con astropay')} title="Recargar con Astropay">
                                <img alt="ASTROPAY" className="astroIMGTemp" src={astroIMGTemp.src} />
                            </div>
                        </Link>
                        <Link
                            href={{
                                pathname: PATHS.CUENTA_RECARGA_METODO_DE_PAGO.url,
                                query: {
                                    methodName: 'NIUBIZ',
                                },
                            }}
                            legacyBehavior
                        >
                            <div onClick={() => dtHomeClick('recargar con niubiz')} title="Recargar con Niubiz">
                                <img alt="NIUBIZ" className="niubizIMGTemp" src={niubizIMGTemp.src} />
                            </div>
                        </Link>
                        <Link
                            href={{
                                pathname: PATHS.CUENTA_RECARGA_METODO_DE_PAGO.url,
                                query: {
                                    methodName: 'KUSHKI',
                                },
                            }}
                            legacyBehavior
                        >
                            <div onClick={() => dtHomeClick('recargar con kushki')} title="Recargar con Kushki">
                                <img alt="KUSHKI" className="kushkiIMGTemp" src={kushkiIMGTemp.src} />
                            </div>
                        </Link>
                        <Link
                            href={{
                                pathname: PATHS.CUENTA_RECARGA_METODO_DE_PAGO.url,
                                query: {
                                    methodName: 'PROMETEO',
                                },
                            }}
                            legacyBehavior
                        >
                            <div onClick={() => dtHomeClick('recargar con prometeo')} title="Recargar con Prometeo">
                                <img alt="PROMETEO" className="PrometeoTemp" src={prometeoTemp.src} />
                            </div>
                        </Link>
                        <Link
                            href={{
                                pathname: PATHS.CUENTA_RECARGA_METODO_DE_PAGO.url,
                                query: {
                                    methodName: 'PAGOEFECTIVO',
                                },
                            }}
                            legacyBehavior
                        >
                            <div onClick={() => dtHomeClick('recargar con pago efectivo')} title="Recargar con Pago efectivo">
                                <img alt="PAGOEFECTIVO" className="pagoeIMGTemp" src={pagoeIMGTemp.src} />
                            </div>
                        </Link>
                        <Link
                            href={{
                                pathname: PATHS.CUENTA_RECARGA_METODO_DE_PAGO.url,
                                query: {
                                    methodName: 'PAGOEFECTIVOQR',
                                },
                            }}
                            legacyBehavior
                        >
                            <div onClick={() => dtHomeClick('recargar con codigo qr')} title="Recargar con Codigo QR">
                                <img alt="PAGOEFECTIVOQR" className="qrIMGTemp" src={qrIMGTemp.src} />
                            </div>
                        </Link>
                        <Link
                            href={{
                                pathname: PATHS.CUENTA_RECARGA_METODO_DE_PAGO.url,
                                query: {
                                    methodName: 'SAFETYPAY',
                                },
                            }}
                            legacyBehavior
                        >
                            <div onClick={() => dtHomeClick('recargar con safetypay')} title="Recargar con Safetypay">
                                <img alt="SAFETYPAY" className="safetIMGTemp" src={safetIMGTemp.src} />
                            </div>
                        </Link>
                        <Link
                            href={{
                                pathname: PATHS.CUENTA_RECARGA_METODO_DE_PAGO.url,
                                query: {
                                    methodName: 'ATPAYMENTSERVICE',
                                },
                            }}
                            legacyBehavior
                        >
                            <div onClick={() => dtHomeClick('recargar con teleservicios')} title="Recargar con Teleservicios">
                                <img alt="ATPAYMENTSERVICE" className="teleIMGTemp" src={teleIMGTemp.src} />
                            </div>
                        </Link>
                    </React.Fragment>
                ))}
            </div>
        </Styled>
    )
}

interface StyledProps {
    $width?: number
}
const Styled = styled.div<StyledProps>`
    & {
        position: relative;
        display: flex;
        gap: 50px;
        position: relative;
        overflow: hidden;

        padding: calc(5px + 1.2vw + ${(p) => p.$width / 100}vw + ${(p) => (p.$width / 100) * 10}px) 0px;
        margin-top: calc((1.2vw + ${(p) => p.$width / 100}vw + ${(p) => (p.$width / 100) * 10}px) * -1);
        margin-bottom: calc((1.2vw + ${(p) => p.$width / 100}vw + ${(p) => (p.$width / 100) * 10}px) * -1);

        > .track {
            display: flex;
            gap: 50px;
            align-items: center;
            animation-name: scroll;
            animation-duration: 20s;
            animation-iteration-count: infinite;
            position: relative;
            animation-timing-function: linear;
            cursor: pointer;
            &:hover {
                animation-play-state: paused;
            }
            > div {
                > img {
                    display: block;
                    min-width: 120px;
                    max-width: 120px;
                    transition: 200ms;
                    width: 100%;
                    filter: grayscale(100%) opacity(80%);
                    &:hover {
                        transform: scale(1.5);
                        filter: grayscale(0) opacity(1);
                    }
                }
            }
        }

        @keyframes scroll {
            from {
                right: 0;
            }

            to {
                right: calc(8 * 120px + 8 * 50px);
            }
        }
    }
`
