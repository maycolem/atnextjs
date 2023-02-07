import { BetsHistory } from '@interfaces/index'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import { customFormatDateLocation } from '@helpers/customFormatDateLocation'
import { Button } from '@mui/material'
import { PATHS } from '@routes/paths/PATHS'
import { useRouter } from 'next/router'
import { MemoAlternarBets } from './AlternarBets'
import classNames from 'classnames'
import { delay } from '@helpers/delay'
import useHeightHeader from '@hooks/useHeightHeader'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import hexAlpha from 'hex-alpha'
import { currencyAT } from '@helpers/currency'
import { useTranslation } from 'react-i18next'
import CardMobileBetsHistoryDetails from './CardMobileBetsHistoryDetails'
interface Props {
    bets: Array<BetsHistory>
}
interface customWindow extends Window {
    ASb?: any
}
declare const window: customWindow
const CardMobileBetsHistory = ({ bets }: Props) => {
    const router = useRouter()
    const gameHash: string = window.location.hash.split('/')[2]
    const { heightHeader } = useHeightHeader()
    const [loading, setLoading] = useState(false)
    const [isDestroy, setIsDestroy] = useState(false)
    const { t } = useTranslation()

    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>, game: string) => {
        // const hash = `${PATHS.MIS_APUESTAS_DEPORTIVAS.url}/#/mybets/${item.game}`

        // history.pushState(null, '', hash)
        setIsDestroy(false)
        setLoading(true)
        router.push(`${PATHS.MIS_APUESTAS_DEPORTIVAS.url}/#/mybets/${game}`)
        // const hash = `${PATHS.MIS_APUESTAS_DEPORTIVAS.url}/#/mybets/${game}`
        // history.pushState(null, '', hash)
        if (e.target) {
            const button = e.currentTarget
            const lastActiveCard: HTMLDivElement = document.querySelector('.StyledItem.active')
            const card: HTMLDivElement = button.closest('.StyledItem')
            if (game === gameHash) {
                const hash = `${PATHS.MIS_APUESTAS_DEPORTIVAS.url}/`
                history.pushState(null, '', hash)
                if (window && 'Abs' in window) {
                    window.ASb.destroy()
                }
                setIsDestroy(true)
                card.classList.remove('active')
                card.style.marginBottom = '0px'
                return
            }
            if (lastActiveCard) {
                lastActiveCard.classList.remove('active')
                lastActiveCard.style.marginBottom = '0px'
            }
            await delay(300)
            const location = getElemDistance(card)
            window.scrollTo({
                behavior: 'auto',
                top: location - heightHeader - 5,
            })
            await delay(300)
            card.classList.add('active')
            card.style.marginBottom = '50px'
            await delay(100)
            // element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        setLoading(false)
    }
    const getElemDistance = function (elem) {
        let location = 0
        if (elem.offsetParent) {
            do {
                location += elem.offsetTop
                elem = elem.offsetParent
            } while (elem)
        }
        return location >= 0 ? location : 0
    }

    useEffect(() => {
        const card: HTMLDivElement = document.querySelector('.StyledItem.active')
        if (card) {
            card.classList.remove('active')
            card.style.marginBottom = '0px'
        }
    }, [bets])

    return (
        <Styled>
            {bets.map((item, i) => {
                return (
                    <StyledItem key={i} className={classNames('StyledItem')}>
                        <StyledTitle className="title-id" $status={item?.status}>
                            {item.game}
                        </StyledTitle>
                        <StyledItemContent>
                            <div className="row">
                                <div className="title">Fecha y hora de creación</div>
                                <div className="row-content">
                                    <p>{customFormatDateLocation(item.created_date)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="title">Tipo</div>
                                <div className="row-content">
                                    {item?.account === 'BETTING-BONUS' ? <StyledCardGiftcardIcon /> : ''}
                                    <p>{item.type}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="title">Monto</div>
                                <div className="row-content">
                                    <p>{currencyAT(item?.wager / 100)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="title">Cuota</div>
                                <div className="row-content">
                                    <p>{Number(item.odds ? item.odds : 0).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="title">Resultado</div>
                                <div className="row-content">
                                    <StyledStatus $status={item.status}>{t(item.status)}</StyledStatus>
                                </div>
                            </div>
                            <div className="row">
                                <div className="title">Ganancia</div>
                                <div className="row-content">
                                    <p>{item?.winning ? currencyAT(item?.winning / 100) : currencyAT(0)}</p>
                                </div>
                            </div>
                            <div className="row ver-mas">
                                <StyledButton onClick={(e) => handleOnClick(e, String(item.game))}>
                                    {item.game === gameHash ? (
                                        <>
                                            Ver menos
                                            <ExpandLessIcon />
                                        </>
                                    ) : (
                                        <>
                                            Ver más <ExpandMoreIcon />
                                        </>
                                    )}
                                </StyledButton>
                            </div>
                        </StyledItemContent>
                        {isDestroy ? null : String(item.game) === gameHash ? (
                            loading ? null : (
                                <CardMobileBetsHistoryDetails
                                    created_date={item.created_date}
                                    operation={item.operation}
                                    item={item}
                                ></CardMobileBetsHistoryDetails>
                            )
                        ) : null}
                    </StyledItem>
                )
            })}
        </Styled>
    )
}

export default CardMobileBetsHistory
interface StyledProp {
    as?: React.ElementType | keyof JSX.IntrinsicElements
    $status?: string
}
const StyledStatus = styled.p<StyledProp>`
    ${(p) => {
        if (p.$status === 'LOST') {
            return css`
                color: ${(p) => p.theme.palette.primary.main};
            `
        }
        if (p.$status === 'OPEN') {
            return css`
                color: #616161;
            `
        }
        if (p.$status === 'WON') {
            return css`
                color: #009847;
            `
        }
        if (p.$status === 'CASHOUT') {
            return css`
                color: #0081e0;
            `
        }
    }}
`
const StyledButton = styled.button`
    color: ${(p) => p.theme.palette.primary.main};
    display: flex;
    align-items: center;
    margin: auto;
    padding: 2px 10px;
    border-radius: 8px;
    font-size: 0.9rem;
    background: ${(p) => hexAlpha(p.theme.palette.primary.main, 0.1)};
`

const StyledTitle = styled.div<StyledProp>`
    padding: 7px 10px;
    text-align: center;
    font-feature-settings: 'tnum';
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: 1px solid transparent;

    ${(p) => {
        // if (p.$acitve) {
        if (p.$status === 'LOST') {
            return css`
                background: ${(p) => p.theme.palette.primary.main};
                color: white;
                border-color: #b80000;
            `
        }
        if (p.$status === 'OPEN') {
            return css`
                background: #616161;
                color: white;
                border-color: #3c3c3c;
            `
        }
        if (p.$status === 'WON') {
            return css`
                background: #009847;
                color: white;
                border-color: #005e12;
            `
        }
        if (p.$status === 'CASHOUT') {
            return css`
                background: #0081e0;
                color: white;
                border-color: #004ea5;
            `
        }
        // }
    }}
`
const StyledCardGiftcardIcon = styled(CardGiftcardIcon)`
    && {
        color: #f90707;
        font-size: 15px;
        display: grid;
        place-items: center;
    }
`
const StyledItem = styled.div`
    & {
        border: 1px solid ${(p) => p.theme.palette.alternate8.main};
        border-radius: 8px;
        padding-bottom: 0;
        background: ${(p) => p.theme.palette.light.main};
        display: flex;
        flex-direction: column;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 10px;
        overflow: hidden;
        transition: 200ms;
    }
`
const StyledItemContent = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    display: grid;
    position: relative;
    top: 1px;
    grid-auto-flow: dense;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 10px;
    ${MEDIA_QUERIES.min_width.tabletS} {
        grid-template-columns: repeat(3, 1fr);
    }

    ${MEDIA_QUERIES.min_width.desktopXS} {
        grid-template-columns: repeat(6, 1fr);
    }
    .row {
        display: flex;
        flex-direction: column;
        gap: 2px;
        border-bottom: 1px solid ${(p) => p.theme.palette.alternate8.main};
        padding: 7px;

        &.ver-mas {
            grid-column: span 2;
            ${MEDIA_QUERIES.min_width.tabletS} {
                grid-column: span 3;
            }

            ${MEDIA_QUERIES.min_width.desktopXS} {
                grid-column: span 6;
            }
        }

        .title {
            font-size: 0.75rem;
            /* color: ${(p) => p.theme.palette.alternate5.main}; */
            text-transform: uppercase;
            color: #1a1b25;
            font-weight: 500;
            white-space: nowrap;
            /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
        }
        .row-content {
            &.negative {
                color: ${(p) => p.theme.palette.primary.main};
            }
            display: flex;
            align-items: center;
            gap: 5px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #6e6e73;
            font-size: 0.95rem;
            font-feature-settings: 'tnum';
            > p {
                text-transform: lowercase;
                &::first-letter {
                    text-transform: uppercase;
                }
            }
        }
    }
`
const Styled = styled.div`
    /* background: ${(p) => p.theme.palette.alternate12.main}; */
    padding: 1rem 1rem;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
`
