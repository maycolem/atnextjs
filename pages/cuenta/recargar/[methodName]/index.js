import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { PATHS } from 'routes/paths/PATHS'
import styled from 'styled-components'
import astroIMGTemp from 'public/assets/mi-billetera/recarga/temp/astropay.png'
import niubizIMGTemp from 'public/assets/mi-billetera/recarga/temp/niubiz.png'
import kushkiIMGTemp from 'public/assets/mi-billetera/recarga/temp/kushki.png'
import pagoeIMGTemp from 'public/assets/mi-billetera/recarga/temp/PAGOEFECTIVO_MOVIL_AGENTES_BODEGAS.svg'
import qrIMGTemp from 'public/assets/mi-billetera/recarga/temp/QRVIAPE.svg'
import safetIMGTemp from 'public/assets/mi-billetera/recarga/temp/safety.png'
import teleIMGTemp from 'public/assets/mi-billetera/recarga/temp/teleservicios.png'
import prometeoIMG from 'public/assets/mi-billetera/recarga/temp/100x69px_Logo-recarga-Prometeo-f.png'
import monnetIMG from 'public/assets/mi-billetera/recarga/temp/100x69px_LOGO-RECARGA-MONNET-f.png'
import { userSelector } from 'states/features/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useGetPaymentMethodsQuery } from 'states/api/calimaco/payment'
import { setMethod, ModalRecargaMethodSelector, setFrame } from 'states/slice/ModalRecarga'
import Skeleton from '@mui/material/Skeleton'
import { set } from 'states/slice/layout/PannelBackArrowURL'
import MetodoDeDeposito from 'components/recargar/steps/metodos-de-deposito/MetodoDeDeposito'
import TeleServicios from 'components/recargar/TeleServicios'
import Head from 'next/head'
import { Meta } from '@components/Meta'

const listMethodsIMG = {
    ASTROPAY: astroIMGTemp.src,
    ATPAYMENTSERVICE: teleIMGTemp.src,
    KUSHKI: kushkiIMGTemp.src,
    NIUBIZ: niubizIMGTemp.src,
    PAGOEFECTIVO: pagoeIMGTemp.src,
    PAGOEFECTIVOQR: qrIMGTemp.src,
    SAFETYPAY: safetIMGTemp.src,
    PROMETEO: prometeoIMG.src,
    MONNET: monnetIMG.src,
}
const MetodoDePago = () => {
    const router = useRouter()
    const [methodName, setMethodName] = useState(null)
    const user = useSelector(userSelector)
    const [skip, setSkip] = useState(true)
    const dispatch = useDispatch()
    const { name, method, img } = useSelector(ModalRecargaMethodSelector)
    const { data, isLoading: loadingMethods } = useGetPaymentMethodsQuery({
        company: user?.company,
        session: user?.session,
    })
    useEffect(() => {
        dispatch(set(PATHS.CUENTA_RECARGA.url))
    }, [])

    useEffect(() => {
        if (router?.query?.methodName) {
            if (data) {
                const nameMethod = router?.query.methodName
                const img = listMethodsIMG[nameMethod]
                let findMethod = null
                if (data?.methods) {
                    findMethod = data.methods.find((m) => m.method.toLowerCase() === nameMethod.toLowerCase())
                }
                const methodOBJ = {
                    ...findMethod,
                    img,
                }

                dispatch(
                    setMethod({
                        limits: methodOBJ?.limits ?? null,
                        name: methodOBJ.name,
                        method: methodOBJ.method,
                        img: methodOBJ.img,
                    })
                )
            }
        }
    }, [router, data])

    if (loadingMethods) {
        return (
            <StyledS>
                <Skeleton height={100} variant="text" />
                <Skeleton height={300} variant="rectangular" />
            </StyledS>
        )
    }

    return (
        <>
            <Meta title={`Recargar | ${method}`} />

            <StyledS>
                <ContextPannelsAtS>
                    {method === 'ATPAYMENTSERVICE' ? <TeleServicios></TeleServicios> : <MetodoDeDeposito></MetodoDeDeposito>}
                </ContextPannelsAtS>
            </StyledS>
        </>
    )
}

export default MetodoDePago
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
