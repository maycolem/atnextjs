/* eslint-disable camelcase */
/* eslint-disable no-undef */
import {
    Response,
    OperationHistory,
    BetsHistory,
    File,
    Detail,
    BankAccount,
    UserBankAccount,
    UserPromotion,
    UserClaimPromotion,
} from '@interfaces/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import store from '@states/store'
import { Session } from 'services/Session'

interface ResponseGetOperacionHistory extends Response {
    total?: number
    data?: Array<OperationHistory>
}
interface ResponseGetBetsHistory extends Response {
    total?: number
    data?: Array<BetsHistory>
}
interface ResponseGetUserFiles extends Response {
    files: File[]
}
interface ResponseGetUserDetails extends Response {
    user: Detail
}
interface ResponseUserPaymentAccountsBank extends Response {
    accounts: UserBankAccount[]
}
interface ResponseGetUserPromotion extends Response {
    data?: UserPromotion[]
}
interface ResponseClaimCodePromotion extends Response {
    user_promotion: UserClaimPromotion
}
interface PropsCommon {
    op_date_init: string
    op_date_end: string
    init: string
    end: string
}
interface PropsGetOperationsHistory extends PropsCommon {
    type: string
    status: string
    operation: string
    amount: string
    session: string
    method?: string
}
interface PropsGetBetsHistory extends PropsCommon {
    type: string
    status: string
    operation: string
    game: string
    session: string
}
interface ResponseAddUserAccountBank extends Response {
    payment_account: number
}

