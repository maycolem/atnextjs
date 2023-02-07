import { customFormatDateLocation } from '@helpers/customFormatDateLocation'
import { TableCell, TableRow, Table as TableMui, TableHead, TableBody } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CancelIcon from '@mui/icons-material/Cancel'
import DoneIcon from '@mui/icons-material/Done'
import { currency } from '@helpers/currency'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import useWindowSize from '@hooks/useWindowSize'
import { delay } from '@helpers/delay'
import { LoadingButton } from '@mui/lab'
import hexAlpha from 'hex-alpha'

export const Table = ({ data, loading, cancel }) => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    const { t } = useTranslation()
    const { width, height } = useWindowSize()
    useEffect(() => {
        if (ref) {
            handleOnResize(ref)
        }
    }, [ref, width])

    const handleOnResize = async (element: HTMLDivElement) => {
        if (element) {
            try {
                element.style.width = `${0}px`
                await delay(200)
                const width = element.parentElement.clientWidth || 0
                element.style.width = `${width}px`
            } catch (e) {
                return null
            }
        }
    }
    return (
        <StyledScrollContainer ref={(currentRef) => setRef(currentRef)} className="scroll-container">
            <div>
                <TableMui aria-label="sticky table" stickyHeader>
                    <TableHeadS>
                        <TableRow>
                            <TableCell>{'Estado'.toUpperCase()}</TableCell>
                            <TableCell>{'Id'.toUpperCase()}</TableCell>
                            <TableCell align="center">{'Fecha y Hora'.toUpperCase()} </TableCell>
                            <TableCell align="right">{'Monto'.toUpperCase()}</TableCell>
                            <TableCell align="right">{'Medio Pago'.toUpperCase()}</TableCell>
                            <TableCell align="right">{'Acción'.toUpperCase()}</TableCell>
                        </TableRow>
                    </TableHeadS>
                    <TableBodyS>
                        {data.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell className="status">
                                        <p className={item.status}>
                                            {t(item.status)}{' '}
                                            {['TO_BE_PROCESSED', 'PROCESSED', 'PROCCESED', 'NEW', 'ACCEPTED'].includes(item.status) ? (
                                                <DoneIcon />
                                            ) : (
                                                <CancelIcon />
                                            )}
                                        </p>
                                    </TableCell>
                                    <TableCell>{item.operation}</TableCell>
                                    <TableCell align="center">{customFormatDateLocation(item.operation_date)}</TableCell>
                                    <TableCell align="right" className={classNames({ negative: item.amount < 0 })}>
                                        {currency(item.amount)}
                                    </TableCell>
                                    <TableCell align="right">{t(item.method_name)}</TableCell>
                                    <TableCell align="right">
                                        {(item.status === 'ACCEPTED' && item.method === 'ATPAYMENTSERVICE_PAYOUT') ||
                                        item.status === 'NEW' ? (
                                            <div>
                                                <StyledLoadingButton
                                                    style={{ textTransform: 'initial' }}
                                                    endIcon={<CancelIcon />}
                                                    loading={loading}
                                                    onClick={() => cancel(item)}
                                                    size="large"
                                                    variant="contained"
                                                >
                                                    Cancelar
                                                </StyledLoadingButton>
                                            </div>
                                        ) : null}
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
const StyledLoadingButton = styled(LoadingButton)`
    && {
        font-size: 1rem;
        margin: initial;
        line-height: initial;
        svg {
            font-size: 1.2rem;
        }
    }
`
const StyledScrollContainer = styled.div`
    flex: 1;
    overflow: auto;
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
        &.negative {
            color: ${(p) => p.theme.palette.primary.main};
        }

        &.status {
            font-weight: 500;
            p {
                background: ${(p) => p.theme.palette.alternate9.main};
                max-width: fit-content;
                padding: 2px 6px;
                border-radius: 2px;
                display: flex;
                align-items: center;
                gap: 5px;
                &.TO_BE_PROCESSED,
                &.PROCESSED,
                &.PROCCESED,
                &.NEW,
                &.ACCEPTED {
                    background: ${(p) => hexAlpha(p.theme.palette.success2.light, 0.2)};
                    color: ${(p) => p.theme.palette.success2.dark};
                }
                > svg {
                    font-size: 0.9rem;
                }
            }
        }
    }
`
