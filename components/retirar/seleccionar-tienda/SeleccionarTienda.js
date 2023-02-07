/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-undef */
/* eslint-disable no-useless-return */
import { Button, FormControl, FormLabel, Modal, TextField, InputLabel, MenuItem, Select } from '@mui/material'
import styled from '@emotion/styled'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useGetUserPaymentAccountShopQuery, useAddUserPaymentAccountMutation } from 'states/calimaco/calimacoDataApi'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, setUser } from 'states/features/slices/userSlice'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { usePaymentPayoutMutation } from 'states/calimaco/calimacoPaymentApi'
import { retiroPaymentSelector, setMontoShop } from 'states/features/slices/retiroPaymentSlice'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { Session } from 'services/Session'
import { ProviderAt } from 'services/ProviderAtService'
import { LoadingButton } from '@mui/lab'
import { onOpen } from 'states/slice/layout/SnackBar'
import { PATHS } from 'routes/paths/PATHS'
import { useRouter } from 'next/router'
import { GoogleTagManager } from 'google/TagManager'

const SeleccionarTienda = ({ onBack, onNext, className, errors }) => {
    const [payment, { isLoading: isPayment }] = useAddUserPaymentAccountMutation()
    const { t } = useTranslation()
    const user = useSelector(userSelector)
    const { data: account, refetch } = useGetUserPaymentAccountShopQuery({ session: user?.session })
    const { register, handleSubmit, reset, setValue, formState, getValues, trigger } = useForm({
        defaultValues: {
            shopName: '',
        },
    })
    const { montoShop } = useSelector(retiroPaymentSelector)
    const [payout, { isLoading: isLoadingPayout }] = usePaymentPayoutMutation()
    const [paymentAccount, setPaymentAccount] = useState('')
    const [open, setOpen] = useState(false)
    const [smsAlert, setSmsAlert] = useState(false)
    const dispatch = useDispatch()
    const [shopNameValue, setShopNameValue] = useState('')
    const providerAt = new ProviderAt()
    const serErrors = errors ? true : false
    const router = useRouter()
    const [tiendaId, setTiendaId] = useState('')

    const handleSetShopNameValue = (e) => {
        setShopNameValue(e.payment_account)
        setTiendaId(e.details.shop)

        // console.log(tiendaId)
    }

    useEffect(() => {
        setValue('shopName', shopNameValue, { shouldValidate: true })
    }, [shopNameValue])

    useEffect(() => {
        refetch()
    }, [])

    const handleResetSetShopNameValue = () => {
        setShopNameValue('')
    }

    const onSubmit = async (item) => {
        const inputMontoShop = document.getElementById('montoShop').value
        const montoRetiro = montoShop * 100

        if (!inputMontoShop) {
            document.getElementById('montoShop').focus()
            return
        }

        const newSolicitud = await payout({
            company: 'ATP',
            session: user?.session,
            method: 'ATPAYMENTSERVICE_PAYOUT',
            amount: montoRetiro,
            payment_account: shopNameValue,
            shop: tiendaId,
        })

        if (newSolicitud.data.result === 'OK') {
            // GTM IMPLEMENTATION

            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'puntos de venta',
                amount: 'S/' + inputMontoShop ?? 0,
                option: 'enviar solicitud',
                action: 'click',
            })

            // setOpen(true)
            // setSmsAlert('¡Tu solicitud fue enviada y recibida con éxito!')
            // handleResetSetShopNameValue()
            // document.getElementById('montoShop').value = ''

            // UPDATE BALANCE

            const resUserDetail = await providerAt.userDetail(user.session)
            const _user = {
                ...resUserDetail.user,
                session: user.session,
            }
            Session().setUser(_user)
            dispatch(setUser(Session().getUser()))
            // dispatch(setMontoShop(0))
            router.push(PATHS.CUENTA_RETIRO_ESTADO_DE_SOLICITUD.url)
        } else {
            // GTM
            if (newSolicitud?.data.description === 'Pending payout') {
                GoogleTagManager.push({
                    event: 'atm.event',
                    eventName: 'retiro_metodos_de_retiro',
                    payout_option: 'puntos de venta',
                    amount: 'S/' + inputMontoShop ?? 0,
                    option: 'solicitud de retiro en curso',
                    action: 'view',
                })
            }

            // setOpen(true)
            // setSmsAlert(newSolicitud.data.description)
            // dispatch(setMontoShop(0))

            dispatch(
                onOpen({
                    message: t(newSolicitud?.data.description),
                    severity: 'error',
                    open: true,
                    autoHideDuration: 3000,
                })
            )
        }
    }

    const dtCancelar = async (e) => {
        setOpen(false)
    }

    return (
        <div>
            <FormS autoComplete="none" onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth>
                    <InputLabel id="demo-select-small">Elige una Tienda</InputLabel>
                    <SelectS defaultValue="" {...register('shop', { required: true })} label="Elige una Tienda">
                        {account &&
                            account.map((item, i) => {
                                return (
                                    <MenuItem key={i} onClick={() => handleSetShopNameValue(item)} value={item.details.shop}>
                                        {item.name}
                                    </MenuItem>
                                )
                            })}
                    </SelectS>

                    {account?.length === 0 ? <ErrorTextS>No tienes tiendas favoritas</ErrorTextS> : ''}
                </FormControl>
                <FormControl fullWidth>
                    <DivButton>
                        <LoadingButton
                            color="primary"
                            disabled={serErrors || isPayment || isLoadingPayout}
                            loading={isPayment || isLoadingPayout}
                            type="submit"
                            variant="contained"
                        >
                            {' '}
                            Enviar solicitud
                        </LoadingButton>
                    </DivButton>
                </FormControl>
            </FormS>
        </div>
    )
}

