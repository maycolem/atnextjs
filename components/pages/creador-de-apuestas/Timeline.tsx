import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import _1_IMAGE from './assets/CREADOR-DE-APUESTAS-1.png'
import _2_IMAGE from './assets/CREADOR-DE-APUESTAS-2.png'
import _3_IMAGE from './assets/CREADOR-DE-APUESTAS-3.png'
import _4_IMAGE from './assets/CREADOR-DE-APUESTAS-4.png'
import { delay } from 'helpers/delay'
import { Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useHeightHeader from '@hooks/useHeightHeader'
// https://wilsotobianco.com/experiments/intersection-observer-playground/#stop
export const Timeline = ({ onShowLastItem }) => {
    const _1_IMAGE_SRC = _1_IMAGE.src
    const _2_IMAGE_SRC = _2_IMAGE.src
    const _3_IMAGE_SRC = _3_IMAGE.src
    const _4_IMAGE_SRC = _4_IMAGE.src
    const [showTimeLine, setShowTimeLine] = useState(false)
    const { heightHeader } = useHeightHeader()
    useEffect(() => {
        return () => {
            setShowTimeLine(false)
        }
    }, [])

    useEffect(() => {
        if (showTimeLine) {
            const childrens = document.querySelectorAll('.nextScrollStep')
            const callback = (entries, observer) => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        await handleOnObserverSigueAvanzando(entry)
                    }
                    // Each entry describes an intersection change for one observed
                    // target element:
                    //   entry.boundingClientRect
                    //   entry.intersectionRatio
                    //   entry.intersectionRect
                    //   entry.isIntersecting
                    //   entry.rootBounds
                    //   entry.target
                    //   entry.time
                })
            }
            const options = {
                root: null,
                rootMargin: '-45% 0% -50% 0%',
                threshold: 0,
            }
            const observer = new IntersectionObserver(callback, options)
            childrens.forEach((child) => {
                observer.observe(child)
            })
            return () => observer.disconnect()
        }
    }, [showTimeLine])

    useEffect(() => {
        const $StyledTimeline = document.getElementById('StyledTimeline')
        const $lastContainer = $StyledTimeline.querySelector('.lastTimelineContainer')
        const callback = (entries, observer) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    onShowLastItem(true)
                    $StyledTimeline.classList.add('last-child-is-visible')
                }
            })
        }
        const observer = new IntersectionObserver(callback)
        observer.observe($lastContainer)
        return () => observer.disconnect()
    }, [])

    const cbEffect = async () => {
        await delay(500)
        const $StyledStartTimerLine = document.getElementById('StyledStartTimerLineWrapper')
        const callback = (entries, observer) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    handleOnClickStartTimeline({ isScroll: true })
                }
            })
        }
        const options = {
            root: null,
            rootMargin: '-30% 0% -65% 0%',
            threshold: 0,
        }
        const observer = new IntersectionObserver(callback, options)
        observer.observe($StyledStartTimerLine)
        return () => observer.disconnect()
    }

    useEffect(() => {
        cbEffect()
    }, [])

    const handleOnObserverSigueAvanzando = async (e) => {
        const $StyledTimelineContainer = e.target.closest('.StyledTimelineContainer')
        const $StyledButtonNext = $StyledTimelineContainer.querySelector('.StyledButtonNext')
        const $elNext = $StyledTimelineContainer.nextElementSibling

        $StyledTimelineContainer.classList.add('full-show')
        $StyledButtonNext.classList.add('hidden')

        await handleSetClassFlexAndShow($elNext)
    }

    const handleOnclickSigueAvanzando = async (e) => {
        const $StyledTimelineContainer = e.target.closest('.StyledTimelineContainer')
        const $StyledButtonNext = e.target.closest('.StyledButtonNext')
        const $elNext = $StyledTimelineContainer.nextElementSibling

        $StyledTimelineContainer.classList.add('full-show')
        $StyledButtonNext.classList.add('hidden')

        if ($elNext.classList.contains('show')) {
            $elNext.scrollIntoView({ block: 'center', behavior: 'smooth' })
            return
        }

        await handleSetClassFlexAndShow($elNext)

        const location = getElemDistance($elNext)
        window.scrollTo({
            behavior: 'smooth',
            top: location - heightHeader - 5,
        })
    }

    const handleOnClickStartTimeline = async ({ isScroll = false }: { isScroll?: boolean }) => {
        const StyledStartTimerLine = document.getElementById('StyledStartTimerLineWrapper')
        StyledStartTimerLine.classList.add('start')

        const $StyledTimeline = document.getElementById('StyledTimeline')
        const childrens = $StyledTimeline.childNodes || []

        await handleSetClassFlexAndShow(childrens[0])
        await delay(500)
        setShowTimeLine(true)

        if (isScroll) {
            return null
        } else {
            const location = getElemDistance(childrens[0])
            window.scrollTo({
                behavior: 'smooth',
                top: location - heightHeader - 5,
            })
        }
    }

    const handleSetClassFlexAndShow = async (elem) => {
        await delay(350)
        elem.classList.add('flex')
        await delay(420)
        elem.classList.add('show')
    }

    const getElemDistance = function (elem) {
        let location = 0
        if (elem.offsetParent) {
            do {
                location += elem.offsetTop
                elem = elem.offsetParent
            } while (elem)
        }
        return location >= 0 ? location : 0
    }

    return (
        <Styled>
            {showTimeLine ? null : (
                <StyledStartTimerLine>
                    <StyledStartTimerLineWrapper id="StyledStartTimerLineWrapper" onClick={() => handleOnClickStartTimeline({})}>
                        <Button disableFocusRipple disableRipple disableTouchRipple>
                            <div className="line"></div>
                            <ExpandMoreIcon></ExpandMoreIcon>
                        </Button>
                        <span>Haz click o scroll para iniciar</span>
                    </StyledStartTimerLineWrapper>
                </StyledStartTimerLine>
            )}
            <StyledTimeline id="StyledTimeline">
                <StyledTimelineContainer className="StyledTimelineContainer ">
                    <StyledTimelineStepWrapper className="right">
                        <StyledTimelineStep>
                            <StyledTimelineStepCircle>
                                <span>01</span>
                            </StyledTimelineStepCircle>
                            <StyledTimelineStepLine></StyledTimelineStepLine>
                            <StyledTimelineStepLineProgres>
                                <StyledArrowButtonNextWrapper className="StyledButtonNext">
                                    <StyledArrow onClick={handleOnclickSigueAvanzando}>
                                        <ExpandMoreIcon></ExpandMoreIcon>
                                    </StyledArrow>
                                    <StyledButtonNext>
                                        <Button onClick={handleOnclickSigueAvanzando}>Sigue avanzando</Button>
                                    </StyledButtonNext>
                                </StyledArrowButtonNextWrapper>
                            </StyledTimelineStepLineProgres>
                        </StyledTimelineStep>
                    </StyledTimelineStepWrapper>
                    <StyledTimelineContentRight>
                        <StyledTimelineContentRightContent>
                            <img alt="" loading="lazy" src={_1_IMAGE_SRC} />
                            <div className="wrapper">
                                <div className="title">Paso 1:</div>
                                <div className="sub-title">ELIGE EL PARTIDO</div>
                                <div className="parrafo">
                                    <p>
                                        Ingresa a{' '}
                                        <a className="link nowrap" href="www.apuestatotal.com">
                                            <b>www.apuestatotal.com</b>
                                        </a>
                                        , dirígete a{' '}
                                        <a href="https://www.apuestatotal.com/apuestas-deportivas">
                                            <b className="nowrap">Apuestas deportivas</b>
                                        </a>{' '}
                                        e ingresa al evento de tu preferencia.
                                    </p>
                                </div>
                            </div>
                        </StyledTimelineContentRightContent>
                    </StyledTimelineContentRight>
                    <StyledNextScrollStep className="nextScrollStep"></StyledNextScrollStep>
                </StyledTimelineContainer>
                <StyledTimelineContainer className="StyledTimelineContainer">
                    <StyledTimelineStepWrapper className="left">
                        <StyledTimelineStep>
                            <StyledTimelineStepCircle>
                                <span>02</span>
                            </StyledTimelineStepCircle>
                            <StyledTimelineStepLine></StyledTimelineStepLine>
                            <StyledTimelineStepLineProgres>
                                <StyledArrowButtonNextWrapper className="StyledButtonNext">
                                    <StyledArrow onClick={handleOnclickSigueAvanzando}>
                                        <ExpandMoreIcon></ExpandMoreIcon>
                                    </StyledArrow>
                                    <StyledButtonNext>
                                        <Button onClick={handleOnclickSigueAvanzando}>Sigue avanzando</Button>
                                    </StyledButtonNext>
                                </StyledArrowButtonNextWrapper>
                            </StyledTimelineStepLineProgres>
                        </StyledTimelineStep>
                    </StyledTimelineStepWrapper>
                    <StyledTimelineContentRight>
                        <StyledTimelineContentRightContent>
                            <img alt="" loading="lazy" src={_2_IMAGE_SRC} />
                            <div className="wrapper">
                                <div className="title">Paso 2:</div>
                                <div className="sub-title">
                                    <p>ENCUENTRA LA PESTAÑA</p>
                                </div>
                                <div className="parrafo">
                                    <p>
                                        En la parte superior del evento selecciona la pestaña <b className="nowrap">Crear apuesta</b>. Ojo:
                                        esta función solo está disponible para apuestas <b className="nowrap">pre match</b>.
                                    </p>
                                </div>
                            </div>
                        </StyledTimelineContentRightContent>
                    </StyledTimelineContentRight>
                    <StyledNextScrollStep className="nextScrollStep"></StyledNextScrollStep>
                </StyledTimelineContainer>
                <StyledTimelineContainer className="StyledTimelineContainer">
                    <StyledTimelineStepWrapper className="right">
                        <StyledTimelineStep>
                            <StyledTimelineStepCircle>
                                <span>03</span>
                            </StyledTimelineStepCircle>
                            <StyledTimelineStepLine></StyledTimelineStepLine>
                            <StyledTimelineStepLineProgres>
                                <StyledArrowButtonNextWrapper className="StyledButtonNext">
                                    <StyledArrow onClick={handleOnclickSigueAvanzando}>
                                        <ExpandMoreIcon></ExpandMoreIcon>
                                    </StyledArrow>
                                    <StyledButtonNext>
                                        <Button onClick={handleOnclickSigueAvanzando}>Sigue avanzando</Button>
                                    </StyledButtonNext>
                                </StyledArrowButtonNextWrapper>
                            </StyledTimelineStepLineProgres>
                        </StyledTimelineStep>
                    </StyledTimelineStepWrapper>
                    <StyledTimelineContentRight>
                        <StyledTimelineContentRightContent>
                            <img alt="" loading="lazy" src={_3_IMAGE_SRC} />
                            <div className="wrapper">
                                <div className="title">Paso 3:</div>
                                <div className="sub-title">
                                    <p>CREA LA COMBINADA</p>
                                </div>
                                <div className="parrafo">
                                    <p>
                                        Procede a <b className="nowrap">combinar mercados</b>. Tienes Ganador del partido, Total de goles,
                                        Primera mitad, etc.
                                    </p>
                                    <p>
                                        Nuestro sistema determinará <b className="nowrap">la cuota</b> de tu combinación. Verás que esta irá
                                        creciendo a medida que escojas más mercados.
                                    </p>
                                    <p>El sistema también anulará las opciones que sean incompatibles con tu selección en ese momento.</p>
                                </div>
                            </div>
                        </StyledTimelineContentRightContent>
                    </StyledTimelineContentRight>
                    <StyledNextScrollStep className="nextScrollStep"></StyledNextScrollStep>
                </StyledTimelineContainer>
                <StyledTimelineContainer className="StyledTimelineContainer lastTimelineContainer">
                    <StyledTimelineStepWrapper className="left">
                        <StyledTimelineStep>
                            <StyledTimelineStepCircle>
                                <span>04</span>
                            </StyledTimelineStepCircle>
                        </StyledTimelineStep>
                    </StyledTimelineStepWrapper>
                    <StyledTimelineContentRight>
                        <StyledTimelineContentRightContent>
                            <img alt="" loading="lazy" src={_4_IMAGE_SRC} />
                            <div className="wrapper">
                                <div className="title">Paso 4:</div>
                                <div className="sub-title">
                                    <p>CONFIRMA TU CUPÓN Y JUEGA</p>
                                </div>
                                <div className="parrafo">
                                    <p>
                                        Una vez que hayas definido tu jugada, digita la cantidad que quieres apostar y presiona{' '}
                                        <b className="nowrap">Realizar apuesta</b> o <b className="nowrap">Reservar</b>.
                                    </p>
                                </div>
                            </div>
                        </StyledTimelineContentRightContent>
                    </StyledTimelineContentRight>
                </StyledTimelineContainer>
            </StyledTimeline>
        </Styled>
    )
}

