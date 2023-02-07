import styled from 'styled-components'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Backdrop, Button, Fade, Modal } from '@mui/material'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { PATHS } from 'routes/paths/PATHS'

const ModalLogoutRedirect = () => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = JSON.parse(window.localStorage.getItem('IsLogout'))
            setOpen(!!data ?? false)
        }
    }, [window])

    const handleOnClose = () => {
        if (typeof window !== 'undefined') {
            localStorage?.removeItem('IsLogout')
            setOpen(false)
        }
    }

    const handleGoLogin = async () => {
        if (typeof window !== 'undefined') {
            setOpen(false)
            localStorage?.removeItem('IsLogout')
        }
        await router.push(PATHS.LOGIN.url)
    }

    return (
        <ModalS
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            aria-describedby="transition-modal-description"
            aria-labelledby="transition-modal-title"
            closeAfterTransition
            onClose={handleOnClose}
            open={open}
        >
            <Fade in={open}>
                <ModalWrapperS>
                    <ModalContentS>
                        <p>Por tu seguridad tu sesión ha finalizado. Por favor vuelve a iniciar sesión.</p>
                        {/* <TimerS>
              <span>{timer}</span>
            </TimerS> */}
                        <div className="accions">
                            {/* <Button onClick={handleGoHome} variant="contained">
                Ir al Inicio
              </Button> */}
                            <Button color="primary" onClick={handleGoLogin} variant="contained">
                                Iniciar sesión
                            </Button>
                        </div>
                    </ModalContentS>
                </ModalWrapperS>
            </Fade>
        </ModalS>
    )
}

export default ModalLogoutRedirect
const TimerS = styled.div`
    & {
        display: flex;
        align-items: center;
        justify-content: center;
        > span {
            background: red;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            border: 3px solid #ff0808;
            width: 40px;
            height: 40px;
            font-weight: 700;
            font-size: 30px;
            color: #ff0808;
            color: white;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        }
    }
`
const ModalContentS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        > p {
            font-size: 1rem;
            color: ${(p) => p.theme.palette.text.primary};
            text-align: center;
        }
        > .accions {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            justify-content: center;
            > button {
                min-height: 35px;
                flex: 1 1 170px;
                max-width: 70%;
                display: block;
                font-size: 1rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-transform: lowercase;
                ::first-letter {
                    text-transform: uppercase;
                }
            }
        }
    }
`
const ModalS = styled(Modal)`
    & {
        z-index: 9999;
        overflow: auto;
        display: flex;
        align-items: center;
        font-size: 13px;
        padding: 1rem;
    }
`
const ModalWrapperS = styled.div`
    outline: none;
    background: white;
    position: relative;
    z-index: 1;
    padding: 2rem;
    /* overflow: auto; */
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 400px;
    ${MEDIA_QUERIES.min_width.mobileL} {
        height: auto;
        min-height: auto;
        max-width: 400px;
    }
    & {
        .close-modal {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            svg {
                cursor: pointer;
                font-size: 30px;
            }
        }
    }
`
