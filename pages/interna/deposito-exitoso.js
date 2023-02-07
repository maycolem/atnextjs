/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Button, css } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import CreditScoreIcon from '@mui/icons-material/CreditScore'
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff'
import { format } from 'date-fns'
import { Session } from 'services/Session'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import { delay } from '@helpers/delay'
const DepositoExitoso = () => {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [method, setMethod] = useState('')
    const user = Session().getUser()
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const handleOnclick = () => {
        if (typeof window !== 'undefined') {
            window?.parent?.backAllDeposits()
            window?.backAllDeposits()
        }
    }
    const handleGetOperationByHash = async (router) => {
        if (router?.query?.db && router?.query?.hash) {
            await delay(2000)
            const hash = router?.query?.hash
            const db = router?.query?.db
            const url = `${process.env.REACT_APP_CALIMACO_API_BASE}/payment/getOperationByHash?operationHash=${hash}&db=${db}`
            axios
                .get(url)
                .then((res) => {
                    const status = res.data.operation.status
                    const method = res.data.operation.method
                    setMethod(method)
                    if (['NIUBIZ'].includes(method)) {
                        setData(res.data.operation)
                        switch (status) {
                            case 'DENIED':
                                setMessage(`Algo pasó, no pudimos procesar tu deposito.`)
                                setStatus('DENIED')
                                break
                            case 'SUCCESS':
                                setMessage(`¡Tu depósito fue realizado con éxito!`)
                                setStatus('SUCCESS')
                                break
                            case 'NEW':
                                setMessage(
                                    `Estamos procesando su depósito realizado en ${method}. confirma en tu historial de recarga en breves`
                                )
                                setStatus('NEW')
                                break
                            default:
                                setMessage(`Ups! Ocurrio algo`)
                                break
                        }
                    }
                    if (['ASTROPAY', 'KUSHKI'].includes(method)) {
                        switch (status) {
                            case 'DENIED':
                                setMessage(`Algo pasó, no pudimos procesar tu deposito.`)
                                setStatus('DENIED')
                                break
                            case 'SUCCESS':
                                setMessage(`¡Tu depósito fue realizado con éxito!`)
                                setStatus('SUCCESS')
                                if (method === 'KUSHKI') {
                                    const amount = res?.data?.operation?.amount / 100
                                    if (amount >= 20) {
                                        delay(1000).then(() => {
                                            if (typeof window !== 'undefined') {
                                                window?.parent?.handleGetUserPromotion('recarga-con-kushki-y-gana')
                                                window?.handleGetUserPromotion('recarga-con-kushki-y-gana')
                                            }
                                        })
                                    }
                                }
                                break
                            case 'NEW':
                                setMessage(
                                    `Estamos procesando su depósito realizado en ${method}. confirma en tu historial de recarga en breves`
                                )
                                setStatus('NEW')
                                if (method === 'KUSHKI') {
                                    const amount = res?.data?.operation?.amount / 100
                                    if (amount >= 20) {
                                        delay(1500).then(() => {
                                            if (typeof window !== 'undefined') {
                                                window?.parent?.handleGetUserPromotion('recarga-con-kushki-y-gana')
                                                window?.handleGetUserPromotion('recarga-con-kushki-y-gana')
                                            }
                                        })
                                    }
                                }
                                break
                            default:
                                setMessage(`Ups! Ocurrio algo`)
                                break
                        }
                    }
                    if (['SAFETYPAY'].includes(method)) {
                        switch (status) {
                            case 'DENIED':
                                setMessage(`Algo pasó, no pudimos procesar tu deposito.`)
                                setStatus('DENIED')

                                break
                            case 'SUCCESS':
                                setMessage(`¡Tu depósito fue realizado con éxito!`)
                                setStatus('SUCCESS')

                                break
                            case 'NEW':
                                setMessage(
                                    `Estamos procesando su depósito realizado en ${method}. confirma en tu historial de recarga en breves`
                                )
                                setStatus('NEW')

                                break
                            default:
                                setMessage(`Ups! Ocurrio algo`)
                                break
                        }
                    }
                    setIsLoading(false)
                })
                .catch((e) => {
                    setMessage(`Ups! Ocurrio algo`)
                    setIsLoading(false)
                })
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (router?.query) {
            handleGetOperationByHash(router)
        }
    }, [router])

    function customFormatDate(date = 'Mon Jul 18 2022 16:57:39 GMT-0500') {
        let res
        try {
            res = format(new Date(date), "dd-MM-yyyy hh:mm aaaaa'm'")
        } catch (error) {
            res = ''
        }
        return res
    }

    const hadleDate = (dateCreated) => {
        const rest = new Date(dateCreated)
        rest.setHours(rest.getHours() - 5)
        return rest
    }

    customFormatDate()
    if (isLoading) {
        return (
            <StyledS>
                <LoadingDefault loading={isLoading}></LoadingDefault>
            </StyledS>
        )
    }
    return (
        <StyledS>
            {method === 'NIUBIZ' ? (
                <>
                    <MessageS $status={status}>
                        {status === 'DENIED' ? <CreditCardOffIcon></CreditCardOffIcon> : <CreditScoreIcon></CreditScoreIcon>}
                    </MessageS>
                    {status === 'DENIED' && (
                        <CardNiubizS>
                            <h2>Transacción denegada</h2>
                            <div className="top">Número de pedido</div>
                            <div className="bottom">{data?.idempotence}</div>
                            <div className="top">Fecha y hora del pedido</div>
                            <div className="bottom">{hadleDate(data?.operation_date) && customFormatDate(data?.operation_date)}</div>
                            <div className="top">Descripción de la denegación</div>
                            <div className="bottom">{data?.extra}</div>
                            <ButtonS className="niubiz" onClick={handleOnclick} variant="outlined">
                                {'<'} Vuelve a intentarlo aquí
                            </ButtonS>
                        </CardNiubizS>
                    )}
                    {status === 'SUCCESS' && (
                        <CardNiubizS>
                            <h2>Transacción autorizada</h2>
                            <div className="top">Número de pedido</div>
                            <div className="bottom">{data?.idempotence}</div>
                            <div className="top">Nombre y apellido del tarjeta habiente</div>
                            <div className="bottom">
                                {/* {data?.user} */}
                                {user?.firstName} {user?.lastName}
                            </div>
                            <div className="top">Numero de tarjeta enmascarada</div>
                            <div className="bottom">{r?.query?.card ?? ''}</div>
                            <div className="top">Fecha y hora del pedido</div>
                            <div className="bottom">{hadleDate(data?.operation_date) && customFormatDate(data?.operation_date)}</div>
                            <div className="top">Importe de la transacción</div>
                            <div className="bottom">
                                {new Intl.NumberFormat('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                    maximumFractionDigits: 2,
                                }).format(~~data?.amount / 100)}
                            </div>
                            <div className="top">Tipo de moneda</div>
                            <div className="bottom">{data?.currency}</div>
                            <div className="top">Descripción de el/los {'producto(s)'}</div>
                            <div className="bottom">Pago Web</div>
                            {/* <div className="top">Terminos y condiciones</div>
              <Link href={PATHS.POLITICAS_DE_PRIVACIDAD.url}>
                <a className="bottom link">Terminos y condiciones apuesta total &#8599;</a>
              </Link> */}
                            <div className="top"></div>
                            <div className="bottom guardar">Guarde la informacion de este formulario</div>
                        </CardNiubizS>
                    )}
                    {status === 'NEW' && <div className="">{message}</div>}
                </>
            ) : (
                <>
                    <MessageS $status={status}>
                        {status === 'DENIED' ? <CreditCardOffIcon></CreditCardOffIcon> : <CreditScoreIcon></CreditScoreIcon>}
                        <p>{message}</p>
                    </MessageS>
                    {status === 'DENIED' && (
                        <ButtonS onClick={handleOnclick} variant="outlined">
                            {'<'} Vuelve a intentarlo aquí
                        </ButtonS>
                    )}
                </>
            )}
        </StyledS>
    )
}

