import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGetBannersQuery, useGetLobbyQuery } from 'states/calimaco/calimacoContentApi'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useSelector } from 'react-redux'
import { CasinoLobbiesSelector } from 'states/slice/casino/CasinoLobbies'
import { userSelector } from 'states/features/slices/userSlice'
import useMediaQueryAT from 'hooks/useMediaQueryAT'
import { Lobby, Provider, User } from '@interfaces/index'
import { BannerRight, Banner as BannerLeft } from './Banner'
import { TabsButton } from './TabsButton'
import ScrollContainer from 'react-indiana-drag-scroll'
import useWindowSize from '@hooks/useWindowSize'
import Vimeo from '@u-wave/react-vimeo'
import { ScrollLoop, ScrollLoopRounded } from './ScrollLoop'
import { ScrollLoopCards } from './ScrollLoop/ScrollLoopCards'
import { ScrollLoopTopTen } from './ScrollLoop/ScrollLoopTopTen'
import { ScrollLoopSeason } from './ScrollLoop/ScrollLoopSeason'
import halloween from './assets/halloween-theme.png'
import { ScrollShortThumbnail } from './Short'
import { Button } from '@mui/material'
import hexAlpha from 'hex-alpha'

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
    const { data: dataJackpot } = useGetLobbyQuery({ ...query, lobby: 'CASINO_JACKPOT' })
    const { data: dataNuevos } = useGetLobbyQuery({ ...query, lobby: 'JUEGOSNUEVOS' })
    const { data: dataBannerMovil } = useGetBannersQuery({ container: 'HOME_CENTRALMOVIL' })
    const [providers, setProviders] = useState<Provider[]>([])
    const [lobby, setLobby] = useState<Lobby[]>([])
    const { width } = useWindowSize()

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

    const getMoreLobbies = () => {
        setQuery({ ...query, init: query.init + real_push_query_size, end: query.end + real_push_query_size })
    }

    useEffect(() => {
        const items = document.querySelectorAll('.scroll-container-casino')
        if (items) {
            items.forEach((item) => {
                const childrens = item.querySelectorAll('div > div')
                childrens.forEach((item: HTMLDivElement, index) => {
                    const parent = item.parentElement
                    const aspecRatioText = window.getComputedStyle(item, null).getPropertyValue('aspect-ratio')
                    const widthText = Number(window.getComputedStyle(item, null).getPropertyValue('width').replaceAll('px', '')).toFixed(0)
                    const heightText = Number(window.getComputedStyle(item, null).getPropertyValue('height').replaceAll('px', '')).toFixed(
                        0
                    )

                    if (parent.getAttribute('widthOrder')) {
                        item.innerHTML = `<span class="order">${Number(index) + 1}</span>
                        <span>${widthText} x ${heightText}</span>
                        <span>Aspecto Relacion</span>
                        <span>${aspecRatioText}</span>`
                    } else {
                        item.innerHTML = `
                        <span>${widthText} x ${heightText}</span>
                        <span>Aspecto Relacion</span>
                        <span>${aspecRatioText}</span>`
                    }
                    item.style.webkitFlex = `0 0 ${parent.getAttribute('width')}%`
                    item.style.flex = `0 0 ${parent.getAttribute('width')}%`
                    item.style.aspectRatio = `${parent.getAttribute('aspectRatio')}`
                    item.style.maxWidth = `${Number(parent.getAttribute('width')) * 6}px`
                    item.style.backgroundColor = `${parent.getAttribute('color')}`
                    parent.style.gap = `${parent.getAttribute('gap')}px`
                })
            })
        }
    }, [width])

    return (
        <>
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
                <TabsButton pathname={pathname} total={data?.total_machines} lobbyName={lobbyName} />
                <ScrollLoopCards title="Continúa jugando" data={dataJackpot?.lobby} aspectRatio="44/31" width={40} gap="8" />
                <ScrollLoop title="Novedades" data={dataJackpot?.lobby} aspectRatio="44/31" width={40} gap="8" />
                <ScrollLoopTopTen title="Top 10 de la semana" data={dataJackpot?.lobby} aspectRatio="5/7" width={38} gap="10" />
                <ScrollLoopRounded
                    title="Elige por proveedor"
                    data={Array.from({ length: 8 }).map((_, i) => {
                        return <StyledScrollItem key={i}></StyledScrollItem>
                    })}
                />

                <SpecialSeasonContainer className="contenedor" image={halloween.src} backgroundColor="#b94702c7">
                    <ScrollLoopSeason title="Juegos del Momento" data={dataJackpot?.lobby} aspectRatio="44/31" width={40} gap="8" />
                </SpecialSeasonContainer>

                {/* <StyledTitle className="center">"Temporadas" en AT</StyledTitle>
                <StyledScrollContainer className="scroll-container-casino" aspectRatio="5/3" width="100" gap="8" color="#FF7468">
                    <>
                        {Array.from({ length: 1 }).map((_, i) => {
                            return <StyledScrollItem key={i}></StyledScrollItem>
                        })}
                    </>
                </StyledScrollContainer>

                <StyledTitle className="center">JUEGO ESPECIAL (VIDEO)</StyledTitle>
                <StyledVideo>
                    <StyledVimeo
                        autopause
                        showByline
                        autoplay={false}
                        className="player-vimeo-component-4324324343"
                        video={'https://player.vimeo.com/video/762430292?h=8b4eb3b4d9'}
                    ></StyledVimeo>
                    <Button variant="contained">Juegalo ahora</Button>
                </StyledVideo> */}

                <ScrollLoop title="Grandes Jackpots" data={dataJackpot?.lobby} aspectRatio="25/18" width={37} gap="8" />
                <ScrollLoop title="Compra funciones" data={dataJackpot?.lobby} aspectRatio="25/18" width={37} gap="8" />
                <ScrollLoop title="Animales fantásticos" data={dataJackpot?.lobby} aspectRatio="25/18" width={37} gap="8" />
                <ScrollLoop title="Civilizaciones Antiguas" data={dataJackpot?.lobby} aspectRatio="25/18" width={37} gap="8" />
                <ScrollLoop title="Otra Categoría" data={dataJackpot?.lobby} aspectRatio="25/18" width={37} gap="8" />

                <ScrollShortThumbnail title={'Shorts'} width={50} gap={20} hiddenTitle={false} />
            </StyledBody>
        </>
    )
}

