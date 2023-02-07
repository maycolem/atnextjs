interface errorCode {
    code: string
    message: string
}
export const getError = (code: string): errorCode => {
    const items = [
        {
            code: '0',
            message: 'Correcto',
        },
        {
            code: '-1',
            message: 'Credenciales inválidas',
        },
        {
            code: '-2',
            message: 'Sesión inválida',
        },
        {
            code: '-3',
            message: 'Sin fondos',
        },

        {
            code: '-6',
            message: 'Cantidad negativa',
        },
        {
            code: '-7',
            message: 'Alias duplicado',
        },
        {
            code: '-8',
            message: 'Email duplicado',
        },
        {
            code: '-9',
            message: 'Movil duplicado',
        },
        {
            code: '-10',
            message: 'Error desconocido',
        },
        {
            code: '-11',
            message: 'La cuenta no está activada',
        },
        {
            code: '-12',
            message: 'No se encuentra el archivo',
        },
        {
            code: '-13',
            message: 'Error de conexión a la bbdd',
        },
        {
            code: '-14',
            message: 'Sin datos',
        },
        {
            code: '-15',
            message: 'Faltan parámetros',
        },
        {
            code: '-17',
            message: 'Datos duplicados',
        },
        {
            code: '-18',
            message: 'No existen regulaciones',
        },
        {
            code: '-19',
            message: 'No existen compañías',
        },
        {
            code: '-20',
            message: 'Error el releer la configuración',
        },
        {
            code: '-21',
            message: 'Error en el depósito',
        },
        {
            code: '-22',
            message: 'Límite diario',
        },
        {
            code: '-23',
            message: 'Límite Semanal',
        },
        {
            code: '-24',
            message: 'Límite Mensual',
        },
        {
            code: '-25',
            message: 'Error regulatorio',
        },
        {
            code: '-26',
            message: 'Sin permisos',
        },

        {
            code: '-27',
            message: 'Sin límites de depósito',
        },
        {
            code: '-28',
            message: 'Sin flujos',
        },
        {
            code: '-29',
            message: 'Error en la promoción',
        },
        {
            code: '-30',
            message: 'Balance insuficiente',
        },
        {
            code: '-31',
            message: 'Error de parámetros',
        },
        {
            code: '-32',
            message: 'Servicio no disponible',
        },
        {
            code: '-33',
            message: 'Datos no encontrados',
        },
        {
            code: '-34',
            message: 'Idempotencia',
        },
        {
            code: '-35',
            message: 'Error al solicitar la retirada',
        },
        {
            code: '-36',
            message: 'Hash inválida',
        },
        {
            code: '-37',
            message: 'Timestamp caducado',
        },
        {
            code: '-38',
            message: 'Error al guardar el depósito manual',
        },
        {
            code: '-39',
            message: 'Estado inválido',
        },
        {
            code: '-40',
            message: 'Contraseña de un solo uso (OTP) inválida',
        },
        {
            code: '-41',
            message: 'Usuario inválido',
        },
        {
            code: '-42',
            message: 'Cantidad incorrecta',
        },
        {
            code: '-43',
            message: 'No se encuentra la apuesta',
        },
        {
            code: '-44',
            message: 'No se encuentra la máquina',
        },
        {
            code: '-45',
            message: 'Autoexcluido',
        },
        {
            code: '-46',
            message: 'Demasiadas peticiones',
        },
        {
            code: '-47',
            message: 'No se puede validar el movil',
        },
        {
            code: '-48',
            message: 'No se puede validar el email',
        },
    ]
    const item = items.find((item) => item.code === code)
    return item
}
