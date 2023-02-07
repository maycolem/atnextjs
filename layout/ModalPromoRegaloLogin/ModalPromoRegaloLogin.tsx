import { User } from '@interfaces/user'
import { Button, Fade, Modal } from '@mui/material'
import { userSelector } from '@states/features/slices/userSlice'
import { PromoCashGiftsSelector, reset, show } from '@states/slice/cashGifts/PromoCashGifts'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close'
import promoMundialIMG from '@layout/ModalPromoRegaloLogin/assets/POP-UP_PROMO-MUNDIAL.webp'
import { useActiveUserPromotionMutation } from '@states/calimaco/calimacoDataApi'
import axios from 'axios'

export const ModalPromoRegaloLogin = () => {
    const user: User = useSelector(userSelector)
    const { showModal } = useSelector(PromoCashGiftsSelector)
    const dispatch = useDispatch()
    const [reclam, { isLoading }] = useActiveUserPromotionMutation()
    const [promotionId, setPromotionId] = useState(null)

    useEffect(() => {
        if (user) {
            const url = `${process.env.REACT_APP_CALIMACO_API_BASE}/data/getUserPromotions?session=${user?.session}&filter={"status":"PENDING"}`
            axios.get(url).then((res) => {
                const promotions: any = res?.data?.data
                if (Array.isArray(promotions) && promotions?.length > 0) {
                    const tags = 'PROMOS_RECLAMAR_EFECTIVO_LOGIN'
                    const query = (item) => item?.promotion?.tags === tags && item?.status === 'PENDING'
                    const promo = promotions.find(query)
                    if (promo) {
                        setPromotionId(promo.user_promotion_id)
                        dispatch(show())
                    }
                }
            })
        }
    }, [user])

    const handleOnClose = () => {
        dispatch(reset())
    }

    const handleOnClick = async () => {
        if (!promotionId || isLoading) {
            return
        }
        await reclam({ session: user?.session, promotion: promotionId })
        dispatch(reset())
    }

    if (!user && !promotionId) {
        return null
    }

    return (
        <StyledModal
            open={showModal}
            closeAfterTransition
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            BackdropProps={{
                timeout: 500,
            }}
            onClose={handleOnClose}
        >
            <Fade in={showModal}>
                <StyledWrapper>
                    <StyledWrapperImg>
                        <>
                            <img src={promoMundialIMG.src} alt="" />
                            <StyledButton>
                                <Button variant="contained" onClick={handleOnClick} disabled={isLoading}>
                                    <>
                                        <span>RECLAMAR</span>&nbsp;<span className="premio">PREMIO{'>>'}</span>
                                    </>
                                </Button>
                            </StyledButton>
                        </>
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
const StyledButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 15px;
    > button {
        padding: 8px;
        border-radius: 15px;
        background: #fb0101;
        border: 1px solid #dbc543;
        font-weight: 600;
        color: #fffbf9;
        font-size: clamp(0.9rem, 1.5vw, 1rem);
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%),
            inset 0px -10px 15px 3px rgba(0, 0, 0, 0.3);

        > span.premio {
            color: #f7c602;
        }
    }
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
