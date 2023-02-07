import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGetLobbyQuery } from 'states/calimaco/calimacoContentApi'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useSelector } from 'react-redux'
import { CasinoLobbiesSelector } from 'states/slice/casino/CasinoLobbies'
import { userSelector } from 'states/features/slices/userSlice'
import useMediaQueryAT from 'hooks/useMediaQueryAT'
import { Lobby, Provider, User } from '@interfaces/index'
import { CategoryTabs } from './CategoryTabs/index'
import { BannerRight, Banner as BannerLeft } from './Banner'
import { FormFilter } from './FormFilter'
import { LobbyCards, ButtonMoreLobbies } from './LobbyCards/index'

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
interface Props {
    containerLeft: string
    containerRight: string
    dtSection: string
    pathname: string
    lobbyName: string
    filterTags: string[]
}
export const Casino = ({ containerLeft, containerRight, dtSection, lobbyName, pathname, filterTags }: Props) => {
    const size = 35
    const real_push_query_size = size + 1
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    const { categoria, proveedor } = useSelector(CasinoLobbiesSelector)
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
    const [providers, setProviders] = useState<Provider[]>([])
    const [lobby, setLobby] = useState<Lobby[]>([])

    useEffect(() => {
        setLobby([])
        if (user?.session) {
            window.scrollTo({
                top: 0,
                behavior: 'auto',
            })
            setQuery({ ...defaultQuery, session: user?.session })
            return
        }
    }, [user?.session])
    useEffect(() => {
        setLobby([])
        if (categoria === 'Favoritos') {
            setQuery({ ...defaultQuery, providers: proveedor, favourites: true })
            return
        }
        setQuery({ ...defaultQuery, tags: categoria, providers: proveedor })
    }, [categoria, proveedor])
    useEffect(() => {
        if (data) {
            if ('providers' in data) {
                if (providers.length < 1) {
                    setProviders(data.providers)
                }
            }
            if ('lobby' in data) {
                setLobby([...lobby, ...data.lobby])
            }
        }
    }, [data])

    const getMoreLobbies = () => {
        setQuery({ ...query, init: query.init + real_push_query_size, end: query.end + real_push_query_size })
    }

    return (
        <>
            <StyledTitle>Juegos Populares</StyledTitle>
            {desktopS ? (
                <StyledBanners id="casino-banner">
                    <div className="left-images">
                        <BannerLeft container={containerLeft} section={dtSection} />
                    </div>
                    <div className="right-images">
                        <div className="wrapper">
                            <BannerRight container={containerRight} section={dtSection} />
                        </div>
                    </div>
                </StyledBanners>
            ) : (
                <WrapperBannerMovilS id="casino-banner">
                    <BannerLeft container={containerLeft} section={dtSection} />
                </WrapperBannerMovilS>
            )}
            <StyledBody>
                {desktopS && <CategoryTabs filterTags={filterTags} section={dtSection} />}
                <FormFilter pathname={pathname} lobbyName={lobbyName} providers={providers} filterTags={filterTags} section={dtSection} />
                <LobbyCards lobbies={lobby} pathname={pathname} section={dtSection} />
                <ButtonMoreLobbies loading={isLoading || isFetching} onClick={getMoreLobbies}></ButtonMoreLobbies>
            </StyledBody>
        </>
    )
}

const StyledBanners = styled.div`
    & {
        display: flex;
        /* height: 550px; */
        width: calc(100% + 100px);
        position: relative;
        right: 50px;
        display: flex;
        .left-images {
            flex: 1 1 65%;
            width: 65%;
            max-width: 1200px;
            /* background: rgba(5, 5, 5, 1); */
            position: relative;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                right: 100%;
                /* background: linear-gradient(to right, rgba(5, 5, 5, 1), transparent); */
                background: linear-gradient(to right, ${(p) => p.theme.palette.alternate4.main}, transparent);
                z-index: 99;
                height: calc(100% - 35px);
                /* width: calc(4rem + 0.5vw + 10% + 2rem); */
                width: calc(4rem);
                ${MEDIA_QUERIES.min_width.desktopM} {
                    width: calc(6rem);
                }
                ${MEDIA_QUERIES.min_width.desktopL} {
                    width: calc(8rem);
                }
                ${MEDIA_QUERIES.min_width.desktopXXL} {
                    width: calc(10rem);
                }
                pointer-events: none;
            }
        }
        .right-images {
            flex: 1 1 35%;
            width: 35%;
            max-width: 700px;
            display: flex;
            flex-direction: column;
            padding-bottom: 35px;
            .wrapper {
                position: relative;
                padding: calc(1.5rem + 0.15vw) 1rem;
                ${MEDIA_QUERIES.min_width.desktopXXL} {
                    padding: calc(1.5rem + 0.5vw) 1rem;
                    padding-left: 2rem;
                }
                padding-left: 2rem;
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                /* background: rgba(5, 5, 5, 1); */
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 100%;
                    /* background: linear-gradient(to left, rgba(5, 5, 5, 1), transparent); */
                    background: linear-gradient(to left, ${(p) => p.theme.palette.alternate4.main}, transparent);
                    z-index: 9;
                    top: 1rem;
                    height: calc(100% - 2rem);
                    /* width: calc(4rem + 0.5vw + 20% + 2rem); */
                    width: calc(4rem);
                    ${MEDIA_QUERIES.min_width.desktopM} {
                        width: calc(6rem);
                    }
                    ${MEDIA_QUERIES.min_width.desktopL} {
                        width: calc(8rem);
                    }
                    ${MEDIA_QUERIES.min_width.desktopXXL} {
                        width: calc(10rem);
                    }
                    pointer-events: none;
                }
                .wrap-image {
                    position: relative;
                    cursor: pointer;
                    flex: 1;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    img {
                        position: absolute;
                        object-fit: cover;
                    }
                }
            }
        }
    }
`
const StyledTitle = styled.h1`
    & {
        font-weight: 500;
        font-size: 1.2rem;
        color: ${(p) => p.theme.palette.dark3.main};
        ${MEDIA_QUERIES.min_width.mobileL} {
            display: none;
        }
    }
`
const WrapperBannerMovilS = styled.div`
    & {
        display: flex;
        width: calc(100% + 28px);
        right: 14px;
        position: relative;
        overflow: hidden;
    }
`
const StyledBody = styled.div`
    & {
        padding-bottom: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        overflow: hidden;
        padding-top: 5px;
    }
`
