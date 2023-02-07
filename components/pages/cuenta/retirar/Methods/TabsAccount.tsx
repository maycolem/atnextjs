import { delay } from '@helpers/delay'
import useWindowSize from '@hooks/useWindowSize'
import { Button } from '@mui/material'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import classNames from 'classnames'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'

type TabKey = 'NUEVA_CUENTA' | 'SELECCIONAR_CUENTA' | ''
interface Tabs {
    name: string
    key: TabKey
}
interface Props {
    tabs: Tabs[]
    onActive: Dispatch<SetStateAction<TabKey>>
    defaultActive?: TabKey
}

export const TabsAccount = ({ tabs, onActive, defaultActive }: Props) => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    const { t } = useTranslation()
    const [showButtonLeft, setShowButtonLeft] = useState(false)
    const [showButtonRight, setShowButtonRight] = useState(false)
    const { width, height } = useWindowSize()

    const [active, setActive] = useState<TabKey>(defaultActive)
    const handleOnClick = (name: string, url: TabKey) => {
        setActive(url)
    }
    useEffect(() => {
        if (ref) {
            handleOnResize(ref).then(() => {
                handleOnScroll(ref)
            })
        }
    }, [ref, width])

    useEffect(() => {
        onActive(active)
    }, [active])

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
        if (Math.abs(resta) < 50 || Math.abs(element.scrollLeft) === element.scrollWidth - element.clientWidth) {
            setShowButtonRight(false)
        } else {
            setShowButtonRight(true)
        }
    }

    return (
        <Styled ref={(currentRef) => setRef(currentRef)} className="scroll-container">
            <StyledContent>
                {tabs.map(({ name, key }, i) => {
                    return (
                        <StyledButton className={classNames({ active: active === key })} key={i} onClick={() => handleOnClick(name, key)}>
                            {t(name)}
                        </StyledButton>
                    )
                })}
            </StyledContent>
        </Styled>
    )
}

interface StyledProps {
    as?: React.ElementType | keyof JSX.IntrinsicElements
    ref?: any
}

const Styled = styled(ScrollContainer)<StyledProps>`
    position: relative;
    display: flex;
    width: 0;
    z-index: 1;
    padding: 0.5rem 14px;
    border-top: 1px solid rgb(217, 217, 217);
    border-bottom: 1px solid rgb(217, 217, 217);
    background: rgb(243, 243, 243);
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 0 14px;
        background: transparent;
        border-top: 0;
    }
`

const StyledContent = styled.div`
    display: flex;
    gap: 8px;
    margin: auto;
`
const StyledButton = styled(Button)`
    && {
        padding: 0.5rem 1rem;
        text-transform: lowercase;
        display: block;
        max-width: max-content;
        min-width: 120px;
        /* min-width: fit-content; */
        white-space: nowrap;
        border: 1px solid transparent;
        font-size: 1rem;
        color: ${(p) => p.theme.palette.alternate13.main};
        :hover {
            color: ${(p) => p.theme.palette.dark2.dark};
            background: ${(p) => p.theme.palette.light.main};
            border: 1px solid transparent;
        }
        &::first-letter {
            text-transform: uppercase;
        }
        &.active {
            color: ${(p) => p.theme.palette.dark2.dark};
            background: ${(p) => p.theme.palette.light.main};
            border: 1px solid ${(p) => p.theme.palette.alternate8.main};
        }
        ${MEDIA_QUERIES.min_width.desktopS} {
            /* kdsjkfndfkj */
            border: none;
            border-radius: 0;
            border-bottom: 3px solid transparent;
            &.active {
                border: none;
                border-bottom: 3px solid ${(p) => p.theme.palette.dark.main};
            }
            :hover:not(.active) {
                border: none;

                border-bottom: 3px solid ${(p) => p.theme.palette.alternate8.main};
            }
        }
    }
`
