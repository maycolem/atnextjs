import { GoogleTagManager } from '@google/TagManager'

export const dtBackToRetiros = () => {
    GoogleTagManager.push({
        event: 'atm.event',
        eventName: 'retiro_metodos_de_retiro',
        payout_option: 'transferencia bancaria',
        option: 'elegir otro metodo de retiro',
        action: 'click',
    })
}

export const dtEnviarSolicitudError = (amount: number) => {
    GoogleTagManager.push({
        event: 'atm.event',
        eventName: 'retiro_metodos_de_retiro',
        payout_option: 'transferencia bancaria',
        amount: 'S/ ' + amount,
        option: 'enviar solicitud - error',
        action: 'click',
    })
}
export const dtSolicitudDeRetiroEnCurso = (inputMontoBank: number) => {
    GoogleTagManager.push({
        event: 'atm.event',
        eventName: 'retiro_metodos_de_retiro',
        payout_option: 'transferencia bancaria',
        amount: 'S/' + String(inputMontoBank),
        option: 'solicitud de retiro en curso',
        action: 'view',
    })
}
export const dtEnviarSolicitudDeRetiro = (inputMontoBank: number) => {
    GoogleTagManager.push({
        event: 'atm.event',
        eventName: 'retiro_metodos_de_retiro',
        payout_option: 'transferencia bancaria',
        amount: 'S/' + String(inputMontoBank),
        option: 'enviar solicitud',
        action: 'click',
    })
}
export const dtNuevaCuenta = () => {
    GoogleTagManager.push({
        event: 'atm.event',
        eventName: 'retiro_metodos_de_retiro',
        payout_option: 'transferencia bancaria',
        option: 'nueva cuenta',
        action: 'click',
    })
}

export const dtSeleccionarCuenta = () => {
    GoogleTagManager.push({
        event: 'atm.event',
        eventName: 'retiro_metodos_de_retiro',
        payout_option: 'transferencia bancaria',
        option: 'seleccionar cuenta',
        action: 'click',
    })
}
