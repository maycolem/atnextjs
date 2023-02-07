import { Retiro } from '@interfaces/index'
import PuntoVenta from '@components/retirar/punto-de-venta/punto-de-venta'
import { Niubiz } from '@components/pages/cuenta/retirar/Niubiz/Niubiz'
import { Meta } from '@components/Meta'
import { BankPayout } from '@components/pages/cuenta/retirar/Methods'

interface Props {
    method: Retiro
}
export const Method = ({ method }: Props) => {
    let title = ''
    let Component: React.FunctionComponent<{ method: Retiro }> | null = null
    if (method && method?.method) {
        switch (method.method) {
            case 'ATPAYMENTSERVICE_PAYOUT':
                title = 'Punto Venta'
                Component = PuntoVenta
                break
            case 'BANK_PAYOUT':
                title = 'Transferencia Bancaria'
                Component = BankPayout
                break
            // case 'ASTROPAY_PAYOUT':
            //     title = 'Astropay'
            //     Component = Astropay
            //     break
            case 'NIUBIZ_PAYOUT':
                title = 'Niubiz'
                Component = Niubiz
                break
        }
    }
    return (
        <>
            <Meta title={title} />
            <div>{Component ? <Component method={method} /> : null}</div>
        </>
    )
}