export default SeleccionarTienda
const ButtonFormS = styled(Button)`
    & {
        padding: 16.5px 14px;
        width: 100%;
        max-width: 300px;
        margin: auto;
    }
`
const SelectS = styled(Select)`
    & {
        background: white;
        .MuiSelect-select {
            display: flex;
            white-space: pre-wrap;
        }
    }
`
const FormS = styled.form`
    & {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        max-width: 750px;
        margin: auto;
        min-height: 200px;
        ${MEDIA_QUERIES.min_width.tabletS} {
            padding: 3rem 1rem;
            gap: 15px;
        }
    }
`
const FormContentS = styled.div`
    & {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 10px;
        span.lineStyle {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 19.42px;
            height: 45px;
            display: flex;
            align-items: center;
            text-align: center;
            color: #000000;
        }
        span.textFooter {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            display: flex;
            align-items: center;
            text-align: center;
            color: #000000;
        }
    }

    ${MEDIA_QUERIES.min_width.tabletS} {
        & {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            text-align: left;

            span.lineStyle {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 19.42px;
                height: 45px;
                display: flex;
                align-items: center;
                text-align: center;
                color: #000000;
            }
            span.textFooter {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;
                text-align: center;
                color: #000000;
            }
        }
    }
`
const ModalS = styled(Modal)`
    & {
        z-index: 9999;
        overflow: auto;
        display: flex;
        align-items: center;
        font-size: 13px;
    }
`
const ModalWrapperS = styled.div`
    outline: none;
    background: white;
    position: relative;
    z-index: 1;

    min-width: 230px;
    /* overflow: auto; */
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    ${MEDIA_QUERIES.min_width.mobileL} {
        height: auto;
        min-height: auto;
        width: 90%;
        max-width: 400px;
    }
    & {
        .close-modal {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            svg {
                cursor: pointer;
                font-size: 30px;
            }
        }
        iframe {
            width: 100%;
            height: 80vh;
            max-height: 400px;
        }
    }
`
const BackAndCloseS = styled.div`
    background: white;
    display: flex;
    width: 100%;
    justify-content: space-between;

    align-items: center;
    border-bottom: 1px solid ${(p) => p.theme.palette.alternate8.main};
    .MuiButton-root {
        border-radius: 0;
        padding: 0.3rem;
        line-height: 1;
        min-width: initial;
        svg {
            color: red;
            font-size: 2rem;
        }
    }
    .MuiButton-root.close {
        svg {
            color: white;
        }
    }
`
const ButtonS = styled(Button)`
    & {
        &.MuiButton-root.back {
            ${(p) => {
                if (p.$stepNext < 1)
                    return css`
                        & {
                            opacity: 0;
                            pointer-events: none;
                        }
                    `
            }}
        }
    }
`
const LocationS = styled.div`
    & {
        font-size: 0.95rem;
    }
`
const MethodsPaymentS = styled.div`
    min-height: 100%;
    .TextModalAuto {
        font-weight: 400;
        font-size: 15px;
        line-height: 26px;
        /* or 173% */

        display: flex;
        align-items: center;
        text-align: center;

        color: #323232;
        padding: 50px;
    }
    .ContenedorBotones {
        display: grid;
        grid-template-columns: auto auto;

        gap: 1rem;
        padding: 1rem;
    }
    & {
        .wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 1rem;
            padding: 1rem;
            ${MEDIA_QUERIES.min_width.tabletS} {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
            ${MEDIA_QUERIES.min_width.tabletS} {
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            }
            ${MEDIA_QUERIES.min_width.tabletL} {
                grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
                padding: 2rem;
            }
            ${MEDIA_QUERIES.min_width.desktopXS} {
                grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
                padding: 2rem 3rem;
            }
            ${MEDIA_QUERIES.min_width.desktopS} {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                padding: 2rem 4rem;
            }
            ${MEDIA_QUERIES.min_width.desktopM} {
                grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
                padding: 2rem 10vmax;
            }
        }
    }
`
const DivButton = styled.div`
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
const ErrorTextS = styled.p`
    & {
        margin-top: 5px;
        color: ${(p) => p.theme.palette.primary.main};
        font-size: 0.7rem;
    }
`