interface StyledProps {
    aspectRatio: string
    width: string
    gap: string
    color: string
    widthOrder?: string
}
interface WrapperProps {
    image: any
    backgroundColor: string
}
const StyledVimeo = styled(Vimeo)`
    width: 100%;
    margin: auto;
    display: flex;
    flex: 1;
    > iframe {
        height: 100%;
        width: 100%;
    }
`
const StyledTitle = styled.h2`
    font-weight: 500;
    font-size: 1rem;
    padding: 0 14px;
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 0 50px;
    }
    &.center {
        text-align: center;
    }
`
const StyledScrollContainer = styled(ScrollContainer)<StyledProps>`
    && {
        position: relative;
        display: flex;
        min-width: 100%;
        padding: 7px 14px;

        ${MEDIA_QUERIES.min_width.desktopS} {
            padding: 10px 50px;
        }
    }
`
const StyledScrollItem2 = styled.div`
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 50%;
    aspect-ratio: 1 / 1;

    > span {
        text-align: center;
        color: black;
        font-size: 0.9rem;
    }
    > span.order {
        position: absolute;
        font-weight: 900;
        bottom: -10px;
        left: 0;
        z-index: 2;
        font-size: 6rem;
        font-family: 'Titan One', cursive;
    }
`
const StyledScrollItem = styled.div`
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    /* // Fallback
    @supports not (aspect-ratio: 1 / 1) {
        &::before {
            float: left;
            padding-top: 56.25%;
            content: '';
        }

        &::after {
            display: block;
            content: '';
            clear: both;
        }
    } */
    > span {
        text-align: center;
        color: black;
    }
    > span.order {
        position: absolute;
        font-weight: 900;
        bottom: -10px;
        left: 0;
        z-index: 2;
        font-size: 7rem;
        font-family: 'Titan One', cursive;
    }
`
const StyledBanners = styled.div`
    & {
        display: flex;
        /* height: 550px; */
        width: calc(100% + 100px);
        position: relative;
        right: 50px;
        display: flex;
        z-index: 10;

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
                background: linear-gradient(to right, ${(p) => p.theme.background}, transparent);
                z-index: 11;
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
                    background: linear-gradient(to left, ${(p) => p.theme.background}, transparent);
                    z-index: 11;
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

const WrapperBannerMovilS = styled.div`
    & {
        display: flex;
        width: calc(100% + 28px);
        right: 14px;
        position: relative;
        z-index: 10;
        /* overflow: initial; */
    }
`
const StyledBody = styled.div`
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    padding-top: 5px;
    gap: 10px;
`
const StyledVideo = styled.div`
    width: 100%;
    max-width: 750px;
    margin: auto;
    aspect-ratio: 6/5;
    display: flex;
    flex-direction: column;
    && {
        > button {
            text-transform: initial;
            font-size: 1rem;
            margin: auto;
            margin-top: 10px;
            display: block;
            padding: 8px 16px;
            line-height: 1;
        }
    }
`
const SpecialSeasonContainer = styled.div<WrapperProps>`
    background: linear-gradient(247.98deg, rgba(0, 0, 0, 0) 23.7%, ${(p) => hexAlpha('#ff0000', 0.2)} 70.81%);
    position: relative;
    display: flex;
    min-width: 100%;
    width: calc(100% + 28px);
    right: 14px;
    overflow: hidden;
    flex-direction: column;
    &::after,
    &::before {
        content: '';
        flex: 1;
        width: 100%;
        display: block;
        background: url(${(p) => p.image}) top repeat-x;
        background-size: 10rem;
        min-height: 5rem;
    }
`
