import React, { useEffect } from 'react'

import styled from 'styled-components'
import { ModalRecargaFrameSelector, reset, setFrame } from 'states/slice/ModalRecarga'
import { useSelector, useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import { set } from 'states/slice/layout/PannelBackArrowURL'
import MetodoFrame from 'components/recargar/steps/metodos-de-deposito/MetodoFrame'
import { delay } from '@helpers/delay'
import Head from 'next/head'
import { Meta } from '@components/Meta'

const confirmar = () => {
    const router = useRouter()
    const frame = useSelector(ModalRecargaFrameSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        const indice = router.asPath.indexOf('/confirmar')
        const extraida = router.asPath.substring(0, indice)
        dispatch(set(extraida))
    }, [router])

    useEffect(() => {
        setEventWindow(window, dispatch)
        return () => {
            dispatch(setFrame(''))
        }
    }, [])
    function setEventWindow(window, dispatch) {
        if (typeof window !== 'undefined') {
            window.backAllDeposits = function () {
                router.push(PATHS.CUENTA_RECARGA.url)
                dispatch(set(''))
            }
        }
    }

    if (!frame) {
        router.push(PATHS.CUENTA_RECARGA.url)
    }
    const loadPrometeoWidgetApi = async () => {
        let Prometeo = window?.Prometeo || null
        if (Prometeo) {
            var widget = Prometeo.init('widget-id')
            widget.on(Prometeo.Messaging.CLOSE, () => {
                router.push(router?.backReferrer || PATHS.HOME.url)
                try {
                    delete window.Prometeo
                } catch (e) {
                    window['Prometeo'] = undefined
                }
            })
            return
        }
        await delay(500)
        await loadPrometeoWidgetApi()
    }
    useEffect(() => {
        loadPrometeoWidgetApi()
    }, [])

    return (
        <>
            <Meta title={`Recargar`}>
                <script src="https://cdn.prometeoapi.com/widget/1.0.0/static/js/init.js"></script>
            </Meta>
            <MetodoFrameWrappeS>
                <MetodoFrame></MetodoFrame>
            </MetodoFrameWrappeS>
        </>
    )
}

export default confirmar
const MetodoFrameWrappeS = styled.div`
    && {
        flex: 1 0 70vh;
        min-height: 600px;
    }
`
