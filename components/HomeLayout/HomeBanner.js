import styled from '@emotion/styled'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { useEffect, useState } from 'react'
import { Button, useMediaQuery } from '@mui/material'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import useGetWidthScrollBar from 'hooks/useGetWidthScrollBar'
import Slider from 'react-slick'
import axios from 'axios'
import { useRouter } from 'next/router'
import { DEVICE_PX, DEVICE_SIZE } from 'styles/DEVICE_SIZE'
import useWindowSize from 'hooks/useWindowSize'
import { useGetBannersQuery } from 'states/calimaco/calimacoContentApi'
import { css } from 'styled-components'
import useMediaQueryAT from 'hooks/useMediaQueryAT'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import { GoogleTagManager } from 'google/TagManager'

const SETTINGS_DEFAULT = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
}
const HomeBanner = () => {
    const { scrollBardWidth } = useGetWidthScrollBar()
    const [settings, setSettings] = useState(SETTINGS_DEFAULT)
    const router = useRouter()
    const tabletS = useMediaQueryAT(MEDIA_QUERIES.min_width.tabletS)
    const [container, setContainer] = useState('')
    const { data, isLoading, isFetching } = useGetBannersQuery({ container }, { skip: !container })
    const arrayOfBanners = []

    let drag = false
    useEffect(() => {
        let mounted = true
        if (tabletS) {
            if (mounted) {
                setContainer('HOME_CENTRAL')
            }
        } else {
            if (mounted) {
                setContainer('HOME_CENTRALMOVIL')
            }
        }
        return () => (mounted = false)
    }, [tabletS])
    const handleOnclick = (url) => {
        // window.open(url, '_blank')
        router.push(url)
    }
    if ((isLoading, isFetching)) {
        return <LoadingDefault loading={isLoading}></LoadingDefault>
    }

    const dtBannerView = (name) => {
        if (!arrayOfBanners.includes(name)) {
            arrayOfBanners.push(name)
            GoogleTagManager?.push({ event: 'atm.event', title: name?.toLowerCase(), eventName: 'banner_view' })
        }
    }
    const dtBannerClick = (name) => {
        GoogleTagManager?.push({ event: 'atm.event', title: name?.toLowerCase(), eventName: 'banner_click' })
    }
    return (
        <>
            <HomeBannerS className="react-slick-at" scrollBardWidth={scrollBardWidth}>
                <SliderS {...settings} appendDots={(dots) => <CustomDotsS>{dots}</CustomDotsS>}>
                    {data?.banners?.map(({ config }, i) => (
                        <SliderSlideS
                            $sombras={config?.title}
                            key={i}
                            onClick={() => dtBannerClick(config?.image)}
                            onLoad={() => dtBannerView(config?.image)}
                            onMouseDown={() => (drag = false)}
                            onMouseMove={() => (drag = true)}
                            onMouseUp={() => {
                                if (!drag) {
                                    if (config?.button_text) {
                                        if (config?.url) {
                                            handleOnclick(config?.url ?? '')
                                        }
                                    }
                                }
                            }}
                        >
                            <img alt="Banner Apuesta Total" src={`${process.env.REACT_APP_WEB_BASE}/${config.image}`}></img>
                            <WrapperAbsoluteS>
                                {config?.title && (
                                    <div className="content-title">
                                        <TitleS>
                                            <span className="left">{config?.title?.split('$$')[0]}</span>
                                            <span className="right">{config?.title?.split('$$')[1]}</span>
                                        </TitleS>
                                    </div>
                                )}
                                {config?.body && (
                                    <BodyS>
                                        <div className="top">{config?.body}</div>
                                    </BodyS>
                                )}
                                {config?.button_text && config?.url && (
                                    <div className="content-button">
                                        <ButtonS
                                            onMouseDown={() => (drag = false)}
                                            onMouseMove={() => (drag = true)}
                                            onMouseUp={() => {
                                                if (!drag) {
                                                    if (config?.url) {
                                                        handleOnclick(config?.url ?? '')
                                                    }
                                                }
                                            }}
                                            variant="contained"
                                        >
                                            <span>{config?.button_text}</span>
                                        </ButtonS>
                                    </div>
                                )}
                            </WrapperAbsoluteS>
                        </SliderSlideS>
                    ))}
                </SliderS>
            </HomeBannerS>
        </>
    )
}

