import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import { currencyAT } from '@helpers/currency'
import { customFormatDateLocation } from '@helpers/customFormatDateLocation'
import { delay } from '@helpers/delay'
import { Session } from '@services/Session'
import { useGetBetDetailsMutation } from '@states/calimaco/calimacoDataApi'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { MemoAlternarBets } from './AlternarBets'

const CardMobileBetsHistoryDetails = ({ created_date, operation, item }) => {
    const fromNowDate = new Date('2022-08-16T00:00:00')
    const createdDate = new Date(created_date?.replace(' ', 'T'))
    const [detailsBets, { isLoading, data: dataGetBetDetails }] = useGetBetDetailsMutation()
    const showAltenarClient = createdDate >= fromNowDate
    const user = Session().getUser()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fromNowDate = new Date('2022-08-16T00:00:00')
        const createdDate = new Date(created_date?.replace(' ', 'T'))
        const showAltenarClient = createdDate >= fromNowDate
        if (!showAltenarClient) {
            detailsBets({
                session: user?.session,
                company: process.env.REACT_APP_COMPANY,
                operation: operation,
            })
        }
    }, [operation, created_date])

    if (showAltenarClient) {
        return (
            <>
                <MemoAlternarBets></MemoAlternarBets>
            </>
        )
    }
    useEffect(() => {
        if (isLoading) {
            setLoading(true)
        } else {
            delay(300).then(() => setLoading(false))
        }
    }, [isLoading])

    const historyBetsDetails = dataGetBetDetails?.data || []
    if (loading) {
        return <LoadingDefault loading={loading}></LoadingDefault>
    }
    return (
        <Styled>
            <DesktopHistoryDetailsCardS
                className={classNames({
                    open: item?.status === 'OPEN',
                    lost: item?.status === 'LOST',
                    won: item?.status === 'WON',
                })}
            >
                <div className="top">
                    <div className="type">{t(item?.type)}</div>
                    <div className="status">{t(item?.status)}</div>
                </div>
                <div className="middle">
                    {historyBetsDetails &&
                        historyBetsDetails.map((detail, i) => {
                            return (
                                <DesktopHistoryDetailsCardRowS className="middle-row" key={i}>
                                    <div className="selection">{detail?.selection}</div>
                                    <div className="winning">{Number(detail?.odds ? detail?.odds : 0).toFixed(2)}</div>
                                    <div className="event_name">{detail?.event_name}</div>
                                    <div className="event_date">{customFormatDateLocation(detail?.event_date)}</div>
                                </DesktopHistoryDetailsCardRowS>
                            )
                        })}
                </div>
                <DesktopHistoryDetailsCardBottomS>
                    <div className="monto_total_label">Monto Total:</div>
                    <div className="monto_total">{currencyAT(item?.wager / 100)}</div>
                    <div className="ganancia_label">Ganancia Total:</div>
                    <div className="ganancia">{currencyAT(item?.winning / 100)}</div>
                </DesktopHistoryDetailsCardBottomS>
                <div className="bottom_fotter">
                    <DividerS></DividerS>
                    <div className="id_date">{`ID: ${item?.operation} ${customFormatDateLocation(item?.created_date)}`}</div>
                </div>
            </DesktopHistoryDetailsCardS>
        </Styled>
    )
}

export default CardMobileBetsHistoryDetails

const Styled = styled.div`
    min-height: 200px;
`
const DesktopHistoryDetailsCardBottomS = styled.div`
    & {
        display: grid;
        grid-template-columns: 150px 100px;
        padding: 9px;
        .monto_total_label,
        .ganancia_label {
            text-align: left;
        }
        .monto_total,
        .ganancia {
            text-align: right;
        }
    }
`
const DividerS = styled.div`
    & {
        display: block;
        width: 100%;
        border-bottom: 1px solid #ededed;
    }
`
const DesktopHistoryDetailsCardRowS = styled.div`
    & {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 9px;
        background: #ededed;
        color: #595959;
        .selection,
        .event_name {
            text-align: start;
        }
        .winning,
        .event_date {
            text-align: end;
        }
        .event_date {
            font-size: 0.85rem;
        }
    }
`
const DesktopHistoryDetailsCardS = styled.div`
    & {
        color: rgb(89, 89, 89);
        border-bottom: 8px solid #ededed;
        &.open {
            .top {
                background: #616161;
            }
        }
        &.lost {
            .top {
                background: #ff0000;
            }
        }
        &.won {
            .top {
                background: #009847;
            }
        }
        .top {
            color: #fff;
            display: flex;
            justify-content: space-between;
            padding: 9px;
        }
        .bottom_fotter {
            font-size: 0.85rem;
            display: flex;
            flex-direction: column;
            > .id_date {
                padding: 9px;
                align-self: flex-start;
            }
        }
    }
`
