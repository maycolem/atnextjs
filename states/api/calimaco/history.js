import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
let responseHistory = {
  redirectionURL: '',
  newWindow: '',
  hash: '',
}
let responseMethods = {
  methods: [
    {
      name: '',
      method: '',
    },
  ],
}

export const historyApi = createApi({
  reducerPath: 'historyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CALIMACO_API_BASE,
  }),
  endpoints: (builder) => ({
    getOperationsHistory: builder.mutation({
      query: ({ amount, session, company, method }) =>
        `payment/deposit?company=${company}&session=${session}&method=${method}&amount=${amount}`,
      transformResponse: (data) => {
        if (data?.result === 'OK') {
          responseHistory = data?.data
        }
        return responseHistory
      },
    }),
    getHistoryMethods: builder.query({
      query: ({ company, session }) => {
        // const formData = new FormData()
        // formData.append('company', company)
        // formData.append('session', session)
        return {
          url: `data/getOperationsHistory`,
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

export const { ds } = historyApi
