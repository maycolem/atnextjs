import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints

let responseMethods = {
  methods: [
    {
      name: '',
      method: '',
    },
  ],
}

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CALIMACO_API_BASE,
  }),
  endpoints: (builder) => ({
    getPaymentDeposit: builder.mutation({
      query: ({ amount, session, company, method }) =>
        `payment/deposit?company=${company}&session=${session}&method=${method}&amount=${amount}`,
    }),
    getPaymentMethods: builder.query({
      query: ({ company, session }) => {
        // const formData = new FormData()
        // formData.append('company', company)
        // formData.append('session', session)
        return {
          url: `contents/getDepositLobby`,
          method: 'POST',
          body: new URLSearchParams({
            company,
            session,
          }),
        }
      },
      transformResponse: (data) => {
        if (data?.result === 'OK') {
          responseMethods = data
        }
        return responseMethods
      },
    }),
  }),
})

export const { useGetPaymentDepositMutation, useGetPaymentMethodsQuery } = paymentApi
