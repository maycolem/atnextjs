/* eslint-disable camelcase */
import { useGetBetsHistoryQuery } from '@states/calimaco/calimacoDataApi'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import SyncIcon from '@mui/icons-material/Sync'
import { Pagination } from '@mui/material'
import CardMobileBetsHistory from './CardMobileBetsHistory'
import NotData from '@components/shared/no-data/NotData'
import { delay } from '@helpers/delay'
import { BetsHistory } from '@interfaces/betHistory'
import useMediaQueryAT from '@hooks/useMediaQueryAT'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import DesktopApuestas from './DesktopApuestas'
import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import { useAppSelector } from '@states/store'
import { userSessionSelector } from '@states/features/slices/userSlice'
import { Items, ScrollFilter } from './Filter'
import { isObject } from 'lodash'

interface OnActiveObjProps {
    status: string
    type: string
    game: string
    dateObj: {
        init: string
        end: string
    }
}
interface OnActiveProps {
    value: string
    obj?: OnActiveObjProps
}

interface Query {
    amount: string
    op_date_init: string
    op_date_end: string
    init: string
    end: string
    type: string
    status: string
    operation: string
    game: string
    session: string
}

const MobileApuestas = () => {
    const size = 15
    var today = new Date()
    var priorDate = new Date(new Date().setDate(today.getDate() - 30)).setHours(0, 0, 0)
    const formatFirstDayLastMonth = format(priorDate, "yyyy-MM-dd'T'HH:mm")
    const session = useAppSelector(userSessionSelector)
    const defaultQuery = {
        init: '0',
        end: String(size),
        game: '',
        op_date_end: '',
        op_date_init: formatFirstDayLastMonth,
        operation: '',
        status: '',
        type: '',
        session: session,
        amount: '',
    }
    const [query, setQuery] = useState<Query>(defaultQuery)
    const { data: getbets, isLoading, refetch, isFetching } = useGetBetsHistoryQuery(query, { skip: !session })
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [bets, setbets] = useState<Array<BetsHistory>>([])
    const [page, setPage] = useState(1)
    const tabletL = useMediaQueryAT(MEDIA_QUERIES.min_width.tabletL)
    const mobileM = useMediaQueryAT(MEDIA_QUERIES.min_width.mobileM)
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    const [activeTabFilter, setActiveTabFilter] = useState(null)

    // TODO: /* MODIFICAR ESTO CON CALIMACO DIFERENTE A HISTORIAL SALDO INIT END
    const getPagination = (page: number, size: number): { init: string; end: string; limit: string } => {
        page -= 1
        const limit = size ? +size : 3
        // const init = page ? page * limit + page : 0
        const init = page ? page * limit : 0
        const end = init + limit
        return { init: String(init), end: String(end), limit: String(limit) }
    }
    const getPagingData = (
        totalItems: number,
        page: number,
        limit: number,
        size: number
    ): { totalItems: number; totalPages: number; currentPage: number } => {
        const currentPage = page ? +page : 0
        const _totalPage = Math.ceil(totalItems / limit)
        // const totalPages = getRealTotalPage(size, _totalPage, totalItems)
        return { totalItems, totalPages: _totalPage, currentPage }
    }
    // TODO: MODIFICAR ESTO CON CALIMACO DIFERENTE A HISTORIAL SALDO INIT END */

    useEffect(() => {
        if (getbets) {
            if ('data' in getbets) {
                const { limit } = getPagination(page, size)
                const { totalItems, totalPages } = getPagingData(getbets.total, page, Number(limit), size)
                // TODO: MODIFICAR ESTO CON CALIMACO DIFERENTE A HISTORIAL SALDO INIT END
                // const realTotalPage = getRealTotalPage(size, totalPages, totalItems)
                setCount(totalPages)
                setbets(getbets.data)
            }
        }
    }, [getbets])

    useEffect(() => {
        if (isFetching) {
            setLoading(true)
        } else {
            delay(1000).then(() => setLoading(false))
        }
    }, [isFetching])

    const handleChangePaginate = async (event, value) => {
        const { init, end, limit } = getPagination(value, size)
        const { currentPage } = getPagingData(getbets.total, value, Number(limit), size)
        setQuery({ ...query, init, end })
        setPage(currentPage)
        await delay(200)
        document.documentElement.scrollIntoView({ inline: 'start', block: 'start', behavior: 'smooth' })
    }

    const handleActive = (value: string | OnActiveProps) => {
        setPage(1)
        if (isObject(value)) {
            if (value.value === 'CUSTOM_FILTER') {
                setQuery({
                    ...defaultQuery,
                    status: value.obj.status,
                    type: value.obj.type,
                    op_date_init: value.obj.dateObj.init,
                    op_date_end: value.obj.dateObj.end,
                    game: value.obj.game,
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
            if (find.filter === 'status') {
                setQuery({ ...defaultQuery, status: find.value })
                return
            }
        }
    }
    const handleShowLast30Days = (activeTabFilter) => {
        if (!activeTabFilter) {
            return (
                <StyledTotalResult>
                    <p>
                        <span>{getbets?.total}</span> resultados
                    </p>
                </StyledTotalResult>
            )
        }
        if (!['ALL', 'LAST-MOUNTH'].includes(activeTabFilter.value)) {
            return (
                <StyledTotalResult>
                    <p>
                        <span>{getbets?.total}</span> resultados <span className="last30">de los ultimos 30 dias</span>
                    </p>
                </StyledTotalResult>
            )
        }
        return (
            <StyledTotalResult>
                <p>
                    <span>{getbets?.total}</span> resultados
                </p>
            </StyledTotalResult>
        )
    }
    return (
        <Styled>
            <ScrollFilter items={Items} onActive={handleActive} />
            <StyledWrapperTop>
                <StyledRefresh onClick={() => (loading || isFetching ? null : refetch())} $loading={loading || isFetching}>
                    <SyncIcon></SyncIcon>
                    <span>Actualizar</span>
                </StyledRefresh>

                {handleShowLast30Days(activeTabFilter)}
            </StyledWrapperTop>
            {bets && bets?.length > 0 ? (
                <>
                    {desktopS ? <DesktopApuestas bets={bets} /> : <CardMobileBetsHistory bets={bets} />}
                    <StyledWrapperPagination>
                        <Pagination
                            boundaryCount={tabletL ? 2 : 1}
                            siblingCount={tabletL ? 2 : mobileM ? 1 : 0}
                            color="primary"
                            count={count}
                            onChange={handleChangePaginate}
                            page={page}
                            shape="rounded"
                            variant="text"
                        />
                    </StyledWrapperPagination>
                </>
            ) : isLoading || isFetching ? (
                <LoadingDefault loading={isLoading || isFetching}></LoadingDefault>
            ) : (
                <NotData>No hay datos</NotData>
            )}
        </Styled>
    )
}

export default MobileApuestas
const Styled = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: inherit;
    overflow: hidden;
    padding-top: 7px;
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
    $loading: boolean
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

const HistoryCardsS = styled.div`
    background: ${(p) => p.theme.palette.alternate12.main};
    padding: 2rem 0rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`
