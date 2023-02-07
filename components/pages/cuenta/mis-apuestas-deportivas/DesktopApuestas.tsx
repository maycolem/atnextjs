import { customFormatDateLocation } from '@helpers/customFormatDateLocation'
import { delay } from '@helpers/delay'
import useWindowSize from '@hooks/useWindowSize'
import { BetsHistory } from '@interfaces/betHistory'
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import { currencyAT } from '@helpers/currency'
import { useTranslation } from 'react-i18next'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useRouter } from 'next/router'
import { PATHS } from '@routes/paths/PATHS'
import CardMobileBetsHistoryDetails from './CardMobileBetsHistoryDetails'
import Collapse from '@mui/material/Collapse'
interface Props {
    bets: Array<BetsHistory>
}

interface customWindow extends Window {
    ASb?: any
}
declare const window: customWindow
const DesktopApuestas = ({ bets }: Props) => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    const { width, height } = useWindowSize()
    const { t } = useTranslation()
    const [activeButton, setActiveButton] = useState<string | null>(null)
    const router = useRouter()
    useEffect(() => {
        if (ref) {
            handleOnResize(ref)
        }
    }, [ref, width])

    const handleOnResize = async (element: HTMLDivElement) => {
        element.style.width = `0px`
        await delay(150)
        const width = element.parentElement.clientWidth
        element.style.width = `${width}px`
    }
    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>, game: string) => {
        router.push(`${PATHS.MIS_APUESTAS_DEPORTIVAS.url}/#/mybets/${game}`)
        if (activeButton === game) {
            const hash = `${PATHS.MIS_APUESTAS_DEPORTIVAS.url}/`
            history.pushState(null, '', hash)
            if (window && 'Abs' in window) {
                window.ASb.destroy()
            }
            setActiveButton(null)
            return
        }
        setActiveButton(game)
    }
    return (
        <>
            <ContentMainS>
                <StyledScrollContainer ref={(currentRef) => setRef(currentRef)} className="scroll-container">
                    <div>
                        <Table aria-label="sticky table" stickyHeader>
                            <TableHeadS>
                                <TableRow>
                                    <TableCell>{'Id Apuesta'.toUpperCase()}</TableCell>
                                    {/* <TableCell>{'Fecha y Hora Creación'.toUpperCase()}</TableCell> */}
                                    <TableCell>{'Fecha y Hora'.toUpperCase()}</TableCell>
                                    <TableCell align="right">{'Tipo'.toUpperCase()}</TableCell>
                                    <TableCell align="right">{'Monto'.toUpperCase()}</TableCell>
                                    <TableCell align="center">{'Cuota'.toUpperCase()}</TableCell>
                                    <TableCell align="right">{'Resultado'.toUpperCase()}</TableCell>
                                    <TableCell align="right">{'Ganancia'.toUpperCase()}</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHeadS>
                            <TableBodyS>
                                {bets.map((item, i) => {
                                    return (
                                        <>
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <p>{item?.game}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p>{customFormatDateLocation(item.created_date)}</p>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <StyledTableCellText className="right">
                                                        {item?.account === 'BETTING-BONUS' ? <StyledCardGiftcardIcon /> : ''}
                                                        <p>{item.type}</p>
                                                    </StyledTableCellText>
                                                </TableCell>
                                                {/* <TableCell>{handleJuegoDeportivas(item)}</TableCell> */}
                                                <TableCell align="right">{currencyAT(item?.wager / 100)}</TableCell>
                                                <TableCell align="center">{Number(item.odds ? item.odds : 0).toFixed(2)}</TableCell>
                                                <TableCell align="right">
                                                    <StyledTableCellText className="right" $status={item.status}>
                                                        {t(item.status)}
                                                    </StyledTableCellText>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {item?.winning ? currencyAT(item?.winning / 100) : currencyAT(0)}
                                                </TableCell>
                                                <TableCell>
                                                    <StyledIconButton
                                                        aria-label="expand row"
                                                        color="primary"
                                                        onClick={(e) => handleOnClick(e, String(item?.game))}
                                                        size="small"
                                                    >
                                                        {activeButton === item?.game ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </StyledIconButton>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                    <Collapse in={activeButton === String(item?.game)} timeout="auto" unmountOnExit>
                                                        {activeButton === String(item?.game) ? (
                                                            <CardMobileBetsHistoryDetails
                                                                created_date={item.created_date}
                                                                operation={item.operation}
                                                                item={item}
                                                            ></CardMobileBetsHistoryDetails>
                                                        ) : null}
                                                        <StyledSpace />
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                })}
                            </TableBodyS>
                        </Table>
                    </div>
                </StyledScrollContainer>
            </ContentMainS>
        </>
    )
}

export default DesktopApuestas
const StyledSpace = styled.div`
    margin-bottom: 50px;
`
const StyledIconButton = styled(IconButton)`
    && {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        margin: 0;
        height: 20px;
        width: 20px;
        min-height: 20px;
        transform: scale(1.3);
        svg {
            font-size: 1em;
            height: 1em;
            width: 1em;
        }
    }
`
interface StyledProps {
    as?: React.ElementType | keyof JSX.IntrinsicElements
    $status?: string
}
const StyledTableCellText = styled.p<StyledProps>`
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #6e6e73;
    font-size: 0.95rem;
    font-feature-settings: 'tnum';
    &.right {
        justify-content: end;
    }
    > p {
        text-transform: lowercase;
        &::first-letter {
            text-transform: uppercase;
        }
    }
    ${(p) => {
        if (p.$status === 'REJECTED') {
            return css`
                color: #6e6e73;
            `
        }
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

const StyledCardGiftcardIcon = styled(CardGiftcardIcon)`
    && {
        color: #f90707;
        font-size: 15px;
        display: grid;
        place-items: center;
    }
`
const StyledScrollContainer = styled.div`
    flex: 1;
    overflow: auto;
`

const ContentMainS = styled.div`
    & {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 0;
        gap: 1rem;
        width: 100%;
    }
`

const TableHeadS = styled(TableHead)`
    .MuiTableCell-root {
        color: #1a1b25;
        font-family: 'Rubik';
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        padding: 8px 1rem;
        font-weight: 500;
        white-space: nowrap;
        font-size: 0.8rem;
    }
`
const TableBodyS = styled(TableBody)`
    .MuiTableCell-root {
        font-family: 'Rubik';
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        padding: 8px 1rem;
        font-weight: 400;
        white-space: nowrap;
        color: #6e6e73;
        font-feature-settings: 'tnum';
    }
`
