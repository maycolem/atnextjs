import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { ClickAwayListener } from '@mui/material'
import { useRouter } from 'next/router'
import { Menu } from '@layout/Hamburguer'
import { dtHamburguerClick } from '@layout/dt'
import classNames from 'classnames'

export const Hamburguer = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleOpenAway = () => {
        if (open) {
            dtHamburguerClick()
        }
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(!open)
        dtHamburguerClick()
    }

    useEffect(() => {
        setOpen(false)
    }, [router.asPath])

    return (
        <>
            <ClickAwayListener onClickAway={handleOpenAway}>
                <MenuHamburguerS id="toggle-menu-hamburgues-menu">
                    <StyledLines onClick={handleOpen}>
                        <StyledLine $indexdsa={'1'} className={classNames({ open: open, close: !open })}></StyledLine>
                        <StyledLine $indexdsa={'2'} className={classNames({ open: open, close: !open })}></StyledLine>
                        <StyledLine $indexdsa={'3'} className={classNames({ open: open, close: !open })}></StyledLine>
                    </StyledLines>
                    <Menu open={open} setOpen={setOpen} />
                </MenuHamburguerS>
            </ClickAwayListener>
        </>
    )
}

interface PropsStyled {
    $indexdsa?: string
    $open?: boolean
    $heightHeader?: number
}

const StyledLines = styled.div`
    & {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-height: 15px;
        height: 15px;
    }
`

const StyledLine = styled.div<PropsStyled>`
    & {
        width: 20px;
        height: 2px;
        background: ${(p) => p.theme.contrastText};
        animation-name: none;
        animation-duration: 250ms;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        opacity: 1;
        position: relative;
        @keyframes openMenu1 {
            from {
            }
            50% {
                transform: translateY(6px);
                opacity: 0.5;
            }
            to {
                transform: translateY(6.5px) rotate(-45deg);
                opacity: 1;
            }
        }
        @keyframes openMenu2 {
            from {
            }
            50% {
                width: 0;
                opacity: 0.5;
            }
            to {
                width: 0;
                opacity: 1;
            }
        }
        @keyframes openMenu3 {
            from {
            }
            50% {
                transform: translateY(-6px);
                opacity: 0.5;
            }
            to {
                transform: translateY(-6.5px) rotate(45deg);
                opacity: 1;
            }
        }
        @keyframes closeMenu1 {
            from {
                transform: translateY(6px) rotate(-45deg);
            }
            50% {
                transform: translateY(6px);
            }
            to {
            }
        }
        @keyframes closeMenu2 {
            from {
                width: 0;
            }
            50% {
                width: 0;
            }
            to {
                width: 20px;
            }
        }
        @keyframes closeMenu3 {
            from {
                transform: translateY(-6px) rotate(45deg);
            }
            50% {
                transform: translateY(-6px);
            }
            to {
            }
        }
        &.open {
            animation-name: ${(p) => 'openMenu' + p.$indexdsa};
        }
        &.close {
            animation-name: ${(p) => 'closeMenu' + p.$indexdsa};
        }
    }
`
const MenuHamburguerS = styled.div`
    & {
        height: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        /* width: 30px; */
        cursor: pointer;
        padding-left: 10px;
        /* padding-right: 10px; */
    }
`
