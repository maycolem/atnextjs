const ItemsStatus = [
    {
        value: 'WON',
        descripcion: 'Ganado',
        filter: 'status',
    },
    {
        value: 'REJECTED',
        descripcion: 'Rechazado',
        filter: 'status',
    },
    {
        value: 'LOST',
        descripcion: 'Perdido',
        filter: 'status',
    },
    {
        value: 'OPEN',
        descripcion: 'Abierto',
        filter: 'status',
    },
    {
        value: 'CASHOUT',
        descripcion: 'Cashout',
        filter: 'status',
    },
]
const TypeBets = [
    {
        value: 'SIMPLE',
        descripcion: 'Simple',
        filter: 'type',
        advanced: true,
    },
    {
        value: 'MULTIPLE',
        descripcion: 'Múltiple',
        filter: 'type',
        advanced: true,
    },
    {
        value: 'SYSTEM',
        descripcion: 'Sistema',
        filter: 'type',
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
    ...TypeBets,
]
