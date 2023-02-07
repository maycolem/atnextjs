import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Button, useMediaQuery } from '@mui/material'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import useWindowSize from 'hooks/useWindowSize'
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import { GoogleTagManager } from 'google/TagManager'
import { Handshake } from '@mui/icons-material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import hexAlpha from 'hex-alpha'

const INITIAL_VALUES = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    arrows: false,
}
const LobbySlide = ({
    banners = [],
    selectorHeightItem = 'slider-at-item',
    onClickSlideParams,
    onClickSlide,
    titleCard,
    setAnimatedNoMoreLobbies = () => null,
}) => {
    const [heightSlider, setHeightSlider] = useState(0)
    const desktopS = useMediaQuery(MEDIA_QUERIES.min_width.desktopS)
    const [showButtonLeft, setShowButtonLeft] = useState(false)
    const [showButtonRight, setShowButtonRight] = useState(false)
    const dtHomeClick = (name) => {
        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'home_click',
            title: titleCard,
            option: name.toLowerCase(),
        })
    }
    if (!banners || banners.length < 1) {
        return null
    }

    let drag = false
    const refCar = useRef()

    useEffect(() => {
        if (refCar && refCar.current) {
            const ContainerElement = refCar.current
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
            refCar.current.onscroll = function (e) {
                const ContainerElement = refCar.current
                const x = ContainerElement?.scrollLeft
                const y = ContainerElement?.scrollTop
                if (x === 0) {
                    setShowButtonLeft(false)
                }
                if (x > 200) {
                    setShowButtonLeft(true)
                }
                // SI LLEGO AL LIMITE TRUE
                const resta = ContainerElement.scrollLeft - (ContainerElement.scrollWidth - ContainerElement.clientWidth)
                // console.log(resta)
                // console.log(Math.abs(resta))
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

                // console.log(x) // scroll position from Left
                // console.log(y) // scroll position from top
                // console.log('scroll lef ', ContainerElement.scrollLeft)
                // console.log('scroll client width ', ContainerElement.clientWidth)
                // console.log('scroll scroill width ', ContainerElement.scrollWidth)
                // console.log(
                //   Math.abs(ContainerElement.scrollLeft) === ContainerElement.scrollWidth - ContainerElement.clientWidth
                // )
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
                        <ArrowBackIosNewIcon />
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
                        <ArrowForwardIosIcon />
                    </ButtonArrowS>
                )}
            </>
            <>
                <CarouselS ref={refCar}>
                    <>
                        {banners.map(({ config }, i) => (
                            <CardS className={selectorHeightItem} heightSlider={heightSlider} key={i} title={config.title}>
                                <div className="MorePromotion__image">
                                    <img alt="Banner Apuesta Total" src={`${process.env.REACT_APP_WEB_BASE}/${config.image}`}></img>
                                    <ButtonS
                                        className="button-at-hover-juega-aqui"
                                        onMouseDown={() => (drag = false)}
                                        onMouseMove={(e) => {
                                            drag = true
                                        }}
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
                                        variant="contained"
                                    >
                                        Juega aquí {'>'}
                                    </ButtonS>
                                </div>
                                <div
                                    className="MorePromotion__content"
                                    onMouseDown={() => (drag = false)}
                                    onMouseMove={(e) => {
                                        drag = true
                                    }}
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
                                    <div className="MorePromotion__contentTop">{config.title}</div>
                                    <div className="MorePromotion__contentBottom">{config.body}</div>
                                </div>
                            </CardS>
                        ))}
                    </>
                </CarouselS>
            </>
        </WrapperLobbySLiderS>
    )
}

export default LobbySlide
const CardS = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 12px;
    overflow: hidden;
    background: ${(p) => p.theme.casino.slider.background};
    box-shadow: ${(p) => hexAlpha(p.theme.casino.slider.shadow, 0.1)} 0px 3px 6px;
    flex: 1 0 40%;
    max-width: 220px;
    > .MorePromotion__image {
        /* max-height: 190px; */
        overflow: hidden;
        aspect-ratio: 1 / 1.335;
        position: relative;
        ::after {
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            position: absolute;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.884534534), transparent);
            z-index: 1;
            opacity: 0;
            transition: 250ms;
        }
        img {
            object-fit: cover;
            transition: 250ms;
        }
    }
    > .MorePromotion__content {
        flex: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px;
        padding-top: 5px;
        gap: 8px;
        cursor: pointer;
        > div.MorePromotion__contentTop {
            font-weight: 500;
            font-size: 0.85rem;
            text-transform: uppercase;
            color: ${(p) => hexAlpha(p.theme.casino.slider.contrastText, 0.9)};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        > div.MorePromotion__contentBottom {
            color: ${(p) => hexAlpha(p.theme.casino.slider.contrastText, 0.7)};
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 0.8rem;
            display: block;
            /* white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden; */
            svg {
                font-size: 1.2rem;
            }
        }
    }
    & {
        :hover {
            > .MorePromotion__image {
                ::after {
                    opacity: 1;
                }
                img {
                    transform: scale(1.2);
                }
            }
            .button-at-hover-juega-aqui {
                bottom: 40px;
                opacity: 1;
                z-index: 2;
                transform: translateX(-50%);
                text-transform: capitalize;
            }
        }
    }
`
const ButtonS = styled(Button)`
    position: absolute;
    bottom: 0;
    left: 50%;
    white-space: nowrap;
    transform: translateX(-50%);
    text-transform: capitalize;
    width: 90%;
    padding-top: 10px;
    padding-bottom: 10px;
    transition: all 250ms, opacity 100ms;
    opacity: 0;
`

const WrapperLobbySLiderS = styled.div``
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
        &.left {
            left: 0px;
            right: initial;
        }
        span {
            transition: 150ms;
            transform: scaleY(1.2);
        }

        width: 30px;
        svg {
            transition: 250ms;
            font-size: calc(2rem + 1vw);
        }

        ${MEDIA_QUERIES.min_width.desktopS} {
            width: 50px;
            font-size: calc(3rem + 1vw);
            :hover {
                svg {
                    font-size: calc(3rem + 1vw + 1vw);
                }
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