const StyledArrowButtonNextWrapper = styled.div`
    &.hidden {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
    }
`
const StyledNextScrollStep = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
`

const Styled = styled.div`
    position: relative;
    min-height: 500px;
`
const StyledStartTimerLine = styled.div`
    width: min(90%, 400px);
    position: relative;
    margin: auto;
    z-index: 5;
    height: 0;
`

const StyledStartTimerLineWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 80px;
    transition: 200ms, background 200ms ease 120ms, border 200ms 150ms, opacity 400ms ease 500ms;
    top: 0;
    left: 0;
    > span {
        cursor: pointer;
        position: absolute;
        top: 50%;
        max-width: 40%;
        text-align: center;
        left: calc(50% + 1.5rem);
        text-transform: initial;
        word-spacing: 3px;
        line-height: 1.4;
        transform: translateY(-50%);
        color: ${primaryMainColor};
        top: 22px;
    }
    > button {
        margin: auto;
        position: relative;
        display: flex;
        flex-direction: column;
        > .line {
            width: 2px;
            background: ${primaryMainColor};
            height: 35px;
        }
        > svg {
            margin-top: -27px;
            color: ${primaryMainColor};
            position: relative;
            font-size: 60px;
            animation-name: downupAnimation2;
            animation-iteration-count: infinite;
            animation-duration: 1.2s;
            @keyframes downupAnimation2 {
                from {
                    opacity: 1;
                    top: 0px;
                }
                50% {
                    top: 5px;
                }
                to {
                    opacity: 0;
                    top: 0px;
                }
            }
        }
    }
    &.start {
        overflow: hidden;
        background: red;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        top: 6rem;
        border: 5px solid #d9d9d9;
        opacity: 0;
        pointer-events: none;
        > span {
            width: 0;
            overflow: hidden;
        }
    }
`
const StyledButtonNext = styled.div`
    position: absolute;
    bottom: -4rem;
    transition: 250ms;
    > button {
        white-space: nowrap;
        padding: 10px 20px;
        text-transform: initial;
        word-spacing: 3px;
        line-height: 1.4;
        font-size: 1rem;
    }
`

