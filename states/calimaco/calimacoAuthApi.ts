/* eslint-disable object-shorthand */
// Need to use the React-specific entry point to import createApi
import { Login, Response, User } from '@interfaces/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// import { CalimacoClient } from '@calimaco/base'
// import cfg from 'config/config'
// const client = new CalimacoClient(cfg)
// Define a service using a base URL and expected endpoints

interface ResponseValidate extends Response {
    available: string
    error_code?: number
}
interface ResponseLogin extends Response {
    user: Login
}

export const calimacoAuthApi = createApi({
    reducerPath: 'calimacoAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_CALIMACO_API_BASE,
    }),
    keepUnusedDataFor: 10,

    endpoints: (builder) => ({
        login: builder.mutation<ResponseLogin, { email: string; password: string }>({
            query: ({ email, password }) => {
                return {
                    url: `/auth/login?company=${process.env.REACT_APP_COMPANY}&alias=${email}&password=${password}`,
                }
            },
        }),

        calimacoValidateEmail: builder.mutation<ResponseValidate, { email: string }>({
            query: ({ email }) => {
                return {
                    url: `/auth/emailAvailable?company=${process.env.REACT_APP_COMPANY}&email=${email}`,
                }
            },
        }),

        calimacoValidateMobile: builder.mutation<ResponseValidate, { mobile: string }>({
            query: ({ mobile }) => {
                return {
                    url: `/auth/mobileAvailable?company=${process.env.REACT_APP_COMPANY}&mobile=${mobile}`,
                }
            },
        }),
        calimacoValidateDni: builder.mutation<ResponseValidate, { dni: string }>({
            query: ({ dni }) => {
                return {
                    url: `/auth/nationalIDAvailable?company=${process.env.REACT_APP_COMPANY}&nationalID=${dni}`,
                }
            },
        }),

        forgotPassword: builder.mutation({
            query: ({ email }) => {
                return {
                    url: `/auth/forgotPassword?company=${process.env.REACT_APP_COMPANY}&email=${email}`,
                }
            },
        }),

        updatePassword: builder.mutation({
            query: ({ code, password }) => {
                const url = 'auth/updateForgotPassword'
                const body = new URLSearchParams({
                    company: process.env.REACT_APP_COMPANY,
                    // eslint-disable-next-line object-shorthand
                    code: code,
                    password: password,
                })

                return {
                    url,
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useCalimacoValidateEmailMutation,
    useCalimacoValidateMobileMutation,
    useCalimacoValidateDniMutation,
    useForgotPasswordMutation,
    useUpdatePasswordMutation,
    useLoginMutation,
} = calimacoAuthApi
