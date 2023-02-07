import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, IconButton, Snackbar } from '@mui/material'
import { onClose, onOpen, SnackBarSelector } from '@states/slice/layout/SnackBar'
import { useAppSelector, useAppDispatch } from '@states/store'
import useSimpleTimer from '@hooks/useSimpleTimer'
import { delay } from '@helpers/delay'
const useForcedClose = (autoHideDuration, open, cb) => {
    const { timer, runTimer } = useSimpleTimer(autoHideDuration)

    useEffect(() => {
        if (open && timer) {
            if (timer < 2) {
                cb()
            }
        }
    }, [open, timer])

    return { runTimer, timer }
}
export const SnackBar = () => {
    const { message, severity, open, autoHideDuration } = useAppSelector(SnackBarSelector)
    const { runTimer } = useForcedClose(autoHideDuration, open, handleClose)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    function handleClose(...props: any[]) {
        const reason = [...props][1]
        if (reason === 'clickaway') {
            return
        }
        dispatch(onClose())
    }
    useEffect(() => {
        if (open) {
            runTimer(Number(autoHideDuration) / 1000)
        }
    }, [open])
    const responseMessage = useMemo(() => {
        if (message.includes('$$')) {
            const res = message.split('$$')
            return (
                <StyledSpans>
                    {res.map((item, i) => (
                        <span className="" key={i}>
                            {item}
                        </span>
                    ))}
                </StyledSpans>
            )
        } else {
            return message
        }
    }, [message])

    useEffect(() => {
        setLoading(true)
        delay(500).then(() => setLoading(false))
    }, [message, severity, open, autoHideDuration])

    if (loading) return null

    return (
        <StyledSnackbar autoHideDuration={Number(autoHideDuration)} onClose={handleClose} open={open}>
            <StyledContent>
                <StyledAlert
                    action={
                        <IconButton color="inherit" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    }
                    severity={severity}
                    variant="filled"
                >
                    {responseMessage}
                </StyledAlert>
                <StyledProgress $autoHideDuration={autoHideDuration}></StyledProgress>
            </StyledContent>
        </StyledSnackbar>
    )
}
interface PropsStyled {
    $autoHideDuration?: number
}
const StyledSpans = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 8px;
        /* padding: 1rem; */
        /* padding-left: 0; */
        padding-top: 7px;
        padding-bottom: 7px;
        > span:first-of-type {
            font-weight: 600;
            font-size: 1rem;
        }
        > span {
            font-size: 0.92rem;
            font-weight: 400;
        }
    }
`
const StyledContent = styled.div`
    & {
        overflow: hidden;
        border-radius: 4px;
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        width: 90vw;
        max-width: 500px;
        width: 100%;
        margin: auto;
    }
`
const StyledProgress = styled.span<PropsStyled>`
    display: block;
    background: #a10000;
    height: 7px;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    animation-name: progress;
    animation-duration: ${(p) => `${p.$autoHideDuration / 1000 + 1}s`};
    animation-iteration-count: 1;
    animation-fill-mode: both;
    background: white;
    @keyframes progress {
        from {
            width: 100%;
        }
        to {
            width: 0%;
        }
    }
`
const StyledSnackbar = styled(Snackbar)`
    & {
        bottom: 50% !important;
        left: 50% !important;
        z-index: 99991 !important;
        width: 100% !important;
        transform: translateX(-50%) translateY(50%) !important;
        padding: 0 1rem !important;
    }
`

const StyledAlert = styled(Alert)`
    && {
        padding: 1rem;
        .MuiAlert-icon {
            color: white;
        }
        svg {
            color: white;
        }
        .MuiAlert-message {
            padding: 5px;
            display: flex;
            align-items: center;
            color: white;
            font-size: 1rem;
        }
    }
`
