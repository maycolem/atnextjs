import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserPromotionsQuery } from 'states/calimaco/calimacoDataApi'
import { userSelector } from 'states/features/slices/userSlice'
import { ActiveBonusAnimationAvatarSelector, closeAnimated } from 'states/slice/ActiveBonusAnimationAvatar'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import BonoCard from './BonoCard'

const BonosCards = () => {
    const [active, setActiveAccordion] = useState(null)
    const [activeP, setActiveAccordionP] = useState(null)
    const { animated: socketBonusActive } = useSelector(ActiveBonusAnimationAvatarSelector)
    const dispatch = useDispatch()
    const handleSetActiveAccordion = (i) => {
        setActiveAccordion(i)
    }
    const handleSetActiveAccordionP = (i) => {
        setActiveAccordionP(i)
    }
    const user = useSelector(userSelector)
    const { data, isFetching, refetch } = useGetUserPromotionsQuery({ session: user?.session })
    const computedData = () => {
        const filterData = data?.data
            ?.filter((item) => {
                return item?.status !== 'CANCELLED'
            })
            .filter((item) => item?.status !== 'EXPIRED')
        return filterData ?? []
        // return data?.data ?? []
    }
    useEffect(() => {
        setActiveAccordionP(null)
    }, [isFetching])

    useEffect(() => {
        if (socketBonusActive) {
            refetch()
            handleCloseAnimated()
        }
    }, [socketBonusActive])
    const handleCloseAnimated = () => {
        dispatch(closeAnimated())
    }
    return (
        <BonosCardsS>
            <TitleS className="active">Activos</TitleS>
            {computedData()
                .filter((item) => item?.status === 'ACTIVE' || item?.status === 'NOTIFIED')
                .map((bono, i) => {
                    return (
                        <BonoCard
                            active={active}
                            bono={bono}
                            className={'active'}
                            expanded={i}
                            key={i}
                            onClick={(lastKey) => {
                                if (lastKey === i) {
                                    handleSetActiveAccordion(null)
                                    return
                                }
                                handleSetActiveAccordion(i)
                            }}
                            refetch={refetch}
                        ></BonoCard>
                    )
                })}
            <TitleS className="pending">Pendientes</TitleS>
            {computedData()
                .filter((item) => item?.status === 'PENDING')
                .map((bono, i) => {
                    return (
                        <BonoCard
                            active={activeP}
                            bono={bono}
                            className={'pending'}
                            expanded={i}
                            key={i}
                            isStatusPending={true}
                            onClick={(lastKey) => {
                                if (lastKey === i) {
                                    handleSetActiveAccordionP(null)
                                    return
                                }
                                handleSetActiveAccordionP(i)
                            }}
                            refetch={refetch}
                        ></BonoCard>
                    )
                })}
        </BonosCardsS>
    )
}

export default BonosCards
const TitleS = styled.div`
    & {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding-bottom: 5px;
        color: ${(p) => p.theme.palette.secondary.main};
        text-transform: uppercase;
        font-weight: 500;
        /* &::before {
      content: '';
      width: 12px;
      height: 12px;
      position: relative;
      background: ${(p) => p.theme.palette.secondary.main};
      display: block;
      border-radius: 50%;
    } */
        &.pending {
            padding-top: 0.5rem;
        }
        &.active {
            color: ${(p) => p.theme.palette.success.main};
            /* &::before {
        background: ${(p) => p.theme.palette.success.main};
      } */
        }
    }
`
const BonosCardsS = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    padding-bottom: 1rem;
`