export default DepositoExitoso
const CardNiubizS = styled.div`
    & {
        > h2 {
            font-size: 1.5rem;
            font-weight: 500;
            padding-bottom: 1rem;
        }

        > .top {
            font-size: 0.9rem;
            color: ${(p) => p.theme.palette.alternate11.main};
            padding-bottom: 2px;
        }
        > .bottom {
            font-size: 1rem;
            color: black;
            padding-bottom: 12px;
            &.link {
                cursor: pointer;
                color: ${(p) => p.theme.palette.info3.main};
                text-decoration: underline;
            }
            &.guardar {
                margin-top: 2rem;
                color: ${(p) => p.theme.palette.dark.main};
            }
        }
        > .niubiz {
            margin-top: 2rem;
        }
    }
`
const ButtonS = styled(Button)`
    & {
        padding: 0.8rem 2rem;
    }
`
const MessageS = styled.div`
    & {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        width: 60%;
        max-width: 140px;
        > p {
            line-height: 1.5;
            font-size: 1rem;
            text-align: center;
        }
        > svg {
            font-size: 3rem;
            color: ${(p) => p.theme.palette.success2.main};
            ${(p) => {
                if (p.$status.includes('DENIED'))
                    return css`
                        & {
                            color: ${p.theme.palette.primary.main};
                        }
                    `
            }}
        }
    }
`
const StyledS = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
`
