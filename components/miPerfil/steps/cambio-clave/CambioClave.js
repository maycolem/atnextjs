/* eslint-disable no-undef */
import styled from '@emotion/styled'
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, FormControl, TextField, Button, FormLabel, Modal } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useUpdatePasswordMutation } from 'states/calimaco/calimacoDataApi'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import CloseIcon from '@mui/icons-material/Close'

const CambioClave = ({ className }) => {
    const [updatePassword, { isLoading: isLoadingPassword }] = useUpdatePasswordMutation()
    const [showPassword, setShowPassword] = useState(false)
    const user = useSelector(userSelector)
    const [smsAlert, setSmsAlert] = useState(false)
    const [open, setOpen] = useState(false)
    const { register, getFieldState, formState, handleSubmit, reset } = useForm()
    const { errors } = formState

    const dtCancelar = async (e) => {
        setOpen(false)
    }

    const onSubmit = async (data) => {
        if (data.new_password !== data.new_password_repeat) {
            setOpen(true)
            setSmsAlert('¡Las contraseñas deben coincidir!')
            return
        }

        const res = await updatePassword({
            company: 'ATP',
            session: user?.session,
            old_password: data.old_password,
            new_password: data.new_password_repeat,
        })

        if (res.data.result === 'OK') {
            setOpen(true)
            setSmsAlert('¡Tu contraseña fue actualizada con éxito!')
            reset()
        } else {
            setOpen(true)
            setSmsAlert('¡No se puede actualizar el password!')
            reset()
        }
    }

    return (
        <CambiarPasswordS id="scroll-page">
            <div className="Contenedor2">
                <FormContentS>
                    <FormS onSubmit={handleSubmit(onSubmit)}>
                        <FormControl
                            className={classNames('--password', {
                                invalid: getFieldState('password').invalid,
                                valid: getFieldState('password').isTouched && !getFieldState('password').invalid,
                            })}
                        >
                            <FormLabel>Constraseña actual *</FormLabel>
                            <TextField
                                {...register('old_password', { required: true })}
                                InputProps={{
                                    type: showPassword ? 'text' : 'password',
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                                inputProps={{ autoComplete: 'chrome-off' }}
                                type={'password'}
                                variant="outlined"
                            />
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <RegisterErrorStyled key={type}>{message}</RegisterErrorStyled>
                                    ))
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Constraseña nueva *</FormLabel>
                            <TextField
                                {...register('new_password', { required: true })}
                                InputProps={{
                                    type: showPassword ? 'text' : 'password',
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                                id="chrome-off"
                                inputProps={{ autoComplete: 'chrome-off' }}
                                type={'password'}
                                variant="outlined"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Confirmar nueva contraseña *</FormLabel>
                            <TextField
                                {...register('new_password_repeat', { required: true })}
                                InputProps={{
                                    type: showPassword ? 'text' : 'password',
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                                id="chrome-off"
                                type={'password'}
                                variant="outlined"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel> </FormLabel>
                            <Button color="primary" type="submit" variant="contained">
                                Guardar Cambios
                            </Button>
                        </FormControl>
                    </FormS>
                </FormContentS>
            </div>

            <ModalS onClose={() => setOpen(false)} open={open}>
                <ModalWrapperS>
                    <BackAndCloseS>
                        <ButtonS></ButtonS>
                        <LocationS> </LocationS>
                        <Button className="close" onClick={dtCancelar} variant="contained">
                            <CloseIcon></CloseIcon>
                        </Button>
                    </BackAndCloseS>
                    <MethodsPaymentS className={className}>
                        <div className="TextModalAuto">{smsAlert}</div>
                        <div className="ContenedorBotones"></div>
                    </MethodsPaymentS>
                </ModalWrapperS>
            </ModalS>
        </CambiarPasswordS>
    )
}

export default CambioClave
const CambiarPasswordS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: #fafafa;

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

            align-items: center;
            header {
                display: flex;

                gap: 1rem;
                color: ${(p) => p.theme.palette.alternate5.main};
            }
        }
        .Contenedor2 {
            display: grid;
            grid-template-columns: 500px;

            gap: 1rem;
            padding: 1rem;
        }
    }

    .Contenedor1 {
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
        padding: 1.2rem;
    }
    .Secciones {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        text-align: left;
    }
`
const FormS = styled.form`
    & {
        display: grid;
        grid-gap: 1.5rem;
        grid-template-columns: repeat(1, 1fr);

        > div {
            grid-column: span 2;
        }
    }
`
const RegisterErrorStyled = styled('p')`
    font-size: clamp(0.75em, 1.5vw, 0.8em);
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
    min-height: 100vh;

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
    background: ${(p) => p.theme.palette.alternate12.main};
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
