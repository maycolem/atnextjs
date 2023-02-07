import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Button, useMediaQuery } from '@mui/material'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import hexAlpha from 'hex-alpha'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

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
    }, [refCar])

    return (
        <WrapperLobbySLiderS $width={40} $gap="8">
            <>
                {showButtonLeft && (
                    <ButtonArrowS
                        className="left"
                        onClick={() => {
                            const ContainerElement = refCar.current
                            const back = ContainerElement.scrollLeft - 500
                            const aument = (window.innerWidth / 100) * 15
                            ContainerElement.scroll({
                                top: 0,
                                left: back - aument,
                                behavior: 'smooth',
                            })
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
                        {banners.map((item, i) => (
                            <CardS className={selectorHeightItem} heightSlider={heightSlider} key={i} title={item.name}>
                                <div className="MorePromotion__image">
                                    <img alt="Banner Apuesta Total" src={`${process.env.REACT_APP_WEB_BASE}/${item.logo}`}></img>
                                    <ButtonS
                                        className="button-at-hover-juega-aqui"
                                        onMouseDown={() => (drag = false)}
                                        onMouseMove={(e) => {
                                            drag = true
                                        }}
                                        onMouseUp={() => {
                                            if (!drag) {
                                                const params = []
                                                onClickSlideParams.forEach((element) => {
                                                    console.log('onClickSlideParams', element)
                                                    params.push(item[element])
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
                                            const params = []
                                            onClickSlideParams.forEach((element) => {
                                                params.push(config[element])
                                            })
                                            onClickSlide(...params)
                                        }
                                    }}
                                >
                                    <div className="MorePromotion__contentTop">{item.name}</div>
                                    <div className="MorePromotion__contentTop provider">{item.provider}</div>
                                    <div className="MorePromotion__contentBottom tags">
                                        {item.tags.split(',').length > 0
                                            ? item.tags.split(',').map((str, i) => {
                                                  return (
                                                      str[0] +
                                                      str.slice(1).toLowerCase() +
                                                      `${i + 1 < item.tags.split(',').length ? ', ' : ''}`
                                                  )
                                              })
                                            : null}
                                    </div>
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
    border-radius: 12px;
    overflow: hidden;
    > .MorePromotion__image {
        overflow: hidden;
        aspect-ratio: 25 / 18;
        position: relative;
        ::after {
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            position: absolute;
            /* background: linear-gradient(to top, rgba(0, 0, 0, 0.884534534), transparent); */
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
        padding: 4px 15px 6px;
        gap: 4px;
        cursor: pointer;
        > div.MorePromotion__contentTop {
            font-weight: 500;
            font-size: 0.85rem;
            text-transform: uppercase;
            color: ${(p) => hexAlpha(p.theme.casino.slider.contrastText, 0.9)};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &.provider {
                text-transform: capitalize;
                font-size: 0.8rem;
                color: ${(p) => hexAlpha(p.theme.casino.slider.contrastText, 0.7)};
            }
        }
        > div.MorePromotion__contentBottom {
            color: ${(p) => hexAlpha(p.theme.casino.slider.contrastText, 0.7)};
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 0.8rem;
            display: block;
            &.tags {
                color: ${(p) => hexAlpha(p.theme.casino.slider.tagsText)};

                font-weight: 500;
            }
            svg {
                font-size: 1.2rem;
            }
        }
        padding-bottom: 10px;
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
const WrapperLobbySLiderS = styled.div`
    && {
        position: relative;
    }
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
const CarouselS = styled(ScrollContainer)`
    position: relative;
    display: flex;
    gap: 0.8rem;
    min-width: 100%;
    padding: 14px;
    width: calc(100% + 28px);
    right: 14px;
`
