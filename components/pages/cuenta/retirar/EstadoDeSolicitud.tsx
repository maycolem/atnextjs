import React, { useEffect, useState } from 'react'
import _EstadoSolicitud from 'components/retirar/estado-de-solicitud/EstadoSolicitud'
import { PATHS } from 'routes/paths/PATHS'
import styled, { css } from 'styled-components'
import { useCheckIsVerified } from '@hooks/useCheckIsVerified'
import { CUENTA_RETIROS } from './sharedMenuTabs'
import dynamic from 'next/dynamic'
import { Meta } from '@components/Meta'
import useMediaQueryAT from '@hooks/useMediaQueryAT'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import { format } from 'date-fns'
import { OperationHistory } from '@interfaces/operationHistory'
import { calimacoDataApi, useCancelPayoutMutation, useGetOperationsHistoryQuery } from '@states/calimaco/calimacoDataApi'
import { getPagination, getPagingData, getRealTotalPage } from '@components/pages/cuenta/HistorialSaldo/getPaginate'
import NotData from '@components/shared/no-data/NotData'
import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import { Pagination } from '@mui/material'
import { delay } from '@helpers/delay'
import { ScrollFilter } from '@components/pages/cuenta/retirar/Filter'
import SyncIcon from '@mui/icons-material/Sync'
import { GoogleTagManager } from '@google/TagManager'
import store, { useAppDispatch, useAppSelector } from '@states/store'
import { userSelector, userSessionSelector } from '@states/features/slices/userSlice'
import { onOpen } from '@states/slice/layout/SnackBar'
import { useGetDetailsUser } from '@hooks/useGetDetailsUser'
import { Table } from './OperationHistoryPayouts/index'
import { Cards } from './OperationHistoryPayouts/Cards'
import { Items } from './Filter'
import { isObject } from 'lodash'

const ScrollMenuPage = dynamic(() => import('@components/shared/scroll-menu-page/ScrollMenuPage'))

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
    status: string
    method: string
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

export const EstadoDeSolicitud = () => {
    useCheckIsVerified({
        message: `
        Hola, aún no verificaste tu cuenta.
        $$Únicamente las cuentas verificadas pueden retirar sus ganancias.
        $$Puedes iniciar tu verificación en la página que cargará a continuación.`,
        redirectPathname: PATHS.CUENTA_VERIFICAR.url,
    })
    const size = 26
    var today = new Date()
    var priorDate = new Date(new Date().setDate(today.getDate() - 30)).setHours(0, 0, 0)
    const formatFirstDayLastMonth = format(priorDate, "yyyy-MM-dd'T'HH:mm")
    const session = useAppSelector(userSessionSelector)
    const defaultQuery = {
        amount: '',
        operation: '',
        type: 'PAYOUT',
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
    const isDesktop = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    const [totalData, setTotalData] = useState(0)
    const [cancelPayout, { isLoading: isLoadingCancel }] = useCancelPayoutMutation()
    const user = useAppSelector(userSelector)
    const dispatch = useAppDispatch()
    const { fetchUserDetails } = useGetDetailsUser()
    const [activeTabFilter, setActiveTabFilter] = useState(null)
    // return isDesktop ? <DesktopHistorySaldo /> : <MobileHistorySaldo />
    useEffect(() => {
        if (getHistorySaldo) {
            if ('data' in getHistorySaldo) {
                const { limit } = getPagination(page, size)
                const { totalItems, totalPages } = getPagingData(getHistorySaldo.total, page, Number(limit), size)
                const realTotalPage = getRealTotalPage(size, totalPages, totalItems)
                setCount(realTotalPage)
                const historyNegative = getHistorySaldo.data.filter((item) => item.amount < 0)
                const mod = getHistorySaldo.total % 2

                if (mod === 0) {
                    setTotalData(getHistorySaldo.total / 2)
                } else {
                    setTotalData((getHistorySaldo.total - 1) / 2 + mod)
                }

                setOperationHistory(historyNegative)
            }
        }
    }, [getHistorySaldo])

    useEffect(() => {
        if (isFetching) {
            setLoading(true)
        } else {
            delay(1000).then(() => setLoading(false))
        }
    }, [isFetching])

    const handleChangePaginate = async (event, value) => {
        const element = event.currentTarget as HTMLButtonElement
        console.log(element?.ariaLabel)
        const { init, end, limit } = getPagination(value, size)
        const { currentPage } = getPagingData(getHistorySaldo.total, value, Number(limit), size)
        setQuery({ ...query, init, end })
        setPage(currentPage)

        if (element?.ariaLabel.includes('next')) {
            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_estado_solicitud',
                option: 'siguiente',
                action: 'click',
            })
        }
        if (element?.ariaLabel.includes('previous')) {
            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_estado_solicitud',
                option: 'atras',
                action: 'click',
            })
        }
        if (element?.ariaLabel.includes('Go to page')) {
            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_estado_solicitud',
                option: 'pagina ' + Number(currentPage),
                action: 'click',
            })
        }

        await delay(200)

        document.documentElement.scrollIntoView({ inline: 'start', block: 'start', behavior: 'smooth' })
    }

    const handleActive = (value: string | OnActiveProps) => {
        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_estado_de_solicitud',
            option: 'filtro de busqueda',
            action: 'click',
        })
        setPage(1)
        if (isObject(value)) {
            if (value.value === 'CUSTOM_FILTER') {
                setQuery({
                    ...defaultQuery,
                    status: value.obj.status,
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
    const handleCancel = async (item) => {
        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_estado_solicitud',
            option: 'cancelar',
            action: 'click',
        })

        const response: any = await cancelPayout({
            company: 'ATP',
            session: user?.session,
            operation: item.operation,
        })

        if (response.data.result === 'OK') {
            await fetchUserDetails()
            dispatch(onOpen({ message: '¡El retiro ha sido cancelado a su solicitud!', severity: 'success' }))
        } else if (response.data.result === 'error') {
            dispatch(onOpen({ message: response.data.description, severity: 'error' }))
        }

        store.dispatch(calimacoDataApi.util.invalidateTags(['OperationsHistory']))
    }

    const handleShowLast30Days = (activeTabFilter) => {
        if (!activeTabFilter) {
            return (
                <StyledTotalResult>
                    <p>
                        <span>{totalData}</span> resultados
                    </p>
                </StyledTotalResult>
            )
        }
        if (!['ALL', 'LAST-MOUNTH'].includes(activeTabFilter.value)) {
            return (
                <StyledTotalResult>
                    <p>
                        <span>{totalData}</span> resultados <span className="last30">de los ultimos 30 dias</span>
                    </p>
                </StyledTotalResult>
            )
        }
        return (
            <StyledTotalResult>
                <p>
                    <span>{totalData}</span> resultados
                </p>
            </StyledTotalResult>
        )
    }

    return (
        <>
            <Meta title="Estado Solicitud" />

            <Styled>
                <ScrollMenuPage active={CUENTA_RETIROS[1].url} tabs={CUENTA_RETIROS} />
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
                            {isDesktop ? (
                                <Table loading={isLoadingCancel} cancel={handleCancel} data={operationHistory} />
                            ) : (
                                <Cards loading={isLoadingCancel} cancel={handleCancel} data={operationHistory} />
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
            </Styled>
        </>
    )
}

const StyledTotalResult = styled.div`
    > p {
        color: ${(p) => p.theme.palette.alternate11.main};
        font-feature-settings: 'tnum';
        max-width: 200px;
        text-align: right;
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

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: inherit;
    overflow: hidden;
`
