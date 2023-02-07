import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useMediaQuery } from '@mui/material'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import useWindowSize from 'hooks/useWindowSize'
import ScrollContainer from 'react-indiana-drag-scroll'
import { GoogleTagManager } from 'google/TagManager'

const INITIAL_VALUES = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    arrows: false,
}
const LobbySlideOnlyIMG = ({
    onClickSlideParams,
    onClickSlide,
    banners = [],
    selectorItem = 'slider-at-item-only-img',
    baseURL = null,
}) => {
    const [heightSlider, setHeightSlider] = useState(0)
    const sliderRef = useRef()
    const tabletS = useMediaQuery(MEDIA_QUERIES.min_width.tabletS)
    const tabletL = useMediaQuery(MEDIA_QUERIES.min_width.tabletL)
    const mobileL = useMediaQuery(MEDIA_QUERIES.min_width.mobileL)
    const desktopXS = useMediaQuery(MEDIA_QUERIES.min_width.desktopXS)
    const desktopS = useMediaQuery(MEDIA_QUERIES.min_width.desktopS)
    const desktopL = useMediaQuery(MEDIA_QUERIES.min_width.desktopL)
    const desktopXL = useMediaQuery(MEDIA_QUERIES.min_width.desktopXL)
    const [settings, setSettings] = useState(INITIAL_VALUES)
    const [showArrows, setShowArrows] = useState(false)
    const size = useWindowSize()
    const [showButtonLeft, setShowButtonLeft] = useState(false)
    const [showButtonRight, setShowButtonRight] = useState(false)

    const dtHomeClick = (name) => {
        GoogleTagManager.push({
            event: 'atm.event',
            option: name.toLowerCase(),
            eventName: 'home_click',
            title: 'mas diversion',
        })
    }

    // useEffect(() => {
    // }, [tabletS, mobileL, desktopXS, desktopS, desktopXL, tabletL])

    if (!banners || banners.length < 1) {
        return null
    }

    let drag = false
    const refCar = useRef()
    useEffect(() => {
        if (refCar && refCar.current) {
            const ContainerElement = refCar.current
            const x = ContainerElement.scrollLeft
            const y = ContainerElement.scrollTop
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
            refCar.current.onscroll = function (e) {
                const ContainerElement = refCar.current

                const x = ContainerElement.scrollLeft
                const y = ContainerElement.scrollTop
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
            }
        }
    }, [refCar])

    return (
        <WrapperLobbySLiderS>
            <>
                {showButtonLeft && (
                    <ButtonArrowS
                        className="left"
                        onClick={() => {
                            const ContainerElement = refCar.current
                            // console.log(ContainerElement.scrollWidth - ContainerElement.clientWidth)
                            const back = ContainerElement.scrollLeft - 500
                            const aument = (window.innerWidth / 100) * 15
                            ContainerElement.scroll({
                                top: 0,
                                left: back - aument,
                                behavior: 'smooth',
                            })
                            // sliderRef.current.slickPrev()
                        }}
                    >
                        <span>&#60;</span>
                    </ButtonArrowS>
                )}
                {showButtonRight && (
                    <ButtonArrowS
                        className="right"
                        onClick={() => {
                            const ContainerElement = refCar.current
                            const back = ContainerElement.scrollLeft - 500
                            const aument = (window.innerWidth / 100) * 15

                            ContainerElement.scroll({
                                top: 0,
                                left: ContainerElement.scrollLeft + 500 + aument,
                                behavior: 'smooth',
                            })
                        }}
                    >
                        <span>&#62;</span>
                    </ButtonArrowS>
                )}
            </>
            <>
                <CarouselS ref={refCar}>
                    <>
                        {banners.map(({ config }, i) => (
                            <CardS
                                className={selectorItem}
                                heightSlider={heightSlider}
                                key={i}
                                onMouseDown={() => (drag = false)}
                                onMouseMove={() => (drag = true)}
                                onMouseUp={() => {
                                    if (!drag) {
                                        dtHomeClick(config?.title ? config?.title : 'Sin Titulo')
                                        const params = []
                                        onClickSlideParams.forEach((element) => {
                                            params.push(config[element])
                                        })
                                        onClickSlide(...params)
                                    }
                                }}
                            >
                                {/* <div className="MorePromotion__image" onClick={() => dtHomeClick(config.image)}> */}
                                <div className="MorePromotion__image">
                                    <img alt="Banner Apuesta Total" src={`${baseURL ? baseURL + '/' : ''}${config.image}`} />
                                    <ButtonS>
                                        {config.title.split(' ').length === 1 ? (
                                            <span className="bottom">{config.title}</span>
                                        ) : (
                                            <>
                                                <span className="top">{config.title.split(' ')[0]}</span>
                                                <span className="bottom">{config.title.split(' ').slice(1).join(' ')}</span>
                                            </>
                                        )}
                                    </ButtonS>
                                </div>
                            </CardS>
                        ))}
                    </>
                </CarouselS>
            </>
        </WrapperLobbySLiderS>
    )
}

export default LobbySlideOnlyIMG
const CardS = styled('div')`
    display: flex !important;
    flex-direction: column;
    gap: 0.5rem;
    background: transparent;
    position: relative;
    cursor: pointer;
    background: ${(p) => p.theme.casino.slider.background};
    box-shadow: ${(p) => hexAlpha(p.theme.casino.slider.shadow, 0.1)} 0px 3px 6px;
    flex: 1 0 40%;
    max-width: 220px;
    border-radius: 12px;
    overflow: hidden;
    > .MorePromotion__image {
        /* max-height: 190px; */
        overflow: hidden;
        aspect-ratio: 1;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
        img {
            object-fit: fill;
            display: block;
        }
    }
`

const WrapperLobbySLiderS = styled.div`
    & {
        position: relative;
        width: calc(100% + 28px);
        right: 14px;
        ${MEDIA_QUERIES.min_width.desktopS} {
            width: calc(100% + 100px);
            right: 50px;
        }
    }
`

const ButtonS = styled.div`
    background: black;
    color: white;
    position: absolute;
    bottom: 0;
    padding: 5px 30px;
    width: calc(82% + 30px);
    left: -20px;
    min-height: 40px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    transform: skew(-15deg);
    transition: 150ms;
    transform-origin: left bottom;
    & {
        span {
            line-height: 1.1;
            font-size: 0.9rem;
            text-transform: uppercase;
            font-weight: 300;
            white-space: nowrap;
            &.top {
                color: ${(p) => p.theme.palette.alternate7.main};
            }
        }
        :hover {
            transform: skew(-15deg) scale(1.2);
        }
    }
`
const ButtonArrowS = styled.div`
    & {
        height: 100%;
        right: 0px;
        z-index: 10;
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        font-weight: 500;
        cursor: pointer;
        transition: 250ms;
        background: rgba(245, 245, 247, 0.7);
        &.left {
            left: 0px;
            right: initial;
        }
        span {
            transition: 150ms;
            transform: scaleY(1.2);
        }
        :hover {
            span {
                transform: scaleY(1.5) scaleX(1.3);
            }
        }

        width: 30px;
        font-size: 2.2rem;

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
const CarouselS = styled(ScrollContainer)`
    position: relative;
    display: flex;
    gap: 0.8rem;
    min-width: 100%;
    padding: 14px;
    width: calc(100% + 28px);
    right: 14px;
`
