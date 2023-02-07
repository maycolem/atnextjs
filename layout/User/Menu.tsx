/* eslint-disable camelcase */
import React from 'react'
import { ProviderAt } from 'services/ProviderAtService'
import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import { reset, userSelector } from 'states/features/slices/userSlice'
import { useRouter } from 'next/router'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { ShowSaldoSelector, toggle } from 'states/slice/ShowSaldo'
import classNames from 'classnames'
import styled, { css } from 'styled-components'
import Bonos_y_tor from 'layout/assets/Bonos_y_tor.png'
import cerrar_sesion from 'layout/assets/cerrar_sesion.png'
import Historial_de_saldo from 'layout/assets/Historial_de_saldo.png'
import mi_perfil from 'layout/assets/mi_perfil.png'
import Mis_apuestas from 'layout/assets/Mis_apuestas.png'
import Notificaciones from 'layout/assets/Notificaciones.png'
import Ocultar_saldo from 'layout/assets/Ocultar_saldo.png'
import recargar from 'layout/assets/recargar.png'
import verifica_tu_cuenta from 'layout/assets/verifica_tu_cuenta.png'
import retirar from 'layout/assets/retirar.png'
import { GoogleTagManager } from 'google/TagManager'
import { closeAnimated } from 'states/slice/ActiveBonusAnimationAvatar'
import { useAppDispatch, useAppSelector } from '@states/store'
import { dtHeaderMenu } from '@layout/dt'

interface Props {
    onClose?: () => void
    className?: string
    isOpenUserMenu?: boolean
    socketBonusActive?: boolean
    handleOpenAway?: () => void
}

