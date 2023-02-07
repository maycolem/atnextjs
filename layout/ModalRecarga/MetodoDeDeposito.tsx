import styled, { css } from 'styled-components'
import { LoadingButton } from '@mui/lab'
import { Alert, Button, Checkbox, FormControl, FormLabel, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { useGetPaymentDepositMutation } from 'states/api/calimaco/payment'
import * as yup from 'yup'
import FormHelperText from '@mui/material/FormHelperText'
import { ModalRecargaMethodSelector, setFrame } from 'states/slice/ModalRecarga'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import classNames from 'classnames'
import { PATHS } from 'routes/paths/PATHS'
import TeleServicios from 'components/recargar/TeleServicios'
import Link from 'next/link'
import { onOpen } from 'states/slice/layout/SnackBar'
import ScrollContainer from 'react-indiana-drag-scroll'
import { dtRecargaBack, dtRecargar, dtRecargarButtonTab, dtRecargaClick, dtRecargaTerms } from '@layout/dt'

interface Props {
    onBack: (a, b) => void
    onNext: () => void
}
export const MetodoDeDeposito = ({ onBack, onNext }: Props) => {
    const [amount, setAmount] = useState('')
    const [getPayment, { data, isLoading: isLoadingPaymentDeposit, isSuccess }] = useGetPaymentDepositMutation()
    const [errors, setErrors] = useState(null)
    const user = useSelector(userSelector)
    const id = Math.random().toString()

    const dispatch = useDispatch()
    const { name, method, img, limits } = useSelector(ModalRecargaMethodSelector)
    const [activeButton, setActiveButton] = useState(null)
    const [checkboxNiubiz, setCheckboxNiubis] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const handlePayment = async (amount: number) => {
        if (!amount || amount === 0) return
        try {
            dtRecargar('recargar', amount, name)
            const minamount = Number(limits?.min) / 100
            const maxamount = Number(limits?.max) / 100
            await yup
                .number()
                .min(minamount, 'Monto minimo S/ ' + minamount.toFixed(2))
                .max(maxamount, 'Monto maximo S/ ' + maxamount.toFixed(2))
                .validate(amount)
            await getPayment({ company: user.company, amount: amount * 100, session: user.session, method })
        } catch (error) {
            setErrors(error.errors)
            dtRecargar('recargar - error', amount, name)
        }
    }

    useEffect(() => {
        if (method === 'NIUBIZ' && !checkboxNiubiz) {
            setDisabled(true)
            return
        }
        if (amount === '' || amount.toString() === '0') {
            setActiveButton(null)
            setDisabled(true)
            return
        }
        if (amount || checkboxNiubiz) {
            setDisabled(false)
        }
    }, [method, checkboxNiubiz, amount])

    useEffect(() => {
        if (data?.result === 'error') {
            dispatch(setFrame(''))
            dispatch(
                onOpen({
                    message: 'Método de depósito no disponible, por favor elige otro.',
                    severity: 'error',
                    autoHideDuration: 2500,
                })
            )
            return
        }
        if (!data?.data?.redirectionURL) {
            return
        }
        if (data?.data?.redirectionURL) {
            dispatch(setFrame(data?.data?.redirectionURL))
            onNext()
        }
    }, [isSuccess, data])

    const onClickButtonPred = (indexActiveButton: number, amount: number, name: string) => () => {
        setActiveButton(indexActiveButton)
        setAmount(String(amount))
        dtRecargarButtonTab(amount, name)
    }
    const handleOnBackMetodos = () => {
        onBack(name, 'regresar a metodo de pago')
    }
    if (!name || !method) return <div></div>

    return (
        <MetodoDeDepositoS $ATPAYMENTSERVICE={method === 'ATPAYMENTSERVICE'}>
            {method === 'ATPAYMENTSERVICE' ? (
                <TeleServicios></TeleServicios>
            ) : (
                <div className="wrapper">
                    <BannerS>{!img ? <div className="method">{name}</div> : <img src={img}></img>}</BannerS>
                    <FormS
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        <FormLabel>Monto a depositar</FormLabel>
                        <ScrollContainer>
                            <FormHeaderS>
                                <Button
                                    className={classNames('botonMontoS2', { activeButton: activeButton === 1 })}
                                    onClick={onClickButtonPred(1, 50, name)}
                                >
                                    S/ 50
                                </Button>
                                <Button
                                    className={classNames('botonMontoS2', { activeButton: activeButton === 2 })}
                                    onClick={onClickButtonPred(2, 100, name)}
                                >
                                    S/ 100
                                </Button>
                                <Button
                                    className={classNames('botonMontoS2', { activeButton: activeButton === 3 })}
                                    onClick={onClickButtonPred(3, 300, name)}
                                >
                                    S/ 300
                                </Button>
                                <Button
                                    className={classNames('botonMontoS2', { activeButton: activeButton === 4 })}
                                    onClick={onClickButtonPred(4, 500, name)}
                                >
                                    S/ 500
                                </Button>
                            </FormHeaderS>
                        </ScrollContainer>
                        {method === 'NIUBIZ' && (
                            <FormControlCheckS>
                                <Checkbox
                                    id="#checkboxterminosModal"
                                    onChange={() => {
                                        setCheckboxNiubis(!checkboxNiubiz)
                                    }}
                                    onClick={() => dtRecargaTerms(name, checkboxNiubiz)}
                                    value={checkboxNiubiz}
                                />
                                <CheckboxLabelS>
                                    <label htmlFor={'#checkboxterminosModal'}>Acepto los</label>{' '}
                                    <Link href={PATHS.REGLAMENTO_DEL_JUEGO.url} target="_blank">
                                        términos y condiciones
                                    </Link>
                                </CheckboxLabelS>
                            </FormControlCheckS>
                        )}
                        <FormContentS>
                            <CurrencyS>
                                <span className="lineStyle">S/</span>
                            </CurrencyS>
                            <FormControlS>
                                <div className="wrapper">
                                    <TextFieldS
                                        autoComplete={id}
                                        error={!!errors}
                                        helperText={''}
                                        hiddenLabel
                                        id={id}
                                        name={id}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const value = e.target.value
                                                .replace(/[^0-9.]/g, '')
                                                .replace(/(\..*?)\..*/g, '$1')
                                                .replace(/^0[^.]/, '0')
                                            setAmount(value)
                                        }}
                                        placeholder="Ingrese el monto aquí"
                                        size="small"
                                        value={amount}
                                    ></TextFieldS>
                                    <LoadingButtonS
                                        color="secondary"
                                        disabled={disabled}
                                        loading={isLoadingPaymentDeposit}
                                        onClick={async () => await handlePayment(Number(amount))}
                                        variant="contained"
                                    >
                                        RECARGAR
                                    </LoadingButtonS>
                                </div>
                            </FormControlS>
                        </FormContentS>
                        <RegisterErrorStyled>{errors}</RegisterErrorStyled>
                        <FormHelperTextS id="component-helper-text">
                            Mínimo{' '}
                            {new Intl.NumberFormat('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                maximumFractionDigits: 2,
                            }).format(Number(limits?.min) / 100)}{' '}
                            y Máximo{' '}
                            {new Intl.NumberFormat('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                maximumFractionDigits: 2,
                            }).format(Number(limits?.max) / 100)}
                            *
                        </FormHelperTextS>
                    </FormS>
                    {method === 'PROMETEO' ? (
                        <StyledAviso>
                            <i>Algunas transacciones pueden estar sujetas a comisiones por parte de tu banco.</i>
                        </StyledAviso>
                    ) : null}
                    {method === 'KUSHKI' ? (
                        <AlertStyled severity="info">
                            Recuerda activar o verificar que tu tarjeta esté activa para compras en línea
                        </AlertStyled>
                    ) : null}

                    <BackMethodsS onClick={handleOnBackMetodos}>
                        <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                        <span>Regresar a métodos de pago</span>
                    </BackMethodsS>
                </div>
            )}
        </MetodoDeDepositoS>
    )
}
interface PropsStyled {
    $ATPAYMENTSERVICE?: boolean
}
const AlertStyled = styled(Alert)`
    && {
        svg {
            font-size: 2rem;
        }
    }
`
const StyledAviso = styled.div`
    color: ${(p) => p.theme.palette.alternate19.main};
    font-size: 14px;
`
const FormControlCheckS = styled(FormControl)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`
const CheckboxLabelS = styled.div`
    & {
        > label {
            cursor: pointer;
        }
        > a {
            color: ${(p) => p.theme.palette.info4.main};
        }
    }
