import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ModalRecargaFrameSelector } from 'states/slice/ModalRecarga'
import Head from 'next/head'
import { close, reset } from 'states/slice/ModalRecarga'
import { delay } from '@helpers/delay'

interface customWindow extends Window {
    Prometeo?: any
}
declare const window: customWindow

interface Props {
    resetNavigation: () => void
}

export const MetodoFrame = ({ resetNavigation }: Props) => {
    const frame = useSelector(ModalRecargaFrameSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        setEventWindow(window, resetNavigation)
    }, [])

    function setEventWindow(window, callBack) {
        if (typeof window !== 'undefined') {
            window.backAllDeposits = function () {
                callBack()
            }
        }
    }
    const loadPrometeoWidgetApi = async () => {
        let Prometeo = window?.Prometeo || null
        if (Prometeo) {
            var widget = Prometeo.init('widget-id')
            widget.on(Prometeo.Messaging.CLOSE, () => {
                dispatch(close())
                dispatch(reset())
                resetNavigation()
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
            <Head>
                <script src="https://cdn.prometeoapi.com/widget/1.0.0/static/js/init.js"></script>
            </Head>
            <>
                <StyledFrame id="frame" src={frame}></StyledFrame>
            </>
        </>
    )
}

const StyledFrame = styled.iframe`
    background: ${(p) => p.theme.palette.alternate12.main};
    height: 100%;
    min-width: 100%;
    border: 0;
    outline: 0;
    display: block;
    height: 100%;
    min-height: 600px;
    position: relative;
`
