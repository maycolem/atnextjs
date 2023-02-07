import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { set } from 'states/slice/layout/PannelBackArrowURL'
import { PATHS } from 'routes/paths/PATHS'
import MisBonos from 'components/cuenta/bonos-y-torneos/bonos/MisBonos'
import ScrollMenuPage from 'components/shared/scroll-menu-page/ScrollMenuPage'
import Head from 'next/head'

export const _CUENTA_BONOS_Y_PROMOCIONES = {
  CUENTA_BONOS_Y_TORNEOS_BONOS: {
    name: PATHS.CUENTA_BONOS_Y_TORNEOS_BONOS.name,
    url: PATHS.CUENTA_BONOS_Y_TORNEOS_BONOS.url,
  },

  CUENTA_BONOS_Y_TORNEOS_TORNEOS: {
    name: PATHS.CUENTA_BONOS_Y_TORNEOS_TORNEOS.name,
    url: PATHS.CUENTA_BONOS_Y_TORNEOS_TORNEOS.url,
  },
  CUENTA_BONOS_Y_TORNEOS_CODIGO_PROMOCIONAL: {
    name: PATHS.CUENTA_BONOS_Y_TORNEOS_CODIGO_PROMOCIONAL.name,
    url: PATHS.CUENTA_BONOS_Y_TORNEOS_CODIGO_PROMOCIONAL.url,
  },
}
const Bonos = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(set(''))
  }, [])

  return (
    <>
      <Head>
        <title>Cuenta Bonos | Apuesta Total</title>
      </Head>

      <StyledS>
        <ScrollMenuPage
          active={_CUENTA_BONOS_Y_PROMOCIONES.CUENTA_BONOS_Y_TORNEOS_BONOS.url}
          tabs={Object.values(_CUENTA_BONOS_Y_PROMOCIONES)}
        />
        <ContextPannelsAtS>
          <MisBonos></MisBonos>
        </ContextPannelsAtS>
      </StyledS>
    </>
  )
}

export default Bonos

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
