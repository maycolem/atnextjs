import React, { useState, useEffect } from 'react'
import { FormControl } from '@mui/material'
import styled, { css } from 'styled-components'
import InputLabel from '@mui/material/InputLabel'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useGetBankAccountTypesQuery, useGetBanksQuery } from 'states/calimaco/calimacoContentApi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { userSelector } from 'states/features/slices/userSlice'
import { useAddUserPaymentAccountMutation } from 'states/calimaco/calimacoDataApi'
import { usePaymentPayoutMutation } from 'states/calimaco/calimacoPaymentApi'
import { useTranslation } from 'react-i18next'
import { onOpen } from 'states/slice/layout/SnackBar'
import { LoadingButton } from '@mui/lab'
import { dtEnviarSolicitudDeRetiro, dtNuevaCuenta, dtSolicitudDeRetiroEnCurso } from '../dt'
import { Bank, BankAccount, BankType } from '@interfaces/index'
import { useAppDispatch, useAppSelector } from '@states/store'
import { CustomFormControl } from './CustomFormControl'
import { CustomTextField } from './CustomTextField'
import { CustomSelect } from './CustomSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaRetiroNewAccount as Schema } from '../schemas'
import { delay } from '@helpers/delay'
import { useRouter } from 'next/router'
import { PATHS } from '@routes/paths/PATHS'

interface RetiroFormValues {
    cci: string
    account_type: string
    num_doc: string
    bank_name: string
    account_number: string
    name_account: string
    amount: number
}
interface Props {
    amount: number
    method: string
    errors?: string
}

