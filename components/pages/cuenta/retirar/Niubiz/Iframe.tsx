import { GoogleTagManager } from '@google/TagManager'
import { delay } from '@helpers/delay'
import { userSessionSelector } from '@states/features/slices/userSlice'
import { useAppSelector } from '@states/store'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { User as IUser } from '@interfaces/user'
import { userSelector } from 'states/features/slices/userSlice'
import { currency } from '@helpers/currency'
interface Props {
    method: string
    limits: any
}

export const Iframe = ({ method, limits }: Props) => {
    const user: IUser = useAppSelector(userSelector)
    const [htmlTokenization, setHtmlTokenization] = useState()
    const session = useAppSelector(userSessionSelector)
    useEffect(() => {
        const body = new URLSearchParams({
            company: process.env.REACT_APP_COMPANY,
            session: session,
            method: method,
        })
        axios
            .post(`${process.env.REACT_APP_CALIMACO_API_BASE}/providers/niubiz/showTokenizationForm`, body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((res) => {
                setHtmlTokenization(res.data)
            })
    }, [session])

    const handleEvent = (e, w) => {
        const input = w.document.getElementById('montoTransferencia') as HTMLInputElement
        const button = w.document.getElementById('requestPayoutBtn') as HTMLButtonElement
        const buttonEvent = e.target as HTMLButtonElement
        const limitsMin = Number(limits.min.slice(0, -2))
        const limitsMax = Number(limits.max.slice(0, -2))
        const userSaldoRetirable = Number(currency(user?.saldoRetirable).replace(/[S\/\s,]/g, ''))

        if (buttonEvent?.id === button?.id) {
            if (Number(input?.value) >= limitsMin && Number(input?.value) <= limitsMax && Number(input?.value) <= userSaldoRetirable) {
                GoogleTagManager.push({
                    event: 'atm.event',
                    eventName: 'retiro_metodos_de_retiro',
                    payout_option: method?.toLocaleLowerCase().replaceAll('_', ' '),
                    amount: `S/ ${input?.value}`,
                    option: 'enviar solicitud',
                    action: 'click',
                })
            } else {
                GoogleTagManager.push({
                    event: 'atm.event',
                    eventName: 'retiro_metodos_de_retiro',
                    payout_option: method?.toLocaleLowerCase().replaceAll('_', ' '),
                    amount: `S /${input?.value}`,
                    option: 'enviar solicitud - error',
                    action: 'click',
                })
            }
        }
    }

    const setListennerIframe = async () => {
        await delay(1000)
        const iframe = document.getElementById('frame-niubiz') as HTMLIFrameElement
        iframe.contentWindow.addEventListener('click', (e) => handleEvent(e, iframe.contentWindow))
    }

    useEffect(() => {
        if (htmlTokenization) {
            setListennerIframe()
        }
        return () => {
            const iframe = document.getElementById('frame-niubiz') as HTMLIFrameElement
            iframe?.contentWindow?.removeEventListener('click', (e) => handleEvent(e, iframe?.contentWindow))
        }
    }, [htmlTokenization])

    return <StyledIframe id="frame-niubiz" srcDoc={htmlTokenization} />
}
const StyledIframe = styled.iframe`
    border: 0;
    width: 100%;
    min-height: 500px;
    flex: 1;
`
