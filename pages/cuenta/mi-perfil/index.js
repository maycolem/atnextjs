import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import classNames from 'classnames'
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { CUENTA_MY_PROFILE } from 'routes/paths/cuenta/MI_PERFIL'
import { useDispatch } from 'react-redux'
import { reset } from 'states/slice/ModalRecarga'
import { set } from 'states/slice/layout/PannelBackArrowURL'
import DatosPerfil from 'components/miPerfil/steps/datos-perfil/DatosPerfil'
import Box from '@mui/material/Box'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import ScrollMenuPage from 'components/shared/scroll-menu-page/ScrollMenuPage'
import Head from 'next/head'
import LayoutUserPanel from '@layout/LayoutUserProfile/Layout'

export const _CUENTA_MY_PROFILE = {
    CUENTA_MY_PROFILE: {
        name: CUENTA_MY_PROFILE.CUENTA_MY_PROFILE.name,
        url: CUENTA_MY_PROFILE.CUENTA_MY_PROFILE.url,
    },

    CUENTA_MY_PROFILE_CAMBIAR_CONTRASEÑA: {
        name: CUENTA_MY_PROFILE.CUENTA_MY_PROFILE_CAMBIAR_CONTRASEÑA.name,
        url: CUENTA_MY_PROFILE.CUENTA_MY_PROFILE_CAMBIAR_CONTRASEÑA.url,
    },
    CUENTA_MY_PROFILE_NOTIFICACIONES: {
        name: CUENTA_MY_PROFILE.CUENTA_MY_PROFILE_NOTIFICACIONES.name,
        url: CUENTA_MY_PROFILE.CUENTA_MY_PROFILE_NOTIFICACIONES.url,
    },
    CUENTA_MY_PROFILE_AUTOEXCLUSION: {
        name: CUENTA_MY_PROFILE.CUENTA_MY_PROFILE_AUTOEXCLUSION.name,
        url: CUENTA_MY_PROFILE.CUENTA_MY_PROFILE_AUTOEXCLUSION.url,
    },
}

const MyProfile = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(set(''))
    }, [])

    const handleClickTab = (url) => (e) => {
        router.push(url)
    }
    return (
        <>
            <Head>
                <title>Perfil | Apuesta Total</title>
            </Head>

            <StyledS>
                <ScrollMenuPage active={_CUENTA_MY_PROFILE.CUENTA_MY_PROFILE.url} tabs={Object.values(_CUENTA_MY_PROFILE)} />
                <ContextPannelsAtS>
                    <DatosPerfil></DatosPerfil>
                </ContextPannelsAtS>
            </StyledS>
        </>
    )
}

export default MyProfile

const StyledS = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: inherit;
    overflow: hidden;
`

const ContextPannelsAtS = styled.div`
    flex: 1;
    display: flex;
    > div {
        flex: 1;
    }
`
