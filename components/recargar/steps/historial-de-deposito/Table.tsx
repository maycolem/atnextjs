/* eslint-disable camelcase */
import styled, { css } from 'styled-components'
import { Table as TableMui, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { delay } from '@helpers/delay'
import classNames from 'classnames'
import useWindowSize from '@hooks/useWindowSize'
import { customFormatDateLocation } from '@helpers/customFormatDateLocation'
import { useTranslation } from 'react-i18next'

export const Table = ({ data, typMove, handleMetodo, handleJuegoDeportivas, handleSaldo }) => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    const { width, height } = useWindowSize()
    const { t } = useTranslation()

    useEffect(() => {
        if (ref) {
            handleOnResize(ref)
        }
    }, [ref, width])

    const handleOnResize = async (element: HTMLDivElement) => {
        element.style.width = `${0}px`
        await delay(200)
        const width = element?.parentElement?.clientWidth
        element.style.width = `${width}px`
    }
    return (
        <StyledScrollContainer ref={(currentRef) => setRef(currentRef)} className="scroll-container">
            <div>
                <TableMui aria-label="sticky table" stickyHeader>
                    <TableHeadS>
                        <TableRow>
                            <TableCell>{'Id Movimiento'.toUpperCase()}</TableCell>
                            <TableCell>{'Fecha y Hora'.toUpperCase()}</TableCell>
                            <TableCell>{'Tipo de Movimiento'.toUpperCase()}</TableCell>
                            {/* <TableC{ell>Juego</TableCell> */}
                            <TableCell>{'Método'.toUpperCase()} </TableCell>
                            <TableCell align="right">{'Monto'.toUpperCase()}</TableCell>
                            <TableCell align="right">{'Saldo'.toUpperCase()}</TableCell>
                        </TableRow>
                    </TableHeadS>
                    <TableBodyS>
                        {data.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{item.operation}</TableCell>
                                    {/* TODO: CAMBIAR FECHA */}
                                    <TableCell>{customFormatDateLocation(item.operation_date)}</TableCell>
                                    <TableCell>{typMove(item)}</TableCell>
                                    {/* <TableCell>{handleJuegoDeportivas(item)}</TableCell> */}
                                    <TableCell>
                                        {handleJuegoDeportivas(item)} {t(handleMetodo(item))}
                                    </TableCell>
                                    <TableCell align="right" className={classNames({ negative: item.amount < 0 })}>
                                        {new Intl.NumberFormat('es-PE', {
                                            style: 'currency',
                                            currency: 'PEN',
                                            maximumFractionDigits: 2,
                                        }).format(item.amount / 100)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Intl.NumberFormat('es-PE', {
                                            style: 'currency',
                                            currency: 'PEN',
                                            maximumFractionDigits: 2,
                                        }).format(handleSaldo(item))}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBodyS>
                </TableMui>
            </div>
        </StyledScrollContainer>
    )
}
const StyledScrollContainer = styled.div`
    flex: 1;
    overflow: auto;
`

interface StyledRefreshProp {
    as?: React.ElementType | keyof JSX.IntrinsicElements
    $loading?: boolean
}

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
        &.negative {
            color: ${(p: any) => p.theme.palette.primary.main};
        }
    }
`
