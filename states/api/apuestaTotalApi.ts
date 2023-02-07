/* eslint-disable camelcase */

import { Utm } from '@interfaces/utm'

/* eslint-disable no-throw-literal */
const { default: axios } = require('axios')
const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmQxZmY5M2FjMWIwZjkzMjhlNjg2ZGQzMTQ3MWQ4MGQ4MzFhZTgwNTUxZmFkYzI5ZmIyNGM2MDRlYjVkYzY1NjQ4ZWYwNzUyNjViNmNmMzYiLCJpYXQiOjE2NjYwNDc0OTYuNzA4MDM0LCJuYmYiOjE2NjYwNDc0OTYuNzA4MDM3LCJleHAiOjE3NjA3NDE4OTYuNzA2Mywic3ViIjoiNiIsInNjb3BlcyI6W119.l7YFRfdO8PLiBXo7ypPuhvlSCuSUGubVJl83qMm_d34KhQc3Ah8NIE_wU49NJ1bQ4r9qAwFw-oKO3WKnu3cLYu2onh2OrieA2XB6MqETA5vWy2aeb1UvmX9naRsA6SpgUne1tZ30bDt6frkIyfeue8N9dYKP0GsKhPQlWXwGD66e-dinsWoL0sm7ESa77pZOVsmanRyHCyWNdIQFNDuMOWnYYCEwOj-oZO1C71LTJuDZL8eOvJsQdqNT9MbVAt5SPpFDAkyyp8fULq_o79GGyte7izWzQWHygja7PhX4DUBxBAzzbGwCeKYoDdgm8QDI3mJmMGcEb944sConyq2QNvSfVzLpHYZ66I0pP6uCvV5Qk3NLSOfHa-lWFvP3gMYE9mxmBOZS2oB23x9HYfpK6Uzgc60_mhzXJEvRiZbds8ORVm4Rau_i3n0TNpQEf_xvkNww8nDUcVflqv95a5W7V9o5VxE6vBqgt7s9HH0NCicgFy5hfWqu3UjZN3NSq6zpZuRkNCe1Ynb2HgjGPmRwutNx8Hj69cIU9-BDVH1t11DUzlYkm0psjfpg07T8NcZ2WFQiNDMbvK53Ir1dj1solBJnmYzUEO_QbKQsDVMHJJmttFdJARKOpGL0knGFzhuo_AjoHGs0Zsuvs4gjtlYyOPyn2aLqCqXsSIHK8qlX5-Q'
const api = axios.create({
    baseURL: 'https://api.apuestatotal.com',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
    timeout: 15000,
})

interface ResponseApi {
    http_code: number
    result: string
    status: string
}

export const validateEmailAge = async (email: string): Promise<ResponseApi> => {
    try {
        const data = await api.post('/web/emailage', { email })
        const result = response(data)
        if (result.http_code > 400) {
            throw result
        }
        return result
    } catch (e) {
        const result = responseError(e)
        return result
    }
}
export const validateDni_ = async (dni: string, type = 'DNI'): Promise<ResponseApi> => {
    try {
        const data = await api.post('/web/validate/dni/menor', { type, dni })
        const result = response(data)
        if (result.http_code > 400) {
            throw result
        }
        return result
    } catch (e) {
        const result = responseError(e)
        return result
    }
}
export const validateDniandLastname_ = async ({ dni = '', firstname = '', lastname = '', type = 'DNI' }): Promise<ResponseApi> => {
    try {
        const data = await api.post('/web/validate/dni', { dni, lastname, type, firstname })
        const result = response(data)
        if (result.http_code > 400) {
            throw result
        }
        return result
    } catch (e) {
        const result = responseError(e)
        return result
    }
}

interface PropsSendEmailCode {
    email: string
    name: string
}
export const sendEmailCode = async (props: PropsSendEmailCode): Promise<ResponseApi> => {
    try {
        const data = await api.post('/web/email', props)
        const result = response(data)
        if (result.http_code > 400) {
            throw result
        }
        return result
    } catch (e) {
        const result = responseError(e)
        return result
    }
}

interface PropsSendMobileCode {
    mobile: string
    name: string
}
export const sendMobileCode = async (props: PropsSendMobileCode): Promise<ResponseApi> => {
    try {
        const data = await api.post('/web/sms', props)
        const result = response(data)
        if (result.http_code > 400) {
            throw result
        }
        return result
    } catch (e) {
        const result = responseError(e)
        return result
    }
}

export const getDatePeru = async (): Promise<ResponseApi> => {
    try {
        const data = await api.post('/web/getDate')
        const result = response(data)
        if (result.http_code > 400) {
            throw result
        }
        return result
    } catch (e) {
        const result = responseError(e)
        return result
    }
}

export const sendUtms = async (props: Utm, user_id: number): Promise<ResponseApi> => {
    const utms = {
        utm_source: props.utmSource,
        utm_medium: props.utmMedium,
        utm_campaign: props.utmCampaign,
        utm_content: props.utmContent,
        user_id,
    }
    try {
        const data = await api.post('/web/utm', utms)
        const result = response(data)
        if (result.http_code > 400) {
            throw result
        }
        return result
    } catch (e) {
        const result = responseError(e)
        return result
    }
}

function response(data: any): ResponseApi {
    const http_code = data?.data?.http_code || data?.http_code || data?.status || 500
    const result = data?.data?.result || data?.result || data?.statusText || 'Ocurrió un error.'
    const status = data?.data?.status || data?.status || data?.status || 500
    return {
        http_code,
        result,
        status,
    }
}

function responseError(e: any): ResponseApi {
    let error = response(e)
    if (e?.response) {
        error = response(e?.response)
    }
    return error
}
