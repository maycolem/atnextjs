import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { PATHS } from '@routes/paths/PATHS'
import { useRouter } from 'next/router'
import { setLimit } from '@states/features/slices/retiroPaymentSlice'
import { GoogleTagManager } from 'google/TagManager'
import { useDispatch } from 'react-redux'
import { Retiro } from '@interfaces/retiro'
import { currencyAT } from '@helpers/currency'

interface Props {
    className?: string
    retiro: Retiro
    src: string
}
export const PayoutCard = ({ retiro, src }: PropsWithChildren<Props>) => {
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useDispatch()
    const min = currencyAT(Number(retiro.limits.min) / 100)
    const max = currencyAT(Number(retiro.limits.max) / 100)
    const handleSetMethod = async (): Promise<void> => {
        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_metodos_de_retiro',
            payout_option: t(retiro.method).toLocaleLowerCase(), // slice 28
            action: 'click',
        })
        const limits = retiro.limits
        const method = retiro.method
        if (limits) {
            dispatch(setLimit(limits))
        } else {
            dispatch(setLimit())
        }
        await router.push({
            pathname: PATHS.CUENTA_RETIRO_METODO_DE_PAGO.url,
            query: {
                methodName: method,
            },
        })
    }
    return (
        <Styled>
            <div className={`logoPagoS`} onClick={handleSetMethod}>
                <img loading="lazy" alt={retiro.name} className="imgPagoS" src={src} />
            </div>
            <span className="textInfoS">
                <div>Min {min}</div>
                <div>Max {max}</div>
            </span>
        </Styled>
    )
}

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    aspect-ratio: 4 / 3;
    .logoPagoS {
        background: white;
        border-radius: 1rem;
        display: flex;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        flex: 1;
        cursor: pointer;
        transition: 150ms;
        min-height: 100px;
        padding: 1.2rem;
        border-radius: 1rem;
        border: 1px solid #d9d9d9;
        box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
        :hover {
            transform: scale(1.075);
            box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
                rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
        }

        img {
            flex: 1;
            object-fit: contain;
            max-width: fit-content;
        }
        &.PROMETEO,
        &.KUSHKI {
            img {
                transform: scale(1.3);
            }
        }
    }
    .textInfoS {
        text-align: center;
        color: ${(p) => p.theme.palette.alternate13.main};
        white-space: nowrap;
        font-size: 0.8rem;
    }
`
