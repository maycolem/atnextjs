import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import TelegramIcon from '@mui/icons-material/Telegram'
import facebook from '@layout/assets/redes-sociales/facebook.png'
import twitter from '@layout/assets/redes-sociales/twitter.png'
import instagram from '@layout/assets/redes-sociales/instagram.png'
import youtube from '@layout/assets/redes-sociales/youtube.png'
import tiktokIMG from '@layout/assets/redes-sociales/tiktok.png'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { GoogleTagManager } from 'google/TagManager'
import { Divider } from '@mui/material'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { dtHeaderMenuMobile } from '../dt'
import useHeightHeader from '@hooks/useHeightHeader'
import telegramIMG from '@layout/assets/redes-sociales/telegram.png'
import whatsappIMG from '@layout/assets/redes-sociales/whatsapp.png'
import hexAlpha from 'hex-alpha'
import { useAppDispatch, useAppSelector } from '@states/store'
import { set, ThemeWebSelector } from '@states/slice/themes/WebThemes'
import lunaIMG from '../assets/hamburguer/luna.png'
import solIMG from '../assets/hamburguer/sol.png'
interface Props {
    setOpen: (value: boolean) => void
    open: boolean
}
export const Menu = ({ open, setOpen }: Props) => {
    const user = useAppSelector(userSelector)
    const { heightHeader } = useHeightHeader()
    const themeWeb = useAppSelector(ThemeWebSelector)
    const dispatch = useAppDispatch()
    const handleOpenAway = () => {
        if (open) {
            GoogleTagManager.push({ event: 'atm.event', option: 'menu hamburguesa', eventName: 'header_click' })
        }
        setOpen(false)
    }
    const handleOpenMenuMobile = (optionName) => {
        if (open) {
            dtHeaderMenuMobile(optionName)
        }
        setOpen(false)
    }
    return (
        <StyledMenu $heightHeader={heightHeader} $open={open}>
            {user?.session && (
                <>
                    <NameS>
                        <div className="wrapper">
                            {user?.firstName} {user?.lastName}
                        </div>
                    </NameS>
                </>
            )}
            {user ? null : (
                <Link href={PATHS.CUENTA_RECARGA.url} className="recargar">
                    <a onClick={() => handleOpenMenuMobile('recarga')}>{PATHS.CUENTA_RECARGA.name}</a>
                </Link>
            )}
            <Divider></Divider>

            <Link href={PATHS.APUESTAS_EN_VIVO.url}>
                <a onClick={() => handleOpenMenuMobile('apuestas en vivo')}>{PATHS.APUESTAS_EN_VIVO.name}</a>
            </Link>

            <Link href={PATHS.APUESTAS_DEPORTIVAS.url}>
                <a onClick={() => handleOpenMenuMobile('apuestas deportivas')}>{PATHS.APUESTAS_DEPORTIVAS.name}</a>
            </Link>

            <Link href={PATHS.CASINO.url}>
                <a onClick={() => handleOpenMenuMobile('casino')}>{PATHS.CASINO.name}</a>
            </Link>

            <Link href={PATHS.CASINO_EN_VIVO.url}>
                <a onClick={() => handleOpenMenuMobile('casino en vivo')}>{PATHS.CASINO_EN_VIVO.name}</a>
            </Link>

            <Link href={PATHS.JUEGOS_VIRTUALES.url}>
                <a onClick={() => handleOpenMenuMobile('juegos virtuales')}>{PATHS.JUEGOS_VIRTUALES.name}</a>
            </Link>

            <Link href={PATHS.PROMOCIONES.url}>
                <a onClick={() => handleOpenMenuMobile('promociones')}>{PATHS.PROMOCIONES.name}</a>
            </Link>
            <Link href={PATHS.NOTICIAS.url}>
                <a onClick={() => handleOpenMenuMobile('noticias')}>{PATHS.NOTICIAS.name}</a>
            </Link>

            <Link href={PATHS.TELE_SERVICIOS.url}>
                <a onClick={() => handleOpenMenuMobile('teleservicios')}>Acerca de Teleservicios</a>
            </Link>

            <Link href={PATHS.TORITO_DE_ORO.url}>
                <a onClick={() => handleOpenMenuMobile('torito de oro')}>{PATHS.TORITO_DE_ORO.name}</a>
            </Link>

            <Link href={PATHS.TORNEO.url}>
                <a onClick={() => handleOpenMenuMobile('torneo')}>{PATHS.TORNEO.name}</a>
            </Link>

            <Link href={PATHS.RESULTADOS.url}>
                <a onClick={() => handleOpenMenuMobile('resultados')}>{PATHS.RESULTADOS.name}</a>
            </Link>

            <Divider></Divider>

            <Link href={PATHS.NUESTRAS_TIENDAS.url} className="opac">
                <a onClick={() => handleOpenMenuMobile('nuestras tiendas')}>{PATHS.NUESTRAS_TIENDAS.name}</a>
            </Link>

            <Link href={PATHS.TURORIALES.url} className="opac">
                <a onClick={() => handleOpenMenuMobile('tutoriales')}>{PATHS.TURORIALES.name}</a>
            </Link>

            <Link href="https://teleservicios.at/juega/" className="Teleservicios" rel="nofollow noreferrer" target="_blank">
                <StyledTeleservicios
                    href="https://teleservicios.at/juega/"
                    target="_blank"
                    onClick={() => handleOpenMenuMobile('teleservicios')}
                >
                    <p>Teleservicios</p>
                    <div>
                        <img className="whatsapp" alt="whatsapp" src={whatsappIMG.src}></img>
                        <img className="Telegram" alt="Telegram" src={telegramIMG.src}></img>
                    </div>
                </StyledTeleservicios>
            </Link>
            <Link href={PATHS.PODCAST.url} className="opac">
                <a onClick={() => handleOpenMenuMobile('podcast')}>{PATHS.PODCAST.name}</a>
            </Link>

            <Divider></Divider>

            {themeWeb === 'dark' ? (
                <button
                    onClick={() => {
                        dispatch(set('light'))
                    }}
                >
                    <div>
                        <span>Modo claro</span>
                        <span>
                            <img className="sol" src={solIMG.src}></img>
                        </span>
                    </div>
                </button>
            ) : (
                <button
                    onClick={() => {
                        dispatch(set('dark'))
                    }}
                >
                    <div>
                        <span>Modo oscuro</span>
                        <span>
                            <img className="luna" src={lunaIMG.src}></img>
                        </span>
                    </div>
                </button>
            )}

            <LogosS>
                <Link
                    href="https://www.facebook.com/apuestatotaloficial/"
                    onClick={() => dtHeaderMenuMobile('facebook')}
                    rel="nofollow"
                    target="_blank"
                >
                    <a>
                        <img alt="Facebook" src={facebook.src} />
                    </a>
                </Link>
                <Link
                    href="https://twitter.com/apuestatotalof"
                    onClick={() => dtHeaderMenuMobile('twitter')}
                    rel="nofollow"
                    target="_blank"
                >
                    <a>
                        <img alt="Twitter" src={twitter.src} />
                    </a>
                </Link>
                <Link
                    href="https://www.instagram.com/apuestatotaloficial/"
                    onClick={() => dtHeaderMenuMobile('instagram')}
                    rel="nofollow"
                    target="_blank"
                >
                    <a>
                        <img alt="Instagram" src={instagram.src} />
                    </a>
                </Link>
                <Link
                    href="https://www.tiktok.com/@apuestatotal.oficial"
                    className="tiktok"
                    onClick={() => dtHeaderMenuMobile('tiktok')}
                    rel="nofollow"
                    target="_blank"
                >
                    <a>
                        <img alt="Tiktok" src={tiktokIMG.src} />
                    </a>
                </Link>
                <Link
                    href="https://www.youtube.com/c/ApuestaTotal/featured"
                    onClick={() => dtHeaderMenuMobile('youtube')}
                    rel="nofollow"
                    target="_blank"
                >
                    <a>
                        <img alt="Youtube" src={youtube.src} />
                    </a>
                </Link>
            </LogosS>
        </StyledMenu>
    )
}
interface PropsStyled {
    $indexdsa?: string
    $open?: boolean
    $heightHeader?: number
}
const StyledTeleservicios = styled.a`
    position: relative;
    > div {
        display: flex;
        flex-direction: column;
        img {
            position: relative;
            &.whatsapp {
                min-width: 17px;
                max-width: 17px;
                z-index: 1;
            }
            &.Telegram {
                z-index: 2;
                min-width: 18px;
                max-width: 18px;
                margin-top: -6px;
                margin-left: 5px;
            }
        }
    }
`
const LogosS = styled.div`
    & {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        margin-top: 0.5rem;
        > a {
            max-width: 25px;
            opacity: 0.9;
            &.tiktok {
                max-width: 30px;
                max-height: 30px;
            }
            > img {
                transition: 150ms;
                filter: grayscale(1);

                &:hover {
                    filter: grayscale(0);
                }
            }
        }
    }
`
const StyledMenu = styled.div<PropsStyled>`
    && {
        /* border-radius: 5px; */
        top: calc(100% + 4px);
        right: 0;
        width: 80%;
        max-width: 400px;
        position: absolute;
        --shadow-1: rgba(0, 0, 0, 0.1);
        --shadow-2: rgba(0, 0, 0, 0.2);
        --shadow-inset: rgba(255, 255, 255, 0.5);
        box-shadow: 0 4px 8px 0 var(--shadow-2), 0 2px 4px 0 var(--shadow-1), inset 0 0 0 1px var(--shadow-inset);
        display: flex;
        flex-direction: column;
        background: ${(p) => p.theme.background};
        z-index: 999;
        padding: 1rem 1.5rem;
        hr {
            border-color: ${(p) => hexAlpha(p.theme.contrastText, 0.4)};
        }
        ${MEDIA_QUERIES.min_width.desktopS} {
            /* right: 50px; */
            max-width: 450px;
        }
        > span.space {
            margin: 7px;
        }
        > a,
        > button {
            background: transparent;
            z-index: 2;
            padding: 0.4rem 0.5rem;
            font-size: 1rem;
            color: ${(p) => p.theme.contrastText};
            border-radius: 5px;
            border: 2px solid ${(p) => p.theme.background};
            display: flex;
            align-items: center;
            gap: 8px;
            > span.icon {
                background: ${(p) => p.theme.palette.alternate19.main};
                border-radius: 50%;
                width: 14px;
                height: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                > svg {
                    font-size: 10px;
                    position: relative;
                    right: 1px;
                    color: white;
                }
            }
            &.nuestras-tiendas {
                color: ${(p) => p.theme.contrastText};

                /* color: ${(p) => p.theme.palette.alternate19.main}; */
                font-size: 0.8rem;
            }

            &.recargar {
                background: ${(p) => p.theme.palette.secondary.main};
                text-align: center;
                justify-content: center;
                font-size: 0.95rem;
                padding: 0.7rem 1rem;
                border-color: ${(p) => p.theme.primary};
            }
            &.opac {
                color: ${(p) => p.theme.contrastText};
                /* color: ${(p) => p.theme.palette.alternate19.main}; */
                font-size: 0.9rem;
                font-size: 1rem;
            }
        }

        > button {
            margin-top: 10px;
            margin-bottom: 10px;
            > div {
                display: flex;
                align-items: center;
                flex-direction: row;
                line-height: 1;
                gap: 5px;

                img {
                    display: block;
                    object-fit: cover;
                    max-height: 2rem;
                    position: relative;
                    bottom: 0.2rem;
                    &.sol {
                        bottom: 0rem;
                    }
                }
            }
        }

        transition: transform 30ms linear 40ms, opacity 40ms linear, right 40ms, top 40ms, pointer-events 40ms linear 40ms;
        opacity: 0;
        top: 38px;
        pointer-events: none;
        transform: scale(0.99);
        visibility: hidden;
        ${(p) => {
            if (p.$open) {
                return css`
                    transform: scale(1);
                    opacity: 1;
                    top: ${p.$heightHeader}px;
                    pointer-events: all;
                    visibility: visible;
                `
            }
        }}

        overflow: scroll;
        overflow: overlay;
        max-height: ${(p) => `calc(90vh - ${p.$heightHeader}px)`};
        ::-webkit-scrollbar {
            width: 1rem;
        }
        ::-webkit-scrollbar-thumb {
            background-color: transparent;
            border: 4px solid transparent;
            border-radius: 11rem;
            box-shadow: 16px 16px 16px 16px ${(p) => p.theme.palette.primary.main} inset;
        }
        ::-webkit-scrollbar-track {
            position: absolute;
            right: -3rem;
            top: -5rem;
        }
    }
`

const NameS = styled.div`
    & {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        > .wrapper {
            text-transform: capitalize;
            padding-bottom: 1rem;
            text-align: center;
            font-weight: 500;
            color: ${(p) => p.theme.contrastText};
        }
    }
`
