/* eslint-disable no-unneeded-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { Button, FormControl, FormLabel, Modal, TextField } from '@mui/material'
import styled from '@emotion/styled'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import Select from '@mui/material/Select'
import { useGetBankAccountTypesQuery, useGetBanksQuery } from 'states/calimaco/calimacoContentApi'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, setUser } from 'states/features/slices/userSlice'
import { useAddUserPaymentAccountMutation } from 'states/calimaco/calimacoDataApi'
import { usePaymentPayoutMutation } from 'states/calimaco/calimacoPaymentApi'
import { retiroPaymentSelector } from 'states/features/slices/retiroPaymentSlice'
import { useTranslation } from 'react-i18next'
import { onOpen } from 'states/slice/layout/SnackBar'
import { ProviderAt } from 'services/ProviderAtService'
import { Session } from 'services/Session'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import { GoogleTagManager } from 'google/TagManager'

const NuevaCuenta = ({ error = '' }) => {
    const dispatch = useDispatch()
    const { data: type = [] } = useGetBankAccountTypesQuery()
    const { data: bank = [] } = useGetBanksQuery()
    const [typeCuenta, setTypeCuenta] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const user = useSelector(userSelector)
    const [payment, { isLoading: isPayment }] = useAddUserPaymentAccountMutation()
    const [payout, { isLoading: isLoadingPayout }] = usePaymentPayoutMutation()
    const [amount, setAmount] = useState('')
    const [selectBank, setSelectBank] = useState({ bank: '', code: '', name: '', popular_name: '' })
    const [numDoc, setNumDoc] = useState()
    const { t } = useTranslation()
    const providerAt = new ProviderAt()
    const serErrors = error ? true : false
    const router = useRouter()
    const [errorsBank, setErrorsBank] = useState('')
    const [errorAccount, setErrorAccount] = useState(false)
    const [accountNumber, setAccountNumber] = useState('')

    useEffect(() => {
        setNumDoc(user?.national_id)
    })

    const handleChangeType = (event) => {
        setTypeCuenta(event.target.value)
    }

    const handleSearch = (e) => {
        const value = e.target.value
        const digits = value.slice(0, 3)

        if (value.length >= 3) {
            const bankSelect = bank.filter((item) => item.code === digits)

            if (bankSelect.length > 0) {
                setSelectBank({
                    bank: bankSelect[0].bank,
                    code: bankSelect[0].code,
                    name: bankSelect[0].name,
                    popular_name: bankSelect[0].popular_name,
                })
            } else {
                dispatch(
                    onOpen({
                        message: 'Ingresar un CCI Valido',
                        severity: 'error',
                        open: true,
                        autoHideDuration: 2000,
                    })
                )

                setSelectBank({
                    bank: '',
                    code: '',
                    name: '',
                    popular_name: '',
                })
            }
        } else {
            setSelectBank({
                bank: '',
                code: '',
                name: '',
                popular_name: '',
            })
        }
    }

    useEffect(() => {
        setErrorsBank('')
        if (amount.length === 20) {
            setErrorsBank('')
            setErrorAccount(false)
        } else {
            if (amount.length > 1) {
                setErrorsBank('*El nombre del banco aparecerá automáticamente al colocar el CCI')
                setErrorAccount(true)
            }
        }
    }, [amount])

    const onSubmit = async (data) => {
        const inputMontoBank = document.getElementById('montoTransferencia').value

        if (!inputMontoBank) {
            document.getElementById('montoTransferencia').focus()
            return
        }

        const saveAccount = {
            name: data.name_account,
            type: 'BANK',
            config: {
                cci: data.cci,
                bank_name: selectBank.name,
                account_type: data.account_type,
                account_number: data.account_number,
            },
        }

        const res = await payment({ company: 'ATP', session: user?.session, payment_account: JSON.stringify(saveAccount) })

        const newSolicitud = await payout({
            company: 'ATP',
            session: user?.session,
            method: 'BANK_PAYOUT',
            amount: inputMontoBank * 100,
            payment_account: res.data.payment_account,
        })

        if (newSolicitud.data.result === 'OK') {
            // IMPLEMENTATION GTM

            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'transferencia bancaria',
                amount: 'S/' + inputMontoBank ?? 0,
                option: 'enviar solicitud',
                action: 'click',
            })

            // setOpen(true)
            /// setSmsAlert('¡Tu solicitud fue enviada y recibida con éxito!')
            // document.getElementById('montoTransferencia').value = ''

            const resUserDetail = await providerAt.userDetail(user.session)
            const _user = {
                ...resUserDetail.user,
                session: user.session,
            }
            Session().setUser(_user)
            dispatch(setUser(Session().getUser()))

            router.push(PATHS.CUENTA_RETIRO_ESTADO_DE_SOLICITUD.url)
        } else {
            if (newSolicitud?.data.description === 'Pending payout') {
                GoogleTagManager.push({
                    event: 'atm.event',
                    eventName: 'retiro_metodos_de_retiro',
                    payout_option: 'transferencia bancaria',
                    amount: 'S/' + inputMontoBank ?? 0,
                    option: 'solicitud de retiro en curso',
                    action: 'view',
                })
            }

            // setOpen(true)
            // setSmsAlert(newSolicitud.data.description)
            // dispatch(setMonto(0))

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

    const handlePaste = (event) => {
        // const cp = event.clipboardData.getData('text')
        // const replaceNumber = cp.replace(/[^\d.]/g, "")
        setAccountNumber(event.target.value)
    }

    const handlePasteCCI = (event) => {
        // const cp = event.clipboardData.getData('text')
        // const replaceNumber = cp.replace(/[^\d.]/g, "")
        setAmount(event.target.value)
    }

    return (
        <div>
            <FormS autoComplete="none" onSubmit={handleSubmit(onSubmit)}>
                <div className="ContenedorNewCuenta">
                    <FormContentS>
                        <FormLabel>Numero CCI* (20 dígitos)</FormLabel>
                        <FormControlSt>
                            <div className="wrapper">
                                <TextFieldS
                                    pattern="^[0-9]*[.,]?[0-9]*$"
                                    {...register('cci', {
                                        onChange: handleSearch,
                                        required: 'Ingrese Numero CCI',
                                    })}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    onInput={(e) => {
                                        const value = e.target.value
                                        setAmount(value.replace(/[^0-9]/g, ''))
                                    }}
                                    onPaste={handlePasteCCI}
                                    placeholder="___________________"
                                    size="small"
                                    value={amount}
                                ></TextFieldS>
                            </div>
                        </FormControlSt>

                        <ErrorTextS>{errorsBank}</ErrorTextS>
                        <ErrorTextS>{errors.cci?.message}</ErrorTextS>
                    </FormContentS>

                    <FormContentS>
                        <FormLabel>Tipo de Cuenta*</FormLabel>
                        <FormControl size="medium" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-select-small">Elige Tipo Cuenta</InputLabel>
                            <Select
                                {...register('account_type', { required: 'Ingrese Tipo Cuenta' })}
                                label="Tipo cuenta"
                                onChange={handleChangeType}
                                value={typeCuenta}
                            >
                                {/* {type &&
                                    type.map((item, i) => {
                                        return (
                                            <MenuItem key={i} value={item.name}>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })} */}
                            </Select>
                        </FormControl>
                        <ErrorTextS>{errors.account_type?.message}</ErrorTextS>
                    </FormContentS>

                    <FormContentS>
                        <FormLabel>Documento del Titular de la Cuenta*</FormLabel>
                        <FormControlSt>
                            <div className="wrapper">
                                <TextFieldS
                                    {...register('num_doc')}
                                    disabled
                                    hiddenLabel
                                    placeholder="44077890"
                                    size="small"
                                    value={numDoc || ''}
                                ></TextFieldS>
                            </div>
                        </FormControlSt>
                    </FormContentS>

                    <FormContentS>
                        <FormLabel>Nombre del Banco*</FormLabel>

                        <FormControlSt>
                            <div className="wrapper">
                                <TextFieldS
                                    {...register('bank_name')}
                                    disabled
                                    hiddenLabel
                                    placeholder="Aparecerá automáticamente al colocar el CCI"
                                    size="small"
                                    value={selectBank.bank || 'Aparecerá al llenar el CCI'}
                                ></TextFieldS>
                            </div>
                        </FormControlSt>
                    </FormContentS>

                    <FormContentS>
                        <FormLabel>Número de Cuenta*</FormLabel>
                        <FormControlSt>
                            <div className="wrapper">
                                <TextFieldS
                                    pattern="^[0-9]*[.,]?[0-9]*$"
                                    {...register('account_number', { required: 'Ingrese Numero de Cuenta' })}
                                    hiddenLabel
                                    inputProps={{
                                        maxLength: 22,
                                    }}
                                    onInput={(e) => {
                                        const value = e.target.value
                                        setAccountNumber(value.replace(/[^0-9]/g, ''))
                                    }}
                                    onPaste={handlePaste}
                                    placeholder="000000000000000"
                                    size="small"
                                    value={accountNumber}
                                ></TextFieldS>
                            </div>
                        </FormControlSt>
                        <ErrorTextS>{errors.account_number?.message}</ErrorTextS>
                    </FormContentS>

                    <FormContentS>
                        <FormLabel>Nombre de cuenta (opcional)</FormLabel>
                        <FormControlSt>
                            <div className="wrapper">
                                <TextFieldS
                                    {...register('name_account')}
                                    hiddenLabel
                                    placeholder="Escribe aquí un nombre para recordar más rápido"
                                    size="small"
                                ></TextFieldS>
                            </div>
                        </FormControlSt>
                    </FormContentS>
                </div>

                <DivButton>
                    <LoadingButton
                        color="primary"
                        disabled={serErrors || isPayment || isLoadingPayout || errorAccount}
                        loading={isPayment || isLoadingPayout}
                        type="submit"
                        variant="contained"
                    >
                        Enviar solicitud
                    </LoadingButton>
                </DivButton>
            </FormS>
        </div>
    )
}

