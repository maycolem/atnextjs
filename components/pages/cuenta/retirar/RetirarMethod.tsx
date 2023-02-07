import styled from 'styled-components'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { set } from 'states/slice/layout/PannelBackArrowURL'
import { Session } from 'services/Session'
import { onClose, onOpen } from 'states/slice/layout/SnackBar'
import { set as setVerify } from 'states/slice/layout/VerifyMessage'
import { delay } from '@helpers/delay'
import { useGetPayoutLobbyQuery } from '@states/calimaco/calimacoContentApi'
import { Retiro } from '@interfaces/retiro'
import { Method } from './Methods'
import { useAppSelector } from '@states/store'
import { userSelector, userSessionSelector } from '@states/features/slices/userSlice'
import { useCheckIsVerified } from '@hooks/useCheckIsVerified'

export const RetirarMethod = () => {
    useCheckIsVerified({
        message: `
    Hola, aún no verificaste tu cuenta.
    $$Únicamente las cuentas verificadas pueden retirar sus ganancias.
    $$Puedes iniciar tu verificación en la página que cargará a continuación.`,
        redirectPathname: PATHS.CUENTA_VERIFICAR.url,
    })
    const user = useAppSelector(userSelector)
    const session = useAppSelector(userSessionSelector)
    const { data: dataPayoutLobby } = useGetPayoutLobbyQuery(user?.session, { skip: !session })
    const dispatch = useDispatch()
    const router = useRouter()
    const [method, setMethod] = useState<Retiro>()

    useEffect(() => {
        if (dataPayoutLobby?.methods && router?.query?.methodName) {
            const methods = dataPayoutLobby.methods
            const methodName = router.query.methodName
            const method = methods.find((item) => item.method === methodName)
            setMethod(method)
        }
    }, [dataPayoutLobby, router])

    useEffect(() => {
        dispatch(set(PATHS.CUENTA_RETIRO.url))
    }, [])

    return (
        <Styled>
            <StyledWrapper>{method ? <Method method={method} /> : null}</StyledWrapper>
        </Styled>
    )
}

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 1rem;
`

const StyledWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    > div {
        flex: 1;
    }
`
