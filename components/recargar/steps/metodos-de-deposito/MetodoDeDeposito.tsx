import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetPaymentDepositMutation } from 'states/api/calimaco/payment'
import { userSelector } from 'states/features/slices/userSlice'
import { useRouter } from 'next/router'
import { ModalRecargaMethodSelector, setFrame } from 'states/slice/ModalRecarga'
import { PATHS } from 'routes/paths/PATHS'
import * as yup from 'yup'
import { Alert, Button, Checkbox, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { LoadingButton } from '@mui/lab'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import classNames from 'classnames'
import Link from 'next/link'
import { onOpen } from 'states/slice/layout/SnackBar'
import { GoogleTagManager } from 'google/TagManager'

const MetodoDeDeposito = () => {
    const [amount, setAmount] = useState('')
    const [getPayment, { data, isLoading: isLoadingPaymentDeposit, isSuccess }] = useGetPaymentDepositMutation()
    const [checkboxNiubiz, setCheckboxNiubis] = useState(false)
    const [errors, setErrors] = useState(null)
    const user = useSelector(userSelector)
    const r = useRouter()
    const id = Math.random().toString()
    const dispatch = useDispatch()
    const { name, method, img, limits } = useSelector(ModalRecargaMethodSelector)
    const [activeButton, setActiveButton] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const dtRecargaBack = (name, back) => {
        GoogleTagManager.push({
            event: 'atm.event',
            recharge_option: back.toLowerCase(),
            eventName: 'recarga_' + name.toLowerCase().replace(' ', '_').replace(' ', '_'), // slice 14
            action: 'click',
        })
    }
    const dtRecargaTerms = (name) => {
        GoogleTagManager.push({
            event: 'atm.event',
            option: 'acepto terminos y condiciones',
            eventName: 'recarga_' + name.toLowerCase().replace(' ', '_').replace(' ', '_'), // slice 20
            action: checkboxNiubiz ? 'uncheck' : 'check', // slice 20
        })
    }
    const handlePayment = async () => {
        const parsedAmount = Number(amount)
        if (!parsedAmount || parsedAmount === 0) return
        try {
            GoogleTagManager.push({
                event: 'atm.event',
                amount: 's/ ' + parsedAmount, // slice 16
                eventName: 'recarga_' + name.toLowerCase().replace(' ', '_').replace(' ', '_'), // slice 20
                option: 'recargar',
                action: 'click',
            })
            const minamount = Number(limits?.min) / 100
            const maxamount = Number(limits?.max) / 100
            await yup
                .number()
                .min(minamount, 'Monto minimo S/ ' + minamount.toFixed(2))
                .max(maxamount, 'Monto maximo S/ ' + maxamount.toFixed(2))
                .validate(parsedAmount)
            const data = await getPayment({ company: user.company, amount: parsedAmount * 100, session: user.session, method })
        } catch (error) {
            setErrors(error.errors)
            GoogleTagManager.push({
                event: 'atm.event',
                amount: 's/ ' + parsedAmount,
                eventName: 'recarga_' + name.toLowerCase().replace(' ', '_').replace(' ', '_'), // slice 16 - 19
                option: 'recargar - error',
                action: 'click',
            })
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
        if (data?.data?.redirectionURL) {
            // BORRAR HASH
            // dispatch(set(data?.data?.hash))
            dispatch(setFrame(data?.data?.redirectionURL))
            r.push({
                pathname: PATHS.CUENTA_RECARGA_CONFIRMAR.url,
                query: {
                    methodName: method,
                    // BORRAR HASH
                    // hash: data?.hash,
                },
            })
        }
    }, [isSuccess, data])

    const onClickButtonPred = (n, _amount, name) => () => {
        setActiveButton(n)
        setAmount(_amount)
        GoogleTagManager.push({
            event: 'atm.event',
            amount_option: 's/ ' + _amount,
            eventName: 'recarga_' + name.toLowerCase().replace(' ', '_').replace(' ', '_'), // slice 12
            action: 'click',
        })
    }
    const handleOnBackMetodos = () => {
        r.push(PATHS.CUENTA_RECARGA.url)
    }
    if (!name || !method) return null

    return (
        <MetodoDeDepositoS>
            <div className="wrapper">
                <BannerS>{!img ? <div className="method">{name}</div> : <img src={img}></img>}</BannerS>
                <FormS
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    <FormLabel>Monto a depositar</FormLabel>
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
                    {method === 'NIUBIZ' && (
                        <FormControlCheckS>
                            <Checkbox
                                id="#checkboxterminos"
                                onChange={() => {
                                    setCheckboxNiubis(!checkboxNiubiz)
                                }}
                                onClick={() => dtRecargaTerms(name)}
                                value={checkboxNiubiz}
                            />
                            <CheckboxLabelS>
                                <label htmlFor={'#checkboxterminos'}>Acepto los</label>
                                <Link href={PATHS.REGLAMENTO_DEL_JUEGO.url} target="_blank">
                                    <span>términos y condiciones</span>
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
                                    type={'number'}
                                    value={amount}
                                ></TextFieldS>
                                <LoadingButtonS
                                    color="secondary"
                                    disabled={disabled}
                                    loading={isLoadingPaymentDeposit}
                                    onClick={handlePayment}
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
                        y máximo{' '}
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
                    <AlertStyled severity="info">Recuerda activar o verificar que tu tarjeta esté activa para compras en línea</AlertStyled>
                ) : null}

                <BackMethodsS onClick={handleOnBackMetodos}>
                    <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                    <span onClick={() => dtRecargaBack(name, 'regresar a metodos de pago')}>Regresar a métodos de pago</span>
                </BackMethodsS>
            </div>
        </MetodoDeDepositoS>
    )
}

export default MetodoDeDeposito
const StyledAviso = styled.div`
    color: ${(p) => p.theme.palette.alternate19.main};
    font-size: 14px;
`
const AlertStyled = styled(Alert)`
    && {
        svg {
            font-size: 2rem;
        }
    }
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
        > .wrapper {
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
const MetodoDeDepositoS = styled.div`
    background: ${(p) => p.theme.palette.alternate12.main};
    min-height: 100%;
    padding: 1rem 40px;
    ${MEDIA_QUERIES.min_width.tabletS} {
        padding: 1rem 50px;
    }
    & {
        > div.wrapper {
            max-width: 400px;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
`
const FormHeaderS = styled.div`
    display: flex;
    gap: 0.7rem;
    margin-bottom: 0.5rem;
    & {
        button {
            flex: 1;
            font-size: 1rem;
            padding: 0.5rem 1rem;
            white-space: nowrap;
            background: white;
            outline: 1px solid #ffc700;
            border-radius: 6px;
            color: #6f6d6d;
            font-weight: 400;
            font-size: 1.1rem;
        }
        button.activeButton {
            background: #ffc700;
            font-weight: 500;
            outline: 2px solid ${(p) => p.theme.palette.warning.main};
        }
    }
`
const LoadingButtonS = styled(LoadingButton)`
    && {
        padding: 1em;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #000000;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 5px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
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
