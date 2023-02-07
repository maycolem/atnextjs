/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-undef */
import { Button, FormControl, FormLabel, Modal, TextField, InputLabel, MenuItem, Select } from '@mui/material'
import styled from '@emotion/styled'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useEffect, useState } from 'react'
import cfg from 'config/config'
import { CalimacoClient } from '@calimaco/base'
import { useForm } from 'react-hook-form'
import { useGetShopsMutation } from 'states/calimaco/calimacoContentApi'
import { useAddUserPaymentAccountMutation } from 'states/calimaco/calimacoDataApi'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, setUser } from 'states/features/slices/userSlice'
import { usePaymentPayoutMutation } from 'states/calimaco/calimacoPaymentApi'
import { retiroPaymentSelector, setMontoShop } from 'states/features/slices/retiroPaymentSlice'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { ProviderAt } from 'services/ProviderAtService'
import { Session } from 'services/Session'
import { LoadingButton } from '@mui/lab'
import { onOpen } from 'states/slice/layout/SnackBar'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import { GoogleTagManager } from 'google/TagManager'

const MenuProps = {
    MenuProps: {
        PaperProps: {
            style: {
                maxHeight: 400,
            },
        },
    },
}
const NuevaTienda = ({ errors }) => {
    const dispatch = useDispatch()
    const country = 'PE'
    const client = new CalimacoClient(cfg)

    const [getShops, { isLoading: isLoadingShop }] = useGetShopsMutation()
    const [payment, { isLoading: isPayment }] = useAddUserPaymentAccountMutation()
    const user = useSelector(userSelector)
    const [payout, { isLoading: isLoadingPayout }] = usePaymentPayoutMutation()
    const [shopName, setShopName] = useState('')
    const { montoShop } = useSelector(retiroPaymentSelector)
    const { t } = useTranslation()
    const providerAt = new ProviderAt()
    const router = useRouter()
    const [loadingDeparments, setLoadingDeparments] = useState(false)
    const [deparments, setDeparments] = useState([])
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [shops, setShops] = useState([])
    const [deparment, setDeparment] = useState('')
    const [boolshop, setBoolshop] = useState(true)

    const handleChange = (event) => {
        setDeparment(event.target.value)
    }

    const [province, setProvince] = useState('')
    const handleChangeProvince = (event) => {
        setProvince(event.target.value)
    }

    const [city, setCity] = useState('')
    const handleChangeCity = (event) => {
        setCity(event.target.value)
    }

    const [shopest, setShop] = useState('')

    const handleChangeShop = (address, name, shopTienda) => {
        setShop(shopTienda)
        const shopsNameSelect = address + ' ' + name
        setShopName(shopsNameSelect)
        setBoolshop(false)
    }

    const handleChangeNewShow = async () => {
        const inputMontoShop = document.getElementById('montoShop').value

        if (!inputMontoShop) {
            document.getElementById('montoShop').focus()
            return
        }

        const saveAccount = {
            name: shopName,
            type: 'SHOP',
            config: {
                shop: shopest,
            },
        }

        const res = await payment({
            company: 'ATP',
            session: user?.session,
            payment_account: saveAccount,
        })

        const newSolicitud = await payout({
            company: 'ATP',
            session: user?.session,
            method: 'ATPAYMENTSERVICE_PAYOUT',
            amount: montoShop * 100,
            payment_account: res.data.payment_account,
            shop: shopest,
        })

        if (newSolicitud.data.result === 'OK') {
            // GTM IMPLEMENTATION

            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'puntos de venta',
                amount: 'S/' + inputMontoShop ?? 0,
                option: 'enviar solicitud',
                action: 'click',
            })

            const resUserDetail = await providerAt.userDetail(user.session)
            const _user = {
                ...resUserDetail.user,
                session: user.session,
            }
            Session().setUser(_user)
            dispatch(setUser(Session().getUser()))

            router.push(PATHS.CUENTA_RETIRO_ESTADO_DE_SOLICITUD.url)
        } else {
            // GTM
            if (newSolicitud?.data.description === 'Pending payout') {
                GoogleTagManager.push({
                    event: 'atm.event',
                    eventName: 'retiro_metodos_de_retiro',
                    payout_option: 'puntos de venta',
                    amount: 'S/' + inputMontoShop ?? 0,
                    option: 'solicitud de retiro en curso',
                    action: 'view',
                })
            }

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

    useEffect(() => {
        if (deparment) {
            setProvince('')
            setCity('')
            setShop('')
            setBoolshop(true)
            client.getShopProvinces(country, deparment).then((data) => {
                if (data.result === 'OK') {
                    const orderData = data.provinces.sort((a, b) => String(a.name).localeCompare(String(b.name)))
                    setProvinces(orderData)
                } else {
                    setProvinces([])
                }
            })
        }
    }, [deparment])

    useEffect(() => {
        if (province && deparment) {
            setCity('')
            setShop('')
            setBoolshop(true)
            client.getShopCities(country, deparment, province).then((data) => {
                if (data.result === 'OK') {
                    const orderData = data.cities.sort((a, b) => String(a.name).localeCompare(String(b.name)))
                    setCities(orderData)
                } else {
                    setCities([])
                }
            })
        }
    }, [province, deparment])
    const cbEffect = async () => {
        if (province && deparment && city) {
            setShop('')
            const response = await getShops({ company: 'ATP', ubigeo: deparment + province + city })
            setShops(response?.data)
        }
    }
    useEffect(() => {
        cbEffect()
    }, [city, province, deparment])

    useEffect(() => {
        let isMounted = true
        client.getShopStates(country).then(
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
        }
    }, [])



    return (
        <div>
            <FormS>
                <FormControlS fullWidth>
                    <div style={{ position: 'relative' }}>
                        <InputLabel>Departamento</InputLabel>
                        <SelectS
                            defaultValue=""
                            fullWidth
                            label="Departamento"
                            size="small"
                            {...MenuProps}
                            onChange={handleChange}
                            value={deparment}
                        >
                            {deparments.map(({ state: stateValue, name }, i) => {
                                return (
                                    <MenuItem key={i} value={String(stateValue)}>
                                        {name}
                                    </MenuItem>
                                )
                            })}
                        </SelectS>
                    </div>
                </FormControlS>
                <FormControlS fullWidth>
                    <div style={{ position: 'relative' }}>
                        <InputLabel>Provincia</InputLabel>
                        <SelectS
                            defaultValue=""
                            fullWidth
                            label="Provincia"
                            size="small"
                            {...MenuProps}
                            onChange={handleChangeProvince}
                            value={province}
                        >
                            {provinces.map(({ province: provinceValue, name }, i) => {
                                return (
                                    <MenuItem key={i} value={String(provinceValue)}>
                                        {name}
                                    </MenuItem>
                                )
                            })}
                        </SelectS>
                    </div>
                </FormControlS>
                <FormControlS className="Distrito" fullWidth>
                    <div style={{ position: 'relative' }}>
                        <InputLabel>Distrito</InputLabel>
                        <SelectS
                            defaultValue=""
                            fullWidth
                            label="Distrito"
                            onChange={handleChangeCity}
                            value={city}
                            {...MenuProps}
                            size="small"
                        >
                            {cities.map(({ city: cityValue, name }, i) => {
                                return (
                                    <MenuItem key={i} value={String(cityValue)}>
                                        {name}
                                    </MenuItem>
                                )
                            })}
                        </SelectS>
                    </div>
                </FormControlS>
                <FormControlS className="Tienda" fullWidth>
                    <div style={{ position: 'relative' }}>
                        <InputLabel>Tienda</InputLabel>
                        <SelectS
                            defaultValue=""
                            fullWidth
                            label="Tienda"
                            // onChange={handleChangeShop}
                            value={shopest}
                            {...MenuProps}
                            size="small"
                        >
                            {shops.map(({ city: cityValue, name, address, shop: shopTienda }, i) => {
                                return (
                                    <MenuItem
                                        key={i}
                                        onClick={() => handleChangeShop(address, name, shopTienda)}
                                        value={String(shopTienda)}
                                    >
                                        {address + ' - ' + name}
                                    </MenuItem>
                                )
                            })}
                        </SelectS>
                    </div>
                </FormControlS>

                <FormControl className="Submit">
                    <DivButton>
                        <LoadingButton
                            color="primary"
                            disabled={!!errors || isPayment || isLoadingPayout || boolshop}
                            loading={isPayment || isLoadingPayout}
                            onClick={() => handleChangeNewShow()}
                            type="submit"
                            variant="contained"
                        >
                            Enviar solicitud
                        </LoadingButton>
                    </DivButton>
                </FormControl>
            </FormS>
        </div>
    )
}

