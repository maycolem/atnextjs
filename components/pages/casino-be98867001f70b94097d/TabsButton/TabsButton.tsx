import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { randomIntegerIncInc } from '@helpers/randomIntegerIncInc'
import { userSessionSelector } from '@states/features/slices/userSlice'
import { useAppSelector } from '@states/store'
import { useGetLobbyQuery } from '@states/calimaco/calimacoContentApi'
import { useRouter } from 'next/router'
import { Lobby } from '@interfaces/casino'
import { Button } from '@mui/material'
import { PATHS } from '@routes/paths/PATHS'
import Link from 'next/link'
import useSound from 'use-sound'
import trofeoIMG from '../assets/fake/trofeo_animate.png'
interface Props {
    total: number
    lobbyName: string
    pathname: string
}
export const TabsButton = ({ total, lobbyName, pathname }: Props) => {
    // const soundUrl = '/assets/sounds/sound_1.mp3'
    const soundUrl = '../assets/sounds/sound_1.mp3'
    const [play] = useSound(soundUrl)
    const session = useAppSelector(userSessionSelector)
    const [init, setInit] = useState()
    const router = useRouter()
    const [isAnimating, setIsAnimating] = useState(false)
    const { data, isLoading, isFetching } = useGetLobbyQuery(
        {
            end: init,
            favourites: false,
            lobby: lobbyName,
            init: init,
            name: '',
            providers: '',
            tags: '',
            op_date_init: '',
            op_date_end: '',
            session: session ? session : undefined,
        },
        { skip: !init }
    )
    const handlePushGame = async (lobby: Lobby) => {
        await router.push({
            pathname,
            query: {
                provider: lobby?.sub_provider,
                gameName: lobby?.web_name,
            },
        })
    }

    const handleClick = () => {
        setIsAnimating(true)
        play()
        setTimeout(() => {
            // TODO: hacer push a la ruta o onClick aquí
            setIsAnimating(false)
        }, 3000)
    }

    useEffect(() => {
        if (init && data) {
            handlePushGame(data?.lobby[0])
        }
    }, [data, init])

    return (
        <CategoryScrollS>
            <div>
                <Link href={PATHS.CASINO_be98867001f70b94097d_TODOS.url}>
                    <ButtonStyled
                        onClick={() => {
                            handleClick()
                        }}
                    >
                        <div>
                            <img alt={'TODOS'} loading="lazy" src={trofeoIMG.src} />
                            <span>Todos</span>
                        </div>
                    </ButtonStyled>
                </Link>
                <ButtonStyled
                    className={`fade ${isAnimating ? 'fade-enter' : ''}`}
                    onClick={() => {
                        const number = randomIntegerIncInc(0, total - 1)
                        setInit(number)
                        play()
                        handleClick()
                    }}
                    disabled={isLoading || isFetching}
                    disableRipple
                    disableFocusRipple
                    disableElevation
                    disableTouchRipple
                >
                    <div>
                        <img alt={'AL AZAR'} loading="lazy" src={trofeoIMG.src} />

                        <span>¡Al azar!</span>
                    </div>
                </ButtonStyled>
                <Link href={PATHS.CASINO_be98867001f70b94097d_FAVORITOS.url}>
                    <ButtonStyled
                        onClick={() => {
                            handleClick()
                        }}
                    >
                        <div>
                            <img alt={'FAVORITOS'} loading="lazy" src={trofeoIMG.src} />
                            <span>Favoritos</span>
                        </div>
                    </ButtonStyled>
                </Link>
            </div>
        </CategoryScrollS>
    )
}

const ButtonStyled = styled(Button)`
    && {
        border-radius: 0px;
        cursor: pointer;
        display: flex;
        padding: 8px 20px;
        min-width: 142px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        transition: 200ms;
        font-weight: 500;
        color: ${(p) => p.theme.casino.scrollTabButtons.contrastText};
        background: ${(p) => p.theme.casino.scrollTabButtons.background};
        text-transform: initial;
        font-size: 0.9rem;
        &.Mui-disabled {
            color: rgba(0, 0, 0, 0.26);
            svg {
                color: rgba(0, 0, 0, 0.26);
            }
        }

        &.fade-enter {
            transform: rotate(30deg);
        }

        &.fade-enter-active {
            opacity: 1;
            transition: opacity 300ms;
        }

        &.fade-exit {
            opacity: 0;
        }

        &.fade-exit-active {
            opacity: 0;
            transition: opacity 300ms;
        }
    }
`
const CategoryScrollS = styled.div`
    && {
        position: relative;

        > div {
            gap: 0.5rem;
            display: flex;
            justify-content: center;
            > button {
                flex: 1;
                list-style: none;
                transform: 150ms;
                min-width: initial;
                max-width: 300px;
                background: ${(p) => p.theme.casino.scrollTabButtons.background};
                color: ${(p) => p.theme.casino.scrollTabButtons.contrastText};
                img {
                    height: 20px;
                    max-height: 20px;
                    object-fit: contain;
                    /* filter: grayscale(100%) opacity(0.6); */
                    transition: 200ms;
                }
                svg {
                    transition: 200ms;
                    color: ${(p) => p.theme.contrastText};
                    font-size: 26px;
                }
                color: ${(p) => p.theme.contrastText};
                &:first-of-type {
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                }
                &:last-of-type {
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
                &:hover {
                    background: ${(p) => p.theme.casino.scrollTabButtons.active.background};
                    color: ${(p) => p.theme.casino.scrollTabButtons.active.contrastText};
                }
                &.active {
                    > img {
                        filter: grayscale(0%) opacity(1);
                    }
                }
            }
        }
    }
`
