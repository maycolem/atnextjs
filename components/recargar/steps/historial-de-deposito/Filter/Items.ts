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
    {
        value: 'ASTROPAY',
        descripcion: 'Astropay',
        filter: 'method',
        advanced: true,
    },
    {
        value: 'PAGOEFECTIVO',
        descripcion: 'Pago Efectivo',
        filter: 'method',
        advanced: true,
    },
    {
        value: 'SAFETYPAY',
        descripcion: 'SafetyPay',
        filter: 'method',
        advanced: true,
    },
    {
        value: 'CASH',
        descripcion: 'Cash',
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
    ,
    ...ItemsMethods,
]
