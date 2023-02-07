import styled from '@emotion/styled'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { Grid, FormControl, FormLabel, TextField, FormHelperText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { useGetPaymentDepositMutation } from 'states/api/calimaco/payment'
import * as yup from 'yup'
import { ModalRecargaMethodSelector, setFrame } from 'states/slice/ModalRecarga'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import MetodoSeleccionar from 'components/retirar/metodo-de-retiro/MetodoSeleccionar'

const MetodoDeRetiro = ({ onBack, onNext }) => {
    const [amount, setAmount] = useState('')
    const [getPayment, { data, isLoading: isLoadingPaymentDeposit, reset, isSuccess }] = useGetPaymentDepositMutation()
    const [errors, setErrors] = useState(null)
    const user = useSelector(userSelector)
    const id = `${Math.random() * 10000000000}${Math.random() * 10000000000}`
    const dispatch = useDispatch()
    const { name, method, img } = useSelector(ModalRecargaMethodSelector)
    const [activeButton, setActiveButton] = useState(null)
    const handlePayment = async () => {
        if (!amount || amount === 0) return
        try {
            await yup.number().min(10, 'Monto minimo S/ 10.00').max(3000, 'Monto maximo S/ 3000.00').validate(amount)
            await getPayment({ company: user.company, amount: amount * 100, session: user.session, method })

            onNext()
        } catch (error) {
            setErrors(error.errors)
        }
    }
    useEffect(() => {
        if (data?.redirectionURL) {
            dispatch(setFrame(data?.redirectionURL))
        }
    }, [isSuccess])

    const onClickButtonPred = (n, _amount) => () => {
        setActiveButton(n)
        setAmount(_amount)
    }

    return (
        <div>
            <CabeceraPaymentS>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <div className="iconS">
                            <CheckCircleOutlineOutlinedIcon />
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        {/* <div className="TituloModalS">
              Para realizar el retiro en tienda se le solicitará el original de su DNI o Carnet de Extranjería. Te
              enviaremos un mail con la aprobación de tu retiro, el cual te podrán solicitar al acercarte a la tienda.
              Es obligatorio presentar el carnet de vacunación para ingresar a las tiendas. Retiro mínimo S/5, máximo
              S/3,000.
            </div> */}
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <FormS>
                    <FormLabel className="TextMontoS">Monto a retirar</FormLabel>

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
                                    name="monto"
                                    onInput={(e) => {
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
                            </div>
                        </FormControlS>
                    </FormContentS>

                    <FormHelperTextS id="component-helper-text">Mínimo S/ 20 y máximo S/ 1920*</FormHelperTextS>
                </FormS>
            </CabeceraPaymentS>

            <MetodoDeDepositoS>
                <div className="wrapper">
                    <MetodoSeleccionar></MetodoSeleccionar>
                    <BackMethodsS onClick={onBack}>
                        <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                        <span>Elegir otro método de retiro</span>
                    </BackMethodsS>
                </div>
            </MetodoDeDepositoS>
        </div>
    )
}

export default MetodoDeRetiro
const CabeceraPaymentS = styled.div`
    outline: none;
    background: #ffffff;
    position: relative;
    z-index: 1;
    height: auto;
    padding: 0 30px 0 30px;
    /* overflow: auto; */
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: justify;
    .TituloModalS {
        padding: 20px 0px 30px 0px;
        color: #5a5a5a;
        font-size: 1rem;
        line-height: 16px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
    }
    .iconS {
        text-align: right;
        padding-top: 25px;
    }

    .subtitS {
        padding: 20px 0px 30px 0px;
        color: #5a5a5a;
        font-size: 12px;
        line-height: 16px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
    }
    .subtitS2 {
        padding: 20px 0px 30px 0px;
        color: #ff0000;
        font-size: 12px;
        line-height: 16px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        text-decoration: underline;
    }
`
const TextFieldS = styled(TextField)`
    & {
        background: white;
    }
`
const FormHelperTextS = styled(FormHelperText)`
    & {
        font-size: 1rem;
        padding-bottom: 20px;
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
const MetodoDeDepositoS = styled.div`
    background: #fafafa;
    min-height: 100%;
    //  padding: 1rem 40px;
    ${MEDIA_QUERIES.min_width.tabletS} {
        //   padding: 1rem 50px;
    }
    & {
        > .wrapper {
            //   max-width: 400px;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
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
            font-size: 1.3rem;
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
    .TextMontoS {
        font-weight: 500;
    }
`

const BackMethodsS = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;

    padding: 1rem;
    padding-left: 5rem;
    width: fit-content;
    transition: 250ms;
    color: #767676;
    font-size: 1em;
    :hover {
        color: #ec3323;
    }
`
