const ItemsStatus = [
    // Status
    {
        value: 'TO_BE_PROCESSED',
        descripcion: 'TO_BE_PROCESSED',
        filter: 'status',
        advanced: true,
    },
    {
        value: 'PROCESSED',
        descripcion: 'PROCESSED',
        filter: 'status',
        advanced: true,
    },
    {
        value: 'PROCCESED',
        descripcion: 'PROCCESED',
        filter: 'status',
        advanced: true,
    },
    {
        value: 'NEW',
        descripcion: 'NEW',
        filter: 'status',
        advanced: true,
    },
    {
        value: 'ACCEPTED',
        descripcion: 'ACCEPTED',
        filter: 'status',
        advanced: true,
    },
    {
        value: 'WINNING',
        descripcion: 'Premio',
        filter: 'status',
        advanced: true,
    },
    {
        value: 'DENIED',
        descripcion: 'DENIED',
        filter: 'status',
        advanced: true,
    },
    {
        value: 'CANCELLED',
        descripcion: 'CANCELLED',
        filter: 'status',
        advanced: true,
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
    ...ItemsStatus,
    ,
    ...ItemsMethods,
]
