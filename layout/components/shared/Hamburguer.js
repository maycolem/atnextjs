import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
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
import { Avatar, ClickAwayListener, Divider } from '@mui/material'
import UserAvatar from './UserAvatar'
import UserMenu from './UserMenu'
import { ActiveBonusAnimationAvatarSelector } from 'states/slice/ActiveBonusAnimationAvatar'
import classNames from 'classnames'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import useMediaQueryAT from 'hooks/useMediaQueryAT'
import { useRouter } from 'next/router'

const Hamburguer = () => {
    const [open, setOpen] = useState(false)
    const user = useSelector(userSelector)
    const [heightHeader, setHeightHeader] = useState(0)
    const { animated: socketBonusActive } = useSelector(ActiveBonusAnimationAvatarSelector)
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    const router = useRouter()
    const dtHeaderMenu = (name) => {
        GoogleTagManager.push({
            event: 'atm.event',
            option: 'menu /' + ' ' + name.toLowerCase(),
            eventName: 'header_click',
        })
    }
    const handleOpenAway = (e) => {
        if (open) {
            GoogleTagManager.push({ event: 'atm.event', option: 'menu hamburguesa', eventName: 'header_click' })
        }
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(!open)
        GoogleTagManager.push({ event: 'atm.event', option: 'menu hamburguesa', eventName: 'header_click' })
    }

    useEffect(() => {
        const time = setTimeout(() => {
            const header = document.getElementById('layout-default-at-apuesta')
            setHeightHeader(header?.offsetHeight)
        }, 200)
        return () => clearTimeout(time)
    }, [user, desktopS])

    useEffect(() => {
        setOpen(false)
    }, [router.asPath])

    return (
        <>
            <ClickAwayListener onClickAway={handleOpenAway}>
                <MenuHamburguerS id="toggle-menu-hamburgues-menu">
                    <LinesS onClick={handleOpen}>
                        <LineS $indexdsa={'1'} $open={open} className="b1"></LineS>
                        <LineS $indexdsa={'2'} $open={open} className="b2"></LineS>
                        <LineS $indexdsa={'3'} $open={open} className="b3"></LineS>
                    </LinesS>
                    <MenuS $heightHeader={heightHeader} $open={open}>
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
                            <Link href={PATHS.CUENTA_RECARGA.url} className="recargar" onClick={handleOpenAway}>
                                {PATHS.CUENTA_RECARGA.name}
                            </Link>
                        )}
                        <Divider></Divider>
                        <Link
                            href={PATHS.APUESTAS_EN_VIVO.url}
                            onClick={() => {
                                dtHeaderMenu('apuestas en vivo')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.APUESTAS_EN_VIVO.name}
                        </Link>
                        <Link
                            href={PATHS.APUESTAS_DEPORTIVAS.url}
                            onClick={() => {
                                dtHeaderMenu('apuestas deportivas')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.APUESTAS_DEPORTIVAS.name}
                        </Link>
                        <Link
                            href={PATHS.CASINO.url}
                            onClick={() => {
                                dtHeaderMenu('casino')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.CASINO.name}
                        </Link>
                        <Link
                            href={PATHS.CASINO_EN_VIVO.url}
                            onClick={() => {
                                dtHeaderMenu('casino en vivo')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.CASINO_EN_VIVO.name}
                        </Link>
                        <Link
                            href={PATHS.INFORMACION_APUESTAS_DEPORTIVAS.url}
                            onClick={() => {
                                dtHeaderMenu('informacion apuestas deportivas')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.INFORMACION_APUESTAS_DEPORTIVAS.name}
                        </Link>
                        <Link
                            href={PATHS.JUEGOS_VIRTUALES.url}
                            onClick={() => {
                                dtHeaderMenu('juegos virtuales')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.JUEGOS_VIRTUALES.name}
                        </Link>
                        <Link
                            href={PATHS.PROMOCIONES.url}
                            onClick={() => {
                                dtHeaderMenu('promociones')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.PROMOCIONES.name}
                        </Link>

                        <Link
                            href={PATHS.TORITO_DE_ORO.url}
                            onClick={() => {
                                dtHeaderMenu('torito de oro')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.TORITO_DE_ORO.name}
                        </Link>
                        <Link
                            href={PATHS.TORNEO.url}
                            onClick={() => {
                                dtHeaderMenu('torneo')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.TORNEO.name}
                        </Link>
                        <Link
                            href={PATHS.RESULTADOS.url}
                            onClick={() => {
                                dtHeaderMenu('resultados')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.RESULTADOS.name}
                        </Link>
                        <Divider></Divider>
                        <Link
                            href={PATHS.NUESTRAS_TIENDAS.url}
                            className="opac"
                            onClick={() => {
                                dtHeaderMenu('nuestras tiendas')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.NUESTRAS_TIENDAS.name}
                        </Link>
                        <Link
                            href={PATHS.TURORIALES.url}
                            className="opac"
                            onClick={() => {
                                dtHeaderMenu('tutoriales')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.TURORIALES.name}
                        </Link>
                        <Link
                            href={'https://t.me/Televentas_at_bot'}
                            className="opac"
                            onClick={() => {
                                dtHeaderMenu('teleservicios')
                                handleOpenAway()
                            }}
                            target="_blank"
                        >
                            <a>
                                {PATHS.TELE_SERVICIOS.name}
                                <span className="icon">
                                    <TelegramIcon></TelegramIcon>
                                </span>
                            </a>
                        </Link>
                        <Link
                            href={PATHS.PODCAST.url}
                            className="opac"
                            onClick={() => {
                                dtHeaderMenu('podcast')
                                handleOpenAway()
                            }}
                        >
                            {PATHS.PODCAST.name}
                        </Link>
                        <LogosS>
                            <Link
                                href="https://www.facebook.com/apuestatotaloficial/"
                                onClick={() => dtHeaderMenu('facebook')}
                                rel="nofollow"
                                target="_blank"
                            >
                                <a>
                                    <img alt="Facebook" src={facebook.src} />
                                </a>
                            </Link>
                            <Link
                                href="https://twitter.com/apuestatotalof"
                                onClick={() => dtHeaderMenu('twitter')}
                                rel="nofollow"
                                target="_blank"
                            >
                                <a>
                                    <img alt="Twitter" src={twitter.src} />
                                </a>
                            </Link>
                            <Link
                                href="https://www.instagram.com/apuestatotaloficial/"
                                onClick={() => dtHeaderMenu('instagram')}
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
                                onClick={() => dtHeaderMenu('tiktok')}
                                rel="nofollow"
                                target="_blank"
                            >
                                <a>
                                    <img alt="Tiktok" src={tiktokIMG.src} />
                                </a>
                            </Link>
                            <Link
                                href="https://www.youtube.com/c/ApuestaTotal/featured"
                                onClick={() => dtHeaderMenu('youtube')}
                                rel="nofollow"
                                target="_blank"
                            >
                                <a>
                                    <img alt="Youtube" src={youtube.src} />
                                </a>
                            </Link>
                        </LogosS>
                    </MenuS>
                </MenuHamburguerS>
            </ClickAwayListener>
        </>
    )
}

export default Hamburguer
const LinesS = styled.div`
    & {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-height: 15px;
        height: 15px;
    }
`

const NameS = styled.div`
    & {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        > .wrapper {
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            text-transform: capitalize;
            padding-bottom: 1rem;
            text-align: center;
            font-weight: 500;
            color: ${(p) => p.theme.palette.dark.main};
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
const MenuS = styled.div`
    & {
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
        background: white;
        z-index: 999;
        padding: 1rem 1.5rem;
        ${MEDIA_QUERIES.min_width.desktopS} {
            /* right: 50px; */
            max-width: 450px;
        }
        > span.space {
            margin: 7px;
        }
        > a {
            z-index: 2;
            padding: 0.4rem 0.5rem;
            font-size: 1rem;
            color: ${(p) => p.theme.palette.dark.main};
            border-radius: 5px;
            border: 2px solid white;
            background: white;
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
                color: ${(p) => p.theme.palette.alternate19.main};
                font-size: 0.8rem;
            }

            &.recargar {
                background: ${(p) => p.theme.palette.secondary.main};
                text-align: center;
                justify-content: center;
                font-size: 0.95rem;
                padding: 0.7rem 1rem;
                border-color: ${(p) => p.theme.palette.secondary.main};
            }
            &.opac {
                color: ${(p) => p.theme.palette.alternate19.main};
                font-size: 0.9rem;
                font-size: 1rem;
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
const LineS = styled.div`
    & {
        width: 20px;
        height: 2px;
        background: black;
        animation-name: none;
        animation-duration: 250ms;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        position: relative;
        @keyframes openMenu1 {
            from {
                background: black;
            }
            50% {
                transform: translateY(6px);
                opacity: 0.5;
            }
            to {
                transform: translateY(6.5px) rotate(-45deg);
            }
        }
        @keyframes openMenu2 {
            from {
                background: black;
            }
            50% {
                width: 0;
                opacity: 0.5;
            }
            to {
                width: 0;
            }
        }
        @keyframes openMenu3 {
            from {
                background: black;
            }
            50% {
                transform: translateY(-6px);
                opacity: 0.5;
            }
            to {
                transform: translateY(-6.5px) rotate(45deg);
            }
        }
        @keyframes closeMenu1 {
            from {
                transform: translateY(6px) rotate(-45deg);
            }
            50% {
                transform: translateY(6px);
            }
            to {
                background: black;
            }
        }
        @keyframes closeMenu2 {
            from {
                width: 0;
            }
            50% {
                width: 0;
                opacity: 0;
            }
            to {
                background: black;
                width: 20px;
            }
        }
        @keyframes closeMenu3 {
            from {
                transform: translateY(-6px) rotate(45deg);
            }
            50% {
                transform: translateY(-6px);
            }
            to {
                background: black;
            }
        }
        ${(p) => {
            if (p.$open) {
                return css`
                    animation-name: ${'openMenu' + p.$indexdsa};
                `
            }
        }}
        ${(p) => {
            if (!p.$open) {
                return css`
                    animation-name: ${'closeMenu' + p.$indexdsa};
                `
            }
        }}
    }
`
const MenuHamburguerS = styled.div`
    & {
        height: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        /* width: 30px; */
        cursor: pointer;
        padding-left: 10px;
        /* padding-right: 10px; */
    }
`
