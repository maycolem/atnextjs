import { Alert, IconButton, Snackbar } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PATHS } from 'routes/paths/PATHS'
import { Session } from 'services/Session'
import { onOpen, reset, SnackBarSelector } from 'states/slice/layout/SnackBar'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close'
import useSimpleTimer from 'hooks/useSimpleTimer'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const useForcedClose = (autoHideDuration, open, cb) => {
    const { timer, runTimer } = useSimpleTimer(autoHideDuration)

    useEffect(() => {
        if (open && timer) {
            if (timer < 2) {
                cb()
            }
        }
    }, [open, timer])

    return { runTimer }
}

const SnackBarForm = () => {
    const { message, severity, open, autoHideDuration } = useSelector(SnackBarSelector)
    const router = useRouter()
    const dispatch = useDispatch()
    const user = Session().getUser()
    const { runTimer } = useForcedClose(autoHideDuration, open, handleClose)

    useEffect(() => {
        if (open) {
            runTimer(Number(autoHideDuration) / 1000)
        }
    }, [open])

    useEffect(() => {
        if (user?.session) {
            dispatch(
                onOpen({
                    message: `Tienes una sesión activa en Apuesta Total.$$Cierra sesión para que otra persona pueda registrarse.$$Te vamos a redirigir al Home.`,
                    severity: 'error',
                    open: true,
                    autoHideDuration: 10000,
                })
            )
        }
        // return () => dispatch(onClose())
    }, [])
    async function handleClose() {
        if (user?.session) {
            await router.push(PATHS.HOME.url)
        }
        dispatch(reset())
    }
    const responseMessage = () => {
        if (message.includes('$$')) {
            const res = message.split('$$')
            return (
                <WrapperSpanS>
                    {res.map((item, i) => (
                        <span className="" key={i}>
                            {item}
                        </span>
                    ))}
                </WrapperSpanS>
            )
        }
        return message
        // if (typeof message === 'string') {
        //   return message
        // }
    }
    return (
        open && (
            <SnackbarS
                // anchorOrigin={{ vertical: 'center', horizontal: 'center' }}

                autoHideDuration={Number(autoHideDuration)}
                onClose={handleClose}
                open={open}
                // sx={{ height: '100%' }}
            >
                <WrapperSnakbarS>
                    <AlertS
                        action={
                            <>
                                <IconButton aria-label="close" color="inherit" onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </>
                        }
                        elevation={6}
                        severity={severity}
                        variant="filled"
                    >
                        {responseMessage()}
                    </AlertS>
                    <ProgressS $autoHideDuration={autoHideDuration}></ProgressS>
                </WrapperSnakbarS>
            </SnackbarS>
        )
    )
}

export default SnackBarForm
const WrapperSpanS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 8px;
        /* padding: 1rem; */
        /* padding-left: 0; */
        padding-bottom: 7px;
        overflow: hidden;
        > span:first-of-type {
            font-weight: 600;
            font-size: 1rem;
        }
        > span {
            font-size: 0.92rem;
            font-weight: 400;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
`
const WrapperSnakbarS = styled.div`
    & {
        overflow: hidden;
        border-radius: 4px;
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        width: 95vw;
        max-width: 500px;
        margin: auto;
    }
`
const ProgressS = styled.span`
    display: block;
    /* background: #a10000; */
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
const SnackbarS = styled(Snackbar)`
    & {
        /* top: 50%; */
        /* transform: translateY(-50%); */
        position: fixed !important;
        left: 50% !important;
        right: auto;
        width: 100% !important;
        z-index: 99999;
        bottom: 87% !important;
        transform: translateX(-50%) translateY(50%) !important;
        ${MEDIA_QUERIES.min_width.tabletS} {
            position: absolute !important;
            bottom: 50% !important;
        }
    }
`
const AlertS = styled(Alert)`
    & {
        /* background: black !important; */
        padding: 1rem 0rem 2rem 0rem !important;

        .MuiAlert-icon,
        .MuiAlert-action {
            padding: 8px 2px !important;
            flex: 0;
            margin: 0;
        }
        .MuiAlert-icon {
            padding: 1rem 0.6rem !important;
        }
        .MuiAlert-message {
            padding: 0px;
            padding-top: 1rem;
            display: flex;
            align-items: center;
            flex: 1;
            /* white-space: nowrap; */
        }
    }
`