export default NuevaTienda

const FormControlS = styled(FormControl)`
    & {
        background: white;
        label {
            font-size: 0.9em;
            padding-right: 0.5rem;
            transform-origin: left center;
        }
        &.withIconRigth {
            label {
                padding-right: 1.2rem;
            }
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
        .MuiFormLabel-root {
            top: 50%;
            transform: translate(1rem, -50%) scale(1);
            color: #494952;

            &.MuiFormLabel-filled {
                transform: translate(1rem, calc(-100% - 1.2rem)) scale(0.75);
            }
            &.Mui-focused {
                transform: translate(1rem, calc(-100% - 1.2rem)) scale(0.75);
            }
        }
        .MuiInputBase-input {
            padding: 1.2rem 1rem;
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
const SelectS = styled(Select)`
    & {
        background: white;
        .MuiSelect-select {
            display: flex;
            white-space: pre-wrap;
        }
    }
`
const FormS = styled.form`
    & {
        padding: 1rem;
        display: grid;
        gap: 12px;
        width: 100%;
        max-width: 750px;
        margin: auto;
        /* grid-template-columns: 1fr 1fr 1fr;
    > .Tienda,
    > .Submit {
      grid-column: span 3;
    } */
        ${MEDIA_QUERIES.min_width.mobileM} {
            grid-template-columns: 1fr 1fr;
            > .Tienda,
            > .Submit,
            > .Distrito {
                grid-column: span 2;
            }
        }
        ${MEDIA_QUERIES.min_width.tabletS} {
            gap: 15px;
            padding: 3rem 1rem;
            grid-template-columns: 1fr 1fr 1fr;
            > .Tienda,
            > .Submit {
                grid-column: span 3;
            }
            > .Distrito {
                grid-column: span 1;
            }
        }
        ${MEDIA_QUERIES.min_width.tabletL} {
            grid-template-columns: 1fr 1fr 1fr;
            > .Tienda,
            > .Submit {
                grid-column: span 3;
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
