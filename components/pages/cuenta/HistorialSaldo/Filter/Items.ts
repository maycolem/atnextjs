const ItemsTypes = [
    // TYPE
    {
        value: 'DEPOSIT',
        descripcion: 'Depósito',
        filter: 'type',
    },
    {
        value: 'PAYOUT',
        descripcion: 'Retiro',
        filter: 'type',
    },
    {
        value: 'REDEEM',
        descripcion: 'Conversion Bono',
        filter: 'type',
    },
    {
        value: 'WAGER',
        descripcion: 'Apuesta',
        filter: 'type',
    },
    {
        value: 'ROLLBACK',
        descripcion: 'Rollback',
        filter: 'type',
    },
    {
        value: 'WINNING',
        descripcion: 'Premio',
        filter: 'type',
    },
]
const ItemsMethods = [
    // console.log('NIUBIZ_PAYOUT', 'BANK_PAYOUT', 'ATPAYMENTSERVICE', 'ATPAYMENTSERVICE_PAYOUT', 'ATPAYMENTTELESERVICIOS')
    {
        value: 'NIUBIZ_PAYOUT',
        descripcion: 'Niubiz',
        filter: 'method',
        advanced: true,
    },
    {
        value: 'BANK_PAYOUT',
        descripcion: 'Bank Transfer',
        filter: 'method',
        advanced: true,
    },
    {
        value: 'ATPAYMENTSERVICE',
        descripcion: 'Servicios Pago Apuesta Total',
        filter: 'method',
        advanced: true,
    },
    {
        value: 'ATPAYMENTSERVICE_PAYOUT',
        descripcion: 'Tienda AT',
        filter: 'method',
        advanced: true,
    },
    {
        value: 'ATPAYMENTTELESERVICIOS',
        descripcion: 'Apuesta Total Teleservicios',
        filter: 'method',
        advanced: true,
    },
]

export const Items = [
    {
        value: 'LAST-MOUNTH',
        descripcion: 'Últimos 30 días',
        filter: 'op_date_init',
    },
    {
        value: 'ALL',
        descripcion: 'Todos',
        filter: 'all',
    },
    ...ItemsTypes,
    ,
    ...ItemsMethods,
]
