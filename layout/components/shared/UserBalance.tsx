import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import BalanceDetalle from './UserResumen/BalanceDetalle'

interface Props {
    isOpenBalance: boolean
}

const UserBalance = ({ isOpenBalance }: Props) => {
    return (
        <Styled $isOpenBalance={isOpenBalance}>
            <BalanceDetalle />
        </Styled>
    )
}

export default UserBalance

interface PropsStyled {
    $isOpenBalance: boolean
}

const Styled = styled.div<PropsStyled>`
    & {
        position: absolute;
        background: white;

        left: 50%;
        transform: translateX(-50%);
        top: calc(100% + 14px);
        border: 1px solid white;
        border-radius: 5px;
        --shadow-1: rgba(0, 0, 0, 0.1);
        --shadow-2: rgba(0, 0, 0, 0.2);
        --shadow-inset: rgba(255, 255, 255, 0.5);
        box-shadow: 0 4px 7px 0 var(--shadow-2), 0 2px 4px 0 var(--shadow-1), inset 0 0 0 1px var(--shadow-inset);
        &::after {
            transition: 0.15;
            position: absolute;
            bottom: calc(100% - 4px);
            content: '';
            display: block;
            position: absolute;
            width: 8px;
            height: 8px;
            background: white;
            border: 1px solid white;
            pointer-events: none;
            z-index: -1;
            left: calc(50% - 0.7vw - 4px);
            transform: rotate(-135deg) translateX(50%);
            -moz-transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
            box-shadow: 0 6px 14px 0 var(--shadow-2), 0 1px 2px 0 var(--shadow-1), inset 0 0 0 1px var(--shadow-inset);
        }
        transition: transform 30ms linear 40ms, opacity 40ms linear, right 40ms, top 40ms, pointer-events 40ms linear 40ms;
        opacity: 0;
        /* right: -10px; */
        top: 100%;
        pointer-events: none;
        z-index: -1;
        transform: scale(0.99) translateX(-50%);
        ${(p) => {
            if (p.$isOpenBalance) {
                return css`
                    transform: scale(1) translateX(-50%);
                    opacity: 1;
                    /* right: 0; */
                    top: calc(100% + 7px);
                    pointer-events: all;
                `
            }
        }}
    }
`
