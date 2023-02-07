import useSimpleTimer from '@hooks/useSimpleTimer'
import { LoadingButton } from '@mui/lab'

import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import classnames from 'classnames'
import React, { useEffect } from 'react'
import styled from 'styled-components'

const ButtonGenerateCode = ({ loading, onClick, countDown, disabled = false, id, label = 'GENERAR CÓDIGO' }) => {
    const { timer, runTimer, inCountDown } = useSimpleTimer()

    useEffect(() => {
        countDown(inCountDown)
    }, [inCountDown])

    const handleOnClick = async () => {
        if (inCountDown || disabled || loading) {
            return
        }
        await onClick(runTimer)
    }

    return (
        <>
            <Styled
                className={classnames({ disabled: timer > 0 || disabled })}
                color="info2"
                disableFocusRipple
                disableRipple
                id={id}
                loading={loading}
                onClick={disabled ? () => null : handleOnClick}
                variant="contained"
            >
                {loading ? <span className="fake">loaging</span> : <span>{timer > 0 ? `REENVIAR: ${timer}` : label}</span>}
            </Styled>
        </>
    )
}

export default ButtonGenerateCode

const Styled = styled(LoadingButton)`
    && {
        border-radius: 0.4rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 37.39px;
        height: auto;
        padding: 0.9em 0;
        font-size: inherit;
        transition: 0.2s;
        border: 2px solid #acb9f0;
        font-size: 0.8em;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: initial;
        box-shadow: none !important;
        border: 2px solid #c0ddda;
        color: white;
        font-size: 0.94em;
        padding: 0.7em 1rem;
        position: relative;
        z-index: 1;
        /* &::after {
            content: '';
            width: 2rem;
            background: rgba(0, 0, 0, 0.23);
            position: absolute;
            left: calc(100% + 2px);
            height: 100%;
            z-index: -1;
        } */

        > span {
            text-transform: lowercase !important;
            display: block;
            &::first-letter {
                text-transform: uppercase !important;
            }
        }
        &.disabled {
            box-shadow: none;
            /* cursor: not-allowed !important; */
            border: 2px solid #c0ddda;
            color: white;
            :hover {
                opacity: 1;
            }
        }

        &.MuiLoadingButton-loading {
            box-shadow: none;
            color: white;
            border: 2px solid #c0ddda;
            background: ${(p) => p.theme.palette.info2.main};
            cursor: not-allowed !important;
            :hover {
                opacity: 1;
            }
        }
        &:hover {
            opacity: 0.8;
            box-shadow: none;
        }
        & {
            .MuiLoadingButton-loadingIndicator {
                color: white;
            }
            span {
                &.fake {
                    opacity: 0;
                }
                text-align: center;
                font-size: inherit;
                font-size: 0.7em;
                line-height: 1.1;
                @media (min-width: 420px) {
                    position: static;
                }
                ${MEDIA_QUERIES.min_width.desktopS} {
                    font-size: 0.65em;
                }
            }
        }
    }
`
