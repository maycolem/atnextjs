import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

import { Button, IconButton } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { dtFooterClick } from '@layout/dt'
import classNames from 'classnames'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { delay } from '@helpers/delay'
import useWindowSize from '@hooks/useWindowSize'
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import hexAlpha from 'hex-alpha'
import { tabs } from './tabsData'

export const TabMenu = () => {
    const pathname = useRouter().pathname
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    const { width, height } = useWindowSize()
    const [activeButton, setActiveButton] = useState(-1)
    const [showButtonLeft, setShowButtonLeft] = useState(false)
    const [showButtonRight, setShowButtonRight] = useState(false)
    const [refTabs, setRefTabs] = useState<HTMLDivElement | null>(null)

    useEffect(() => {
        if (ref) {
            handleOnResize(ref).then(() => {
                handleOnScroll(ref)
            })
        }
    }, [ref, width])

    useEffect(() => {
        if (ref) {
            ref.onscroll = (e) => {
                handleOnScroll(ref)
            }
        }
    }, [ref, showButtonLeft, showButtonRight])

    const handleOnResize = async (element: HTMLDivElement) => {
        element.style.width = `${0}px`
        element.style.opacity = `0`
        await delay(200)
        const width = element.parentElement.clientWidth
        element.style.width = `${width}px`
        element.style.opacity = `1`

        await delay(50)
        if (element.clientWidth === element.parentElement.clientWidth) {
            setShowButtonLeft(false)
            setShowButtonRight(false)
        }
    }

    const handleOnScroll = async (element: HTMLDivElement) => {
        await delay(100)
        const x = element.scrollLeft || 0

        if (x === 0) {
            setShowButtonLeft(false)
        }
        if (x > 0) {
            setShowButtonLeft(true)
        }
        // SI LLEGO AL LIMITE TRUE
        const resta = element.scrollLeft - (element.scrollWidth - element.clientWidth)

        if (Math.abs(resta) < 10 || Math.abs(element.scrollLeft) === element.scrollWidth - element.clientWidth) {
            setShowButtonRight(false)
        } else {
            setShowButtonRight(true)
        }
    }

    const handleOnClickButtonScroll = (value: string) => {
        const containerScroll = ref
        const vw = (window.innerWidth / 100) * 2
        let left = 0
        if (value === 'L') {
            left = containerScroll.scrollLeft - 160 - vw
        } else {
            left = containerScroll.scrollLeft + 160 + vw
        }
        containerScroll.scroll({
            top: 0,
            left,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        const paths = tabs.map((item) => item.path)
        const exist = paths.lastIndexOf(pathname)
        setActiveButton(exist)
    }, [pathname])

    const handleListenerInputs = async (element: HTMLDivElement) => {
        await delay(1000)
        const inputs = document.querySelectorAll('input')
        Array.from(inputs).map((input) => {
            input.onfocus = (e) => {
                element.classList.add('focus')
            }
            input.onblur = (e) => {
                element.classList.remove('focus')
            }
        })
    }

    useEffect(() => {
        if (refTabs) {
            handleListenerInputs(refTabs)
        }
    }, [refTabs, pathname])

    return (
        <Styled ref={(currentRef) => setRefTabs(currentRef)}>
            <StyledWrapperButton className={classNames('left', { hidden: !showButtonLeft })} onClick={() => handleOnClickButtonScroll('L')}>
                <StyledIconButton disabled={!showButtonLeft}>
                    <ChevronLeftIcon></ChevronLeftIcon>
                </StyledIconButton>
            </StyledWrapperButton>
            <StyledWrapperButton
                className={classNames('right', { hidden: !showButtonRight })}
                onClick={() => handleOnClickButtonScroll('R')}
            >
                <StyledIconButton disabled={!showButtonRight}>
                    <ChevronRight></ChevronRight>
                </StyledIconButton>
            </StyledWrapperButton>
            <StyledScrollContainer ref={(currentRef) => setRef(currentRef)} className="scroll-container">
                <>
                    <StyledContent>
                        {tabs.map((tab, index) => {
                            const Icon = tab.Icon
                            return (
                                <Link href={{ pathname: tab.path, hash: tab?.hash || '' }} key={index}>
                                    <StyledButton
                                        className={classNames({ active: activeButton === index })}
                                        onClick={() => {
                                            dtFooterClick(tab.dtText)
                                        }}
                                    >
                                        <Icon />
                                        <span>{tab.text}</span>
                                    </StyledButton>
                                </Link>
                            )
                        })}
                    </StyledContent>
                </>
            </StyledScrollContainer>
        </Styled>
    )
}

const Styled = styled.div`
    /* position: fixed; */
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    background: ${(p) => p.theme.layout.footer.tabMenu.background};
    z-index: 9;
    box-shadow: inset rgba(50, 50, 93, 0.4) 0px -0.5px 0px 1px;
    display: flex;
    overflow: hidden;

    &.focus {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
    }
`
const StyledWrapperButton = styled.div`
    && {
        position: absolute;
        top: -1px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        cursor: pointer;
        height: calc(100% + 2px);
        background: ${(p) => p.theme.layout.footer.tabMenu.background};
        transition: 150ms;
        &::after {
            content: '';
            position: absolute;
            width: 125%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            transition: 150ms;
        }
        &.left {
            left: 0;
            &::after {
                left: 100%;
                background: linear-gradient(to right, black, transparent);
            }
            &.hidden {
                left: -35px;
                &::after {
                    left: 0%;
                }
            }
        }
        &.right {
            right: 0;
            &::after {
                right: 100%;
                background: linear-gradient(to left, black, transparent);
            }
            &.hidden {
                right: -35px;
                &::after {
                    right: 0%;
                }
            }
        }
    }
`
const StyledIconButton = styled(IconButton)`
    && {
        flex: 1;
        height: 35px;
        width: 35px;
        padding: 0 !important;
        color: ${(p) => p.theme.layout.footer.tabMenu.contrastText};
        > svg {
            font-size: 30px;
        }
    }
`

const StyledScrollContainer: any = styled(ScrollContainer)`
    position: relative;
    display: flex;
    width: 0;
    z-index: 1;
    padding: 0 14px;
`
const StyledContent = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`

const StyledButton = styled(Button)`
    && {
        font-size: 0.55rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: ${(p) => p.theme.layout.footer.tabMenu.contrastText};
        padding: 7px 9px;
        gap: 3px;
        border-radius: 0;
        max-width: 80px;
        > svg {
            font-size: 1.3rem;
        }
        :hover:not(.active) {
            background: ${(p) => p.theme.primary};
        }
        &.active {
            background: ${(p) => p.theme.primary};
        }
        &.active:hover {
            background: ${(p) => p.theme.primary};
        }
    }
    > span {
        &::first-line {
            word-spacing: 9999rem;
        }
        > span ~ span {
            word-spacing: unset;
            display: table-caption;
        }
    }
`
