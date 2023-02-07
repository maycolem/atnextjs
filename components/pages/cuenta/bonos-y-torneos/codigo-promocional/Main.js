import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { set } from 'states/slice/layout/PannelBackArrowURL'
import { PATHS } from 'routes/paths/PATHS'
import ScrollMenuPage from 'components/shared/scroll-menu-page/ScrollMenuPage'
import SearchCodePromotion from './SearchCodePromotion'

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

const Main = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(set(''))
    }, [])

    const Content = () => (
        <>
            <Styled>
                <ScrollMenuPage
                    active={_CUENTA_BONOS_Y_PROMOCIONES.CUENTA_BONOS_Y_TORNEOS_CODIGO_PROMOCIONAL.url}
                    tabs={Object.values(_CUENTA_BONOS_Y_PROMOCIONES)}
                />

                <StyledWrapper>
                    <SearchCodePromotion />
                </StyledWrapper>
            </Styled>
        </>
    )

    return <Content />
}

export default Main

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: inherit;
    overflow: hidden;
`
const StyledWrapper = styled.div`
    & {
        /* background: ${(p) => p.theme.palette.alternate12.main}; */
        flex: 1;
        padding: 1rem;
    }
`
