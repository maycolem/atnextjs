import styled, { css } from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { close, ModalRecargaMethodSelector, reset, setFrame } from 'states/slice/ModalRecarga'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import hexAlpha from 'hex-alpha'
import { GoogleTagManager } from 'google/TagManager'
import { ModalRecargaSelector } from 'states/slice/ModalRecarga'
import { userSelector } from '@states/features/slices/userSlice'
import { Backdrop, Button, Fade, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import classNames from 'classnames'
import { MetodoDeDeposito, MetodoFrame, MetodosDeDepositos } from '@layout/ModalRecarga'
import { dtRecargaBack, dtRecargaClose } from '@layout/dt'

export const ModalRecarga = () => {
    const [stepNext, setStepNext] = useState(0)
    const { isOpen } = useSelector(ModalRecargaSelector)
    const user = useSelector(userSelector)
    const { name } = useSelector(ModalRecargaMethodSelector)
    const dispatch = useDispatch()
    const ContextPannelsAtSRef = useRef<HTMLDivElement>(null)
    const handleOnClose = () => {
        dtRecargaClose(name)
        dispatch(close())
        dispatch(reset())
        handleResetNavigation()
    }
    const handleBackNavigation = (name, option) => {
        dispatch(setFrame(''))
        setStepNext(stepNext - 1)
        dtRecargaBack(name, option)
    }
    const handleNextNavigation = () => {
        ContextPannelsAtSRef.current.scrollIntoView({ block: 'start' })
        setStepNext(stepNext + 1)
    }

    const handleResetNavigation = () => {
        setStepNext(0)
    }

    useEffect(() => {
        const _ContextPannelsAtS = document.getElementById('ContextPannelsAtS')
        if (_ContextPannelsAtS) {
            _ContextPannelsAtS.style.opacity = '0'
            setTimeout(() => {
                _ContextPannelsAtS.style.opacity = '1'
            }, 200)
        }
    }, [stepNext])

    if (!user || !isOpen) {
        return <div></div>
    }

    return (
        <ModalS
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            closeAfterTransition
            onClose={handleOnClose}
            open={isOpen}
        >
            <Fade in={isOpen}>
                <ModalWrapperS>
                    <BackAndCloseS>
                        <ButtonS $stepNext={stepNext} className={classNames('back')} onClick={() => handleBackNavigation(name, 'retroceder')} variant="outlined">
                            <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                        </ButtonS>
                        <LocationS>Recarga</LocationS>
                        <Button className="close" onClick={handleOnClose} variant="contained">
                            <CloseIcon></CloseIcon>
                        </Button>
                    </BackAndCloseS>
                    <MainContentModalS>
                        <ContextPannelsAtS id="ContextPannelsAtS" ref={ContextPannelsAtSRef} $stepNext={stepNext}>
                            <>
                                <PannelAtS>
                                    <div className="wrapper">
                                        <Override>
                                            <MetodosDeDepositos onNext={handleNextNavigation}></MetodosDeDepositos>
                                        </Override>
                                    </div>
                                </PannelAtS>
                                <PannelAtS>
                                    <div className="wrapper">
                                        <MetodoDeDeposito onBack={handleBackNavigation} onNext={handleNextNavigation} />
                                    </div>
                                </PannelAtS>
                                <PannelAtS>
                                    <div className="wrapper">
                                        {stepNext === 2 && <MetodoFrame resetNavigation={handleResetNavigation} />}
                                    </div>
                                </PannelAtS>
                            </>
                        </ContextPannelsAtS>
                    </MainContentModalS>
                </ModalWrapperS>
            </Fade>
        </ModalS>
    )
}
interface PropsStyled {
    $stepNext: number
}
const MainContentModalS = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
`
const BackAndCloseS = styled.div`
    background: white;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 1rem;
    align-items: center;
    border-bottom: 1px solid ${(p) => p.theme.palette.alternate8.main};
    .MuiButton-root {
        border-radius: 0;
        padding: 0.3rem;
        line-height: 1;
        min-width: initial;
        svg {
            color: red;
            font-size: 2rem;
        }
    }
    .MuiButton-root.close {
        svg {
            color: white;
        }
    }
`
const Override = styled.div`
    && {
        .wrapper {
            ${MEDIA_QUERIES.min_width.tabletS} {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
            ${MEDIA_QUERIES.min_width.tabletS} {
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            }
            ${MEDIA_QUERIES.min_width.tabletL} {
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                padding: 2rem;
            }
            ${MEDIA_QUERIES.min_width.desktopXS} {
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                padding: 2rem 3rem;
            }
            ${MEDIA_QUERIES.min_width.desktopS} {
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                padding: 2rem 3rem;
            }
            ${MEDIA_QUERIES.min_width.desktopM} {
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                padding: 2rem 4rem;
            }
        }
    }
`
const ButtonS = styled(Button)<PropsStyled>`
    & {
        &.MuiButton-root.back {
            ${(p) => {
                if (p.$stepNext < 1)
                    return css`
                        & {
                            opacity: 0;
                            pointer-events: none;
                        }
                    `
            }}
        }
    }
`

const LocationS = styled.div`
    & {
        font-size: 0.95rem;
    }
`
const ModalS = styled(Modal)`
    & {
        z-index: 9999999 !important;
        overflow: auto;
        display: flex;
        align-items: center;
        padding: 0 0.5rem;

        .MuiBackdrop-root {
            position: absolute;
            min-width: calc(340px + 2rem);
        }
    }
`
const ModalWrapperS = styled.div`
    outline: none;
    background: white;
    position: relative;
    z-index: 1;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    overflow: hidden;

    height: 90vh;
    width: 95vw;
    max-width: 900px;
    max-height: 800px;
    min-width: 360px;
`

const ContextPannelsAtS = styled.div<PropsStyled>`
    display: flex;
    transition: transform 200ms ease, opacity 200ms ease;
    transform: translateX(calc(-100% * ${(p) => p.$stepNext}));
    flex: 1;
`
const PannelAtS = styled.div`
    flex: 1 0 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    & {
        > div.wrapper {
            flex: 1 0 0px;
            overflow-y: overlay;
            ::-webkit-scrollbar {
                width: 1rem;
            }
            ::-webkit-scrollbar-thumb {
                background-color: transparent;
                border: 4px solid transparent;
                border: 1px solid transparent;
                border-radius: 11rem;
                box-shadow: 16px 16px 16px 16px ${(p) => hexAlpha(p.theme.palette.alternate11.main, 0.7)} inset;
            }
            ::-webkit-scrollbar-track {
                position: absolute;
                right: -3rem;
                top: -5rem;
            }
        }
    }
`
