import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userSelector } from '@states/features/slices/userSlice'
import { useSelector } from 'react-redux'
import { PATHS } from '@routes/paths/PATHS'
import { User } from '@interfaces/index'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useGetLobbyQuery } from '@states/calimaco/calimacoContentApi'
import { SearchCards } from '@layout/ModalSearchCasino/SearchCards'
import { CircularProgress, Breadcrumbs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from 'next/link'

const Index = () => {
    const size = 35
    const real_push_query_size = size + 1
    const lobbyName = 'CASINO_TODOS'
    const pathname = PATHS.CASINO_GAME_PROVIDER_GAME_NAME.url
    const dtSection = 'casino'
    const user: User = useSelector(userSelector)
    const [hiddenSpinner, setHiddenSpinner] = useState(false)

    const defaultQuery = {
        end: size,
        favourites: true,
        lobby: lobbyName,
        init: 0,
        name: '',
        providers: '',
        tags: '',
        op_date_init: '',
        op_date_end: '',
        session: user ? user.session : undefined,
    }
    const [query, setQuery] = useState(defaultQuery)
    const { data } = useGetLobbyQuery(query)
    const [lobbyFavorites, setLobbyFavorites] = useState([])

    useEffect(() => {
        setLobbyFavorites([])
        if (data) {
            if ('lobby' in data) {
                if (data?.lobby?.length === 0) {
                    setHiddenSpinner(true)
                } else {
                    setHiddenSpinner(false)
                }
                setLobbyFavorites([...lobbyFavorites, ...data.lobby])
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
            Favoritos
        </Typography>,
    ]

    return (
        <InfiniteScroll
            dataLength={lobbyFavorites.length}
            next={getMoreLobbies}
            hasMore={lobbyFavorites.length === 0}
            loader={lobbyFavorites.length === 0 || hiddenSpinner ? null : <CircularSpinnerS />}
            style={{ overflow: 'hidden', textAlign: 'center', padding: '14px', minHeight: '100vh' }}
        >
            {/* <StyleBread separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
            </StyleBread> */}
            <SearchCards lobbies={lobbyFavorites} pathname={pathname} section={dtSection} />
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
