/* eslint-disable no-unneeded-ternary */
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import NuevaTienda from 'components/retirar/nueva-tienda/NuevaTienda'
import SeleccionarTienda from 'components/retirar/seleccionar-tienda/SeleccionarTienda'
import { Button } from '@mui/material'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { LAYOUT_TYPES, PROTECTED_LEVEL_TYPES } from 'config/constants'
import { retiroPaymentSelector } from 'states/features/slices/retiroPaymentSlice'
import { Session } from 'services/Session'
import { usePaymentPayoutMutation } from 'states/calimaco/calimacoPaymentApi'
import { LoadingButton } from '@mui/lab'
import { onOpen } from 'states/slice/layout/SnackBar'
import { useTranslation } from 'react-i18next'
import { PATHS } from 'routes/paths/PATHS'
import { useRouter } from 'next/router'
import { ProviderAt } from 'services/ProviderAtService'
import { setUser } from 'states/features/slices/userSlice'
import { GoogleTagManager } from 'google/TagManager'

export const TIENDAS = {
    NUEVA_TIENDA: {
        name: 'Nueva Tienda',
        url: '/cuenta/retirar/nueva-tienda',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    SELECCIONAR_TIENDA: {
        name: 'Seleccionar Tienda',
        url: '/cuenta/retirar/seleccionar-tienda',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },
}

const MetodoSeleccionar = ({ tabsUrls = TIENDAS, defaultActive = 0, errors = '' }) => {
    const router = useRouter()
    const providerAt = new ProviderAt()
    const [tabs, setTabs] = useState(Object.values(tabsUrls))
    const { montoShop } = useSelector(retiroPaymentSelector)
    const user = Session().getUser()
    const [payout, { isLoading: isLoadingPayout, data: dataPayout }] = usePaymentPayoutMutation()

    const ContextPannelsAtSRef = useRef()
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const [active, setActive] = useState()

    useEffect(() => {
        if (montoShop <= 300) {
            return null
        }
        if (montoShop > 300) {
            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'puntos de venta',
                option: 'nueva tienda',
                action: 'click',
            })
            setActive({ ...TIENDAS.NUEVA_TIENDA })
        }
    }, [montoShop])

    const handleClickTab = (el, active) => (e) => {
        if (el?.name === 'Seleccionar Tienda' && active.name !== 'Seleccionar Tienda') {
            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'puntos de venta',
                option: 'seleccionar tienda',
                action: 'click',
            })
        }
        if (el?.name === 'Nueva Tienda' && active.name !== 'Nueva Tienda') {
            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'puntos de venta',
                option: 'nueva tienda',
                action: 'click',
            })
        }
        setActive(el)
    }

    const handleSinTienda = async () => {
        const inputMontoShop = document.getElementById('montoShop').value

        if (!inputMontoShop) {
            document.getElementById('montoShop').focus()
            return
        }

        await payout({
            company: 'ATP',
            session: user.session,
            method: 'ATPAYMENTSERVICE_PAYOUT',
            amount: montoShop * 100,
            payment_account: 0,
        })
    }

    useEffect(() => {
        if (dataPayout?.result?.toUpperCase() === 'error'.toUpperCase()) {
            dispatch(
                onOpen({
                    message: t(dataPayout?.description),
                    severity: 'error',
                    open: true,
                    autoHideDuration: 3000,
                })
            )
        }
        if (dataPayout?.result?.toUpperCase() === 'OK'.toUpperCase()) {
            const inputMontoShop = document.getElementById('montoShop').value

            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'puntos de venta',
                amount: 'S/' + inputMontoShop ?? 0,
                option: 'enviar solicitud',
                action: 'click',
            })

            const fetchData = async () => {
                const resUserDetail = await providerAt.userDetail(user.session)
                const _user = {
                    ...resUserDetail.user,
                    session: user.session,
                }
                Session().setUser(_user)
                dispatch(setUser(Session().getUser()))
            }
            const result = fetchData()

            router.push(PATHS.CUENTA_RETIRO_ESTADO_DE_SOLICITUD.url)
        }
    }, [dataPayout])

    if (montoShop <= 300) {
        const serErrors = errors ? true : false

        return (
            <SinTiendaS>
                <LoadingButton
                    color="primary"
                    disabled={montoShop < 5 || isLoadingPayout || serErrors}
                    loading={isLoadingPayout}
                    onClick={handleSinTienda}
                    type="submit"
                    variant="contained"
                >
                    Enviar solicitud
                </LoadingButton>
            </SinTiendaS>
        )
    }

    if (montoShop > 300 && active) {
        return (
            <div>
                <MetodoDeDepositoS>
                    <div className="wrapper">
                        <StyledS>
                            <ScrollContainerS className="container">
                                <TabsS>
                                    {tabs.map((el) => {
                                        return (
                                            <ButtonTapS
                                                className={classNames({ active: active.url === el.url })}
                                                key={el.url}
                                                onClick={handleClickTab(el, active)}
                                            >
                                                {el.name}
                                            </ButtonTapS>
                                        )
                                    })}
                                </TabsS>
                            </ScrollContainerS>

                            <ContextPannelsAtS ref={ContextPannelsAtSRef}>
                                {active.url === TIENDAS.NUEVA_TIENDA.url ? <NuevaTienda errors={errors} /> : null}
                                {active.url === TIENDAS.SELECCIONAR_TIENDA.url ? <SeleccionarTienda errors={errors} /> : null}
                            </ContextPannelsAtS>
                        </StyledS>
                    </div>
                </MetodoDeDepositoS>
            </div>
        )
    }

    return <></>
}

export default MetodoSeleccionar

const SinTiendaS = styled.div`
    & {
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        > button {
            padding: 0.9rem;
            font-size: 1rem;
            text-transform: initial;
            min-width: 200px;
        }
    }
`
const MetodoDeDepositoS = styled.div`
    background: ${(p) => p.theme.palette.alternate12.main};
    min-height: 100%;
    // padding: 1rem 40px;
    ${MEDIA_QUERIES.min_width.tabletS} {
        // padding: 1rem 50px;
    }
    & {
        > .wrapper {
            //  max-width: 400px;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
`
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
    }
`
const TabsS = styled.div`
    & {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        text-transform: uppercase;
        padding: 1rem;
    }
`
const ButtonTapS = styled(Button)`
    && {
        flex: 1;
        padding: 0.7rem 1.2rem;
        min-width: initial;
        width: initial;
        text-transform: lowercase;
        display: block;
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
    }
`
const ContextPannelsAtS = styled.div`
    flex: 1;
    display: flex;
    > div {
        flex: 1;
    }
`
