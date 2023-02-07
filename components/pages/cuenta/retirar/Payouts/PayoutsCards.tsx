import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TransferenciaIMG from 'public/assets/mi-billetera/retiros/transferenciaBancaria.webp'
import PuntosVentaIMG from 'public/assets/mi-billetera/retiros/PuntosVentaIMG.webp'
import astroIMGTemp from 'public/assets/mi-billetera/recarga/temp/astropay.jpeg'
import OtrosIMG from 'public/assets/mi-billetera/retiros/otros.png'
import visaIMG from '../assets/visa-icon_ok3.webp'
import { useGetPayoutLobbyQuery } from '@states/calimaco/calimacoContentApi'
import { userSelector } from '@states/features/slices/userSlice'
import { useAppSelector } from '@states/store'
import { PayoutCard } from './PayoutCard'

const listRetirosIMG = {
    ATPAYMENTSERVICE_PAYOUT: PuntosVentaIMG.src,
    TEST_PAYOUT: OtrosIMG.src,
    // NIUBIZ_PAYOUT: niubizIMGTemp.src,
    NIUBIZ_PAYOUT: visaIMG.src,
    ASTROPAY_PAYOUT: astroIMGTemp.src,
    BANK_PAYOUT: TransferenciaIMG.src,
}

export const Payouts = ({ className = '' }) => {
    const user = useAppSelector(userSelector)
    const { data: dataPayoutLobby } = useGetPayoutLobbyQuery(user?.session)
    const orderRetiros = ['NIUBIZ_PAYOUT', 'BANK_PAYOUT', 'ATPAYMENTSERVICE_PAYOUT']
    const [retiros, setRetiros] = useState([])

    useEffect(() => {
        const methods = dataPayoutLobby?.methods
        if (methods && Array.isArray(methods)) {
            const sortMethods = [...methods].sort((a, b) => orderRetiros.indexOf(a.method) - orderRetiros.indexOf(b.method))
            // .filter((item) => item.method !== 'NIUBIZ_PAYOUT')
            setRetiros(sortMethods)
        }
    }, [dataPayoutLobby])

    return (
        <StyledPayoutCards className={className}>
            <div className="wrapper">
                {retiros.map((retiro, i: React.Key) => {
                    const src: string = listRetirosIMG[retiro.method]
                    return <PayoutCard key={i} retiro={retiro} src={src}></PayoutCard>
                })}
            </div>
        </StyledPayoutCards>
    )
}

const StyledPayoutCards = styled.div`
    background: ${(p) => p.theme.palette.alternate12.main};
    min-height: 100%;
    background: initial;
    & {
        .wrapper {
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