`
const TextFieldS = styled(TextField)`
    & {
        background: white;
        > div > input {
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
                &[type='number'] {
                    -moz-appearance: textfield;
                }
            }
        }
    }
`
const FormHelperTextS = styled(FormHelperText)`
    && {
        font-size: 1rem;
    }
`
const RegisterErrorStyled = styled('p')`
    font-size: 0.8em;
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
const FormControlS = styled(FormControl)`
    & {
        fieldset {
            border: 0;
        }

        .MuiFormControl-root {
            min-height: 100%;
            flex: 1;
            .MuiOutlinedInput-root {
                flex: 1;
                font-size: 1.9453543rem;
                input {
                    &::placeholder {
                        font-size: 1rem;
                        transform: translateY(-6px);
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
`
const CurrencyS = styled.div`
    & {
        position: absolute;
        right: calc(100% + 3px);
        top: 50%;
        transform: translateY(-50%);
    }
`
const MetodoDeDepositoS = styled.div<PropsStyled>`
    /* background: ${(p) => p.theme.palette.alternate12.main}; */
    min-height: 100%;
    /* padding: 1rem 40px; */
    padding: 1rem 35px;
    padding-right: 15px;
    ${MEDIA_QUERIES.min_width.tabletS} {
        padding: 1rem;
    }
    & {
        > .wrapper {
            max-width: 400px;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
    & {
        ${(p) => {
            if (p.$ATPAYMENTSERVICE) {
                return css`
                    padding: 0rem;
                `
            }
        }}
    }
`
const FormHeaderS = styled.div`
    display: flex;
    gap: 0.7rem;
    margin-bottom: 0.5rem;
    padding: 3px;
    & {
        button {
            flex: 1;
            font-size: 1rem;
            padding: 0.5rem;
            white-space: nowrap;
            background: white;
            outline: 1px solid #ffc700;
            border-radius: 6px;
            color: #6f6d6d;
            font-weight: 400;
            font-size: 1rem;
        }
        button.activeButton {
            background: #ffc700;
            font-weight: 500;
            outline: 2px solid ${(p) => p.theme.palette.warning.main};
        }
    }
`
const LoadingButtonS = styled(LoadingButton)`
    & {
        padding: 1em;
        white-space: nowrap;
        text-overflow: ellipsis;
        /* background: #ffc700; */
        color: #000000;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 5px;
        display: flex;
        align-items: center;
        text-align: center;
    }
`
const BannerS = styled.div`
    & {
        padding: 1rem;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: fit-content;
            max-width: 200px;
        }
        .method {
            text-align: center;
            text-transform: uppercase;
            margin-top: 20px;
            margin-bottom: 20px;
            font-weight: 900;
            font-size: 1.2em;
            color: ${(p) => p.theme.palette.dark.main};
        }
    }
`
const FormContentS = styled.div`
    & {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
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
`
const FormS = styled.form`
    & {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        header {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: ${(p) => p.theme.palette.alternate5.main};
        }
    }
`

const BackMethodsS = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    padding: 1rem 0;
    padding-right: 2rem;
    width: fit-content;
    transition: 250ms;
    color: #767676;
    font-size: 1em;
    :hover {
        color: #ec3323;
    }
`
