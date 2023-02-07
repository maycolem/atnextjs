import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Login from 'components/shared/login/Login'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/router'
import UserMenu from './UserMenu'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { Backdrop, Fade, IconButton, Modal } from '@mui/material'
import { loginModalSelector, onClose } from 'states/features/slices/LoginModalSlice'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import Password from 'components/shared/password/Password'
import styled, { css } from 'styled-components'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const ModalLogin = () => {
    const dispatch = useDispatch()
    const { open } = useSelector(loginModalSelector)
    const router = useRouter()
    const user = useSelector(userSelector)
    const [showRecuperar, setShowRecuperar] = useState(false)
    const handleOnClose = () => {
        dispatch(onClose())
    }

    // useEffect(() => {
    //   handleOnClose()
    // }, [router.pathname])
    useEffect(() => {
        if (user) {
            handleOnClose()
        }
    }, [user])

    if (!open) return null

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
                    <div className="close-modal">
                        {showRecuperar && (
                            <ButtonS
                                onClick={() => {
                                    setShowRecuperar(false)
                                }}
                            >
                                <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                                Login
                            </ButtonS>
                        )}

                        <IconButtonS onClick={handleOnClose}>
                            <CloseIcon></CloseIcon>
                        </IconButtonS>
                    </div>
                    <WrapperS $showRecuperar={showRecuperar}>
                        <div className="login">
                            <Login setShowRecuperar={setShowRecuperar}></Login>
                        </div>
                        <div className="password">
                            <Password></Password>
                        </div>
                    </WrapperS>
                </ModalWrapperS>
            </Fade>
        </ModalS>
    )
}
export default ModalLogin
const IconButtonS = styled(IconButton)`
    & {
        margin-left: auto;
    }
`
const ButtonS = styled.div`
    & {
        font-size: 2rem;
        font-size: 1rem;
        font-weight: 300;
        font-weight: 400;
        /* transform: scaleX(1.3); */
        display: flex;
        align-items: center;
        gap: 5px;
        color: ${(p) => p.theme.palette.alternate11.main};
        cursor: pointer;
    }
`
const WrapperS = styled.div`
    & {
        display: flex;
        transition: 100ms;
        > div {
            flex: 1 0 100%;
            &.password {
                opacity: 0;
                pointer-events: none;
                visibility: hidden;
            }
            &.login {
                opacity: 1;
                pointer-events: all;
                visibility: visible;
            }
        }
        ${(p) => {
            if (p.$showRecuperar) {
                return css`
                    transform: translateX(-100%);
                    > div {
                        &.password {
                            opacity: 1;
                            pointer-events: all;
                            visibility: visible;
                        }
                        &.login {
                            opacity: 0;
                            pointer-events: none;
                            visibility: hidden;
                        }
                    }
                `
            }
        }}
    }
`
const ModalS = styled(Modal)`
    & {
        z-index: 9999;
        overflow: auto;
        display: flex;
        align-items: center;
        font-size: 13px;
    }
`
const ModalWrapperS = styled.div`
    outline: none;
    background: white;
    position: relative;
    z-index: 1;
    padding: 4rem 2rem;
    /* overflow: auto; */
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 95vw;
    min-width: 330px;
    height: auto;
    min-height: auto;
    overflow: hidden;
    ${MEDIA_QUERIES.min_width.mobileL} {
        height: auto;
        min-height: auto;
        max-width: 400px;
    }
    & {
        .close-modal {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            svg {
                cursor: pointer;
                font-size: 30px;
            }
        }
    }
`
