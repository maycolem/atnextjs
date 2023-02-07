import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React, { useEffect, useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'
import { LobbyCardRelease } from '../LobbySlides/LobbyCardRelease'
import gif from '../assets/sliders/gif.png'
import LobbyTitle from '../LobbySlides/LobbyTitle'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import hexAlpha from 'hex-alpha'
import useMediaQueryAT from '@hooks/useMediaQueryAT'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

export const ScrollLoop = ({
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

    return (
        <div>
            <LobbyTitle
                // animatedNoMoreLobbies={animatedNoMoreLobbies}
                onClickShowAll={() => {
                    router.push(PATHS.CASINO.url)
                }}
                title={title}
                image={gif.src}
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
                <StyledScrollContainer ref={(refCurrent) => setRefScroll(refCurrent)} $aspectRatio={aspectRatio} $width={width} $gap={gap}>
                    {data?.map((item, i) => {
                        return (
                            <StyledScrollItem key={i}>
                                <StyledCardWrapper>
                                    <RibbonTopLeft>
                                        <span>Nuevo</span>
                                    </RibbonTopLeft>
                                    <LobbyCardRelease lobby={item} pathname="/casino/[provider]/[gameName]" section="casino" />
                                </StyledCardWrapper>
                            </StyledScrollItem>
                        )
                    })}
                </StyledScrollContainer>
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
    background: ${(p) => p.theme.casino.slider.background};
    box-shadow: ${(p) => hexAlpha(p.theme.casino.slider.shadow, 0.1)} 0px 3px 6px;
    flex: 1 0 40%;
    max-width: 220px;
    border-radius: 12px;
    overflow: hidden;
    > div {
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        transition: 200ms;
        box-shadow: 1px 1px 4px #000;
        flex: 1;
        /* &:hover {
            transform: scale(1.1);
            z-index: 20;
        } */

        > span {
            text-align: center;
            color: black;
        }
        > span.order {
            position: absolute;
            font-weight: 900;
            bottom: -10px;
            left: 0;
            z-index: 2;
            font-size: 7rem;
            font-family: 'Titan One', cursive;
        }

        img {
            object-fit: cover;
        }
    }
`
const StyledScrollContainer: any = styled(ScrollContainer)<StyledProps>`
    position: relative;
    display: flex;
    gap: 0.8rem;
    min-width: 100%;
    padding: 14px;
    width: calc(100% + 28px);
    right: 14px;
`
const StyledCardWrapper = styled.div`
    position: relative;
    /* background: #fff; */
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`
const RibbonTopLeft = styled.div`
    pointer-events: none;
    width: 0px;
    height: 0px;
    padding: 1px;
    position: absolute;
    left: 30px;
    top: 30px;
    overflow: initial;
    z-index: 2;
    & span {
        display: flex;
        justify-content: center;
        color: #000;
        background-color: ${(p) => p.theme.secondary};
        padding: 5px 0;
        font-weight: 500;
        text-align: center;
        transform: translateY(-50%) translateX(-50%) rotate(-45deg);
        width: 200px;
    }
    &::before {
        border-top-color: transparent;
        top: 0;
        right: 0;
    }
    &::after {
        border-left-color: transparent;
        bottom: 0;
        left: 0;
    }
`
