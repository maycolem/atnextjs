import { InputLabel, FormControl, Alert } from '@mui/material'
import styled, { css } from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useDeleteUserPaymentAccountMutation, useGetUserPaymentAccountsBankQuery } from 'states/calimaco/calimacoDataApi'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, setUser } from 'states/features/slices/userSlice'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setMonto } from 'states/features/slices/retiroPaymentSlice'
import { usePaymentPayoutMutation } from 'states/calimaco/calimacoPaymentApi'
import { useTranslation } from 'react-i18next'
import { ProviderAt } from 'services/ProviderAtService'
import { Session } from 'services/Session'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import { onOpen } from 'states/slice/layout/SnackBar'
import { PATHS } from 'routes/paths/PATHS'
import { dtEnviarSolicitudDeRetiro, dtSeleccionarCuenta, dtSolicitudDeRetiroEnCurso } from '../dt'
import { CustomFormControl } from './CustomFormControl'
import { CustomSelect } from './CustomSelect'
import { UserBankAccount } from '@interfaces/index'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaRetiroSelectAccount } from '../schemas'
import { delay } from '@helpers/delay'
import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import { ModalDeleteAccount } from './ModalDeleteAccount'
import { useGetDetailsUser } from '@hooks/useGetDetailsUser'
import { CustomTextField } from './CustomTextField'

interface Props {
    errors?: string
    amount: number
    method: string
}
interface RetiroFormValues {
    bankId: string
    amount: number
    bank_name: string
    account_number: string
}

