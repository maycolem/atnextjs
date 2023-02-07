/* eslint-disable camelcase */
import styled, { css } from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CalimacoClient } from '@calimaco/base'
import LoadingButton from '@mui/lab/LoadingButton'
import { GoogleTagManager } from 'google/TagManager'
import {
    Alert,
    Button,
    Checkbox,
    Fade,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { delay } from '@helpers/delay'
import cfg from 'config/config'

import { useRouter } from 'next/router'
import { ErrorMessage } from '@hookform/error-message'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { showModalSuccessfully } from 'states/features/slices/registerModalSuccessSlice'
import {
    useCalimacoValidateDniMutation,
    useCalimacoValidateEmailMutation,
    useCalimacoValidateMobileMutation,
    useLoginMutation,
} from 'states/calimaco/calimacoAuthApi'
import dynamic from 'next/dynamic'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useGetAgentShopsQuery, useGetPreferencesQuery } from 'states/calimaco/calimacoContentApi'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import { setUser } from 'states/features/slices/userSlice'
import { onOpen } from 'states/slice/layout/SnackBar'
import { useTranslation } from 'react-i18next'
import useMediaQueryAT from 'hooks/useMediaQueryAT'
import { EmailAge } from '../../../Register/helpers/EmailAge'
import {
    sendEmailCode,
    sendMobileCode,
    sendUtms,
    validateDniandLastname_,
    validateDni_,
    validateEmailAge,
} from '@states/api/apuestaTotalApi'
import { verifyContainsKeys } from '@helpers/verifyContainsKeys'
import ButtonGenerateCode from './ButtonGenerateCode'
import { getError } from './helpers/getErrorMessage'
import { FormValues } from '@interfaces/index'
import CustomFormControl from './CustomFormControl'
import { getDomain, isValidDomain } from './helpers/isValidDomain'
import { Modal } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import { useGetUserDetailsMutation } from '@states/calimaco/calimacoDataApi'
import { getErrorMessage } from './helpers/catchErrorMessage'
import { SchemaRegister } from './schemas'
const DynamicRegisterControlsTermp = dynamic(() => import('../../../Register/RegisterControls/RegisterControlsTerm'))
const DynamicRegisterControlsGift = dynamic(() => import('../../../Register/RegisterControls/RegisterControlsGift'))
const InputNationalIdType = dynamic(() => import('./InputNationalIdType'))
const InputNationalId = dynamic(() => import('./InputNationalId'))
const InputFirstname = dynamic(() => import('./InputFirstname'))
const InputLastname = dynamic(() => import('./InputLastname'))
const InputDatePicker = dynamic(() => import('./InputDatePicker'))
const InputGender = dynamic(() => import('./InputGender'))
const InputEmail = dynamic(() => import('./InputEmail'))
const InputEmailCode = dynamic(() => import('./InputEmailCode'))
const InputPassword = dynamic(() => import('./InputPassword'))
const InputPasswordConfirm = dynamic(() => import('./InputPasswordConfirm'))
const InputAddress = dynamic(() => import('./InputAddress'))
const InputState = dynamic(() => import('./InputState'))
const InputMobile = dynamic(() => import('./InputMobile'))

const country = 'PE'

const MenuProps = {
    MenuProps: {
        PaperProps: {
            style: {
                maxHeight: 400,
            },
        },
    },
}

interface ResponseVerifiedAndVerifiedReason {
    unverifiedReason: {
        title: string
        content: string
    }
    verified: boolean
    isValid: boolean
}

const responseVerifiedAndVerifiedReasonInitial: ResponseVerifiedAndVerifiedReason = {
    unverifiedReason: {
        title: '',
        content: '',
    },
    verified: true,
    isValid: true,
}

interface ResponseResultSendCode {
    submit: number
    data_coding: number
    multipart: number
    destination: string
    length: number
    message_id: string
    error: string
    response: string
    token: string
    updated_at: Date
    created_at: Date
    id: number
}

interface customWindow extends Window {
    fbq?: any
    grecaptcha?: any
}
declare const window: customWindow

