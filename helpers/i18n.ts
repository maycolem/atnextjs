import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

function i18nResources() {
    return {
        en: {
            translation: {},
        },
        es: {
            translation: {
                'Domain not found': 'Dominio inválido',
                Accept: 'Aceptar',
                Back: 'Volver',
                Birthday: 'Fecha de Nacimiento',
                Cancel: 'Cancelar',
                Welcome: 'Bienvenido',
                WAGER: 'Apuesta',
                WINNING: 'Ganancia',
                PAYOUT: 'Retiro',
                DEPOSIT: 'Deposito',
                PROMOTION_EXPIRED: 'Promocion Expirada',
                LIMIT_EXCEEDED: 'Limite Excedido',
                SUCCESS: 'Exitoso',
                DENIED: 'Denegado',
                OPEN: 'Abierto',
                NEW: 'Nuevo',
                LOST: 'Perdido',
                CASHOUT: 'Cashout',
                WON: 'Ganado',
                ACCEPTED: 'Aceptado',
                REVISING: 'Revisando',
                'Promotion already activate': 'Promocion ya fue activada',
                'Limit per transaction': 'El monto que ingresaste supera el limite de este metodo, por favor corrígelo',
                'Pending payout': 'Ya tienes una solicitud de retiro en curso',
                CANCELLED: 'Cancelado',
                PROCESSED: 'Pagado',
                PROCCESED: 'Pagado',
                'Not enough balance': 'El monto que ingresaste supera el límite de tu saldo retirable, por favor corrígelo',
                'Bank account payout method': 'Transferencia bancaria',
                'Kushki deposit method': 'Kushki Deposito',
                'Niubiz deposit method': 'Niubiz Deposito',
                TO_BE_PROCESSED: 'Pago en curso',
                MALE: 'Masculino',
                FEMALE: 'Femenino',
                REDEEM: 'Conversion de bono',
                BANK_PAYOUT: 'Transferencia Bancaria',
                NIUBIZ_PAYOUT: 'Niubiz',
                'Prometeo deposit method': 'Prometeo',
                ATPAYMENTSERVICE_PAYOUT: 'Retiro Tienda',
                ATPAYMENTSERVICE: 'Teleservicios',
                'cambiar-password': 'Cambiar contraseña',
                ASTROPAY_PAYOUT: 'Astropay',
                'Operation can not be cancelled ,DENIED': 'El retiro no puede ser cancelado. Denegado',
                'Operation can not be cancelled ,TO_BE_PROCESSED': 'El retiro no puede ser cancelado. Pago en curso',
                'Invalid credentials': 'Credenciales Inválidas, Por favor ingrese nuevamente su usuario y password.',
                nationalIDAvailable: 'DNI ya se encuentra registrado.',
                REJECTED: 'Rechazado',
                SIMPLE: 'Simple',
                MULTIPLE: 'Multiple',
                // EXTRAS
                'codigo promocional': 'Código promocional',
                'apuesta-gratis-bienvenida-20-soles': 'Apuesta deportiva gratis de S/20',
                '20-freespins-de-bienvenida': '20 tiros gratis de casino',
            },
        },
    }
}

i18n.use(initReactI18next).init({
    resources: i18nResources(),
    lng: 'es',
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false,
    },
})
