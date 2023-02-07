/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const calimacoProviderApi = createApi({
    reducerPath: 'calimacoProviderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_CALIMACO_API_BASE,
    }),

    endpoints: (builder) => ({
        providerPayoutNiubiz: builder.query({
            query: ({ session, method }) => {
                return {
                    url: `providers/niubiz/showTokenizationForm`,
                    method: 'POST',
                    body: new URLSearchParams({
                        company: process.env.REACT_APP_COMPANY,
                        session,
                        method,
                    }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }
            },
        }),
    }),
})

export const { useProviderPayoutNiubizQuery } = calimacoProviderApi
