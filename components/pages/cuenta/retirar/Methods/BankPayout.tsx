import styled from 'styled-components'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import TransferenciaIMG from 'public/assets/mi-billetera/retiros/transferenciaBancaria.webp'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import * as yup from 'yup'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import { Retiro } from '@interfaces/retiro'
import { dtEnviarSolicitudError } from '../dt'
import { NewAccount, SelectAccount, InputAmount, TabsAccount } from './index'
import { BackMethodsLink } from '../BackMethodsLink'
import { GoogleTagManager } from '@google/TagManager'
interface Props {
    method: Retiro
    saldoRetirable?: number
}
type TabKey = 'NUEVA_CUENTA' | 'SELECCIONAR_CUENTA' | ''
interface Tabs {
    name: string
    key: TabKey
}

export const BankPayout = ({ method }: Props) => {
    const [amount, setAmount] = useState('')
    const [errors, setErrors] = useState(null)
    const user = useSelector(userSelector)
    const { data: dataFragment } = useGetFragmentQuery({ fragment: 'RETIROS_TRANSFERENCIA_BANCARIA' })
    const [activeTabKey, setActiveTabKey] = useState<TabKey>(null)

    useEffect(() => {
        handleChangueAmount(amount)
    }, [amount])

    const handleChangueAmount = async (amount: string) => {
        if (!amount) {
            setErrors('')
            return
        }
        setErrors('')
        const currentMontoRetirable = user?.saldoRetirable / 100
        const amountParsed = Number(amount)
        const min = Number(method.limits.min) / 100
        const max = Number(method.limits.max) / 100

        if (amountParsed > currentMontoRetirable) {
            // GTM
            dtEnviarSolicitudError(amountParsed)
            setErrors('El monto que ingresaste supera el límite de tu saldo retirable, por favor corrígelo')
        }
        try {
            const schema = yup.object().shape({
                amount: yup.number().min(min, 'ERROR MINIMO').max(max, 'ERROR MAXIMO').required(),
            })
            await schema.validate({ amount: amountParsed })
        } catch (errors) {
            dtEnviarSolicitudError(amountParsed)
            switch (errors.message) {
                case 'ERROR MINIMO':
                    setErrors(
                        `El monto debe ser mayor que ${Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(min)}.`
                    )
                    break
                case 'ERROR MAXIMO':
                    setErrors(
                        `El monto debe ser menor que ${Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(max)}.`
                    )
                    break
                default:
                    break
            }
        }
    }

    const tabs: Tabs[] = [
        { name: 'Nueva cuenta', key: 'NUEVA_CUENTA' },
        { name: 'Seleccionar cuenta', key: 'SELECCIONAR_CUENTA' },
    ]

    useEffect(() => {
        if (activeTabKey === 'NUEVA_CUENTA') {
            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'transferencias bancarias',
                option: 'nueva cuenta',
                action: 'click',
            })
        }
        if (activeTabKey === 'SELECCIONAR_CUENTA') {
            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'transferencias bancarias',
                option: 'seleccionar cuenta',
                action: 'click',
            })
        }
    }, [activeTabKey])

    return (
        <div>
            <StyledBanner>
                <img src={TransferenciaIMG.src} />
            </StyledBanner>
            <StyledInformation>
                <CheckCircleOutlineOutlinedIcon />
                <FragmentCustomAT fragment={dataFragment} />
            </StyledInformation>
            <InputAmount method={method} setValue={setAmount} value={amount} errors={errors} saldoRetirable={user?.saldoRetirable} />
            <TabsAccount tabs={tabs} onActive={setActiveTabKey} defaultActive={tabs[0].key} />
            {activeTabKey === 'NUEVA_CUENTA' ? <NewAccount errors={errors} method={method.method} amount={Number(amount || 0)} /> : null}
            {activeTabKey === 'SELECCIONAR_CUENTA' ? (
                <SelectAccount errors={errors} method={method.method} amount={Number(amount || 0)} />
            ) : null}

            <BackMethodsLink />
        </div>
    )
}

const StyledInformation = styled.div`
    display: flex;
    padding: 0 10px;
    max-width: 700px;
    margin: auto;
    > svg {
        margin-top: 1rem;
        margin-bottom: 1rem;
        margin-right: 0.5rem;
    }
`

const StyledBanner = styled.div`
    max-width: 200px;
    margin-top: 10px;
    margin: auto;
`