export default HomeBanner
const WrapperAbsoluteS = styled.div`
    & {
        z-index: 2;
        position: absolute;
        /* bottom: 30px; */
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        /* gap: 18px; */
        height: 100%;
        top: 0;
        padding: 1rem;
        gap: 10px;
        > .content-title {
            flex: 4;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        > .content-button {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }
        ${MEDIA_QUERIES.min_width.tabletL} {
            transform: translateX(0);
            left: 0;
            align-items: flex-start;
            padding-left: 50px;
            /* gap: 25px; */
        }

        ${MEDIA_QUERIES.min_width.desktopM} {
            padding-bottom: 2rem;
        }
        ${MEDIA_QUERIES.min_width.desktopXXL} {
            padding-bottom: 3rem;
        }
    }
`
const ButtonS = styled(Button)`
    & {
        padding: 8px 28px;
        z-index: 5;
        width: fit-content;

        span:first-of-type {
            text-transform: capitalize;
            text-decoration: underline;
            font-size: 1em;
            font-weight: 700;
            margin-right: 3px;
        }
    }
`

const TitleS = styled.div`
    color: white;
    z-index: 2;
    font-size: 1.3rem;
    font-weight: 700;
    transform: scaleY(1.4) scaleX(0.8) skew(-25deg) rotate(-5deg);
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 12px;
    right: 0;
    ${MEDIA_QUERIES.min_width.tabletL} {
        right: 1.7rem;
        font-size: 1.7rem;
    }
    ${MEDIA_QUERIES.min_width.desktopS} {
        right: 2rem;
        font-size: 2rem;
    }
    ${MEDIA_QUERIES.min_width.desktopM} {
        right: 2.2rem;
        font-size: 2.2rem;
    }
    ${MEDIA_QUERIES.min_width.desktopL} {
        right: 2.4rem;
        font-size: 2.4rem;
    }
    ${MEDIA_QUERIES.min_width.desktopXXL} {
        right: 2.8rem;
        font-size: 2.8rem;
    }
    .left,
    .right {
        white-space: nowrap;
        word-spacing: 8px;
    }
    .right {
        margin-top: -0.9rem;
        margin-left: 4.8rem;
        color: ${(p) => p.theme.palette.primary.main};
    }
`
const BodyS = styled.div`
    color: white;
    z-index: 2;
    width: 100%;
    max-width: 300px;
    text-align: center;
    font-size: 0.9rem;
    ${MEDIA_QUERIES.min_width.tabletL} {
        text-align: left;
    }
`

const HomeBannerS = styled.div`
    position: relative;
    display: flex;
    overflow: hidden;
`
const SliderS = styled(Slider)`
    width: 100%;
    padding-bottom: 35px;
`
const SliderSlideS = styled.div`
    & {
        cursor: pointer;
        display: block !important;
        position: relative;
        height: auto;
        /* max-height: 415px; */
        ${(p) => {
            if (p.$sombras) {
                return css`
                    ::after {
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(to top, rgba(0, 0, 0, 0.884534534), transparent);
                        bottom: 0;
                    }
                `
            }
        }}
        img {
            object-fit: cover;
            display: block;
        }

        ${MEDIA_QUERIES.min_width.tabletL} {
            /* height: 375px;
      max-height: 375px; */
            ${(p) => {
                if (p.$sombras) {
                    return css`
                        ::after {
                            position: absolute;
                            content: '';
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(to right, rgba(0, 0, 0, 0.884534534), transparent);
                            bottom: 0;
                        }
                    `
                }
            }}
        }
    }
`
const CustomDotsS = styled.div`
    display: flex;
    justify-content: center;
    height: 25px;
    align-items: center;
    bottom: 0 !important;
    & {
        li {
            display: flex;
            align-items: center;
            margin: 0;
            justify-content: center;
            width: 25px;
            pointer-events: none;
            height: 100%;

            button {
                width: 100%;
                height: 100%;
                pointer-events: all;
                padding: 0;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
                ::before {
                    content: '' !important;
                    position: relative;
                    border-radius: 50%;
                    opacity: 1 !important;
                    width: 7px !important;
                    height: 7px !important;
                    background: ${(p) => p.theme.palette.alternate8.main};
                }
            }
        }
        li.slick-active {
            width: 35px;
            button {
                padding: 0 5px;
                ::before {
                    width: 100% !important;
                    border-radius: 10px;
                    background: ${(p) => p.theme.palette.primary.main};
                }
            }
        }
    }
`