export const Menu = ({ onClose = () => null, className, isOpenUserMenu, socketBonusActive, handleOpenAway = () => null }: Props) => {
    const providerAt = new ProviderAt()
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    const { value: valueSaldo } = useAppSelector(ShowSaldoSelector)
    const { pathname } = useRouter()
    const handleLogout = async () => {
        // GTM IMPLEMENTATION

        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'header_click',
            option: 'mi cuenta / cerrar session',
        })

        await providerAt.logout()
        dispatch(reset())
        onClose()
        window.open(PATHS.HOME.url, '_self')
    }

    const handleOnClickToogleSaldo = () => {
        dispatch(toggle())
    }
    const handleCloseAnimated = () => {
        dispatch(closeAnimated())
    }

    return (
        <>
            <Styled $isOpenUserMenu={isOpenUserMenu} className={className}>
                <div className="wrapper">
                    {user?.verified === 0 && (
                        <Link
                            href={PATHS.CUENTA_VERIFICAR.url}
                            className="verify"
                            onClick={() => {
                                handleOpenAway()
                            }}
                        >
                            <a className="verify">
                                <div className="verify-wrapper">
                                    <IMGS alt="" src={verifica_tu_cuenta.src} />
                                </div>
                                <span>Verifica tu cuenta</span>
                            </a>
                        </Link>
                    )}
                    <Link href={PATHS.CUENTA_MY_PROFILE.url} legacyBehavior>
                        <StyledLinkContent
                            className={classNames({ active: pathname === PATHS.CUENTA_MY_PROFILE.url })}
                            onClick={() => {
                                handleOpenAway()
                                dtHeaderMenu('mi perfil')
                            }}
                        >
                            <IMGS alt="" src={mi_perfil.src} />
                            <span>Mi perfil</span>
                        </StyledLinkContent>
                    </Link>
                    <Link href={PATHS.CUENTA_RECARGA.url} legacyBehavior>
                        <StyledLinkContent
                            className={classNames({ active: pathname === PATHS.CUENTA_RECARGA.url })}
                            onClick={() => {
                                dtHeaderMenu('recargar')
                                handleOpenAway()
                            }}
                        >
                            <IMGS alt="" src={recargar.src} />
                            <span>Recargar</span>
                        </StyledLinkContent>
                    </Link>
                    {!!user?.verified && (
                        <Link href={PATHS.CUENTA_RETIRO.url} legacyBehavior>
                            <StyledLinkContent
                                className={classNames({ active: pathname === PATHS.CUENTA_RETIRO.url })}
                                onClick={() => {
                                    dtHeaderMenu('retirar')
                                    handleOpenAway()
                                }}
                            >
                                <IMGS alt="" src={retirar.src} />
                                <span>Retirar</span>
                            </StyledLinkContent>
                        </Link>
                    )}
                    <Link href={PATHS.HISTORIAL_SALDO.url} legacyBehavior>
                        <StyledLinkContent
                            className={classNames({ active: pathname === PATHS.HISTORIAL_SALDO.url })}
                            onClick={() => {
                                dtHeaderMenu('historial de saldo')
                                handleOpenAway()
                            }}
                        >
                            <IMGS alt="" src={Historial_de_saldo.src} />
                            <span>Historial de saldo</span>
                        </StyledLinkContent>
                    </Link>
                    <Link href={PATHS.MIS_APUESTAS_DEPORTIVAS.url} legacyBehavior>
                        <StyledLinkContent
                            className={classNames({ active: pathname === PATHS.MIS_APUESTAS_DEPORTIVAS.url })}
                            onClick={() => {
                                dtHeaderMenu('mis apuestas deportivas')
                                handleOpenAway()
                            }}
                        >
                            <IMGS alt="" src={Mis_apuestas.src} />
                            <span>Mis apuestas deportivas</span>
                        </StyledLinkContent>
                    </Link>
                    <Link href={PATHS.CUENTA_BONOS_Y_TORNEOS_BONOS.url} legacyBehavior>
                        <StyledLinkContent
                            $socketBonusActive={socketBonusActive}
                            className={classNames({ active: pathname === PATHS.CUENTA_BONOS_Y_TORNEOS_BONOS.url })}
                            onClick={() => {
                                handleCloseAnimated()
                                dtHeaderMenu('mis bonos y torneos')
                                handleOpenAway()
                            }}
                        >
                            <IMGS alt="" src={Bonos_y_tor.src} />
                            <span>Mis bonos y torneos</span>
                        </StyledLinkContent>
                    </Link>
                    <Link href={PATHS.MIS_NOTIFICACIONES.url} legacyBehavior>
                        <StyledLinkContent
                            className={classNames({ active: pathname === PATHS.MIS_NOTIFICACIONES.url })}
                            href={PATHS.MIS_NOTIFICACIONES.url}
                            onClick={() => {
                                dtHeaderMenu('mis notificaciones')
                                handleOpenAway()
                            }}
                        >
                            <IMGS alt="" src={Notificaciones.src} />
                            <span>Mis notificaciones</span>
                        </StyledLinkContent>
                    </Link>
                    <a onClick={handleOnClickToogleSaldo}>
                        <IMGS alt="" src={Ocultar_saldo.src} />
                        {valueSaldo ? 'Ocultar' : 'Mostrar'} saldo
                    </a>
                    <a
                        className="logout"
                        onClick={() => {
                            handleOpenAway()
                            handleLogout()
                        }}
                    >
                        <IMGS alt="" src={cerrar_sesion.src} />
                        <span>Cerrar sesion</span>
                    </a>
                </div>
            </Styled>
        </>
    )
}

interface PropsStyled {
    $isOpenUserMenu?: boolean
    $socketBonusActive?: boolean
}
const IMGS = styled.img`
    & {
        max-width: 1.4rem;
    }
`
const StyledLinkContent = styled.a<PropsStyled>`
    &&& {
        ${(p) => {
            if (p.$socketBonusActive) {
                return css`
                    > .user-menu-icono {
                        position: relative;
                        ::after {
                            content: '';
                            z-index: 2;
                            width: 8px;
                            height: 8px;
                            position: absolute;
                            top: -3px;
                            left: calc(100% - 4px);
                            border-radius: 50%;
                            background: #ff0000;
                            border: 1px solid #ff0000;
                            animation-name: pulseBadged;
                            animation-duration: 1.5s;
                            animation-iteration-count: infinite;
                            @keyframes pulseBadged {
                                0% {
                                    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7), 0 0 0 0 rgba(255, 0, 0, 0.7);
                                }
                                40% {
                                    box-shadow: 0 0 0 6px rgba(255, 0, 0, 0), 0 0 0 0 rgba(255, 0, 0, 0.7);
                                }
                                80% {
                                    box-shadow: 0 0 0 6px rgba(255, 0, 0, 0), 0 0 0 2px rgba(255, 0, 0, 0);
                                }
                                100% {
                                    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0), 0 0 0 3px rgba(255, 0, 0, 0);
                                }
                            }
                        }
                    }
                `
            }
        }}
        &.active {
            position: relative;
            border-radius: 8px;
            border: 3px solid ${(p) => p.theme.layout.header.mas.background};
            background: ${(p) => p.theme.layout.header.mas.background};

            img {
                filter: brightness(0) invert(1);
            }
        }
    }
`