const StyledTimeline = styled.div`
    width: min(90%, 400px);
    margin: auto;
    padding-bottom: 6rem;
    &.last-child-is-visible {
        padding-bottom: 2rem;
    }
    ${MEDIA_QUERIES.min_width.desktopS} {
        width: 100%;
    }
`
const StyledArrow = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    font-weight: 400;
    color: ${primaryMainColor};
    z-index: 10;
    bottom: -27px;
    right: 50%;
    transform: translateX(50%);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 300ms ease 600ms;
    cursor: pointer;
    animation-name: downupAnimation;
    animation-iteration-count: infinite;
    animation-duration: 1.5s;
    > svg {
        font-size: 60px;
    }
    @keyframes downupAnimation {
        from {
            bottom: -27px;
            opacity: 1;
        }
        50% {
            bottom: -37px;
        }
        to {
            opacity: 0;
            bottom: -27px;
        }
    }
`
const StyledTimelineStepLineProgres = styled.div`
    top: 5px;
    height: 0%;
    width: 2px;
    position: absolute;
    background: ${primaryMainColor};
    z-index: 2;
    transition: 1s;
`
const StyledTimelineContentRight = styled.div`
    transition: 300ms;
    transform: scale(0.8);
    transform-origin: right center;
    padding-bottom: 6rem;
