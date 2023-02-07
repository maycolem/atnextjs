import { Fade, Modal } from '@mui/material'
import { userSessionSelector } from '@states/features/slices/userSlice'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close'
import { useActiveUserPromotionMutation, useClaimCodePromotionMutation } from '@states/calimaco/calimacoDataApi'
import { useAppSelector } from '@states/store'
import { getDatePeru } from '@states/api/apuestaTotalApi'
import { delay } from '@helpers/delay'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import { PATHS } from '@routes/paths/PATHS'
import IMG from '@layout/ModalPromoRegaloFinDeAño/assets/POP_UP_FIN_DE_AÑO.webp'
import IMG2 from '@layout/ModalPromoRegaloFinDeAño/assets/POP_UP_FIN_DE_AÑO_2.webp'

export const ModalPromoRegaloFinDeAño = () => {
    const session = useAppSelector(userSessionSelector)
    const [claimCode, { isLoading: isLoadingClaimCode }] = useClaimCodePromotionMutation()
    const [reclam, { isLoading }] = useActiveUserPromotionMutation()
    const [promotionId, setPromotionId] = useState<number>()
    const router = useRouter()
    const [isAlreadyClaimed, setIsAlreadyClaimed] = useState(false)
    const [pushBonos, setPushBonos] = useState(false)

    const handleGetDatePeru = async () => {
        const response = await getDatePeru()
        if (response && 'result' in response) {
            const isValid = handleValidDate(response.result)
            return isValid
        }
        return false
    }
    const handleValidDate = (value: string) => {
        const currentDate = new Date(value)
        const init = new Date('2022-12-31 23:30:00')
        const end = new Date('2023-01-01 00:30:00')
        if (currentDate > init && currentDate < end) {
            return true
        }
        return false
    }
    const handleClaimCode = async (session: string) => {
        const isValid = await handleGetDatePeru()
        if (isValid) {
            const data = await claimCode({ session: session, code: 'feliz2023freespins' })
            if (data && 'data' in data && data.data.result === 'OK') {
                const user_promotion_id = data.data.user_promotion.user_promotion_id
                await delay(2000)
                setPromotionId(user_promotion_id)
            }
        } else {
            console.error('FECHA LIMITE SUPERADA')
            setPromotionId(undefined)
            return
        }
    }

    useEffect(() => {
        if (session) {
            handleClaimCode(session)
        }
    }, [session])

    const handleReclamPromotion = async (promotionId: number) => {
        const response = await reclam({ session: session, promotion: promotionId })
        if (response && 'data' in response && response.data.result === 'OK') {
            setPushBonos(true)
        }
        if (response && 'data' in response && response.data.description === 'Code already claimed') {
            setIsAlreadyClaimed(true)
        }
        if (response && 'data' in response && response.data.description === 'Another promotion already activated') {
            setIsAlreadyClaimed(true)
        }
    }
    useEffect(() => {
        if (promotionId && session) {
            handleReclamPromotion(promotionId)
        }
    }, [promotionId, session])

    const handleOnClose = () => {
        setPromotionId(undefined)
    }

    const handleOnClick = async (isPush: boolean) => {
        if (isPush) {
            await router.push(PATHS.CUENTA_BONOS_Y_TORNEOS_BONOS.url)
            setPromotionId(undefined)
            return
        }
        await reclam({ session: session, promotion: promotionId })
        await router.push(PATHS.CUENTA_BONOS_Y_TORNEOS_BONOS.url)
        setPromotionId(undefined)
        return
    }

    if (!session && !promotionId) {
        return null
    }

    return (
        <StyledModal
            open={!!promotionId}
            closeAfterTransition
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            BackdropProps={{
                timeout: 500,
            }}
            onClose={handleOnClose}
        >
            <Fade in={!!promotionId}>
                <StyledWrapper>
                    <StyledWrapperImg>
                        <img src={isAlreadyClaimed ? IMG2.src : IMG.src} alt="banner" />
                        <StyledButton>
                            <StyledLoadingButton
                                variant="contained"
                                disabled={isLoadingClaimCode || isLoading}
                                loading={isLoadingClaimCode || isLoading}
                                onClick={() => handleOnClick(pushBonos)}
                            >
                                <div className="content">
                                    <span>Ir a mis bonos</span>
                                </div>
                            </StyledLoadingButton>
                        </StyledButton>

                        <CloseButton onClick={handleOnClose}>
                            <CloseIcon></CloseIcon>
                        </CloseButton>
                    </StyledWrapperImg>
                </StyledWrapper>
            </Fade>
        </StyledModal>
    )
}

const StyledModal = styled(Modal)`
    && {
        overflow: auto;
        .MuiBackdrop-root {
            background-color: rgba(0, 0, 0, 0.8);
        }
    }
`
const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    cursor: pointer;
    > svg {
        font-size: 30px;
        color: #fffbf9;
    }
    ${MEDIA_QUERIES.min_width.tabletS} {
        width: 35px;
        height: 35px;
    }
`
const StyledLoadingButton = styled(LoadingButton)`
    && {
        padding: clamp(7px, 2vw, 9px) clamp(16px, 2vw, 20px);
        border-radius: 15px;
        border: 1px solid #dbc543;
        font-weight: 600;
        font-size: clamp(0.7rem, 2vw, 0.85rem);
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%),
            inset 0px -10px 15px 3px rgba(0, 0, 0, 0.3);

        &.Mui-disabled {
            color: white;
            cursor: not-allowed;
        }

        &.MuiLoadingButton-loading > div.content {
            opacity: 0;
            z-index: -1;
        }

        &.MuiLoadingButton-loading > div.MuiLoadingButton-loadingIndicator {
            color: white;
        }

        > div > span.premio {
            color: #f7c602;
        }
    }
`
const StyledButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const StyledWrapperImg = styled.div`
    position: relative;
    max-width: 450px;
    border: 0.2rem solid #fff;
    box-shadow: 0px 0px 150px 10px #000000, 0 0 0.1rem #fff, 0 0 0.1rem #fff, 0 0 1rem #ff0000, 0 0 0.4rem #ff0000, 0 0 1.6rem #ff0000,
        inset 0 0 1.3rem #bc13fe;
`
const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    min-width: 200px;
    min-height: 500px;
`
