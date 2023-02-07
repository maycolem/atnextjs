/* eslint-disable eqeqeq */
import { Breadcrumbs, Button, useMediaQuery } from '@mui/material'
import UserResumen from 'layout/components/shared/UserResumen'
import { Layout } from '@layout/index'
import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CloseIcon from '@mui/icons-material/Close'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import UserMenu from './UserMenu'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { PannelBackArrowURLSelector } from 'states/slice/layout/PannelBackArrowURL'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import { userSelector } from 'states/features/slices/userSlice'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import { Parser } from 'html-to-react'
import { VerifyMessageSelector, set as setVerify } from 'states/slice/layout/VerifyMessage'
import { useTranslation } from 'react-i18next'
import useHeightHeader from '@hooks/useHeightHeader'

interface OverrideNextRouter extends NextRouter {
    backReferrer: string
}

const GlobalCssOverride = createGlobalStyle`
   #layout-main-content{
    background: white;
   }
  `
const LayoutUserPanel = ({ children }) => {
    const user = useSelector(userSelector)
    const { data: verificar } = useGetFragmentQuery(
        { company: 'ATP', session: user?.session, fragment: 'VERIFICA_TU_CUENTA' },
        {
            skip: !!user?.verified,
        }
    )
    const { backURL } = useSelector(PannelBackArrowURLSelector)
    const desktopS = useMediaQuery(MEDIA_QUERIES.min_width.desktopS)
    const disptach = useDispatch()
    const [scrumbs, setScrumbs] = useState([])
    const router = useRouter() as OverrideNextRouter
    const { isVerify } = useSelector(VerifyMessageSelector)
    const { asPath } = useRouter()
    const { t } = useTranslation()
    const { heightHeader } = useHeightHeader()

    useEffect(() => {
        if (asPath) {
            const ruta = asPath
                .trim()
                .split('/')
                .filter((i) => i ?? '')
                .map((i) => {
                    if (i && typeof i !== 'undefined' && typeof i === 'string') {
                        return i.replace(/-/g, ' ')
                    }
                    return ''
                })
                .slice(1)

            if (ruta?.includes('mybets')) {
                setScrumbs(ruta?.slice(0, 1))
                return
            }
            setScrumbs(ruta)
        }
    }, [asPath])

    const handleOnClick = () => {
        disptach(setVerify(false))
    }
    const handleOnClickVerify = async () => {
        disptach(setVerify(false))
        await router.push({
            pathname: PATHS.CUENTA_VERIFICAR.url,
        })
    }
    return (
        <Layout>
            <Styled $heightHeader={heightHeader}>
                {!desktopS && (
                    <BackAndCloseS>
                        <Link href={backURL ?? ''}>
                            <StyledButton $backURL={backURL} className={classNames('back')} variant="outlined">
                                <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                            </StyledButton>
                        </Link>
                        <LocationS>{scrumbs[0] ?? ''}</LocationS>
                        <Link href={router?.backReferrer || PATHS.HOME.url} legacyBehavior>
                            <Button className="close" variant="contained">
                                <CloseIcon></CloseIcon>
                            </Button>
                        </Link>
                    </BackAndCloseS>
                )}
                <SideBarS>
                    <UserResumen />
                    {desktopS && <DivierS></DivierS>}
                    {desktopS && <UserMenu />}
                </SideBarS>
                <StyledMainContent>
                    {desktopS && (
                        <BackAndDesktopCloseS className="close">
                            <div className="top">
                                <Link href={backURL ?? ''} legacyBehavior>
                                    <StyledButton $backURL={backURL} className={classNames('button')} variant="outlined">
                                        <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                                        <span>Atras</span>
                                    </StyledButton>
                                </Link>
                                <Link href={router?.backReferrer || PATHS.HOME.url} legacyBehavior>
                                    <Button className="button" variant="contained">
                                        <span>Cerrar</span>
                                        <CloseIcon></CloseIcon>
                                    </Button>
                                </Link>
                            </div>
                            <div className="bottom">
                                <BreadcrumbsS aria-label="breadcrumb">
                                    {scrumbs?.map((item, i) => {
                                        // TODO: TRADUCE CHAMO
                                        return (
                                            <p className="" key={i}>
                                                {t(item)}
                                            </p>
                                        )
                                    })}
                                </BreadcrumbsS>
                            </div>
                        </BackAndDesktopCloseS>
                    )}
                    <div className="wrapper-maincointent">{children}</div>
                </StyledMainContent>
            </Styled>
            {isVerify && user?.verified === 0 && (
                <AlertSVerifyAccountS>
                    <div className="content-text">
                        <div className="icon">
                            <WarningAmberIcon></WarningAmberIcon>
                            {!desktopS && <span className="title">Verifica tu cuenta</span>}
                        </div>
                        <p className="text">{Parser().parse(verificar)}</p>
                        <div className="accions">
                            <Button onClick={handleOnClick} variant="outlined">
                                Verificar más tarde
                            </Button>
                            <Button onClick={handleOnClickVerify} variant="contained">
                                Verificar aquí
                            </Button>
                        </div>
                    </div>
                </AlertSVerifyAccountS>
            )}
            <GlobalCssOverride />
        </Layout>
    )
}

