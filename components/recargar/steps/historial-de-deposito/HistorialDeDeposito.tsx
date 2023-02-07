/* eslint-disable camelcase */
import styled, { css } from 'styled-components'
import { TableBody, TableCell, TableHead, TableRow, Pagination } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useGetOperationsHistoryQuery } from 'states/calimaco/calimacoDataApi'
import { format } from 'date-fns'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useTranslation } from 'react-i18next'
import NotData from 'components/shared/no-data/NotData'
import { OperationHistory } from '@interfaces/operationHistory'
import useMediaQueryAT from '@hooks/useMediaQueryAT'
import { delay } from '@helpers/delay'
import { getPagination, getPagingData, getRealTotalPage } from '@components/pages/cuenta/HistorialSaldo/getPaginate'
import SyncIcon from '@mui/icons-material/Sync'
import ScrollFilter from '@components/pages/cuenta/HistorialSaldo/ScrollFilter'
import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import { useAppSelector } from '@states/store'
import { userSessionSelector } from '@states/features/slices/userSlice'
import { Cards } from './Cards'
import { Table } from './Table'
import { Items } from './Filter'
import { isObject } from 'lodash'

interface Query {
    amount: string
    operation: string
    type: string
    op_date_init: string
    op_date_end: string
    init: string
    end: string
    status: string
    session: string
    method: string
}
interface OnActiveObjProps {
    method: string
    type: string
    operation: string
    dateObj: {
        init: string
        end: string
    }
}
interface OnActiveProps {
    value: string
    obj?: OnActiveObjProps
}
export const HistorialDeDeposito = () => {
    const size = 13
    var today = new Date()
    var priorDate = new Date(new Date().setDate(today.getDate() - 30)).setHours(0, 0, 0)
    const formatFirstDayLastMonth = format(priorDate, "yyyy-MM-dd'T'HH:mm")
    const session = useAppSelector(userSessionSelector)
    const defaultQuery = {
        amount: '',
        operation: '',
        type: 'DEPOSIT',
        // type: '',
        op_date_init: formatFirstDayLastMonth,
        op_date_end: '',
        init: '0',
        end: String(size),
        status: '',
        session: session,
        method: '',
    }
    const [query, setQuery] = useState<Query>(defaultQuery)
    const [page, setPage] = useState(1)
    const { data: getHistorySaldo, isLoading, refetch, isFetching } = useGetOperationsHistoryQuery(query, { skip: !session })
    const [operationHistory, setOperationHistory] = useState<Array<OperationHistory>>([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const tabletL = useMediaQueryAT(MEDIA_QUERIES.min_width.tabletL)
    const mobileM = useMediaQueryAT(MEDIA_QUERIES.min_width.mobileM)
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    const { t } = useTranslation()
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    const [activeTabFilter, setActiveTabFilter] = useState(null)

    useEffect(() => {
        if (getHistorySaldo) {
            if ('data' in getHistorySaldo) {
                const { limit } = getPagination(page, size)
                const { totalItems, totalPages } = getPagingData(getHistorySaldo.total, page, Number(limit), size)
                const realTotalPage = getRealTotalPage(size, totalPages, totalItems)
                setCount(realTotalPage)
                setOperationHistory(getHistorySaldo.data)
            }
        }
    }, [getHistorySaldo])

    const handleChangePaginate = async (event, value) => {
        const { init, end, limit } = getPagination(value, size)
        const { currentPage } = getPagingData(getHistorySaldo.total, value, Number(limit), size)
        setQuery({ ...query, init, end })
        setPage(currentPage)
        await delay(200)
        document.documentElement.scrollIntoView({ inline: 'start', block: 'start', behavior: 'smooth' })
    }

    useEffect(() => {
        if (isFetching) {
            setLoading(true)
        } else {
            delay(1000).then(() => setLoading(false))
        }
    }, [isFetching])

    const handleActive = (value: string | OnActiveProps) => {
        setPage(1)
        if (isObject(value)) {
            if (value.value === 'CUSTOM_FILTER') {
                setQuery({
                    ...defaultQuery,
                    method: value.obj.method,
                    op_date_init: value.obj.dateObj.init,
                    op_date_end: value.obj.dateObj.end,
                    operation: value.obj.operation,
                })
                setActiveTabFilter(null)
                return
            }
        } else {
            const find = Items.find((item) => item.value === value)
            setActiveTabFilter(find)
            if (find.filter === 'op_date_init') {
                if (find.value === 'LAST-MOUNTH') {
                    setQuery({ ...defaultQuery, op_date_init: formatFirstDayLastMonth })
                }

                return
            }
            if (find.filter === 'all') {
                setQuery({ ...defaultQuery, op_date_init: '' })
                return
            }
        }
    }

    const typMove = (item) => {
        if (item.type === 'PAYOUT') {
            if (item.status === 'ACCEPTED') {
                return 'Solicitud Retiro Aceptada'
            } else if (item.status === 'DENIED') {
                const amount = item.amount / 100
                if (amount > 0) {
                    return 'Solicitud Retiro Denegada'
                } else {
                    return 'Solicitud Retiro'
                }
                // return 'Solicitud Retiro Denegada'
            } else if (item.status === 'PROCESSED') {
                return 'Pagado'
            } else if (item.status === 'CANCELLED') {
                const amount = item.amount / 100
                if (amount > 0) {
                    return 'Solicitud Retiro Cancelado'
                } else {
                    return 'Solicitud Retiro'
                }
            } else if (item.status === 'NEW') {
                return 'Nueva Solicitud'
            } else {
                return t(item.type)
            }
        } else {
            return t(item.type)
        }
    }

    const handleSaldo = (item) => {
        const amount = item.amount / 100
        const preSaldo = item.previous_amount / 100

        if (amount > 0) {
            return amount + preSaldo
        } else {
            const value = Math.abs(amount)
            const response = value - preSaldo
            return Math.abs(response)
        }
    }

    const handleJuegoDeportivas = (item) => {
        if (item.machine) {
            if (item.machine_name === 'Altenar SportsBetting') {
                return 'Apuesta Deportivas'
            }

            return item.machine_name
        }
    }
    const handleMetodo = (item) => {
        if (item.method === 'PAGOEFECTIVO') {
            return 'PagoEfectivo'
        } else if (item.method === 'PAGOEFECTIVOQR') {
            return 'PagoEfectivoQR'
        } else {
            return item.method_name
        }
    }

    return (
        <HistorySalesS>
            <ScrollFilter onActive={handleActive} items={Items}></ScrollFilter>
            <StyledWrapperTop>
                <StyledRefresh onClick={() => (loading || isFetching ? null : refetch())} $loading={loading || isFetching}>
                    <SyncIcon></SyncIcon>
                    <span>Actualizar</span>
                </StyledRefresh>
                <StyledTotalResult>
                    <p>
                        <span>{getHistorySaldo?.total ?? 0}</span> resultados
                    </p>
                </StyledTotalResult>
            </StyledWrapperTop>
            {operationHistory.length > 0 ? (
                <ContentMainS>
                    {desktopS ? (
                        <Table
                            data={operationHistory}
                            typMove={typMove}
                            handleMetodo={handleMetodo}
                            handleJuegoDeportivas={handleJuegoDeportivas}
                            handleSaldo={handleSaldo}
                        />
                    ) : (
                        <Cards
                            data={operationHistory}
                            typMove={typMove}
                            handleMetodo={handleMetodo}
                            handleJuegoDeportivas={handleJuegoDeportivas}
                            handleSaldo={handleSaldo}
                        />
                    )}
                </ContentMainS>
            ) : isLoading || isFetching ? (
                <LoadingDefault loading={isLoading || isFetching}></LoadingDefault>
            ) : (
                <NotData>No hay datos</NotData>
            )}
            <StyledWrapperPagination>
                <Pagination
                    color="primary"
                    count={count}
                    onChange={handleChangePaginate}
                    page={page}
                    shape="rounded"
                    variant="text"
                    boundaryCount={tabletL ? 2 : 1}
                    siblingCount={tabletL ? 2 : mobileM ? 1 : 0}
                />
            </StyledWrapperPagination>
        </HistorySalesS>
    )
}

const StyledScrollContainer = styled.div`
    flex: 1;
    overflow: auto;
`
const StyledTotalResult = styled.div`
    > p {
        color: ${(p) => p.theme.palette.alternate11.main};
        font-feature-settings: 'tnum';
        span {
            font-weight: 500;
        }
    }
`
interface StyledRefreshProp {
    as?: React.ElementType | keyof JSX.IntrinsicElements
    $loading?: boolean
}
const StyledRefresh = styled.div<StyledRefreshProp>`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    color: #3467ff;
    padding: 14px 0px;
    transition: 250ms;
    ${(p: any) => {
        if (p.$loading) {
            return css`
                cursor: not-allowed;
                svg {
                    animation-name: spin;
                    animation-duration: 1s;
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                }
            `
        }
    }}
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    > span {
        font-weight: 400;
        font-size: 1rem;
    }
    > svg {
        color: #3467ff;
    }
`
const StyledWrapperTop = styled.div`
    display: flex;
    padding: 0 14px;
    align-items: center;
    justify-content: space-between;
`
const StyledWrapperPagination = styled.div`
    /* background: ${(p) => p.theme.palette.alternate12.main}; */
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > nav {
        display: flex;
        justify-content: center;
        > ul {
            margin: auto;
        }
    }
`

const HistorySalesS = styled.div`
    & {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding-top: 1rem;
    }
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
        &.negative {
            color: ${(p: any) => p.theme.palette.primary.main};
        }
    }
`
