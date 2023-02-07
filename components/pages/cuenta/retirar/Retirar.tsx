import React from 'react'
import styled from 'styled-components'
import { PATHS } from 'routes/paths/PATHS'
import dynamic from 'next/dynamic'
import { Meta } from '@components/Meta'
import { CUENTA_RETIROS } from './sharedMenuTabs'
import { useGetFragmentQuery } from '@states/calimaco/calimacoContentApi'
import FragmentCustomAT from '@components/shared/fragment-custom-at/FragmentCustomAT'
import { useAppSelector } from '@states/store'
import { userSelector } from '@states/features/slices/userSlice'
import { AltertNotVerified, Balance } from './index'
import { useCheckIsVerified } from '@hooks/useCheckIsVerified'

// const ScrollMenuPage = dynamic(() => import('@components/shared/scroll-menu-page/ScrollMenuPage'), { loading: () => <div>cargando...</div> })
const ScrollMenuPage = dynamic(() => import('@components/shared/scroll-menu-page/ScrollMenuPage'))
const PayoutsCards = dynamic(() => import('./Payouts').then(({ Payouts }) => Payouts))

export const Retirar = () => {
    useCheckIsVerified({
        message: `
        Hola, aún no verificaste tu cuenta.
        $$Únicamente las cuentas verificadas pueden retirar sus ganancias.
        $$Puedes iniciar tu verificación en la página que cargará a continuación.`,
        redirectPathname: PATHS.CUENTA_VERIFICAR.url,
    })
    const user = useAppSelector(userSelector)

    const { data: dataFragment } = useGetFragmentQuery({ fragment: 'RETIROS_LOBBY_TEXTO' }, { skip: !user?.verified })

    return (
        <>
            <Meta title="Retirar" />
            <Styled>
                <ScrollMenuPage active={CUENTA_RETIROS[0].url} tabs={CUENTA_RETIROS} />
                {user?.verified === 0 ? (
                    <AltertNotVerified />
                ) : (
                    <StyledWrapper>
                        <div>
                            <Balance />
                            <StyledWrapperFragment>
                                <FragmentCustomAT fragment={dataFragment ?? ''} />
                            </StyledWrapperFragment>
                            <PayoutsCards />
                        </div>
                    </StyledWrapper>
                )}
            </Styled>
        </>
    )
}

const StyledWrapperFragment = styled.div`
    padding: 1rem;
    max-width: 800px;
    margin: auto;
`
const Styled = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: inherit;
    overflow: hidden;
`

const StyledWrapper = styled.div`
    flex: 1;
    display: flex;
    > div {
        flex: 1;
    }
`
