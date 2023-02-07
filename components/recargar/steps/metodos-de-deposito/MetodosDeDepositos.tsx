import { useDispatch, useSelector } from 'react-redux'
import { useGetPaymentMethodsQuery } from 'states/api/calimaco/payment'
import astroIMGTemp from 'public/assets/mi-billetera/recarga/temp/astropay.jpeg'
import niubizIMGTemp from 'public/assets/mi-billetera/recarga/temp/niubiz.png'
import kushkiIMGTemp from 'public/assets/mi-billetera/recarga/temp/kushki.png'
import pagoeIMGTemp from 'public/assets/mi-billetera/recarga/temp/PAGOEFECTIVO_MOVIL_AGENTES_BODEGAS.svg'
import qrIMGTemp from 'public/assets/mi-billetera/recarga/temp/QRVIAPE.svg'
import safetIMGTemp from 'public/assets/mi-billetera/recarga/temp/safety.png'
import teleIMGTemp from 'public/assets/mi-billetera/recarga/temp/teleservicios.png'
import prometeoIMG from 'public/assets/mi-billetera/recarga/temp/100x69px_Logo-recarga-Prometeo-f.png'
import monnetIMG from 'public/assets/mi-billetera/recarga/temp/100x69px_LOGO-RECARGA-MONNET-f.png'
import { userSelector } from 'states/features/slices/userSlice'
import { setMethod } from 'states/slice/ModalRecarga'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useRouter } from 'next/router'
import { CUENTA_RECARGA } from 'routes/paths/cuenta/RECARGA'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import { GoogleTagManager } from 'google/TagManager'
import { Limits } from '@interfaces/retiro'
const listMethodsIMG = {
    ASTROPAY: astroIMGTemp.src,
    ATPAYMENTSERVICE: teleIMGTemp.src,
    KUSHKI: kushkiIMGTemp.src,
    NIUBIZ: niubizIMGTemp.src,
    PAGOEFECTIVO: pagoeIMGTemp.src,
    PAGOEFECTIVOQR: qrIMGTemp.src,
    SAFETYPAY: safetIMGTemp.src,
    PROMETEO: prometeoIMG.src,
    MONNET: monnetIMG.src,
}
const MetodosDeDepositos = ({ onBack, onNext, className }) => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const router = useRouter()
    const { data: dataFragment } = useGetFragmentQuery({ fragment: 'RECARGAS_LOBBY_TEXTO' })

    const { data, isLoading: loadingMethods } = useGetPaymentMethodsQuery({
        company: user?.company,
        session: user?.session,
    })
    const dtRecarga = (name) => {
        GoogleTagManager.push({
            event: 'atm.event',
            recharge_option: name.toLowerCase(),
            eventName: 'recarga',
            action: 'click',
        })
    }
    const handleSetMethod = async (method: string, name: string, img: string, limits: Limits) => {
        dispatch(setMethod({ name, method, img, limits }))
        await router.push({
            pathname: CUENTA_RECARGA.CUENTA_RECARGA_METODO_DE_PAGO.url,
            query: {
                methodName: method,
            },
        })
    }
    const computedData = (methods) => {
        let res = []
        res = methods
            ?.filter((item) => item.method !== 'CASH' && item.method !== 'ATPAYMENTTELESERVICIOS')
            .sort((a, b) => a.show_order - b.show_order)
        return res ?? []
    }
    const currency = (amount) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            maximumFractionDigits: 2,
        }).format(amount / 100)
    }
    return (
        <MethodsPaymentS className={className}>
            <div className="wrapper-fragment">
                <FragmentCustomAT fragment={dataFragment ?? ''}></FragmentCustomAT>
            </div>
            <div className="wrapper">
                {computedData(data?.methods).map((dl, i) => (
                    <CardMethodS key={i}>
                        <div
                            className={`logoPagoS ${dl.method}`}
                            onClick={() => handleSetMethod(dl.method, dl.name, listMethodsIMG[dl.method], dl.limits)}
                        >
                            <img
                                alt={dl.name}
                                className="imgPagoS"
                                onClick={() => dtRecarga(dl.name ? dl.name : 'sin titulo')}
                                src={listMethodsIMG[dl.method]}
                            />
                        </div>
                        <span className="textInfoS">
                            {dl?.method === 'ATPAYMENTSERVICE' ? (
                                <div>{`Min ${currency(Number(1000))}`}</div>
                            ) : (
                                <div>{`Min ${currency(Number(dl?.limits?.min))}`}</div>
                            )}

                            <div>{`Max ${currency(Number(dl?.limits?.max))}`}</div>
                        </span>
                    </CardMethodS>
                ))}
            </div>
        </MethodsPaymentS>
    )
}

export default MetodosDeDepositos
interface StyledProps {
    as?: React.ElementType | keyof JSX.IntrinsicElements
    $opacity?: string
    variant?: string
}

const CardMethodS = styled.div<StyledProps>`
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
        font-size: 0.8rem;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 2px;
        align-items: center;
        justify-content: center;
    }
`
const MethodsPaymentS = styled.div`
    background: ${(p) => p.theme.palette.alternate12.main};
    min-height: 100%;
    & {
        > .wrapper-fragment {
            padding: 2rem;
            padding-bottom: 0.8rem;
        }
        > .wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 1rem;
            padding: 1rem;
            ${MEDIA_QUERIES.min_width.tabletS} {
                max-width: 800px;
                margin: auto;
                grid-template-columns: repeat(4, 1fr);
            }
        }
    }
`
