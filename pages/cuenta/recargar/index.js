import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'

import { useRouter } from 'next/router'
import { CUENTA_RECARGA } from 'routes/paths/cuenta/RECARGA'
import { useDispatch } from 'react-redux'
import { set } from 'states/slice/layout/PannelBackArrowURL'
import MetodosDeDepositos from 'components/recargar/steps/metodos-de-deposito/MetodosDeDepositos'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import ScrollMenuPage from 'components/shared/scroll-menu-page/ScrollMenuPage'
import { Meta } from '@components/Meta'

export const _CUENTA_RECARGA = {
    CUENTA_RECARGA: {
        name: CUENTA_RECARGA.CUENTA_RECARGA.name,
        url: CUENTA_RECARGA.CUENTA_RECARGA.url,
    },

    CUENTA_RECARGA_HISTORIAL_DE_DEPOSITO: {
        name: CUENTA_RECARGA.CUENTA_RECARGA_HISTORIAL_DE_DEPOSITO.name,
        url: CUENTA_RECARGA.CUENTA_RECARGA_HISTORIAL_DE_DEPOSITO.url,
    },
}

const Recargar = () => {
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
            <Meta title="Recargar" />

            <StyledS>
                <ScrollMenuPage active={_CUENTA_RECARGA.CUENTA_RECARGA.url} tabs={Object.values(_CUENTA_RECARGA)} />
                <ContextPannelsAtS>
                    <MetodosDeDepositos></MetodosDeDepositos>
                </ContextPannelsAtS>
            </StyledS>
        </>
    )
}

export default Recargar

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
