import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '@states/features/slices/userSlice'
import { Backdrop, CircularProgress, Fade, Modal } from '@mui/material'
import { Lobby, Provider, User } from '@interfaces/index'
import { useGetLobbyQuery } from 'states/calimaco/calimacoContentApi'
import { ButtonMoreLobbies } from '@components/pages/casino/LobbyCards'
import { useAppSelector } from '@states/store'
import { casinoModalSelector, onClose } from '@states/features/slices/CasinoModalSlice'
import { FormSearchGame } from './FormSearchGame'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { debounce } from 'lodash'
import { CasinoLobbiesSelector } from '@states/slice/casino/CasinoLobbies'
import { SearchCards } from './SearchCards'
import { delay } from '@helpers/delay'
import InfiniteScroll from 'react-infinite-scroll-component';

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

export const ModalSearchCasino = () => {
    const dispatch = useDispatch()
    const { open } = useAppSelector(casinoModalSelector)

    const [casino, casino_en_vivo, juegos_virtuales] = [
        {
            section: 'casino',
            lobbyName: 'CASINO_TODOS',
            pathname: '/casino/[provider]/[gameName]',
            filterTags: ['TRAGAMONEDAS', 'BUY_FEATURE', 'JACKPOT', 'ESPECIALES', 'BLACKJACK', 'POKER', 'RULETA', 'RASPADITAS'],
        },
        {
            section: 'casino en vivo',
            lobbyName: 'LIVECASINO_TODOS',
            pathname: '/casino-en-vivo/[provider]/[gameName]',
            filterTags: ['TV_SHOW', 'BLACKJACK', 'RULETA', 'BACCARAT', 'POKER', 'CARTAS', 'DADOS', 'OTROS'],
        },
        {
            section: 'juegos virtuales',
            lobbyName: 'JUEGOS_VIRTUALES_TODOS',
            pathname: '/juegos-virtuales/[provider]/[gameName]',
            filterTags: ['TV_SHOW', 'BLACKJACK', 'RULETA', 'BACCARAT', 'POKER', 'CARTAS', 'DADOS', 'OTROS'],
        },
    ]
    const filterTags = casino.filterTags
    const dtSection = casino.section
    const pathname = casino.pathname
    const lobbyName = casino.lobbyName

    const size = 35
    const real_push_query_size = size + 1
    const user: User = useSelector(userSelector)
    const defaultQuery = {
        end: size,
        favourites: false,
        lobby: '',
        init: 0,
        name: '',
        providers: '',
        tags: '',
        op_date_init: '',
        op_date_end: '',
        session: user ? user.session : undefined,
    }

    const [query, setQuery] = useState<Query>(defaultQuery)
    const [providers, setProviders] = useState<Provider[]>([])
    const [lobby, setLobby] = useState<Lobby[]>([])
    const [searchLobby, setSearchLobby] = useState('')
    const { data, isLoading, isFetching } = useGetLobbyQuery(query, { skip: !searchLobby })
    const [hiddenButton, setHiddenButton] = useState(false)
    const handleOnClose = () => {
        setLobby([])
        setSearchLobby('')
        dispatch(onClose())
    }
    useEffect(() => {
        if (data) {
            if ('providers' in data) {
                if (providers.length < 1) {
                    setProviders(data.providers)
                }
            }
            if ('lobby' in data) {
                if (data?.lobby?.length === 0) {
                    setHiddenButton(true)
                } else {
                    setHiddenButton(false)
                }
                delay(250).then(() => {
                    setLobby([...lobby, ...data.lobby])
                })
            }
        }
    }, [data])

    useEffect(() => {
        // setLobby([])
        if (user?.session) {
            window.scrollTo({
                top: 0,
                behavior: 'auto',
            })
            setQuery({ ...defaultQuery, name: searchLobby, session: user?.session })
            return
        }
    }, [user?.session])

    const getMoreLobbies = () => {
        setQuery({ ...query, init: query.init + real_push_query_size, end: query.end + real_push_query_size })
    }

    const debouncedSearch = React.useRef(
        debounce(async (inputSearch: string, lobbyName: string) => {
            setQuery({ ...query, name: inputSearch, lobby: lobbyName })
        }, 1000)
    ).current

    useEffect(() => {
        setLobby([])
        if (searchLobby.length >= 3) {
            debouncedSearch(searchLobby, lobbyName) // 'CASINO_TODOS'
        }
        delay(1100).then(() => {
            if (searchLobby.length === 0) {
                setLobby([])
            }
        })
    }, [searchLobby])

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [debouncedSearch])

    if (!open) {
        return null
    }

    return (
        <ModalS BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }} closeAfterTransition onClose={handleOnClose} open={open}>
            <Fade in={open}>
                <ModalWrapperS>
                    <StyledBody>
                        <FormSearchGame
                            pathname={pathname}
                            lobbyName={lobbyName}
                            providers={providers}
                            filterTags={filterTags}
                            section={dtSection}
                            setSearchLobby={setSearchLobby}
                        />
                        <InfiniteContainerS id="scrollableDiv" >
                            <InfiniteScroll
                                dataLength={lobby.length}
                                next={getMoreLobbies}
                                hasMore={true}
                                loader={ searchLobby.length === 0 || hiddenButton ? null : (<CircularSpinnerS />) }
                                scrollableTarget="scrollableDiv"
                                style={{overflow: 'hidden', textAlign: 'center'}}
                            >
                                <SearchCards lobbies={lobby} pathname={pathname} section={dtSection} />
                            </InfiniteScroll>
                        </InfiniteContainerS>
                    </StyledBody>
                </ModalWrapperS>
            </Fade>
        </ModalS>
    )
}

const ModalS = styled(Modal)`
    & {
        z-index: 999 !important;
        overflow: auto;
        display: flex;
        align-items: center;
        padding: 0 0.5rem;

        .MuiBackdrop-root {
            position: absolute;
            min-width: calc(340px + 2rem);
        }
    }
`
const ModalWrapperS = styled.div`
    outline: none;
    background: #fff;
    position: relative;
    z-index: 1;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    overflow: hidden;
    height: 75vh;
    width: 95vw;
    max-width: 900px;
    max-height: 800px;
    min-width: 360px;
    padding: 20px 15px;

    ${MEDIA_QUERIES.min_width.tabletL} {
        padding: 20px 30px;
    }
`
const StyledBody = styled.div`
    & {
        padding-bottom: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        overflow-y: auto;
        padding-top: 10px;
        width: 100%;
    }
`
const InfiniteContainerS = styled.div`
    overflow-y: auto;
    &::-webkit-scrollbar {
	    width: 7px;
    }
    &::-webkit-scrollbar-thumb {
        background: #c1c1c19b;
        border-radius: 5px;
    }
    &:hover::-webkit-scrollbar-thumb {
        background: #c1c1c1;
    }
`
const CircularSpinnerS = styled(CircularProgress)`
    color: red;
    margin-top: 10px
`