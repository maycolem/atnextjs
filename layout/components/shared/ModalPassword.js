import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import Password from 'components/shared/password/Password'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { Backdrop, Fade, IconButton, Modal } from '@mui/material'
import { recuperarPasswordSelector, onClose } from 'states/features/slices/RecuperarPasswordSlice'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const ModalPassword = () => {
    const dispatch = useDispatch()
    const { open } = useSelector(recuperarPasswordSelector)
    const router = useRouter()
    const user = useSelector(userSelector)

    const handleOnClose = () => {
        dispatch(onClose())
    }

    useEffect(() => {
        handleOnClose()
    }, [router.pathname])
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
                        <IconButton onClick={handleOnClose}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </div>

                    <Password></Password>
                </ModalWrapperS>
            </Fade>
        </ModalS>
    )
}

export default ModalPassword

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
