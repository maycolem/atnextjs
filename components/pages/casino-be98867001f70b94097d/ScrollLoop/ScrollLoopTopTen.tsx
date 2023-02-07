import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React, { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'
import rayo from '../assets/sliders/rayo.png'
import bannerMock from '../assets/fake/banner-mock.png'
import LobbyTitle from '../LobbySlides/LobbyTitle'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import hexAlpha from 'hex-alpha'
import useMediaQueryAT from '@hooks/useMediaQueryAT'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
export const ScrollLoopTopTen = ({
    aspectRatio,
    width,
    gap,
    data,
    pathImg = 'logo',
    hiddenTitle = false,
    title = '',
    setAnimatedNoMoreLobbies = (value) => null,
}) => {
    const router = useRouter()
    const pathname = '/casino/[provider]/[gameName]'
    if (!data) {
        return <LoadingDefault loading={true}></LoadingDefault>
    }

    const [heightSlider, setHeightSlider] = useState(0)
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    const [showButtonLeft, setShowButtonLeft] = useState(false)
    const [showButtonRight, setShowButtonRight] = useState(false)
    const [refScroll, setRefScroll] = useState<HTMLDivElement>()
    if (!data || data.length < 1) {
        return null
    }

    let drag = false

    useEffect(() => {
        if (refScroll) {
            const ContainerElement = refScroll
            const x = ContainerElement?.scrollLeft || 0
            const y = ContainerElement?.scrollTop || 0
            if (x === 0) {
                setShowButtonLeft(false)
            }
            if (x > 200) {
                setShowButtonLeft(true)
            }
            if (Math.abs(ContainerElement.scrollLeft) === ContainerElement.scrollWidth - ContainerElement.clientWidth) {
                setShowButtonRight(false)
            } else {
                setShowButtonRight(true)
            }
            ContainerElement.onscroll = function (e) {
                const x = ContainerElement.scrollLeft
                const y = ContainerElement.scrollTop
                if (x === 0) {
                    setShowButtonLeft(false)
                }
                if (x > 200) {
                    setShowButtonLeft(true)
                }
                // SI LLEGO AL LIMITE TRUE
                const resta = ContainerElement.scrollLeft - (ContainerElement.scrollWidth - ContainerElement.clientWidth)
                if (
                    Math.abs(resta) < 50 ||
                    Math.abs(ContainerElement.scrollLeft) === ContainerElement.scrollWidth - ContainerElement.clientWidth
                ) {
                    setShowButtonRight(false)
                    setAnimatedNoMoreLobbies(true)
                } else {
                    setShowButtonRight(true)
                    setAnimatedNoMoreLobbies(false)
                }
            }
        }
    }, [refScroll])
    const handlePlay = async (provider, name) => {
        await router.push({
            pathname,
            query: {
                provider: provider,
                gameName: name,
            },
        })
    }

    if (!data) {
        return <LoadingDefault loading={true}></LoadingDefault>
    }

    return (
        <div>
            <LobbyTitle
                // animatedNoMoreLobbies={animatedNoMoreLobbies}
                onClickShowAll={() => {
                    router.push(PATHS.CASINO.url)
                }}
                title={title}
                image={rayo.src}
            />
            <ContainerScrollStyled>
                <>
                    {showButtonLeft && (
                        <ButtonArrowS
                            className="left"
                            onClick={() => {
                                if (refScroll) {
                                    const ContainerElement = refScroll
                                    const back = ContainerElement.scrollLeft - 500
                                    const aument = (window.innerWidth / 100) * 15
                                    ContainerElement.scroll({
                                        top: 0,
                                        left: back - aument,
                                        behavior: 'smooth',
                                    })
                                }
                            }}
                        >
                            <ArrowBackIosNewIcon />
                        </ButtonArrowS>
                    )}
                    {showButtonRight && (
                        <ButtonArrowS
                            className="right"
                            onClick={() => {
                                if (refScroll) {
                                    const ContainerElement = refScroll
                                    const back = ContainerElement.scrollLeft - 500
                                    const aument = (window.innerWidth / 100) * 15

                                    ContainerElement.scroll({
                                        top: 0,
                                        left: ContainerElement.scrollLeft + 500 + aument,
                                        behavior: 'smooth',
                                    })
                                }
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </ButtonArrowS>
                    )}
                </>
                <StyledScrollContainer
                    ref={(refCurrent) => setRefScroll(refCurrent)}
                    $aspectRatio={aspectRatio}
                    $width={width}
                    $gap={gap}
                    color="#66FF81"
                >
                    {data?.map((item, i) => {
                        if (i < 10) {
                            return (
                                <StyledScrollItem key={i}>
                                    <span className="order">{i + 1}</span>
                                    <div className="card-box" onClick={() => handlePlay(item.sub_provider, item.web_name)}>
                                        {/* <img alt="" src={`${process.env.REACT_APP_WEB_BASE}/${item.logo}`} loading="lazy" /> */}
                                        <img alt="" src={bannerMock.src} loading="lazy" />
                                    </div>
                                </StyledScrollItem>
                            )
                        }
                    })}
                </StyledScrollContainer>{' '}
            </ContainerScrollStyled>
        </div>
    )
}

interface StyledProps {
    $aspectRatio?: string
    $width?: number
    $gap?: string
    $color?: string
    $widthOrder?: string
    $ref?: any
}
const ContainerScrollStyled = styled.div`
    position: relative;
`
const ButtonArrowS = styled.div`
    & {
        height: calc(100% - 28px);
        right: -14px;
        z-index: 10;
        position: absolute;
        top: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(p) => p.theme.primary};
        font-weight: 500;
        cursor: pointer;
        transition: 250ms;

        span {
            transition: 150ms;
            transform: scaleY(1.2);
        }

        &::before {
            content: '';
            background: linear-gradient(to right, transparent, ${(p) => p.theme.background});
            left: initial;
            right: 0;
            position: absolute;
            width: 200%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        &.left {
            left: -14px;
            right: initial;
            &::before {
                content: '';
                background: linear-gradient(to left, transparent, ${(p) => p.theme.background});
                right: initial;
                left: 0;
            }
        }

        svg {
            transition: 250ms;
            font-size: calc(2rem + 1vw);
        }

        ${MEDIA_QUERIES.min_width.desktopS} {
            width: 50px;
            font-size: calc(3rem + 1vw);
            :hover {
                span {
                    transform: scaleY(1.5) scaleX(1.3);
                }
            }
        }
    }
`

const StyledScrollItem = styled.div`
    display: flex;

    > div {
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        transition: 200ms;
        /* box-shadow: 1px 1px 4px #000; */
        flex: 1;

        img {
            object-fit: cover;
        }
    }
    > span.order {
        position: absolute;
        font-weight: 800;
        left: 0;
        z-index: 2;
        font-size: 8rem;
        color: transparent;
        bottom: -0.8rem;
        pointer-events: none;
        -webkit-text-fill-color: ${(p) => hexAlpha(p.theme.background, 0.2)};
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: ${(p) => p.theme.contrastText};
        /* -webkit-text-stroke-color: ${(p) => p.theme.casino.scrollTabButtons.background}; */
    }
    > div.card-box {
        right: 0;
        border-radius: 8px;
        width: 100%;
        padding-left: 15%;
        padding-bottom: 15%;
        transition: 200ms;
        &:hover {
            padding-left: 10%;
            padding-bottom: 10%;
            z-index: 1;
        }
        img {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: ${(p) => hexAlpha(p.theme.casino.slider.shadow, 0.1)} 0px 3px 6px;
        }
    }

    /* > div.card-box > img {
        border-radius: 6px;
    } */
`
const StyledScrollContainer: any = styled(ScrollContainer)<StyledProps>`
    && {
        position: relative;
        display: flex;
        gap: 0.8rem;
        min-width: 100%;
        padding: 14px;
        width: calc(100% + 28px);
        right: 14px;
        margin-bottom: -20px;

        ${StyledScrollItem} {
            flex: 0 0 ${(p) => p.$width}%;
            aspect-ratio: ${(p) => p.$aspectRatio};
            max-width: ${(p) => p.$width * 6}px;
            flex: 1 0 40%;
            max-width: 220px;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
        }
    }
`
