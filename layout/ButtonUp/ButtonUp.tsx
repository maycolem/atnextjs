import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'

export const ButtonUp = () => {
    const [visibleBottonTop, setVisibleBottonTop] = useState(false)

    useEffect(() => {
        let mounted = true
        let lastScroll = 0
        const func = () => {
            const currentScroll = window?.pageYOffset || document?.documentElement?.scrollTop
            if (lastScroll < currentScroll && currentScroll > 300) {
                if (mounted) {
                    setVisibleBottonTop(true)
                }
            } else {
                if (currentScroll <= 300) {
                    if (mounted) {
                        setVisibleBottonTop(false)
                    }
                }
            }
            lastScroll = currentScroll
        }
        window.addEventListener('scroll', func)
        return () => {
            window.removeEventListener('scroll', func)
            mounted = false
        }
    }, [])
    return (
        <StyledButtonUp $visibleBottonTop={visibleBottonTop}>
            <button
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    window.scrollTo({ top: 0, behavior: 'auto' })
                }}
                title="Hacia arriba wiii :D !"
            >
                <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
            </button>
        </StyledButtonUp>
    )
}
interface PropsStyled {
    $visibleBottonTop?: boolean
}
const StyledButtonUp = styled.div<PropsStyled>`
    & {
        position: fixed;
        bottom: calc(1rem + 50px);
        right: 1rem;
        width: 50px;
        height: 50px;
        z-index: 999;
        transition: 150ms;
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        ${MEDIA_QUERIES.min_width.desktopS} {
            right: 2rem;
            bottom: 2rem;
            width: 60px;
            height: 60px;
        }
        ${(p) => {
            if (p.$visibleBottonTop) {
                return css`
                    visibility: visible;
                    opacity: 1;
                    pointer-events: all;
                `
            }
        }}
        > button {
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background: ${(p) => p.theme.palette.primary.main};
            box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
            opacity: 1;

            > svg {
                font-size: 2.7rem;
                transform: scale(1.3);
                color: white;
            }
        }
    }
`