export default NuevaCuenta
const FormS = styled.form`
    & {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: #fafafa;
        padding: 20px;
        header {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: ${(p) => p.theme.palette.alternate5.main};
        }
    }

    ${MEDIA_QUERIES.min_width.tabletS} {
        & {
            gap: 1rem;
            background: #fafafa;
            padding: 20px;

            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            header {
                display: flex;

                gap: 1rem;
                color: ${(p) => p.theme.palette.alternate5.main};
            }
        }
        .ContenedorNewCuenta {
            display: grid;
            grid-template-columns: 350px 350px;

            gap: 1rem;
            padding: 1rem;
        }
    }
`
const FormControlSt = styled(FormControl)`
    & {
        fieldset {
            border: 0;
        }

        .MuiFormControl-root {
            min-height: 100%;
            flex: 1;
            .MuiOutlinedInput-root {
                flex: 1;
                font-size: 1.1rem;
                input {
                    &::placeholder {
                        font-size: 1rem;
                        transform: translateY(-2px);
                    }
                }
            }
        }

        button {
            border: 0;
            border-radius: 0;
            box-shadow: 0;
            font-size: 1.01rem;
            /* padding: 1.8rem 1.4rem; */
        }
        .wrapper {
            display: flex;
            flex: 1 1 100%;
            overflow-y: initial;
            border: 1px solid transparent;
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
            border-radius: 8px;
            overflow: hidden;
        }
    }
    ${MEDIA_QUERIES.min_width.tabletS} {
        padding: 10px 5px;
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
const TextFieldS = styled(TextField)`
    & {
        background: #ffffff;
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
    border-bottom: 1px solid transparent;
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
        background: white;
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
const ButtonFormS = styled(Button)`
    & {
        padding: 16.5px 14px;
        width: 100%;
        max-width: 300px;
        margin: auto;
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
        color: ${(p) => p.theme.palette.primary.main};
        font-size: 0.922423432432rem;
    }
`
