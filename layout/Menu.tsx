import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { PATHS } from 'routes/paths/PATHS'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import styled, { css } from 'styled-components'
import { useMediaQuery } from '@mui/material'
import { GoogleTagManager } from 'google/TagManager'
import hexAlpha from 'hex-alpha'

export const Menu = () => {
    const dtHeaderMenu = (name) => {
        GoogleTagManager.push({
            event: 'atm.event',
            option: name.toLowerCase(),
            eventName: 'header_click',
        })
    }
    const { pathname } = useRouter()
    const [menuMax, setMenuMax] = useState(false)
    const desktopS = useMediaQuery(MEDIA_QUERIES.min_width.desktopS)

    const handleToogleMas = (optionName) => {
        GoogleTagManager.push({ event: 'atm.event', option: optionName.toLowerCase(), eventName: 'header_click' })
        setMenuMax(!menuMax)
    }
    const handleEnter = () => {
        if (desktopS) {
            setMenuMax(true)
        }
    }
    const handleLeave = () => {
        if (desktopS) {
            setMenuMax(false)
        }
    }

    return (
        <MenuDesktop>
            <div onClick={() => dtHeaderMenu('apuestas en vivo')}>
                <Link
                    href={{ pathname: PATHS.APUESTAS_EN_VIVO.url, hash: '#/live' }}
                    className={classNames({ active: pathname === PATHS.APUESTAS_EN_VIVO.url })}
                >
                    APUESTAS EN VIVO
                </Link>
            </div>
            <div onClick={() => dtHeaderMenu('apuestas deportivas')}>
                <Link href={PATHS.APUESTAS_DEPORTIVAS.url} className={classNames({ active: pathname === PATHS.APUESTAS_DEPORTIVAS.url })}>
                    APUESTAS DEPORTIVAS
                </Link>
            </div>
            <div onClick={() => dtHeaderMenu('casino')}>
                <Link href={PATHS.CASINO.url} className={classNames({ active: pathname === PATHS.CASINO.url })}>
                    CASINO
                </Link>
            </div>
            <div onClick={() => dtHeaderMenu('casino en vivo')}>
                <Link href={PATHS.CASINO_EN_VIVO.url} className={classNames({ active: pathname === PATHS.CASINO_EN_VIVO.url })}>
                    CASINO EN VIVO
                </Link>
            </div>
            <div onClick={() => dtHeaderMenu('juegos virtuales')}>
                <Link
                    href={PATHS.MAS_DIVERSION_JUEGOS_VIRTUALES.url}
                    className={classNames({ active: pathname === PATHS.MAS_DIVERSION_JUEGOS_VIRTUALES.url })}
                >
                    JUEGOS VIRTUALES
                </Link>
            </div>
            <div onClick={() => dtHeaderMenu('promociones')}>
                <Link href={PATHS.PROMOCIONES.url} className={classNames({ active: pathname === PATHS.PROMOCIONES.url })}>
                    PROMOCIONES
                </Link>
            </div>
            <MenuTabS onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <WrapperS id="toggle-mas-menu">
                    Más
                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                </WrapperS>
                <StyledMenuMas $menuMax={menuMax}>
                    <Link href={PATHS.TELE_SERVICIOS.url}>
                        <a onClick={() => handleToogleMas('acerca de teleservicios')}>Acerca de Teleservicios</a>
                    </Link>
                    <Link href={PATHS.BINGO.url}>
                        <a onClick={() => handleToogleMas('bingo')}>Bingo</a>
                    </Link>
                    <Link href={PATHS.TORITO_DE_ORO.url}>
                        <a onClick={() => handleToogleMas('torito')}>Torito de oro</a>
                    </Link>
                    <Link href={PATHS.TORNEO.url}>
                        <a onClick={() => handleToogleMas('torneos')}>Torneos</a>
                    </Link>
                    <Link href={{ pathname: PATHS.RESULTADOS.url, hash: '#/results' }}>
                        <a onClick={() => handleToogleMas('resultado')}>Resultados</a>
                    </Link>
                    <Link href={PATHS.NUESTRAS_TIENDAS.url}>
                        <a onClick={() => handleToogleMas('tiendas')}>Nuestras tiendas</a>
                    </Link>
                    <Link href={PATHS.TURORIALES.url}>
                        <a onClick={() => handleToogleMas('tiendas')}>Tutoriales</a>
                    </Link>
                    <Link href={PATHS.INFORMACION_APUESTAS_DEPORTIVAS.url}>
                        <a onClick={() => handleToogleMas('informacion apuestas deportivas')}>Información Apuestas Deportivas</a>
                    </Link>
                </StyledMenuMas>
            </MenuTabS>
        </MenuDesktop>
    )
}

interface StyledProps {
    $menuMax?: boolean
}

const MenuTabS = styled.div`
    & {
        position: relative;
    }
`

const StyledMenuMas = styled.div<StyledProps>`
    & {
        border-radius: 5px;
        top: calc(100% + 4px);
        right: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        z-index: 1;
        border: 6px solid ${(p) => p.theme.layout.header.mas.background};
        border-radius: 10px;
        background: ${(p) => p.theme.layout.header.mas.background};
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

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
            background: ${(p) => p.theme.layout.header.mas.background};
            border: 1px solid ${(p) => p.theme.layout.header.mas.background};
            pointer-events: none;
            z-index: -1;
            right: 2rem;
            transform: rotate(-135deg) translateX(50%);
            -moz-transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
        }
        > a {
            width: 200px;
            padding: 1rem 0;
            padding-left: 2rem;
            font-size: 0.9rem;
            background: ${(p) => p.theme.layout.header.mas.background};
            color: ${(p) => hexAlpha(p.theme.contrastText, 0.8)};
            &:first-of-type {
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
            &:last-of-type {
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
            :hover {
                background: ${(p) => p.theme.layout.header.masActive.background};
                color: ${(p) => p.theme.layout.header.masActive.contrastText};
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

        color: ${(p) => hexAlpha(p.theme.contrastText, 1)};

        > svg {
            transition: 100ms;
            opacity: 0;
            font-size: 15px;
            transform: scale(1.2);
            color: red;
        }
        &:hover {
            color: ${(p) => p.theme.primary};
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
            background: ${(p) => p.theme.primary};
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
                color: ${(p) => hexAlpha(p.theme.contrastText, 1)};
                &::first-letter {
                    text-transform: capitalize;
                }
                &:hover,
                &.active {
                    color: ${(p) => p.theme.primary};
                    opacity: 1;
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
                    background: ${(p) => p.theme.primary};
                    bottom: 0px;
                    left: 0;
                    transition: 250ms;
                }
            }
        }
    }
`
