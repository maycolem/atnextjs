import styled from '@emotion/styled'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { PATHS } from 'routes/paths/PATHS'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { css } from 'styled-components'
import { useMediaQuery } from '@mui/material'
import { GoogleTagManager } from 'google/TagManager'

const Menu = () => {
    const dtHeaderMenu = (name) => {
        GoogleTagManager.push({ event: 'atm.event', option: name.toLowerCase(), eventName: 'header_click' })
    }
    const { pathname } = useRouter()
    const [menuMax, setMenuMax] = useState(false)
    const desktopS = useMediaQuery(MEDIA_QUERIES.min_width.desktopS)

    const handleToogleMas = (optionName) => {
        GoogleTagManager.push({ event: 'atm.event', option: optionName.toLowerCase(), eventName: 'header_click' })
        setMenuMax(!menuMax)
    }
    const handleEnter = (e, x) => {
        if (desktopS) {
            setMenuMax(true)
        }
    }
    const handleLeave = (e, x) => {
        if (desktopS) {
            setMenuMax(false)
        }
    }

    return (
        <MenuDesktop>
            <div>
                <Link
                    href={{ pathname: PATHS.APUESTAS_EN_VIVO.url, hash: '#/live' }}
                    className={classNames({ active: pathname === PATHS.APUESTAS_EN_VIVO.url })}
                    onClick={() => dtHeaderMenu('apuestas en vivo')}
                >
                    APUESTAS EN VIVO
                </Link>
            </div>
            <div>
                <Link
                    href={PATHS.APUESTAS_DEPORTIVAS.url}
                    className={classNames({ active: pathname === PATHS.APUESTAS_DEPORTIVAS.url })}
                    onClick={() => dtHeaderMenu('apuestas deportivas')}
                >
                    APUESTAS DEPORTIVAS
                </Link>
            </div>
            <div>
                <Link
                    href={PATHS.CASINO.url}
                    className={classNames({ active: pathname === PATHS.CASINO.url })}
                    onClick={() => dtHeaderMenu('casino')}
                >
                    CASINO
                </Link>
            </div>
            <div>
                <Link
                    href={PATHS.CASINO_EN_VIVO.url}
                    className={classNames({ active: pathname === PATHS.CASINO_EN_VIVO.url })}
                    onClick={() => dtHeaderMenu('casino en vivo')}
                >
                    CASINO EN VIVO
                </Link>
            </div>
            <div>
                <Link
                    href={PATHS.MAS_DIVERSION_JUEGOS_VIRTUALES.url}
                    className={classNames({ active: pathname === PATHS.MAS_DIVERSION_JUEGOS_VIRTUALES.url })}
                    onClick={() => dtHeaderMenu('juegos virtuales')}
                >
                    JUEGOS VIRTUALES
                </Link>
            </div>
            <div>
                <Link
                    href={PATHS.PROMOCIONES.url}
                    className={classNames({ active: pathname === PATHS.PROMOCIONES.url })}
                    onClick={() => dtHeaderMenu('promociones')}
                >
                    PROMOCIONES
                </Link>
            </div>
            <MenuTabS onClick={() => handleToogleMas('mas')} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <WrapperS id="toggle-mas-menu">
                    Más
                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                </WrapperS>
                <MasMenuS $menuMax={menuMax}>
                    <Link href={PATHS.TELE_SERVICIOS.url} onClick={() => handleToogleMas('acerca de teleservicios')}>
                        Acerca de Teleservicios
                    </Link>
                    <Link href={PATHS.BINGO.url} onClick={() => handleToogleMas('bingo')}>
                        Bingo
                    </Link>
                    <Link
                        href={PATHS.INFORMACION_APUESTAS_DEPORTIVAS.url}
                        onClick={() => handleToogleMas('informacion apuestas deportivas')}
                    >
                        Información Apuestas Deportivas
                    </Link>
                    <Link href={PATHS.TORITO_DE_ORO.url} onClick={() => handleToogleMas('torito')}>
                        Torito de oro
                    </Link>
                    <Link href={PATHS.TORNEO.url} onClick={() => handleToogleMas('torneos')}>
                        Torneos
                    </Link>
                    <Link href={{ pathname: PATHS.RESULTADOS.url, hash: '#/results' }} onClick={() => handleToogleMas('resultado')}>
                        Resultados
                    </Link>
                    <Link href={PATHS.NUESTRAS_TIENDAS.url} onClick={() => handleToogleMas('tiendas')}>
                        Nuestras tiendas
                    </Link>
                    <Link href={PATHS.TURORIALES.url} onClick={() => handleToogleMas('tiendas')}>
                        Tutoriales
                    </Link>
                </MasMenuS>
            </MenuTabS>
        </MenuDesktop>
    )
}

