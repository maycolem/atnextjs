/* eslint-disable no-throw-literal */
import React, { useEffect, useState } from 'react'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ProviderAt } from 'services/ProviderAtService'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { LoadingButton } from '@mui/lab'
import { Session } from 'services/Session'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useDispatch } from 'react-redux'
import { setUser } from 'states/features/slices/userSlice'
import { CalimacoClient } from '@calimaco/base'
import { PATHS } from 'routes/paths/PATHS'
import { GoogleTagManager } from 'google/TagManager'
import { useTranslation } from 'react-i18next'
import { unescape } from 'lodash'
import cfg from 'config/config'
import hexAlpha from 'hex-alpha'

// import * as encrypt from "ncrypt-js";
// import encrypt from "ncrypt-js";
// import { encrypt, decrypt } from "ncrypt-js";

const Form = ({ setShowRecuperar }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const providerAt = new ProviderAt()
    const route = useRouter()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const client = new CalimacoClient(cfg)
    const { register: login, handleSubmit } = useForm({
        mode: 'onSubmit',
        // resolver: yupResolver(LoginSchema),
        criteriaMode: 'all',
        defaultValues: {
            username: '',
            password: '',
        },
    })
    useEffect(() => {
        return () => {
            setLoading(false)
        }
    }, [])
    const onSubmit = async (data) => {
        // event.preventDefault()
        setLoading(true)
        try {
            const res = await client.login(data.username, data.password)

            if (res && res?.result?.toLowerCase() === 'ok') {
                localStorage?.removeItem('IsLogout')
                const resUserDetail = await providerAt.userDetail(res?.user?.session)

                const user = {
                    ...resUserDetail.user,
                    session: res?.user?.session,
                }
                const userLogin = res?.user?.user

                const CryptoJS = require('crypto-js')
                const decodeUser = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userLogin))

                // LOGIN OK
                GoogleTagManager.push({
                    event: 'atm.event',
                    eventName: 'login',
                    hash_id: decodeUser,
                    success: 'true',
                    option: 'ingresa',
                })

                // const encode = CryptoJS.enc.Base64.parse('Hola').toString(CryptoJS.enc.Utf8)

                if (user && user?.groups) {
                    const autoexclude = user?.groups
                    if (autoexclude?.includes(15)) {
                        setError('Su cuenta esta autoexcluida')
                        return
                    }
                }
                if (user && user?.regulatory_status === 'CERRADO') {
                    setError('Su cuenta ah sido desabilitada de nuestra plataforma, comunicate con soporte.')
                    return
                }

                const ____user = Session().setUser(user)
                dispatch(setUser(____user))

                const gameNameAsPath = window.sessionStorage.getItem('REDIRECT_GAME_NAME')
                if (gameNameAsPath) {
                    window.sessionStorage.removeItem('REDIRECT_GAME_NAME')
                    await route.push(gameNameAsPath)
                    return
                }
                if (route.query.returnUrl) {
                    await route.push(route.query.returnUrl)
                    return
                }
                if (route.backReferrer) {
                    if (route.backReferrer !== route.asPath) {
                        await route.push(route.backReferrer)
                        return
                    }
                    if (route.backReferrer === '/login') {
                        await route.push(PATHS.HOME.url)
                        return
                    }
                }
                // await route.push(PATHS.HOME.url)

                return
            } else {
                // const code = res.code
                // const response = await validateCode({ code })

                if (res?.code?.toString() === '-26') {
                    setError('Tu cuenta ha sido suspendida.')
                } else {
                    setError(t(res?.description))
                }

                // LOGIN FALSE
                GoogleTagManager.push({
                    event: 'atm.event',
                    eventName: 'login',
                    hash_id: '',
                    success: 'false',
                    option: 'ingresa',
                })
            }
        } catch (e) {
            setLoading(false)
        } finally {
            setLoading(false)
        }
        setLoading(false)
    }

    const handleOpen = () => {
        // dispatch(setOpen())
        // dispatch(onClose())

        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'login',
            hash_id: '',
            success: 'false',
            option: 'olvidaste tu password',
        })

        setShowRecuperar(true)
    }

    return (
        <>
            <FormS onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <TextFieldS
                        // autoComplete='off'
                        fullWidth
                        id="usuario"
                        label="Usuario o Email"
                        size="small"
                        type="text"
                        variant="outlined"
                        {...login('username')}
                    />
                </FormControl>
                <FormControl>
                    <TextFieldS
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        className="text-gray-700"
                        fullWidth
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        {...login('password')}
                    />
                </FormControl>
                <RecoveryS>
                    <p onClick={() => handleOpen()} title="Ir a olvidaste tu contraseña.">
                        ¿Olvidaste tu contraseña?
                    </p>
                </RecoveryS>
                <div>
                    <InvalidS>
                        <span>{error && <p>{error}</p>}</span>
                    </InvalidS>

                    <StyledButton disabled={loading} loading={loading} title="INGRESA" type="submit">
                        INGRESA
                    </StyledButton>
                </div>
            </FormS>
        </>
    )
}

export default Form
const RecoveryS = styled.div`
    & {
        margin-top: 1em;
        text-align: right;
        p {
            font-size: 0.9em;
            color: #6f7070;
            cursor: pointer;
        }
    }
`

const InvalidS = styled.div`
    & {
        display: grid;
        place-items: center;
        color: #6f7070;
        font-size: 1em;
        p {
            font-size: 0.9em;
            color: #ed1c24;
            font-weight: bold;
        }
    }
`

const FormS = styled('form')`
    & {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
`
const TextFieldS = styled(TextField)`
    & {
        background: ${(p) => p.theme.layout.login.formInput.background};
        border-radius: 10px;
        /* label {
      transform: translate(14px, 1rem) scale(1);
    } */
        &::-ms-reveal {
            display: none;
        }
        .MuiOutlinedInput-root {
            font-size: 1em;
        }

        label {
            top: 50%;
            transform: translate(14px, -50%) scale(1);
            color: ${(p) => hexAlpha(p.theme.contrastText, 0.7)};
            font-size: 1em;
            &.MuiFormLabel-filled,
            &.Mui-focused {
                transform: translate(14px, calc(-150% + 0.2em)) scale(0.75);
            }
        }

        fieldset {
            border-radius: 8px;
        }
        input {
            padding: 10px 14px;
            border-radius: 10px;

            font-weight: 400;
            font-size: 1em;
            &::-ms-reveal {
                display: none;
            }
        }

        svg {
            font-size: 18px;
        }
    }
`
const StyledButton = styled(LoadingButton)`
    && {
        cursor: pointer;
        margin-top: 0.6em;
        background: black;
        width: 100%;
        color: white;
        padding: 10px;
        border-radius: 10px;
        font-size: 1em;
        transition: 0.15s;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        :hover {
            background: black;
            color: white;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
        }
        .MuiCircularProgress-root {
            color: white;
        }
        &.MuiLoadingButton-loading {
            color: transparent;
        }
    }
`

// [{ code: -1, message: 'dasmdosamdkamsd' },{ code: -2, message: 'dasmdosamdkamsd' }]
