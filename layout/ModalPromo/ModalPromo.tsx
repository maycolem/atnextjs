import React, { useEffect } from 'react'
import winnerImg from '@layout/ModalPromo/assets/winner.jpeg'
import loserImg from '@layout/ModalPromo/assets/loser.jpeg'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '@states/features/slices/userSlice'
import { User } from '@interfaces/user'
import { KushkiPromoBonusSelector, reset, show } from '@states/slice/kushki/PromoBonus'
import { Button, Fade, Modal } from '@mui/material'
import { useActiveUserPromotionMutation } from '@states/calimaco/calimacoDataApi'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import CloseIcon from '@mui/icons-material/Close'
interface customWindow extends Window {
    handleGetUserPromotion?: any
}
declare const window: customWindow
export const ModalPromo = () => {
    // const user = Session().getUser()
    const user: User = useSelector(userSelector)
    const kushkiPromoSelector = useSelector(KushkiPromoBonusSelector)
    const dispatch = useDispatch()
    const [reclam, { isLoading }] = useActiveUserPromotionMutation()

    const BannerContent = ({ kushkiPromoSelector }) => {
        const type = kushkiPromoSelector.type
        const promotionId = kushkiPromoSelector.promotionId

        if (!type) return <></>

        const handleOnClick = async () => {
            if (isLoading) return
            await reclam({ session: user?.session, promotion: promotionId })
            dispatch(reset())
        }

        if (type === 'winner') {
            return (
                <>
                    <img src={winnerImg.src} alt="" />
                    <StyledButton>
                        <Button variant="contained" onClick={handleOnClick}>
                            <>
                                <span>RECLAMAR</span>&nbsp;<span className="premio">PREMIO{'>>'}</span>
                            </>
                        </Button>
                    </StyledButton>
                </>
            )
        } else {
            return (
                <>
                    <img src={loserImg.src} alt="" />
                </>
            )
        }
    }

    // MAYOR O IGUAL A 20 SOLES

    useEffect(() => {
        if (user) {
            window.handleGetUserPromotion = (promotionId) => {
                const url = `${process.env.REACT_APP_CALIMACO_API_BASE}/data/getUserPromotions?session=${user?.session}`
                axios.get(url).then((res) => {
                    const promotions: any = res?.data?.data
                    if (Array.isArray(promotions) && promotions?.length > 0) {
                        const promoMundial = promotions.find((item) => item?.promotion?.promotion === promotionId)
                        if (promoMundial && promoMundial?.status === 'PENDING') {
                            if (promoMundial?.promotion?.promotion) {
                                dispatch(show({ type: 'winner', promotionId: promoMundial.user_promotion_id }))
                                return
                            }
                        }
                    }
                    dispatch(show({ type: 'loser', promotionId: '' }))
                    return
                })
            }
        }
    }, [user])

    const handleOnClose = () => {
        dispatch(reset())
        try {
            delete window.handleGetUserPromotion
        } catch (e) {
            window['handleGetUserPromotion'] = undefined
        }
    }

    if (!user) {
        return <></>
    }

    return (
        <StyledModal
            open={kushkiPromoSelector.showModal}
            // BackdropComponent={Backdrop}
            closeAfterTransition
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            BackdropProps={{
                timeout: 500,
            }}
            onClose={handleOnClose}
        >
            <Fade in={kushkiPromoSelector.showModal}>
                <StyledWrapper>
                    <StyledWrapperImg>
                        <BannerContent kushkiPromoSelector={kushkiPromoSelector} />
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
    /* ${MEDIA_QUERIES.min_width.tabletS} {
        bottom: clamp(40px, 4vw, 60px);
    } */
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
