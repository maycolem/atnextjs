/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'
import { DEVICE_SIZE } from 'styles/DEVICE_SIZE'
import { Menu } from './index'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useRouter } from 'next/router'
import { ModalLogoutRedirect } from 'layout/ModalLogoutRedirect/ModalLogoutRedirect'
import Head from 'next/head'
import styled, { css } from 'styled-components'
import useMediaQueryAT from '@hooks/useMediaQueryAT'
import { Logo, ExternalLink } from '@layout/index'
import { SnackBar } from '@components/SnackBars'
import { ModalRecarga } from '@layout/ModalRecarga'
import { ModalPromo } from '@layout/ModalPromo'
import { ModalLogin } from '@layout/ModalLogin'
import { ModalPromoRegaloLogin } from '@layout/ModalPromoRegaloLogin'
import { User } from '@layout/User'
import { Hamburguer } from './Hamburguer'
import { ButtonUp } from './ButtonUp'
import { Footer } from './Footer'
import { Meta } from '@components/Meta'
import { ModalPromoRegaloFinDeAño } from './ModalPromoRegaloFinDeAño'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import { ModalSearchCasino } from './ModalSearchCasino/ModalSearchCasino'
import { useAppDispatch } from '@states/store'
import { setOpen } from '@states/features/slices/CasinoModalSlice'
import AnunciosAT from '@components/shared/anuncios-at/AnunciosAT'

export const Layout = ({ children }) => {
    const router = useRouter()
    const [isPannelCuenta, setIsPannelCuenta] = useState(false)
    const dispatch = useAppDispatch()
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    const showSearchButtonHeader = router.pathname.includes('/casino') || router.pathname.includes('/juegos-virtuales')
    const [showAnuntio, setShowAnuntio] = useState(true)
    useEffect(() => {
        if ('pathname' in router && router.pathname.includes('/cuenta')) {
            setIsPannelCuenta(true)
        }
    }, [router])

    const handleOpenSearchModal = () => {
        dispatch(setOpen())
    }

    return (
        <>
            <Meta>
                <script
                    src="https://8916704f-dcea-4aec-a5f1-aea63f4eed6d.snippet.antillephone.com/apg-seal.js"
                    type="text/javascript"
                ></script>
            </Meta>
            <Styled>
                <StyledHeader id="layout-default-at-apuesta">
                    <div className="top">
                        <div className="top-left">
                            <Logo></Logo>
                            {desktopS ? <ExternalLink></ExternalLink> : null}
                        </div>
                        <div className="right">
                            <User />
                        </div>
                        {/* {showSearchButtonHeader && (
                            <div>
                                <IconButton
                                    aria-label="Icono buscar para móvil"
                                    onClick={handleOpenSearchModal}
                                    style={{ color: '#000', marginRight: '-10px' }}
                                >
                                    <SearchIcon fontSize="large" />
                                </IconButton>
                            </div>
                        )} */}
                        {!desktopS ? (
                            <div className="right-hamburguer">
                                <Hamburguer />
                            </div>
                        ) : null}
                    </div>
                    {desktopS ? (
                        <div className="bottom">
                            <Menu />
                        </div>
                    ) : null}
                </StyledHeader>
                <AnunciosAT show={showAnuntio} setShow={setShowAnuntio} />

                <StyledMain id="layout-main-content" $isPannelCuenta={isPannelCuenta}>
                    {children}
                </StyledMain>

                <Footer />

                <ButtonUp />
            </Styled>
            {/* MODAL PARA EL LOGIN */}
            <ModalLogin />
            {/* MODAL PARA EL LOGIN */}

            {/* MODAL PARA CUANDO FORZAMOS EL CIERRE DE SESSION DEL USUARIO  */}
            <ModalLogoutRedirect />
            {/* MODAL PARA CUANDO FORZAMOS EL CIERRE DE SESSION DEL USUARIO  */}

            {/* PROMOS REGALO POR MUNDIAL */}
            <ModalPromo />
            <ModalPromoRegaloLogin />
            <ModalPromoRegaloFinDeAño />
            {/* PROMOS REGALO POR MUNDIAL */}

            {/* DEFAULTS LAYOUTS MODALS & SNACKBARDS ALERTS */}
            <ModalRecarga />
            <SnackBar />
            {/* DEFAULTS LAYOUTS MODALS & SNACKBARDS ALERTS */}

            {/* MODAL PARA BÚSQUEDA CASINO EN MOBILE */}
            {/* <ModalSearchCasino /> */}
            {/* MODAL PARA BÚSQUEDA CASINO EN MOBILE */}
        </>
    )
}

interface PropsStyled {
    $isPannelCuenta?: boolean
    $visibleBottonTop?: boolean
    $autoHideDuration?: number
}

const StyledHeader = styled.div`
    & {
        position: sticky;
        top: 0;
        background: ${(x) => x.theme.background};
        color: ${(x) => x.theme.contrastText};
        z-index: 10;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 14px;
        border-bottom: 2px solid ${(x) => x.theme.primary};
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        > .top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            /* align-items: center; */
            gap: 0.5rem;
            > .top-left {
                display: flex;
                align-items: center;
                gap: calc(2rem + 2vw);
                margin-right: 0.5rem;
            }
            > .right {
                margin-left: auto;
                display: grid;
                place-items: center;
                height: inherit;
                min-height: inherit;
            }
            > .right-hamburguer {
                height: inherit;

                min-height: inherit;
            }
        }
        > .bottom {
            width: 100%;
            max-width: 800px;
        }

        ${MEDIA_QUERIES.min_width.desktopS} {
            > .top {
                padding-bottom: 0;
            }
        }
    }
`

const Styled = styled.div`
    position: relative;
    margin: auto;
    width: 100%;
    min-width: 360px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${(p) => p.theme.background};
`

const StyledMain = styled.div<PropsStyled>`
    flex: 1;
    position: relative;
    z-index: 5;
    background: ${(p) => p.theme.background};
    color: ${(p) => p.theme.contrastText};
    width: 100%;
    max-width: 1920px;
    margin: auto;
    overflow: hidden;
    padding: 0 14px;

    ${(p) => {
        if (p.$isPannelCuenta) {
            return css``
        }
    }}
`
