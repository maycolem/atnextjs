/* eslint-disable camelcase */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CalimacoClient } from '@calimaco/base'
import cfg from 'config/config'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userSessionSelector } from 'states/features/slices/userSlice'
import styled, { createGlobalStyle } from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import loadingIMG from 'public/assets/casino/loading-game.gif'
import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import { Button } from '@mui/material'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import { Close } from '@mui/icons-material'
import { setOpen } from 'states/features/slices/LoginModalSlice'
import CachedIcon from '@mui/icons-material/Cached'
import { useAddLobbyFavoritoMutation, useDeleteLobbyFavoritoMutation } from 'states/calimaco/calimacoDataApi'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { delay } from 'helpers/delay'
import { useAppSelector } from '@states/store'
import useHeightHeader from '@hooks/useHeightHeader'

interface Props {
    closePathname: string
}

export const Game = ({ closePathname }: Props) => {
    const router = useRouter()
    const client = new CalimacoClient(cfg)
    const [urlFrame, setUrlFrame] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isExpand, setIsExpand] = useState(false)
    const dispatch = useDispatch()
    const session = useAppSelector(userSessionSelector)
    const [addFavarite, { data: dataAddFavorite }] = useAddLobbyFavoritoMutation()
    const [deleteFavarite, { data: dataDeleteFavorite }] = useDeleteLobbyFavoritoMutation()
    const [refresh, setRefresh] = useState(false)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [_machine, setMachine] = useState('')
    const { heightHeader } = useHeightHeader()

    useEffect(() => {
        let mounted = true
        if (!session) {
            dispatch(setOpen())
            window.sessionStorage.setItem('REDIRECT_GAME_NAME', router.asPath)
            router.push(PATHS.CASINO.url)
        }
        if (session) {
            if (router.query.gameName && router.query.provider) {
                if (mounted) {
                    setLoading(true)
                }
                getMachineByName(client, router.query.gameName, router.query.provider, session).then(() => {
                    if (mounted) {
                        setLoading(false)
                    }
                })
                return () => {
                    mounted = false
                }
            }
        }
    }, [router, session])

    useEffect(() => {
        if (refresh) {
            setLoading(true)
            getMachineByName(client, router.query.gameName, router.query.provider, session).then(() => {
                setLoading(false)
            })
        }
    }, [refresh])

    useEffect(() => {
        if (dataDeleteFavorite?.result === 'OK') {
            setIsFavorite(false)
        }
    }, [dataDeleteFavorite])
    useEffect(() => {
        if (dataAddFavorite?.result === 'OK') {
            setIsFavorite(true)
        }
    }, [dataAddFavorite])

    // const cbEffect = async () => {
    //     if (urlFrame && router.query.provider && ['goldenrace2', 'Spinmatic'].includes(router.query.provider)) {
    //         await delay(500)
    //         const casinoIframe = document.getElementById('casino-provider-gameName-iframe')
    //         if (casinoIframe) {
    //             casinoIframe.style.flex = '0'
    //             await delay(7000)
    //             casinoIframe.style.flex = '1'
    //         }
    //     }
    // }
    // useEffect(() => {
    //     cbEffect()
    // }, [urlFrame, router])
    const keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1,
    }

    function preventDefault(e) {
        e.preventDefault()
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e)
            return false
        }
    }

    // modern Chrome requires { passive: false } when adding event
    let supportsPassive = false
    try {
        window.addEventListener(
            'test',
            null,
            Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassive = true
                },
            })
        )
    } catch (e) {}

    const wheelOpt: (AddEventListenerOptions & EventListenerOptions) | boolean = supportsPassive ? { passive: false } : false
    const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

    // call this to Disable
    function disableScroll() {
        window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
        window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
        window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
        window.addEventListener('keydown', preventDefaultForScrollKeys, false)
    }
    // call this to Enable
    function enableScroll() {
        window.removeEventListener('DOMMouseScroll', preventDefault, false)
        window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
        window.removeEventListener('touchmove', preventDefault, wheelOpt)
        window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
    }

    useEffect(() => {
        disableScroll()
        return () => {
            enableScroll()
        }
    }, [])

    const getMachineByName = async (client, gameName, provider, session) => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams()
            params.append('company', process.env.REACT_APP_COMPANY)
            params.append('provider', provider)
            params.append('name', gameName)
            if (session) {
                params.append('session', session)
            }
            const response = await axios.post(`${process.env.REACT_APP_CALIMACO_API_BASE}/contents/getMachineByName`, params)
            // eslint-disable-next-line camelcase
            if (response?.data && response?.data?.favourite) {
                setIsFavorite(response?.data?.favourite)
            }

            const { external_id, type, machine } = response?.data?.machine ?? {}
            setMachine(machine)
            // eslint-disable-next-line camelcase
            if (external_id && type && machine) {
                const res = await client.getProviderInfo(provider, session)
                if (res?.result === 'OK') {
                    const { providerInfo, session, company } = res

                    // eslint-disable-next-line camelcase
                    const url = `${providerInfo.opener}?session=${session}&company=${company}&machine=${machine}&external_id=${external_id}&type=${type}`
                    setUrlFrame(url)
                }
                if (res?.result?.toLowerCase() === 'error') {
                    alert('El juego no esta disponible')
                }
            }
        }
    }

    function toggle_full_screen() {
        if (
            (document['fullScreenElement'] && document['fullScreenElement'] !== null) ||
            (!document['mozFullScreen'] && !document['webkitIsFullScreen'])
        ) {
            if (document.documentElement['requestFullScreen']) {
                document.documentElement['requestFullScreen']()
            } else if (document.documentElement['mozRequestFullScreen']) {
                /* Firefox */
                document.documentElement['mozRequestFullScreen']()
            } else if (document.documentElement['webkitRequestFullScreen']) {
                /* Chrome, Safari & Opera */
                document.documentElement['webkitRequestFullScreen']((Element as any).ALLOW_KEYBOARD_INPUT)
            } else if (document['msRequestFullscreen']) {
                /* IE/Edge */
                document.documentElement['msRequestFullscreen']()
            }
        } else {
            if (document['cancelFullScreen']) {
                document['cancelFullScreen']()
            } else if (document['mozCancelFullScreen']) {
                /* Firefox */
                document['mozCancelFullScreen']()
            } else if (document['webkitCancelFullScreen']) {
                /* Chrome, Safari and Opera */
                document['webkitCancelFullScreen']()
            } else if (document['msExitFullscreen']) {
                /* IE/Edge */
                document['msExitFullscreen']()
            }
        }
    }

    useEffect(() => {
        if (document.addEventListener) {
            document.addEventListener('fullscreenchange', changueFullScreen, false)
            document.addEventListener('mozfullscreenchange', changueFullScreen, false)
            document.addEventListener('MSFullscreenChange', changueFullScreen, false)
            document.addEventListener('webkitfullscreenchange', changueFullScreen, false)
        }

        async function changueFullScreen() {
            await delay(700)
            setIsExpand(!isExpand)
            // if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            //   // Run code on exit
            // }
        }
        return () => {
            document.removeEventListener('fullscreenchange', changueFullScreen)
            document.removeEventListener('mozfullscreenchange', changueFullScreen)
            document.removeEventListener('MSFullscreenChange', changueFullScreen)
            document.removeEventListener('webkitfullscreenchange', changueFullScreen)
        }
    }, [isExpand])

    const GlobalStyleCasino = createGlobalStyle`
  body , html {
    overflow-y: hidden;
  }
  #casino-IframeS{
    height: ${(p) => `calc(${window.innerHeight}px - ${heightHeader}px)`};
  }
  `
    const GlobalStyleCasinoNot = createGlobalStyle`
    body , html {
    overflow-y: hidden;
    }    
    #casino-IframeS{
      height: ${(p) => `calc(${window.innerHeight}px - ${heightHeader}px)`};
    }
    `

    return (
        <>
            {loading ? (
                <Styled></Styled>
            ) : (
                <Styled id="casino-IframeS" $heightHeader={heightHeader}>
                    <div className="window-options">
                        {isFavorite ? (
                            <Button
                                className="option"
                                onClick={async () => {
                                    await deleteFavarite({
                                        machine: _machine,
                                    })
                                }}
                            >
                                <FavoriteIcon></FavoriteIcon>
                            </Button>
                        ) : (
                            <Button
                                className="option"
                                onClick={async () => {
                                    await addFavarite({
                                        machine: _machine,
                                    })
                                }}
                            >
                                <FavoriteBorderIcon></FavoriteBorderIcon>
                            </Button>
                        )}
                        <Button
                            className="option"
                            onClick={() => {
                                setUrlFrame('')

                                setRefresh(true)
                                const timeout = setTimeout(() => {
                                    setRefresh(false)
                                    clearTimeout(timeout)
                                }, 1000)
                            }}
                        >
                            <CachedIcon></CachedIcon>
                        </Button>
                        {!isExpand ? (
                            <Button
                                className="option"
                                onClick={() => {
                                    toggle_full_screen()
                                }}
                                title="expandir"
                            >
                                <AspectRatioIcon></AspectRatioIcon>
                            </Button>
                        ) : (
                            <Button
                                className="option"
                                onClick={() => {
                                    toggle_full_screen()
                                }}
                                title="contraer"
                            >
                                {/* <FullscreenExitIcon></FullscreenExitIcon> */}
                                <AspectRatioIcon></AspectRatioIcon>
                            </Button>
                        )}
                        <Link href={closePathname} legacyBehavior>
                            <Button className="option" title="cerrar">
                                <Close></Close>
                            </Button>
                        </Link>
                    </div>

                    <iframe className="frame" id="casino-provider-gameName-iframe" src={urlFrame}></iframe>
                </Styled>
            )}
            {isExpand && <GlobalStyleCasino></GlobalStyleCasino>}
            {!isExpand && <GlobalStyleCasinoNot></GlobalStyleCasinoNot>}
        </>
    )
}

interface PropsStyled {
    $heightHeader?: number
}

const Styled = styled.div<PropsStyled>`
    position: relative;
    right: 14px;
    width: calc(100% + 28px);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: url(${loadingIMG.src}) center center no-repeat;
    background-size: 100px;
    height: ${(p) => `calc(${window.innerHeight}px - ${p.$heightHeader}px)`};

    ${MEDIA_QUERIES.min_width.desktopS} {
        right: 50px;
        width: calc(100% + 100px);
    }
    .window-options {
        background: black;
        color: white;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0rem 0.3rem;
        .option {
            cursor: pointer;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0;
            min-width: initial;
            color: ${(p) => p.theme.palette.light.main};
        }

        svg {
            font-size: 1.5rem;
        }
    }
    .frame {
        width: 100%;
        border: 0;
        flex: 1;
    }
`
