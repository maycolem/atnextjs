import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { unmountComponentAtNode } from 'react-dom'
import { ControlBar } from 'video-react'

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CALIMACO_API_BASE,
  }),
  endpoints: (builder) => ({
    getPaymentDeposit: builder.mutation({
      query: ({ amount, session, company, method }) => {
        return {
          url: '',
          method: '',
          body: '',
          headers: '',
        }
      },
    }),
  }),
})

export const { useGetPaymentDepositMutation } = accountApi
// Mutaciones => lo controlas con onClick() - se borra de cache cuando se desmonta el componente
// [nombreDelaFuncion , { data , error, isLoading, isError, reset , isSuccess}] = useMutacion

// Query => se llama automaticamente cuando se monta el componente - se mantiene en cache por el tiempo que le limites por defecto 60 segundos no se borra aunque el componete desmonte
// {data , error , ..., refetch } = useQuery
