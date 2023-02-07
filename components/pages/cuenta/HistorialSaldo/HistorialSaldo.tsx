import React, { useEffect, useState } from 'react'
import _EstadoSolicitud from 'components/retirar/estado-de-solicitud/EstadoSolicitud'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import { useGetOperationsHistoryQuery } from 'states/calimaco/calimacoDataApi'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { format } from 'date-fns'
import NotData from 'components/shared/no-data/NotData'
import { delay } from '@helpers/delay'
import useMediaQueryAT from '@hooks/useMediaQueryAT'
import { OperationHistory } from '@interfaces/operationHistory'
import { getPagination, getPagingData, getRealTotalPage } from './getPaginate'
import ScrollFilter from './ScrollFilter'
import SyncIcon from '@mui/icons-material/Sync'
import useWindowSize from '@hooks/useWindowSize'
import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import { useAppSelector } from '@states/store'
import { userSessionSelector } from '@states/features/slices/userSlice'
import { Table } from './Table'
import { Cards } from './Cards'
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

export const HistorialSaldo = () => {
    const size = 14
    const { t } = useTranslation()
    var today = new Date()
    var priorDate = new Date(new Date().setDate(today.getDate() - 30)).setHours(0, 0, 0)
    const formatFirstDayLastMonth = format(priorDate, 'yyyy-MM-dd hh:mm:dd')
    const session = useAppSelector(userSessionSelector)
    const defaultQuery = {
        amount: '',
        operation: '',
        type: '',
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
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    const [activeTabFilter, setActiveTabFilter] = useState(null)
    // console.log([...new Set(operationHistory.map((item) => item.method).filter((item) => item))])
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
                    type: value.obj.type,
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
            if (find.filter === 'type') {
                setQuery({ ...defaultQuery, type: find.value })
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

    const handleShowLast30Days = (activeTabFilter) => {
        if (!activeTabFilter) {
            return (
                <StyledTotalResult>
                    <p>
                        <span>{getHistorySaldo?.total}</span> resultados
                    </p>
                </StyledTotalResult>
            )
        }
        if (!['ALL', 'LAST-MOUNTH'].includes(activeTabFilter.value)) {
            return (
                <StyledTotalResult>
                    <p>
                        <span>{getHistorySaldo?.total}</span> resultados <span className="last30">de los ultimos 30 dias</span>
                    </p>
                </StyledTotalResult>
            )
        }
        return (
            <StyledTotalResult>
                <p>
                    <span>{getHistorySaldo?.total}</span> resultados
                </p>
            </StyledTotalResult>
        )
    }

    return (
        <HistorySalesS>
            <ScrollFilter onActive={handleActive} items={Items}></ScrollFilter>
            <StyledWrapperTop>
                <StyledRefresh onClick={() => (loading || isFetching ? null : refetch())} $loading={loading || isFetching}>
                    <SyncIcon></SyncIcon>
                    <span>Actualizar</span>
                </StyledRefresh>
                {handleShowLast30Days(activeTabFilter)}
            </StyledWrapperTop>
            {operationHistory.length > 0 ? (
                <ContentMainS>
                    {desktopS ? (
                        <Table
                            data={operationHistory}
                            handleSaldo={handleSaldo}
                            handleMetodo={handleMetodo}
                            handleJuegoDeportivas={handleJuegoDeportivas}
                            typMove={typMove}
                        />
                    ) : (
                        <Cards
                            data={operationHistory}
                            handleSaldo={handleSaldo}
                            handleMetodo={handleMetodo}
                            handleJuegoDeportivas={handleJuegoDeportivas}
                            typMove={typMove}
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

const StyledTotalResult = styled.div`
    > p {
        color: ${(p) => p.theme.palette.alternate11.main};
        font-feature-settings: 'tnum';
        max-width: 200px;
        text-align: right;
        padding: 14px 0px;
        span {
            font-weight: 500;
            &.last30 {
                white-space: nowrap;
                font-weight: 400;
            }
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
