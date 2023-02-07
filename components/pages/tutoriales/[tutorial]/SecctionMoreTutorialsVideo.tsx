import { Tutorial } from '@interfaces/index'
import { delay } from '@helpers/delay'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import data from '../dataTutoriales'
import TutorialComponent from '../Tutorial'

const SecctionMoreTutorialsVideo = () => {
    const [showButtonLeft, setShowButtonLeft] = useState(false)
    const [showButtonRight, setShowButtonRight] = useState(false)
    // const id = 'scroll-indian-c5f63289b362f2d77bfed610658fed42751027ed75316ccc9f2734688dee'
    // const ContainerElement: HTMLElement | null = document.getElementById(id)
    const ref = useRef<HTMLDivElement>()
    const [animatedNoMoreLobbies, setAnimatedNoMoreLobbies] = useState(false)

    useEffect(() => {
        delay(500).then(() => {
            const scrollElement = document.getElementById('b41888f297f580278b7057571f2110f657ef881d2fd33bbb1f498615971d') as HTMLDivElement
            ref.current = scrollElement
            const ContainerElement = ref.current
            if (ContainerElement) {
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
                }
            }
        })
    }, [ref.current])
    return (
        <ScrollWrapper>
            <>
                {showButtonLeft && (
                    <ButtonArrowS
                        className="left"
                        onClick={() => {
                            const ContainerElement = ref.current
                            if (ContainerElement) {
                                // console.log(ContainerElement.scrollWidth - ContainerElement.clientWidth)
                                const back = ContainerElement.scrollLeft - 500
                                const aument = (window.innerWidth / 100) * 15
                                ContainerElement.scroll({
                                    top: 0,
                                    left: back - aument,
                                    behavior: 'smooth',
                                })
                                // sliderRef.current.slickPrev()
                            }
                        }}
                    >
                        <span>&#60;</span>
                    </ButtonArrowS>
                )}
                {showButtonRight && (
                    <ButtonArrowS
                        className="right"
                        onClick={() => {
                            const ContainerElement = ref.current
                            if (ContainerElement) {
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
                        <span>&#62;</span>
                    </ButtonArrowS>
                )}
            </>
            <StyledScrollContainer id="b41888f297f580278b7057571f2110f657ef881d2fd33bbb1f498615971d" className="scroll-container">
                <StyledScrollContents>
                    {data.map(({ title, shortDescription, key, src, img }: Tutorial, i) => {
                        return (
                            <StyledScrollContentContent key={i}>
                                <TutorialComponent description={shortDescription} pathnameKey={key} src={src} img={img} title={title}></TutorialComponent>
                            </StyledScrollContentContent>
                        )
                    })}
                </StyledScrollContents>
            </StyledScrollContainer>
        </ScrollWrapper>
    )
}

export default SecctionMoreTutorialsVideo
const ButtonArrowS = styled.div`
    & {
        box-shadow: rgba(131, 121, 121, 0.2) 0px 2px 3px;
        height: calc(100% - 14px);
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
const ScrollWrapper = styled.div`
    position: relative;
`
const StyledScrollContainer = styled(ScrollContainer)`
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 14px;
    display: flex;
    gap: 0.8rem;
    min-width: 100%;
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding-left: calc(50px + 14px);
        padding-right: calc(50px + 14px);
    }
`
const StyledScrollContents = styled.div`
    display: flex;
    gap: 14px;
`
const StyledScrollContentContent = styled.div`
    flex: 1 1 25%;
    min-width: 250px;
    position: relative;
`