const Styled = styled.div<PropsStyled>`
    position: absolute;
    font-size: 1em;
    top: calc(100% + 20px);
    z-index: 999999 !important;
    height: auto;
    pointer-events: visible;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    transition: transform 30ms linear 40ms, opacity 40ms linear, right 40ms, top 40ms, pointer-events 40ms linear 40ms;
    opacity: 0;
    /* right: -10px; */
    top: calc(100% - 2px);
    pointer-events: none;
    z-index: -1;
    right: initial;
    left: 50%;
    transform: scale(0.99) translateX(-50%);
    &::before {
        content: '';
        height: 4rem;
        position: absolute;
        background: transparent;
        width: 100%;
        z-index: 1;
        top: -4rem;
    }
    &::after {
        transition: 0.15;
        border-bottom-right-radius: 0.2em;
        content: '';
        position: absolute;
        bottom: calc(100% - 7px);
        right: 20px;
        content: '';
        display: block;
        position: absolute;
        width: 15px;
        height: 15px;
        background: ${(p) => p.theme.layout.header.mas.background};
        pointer-events: none;
        right: calc(50% - 10px);
        z-index: -1;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        ${MEDIA_QUERIES.min_width.mobileL} {
            right: 12px;
        }
        transform: translateX(50%);
        -moz-transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
    }

    ${(p) => {
        if (p.$isOpenUserMenu) {
            return css`
                transform: scale(1) translateX(-50%);
                opacity: 1;
                left: 0%;
                top: calc(100% + 12px);
                pointer-events: all;
            `
        }
    }}

    ${MEDIA_QUERIES.min_width.mobileL} {
        right: -3px;
        left: initial;
        transform: none;
    }
    & {
        .wrapper {
            display: flex;
            flex-direction: column;
            position: relative;
            background: ${(p) => p.theme.layout.header.mas.background};
            padding: 6px;
            gap: 3px;
            justify-content: flex-start;
            overflow: scroll;
            overflow: overlay;
            max-height: calc(80vh);
            min-width: 300px;
            overflow: auto;
            border-radius: 10px;
            overflow: hidden;

            ::-webkit-scrollbar {
                width: 20px;
                height: 20px;
            }
            ::-webkit-scrollbar-thumb {
                background-color: transparent;
                border: 6px solid transparent;
                border-radius: 11rem;
                box-shadow: 16px 16px 16px 16px rgba(0, 0, 0, 0.25) inset;
            }
            ::-webkit-scrollbar-track {
                position: absolute;
                right: -3rem;
                top: -5rem;
                /* background: ${(p) => p.theme.palette.light.main};
                border: 1px solid ${(p) => p.theme.palette.alternate14.main};
                box-shadow: 16px 16px 16px 16px rgba(0, 0, 0, 0.05) inset; */
            }
            a {
                position: relative;
                font-weight: 400;
                padding: 12px 15px;
                border-bottom-color: transparent;
                color: ${(p) => p.theme.contrastText};
                transition: 0.15;
                display: flex;
                align-items: center;
                gap: calc(0.5em + 0.5vw);
                min-width: max-content;

                > span {
                    flex: 1;
                    white-space: normal;
                    max-width: 200px;
                }

                svg {
                    font-size: 1.4rem;
                    position: relative;
                    bottom: 1px;
                }
                &:first-of-type {
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
                &:last-of-type {
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    color: ${(p) => p.theme.palette.primary.main};
                    font-weight: 500;
                    background: ${(p) => p.theme.background};
                }
                :hover {
                    background: ${(p) => p.theme.palette.primary.main};
                    color: ${(p) => p.theme.palette.light.main};
                    img {
                        filter: brightness(0) invert(1);
                    }
                }
                &.verify {
                    background: ${(p) => p.theme.palette.linkPink.main};
                    color: ${(p) => p.theme.palette.primary.main};
                    .verify-wrapper {
                        position: relative;
                        display: flex;
                        align-items: center;
                        .shield {
                            position: absolute;
                            right: -0.25rem;
                            bottom: 0;
                            font-size: 0.9rem;
                        }
                    }

                    :hover {
                        background: ${(p) => p.theme.palette.primary.main};
                        color: ${(p) => p.theme.palette.light.main};
                    }
                }
            }
        }
    }
`