`
const StyledTimelineContainer = styled.div`
    display: flex;
    position: relative;
    top: 0;
    opacity: 0;
    transition: 350ms;
    display: none;

    &.flex {
        display: flex;
    }
    &.show {
        opacity: 1;

        ${StyledTimelineStepLineProgres} {
            height: calc(100% - 6rem - 6rem - 3rem);
        }
        ${StyledTimelineContentRight} {
            transform: scale(1);
        }
    }
    &.full-show {
        ${StyledTimelineStepLineProgres} {
            height: 100%;
        }
        ${StyledArrow} {
            animation-name: initial;
            opacity: 0;
            bottom: -35px;
        }
    }

    :last-child {
        ${StyledTimelineContentRight} {
            padding-bottom: 0;
        }
    }

    ${MEDIA_QUERIES.min_width.desktopS} {
        :nth-of-type(odd) {
            flex-direction: row-reverse;
        }
    }
`
const StyledTimelineStepWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 6rem;
    ${MEDIA_QUERIES.min_width.desktopS} {
        flex: 1 0 calc(50% + 20px);
        &.right {
            align-items: flex-start;
        }
        &.left {
            align-items: flex-end;
        }
    }
`
const StyledTimelineStep = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1;
`

const StyledTimelineContentRightContent = styled.div`
    > img {
        height: initial;
    }
    > div.wrapper {
        padding: 1rem 2rem;
        position: relative;
        > .title,
        > .sub-title {
            color: ${primaryMainColor};
            font-weight: 600;
            margin-bottom: 10px;
        }

        > .sub-title {
            color: ${dark3MainColor};
        }
        > .parrafo {
            > p {
                margin-bottom: 0.5rem;
                word-spacing: 3px;
                line-height: 1.4;
            }
        }
    }
`
const StyledTimelineStepCircle = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 5px;
    > span {
        color: ${lightMainColor};
        font-weight: 500;
        font-size: 14px;
        background: ${primaryMainColor};
        flex: 1;
        border-radius: 50%;
        min-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
    }
`
const StyledTimelineStepLine = styled.div`
    width: 10px;
    position: relative;
    background: #d9d9d9;
    flex: 1;
`
function primaryMainColor(p) {
    return p.theme.palette.primary.main
}
function lightMainColor(p) {
    return p.theme.palette.light.main
}
function dark3MainColor(p) {
    return p.theme.palette.dark3.main
}