export default LayoutUserPanel
interface StyledProps {
    $heightHeader?: number
    $backURL?: string
}
const DivierS = styled.div`
    & {
        /* margin-top: 1rem; */
        background: ${(p) => p.theme.palette.alternate8.main};
        height: 1px;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
`
const StyledButton = styled(Button)<StyledProps>`
    & {
        ${(p) => {
            if (!p.$backURL || p.$backURL == '') {
                return css`
                    opacity: 0;
                `
            }
        }}
    }
`
const BreadcrumbsS = styled(Breadcrumbs)`
    & {
        li:last-of-type {
            color: ${(p) => p.theme.palette.alternate5.main};
            font-weight: 500;
        }
        p {
            text-transform: lowercase;
            ::first-letter {
                text-transform: capitalize;
            }
        }
    }
`
const BackAndDesktopCloseS = styled.div`
    & {
        min-height: 50px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-bottom: 1rem;
        background: white;
        > .top {
            display: flex;
            justify-content: space-between;
            > .button {
                right: 0;
                top: 0;
                border-radius: 0;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                text-transform: capitalize;
                padding: 2px 1rem;
                font-weight: 400;
                box-shadow: none;
                > svg {
                    font-size: 0.9rem;
                }
            }
        }
        > .bottom {
            padding: 0rem 1rem;
        }
    }
`
const AlertSVerifyAccountS = styled.div`
    & {
        padding-left: 14px;
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 99;
        backdrop-filter: blur(2px);
        > .content-text {
            background: ${(p) => p.theme.palette.linkPink.main};
            padding: 4rem 3rem;
            padding-bottom: 8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            > .text {
                font-size: 1rem;
                line-height: 1.6;
                text-align: center;
            }
            > .accions {
                display: flex;
                gap: 1rem;
                width: 100%;
                > button {
                    flex: 1;
                    padding: 0.8rem 1rem;
                    text-transform: capitalize;
                    font-size: 1rem;
                }
            }
            > .icon {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                > .title {
                    font-size: 1.2rem;
                    color: ${(p) => p.theme.palette.primary.main};
                }
                svg {
                    font-size: 3rem;
                    color: ${(p) => p.theme.palette.primary.main};
                }
            }
        }
        ${MEDIA_QUERIES.min_width.desktopS} {
            padding: 0;
            top: 0;
            > .content-text {
                padding: 1rem 50px;
                flex-direction: row;
                > .text {
                    text-align: left;
                    line-height: 1.4;
                }
                > .accions {
                    flex: 0 1 30%;
                    > button {
                        white-space: nowrap;
                        flex: 0 1 50%;
                        padding: 0.8rem 2rem;
                        text-transform: capitalize;
                        font-size: 1rem;
                    }
                }
            }
        }
    }
`
const StyledMainContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    background: white;
    min-height: 600px;
    > .wrapper-maincointent {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
`
const Styled = styled.div<StyledProps>`
    display: grid;
    grid-template-columns: 1fr;
    flex: 1;
    grid-template-rows: auto auto 1fr;
    min-height: inherit;
    margin-bottom: 2rem;

    ${(p) => {
        if (p.$heightHeader) {
            const minHeight = `calc(100vh - ${p.$heightHeader}px)`
            return css`
                min-height: ${minHeight};
            `
        }
    }}

    ${MEDIA_QUERIES.min_width.desktopS} {
        grid-template-columns: 0.3fr 1fr;
        grid-template-rows: 1fr;
    }
    ${MEDIA_QUERIES.min_width.desktopL} {
        grid-template-columns: 0.25fr 1fr;
    }
`
const SideBarS = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding-top: 1rem;
        border-right: 1px solid ${(p) => p.theme.palette.alternate8.main};
    }
`
const BackAndCloseS = styled.div`
    background: white;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 1rem 14px;
    padding-bottom: 0.5rem;
    align-items: center;

    .MuiButton-root {
        border-radius: 0;
        padding: 0.3rem;
        line-height: 1;
        min-width: initial;
        svg {
            color: red;
            font-size: 2.5rem;
            font-size: 1.8rem;
        }
    }
    .MuiButton-root.close {
        svg {
            color: white;
        }
    }
`

const LocationS = styled.div`
    & {
        font-size: 0.95rem;
        display: block;
        ::first-letter {
            text-transform: capitalize;
        }
    }
`
