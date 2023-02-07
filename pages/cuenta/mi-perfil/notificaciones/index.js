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
import Notificaciones from 'components/miPerfil/steps/notificaciones/Notificaciones'
import Box from '@mui/material/Box'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import ScrollMenuPage from 'components/shared/scroll-menu-page/ScrollMenuPage'
import Head from 'next/head'

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
          <title>Notificaciones  | Apuesta Total</title>
      </Head>

      <StyledS>
          <ScrollMenuPage
            active={_CUENTA_MY_PROFILE.CUENTA_MY_PROFILE_NOTIFICACIONES.url}
            tabs={Object.values(_CUENTA_MY_PROFILE)}
          />
          <ContextPannelsAtS>
            <Notificaciones></Notificaciones>
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

const ScrollContainerS = styled(ScrollContainer)`
  & {
    background: ${(p) => p.theme.palette.alternate12.main};
    min-width: 100%;
    min-height: max-content;
    border-top: 1px solid ${(p) => p.theme.palette.alternate8.main};
    border-bottom: 1px solid ${(p) => p.theme.palette.alternate8.main};
    ${MEDIA_QUERIES.min_width.desktopS} {
      /* kdsjkfndfkj */
      border-top: none;
      background: none;
    }
  }
`

const TabsS = styled.div`
  & {
    display: flex;
    gap: 1rem;
    justify-content: center;
    text-transform: uppercase;
    padding: 1rem;
    ${MEDIA_QUERIES.min_width.desktopS} {
      /* kdsjkfndfkj */
      padding: 0;
    }
  }
`
const ButtonTapS = styled(Button)`
  && {
    /* flex: 0 0 200px; */
    padding: 0.7rem 1.2rem;
    /* min-width: initial; */
    /* width: initial; */
    text-transform: lowercase;
    display: block;
    max-width: max-content;
    min-width: 200px;
    white-space: nowrap;
    border: 1px solid transparent;
    font-size: 1rem;
    color: ${(p) => p.theme.palette.alternate13.main};
    :hover {
      color: ${(p) => p.theme.palette.dark2.dark};
      background: ${(p) => p.theme.palette.light.main};
      border: 1px solid transparent;
    }
    &::first-letter {
      text-transform: uppercase;
    }
    &.active {
      color: ${(p) => p.theme.palette.dark2.dark};
      background: ${(p) => p.theme.palette.light.main};
      border: 1px solid ${(p) => p.theme.palette.alternate8.main};
    }
    ${MEDIA_QUERIES.min_width.desktopS} {
      /* kdsjkfndfkj */
      border: none;
      border-radius: 0;
      border-bottom: 3px solid transparent;
      &.active {
        border: none;
        border-bottom: 3px solid ${(p) => p.theme.palette.dark.main};
      }
      :hover:not(.active) {
        border: none;

        border-bottom: 3px solid ${(p) => p.theme.palette.alternate8.main};
      }
    }
  }
`
const ContextPannelsAtS = styled.div`
  flex: 1;
  display: flex;
  > div {
    flex: 1;
  }
`
