import styled from 'styled-components'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { Grid, FormControl, FormLabel, Modal, TextField, FormHelperText } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import MetodoSeleccionar from 'components/retirar/metodo-tienda/MetodoSeleccionar'
import PuntosVentaIMG from 'public/assets/mi-billetera/retiros/PuntosVentaIMG.webp'
import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import { setMontoShop } from 'states/features/slices/retiroPaymentSlice'
import { useGetPayoutLobbyShopQuery, useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import * as yup from 'yup'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import { GoogleTagManager } from 'google/TagManager'
import { useAppDispatch } from '@states/store'

const PuntoDeVenta = () => {
    const user = useSelector(userSelector)
    const [amount, setAmount] = useState<string>('')
    const [errors, setErrors] = useState('')
    const id = `${Math.random() * 10000000000}${Math.random() * 10000000000}`
    const dispatch = useAppDispatch()
    const { data: shop, isLoading: isloadingRetiros, refetch } = useGetPayoutLobbyShopQuery(user?.session)
    const { data: dataFragment } = useGetFragmentQuery({ fragment: 'RETIROS_PUNTOS_DE_VENTA' })

    const puntoDeVentaEffect = async () => {
        setErrors('')
        const currentMontoRetirable = user?.saldoRetirable / 100
        const montoRetiro = Number(amount)

        if (montoRetiro > currentMontoRetirable) {
            // GTM

            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'puntos de venta',
                amount: 'S/ ' + montoRetiro,
                option: 'enviar solicitud - error',
                action: 'click',
            })

            setErrors('El monto que ingresaste supera el límite de tu saldo retirable, por favor corrígelo')
        } else if (shop?.limits?.min && shop?.limits?.max && amount) {
            const _min = Number(shop?.limits?.min || 0) / 100
            const _max = Number(shop?.limits?.max || 0) / 100
            const _amount = Number(amount || 0)

            const schema = yup.object().shape({
                amount: yup.number().min(_min, 'ERROR MINIMO').max(_max, 'ERROR MAXIMO').required(),
            })
            try {
                await schema.validate({ amount: _amount })
            } catch (errors) {
                switch (errors.errors[0]) {
                    case 'ERROR MINIMO':
                        // GTM

                        GoogleTagManager.push({
                            event: 'atm.event',
                            eventName: 'retiro_metodos_de_retiro',
                            payout_option: 'puntos de venta',
                            amount: 'S/ ' + amount,
                            option: 'enviar solicitud - error',
                            action: 'click',
                        })

                        setErrors(
                            `El monto debe ser mayor que ${Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
                                _min
                            )}.`
                        )
                        break
                    case 'ERROR MAXIMO':
                        // GTM

                        GoogleTagManager.push({
                            event: 'atm.event',
                            eventName: 'retiro_metodos_de_retiro',
                            payout_option: 'puntos de venta',
                            amount: 'S/ ' + amount,
                            option: 'enviar solicitud - error',
                            action: 'click',
                        })

                        setErrors(
                            `El monto debe ser menor que ${Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
                                _max
                            )}.`
                        )
                        break
                    default:
                        break
                }
            }
        }
    }

    useEffect(() => {
        puntoDeVentaEffect()
    }, [amount, shop?.limits])

    const handleBack = () => {
        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_metodos_de_retiro',
            payout_option: 'puntos de venta',
            option: 'elegir otro metodo de retiro',
            action: 'click',
        })
    }

    return (
        <div>
            <CabeceraPaymentS>
                <BannerS>
                    <img src={PuntosVentaIMG.src} />
                </BannerS>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <div className="iconS">
                            <CheckCircleOutlineOutlinedIcon />
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <FragmentCustomAT fragment={dataFragment ?? ''}></FragmentCustomAT>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <FormS
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    <FormLabel className="TextMontoS">Monto a retirar</FormLabel>

                    <FormContentS>
                        <CurrencyS>
                            <span className="lineStyle">S/</span>
                        </CurrencyS>
                        <FormControlS>
                            <div className="wrapper">
                                <TextFieldS
                                    autoComplete={id}
                                    helperText={''}
                                    hiddenLabel
                                    id="montoShop"
                                    name="monto"
                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = e.target.value
                                            .replace(/[^0-9.]/g, '')
                                            .replace(/(\..*?)\..*/g, '$1')
                                            .replace(/^0[^.]/, '0')
                                        setAmount(value)
                                        dispatch(setMontoShop(Number(value)))
                                    }}
                                    placeholder="Ingrese el monto aquí"
                                    size="small"
                                    value={amount}
                                ></TextFieldS>
                            </div>
                        </FormControlS>
                    </FormContentS>
                    <ErrorTextS>{errors}</ErrorTextS>

                    {shop ? (
                        <FormHelperTextS id="component-helper-text">
                            Mínimo {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(shop.limits.min / 100)} y
                            Máximo {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(shop.limits.max / 100)}*
                        </FormHelperTextS>
                    ) : (
                        ''
                    )}
                </FormS>
            </CabeceraPaymentS>

            <MetodoDeDepositoS>
                <div className="wrapper">
                    <MetodoSeleccionar errors={errors}></MetodoSeleccionar>
                    <Link href={PATHS.CUENTA_RETIRO.url} legacyBehavior>
                        <BackMethodsS>
                            <a onClick={() => handleBack()}>
                                <KeyboardBackspaceIcon></KeyboardBackspaceIcon> Elegir otro método de retiro
                            </a>
                        </BackMethodsS>
                    </Link>
                </div>
            </MetodoDeDepositoS>
        </div>
    )
}

export default PuntoDeVenta

const divCheck = styled.div`
    margin-top: 2px;
`

const ErrorTextS = styled.p`
    & {
        color: ${(p) => p.theme.palette.primary.main};
        font-size: 0.922423432432rem;
    }
`
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

    ${MEDIA_QUERIES.min_width.desktopM} {
        outline: none;
        background: #ffffff;
        position: relative;
        z-index: 1;
        height: auto;
        padding: 0 30px 0 30px;
        width: 70%;
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
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 1.1rem;
            line-height: 25px;
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
    ${MEDIA_QUERIES.min_width.desktopM} {
        & {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 20px;

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
    cursor: pointer;

    padding: 1rem;
    padding-left: 5rem;
    width: fit-content;
    transition: 250ms;
    color: #767676;
    font-size: 1em;
    > a {
        gap: 1rem;
        display: flex;
        align-items: center;
    }
    :hover {
        color: #ec3323;
    }
`
const BannerS = styled.div`
    & {
        margin-bottom: 0.5rem;
        img {
            width: fit-content;
            max-width: 200px;
            margin: auto;
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

    ${MEDIA_QUERIES.min_width.desktopM} {
        & {
            margin-bottom: 0.5rem;
            img {
                width: fit-content;
                max-width: 400px;
                margin: auto;
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
    }
`