export const calimacoDataApi = createApi({
    reducerPath: 'calimacoDataApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_CALIMACO_API_BASE,
    }),
    keepUnusedDataFor: 10,
    tagTypes: ['OperationsHistory', 'GetUserPromotions'],
    endpoints: (builder) => ({
        getUserDetails: builder.mutation<ResponseGetUserDetails, { session: string }>({
            query: ({ session }) => {
                return {
                    url: `data/getUserDetails`,
                    method: 'POST',
                    body: new URLSearchParams({
                        company: process.env.REACT_APP_COMPANY,
                        session,
                    }),
                }
            },
        }),

        getOperationsHistory: builder.query<ResponseGetOperacionHistory, PropsGetOperationsHistory>({
            query: ({ type, op_date_init, op_date_end, init, end, status, operation, amount, session, method }) => {
                const url = 'data/getOperationsHistory'
                if (session) {
                    const body = new URLSearchParams({
                        company: process.env.REACT_APP_COMPANY,
                        session: session,
                        filter: JSON.stringify({
                            op_date_init,
                            op_date_end,
                            operation,
                            type,
                            amount,
                            status,
                            method,
                        }),
                        limits: JSON.stringify({ init, end }),
                    })
                    return {
                        url,
                        method: 'POST',
                        body,
                    }
                }
                return null
            },
            keepUnusedDataFor: 60,
            providesTags: (_) => ['OperationsHistory'],
        }),

        getOperationsHistoryPayoutPaginate: builder.mutation({
            query: ({ type = '', op_date_init = '', op_date_end = '', init = 0, end = 20, status = '' }) => {
                const url = 'data/getOperationsHistory'
                const user = Session().getUser()
                if (user?.session) {
                    const body = new URLSearchParams({
                        company: process.env.REACT_APP_COMPANY,
                        session: user?.session,
                        filter: JSON.stringify({
                            op_date_init,
                            op_date_end,
                            operation: '',
                            type,
                            amount: '',
                            status,
                        }),
                        limits: JSON.stringify({ init, end }),
                    })
                    return {
                        url,
                        method: 'POST',
                        body,
                    }
                }
                // return null
            },

            transformResponse: (data: any) => {
                if (data.result === 'OK') {
                    const payoutResponse = data.data
                    const responseAPI = payoutResponse.filter((item) => item.amount < 0)
                    data.data = responseAPI
                    return data
                } else {
                    return data
                }
            },
        }),

        getOperationsHistoryPayout: builder.mutation({
            query: ({ session, type = '', op_date_init = '', op_date_end = '', init = 0, end = 20 }) => {
                const url = 'data/getOperationsHistory'
                const body = new URLSearchParams({
                    company: process.env.REACT_APP_COMPANY,
                    session,
                    filter: JSON.stringify({
                        op_date_init,
                        op_date_end,
                        operation: '',
                        type,
                        amount: '',
                        status: '',
                    }),
                    limits: JSON.stringify({ init, end }),
                })
                return {
                    url,
                    method: 'POST',
                    body,
                }
            },

            transformResponse: (data: any) => {
                if (data.result === 'OK') {
                    const payoutResponse = data.data
                    const responseAPI = payoutResponse.filter((item) => item.amount < 0)

                    return responseAPI
                } else {
                    return data
                }
            },
        }),

        getUserFiles: builder.query<ResponseGetUserFiles, { session: string }>({
            query: ({ session }) => {
                return {
                    url: `data/getUserFiles`,
                    method: 'POST',
                    body: new URLSearchParams({
                        session,
                    }),
                }
            },
            keepUnusedDataFor: 0,
        }),

        getFavorites: builder.mutation({
            query: () => {
                const user = Session().getUser()
                if (user?.session) {
                    return {
                        url: `data/getFavourites`,
                        method: 'POST',
                        body: new URLSearchParams({
                            session: user?.session,
                        }),
                    }
                }
            },
        }),

        addLobbyFavorito: builder.mutation({
            query: ({ machine }) => {
                const user = Session().getUser()
                if (user?.session) {
                    return {
                        url: `data/addFavourite`,
                        method: 'POST',
                        body: new URLSearchParams({
                            session: user?.session,
                            machine,
                        }),
                    }
                }
            },
        }),

        deleteLobbyFavorito: builder.mutation({
            query: ({ machine }) => {
                const user = Session().getUser()
                if (user?.session) {
                    return {
                        url: `data/deleteFavourite`,
                        method: 'POST',
                        body: new URLSearchParams({
                            session: user?.session,
                            machine,
                        }),
                    }
                }
            },
        }),

        addUserPaymentAccount: builder.mutation<ResponseAddUserAccountBank, { session: string; payment_account: BankAccount }>({
            // eslint-disable-next-line camelcase
            query: ({ session, payment_account }) => {
                const body = new URLSearchParams()
                body.append('company', process.env.REACT_APP_COMPANY)
                body.append('session', session)
                body.append('payment_account', JSON.stringify(payment_account))
                return {
                    url: `data/addUserPaymentAccount`,
                    method: 'POST',
                    body: body,
                }
            },
        }),

        getUserPaymentAccountsBank: builder.query<UserBankAccount[], { session: string }>({
            query: ({ session }) => {
                return {
                    url: `data/getUserPaymentAccounts`,
                    method: 'POST',
                    body: new URLSearchParams({
                        session,
                    }),
                }
            },
            keepUnusedDataFor: 0,
            transformResponse: (data, meta, arg) => {
                const response = data as ResponseUserPaymentAccountsBank
                if (response?.result === 'OK') {
                    const bankAccount = response.accounts.filter((item) => item.type === 'BANK')
                    return bankAccount
                }
                return []
            },
        }),

        getUserPaymentAccountShop: builder.query({
            query: ({ session }) => {
                return {
                    url: `data/getUserPaymentAccounts`,
                    method: 'POST',
                    body: new URLSearchParams({
                        session,
                    }),
                }
            },
            transformResponse: (data: any) => {
                if (data.result === 'OK') {
                    const bankAccount = data.accounts.filter((item) => item.type === 'SHOP' && item.name !== null && item.name !== '')
                    return bankAccount
                }
            },
        }),

        getUserActivePromotions: builder.query({
            query: ({ session }) => {
                return {
                    url: `data/getUserActivePromotions`,
                    method: 'POST',
                    body: new URLSearchParams({
                        session,
                    }),
                }
            },
            transformResponse: (data: any) => {
                if (data.result === 'OK') {
                    return data.data
                }
            },
        }),

        getUserTournamentAT: builder.query({
            query: (data: any) => {
                const url = 'data/getUserTournaments'
                const body = new URLSearchParams({
                    company: process.env.REACT_APP_COMPANY,
                    session: data?.session,
                    filter: JSON.stringify({
                        op_date_init: data?.op_date_init ?? '',
                        op_date_end: '',
                        operation: '',
                        type: '',
                        amount: '',
                        status: '',
                    }),
                })
                return {
                    url,
                    method: 'post',
                    body,
                }
            },
            keepUnusedDataFor: 0,
        }),
        getUserSingleTournament: builder.query({
            query: ({ session, tournament }) => {
                const url = 'data/getUserTournament'
                const body = new URLSearchParams({
                    company: process.env.REACT_APP_COMPANY,
                    session,
                    tournament,
                })
                return {
                    url,
                    method: 'post',
                    body,
                }
            },
            keepUnusedDataFor: 0,
        }),

        claimCodePromotion: builder.mutation<ResponseClaimCodePromotion, { session: string; code: string }>({
            query: ({ session, code }) =>
                `data/claimCodePromotion?company=${process.env.REACT_APP_COMPANY}&session=${session}&code=${code}`,
            invalidatesTags: ['GetUserPromotions'],
        }),

        getUserPromotions: builder.query<ResponseGetUserPromotion, { session: string }>({
            query: ({ session }) => {
                return {
                    url: `data/getUserPromotions?session=${session}&limits={"init" : 0 , "end" : 20}&filter={"op_date_init":"","op_date_end":"","operation":"", "type":"", "amount":"","status":""}`,
                }
            },
            keepUnusedDataFor: 0,
            providesTags: (_) => ['OperationsHistory'],
        }),

        enRollTournament: builder.mutation({
            query: ({ session, tournament }) => ({
                url: `data/enrolTournament?session=${session}&tournament=${tournament}`,
                method: 'post',
            }),
        }),

        activeUserPromotion: builder.mutation<Response, { promotion: number; session: string }>({
            query: ({ session, promotion }) => ({
                url: `data/activateUserPromotion?company=${process.env.REACT_APP_COMPANY}&session=${session}&promotion=${promotion}`,
            }),
        }),

        cancelUserPromotion: builder.mutation({
            query: ({ session, promotion }) => ({
                url: `data/cancelUserPromotion?company=${process.env.REACT_APP_COMPANY}&session=${session}&promotion=${promotion}`,
            }),
        }),

        updatePassword: builder.mutation({
            query: ({ company, session, old_password, new_password }) => {
                return {
                    url: `data/updatePassword`,
                    method: 'POST',
                    body: new URLSearchParams({
                        company,
                        session,
                        old_password,
                        new_password,
                    }),
                }
            },
            transformResponse: (data: any) => {
                return data
            },
        }),

        postAutoexclude: builder.mutation({
            query: ({ session, days }) => {
                return {
                    url: `data/autoexclude`,
                    method: 'POST',
                    body: new URLSearchParams({
                        session,
                        days,
                    }),
                }
            },
            transformResponse: (data: any) => {
                return data
            },
        }),

        getBetsHistory: builder.query<ResponseGetBetsHistory, PropsGetBetsHistory>({
            query: ({ end, init, game, op_date_end, op_date_init, operation, status, type, session }) => {
                const url = 'data/getBetsHistory'
                if (session) {
                    const body = new URLSearchParams({
                        company: process.env.REACT_APP_COMPANY,
                        session: session,
                        filter: JSON.stringify({
                            op_date_init,
                            op_date_end,
                            operation,
                            type,
                            game,
                            status,
                        }),
                        limits: JSON.stringify({ init, end }),
                    })
                    return {
                        url,
                        method: 'POST',
                        body,
                    }
                }
            },
            keepUnusedDataFor: 60,
        }),

        getBetDetails: builder.mutation({
            query: ({ session, operation }) => {
                const url = 'data/getBetDetails'
                const body = new URLSearchParams({
                    company: process.env.REACT_APP_COMPANY,
                    session,
                    operation,
                })
                return {
                    url,
                    method: 'POST',
                    body,
                }
            },
        }),

        cancelPayout: builder.mutation({
            query: ({ company, session, operation }) => {
                const url = 'data/cancelPayout'
                const body = new URLSearchParams({
                    company,
                    session,
                    operation,
                })

                return {
                    url,
                    method: 'POST',
                    body,
                }
            },
            transformResponse: (data: any) => {
                return data
            },
        }),
        // https://staging.calimaco.com/api/data/updateUserAccounts
        updateUserAccounts: builder.mutation<Response, { session: string; account: string; active: number }>({
            query: ({ session, account, active }) => {
                const url = 'data/updateUserAccounts'
                const body = new URLSearchParams({
                    session,
                    account,
                    currency: 'PEN',
                    active: String(active),
                })
                return {
                    url,
                    method: 'POST',
                    body,
                }
            },
        }),

        getUserConsents: builder.query({
            query: ({ session, company }) => {
                const body = new URLSearchParams({
                    session,
                    company,
                })

                return {
                    url: `data/getUserConsents`,
                    body,
                    method: 'POST',
                }
            },
            transformResponse: (data: any) => {
                return data.data
            },
        }),

        saveUserConsent: builder.mutation({
            query: ({ company, session, consent, agree }) => {
                const url = 'data/saveUserConsent'
                const body = new URLSearchParams({
                    company,
                    session,
                    consent,
                    agree,
                })
                return {
                    url,
                    method: 'POST',
                    body,
                }
            },
        }),

        deleteUserPaymentAccount: builder.mutation<any, { session: string; payment_account: string }>({
            query: ({ session, payment_account }) => {
                const url = 'data/deleteUserPaymentAccount'
                const body = new URLSearchParams({
                    company: process.env.REACT_APP_COMPANY,
                    session: session,
                    payment_account: JSON.stringify({ payment_account: payment_account }),
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

export const {
    useDeleteUserPaymentAccountMutation,
    useSaveUserConsentMutation,
    useGetUserConsentsQuery,
    useUpdateUserAccountsMutation,
    useGetFavoritesMutation,
    useDeleteLobbyFavoritoMutation,
    useCancelPayoutMutation,
    useCancelUserPromotionMutation,
    useActiveUserPromotionMutation,
    useEnRollTournamentMutation,
    useGetUserPromotionsQuery,
    useClaimCodePromotionMutation,
    useGetUserTournamentATQuery,
    useGetUserDetailsMutation,
    useGetOperationsHistoryQuery,
    useGetUserFilesQuery,
    useAddLobbyFavoritoMutation,
    useGetOperationsHistoryPayoutMutation,
    useAddUserPaymentAccountMutation,
    useGetUserPaymentAccountsBankQuery,
    useGetUserPaymentAccountShopQuery,
    useGetUserActivePromotionsQuery,
    useUpdatePasswordMutation,
    usePostAutoexcludeMutation,
    useGetBetsHistoryQuery,
    useGetBetDetailsMutation,
    useGetOperationsHistoryPayoutPaginateMutation,
    useGetUserSingleTournamentQuery,
} = calimacoDataApi
