import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React, { useEffect, useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'
import { LobbyCardRelease } from '../LobbySlides/LobbyCardRelease'
import gif from '../assets/gif.png'
import LobbyTitle from '../LobbySlides/LobbyTitle'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import hexAlpha from 'hex-alpha'
import useMediaQueryAT from '@hooks/useMediaQueryAT'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import trofeoIMG from '../assets/sliders/trofeo.png'
import prov1 from '../assets/providers/provider1.png'
import prov2 from '../assets/providers/provider2.png'
import prov3 from '../assets/providers/provider3.png'
import classNames from 'classnames'
import { delay } from '@helpers/delay'

export const ScrollLoopRounded = ({ data, title = '', setAnimatedNoMoreLobbies = (value) => null }) => {
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
            const { clonesWidth, sliderWidth, scrollRight } = load(refScroll)

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
                const paddingRight = window.getComputedStyle(refScroll).getPropertyValue('padding-right').replace('px', '')
                const cloneColision = refScroll.querySelector('.colision-clone') as HTMLDivElement
                cloneColision.style.left = `calc(${refScroll.scrollLeft}px + 35%)`
                var rectSelection = cloneColision.getBoundingClientRect()
                Array.from(refScroll.children).forEach((item) => {
                    var rect = item.getBoundingClientRect()
                    item.classList.remove('active')
                    if (
                        rect.bottom > rectSelection.top &&
                        rect.right > rectSelection.left &&
                        rect.top < rectSelection.bottom &&
                        rect.left < rectSelection.right
                    ) {
                        item.classList.add('active')
                    }
                })
                if (Math.abs(resta) <= 1) {
                    refScroll.scrollTo({
                        left: scrollRight,
                    })
                    return
                }
                if (refScroll.scrollLeft === 0) {
                    refScroll.scrollTo({
                        left: clonesWidth,
                    })
                }
            }
        }
    }, [refScroll])

    function getClonesWidth(clones) {
        let sliderWidth = 0
        clones.forEach((clone) => {
            sliderWidth += clone.offsetWidth
        })
        return sliderWidth
    }
    function load(slider: HTMLDivElement) {
        let clones = []
        if (slider) {
            clones = Array.from(slider.querySelectorAll('.clone-prev'))

            const spacing = clones.length * 14
            const left = getClonesWidth(clones) + spacing - 1

            slider.scrollTo({
                left: left,
            })

            return {
                scrollRight: slider.scrollWidth - left - slider.offsetWidth,
                clonesWidth: left,
                sliderWidth: slider.getBoundingClientRect().width,
            }
        }
    }

    return (
        <div>
            <LobbyTitle
                // animatedNoMoreLobbies={animatedNoMoreLobbies}
                onClickShowAll={() => {
                    router.push(PATHS.CASINO.url)
                }}
                title={title}
                image={trofeoIMG.src}
            />
            <ContainerScrollStyled id="adl3mkr34r43t2">
                <>
                    {/* {showButtonLeft && (
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
                    )} */}
                </>
                <StyledScrollContainer ref={(refCurrent) => setRefScroll(refCurrent)} className={'slider'}>
                    <div className="colision colision-clone"></div>

                    {[...data, ...data]?.map((item, i) => {
                        return (
                            <StyledScrollItem className={classNames('slider-item clone clone-prev')} key={i}>
                                <StyledCardWrapper>
                                    {i % 2 === 0 ? <img src={prov1.src} alt="" /> : <img src={prov2.src} alt="" />}
                                </StyledCardWrapper>
                            </StyledScrollItem>
                        )
                    })}

                    {[...data, ...data]?.map((item, i) => {
                        return (
                            <StyledScrollItem className={classNames('slider-item')} key={i}>
                                <StyledCardWrapper>
                                    {i % 2 === 0 ? <img src={prov1.src} alt="" /> : <img src={prov2.src} alt="" />}
                                </StyledCardWrapper>
                            </StyledScrollItem>
                        )
                    })}

                    <StyledScrollItem className={classNames('slider-item clone fake')}>
                        <StyledCardWrapper onClick={() => router.push(PATHS.CASINO_be98867001f70b94097d_TODOS.url)}>
                            <img src={prov1.src} alt="" />
                        </StyledCardWrapper>
                    </StyledScrollItem>
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
const StyledCardWrapper = styled.div`
    position: relative;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.3;
    filter: blur(1px);
    transition: 200ms;
    aspect-ratio: 1/1;
    > span {
        background: black;
        min-width: 50px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        background: ${(p) => p.theme.casino.slider.background};
        box-shadow: 6px 6px 10px -1px ${(p) => hexAlpha(p.theme.casino.slider.neumorfism.contrastText, 0.15)},
            -6px -6px 10px -1px ${(p) => hexAlpha(p.theme.casino.slider.neumorfism.background, 0.8)};
        border-radius: 50%;
        object-fit: cover;
    }
`
const StyledScrollItem = styled.div`
    display: flex;
    flex: 0 0 25%;
    max-width: 180px;
    border-radius: 50%;
    transition: 200ms !important;
    aspect-ratio: 1/1;

    &.active {
        flex: 0 0 30%;
        max-width: 200px;
        ${StyledCardWrapper} {
            filter: blur(0px);
            opacity: 1;
            padding: 0;
        }
    }

    &.fake {
        margin-left: -100%;
        flex: 0 0 30%;
        max-width: 200px;
        opacity: 0;
        pointer-events: none;
    }
`
const StyledScrollContainer: any = styled(ScrollContainer)<StyledProps>`
    position: relative;
    display: flex;
    align-items: center;
    min-width: 100%;
    gap: 14px;
    padding: 14px;
    width: calc(100% + 28px);
    right: 14px;
    overflow: auto !important;
    &::-webkit-scrollbar {
        /* display: block !important; */
        display: none !important;
        width: 5px !important;
        height: 8px !important;
        background-color: #aaa !important; /* or add it to the track */
    }

    /* Add a thumb */
    &::-webkit-scrollbar-thumb {
        background: #000 !important;
    }
    > div.colision {
        position: absolute;
        height: 100%;
        width: 30%;
    }
`
