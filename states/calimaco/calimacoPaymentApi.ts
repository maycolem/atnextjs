/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { Response } from '@interfaces/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import store from '@states/store'
import { calimacoDataApi } from './calimacoDataApi'

interface PropsPaymentPayout {
    session: string
    method: string
    amount: number
    payment_account: number
    shop?: string
}

interface ResponsePaymentPayout extends Response {
    method: string
    amount: string
    user: string
    operation: number
}

export const calimacoPaymentApi = createApi({
    reducerPath: 'calimacoPaymentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_CALIMACO_API_BASE,
    }),

    endpoints: (builder) => ({
        paymentPayout: builder.mutation<ResponsePaymentPayout, PropsPaymentPayout>({
            query: ({ session, method, amount, payment_account, shop }) => {
                const body = new URLSearchParams({
                    company: process.env.REACT_APP_COMPANY,
                    session,
                    method,
                    amount: String(amount),
                    payment_account: String(payment_account),
                })
                if (shop) {
                    body.append('shop', shop)
                }

                store.dispatch(calimacoDataApi.util.invalidateTags(['OperationsHistory']))
                return {
                    url: `payment/payout`,
                    method: 'POST',
                    body: body,
                }
            },
        }),
    }),
})

export const { usePaymentPayoutMutation } = calimacoPaymentApi