export const NewAccount = ({ errors, amount, method }: Props) => {
    const dispatch = useAppDispatch()
    const { data: dataBankAccountTypes } = useGetBankAccountTypesQuery({})
    const { data: dataBanks } = useGetBanksQuery({})
    const [types, setTypes] = useState<BankType[]>([])
    const [banks, setBanks] = useState<Bank[]>([])
    const user = useAppSelector(userSelector)
    const [payment, { isLoading: isLoadingPayment }] = useAddUserPaymentAccountMutation()
    const [payout, { isLoading: isLoadingPayout }] = usePaymentPayoutMutation()
    const { t } = useTranslation()
    const router = useRouter()

    useEffect(() => {
        if (dataBanks && 'banks' in dataBanks) {
            setBanks(dataBanks.banks)
        }
    }, [dataBanks])

    useEffect(() => {
        if (dataBankAccountTypes && 'types' in dataBankAccountTypes) {
            setTypes(dataBankAccountTypes.types)
        }
    }, [dataBankAccountTypes])

    const hookFormProps = useForm<RetiroFormValues>({
        mode: 'onChange',
        resolver: yupResolver(Schema()),
        criteriaMode: 'all',
        reValidateMode: 'onChange',
        shouldFocusError: true,
        shouldUnregister: true,
        defaultValues: {
            num_doc: user?.national_id,
            amount: amount,
        },
    })
    const { getValues, formState, handleSubmit, register, setValue, trigger, setError, resetField } = hookFormProps

    useEffect(() => {
        setValue('amount', amount)
    }, [amount])

    const handleSearchBankName = (): Bank => {
        // message: 'Ingresar un CCI Valido',
        const cci = getValues('cci')
        if (!cci) {
            setValue('bank_name', '')
            return null
        }
        const digits = cci.slice(0, 3)
        const bank = banks.filter((item) => {
            if ('code' in item && item.code) {
                return item.code.includes(digits)
            }
            return false
        })
        if (bank.length > 0) {
            setValue('bank_name', bank[0].name)
            return bank[0]
        } else {
            setValue('bank_name', '')
            return null
        }
    }

    // useEffect(() => {
    //     // GTM
    //     dtNuevaCuenta() // doble evento
    // }, [])

    const onSubmit: SubmitHandler<RetiroFormValues> = async (data) => {
        const existBank = handleSearchBankName()
        if (!existBank) {
            resetField('bank_name')
        }
        const type = types.filter((item) => item.type === data.account_type)[0].name
        const bankAccount: BankAccount = {
            name: data.name_account,
            type: 'BANK',
            config: {
                cci: data.cci,
                bank_name: data.bank_name,
                account_type: type,
                account_number: data.account_number,
            },
        }
        const responsePayment = await payment({ session: user.session, payment_account: bankAccount })

        if ('data' in responsePayment && 'payment_account' in responsePayment.data) {
            const payment_account = responsePayment.data.payment_account
            const responsePayout = await payout({
                session: user.session,
                method: method,
                amount: data.amount * 100,
                payment_account: payment_account,
            })

            if ('data' in responsePayout && responsePayout.data.result === 'OK') {
                dtEnviarSolicitudDeRetiro(amount)
                await router.push(PATHS.CUENTA_RETIRO_ESTADO_DE_SOLICITUD.url)
                return
            }

            if ('data' in responsePayout && responsePayout.data.result === 'error') {
                dtSolicitudDeRetiroEnCurso(amount)
                const data = responsePayout.data
                dispatch(
                    onOpen({
                        message: t(data.description),
                        severity: 'error',
                    })
                )
            }
        }
    }

    return (
        <Styled>
            <StyledForm id="retiro-form-apuesta-total" autoComplete="none" onSubmit={handleSubmit(onSubmit)}>
                <CustomFormControl hookFormProps={hookFormProps} name="cci">
                    <CustomTextField
                        label={'Numero CCI* (20 dígitos)*'}
                        register={register('cci', {
                            onChange: async () => {
                                handleSearchBankName()
                                await trigger('cci')
                                await trigger('bank_name')
                            },
                        })}
                        inputProps={{
                            maxLength: 20,
                        }}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault()
                            }
                        }}
                    />
                </CustomFormControl>
                <CustomFormControl hookFormProps={hookFormProps} name="account_type">
                    <div style={{ position: 'relative' }}>
                        <InputLabel>Tipo de Cuenta Bancaria*</InputLabel>
                        <CustomSelect
                            itemsKeyLabel="name"
                            itemKeyValue={'type'}
                            items={types}
                            label="Tipo de Cuenta Bancaria*"
                            register={register('account_type', {
                                async onChange() {
                                    await trigger('account_type')
                                },
                            })}
                        />
                    </div>
                </CustomFormControl>
                <CustomFormControl hookFormProps={hookFormProps} name="num_doc">
                    <CustomTextField
                        label={'Documento del Titular de la Cuenta*'}
                        register={register('num_doc', {
                            async onChange() {
                                await trigger('num_doc')
                            },
                        })}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        focused
                        variant="filled"
                        color="alternate8"
                    />
                </CustomFormControl>
                <CustomFormControl hookFormProps={hookFormProps} name="bank_name">
                    <CustomTextField
                        label={'Nombre del Banco*'}
                        register={register('bank_name', {
                            async onChange() {
                                await trigger('bank_name')
                            },
                        })}
                        placeholder="Aparecerá al colocar el CCI"
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        focused
                        variant="filled"
                        color="alternate8"
                    />
                </CustomFormControl>
                <CustomFormControl hookFormProps={hookFormProps} name="account_number">
                    <CustomTextField
                        label={'Número de Cuenta Bancaria*'}
                        register={register('account_number', {
                            async onChange() {
                                await trigger('account_number')
                            },
                        })}
                    />
                </CustomFormControl>
                <CustomFormControl hookFormProps={hookFormProps} name="name_account">
                    <CustomTextField
                        label={'Nombre de Cuenta Bancaria (opcional)'}
                        register={register('name_account', {
                            async onChange() {
                                await trigger('name_account')
                            },
                        })}
                        placeholder="Escribe aquí un nombre para recordar más rápido"
                    />
                </CustomFormControl>

                <FormControl className="form-button">
                    <StyledLoadingButton
                        color="primary"
                        disabled={!amount || Boolean(errors)}
                        loading={isLoadingPayment || isLoadingPayout}
                        type="submit"
                        variant="contained"
                    >
                        Enviar solicitud
                    </StyledLoadingButton>
                </FormControl>
            </StyledForm>
        </Styled>
    )
}

const StyledLoadingButton = styled(LoadingButton)`
    && {
        padding: 0.9rem 1rem;
        min-width: 200px;
        max-width: max-content;
        margin: auto;
        text-transform: initial;
        font-size: 1rem;
        line-height: initial;
    }
`
const Styled = styled.div`
    padding: 30px;
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 40px 30px;
    }
`
const StyledForm = styled.form`
    max-width: 700px;
    margin: auto;

    ${gridFormCss()}
`
function gridFormCss() {
    return css`
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 2rem 1.5rem;
        ${MEDIA_QUERIES.min_width.tabletL} {
            grid-template-columns: repeat(2, 1fr);
            > .form-button {
                grid-column: span 2;
            }
        }
    `
}
