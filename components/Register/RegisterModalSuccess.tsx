/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { registerModalSuccessSelector, resetRegisterModalSuccess } from 'states/features/slices/registerModalSuccessSlice'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import regsitro_exitoso from './assets/regsitro_exitoso.gif'
import giftBottomIMG from './assets/gift.png'
import { Button, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useAppDispatch, useAppSelector } from '@states/store'

interface customWindow extends Window {
    fbq?: any
}
declare const window: customWindow

const RegisterModalSuccess = () => {
    const { isSuccesfully } = useAppSelector(registerModalSuccessSelector)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(isSuccesfully)
    const handleOpen = () => setOpen(true)
    const router = useRouter()
    const handleClose = () => {
        setOpen(false)
        dispatch(resetRegisterModalSuccess())
    }
    useEffect(() => {
        if (isSuccesfully) {
            // PIXEL
            window.fbq('track', 'CompleteRegistration')

            handleOpen()
        }
    }, [isSuccesfully])

    return (
        <StyledModal onClose={handleClose} open={open}>
            <ModalContentS>
                <div className="wrapper">
                    <ButtonSS className="close" disableTouchRipple onClick={handleClose} variant="contained">
                        <CloseIcon></CloseIcon>
                    </ButtonSS>
                    <img alt="Coins apuesta total" className="coins" src={regsitro_exitoso.src} />
                    <TextS id="divRegistroExitoso">¡Tu registro fue realizado con éxito!</TextS>
                    <WrapperBottomGiftS>
                        <Divider className="top" flexItem></Divider>
                        <div className="wrapper">
                            <div className="img">
                                <img alt="imagen gift" src={giftBottomIMG.src} />
                            </div>
                            <div className="text">
                                <p>
                                    Tu regalo de bienvenida espera por ti, anda a la opción{' '}
                                    <Link href={PATHS.CUENTA_BONOS_Y_TORNEOS_BONOS.url} className="text-link">
                                        <u>Mis bonos y torneos</u>
                                    </Link>{' '}
                                    que se encuentra bajo tu perfil y dale click a la opción <span className="reclamar">RECLAMAR</span>.
                                </p>
                            </div>
                        </div>
                        <Divider className="bottom" flexItem></Divider>
                    </WrapperBottomGiftS>
                    <StyledButton onClick={() => router.push(PATHS.CUENTA_BONOS_Y_TORNEOS_BONOS.url)} variant="contained">
                        Ir a mis bonos y torneos
                    </StyledButton>
                </div>
            </ModalContentS>
        </StyledModal>
    )
}

export default RegisterModalSuccess
const StyledButton = styled(Button)`
    && {
        text-transform: initial;
        font-size: 1rem;
        margin-bottom: 10px;
        animation-name: pulse;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7), 0 0 0 0 rgba(255, 0, 0, 0.7);
            }
            40% {
                /* transform: scale(1.1); */
                box-shadow: 0 0 0 20px rgba(255, 0, 0, 0), 0 0 0 0 rgba(255, 0, 0, 0.7);
            }
            80% {
                transform: scale(1);
                box-shadow: 0 0 0 20px rgba(255, 0, 0, 0), 0 0 0 10px rgba(255, 0, 0, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 0, 0, 0), 0 0 0 10px rgba(255, 0, 0, 0);
            }
        }
    }
`
const WrapperBottomGiftS = styled.div`
    & {
        padding: 10px;
        padding-top: 1rem;
        hr.top {
            margin-bottom: 1rem;
        }
        hr.bottom {
            margin-top: 1rem;
        }
        div.wrapper {
            display: grid;
            grid-template-columns: 0.2fr 1fr;
            div.img {
                /* padding: 1rem; */
                display: flex;
                justify-content: center;
                img {
                    height: auto;
                    object-fit: contain;
                    max-width: 60px;
                }
            }
            div.text p {
                font-size: 1.1rem;
                font-weight: 500;
                padding-left: 10px;
                color: ${(p) => p.theme.palette.alternate11.main};
                u {
                    color: ${(p) => p.theme.palette.info4.main};
                    cursor: pointer;
                }
                > span.reclamar {
                    color: ${(p) => p.theme.palette.primary.main};
                    font-size: 1rem;
                }
            }
        }
    }
`
const ButtonSS = styled(Button)`
    && {
        position: absolute;
        box-shadow: none;
        border-radius: 0;
        min-width: initial;
        height: 35px;
        width: 35px;
        right: 0;
        top: 0;

        > svg {
            font-size: 2.1rem;
        }
    }
`
const StyledModal = styled(Modal)`
    && {
        z-index: 99999 !important;
        overflow: auto;
    }
    && .MuiBackdrop-root {
        background-color: rgba(0, 0, 0, 0.8);
    }
`
const TextS = styled.div`
    /* position: absolute; */
    /* bottom: 40px; */
    margin-top: -60px;
    font-size: 1.2rem;
    font-weight: 500;
    /* color: ${(p) => p.theme.palette.alternate19.main}; */
    color: #696969;
    max-width: calc(160px + 1vw);
    text-align: center;
    ${MEDIA_QUERIES.min_width.mobileL} {
        margin-top: -80px;
    }
`
const ModalContentS = styled('div')`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    height: inherit;
    min-height: 100%;
    height: 100%;
    width: 100%;
    margin: auto;
    pointer-events: none;
    min-width: 360px;
    & {
        > .wrapper {
            border: 0.2rem solid #fff;
            box-shadow: 0px 0px 150px 10px #000000, 0 0 0.1rem #fff, 0 0 0.1rem #fff, 0 0 1rem #ff0000, 0 0 0.4rem #ff0000,
                0 0 1.6rem #ff0000, inset 0 0 1.3rem rgba(242, 242, 242, 1);
            pointer-events: all;
            max-width: 600px;
            background: white;

            /* padding-bottom: 2rem; */
            > img {
                margin-top: -60px;
                width: 100%;
                height: auto;
                max-width: 450px;
            }
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            position: relative;
        }
    }
`