const Form = ({ agent = '', utmSource = '', utmMedium = '', utmCampaign = '', utmContent = '' }) => {
    const route = useRouter()
    const dispatch = useDispatch()
    const client = new CalimacoClient(cfg)
    const [isLoadingEmail, setIsLoadingEmail] = useState<boolean>(false)
    const [validateEmailCalimaco, { isLoading: isLoadingEmailCalimaco }] = useCalimacoValidateEmailMutation()
    const [validateMobileCalimaco, { isLoading: isLoadingMobileCalimaco }] = useCalimacoValidateMobileMutation()
    const [validateDNIofCalimaco, { isLoading: isLoadingValidateDNIofCalimaco }] = useCalimacoValidateDniMutation()
    const [isLoadingSms, setIsLoadingSms] = useState<boolean>(false)
    const [deparments, setDeparments] = useState([])
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [promotions, setPromotions] = useState([])
    const { t } = useTranslation()
    const [openModal, setOpenModal] = useState(false)
    const [disabledButtonEmail, setDisabledButtonEmail] = useState(true)
    const [login] = useLoginMutation()
    const [getUserDetails] = useGetUserDetailsMutation()
    const [isLoadingValidateDNI, setIsLoadingValidateDNI] = useState(false)

    const { data: dataShops, isLoading: isLoadingAgentShop } = useGetAgentShopsQuery({ agent: '12' }, { skip: !agent })
    const { data: dataPref, isLoading: isLoadingPref } = useGetPreferencesQuery(null, {
        skip: !agent,
    })

    const {
        register,
        trigger,
        resetField,
        watch,
        setValue,
        getValues,
        getFieldState,
        formState,
        handleSubmit,
        setError,
        clearErrors,
        setFocus,
    } = useForm<FormValues>({
        mode: 'onChange',
        resolver: yupResolver(agent ? SchemaRegister({ withAgentShop: true }) : SchemaRegister({})),
        criteriaMode: 'all',
        defaultValues: {
            birthday: '',
            country,
            agent,
        },
    })
    const hookFormProps = {
        register,
        trigger,
        resetField,
        watch,
        setValue,
        getValues,
        getFieldState,
        formState,
        handleSubmit,
        setError,
        clearErrors,
    }

    const onOpenOBJ = {
        message: '',
    }

    const { errors } = formState

    const formRef = useRef(null)
    const [registerLoading, setRegisterLoading] = useState(false)

    // MEDIA QUERIES
    const isTabletS = useMediaQueryAT(MEDIA_QUERIES.min_width.tabletS)

    const getFirstError = () => {
        const inputs = Array.from(formRef?.current?.querySelectorAll('input[name]') ?? []).map((ipt: HTMLInputElement) => ipt.name)
        const firstError = {}
        for (let i = 0; i < inputs.length; i++) {
            if (errors[inputs[i]]) {
                firstError[inputs[i]] = errors[inputs[i]]
                break
            }
            continue
        }
        return firstError
    }
    useEffect(() => {
        let isMounted = true
        client.getRegisterSelectablesPromotions().then((data) => {
            if (isMounted) {
                if (data.result === 'OK') {
                    setPromotions(data.promotions)
                } else {
                    setPromotions([])
                }
            }
        })
        client.getStates(country).then(
            (data) => {
                if (isMounted) {
                    if (data.result === 'OK') {
                        const orderData = data.states.sort((a, b) => String(a.name).localeCompare(String(b.name)))
                        setDeparments(orderData)
                    } else {
                        setDeparments([])
                    }
                }
            },
            (err) => {
                console.log(err)
            }
        )
        return () => {
            isMounted = false
            setRegisterLoading(false)
        }
    }, [])

    const [loadingState, setLoadingState] = useState(false)
    const [loadingProvince, setLoadingProvince] = useState(false)

    const handleChangeState = async (e) => {
        setLoadingState(true)
        setValue('province', '')
        setValue('city', '')
        setCities([])
        setProvinces([])
        await delay(200)
        client
            .getProvinces(country, e.target.value)
            .then((data) => {
                if (data.result === 'OK') {
                    const orderData = data.provinces.sort((a, b) => String(a.name).localeCompare(String(b.name)))
                    setProvinces(orderData)
                }
                setLoadingState(false)
            })
            .catch((e) => {
                setLoadingState(false)
            })
    }

    const handleChangeProvinces = async (e) => {
        setLoadingProvince(true)
        setValue('city', '')
        setCities([])
        await delay(200)
        client
            .getCities(country, getValues('state'), e.target.value)
            .then((data) => {
                if (data.result === 'OK') {
                    const orderData = data.cities.sort((a, b) => String(a.name).localeCompare(String(b.name)))
                    setCities(orderData)
                }
                setLoadingProvince(false)
            })
            .catch((e) => {
                setLoadingProvince(false)
            })
    }

    const handleExistMobileOfCalimaco = async (mobile: string = ''): Promise<ResponseVerifiedAndVerifiedReason> => {
        const response = await validateMobileCalimaco({ mobile })
        if (response && 'data' in response) {
            const data = response.data
            if (data.available === 'false') {
                resetField('mobile', { keepError: false })
                let message = '¡Ups! Algo salió mal.'
                const error = getError(String(data?.error_code))
                if (error) {
                    message = 'Celular duplicado.$$Ya existe una cuenta que usa este numero:'
                }
                setError('mobile', { type: 'custom', message: 'Celular duplicado' })
                onOpenOBJ.message = `${message}$$- ${mobile.match(/.{1,3}/g).join(' ')}`
                dispatch(onOpen(onOpenOBJ))
                return { ...responseVerifiedAndVerifiedReasonInitial, isValid: false }
            }
        }
        return responseVerifiedAndVerifiedReasonInitial
    }

    const handleExistDNIofCalimaco = async (): Promise<ResponseVerifiedAndVerifiedReason> => {
        const national_id = getValues('national_id')
        const response = await validateDNIofCalimaco({ dni: national_id })
        if (response && 'data' in response) {
            const data = response.data
            if (data.available === 'false') {
                resetField('national_id')
                onOpenOBJ.message = `Dni inválido ${national_id}$$${t(data?.event) || '¡Ups! Algo salió mal'}.`
                dispatch(onOpen(onOpenOBJ))
                setRegisterLoading(false)
                return { ...responseVerifiedAndVerifiedReasonInitial, isValid: false }
            }
        }
        return responseVerifiedAndVerifiedReasonInitial
    }

    const handleValidateEmaiLAge = async (email: string, firstname: string): Promise<ResponseVerifiedAndVerifiedReason> => {
        const response = await validateEmailAge(email)
        const httpCode = response?.http_code
        const result = response?.result || {}
        if (httpCode >= 200 && httpCode < 300) {
            if (verifyContainsKeys(result, 'EARiskBandID', 'EAReason', 'EAScore')) {
                const EmailAgeObj = new EmailAge(result)
                if (EmailAgeObj.isValidateEmailAge()) {
                    return responseVerifiedAndVerifiedReasonInitial
                } else {
                    if (EmailAgeObj.isInvalidEmailToRegister()) {
                        onOpenOBJ.message = `DENEGADO$$¡ ${firstname}, acerca de su solicitud de registro !$$${email}$$Lo sentimos, tu correo no ah pasado la validacion necesaria. Si nesecitas ayuda puedes escribirnos a atencionalcliente@apuestatotal.com`
                        dispatch(onOpen(onOpenOBJ))
                        resetField('email')
                        resetField('email_code')
                        setRegisterLoading(false)
                        return {
                            isValid: false,
                            verified: false,
                            unverifiedReason: {
                                title: 'Validacion EmailAge',
                                content: onOpenOBJ.message,
                            },
                        }
                    }
                    return {
                        isValid: true,
                        verified: EmailAgeObj.verified,
                        unverifiedReason: {
                            title: 'Validacion EmailAge',
                            content: EmailAgeObj.unverifiedReason.content,
                        },
                    }
                }
            }
        } else {
            return {
                isValid: true,
                verified: false,
                unverifiedReason: {
                    title: 'Validacion EmailAge',
                    content: 'No hay cuotas para EmailAge u Ocurrio algun error desconocido.',
                },
            }
        }
    }

    const postRegister = async ({ email, password }: { email: string; password: string }) => {
        const data = await login({
            email,
            password,
        })
        if ('data' in data && 'user' in data.data) {
            const user = data.data.user
            try {
                await sendUtms(
                    {
                        utmSource,
                        utmMedium,
                        utmCampaign,
                        utmContent,
                    },
                    user.user
                )
            } catch (err) {
                console.log(err)
            }
            const response = await getUserDetails({ session: user.session })
            if ('data' in response) {
                const details = response.data
                const newUser = {
                    ...details.user,
                    session: user.session,
                }
                dispatch(setUser(newUser))
                dispatch(showModalSuccessfully())
            }
        }
    }

    const handleGetTokenReCaptcha = async (): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            window.grecaptcha.ready(function () {
                window.grecaptcha
                    .execute('6LelO0YjAAAAAH88p3C9mz1ByH6vFS3HH6474J6Z', { action: 'submit' })
                    .then(function (token: string) {
                        // Add your logic to submit to your backend server here.
                        resolve(token)
                    })
                    .catch((error: unknown) => {
                        reject(`error token grecatpcha ${getErrorMessage(error)}`)
                    })
            })
        })
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (registerLoading) {
            return
        }
        setRegisterLoading(true)
        const res1 = async () => await handleValidateEmaiLAge(data.email, data.firstname)
        const res2 = async () => handleOnChangeNationalIdType(data.national_id_type)
        const res3 = async () => await handleExistDNIofCalimaco()
        const res4 = async () => await handleExistMobileOfCalimaco(data.mobile)
        const res5 = async () => await handleValidateDocument()
        const res6 = async () => await handleValidateLastNameOfDNI()
        const arrayResponse = [res1, res2, res3, res4, res5, res6]
        let reason = responseVerifiedAndVerifiedReasonInitial
        for (const func of arrayResponse) {
            if (func) {
                const item = await func()
                if (!item.isValid) {
                    setRegisterLoading(false)
                    return
                }
                if (item.isValid) {
                    if (!item.verified) {
                        reason = item
                        break
                    }
                }
            }
        }

        // VERIFICAR

        const date = new Date(data.birthday).toLocaleDateString('es-ES')
        const formatDate = date.split('/').reverse().join('/')

        data.verified = reason.verified
        data.unverifiedReason = reason.unverifiedReason
        data.alias = data.email
        data.currency = cfg.currency
        data.birthday = formatDate
        data.password = `${encodeURIComponent(data.password)}`
        data.confirm_password = `${encodeURIComponent(data.confirm_password)}`

        // TODO:// HABILITAR PARA LIVE
        data.captcha = await handleGetTokenReCaptcha()

        if (Array.isArray(data?.preferences)) {
            data.preferences = data?.preferences?.join(',')
        }

        try {
            const response = await client.register(data)
            if (response?.result === 'OK') {
                // GTM
                GoogleTagManager.push({ event: 'atm.event', eventName: 'register', gift: t(data.promotion), success: 'true' })

                try {
                    await delay(2500)
                    await postRegister({ email: data.email, password: data.password })
                    setRegisterLoading(false)
                    await route.push('/')
                } catch (err) {
                    setRegisterLoading(false)
                }
                return
            }
            if (response?.result === 'error') {
                // GTM
                setRegisterLoading(false)
                const code: string = response.code
                const description: string = response.description

                if (code === '-47') {
                    setError('mobile_code', { type: 'custom', message: description })
                }
                if (code === '-48') {
                    setError('email_code', { type: 'custom', message: description })
                }
                setError('validateCodeAT', { type: 'custom', message: description })
            }
            GoogleTagManager.push({ event: 'atm.event', eventName: 'register', gift: t(data.promotion), success: 'false' })
            setRegisterLoading(false)
            return
        } catch {
            // GTM
            GoogleTagManager.push({ event: 'atm.event', eventName: 'register', gift: t(data.promotion), success: 'false' })

            setRegisterLoading(false)
        }
        setRegisterLoading(false)
    }

    const handleValidateLastNameOfDNI = async (): Promise<ResponseVerifiedAndVerifiedReason> => {
        // throw 'handleValidateLastNameOfDNI'
        setIsLoadingValidateDNI(true)
        const national_id = getValues('national_id')
        const national_id_type = getValues('national_id_type')
        const lastname = getValues('lastname') ? getValues('lastname').trim() : ''
        const firstname = getValues('firstname') ? getValues('firstname').trim() : ''
        const { invalid: isInvalid } = getFieldState('national_id')
        const { invalid: isInvalidNationalIdType } = getFieldState('national_id_type')
        const { invalid: invalidLastname } = getFieldState('lastname')
        const { invalid: invalidFirstname } = getFieldState('firstname')
        if (national_id_type !== 'DNI') {
            setIsLoadingValidateDNI(false)
            return {
                verified: false,
                unverifiedReason: {
                    content: `El tipo de documento que eligio el usuario no es DNI (${national_id_type}).`,
                    title: 'Validacion documento y nombres.',
                },
                isValid: true,
            }
        }
        if (
            !national_id ||
            !national_id_type ||
            !lastname ||
            !firstname ||
            isInvalid ||
            isInvalidNationalIdType ||
            invalidLastname ||
            invalidFirstname
        ) {
            await trigger('national_id')
            setIsLoadingValidateDNI(false)
            return {
                verified: false,
                unverifiedReason: {
                    title: 'Validacion documento y nombres',
                    content: 'documento o nombres invalido',
                },
                isValid: false,
            }
        }

        const reg = /^[0-9]+$/
        if (!reg.test(national_id)) {
            setError('national_id', { type: 'national_id', message: 'Dni inválido' })
            setIsLoadingValidateDNI(false)
            return {
                verified: false,
                unverifiedReason: {
                    title: 'Validacion documento y nombres.',
                    content: 'documento o nombres invalido',
                },
                isValid: false,
            }
        }

        const response = await validateDniandLastname_({
            dni: national_id,
            lastname,
            firstname,
        })
        const httpCode = response?.http_code
        const result = response?.result
        if (httpCode >= 200 && httpCode < 300) {
            setIsLoadingValidateDNI(false)
            return responseVerifiedAndVerifiedReasonInitial
        }
        if (httpCode >= 400 && httpCode < 500) {
            onOpenOBJ.message = `${result || '¡Ups! Algo salió mal'}.`
            dispatch(onOpen(onOpenOBJ))
            setIsLoadingValidateDNI(false)
            return {
                verified: false,
                unverifiedReason: {
                    content: `${result}.`,
                    title: 'Validacion documento y nombres.',
                },
                isValid: false,
            }
        }
        if (httpCode > 500) {
            setIsLoadingValidateDNI(false)
            return {
                isValid: true,
                verified: false,
                unverifiedReason: {
                    content: `No hay cuotas para la api /web/validate/dni.`,
                    title: 'Validacion documento y nombres.',
                },
            }
        }
        setIsLoadingValidateDNI(false)
        return {
            isValid: false,
            verified: false,
            unverifiedReason: {
                content: `Razon desconocida.`,
                title: 'Validacion documento y nombres.',
            },
        }
    }
    const handleValidateDocument = async (): Promise<ResponseVerifiedAndVerifiedReason> => {
        setIsLoadingValidateDNI(true)
        window.fbq('trackCustom', 'NumeroDocumento')
        const { invalid: isInvalid } = getFieldState('national_id')
        const { invalid: isInvalidNationalIdType } = getFieldState('national_id_type')
        const national_id = getValues('national_id')
        const national_id_type = getValues('national_id_type')

        if (national_id_type !== 'DNI') {
            setIsLoadingValidateDNI(false)
            return {
                verified: false,
                unverifiedReason: {
                    content: `El tipo de documento que eligio el usuario no es DNI (${national_id_type}).`,
                    title: 'Validacion documento.',
                },
                isValid: true,
            }
        }
        if (isInvalid || isInvalidNationalIdType) {
            setIsLoadingValidateDNI(false)
            return {
                verified: false,
                unverifiedReason: {
                    title: 'documento invalido',
                    content: 'documento invalido',
                },
                isValid: false,
            }
        }
        if (national_id_type && national_id) {
            const response = await validateDni_(national_id)
            const httpCode = response?.http_code
            const result = response?.result
            if (httpCode >= 200 && httpCode < 300) {
                setIsLoadingValidateDNI(false)
                return responseVerifiedAndVerifiedReasonInitial
            }
            if (httpCode >= 400 && httpCode < 500) {
                onOpenOBJ.message = `Dni inválido$$${result || '¡Ups! Algo salió mal'}.`
                dispatch(onOpen(onOpenOBJ))
                resetField('national_id')
                setIsLoadingValidateDNI(false)
                return {
                    verified: false,
                    unverifiedReason: {
                        content: `${result}.`,
                        title: 'Validacion documento.',
                    },
                    isValid: false,
                }
            }
            if (httpCode > 500) {
                setIsLoadingValidateDNI(false)
                return {
                    verified: false,
                    unverifiedReason: {
                        content: `No hay cuotas para la api /web/validate/dni.`,
                        title: 'Validacion documento.',
                    },
                    isValid: true,
                }
            }
        }
        setIsLoadingValidateDNI(false)
        return {
            verified: false,
            unverifiedReason: {
                content: `Razon desconocida.`,
                title: 'Validacion documento.',
            },
            isValid: false,
        }
    }

    const [countDownEmail, setCountDownEmail] = useState(false)
    const [countDownMobile, setCountDownMobile] = useState(false)

    const handleGenerateCodeEmail = async (runTimer) => {
        const email = getValues('email')
        const firstname = getValues('firstname')
        if (disabledButtonEmail) {
            setFocus('email')
            return
        }
        setIsLoadingEmail(true)
        if (!firstname || !email) {
            onOpenOBJ.message = `Codigo Email.$$Debes completar los siguientes campos:$$- Nombres$$- Correo electrónico`
            dispatch(onOpen(onOpenOBJ))
            setIsLoadingEmail(false)
            return
        }

        const response = await sendEmailCode({ email, name: firstname })
        if (response?.http_code === 200 && response?.result?.includes('Verificar email')) {
            runTimer(30)
            setIsLoadingEmail(false)
            return
        }
        let message = response?.result ? `${t(response?.result)}: ${getDomain(email)}` : 'Ocurrió un error'
        onOpenOBJ.message = `Codigo Email.$$${message}`
        dispatch(onOpen(onOpenOBJ))
        setIsLoadingEmail(false)
        return

        // generateOtpByEmail({ email, name: firstname }).then((res: any) => {
        //     if (res?.data?.result === 'Verificar email') {
        //         runTimer(30)
        //     }
        // })
    }

    const handleGenerateCodeMobile = async (runTimer) => {
        const firstname = getValues('firstname')
        const mobile = getValues('mobile')
        if (!firstname || !mobile) {
            dispatch(
                onOpen({
                    message: `Para generar el codigo Móvil.$$Debes completar los siguientes campos:$$- Nombres$$- Celular`,
                    severity: 'error',
                    open: true,
                    autoHideDuration: 10000,
                })
            )
            return
        }
        setIsLoadingSms(true)

        // const response = await validateMobileCalimaco({ mobile })
        const response = await sendMobileCode({ mobile, name: firstname })
        const result: ResponseResultSendCode = response?.result as any

        if (response?.http_code === 200 && result?.submit === 1) {
            setIsLoadingSms(false)
            runTimer(30)
            return
        }
        setIsLoadingSms(false)
    }

    const handleOnChangeNationalIdType = (nationalIdType): ResponseVerifiedAndVerifiedReason => {
        if (nationalIdType !== 'DNI') {
            return {
                unverifiedReason: {
                    content: `El tipo de documento que eligio el usuario no es DNI (${nationalIdType}).`,
                    title: 'Validacion documento.',
                },
                verified: false,
                isValid: true,
            }
        }
        return responseVerifiedAndVerifiedReasonInitial
    }

    const handleValidateEmail = async (validateDomain = true) => {
        setDisabledButtonEmail(true)
        const email = getValues('email')
        const firstname = getValues('firstname')
        const emailInvalid = getFieldState('email').invalid

        if (!email || !firstname || emailInvalid) {
            return
        }
        if (validateDomain) {
            const isValid = isValidDomain(email)
            if (!isValid) {
                setOpenModal(true)
                return
            }
        }
        const response = await validateEmailCalimaco({ email })
        if ('data' in response) {
            const data = response.data
            if (data.available === 'false') {
                const code = String(data.error_code)
                const error = getError(code)

                let message = '¡Ups! Algo salió mal.'
                if (error) {
                    message = `Correo electrónico duplicado.$$El correo electrónico ya se encuentra registrado:$$- ${email}`
                }
                resetField('email')
                onOpenOBJ.message = `${message}`
                dispatch(onOpen(onOpenOBJ))
                return
            }
            if (data.available === 'true') {
                setDisabledButtonEmail(false)
                const button = document.getElementById('register-ButtonGenerateCode')
                button.click()
            }
        }
    }

    const handleOnClickModal = async (key: 'Si' | 'No') => {
        setOpenModal(false)
        if (key === 'Si') {
            handleValidateEmail(false)
        }
        if (key === 'No') {
            await delay(500)
            setFocus('email')
        }
    }

    return (
        <Styled autoComplete="none" id="register-form-apuesta-total" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
            <StyledModal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
                disablePortal
                disableAutoFocus
                hideBackdrop
                // BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <StyledModalContent>
                        <StyledModalContentMiddle>
                            <WarningIcon color="primary"></WarningIcon>
                            <p>
                                La dirección de correo "{getValues('email')}" es correcta? Si la dirección no es correcta no podrás
                                completar tu registro.
                            </p>
                        </StyledModalContentMiddle>
                        <StyledModalButtons>
                            <Button onClick={() => handleOnClickModal('Si')} variant="contained">
                                Si
                            </Button>
                            <Button onClick={() => handleOnClickModal('No')} variant="contained" color="dark2">
                                No
                            </Button>
                        </StyledModalButtons>
                    </StyledModalContent>
                </Fade>
            </StyledModal>
            <header>
                <h1>REGÍSTRATE AQUÍ</h1>
            </header>

            <CustomFormControl hookFormProps={hookFormProps} name={'national_id_type'}>
                <InputNationalIdType
                    register={register('national_id_type', {
                        onChange: (e) => {
                            trigger('national_id_type')
                            trigger('national_id')
                        },
                    })}
                />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'national_id'}>
                <InputNationalId
                    disabled={!getValues('national_id_type') || isLoadingValidateDNI || isLoadingValidateDNIofCalimaco}
                    loadingEndAdornment={isLoadingValidateDNI || isLoadingValidateDNIofCalimaco}
                    nationalIdType={getValues('national_id_type')}
                    register={register('national_id', {
                        onChange: () => {
                            trigger('national_id')
                            resetField('firstname')
                            resetField('lastname')
                        },
                        onBlur: async () => {
                            await handleValidateDocument()
                            await handleExistDNIofCalimaco()
                        },
                    })}
                />
            </CustomFormControl>

            {isTabletS ? (
                <FormControl>
                    <StyledAlert severity="info">
                        Ingresa tus <strong>nombres</strong> y <strong>apellidos</strong> exactamente como se muestran en tu{' '}
                        <strong>documento</strong>.
                    </StyledAlert>
                </FormControl>
            ) : null}

            <CustomFormControl hookFormProps={hookFormProps} name={'firstname'}>
                <InputFirstname
                    disabled={!getValues('national_id') || isLoadingEmailCalimaco || isLoadingEmail}
                    label={isTabletS ? 'Nombres' : 'Nombres (Igual a como están en tu documento)'}
                    register={register('firstname', {
                        onChange: () => {
                            trigger('firstname')
                        },
                    })}
                />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'lastname'}>
                <InputLastname
                    disabled={!getValues('national_id') || !getValues('firstname') || isLoadingValidateDNI}
                    label={isTabletS ? 'Apellidos' : 'Apellidos (Igual a como están en tu documento)'}
                    register={register('lastname', {
                        onChange: () => {
                            trigger('lastname')
                        },
                        onBlur: handleValidateLastNameOfDNI,
                    })}
                />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'birthday'}>
                <InputDatePicker hookFormProps={hookFormProps} register={register('birthday')} />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'gender'}>
                <InputGender
                    register={register('gender', {
                        onChange: () => {
                            trigger('gender')
                        },
                    })}
                />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'email'}>
                <InputEmail
                    disabled={!getValues('firstname') || isLoadingEmailCalimaco || countDownEmail || isLoadingEmail}
                    loadingEndAdornment={isLoadingEmailCalimaco}
                    register={register('email', {
                        onChange: () => trigger('email'),
                        onBlur: () => handleValidateEmail(),
                    })}
                />
            </CustomFormControl>

            <FormControl className="generate_email">
                <ButtonGenerateCode
                    countDown={(data) => setCountDownEmail(data)}
                    id="register-ButtonGenerateCode"
                    label="GENERAR CÓDIGO EMAIL"
                    loading={isLoadingEmail}
                    onClick={handleGenerateCodeEmail}
                    // disabled={disabledButtonEmail}
                />
            </FormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'email_code'}>
                <InputEmailCode
                    register={register('email_code', {
                        onChange: () => trigger('email_code'),
                        onBlur: () => {
                            trigger('email_code')
                        },
                    })}
                />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'password'}>
                <InputPassword register={register('password', { onChange: () => trigger('password') })} />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'confirm_password'}>
                <InputPasswordConfirm register={register('confirm_password', { onChange: () => trigger('password') })} />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'address'}>
                <InputAddress register={register('address', { onChange: () => trigger('address') })} />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'state'}>
                <InputState
                    itemKeyValue="state"
                    items={deparments}
                    itemsKeyLabel="name"
                    label="Departamento"
                    register={register('state', {
                        onChange: handleChangeState,
                    })}
                />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'province'}>
                <InputState
                    disabled={!getValues('state')}
                    itemKeyValue="province"
                    items={provinces}
                    itemsKeyLabel="name"
                    label="Provincia"
                    loading={loadingState}
                    register={register('province', {
                        onChange: handleChangeProvinces,
                    })}
                />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'city'}>
                <InputState
                    disabled={!getValues('province')}
                    itemKeyValue="city"
                    items={cities}
                    itemsKeyLabel="name"
                    label="Distrito"
                    loading={loadingState || loadingProvince}
                    register={register('city', {
                        onChange: () => trigger('city'),
                    })}
                />
            </CustomFormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'mobile'}>
                <InputMobile
                    //  MOBILE
                    disabled={!getValues('firstname') || isLoadingSms || isLoadingMobileCalimaco || countDownMobile}
                    register={register('mobile', { onChange: () => trigger('mobile') })}
                />
            </CustomFormControl>

            <FormControl className="generate_mobile">
                <ButtonGenerateCode
                    countDown={(data) => setCountDownMobile(data)}
                    // disabled={!getValues('mobile')}
                    id="register-ButtonGenerateCodeMobile"
                    label="GENERAR CÓDIGO CELULAR"
                    loading={isLoadingMobileCalimaco || isLoadingSms}
                    onClick={handleGenerateCodeMobile}
                />
            </FormControl>

            <CustomFormControl hookFormProps={hookFormProps} name={'mobile_code'}>
                <TextField
                    label="Codigo"
                    {...register('mobile_code', {
                        onChange: () => {
                            trigger('email_code')
                        },
                        onBlur: () => {
                            trigger('email_code')
                        },
                    })}
                    inputProps={{
                        maxLength: 6,
                    }}
                    onKeyPress={(event) => {
                        if (errors?.validateCodeAT) {
                            clearErrors('validateCodeAT')
                        }
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault()
                        }
                    }}
                />
            </CustomFormControl>

            {isLoadingAgentShop ? (
                <LoadingDefault loading={isLoadingAgentShop}></LoadingDefault>
            ) : (
                agent &&
                dataShops?.shops?.length > 0 && (
                    <FormControlS
                        className={classnames('--tienda', {
                            invalid: getFieldState('agent_shop').invalid,
                            valid: getFieldState('agent_shop').isTouched && !getFieldState('agent_shop').invalid,
                        })}
                    >
                        <div style={{ position: 'relative' }}>
                            <InputLabel>Cúentanos en qué sala juegas...</InputLabel>
                            <Select
                                defaultValue=""
                                label="Cúentanos en qué sala juegas..."
                                size="small"
                                {...register('agent_shop', {
                                    onBlur: async () => await trigger('agent_shop'),
                                })}
                                {...MenuProps}
                            >
                                {dataShops?.shops?.map(({ shop, name }, i) => {
                                    return (
                                        <MenuItem key={i} value={String(shop)}>
                                            {name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </div>
                        <ErrorMessage
                            errors={getFirstError()}
                            name="state"
                            render={({ message }) => <RegisterErrorStyled>{message}</RegisterErrorStyled>}
                        />
                    </FormControlS>
                )
            )}
            {isLoadingPref ? (
                <LoadingDefault loading={isLoadingPref}></LoadingDefault>
            ) : (
                agent &&
                dataPref?.preferences?.length > 0 && (
                    <FormControlPrefS>
                        <FormLabelPrefS>¿Qué tipo de juegos prefieres?</FormLabelPrefS>
                        <FormGroupS>
                            {dataPref?.preferences?.map((item, i) => {
                                return (
                                    <FormControlLabel
                                        control={<Checkbox {...register('preferences')} value={item?.preference} />}
                                        key={i}
                                        label={item?.name}
                                    />
                                )
                            })}
                        </FormGroupS>
                    </FormControlPrefS>
                )
            )}

            <DynamicRegisterControlsGift getFirstError={getFirstError} promotions={promotions} register={register} setValue={setValue} />
            <DynamicRegisterControlsTermp getFirstError={getFirstError} register={register} />
            {errors.validateCodeAT && (
                <FormControlS>
                    <AlertS severity="error">
                        <RegisterErrorStyled>{errors.validateCodeAT.message}</RegisterErrorStyled>
                    </AlertS>
                </FormControlS>
            )}
            <FormControlS>
                <ButtonS disabled={registerLoading} loading={registerLoading} title="REGISTRAR" type="submit" variant="contained">
                    REGISTRAR
                </ButtonS>
            </FormControlS>
        </Styled>
    )
}

export default Form
const StyledModalContentMiddle = styled.div`
    display: flex;
    gap: 10px;
    > svg {
        margin-top: 5px;
    }
    > p {
        color: #4f4f4f;
    }
`
const StyledModalButtons = styled.div`
    display: flex;
    gap: 10px;
    justify-content: end;
    padding: 0 20px;
    > button {
        text-transform: initial;
        padding: 5px 10px;
    }
`
const StyledModalContent = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    padding: 40px 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.23);
    max-width: 500px;
    margin: auto;

    > p {
        font-size: 0.95rem;
    }
`
const StyledModal = styled(Modal)`
    && {
        position: fixed;
        left: 0;
        right: 0;
        top: 1rem;
        padding: 1rem;
        ${MEDIA_QUERIES.min_width.tabletL} {
            position: absolute;
            top: 20%;
        }
    }
`
const StyledAlert = styled(Alert)`
    & {
        strong {
            font-weight: 500;
        }
    }
`

const FormLabelPrefS = styled.div`
    & {
        color: #373737;
        font-size: 0.95rem;
    }
`
const FormControlPrefS = styled(FormControl)`
    & {
        padding-top: 1rem;
        padding-bottom: 0.5rem;
    }
`
const FormGroupS = styled(FormGroup)`
    & {
        display: grid;
        padding-top: 5px;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        .MuiTypography-root {
            color: #3e3e45;
            font-size: 0.9em;
        }
        svg {
            font-size: 1.4rem;
        }
    }
`
const FormControlS = styled(FormControl)`
    & {
        label {
            font-size: 0.9em;
            padding-right: 0.5rem;
            transform-origin: left center;
        }

        .MuiInputAdornment-root {
            width: 40px;
            height: 100%;
            max-height: max-content;
            margin-left: 0;
            display: flex;
        }
        .MuiButtonBase-root {
            font-size: 0.8em;
            padding: 0.5rem;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            svg {
                font-size: inherit;
            }
        }
        &.valid {
            label {
                color: #494952;
            }
        }

        .MuiFormLabel-root {
            top: 50%;
            transform: translate(1rem, -50%) scale(1);
            color: #494952;

            &.MuiFormLabel-filled {
                transform: translate(1rem, calc(-100% - 0.7em)) scale(0.75);
            }
            &.Mui-focused {
                transform: translate(1rem, calc(-100% - 0.7em)) scale(0.75);
            }
        }
        .MuiInputBase-input {
            padding: 0.7em 1rem;
            background: #ffffff;
            border-radius: 0.4rem;
            width: auto;
            flex: 1;
        }
        .MuiOutlinedInput-root {
            border-radius: 0.4rem;
            color: #3e3e45;
            font-size: 0.8em;
            background-color: white;
            padding: 0;
            width: 100%;
        }
    }
`
const ButtonS = styled(LoadingButton)`
    & {
        cursor: pointer;
        font-size: 1em;
        padding: 0.8em 1em;
        border-radius: 1rem;
        width: fit-content;
        width: 100%;
        max-width: 300px;
        align-self: center;
    }
`
const AlertS = styled(Alert)`
    & {
        .MuiAlert-message {
            display: flex;
            align-items: center;
            p {
                font-size: 1em;
            }
        }
    }
`
const RegisterErrorStyled: any = styled('p')`
    font-size: 0.7em;
    color: red;
    margin-left: 1rem;

    animation-name: fadeLeft;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    position: relative;
    @keyframes fadeLeft {
        from {
            bottom: -5px;
            opacity: 0;
        }
        to {
            bottom: 0;
        }
    }
`
const Styled = styled.form`
    max-width: 800px;
    margin: auto;

    & {
        .MuiFormControl-root {
            /* background: #ffffff; */
            border-radius: 0.4rem;
        }
    }
    ${gridFormCss()}
    >  header {
        display: flex;
        justify-content: center;
        h1 {
            text-align: center;
            font-size: clamp(1.5em, 1.3vw, 2em);
            font-weight: 700;
        }
    }
`
function gridFormCss() {
    return css`
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 0.75rem;
        gap: 0.7em;
        > * {
            grid-column: span 6;
            &.national_id_type,
            &.national_id,
            &.email_code,
            &.generate_email,
            &.generate_mobile,
            &.mobile_code {
                grid-column: span 3;
            }

            ${MEDIA_QUERIES.min_width.mobileS} {
                &.generate_mobile,
                &.email_code,
                &.generate_email {
                    grid-column: span 3;
                }
            }
            ${MEDIA_QUERIES.min_width.mobileM} {
                &.birthday {
                    grid-column: span 3;
                }
                &.gender {
                    grid-column: span 3;
                }
            }
            ${MEDIA_QUERIES.min_width.mobileL} {
                &.confirm_password,
                &.password,
                &.province,
                &.state {
                    grid-column: span 3;
                }
                &.generate_mobile,
                &.mobile,
                &.mobile_code {
                    grid-column: span 2;
                }
            }
            ${MEDIA_QUERIES.min_width.tabletS} {
                &.firstname {
                    grid-column: span 3;
                }
                &.lastname {
                    grid-column: span 3;
                }
                &.state {
                    grid-column: span 2;
                }
                &.province {
                    grid-column: span 2;
                }
                &.city {
                    grid-column: span 2;
                }
            }
            ${MEDIA_QUERIES.min_width.tabletL} {
                &.email {
                    grid-column: span 3;
                }
                &.generate_email {
                    grid-column: span 1;
                    width: 152.42343%;
                }
                &.email_code {
                    grid-column: span 2;
                    width: 75%;
                    margin-left: 25%;
                }
            }
        }
    `
}