export const SelectAccount = ({ amount, method, errors }: Props) => {
    const user = useSelector(userSelector)
    const { data: account = [], refetch, isLoading, isFetching } = useGetUserPaymentAccountsBankQuery({ session: user?.session })
    const hookFormProps = useForm<RetiroFormValues>({
        mode: 'onChange',
        resolver: yupResolver(SchemaRetiroSelectAccount()),
        criteriaMode: 'all',
        reValidateMode: 'onChange',
        shouldFocusError: true,
        shouldUnregister: true,
        defaultValues: {
            amount: amount,
        },
    })
    const { getValues, formState, handleSubmit, register, setValue, trigger, setError, resetField } = hookFormProps
    const { errors: errorsForm } = formState
    const [payout, { isLoading: isLoadingPayout }] = usePaymentPayoutMutation()
    const { t } = useTranslation()
    const providerAt = new ProviderAt()
    const dispatch = useDispatch()
    const router = useRouter()
    const [deleteUserAccount, { isLoading: isLoadingDeleteUserAccount }] = useDeleteUserPaymentAccountMutation()
    const [openModal, setOpenModal] = useState(false)
    const [nameAccount, setNameAccount] = useState('')
    const [bankAccount, setBankAccount] = useState('')
    const [accountNumber, setAccountNumber] = useState('')

    useEffect(() => {
        setValue('amount', amount)
    }, [amount])
    useEffect(() => {
        setValue('bank_name', bankAccount, { shouldValidate: true })
    }, [bankAccount])
    useEffect(() => {
        setValue('account_number', accountNumber, { shouldValidate: true })
    }, [accountNumber])

    const handleOpenModalDelteAcc = () => {
        setOpenModal(true)
        return
    }
    const handleDeleteBankId = async () => {
        const bankId = getValues('bankId')
        if (!bankId) {
            return
        }
        const data: any = await deleteUserAccount({ payment_account: bankId, session: user?.session })
        if (data?.data?.result === 'OK') {
            await delay(200)
            refetch()
            await delay(500)
            resetField('bankId')
            setValue('bankId', '')
        }
    }
    const onSubmit: SubmitHandler<RetiroFormValues> = async (data) => {
        const responsePayout = await payout({
            session: user.session,
            method: method,
            amount: data.amount * 100,
            payment_account: Number(data.bankId),
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

    useEffect(() => {
        if (account) {
            const item = account.filter((item) => String(item.payment_account) === String(getValues('bankId')))
            if (item.length > 0) {
                setNameAccount(item[0].name)
                setBankAccount(item[0].details.bank_name)
                const resHiddenCard = hiddenCardNumber(item[0].details.account_number)
                setAccountNumber(resHiddenCard)
            }
        }
    }, [getValues('bankId'), account])

    if (isLoading) {
        return (
            <Styled>
                <StyledForm>
                    <LoadingDefault loading={isLoading} />
                </StyledForm>
            </Styled>
        )
    }

    const hiddenCardNumber = (value: string) => {
        return `${'*'.repeat(value.length - 4)}${value.substr(value.length - 4)}`
    }

    return (
        <Styled>
            {account?.length > 0 ? (
                <StyledForm id="retiro-form-apuesta-total" autoComplete="none" onSubmit={handleSubmit(onSubmit)}>
                    {isLoadingDeleteUserAccount ? (
                        <FormControl>
                            <LoadingDefault loading={isLoadingDeleteUserAccount} minHeight="70px" />
                        </FormControl>
                    ) : (
                        <>
                            <CustomFormControl hookFormProps={hookFormProps} name="bankId">
                                <div style={{ position: 'relative' }}>
                                    <InputLabel>Elige una Cuenta Bancaria*</InputLabel>
                                    <CustomSelect
                                        itemsKeyLabel={(item: UserBankAccount) => {
                                            return (
                                                <StyledItemsSelect>
                                                    <p className="bank-name">{item.details.bank_name}</p>
                                                    <p className="bank-alias">{item.name}</p>
                                                </StyledItemsSelect>
                                            )
                                        }}
                                        itemKeyValue={'payment_account'}
                                        items={account}
                                        label="Elige una Cuenta Bancaria*"
                                        register={register('bankId', {
                                            async onChange() {
                                                await trigger('bankId')
                                            },
                                        })}
                                        renderValue={(selected) => {
                                            return nameAccount
                                        }}
                                    />
                                </div>
                            </CustomFormControl>
                            {bankAccount ? (
                                <CustomFormControl hookFormProps={hookFormProps} name="bank_name">
                                    <CustomTextField
                                        label={'Nombre del Banco*'}
                                        register={register('bank_name', {
                                            async onChange() {
                                                await trigger('bank_name')
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
                            ) : null}
                            {accountNumber ? (
                                <CustomFormControl hookFormProps={hookFormProps} name="account_number">
                                    <CustomTextField
                                        label={'Número de Cuenta Bancaria*'}
                                        register={register('account_number', {
                                            async onChange() {
                                                await trigger('account_number')
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
                            ) : null}
                        </>
                    )}
                    <FormControl className="form-button">
                        <StyledAcctions>
                            <StyledLoadingButton
                                color="primary"
                                disabled={!amount || Boolean(errors)}
                                loading={isLoadingPayout || isLoadingDeleteUserAccount}
                                type="submit"
                                variant="contained"
                            >
                                Enviar solicitud
                            </StyledLoadingButton>
                            <StyledLoadingButton
                                color="dark"
                                disabled={Boolean(!getValues('bankId'))}
                                loading={isLoadingPayout || isLoadingDeleteUserAccount}
                                variant="outlined"
                                onClick={handleOpenModalDelteAcc}
                            >
                                Borrar cuenta
                            </StyledLoadingButton>
                        </StyledAcctions>
                    </FormControl>
                </StyledForm>
            ) : (
                <StyledForm>
                    <Alert severity="warning">
                        <p>No tienes Cuentas Bancarias guardadas.</p>
                    </Alert>
                </StyledForm>
            )}
            <ModalDeleteAccount
                open={openModal}
                setOpen={setOpenModal}
                nameAccount={`${bankAccount} - ${nameAccount}`}
                handleDeleteBank={handleDeleteBankId}
            />
        </Styled>
    )
}
const StyledAcctions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.5rem;
`
const StyledItemsSelect = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-top: 6px;

    > .bank-name {
        font-size: 0.8rem;
        font-weight: 500;
    }
`
const Styled = styled.div`
    padding: 30px;
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 40px 30px;
    }
`
const StyledLoadingButton = styled(LoadingButton)`
    && {
        padding: 0.9rem 1rem;
        min-width: 160px;
        margin: auto;
        text-transform: initial;
        font-size: 1rem;
        flex: 1;
        line-height: initial;
    }
`
const StyledForm = styled.form`
    max-width: 400px;
    margin: auto;

    ${gridFormCss()}
`
function gridFormCss() {
    return css`
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 2rem 1.5rem;
    `
}