export default Menu
const MenuTabS = styled.div`
    & {
        position: relative;
    }
`

const MasMenuS = styled.div`
    & {
        background: white;
        border-radius: 5px;
        top: calc(100% + 4px);
        right: 0;
        position: absolute;
        --shadow-1: rgba(0, 0, 0, 0.1);
        --shadow-2: rgba(0, 0, 0, 0.2);
        --shadow-inset: rgba(255, 255, 255, 0.5);
        box-shadow: 0 12px 28px 0 var(--shadow-2), 0 2px 4px 0 var(--shadow-1), inset 0 0 0 1px var(--shadow-inset);
        display: flex;
        flex-direction: column;
        z-index: 1;
        /* overflow: hidden; */
        &::before {
            content: '';
            width: 100%;
            height: 20px;
            bottom: 100%;
            background: transparent;
            left: 0;
            position: absolute;
        }
        &::after {
            z-index: 2;
            transition: 0.15;
            position: absolute;
            bottom: calc(100% - 4px);
            content: '';
            display: block;
            position: absolute;
            width: 8px;
            height: 8px;
            background: white;
            border: 1px solid white;
            pointer-events: none;
            z-index: -1;
            right: 2rem;
            transform: rotate(-135deg) translateX(50%);
            -moz-transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
            box-shadow: 0 12px 28px 0 var(--shadow-2), 0 2px 4px 0 var(--shadow-1), inset 0 0 0 1px var(--shadow-inset);
        }
        > a {
            width: 200px;
            padding: 1rem 0;
            padding-left: 2rem;
            font-size: 0.9rem;
            color: ${(p) => p.theme.palette.dark.main};
            border-radius: 5px;
            border: 2px solid white;
            &.nuestras-tiendas {
                color: ${(p) => p.theme.palette.alternate19.main};
                font-size: 0.8rem;
            }
            :hover {
                background: ${(p) => p.theme.palette.primary.main};
                color: ${(p) => p.theme.palette.light.main};
            }
        }
        transition: transform 30ms linear 40ms, opacity 40ms linear, right 40ms, top 40ms, pointer-events 40ms linear 40ms;
        opacity: 0;
        /* right: -10px; */
        top: calc(100% + -1rem);
        pointer-events: none;
        z-index: -1;
        transform: scale(0.99);
        ${(p) => {
            if (p.$menuMax) {
                return css`
                    transform: scale(1);
                    opacity: 1;
                    /* right: 0; */
                    top: calc(100% + 4px);
                    pointer-events: all;
                `
            }
        }}
    }
`
const WrapperS = styled.div`
    & {
        display: flex;
        align-items: center;
        text-transform: capitalize;
        padding: 0.5rem;
        font-size: 0.9em;
        position: relative;
        cursor: pointer;
        > svg {
            transition: 100ms;
            opacity: 0;
            font-size: 15px;
            transform: scale(1.2);
            color: red;
        }
        &:hover {
            color: ${(p) => p.theme.palette.primary.main};
            > svg {
                opacity: 1;
            }
            ::after {
                width: 100%;
            }
        }

        ::after {
            content: '';
            position: absolute;
            width: 0%;
            height: 2px;
            background: ${(p) => p.theme.palette.primary.main};
            bottom: 0px;
            left: 0;
            transition: 250ms;
        }
    }
`
const MenuDesktop = styled.div`
    & {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 1rem;

        > div {
            flex: 1 1 initial;
            > a {
                display: block;
                /* font-family: 'Rubik'; */
                font-style: normal;
                font-weight: 500;
                font-weight: 400;
                font-size: 0.9em;
                text-transform: lowercase;
                transition: 250ms;
                text-align: center;
                white-space: nowrap;
                /* letter-spacing: 0.01rem; */
                position: relative;
                padding: 0.5rem;
                &::first-letter {
                    text-transform: capitalize;
                }
                &:hover,
                &.active {
                    color: ${(p) => p.theme.palette.primary.main};
                    ::after {
                        width: 100%;
                    }
                }
                ${MEDIA_QUERIES.min_width.desktopXS} {
                    font-size: 0.9em;
                }

                ::after {
                    content: '';
                    position: absolute;
                    width: 0%;
                    height: 2px;
                    background: ${(p) => p.theme.palette.primary.main};
                    bottom: 0px;
                    left: 0;
                    transition: 250ms;
                }
            }
        }
    }
`
