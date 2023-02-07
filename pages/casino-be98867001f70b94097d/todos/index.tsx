import React, { useEffect, useState } from 'react'
import { Lobby, User } from '@interfaces/index'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { useGetLobbyQuery } from 'states/calimaco/calimacoContentApi'
import { SearchCards } from '@layout/ModalSearchCasino/SearchCards'
import { PATHS } from '@routes/paths/PATHS'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { CircularProgress, Breadcrumbs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from 'next/link'

interface Query {
    name: string
    providers: string
    tags: string
    favourites: boolean
    lobby: string
    op_date_init: string
    op_date_end: string
    init: number
    end: number
    session?: string
}

const Index = () => {
    const size = 60
    const real_push_query_size = size + 1
    const lobbyName = 'CASINO_TODOS'
    const pathname = PATHS.CASINO_GAME_PROVIDER_GAME_NAME.url
    const dtSection = 'casino'
    const [hiddenSpinner, setHiddenSpinner] = useState(false)

    const user: User = useSelector(userSelector)
    const defaultQuery = {
        end: size,
        favourites: false,
        lobby: lobbyName,
        init: 0,
        name: '',
        providers: '',
        tags: '',
        op_date_init: '',
        op_date_end: '',
        session: user ? user.session : undefined,
    }
    const [query, setQuery] = useState<Query>(defaultQuery)
    const { data, isLoading, isFetching } = useGetLobbyQuery(query)
    const [lobby, setLobby] = useState<Lobby[]>([])

    useEffect(() => {
        if (data) {
            if ('lobby' in data) {
                if (data?.lobby?.length === 0) {
                    setHiddenSpinner(true)
                } else {
                    setHiddenSpinner(false)
                }
                setLobby([...lobby, ...data.lobby])
            }
        }
    }, [data])

    const getMoreLobbies = () => {
        setQuery({ ...query, init: query.init + real_push_query_size, end: query.end + real_push_query_size })
    }

    const breadcrumbs = [
        <Link key="1" href={PATHS.CASINO_be98867001f70b94097d.url}>
            Casino
        </Link>,
        <Typography key="2" color="red">
            Todos los juegos
        </Typography>,
    ]

    return (
        <InfiniteScroll
            dataLength={lobby.length}
            next={getMoreLobbies}
            hasMore={true}
            loader={lobby.length === 0 || hiddenSpinner ? null : <CircularSpinnerS />}
            style={{ overflow: 'hidden', textAlign: 'center', padding: '14px' }}
        >
            {/* <StyleBread separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
            </StyleBread> */}
            <SearchCards lobbies={lobby} pathname={pathname} section={dtSection} />
        </InfiniteScroll>
    )
}

export default Index

const CircularSpinnerS = styled(CircularProgress)`
    color: red;
    margin-top: 10px;
`
const StyleBread = styled(Breadcrumbs)`
    padding-bottom: 1rem;
    font-size: 1.5rem;
`
