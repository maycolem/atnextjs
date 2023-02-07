import React from 'react'
import styled from 'styled-components'
import ScrollMenuPage from '@components/shared/scroll-menu-page/ScrollMenuPage'
import { HistorialDeDeposito } from '@components/recargar/steps/historial-de-deposito'
import { Meta } from '@components/Meta'
export const CUENTA_RECARGA = {
    CUENTA_RECARGA: {
        name: 'Recargar',
        url: '/cuenta/recargar',
    },

    CUENTA_RECARGA_HISTORIAL_DE_DEPOSITO: {
        name: 'Historial de depósito',
        url: '/cuenta/recargar/historial-de-deposito',
    },
}

const Index = () => {
    return (
        <>
            <Meta title="Historial Deposito" />

            <StyledS>
                <ScrollMenuPage active={CUENTA_RECARGA.CUENTA_RECARGA_HISTORIAL_DE_DEPOSITO.url} tabs={Object.values(CUENTA_RECARGA)} />
                <HistorialDeDeposito />
            </StyledS>
        </>
    )
}

export default Index
const StyledS = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: inherit;
    overflow: hidden;
`
