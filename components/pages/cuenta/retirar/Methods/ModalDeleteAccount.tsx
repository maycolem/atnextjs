import { Alert, AlertTitle, Backdrop, Button, Fade, Modal } from '@mui/material'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import WarningIcon from '@mui/icons-material/Warning'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    nameAccount: string
    handleDeleteBank: () => Promise<void>
}

type ValueModal = 'Si' | 'No'

export const ModalDeleteAccount = ({ open, setOpen, nameAccount, handleDeleteBank }: Props) => {
    const [loadingModal, setLoadingModal] = useState(false)
    const handleOnClickModal = async (value: ValueModal) => {
        setLoadingModal(true)
        if (value === 'Si') {
            await handleDeleteBank()
            setOpen(false)
            setLoadingModal(false)
        }
        if (value === 'No') {
            setOpen(false)
            setLoadingModal(false)
        }
    }

    return (
        <StyledModal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            disableAutoFocus
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <StyledModalContent>
                    <StyledModalContentMiddle>
                        <WarningIcon />
                        <div>
                            <AlertTitle>¿Estás seguro?</AlertTitle>
                            <p>¿Realmente desea borrar esta Cuenta Bancaria?</p>
                            <p>{nameAccount}</p>
                        </div>
                    </StyledModalContentMiddle>
                    <StyledModalButtons>
                        <Button onClick={() => handleOnClickModal('Si')} variant="contained" disabled={loadingModal}>
                            Sí, borrar
                        </Button>
                        <Button onClick={() => handleOnClickModal('No')} variant="contained" color="dark">
                            No
                        </Button>
                    </StyledModalButtons>
                </StyledModalContent>
            </Fade>
        </StyledModal>
    )
}
const StyledModalContentMiddle = styled.div`
    display: flex;
    gap: 20px;
    > svg {
        margin-top: 5px;
        color: ${(p) => p.theme.palette.primary.main};
    }
    > div {
        .MuiAlertTitle-root {
            font-size: 1rem;
        }
        > p {
            color: #4f4f4f;
            font-size: 0.9rem;
        }
    }
`
const StyledModalButtons = styled.div`
    display: flex;
    gap: 10px;
    justify-content: end;
    padding: 0 20px;
    > button {
        text-transform: initial;
        padding: 5px 10px;
        min-width: 100px;
    }
`
const StyledModalContent = styled.div`
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    padding: 30px 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.23);
    max-width: 500px;
    margin: auto;
    background: white;
    gap: 20px;
`
const StyledModal = styled(Modal)`
    && {
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .MuiBackdrop-root {
            background-color: rgba(0, 0, 0, 0.7);
        }
    }
`
