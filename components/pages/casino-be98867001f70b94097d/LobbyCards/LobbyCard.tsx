/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Button, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useAddLobbyFavoritoMutation, useDeleteLobbyFavoritoMutation } from 'states/calimaco/calimacoDataApi'
import { setOpen } from 'states/features/slices/LoginModalSlice'
import { userSelector } from 'states/features/slices/userSlice'
import { useAppSelector } from '@states/store'
import { Lobby } from '@interfaces/casino'
import { dtCasinoGame } from '../index'

interface Props {
    lobby: Lobby
    pathname: string
    section: string
}

export const LobbyCard = ({ lobby, pathname, section }: Props) => {
    const router = useRouter()
    const user = useAppSelector(userSelector)
    const [addFavarite] = useAddLobbyFavoritoMutation()
    const [deleteFavarite] = useDeleteLobbyFavoritoMutation()
    const dispatch = useDispatch()
    const { web_name, lobby_tag, logo, sub_provider, machine, name, favourite } = lobby
    const [isFavorite, setIsFavorite] = useState(false)

    const lobbyTagSlice = (tag: any, init: number, end: number) => {
        if (lobby_tag) {
            return 1
        }
        tag?.slice(init, end)
    }

    useEffect(() => {
        setIsFavorite(favourite)
    }, [favourite])

    const handlePlay = async () => {
        await router.push({
            pathname,
            query: {
                provider: sub_provider,
                gameName: web_name,
            },
        })
    }
    const handleLike = async () => {
        if (!isFavorite) {
            if (!user) {
                dispatch(setOpen())
                return
            }
            await addFavarite({ machine })
        } else {
            if (!user) {
                dispatch(setOpen())
                return
            }
            await deleteFavarite({ machine })
        }
        setIsFavorite(!isFavorite)
    }

    return (
        <StyledCard $column={lobbyTagSlice(lobby_tag, 0, 1)} $row={lobbyTagSlice(lobby_tag, 2, 3)} title={name}>
            <img alt="" src={`${process.env.REACT_APP_WEB_BASE}/${logo}`} loading="lazy" />
            <WrapperAccions>
                <ButtonS onClick={handlePlay} title={`jugar ${name}`} variant="contained">
                    <div>
                        <span className="play" onClick={() => dtCasinoGame(`${name}`, `${section}`)}>
                            Jugar
                        </span>
                    </div>
                </ButtonS>
            </WrapperAccions>
            <IconButtonS color="primary" onClick={handleLike}>
                {isFavorite ? <FavoriteIcon></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}
            </IconButtonS>
        </StyledCard>
    )
}

const LoadingSHeighS = styled.div`
    & {
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
const ButtonS = styled(Button)`
    & {
        padding: 0;
        font-size: 0.8rem;
        text-transform: capitalize;
        width: 70%;
        max-width: 200px;
        cursor: pointer;
        padding: 0.1rem 1rem;
        > div {
            font-size: 0.8rem;
            text-transform: capitalize;
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        &.practicar {
            text-transform: capitalize;
            border: 1px solid white;
        }
    }
`
const WrapperAccions = styled.div`
    & {
        position: absolute;
        bottom: -40px;
        left: 50%;
        white-space: nowrap;
        transform: translateX(-50%);
        text-transform: capitalize;
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        transition: all 150ms;
        opacity: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 0.2rem;
        z-index: 3;
    }
`
const IconButtonS = styled(IconButton)`
    && {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 9;

        svg {
            color: ${(p) => p.theme.palette.light.main};
        }
    }
`
interface PropsStyled {
    $column: number
    $row: number
}
const StyledCard = styled.div<PropsStyled>`
    & {
        background: transparent;
        border-radius: 6px;
        overflow: hidden;
        position: relative;
        transition: 200ms;
        aspect-ratio: 7/5;
        ${MEDIA_QUERIES.min_width.desktopXS} {
            grid-column: span ${(p) => p.$column};
            grid-row: span ${(p) => p.$row};
        }
        ::after {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            z-index: 1;
            background: linear-gradient(to left, rgba(0, 0, 0, 0.384534534), transparent);
            top: 0;
            opacity: 0;
        }
        ::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            z-index: 1;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.884534534), transparent);
            top: 0;
            transition: 200ms;
            opacity: 0;
        }

        img {
            object-fit: cover;
            transition: 300ms;
        }
        &:hover {
            ::before,
            ::after {
                opacity: 1;
            }
            ${WrapperAccions} {
                bottom: 5px;
                opacity: 1;
            }
            img {
                transform: scale(1.1);
            }
        }
        transform: scale(0);
        opacity: 0;
        filter: grayscale(100%);

        animation-name: zoom;
        animation-delay: 100ms;
        animation-iteration-count: 1;
        animation-fill-mode: both;
        &:nth-of-type(even) {
            animation-duration: 0.15s;
        }
        &:nth-of-type(odd) {
            animation-duration: 0.35s;
        }
    }
`
