import { Bank, BankType, Banner, Response, Retiro, User } from '@interfaces/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Session } from 'services/Session'
import { Lobby, Provider } from '../../interfaces'

// Define a service using a base URL and expected endpoints

interface ResponsePayout extends Response {
    methods: Array<Retiro>
}

interface ResponseGetLobby extends Response {
    lobby: Lobby[]
    providers: Provider[]
    tags: string[]
    total_machines?: number
}

interface ResponseGetBanners extends Response {
    banners: Banner[]
}

interface ResponseGetTags extends Response {
    tags: Tag[]
}
interface ResponseGetBankAccountTypes extends Response {
    types: BankType[]
}
interface ResponseGetBanks extends Response {
    banks: Bank[]
}
interface Tag {
    tag: string
    name: string
}

interface PropsCommon {
    op_date_init: string
    op_date_end: string
    init: number
    end: number
}
interface PropsGetLobby extends PropsCommon {
    name: string
    providers: string
    tags: string
    favourites: boolean
    lobby: string
    session?: string
}

export const calimacoContentApi = createApi({
    reducerPath: 'calimacoContentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_CALIMACO_API_BASE,
    }),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        getLobby: builder.query<ResponseGetLobby, PropsGetLobby>({
            query: (props) => {
                const url = 'contents/getLobby'
                const filter = {
                    name: props.name,
                    providers: props.providers,
                    tags: props.tags,
                    favourites: props.favourites,
                }
                const limits = {
                    init: props.init,
                    end: props.end,
                }
                const body = new URLSearchParams({
                    company: process.env.REACT_APP_COMPANY,
                    lobby: props.lobby,
                    filter: JSON.stringify(filter),
                    limits: JSON.stringify(limits),
                })
                if (props?.session) {
                    body.append('session', props.session)
                }

                return {
                    url,
                    method: 'POST',
                    body,
                }
            },
            keepUnusedDataFor: 0,
        }),
        getContent: builder.mutation({
            query: ({ lobby, filter, limits }) => {
                const user = Session().getUser()
                const url = 'contents/getLobby'
                let body = {}
                if (user?.session) {
                    body = new URLSearchParams({
                        company: process.env.REACT_APP_COMPANY,
                        lobby,
                        filter: JSON.stringify(filter),
                        limits: JSON.stringify(limits),
                        session: user.session,
                    })
                } else {
                    body = new URLSearchParams({
                        company: process.env.REACT_APP_COMPANY,
                        lobby,
                        filter: JSON.stringify(filter),
                        limits: JSON.stringify(limits),
                    })
                }
                return {
                    url,
                    method: 'POST',
                    body,
                }
            },
            transformResponse: (data: any) => {
                return data.lobby
            },
        }),

        getContentQuery: builder.query({
            query: ({ lobby, filter: _filter, limits, session }) => {
                const filter = {
                    ..._filter,
                }
                // const user = Session().getUser()
                const url = 'contents/getLobby'
                let body = new URLSearchParams({})
                if (session) {
                    body = new URLSearchParams({
                        company: process.env.REACT_APP_COMPANY,
                        lobby,
                        filter: JSON.stringify(filter),
                        limits: JSON.stringify(limits),
                        session,
                    })
                } else {
                    filter.favourites = ''
                    body = new URLSearchParams({
                        company: process.env.REACT_APP_COMPANY,
                        lobby,
                        filter: JSON.stringify(filter),
                        limits: JSON.stringify(limits),
                    })
                }
                if (!limits) {
                    body.delete('limits')
                }
                return {
                    url,
                    method: 'POST',
                    body,
                }
            },
            keepUnusedDataFor: 0,
        }),

        getFragment: builder.query({
            query: ({ fragment }) => {
                const user = Session().getUser()
                const url = 'contents/getWebFragment'
                const body = new URLSearchParams()
                body.append('company', process.env.REACT_APP_COMPANY)
                body.append('fragment', fragment)
                if (user?.session) {
                    body.append('session', user?.session)
                }
                return {
                    url,
                    body,
                    method: 'post',
                }
            },
            transformResponse: (data: any) => {
                if (data.result === 'OK') {
                    return data.data
                }
            },
        }),

        getPayoutLobby: builder.query<ResponsePayout, string>({
            query: (session) => `contents/getPayoutLobby?company=${process.env.REACT_APP_COMPANY}&session=${session}`,
            keepUnusedDataFor: 30,
        }),

        getPayoutLobbyAstropay: builder.query({
            query: (session) => `contents/getPayoutLobby?company=${process.env.REACT_APP_COMPANY}&session=${session}`,
            transformResponse: (data: any) => {
                if (data.result === 'OK') {
                    const Astropay = data.methods.filter((item) => item.method === 'ASTROPAY_PAYOUT')
                    return Astropay[0]
                }
            },
        }),

        getPayoutLobbyShop: builder.query({
            query: (session) => `contents/getPayoutLobby?company=${process.env.REACT_APP_COMPANY}&session=${session}`,
            transformResponse: (data: any) => {
                if (data.result === 'OK') {
                    const Astropay = data.methods.filter((item) => item.method === 'ATPAYMENTSERVICE_PAYOUT')
                    return Astropay[0]
                }
            },
        }),

        getPayoutLobbyBank: builder.query({
            query: (session) => `contents/getPayoutLobby?company=${process.env.REACT_APP_COMPANY}&session=${session}`,
            transformResponse: (data: any) => {
                if (data.result === 'OK') {
                    const Astropay = data.methods.filter((item) => item.method === 'BANK_PAYOUT')
                    return Astropay[0]
                }
            },
        }),

        getPayoutLobbyNiubiz: builder.query({
            query: (session) => `contents/getPayoutLobby?company=${process.env.REACT_APP_COMPANY}&session=${session}`,
            transformResponse: (data: any) => {
                if (data.result === 'OK') {
                    const Astropay = data.methods.filter((item) => item.method === 'NIUBIZ_PAYOUT')
                    return Astropay[0]
                }
            },
        }),

        getBankAccountTypes: builder.query<ResponseGetBankAccountTypes, unknown>({
            query: () => `contents/getBankAccountTypes?company=${process.env.REACT_APP_COMPANY}`,
        }),
        getBanners: builder.query<ResponseGetBanners, { container: string }>({
            query: ({ container }) => `contents/getBanners?company=${process.env.REACT_APP_COMPANY}&container=${container}`,
            keepUnusedDataFor: 60,
        }),

        getBanks: builder.query<ResponseGetBanks, unknown>({
            query: () => `contents/getBanks?company=${process.env.REACT_APP_COMPANY}`,
        }),

        getShops: builder.mutation({
            query: ({ company, ubigeo }) => {
                const url = 'contents/getShops'
                const body = new URLSearchParams({
                    company,
                    ubigeo,
                })
                return {
                    url,
                    method: 'POST',
                    body,
                }
            },
            transformResponse: (data: any) => {
                return data.shops
            },
        }),

        getProviders: builder.query({
            query: () => `contents/getProviders?company=${process.env.REACT_APP_COMPANY}`,
            transformResponse: (data: any) => {
                if (data?.result === 'OK') {
                    return data?.providers
                }
            },
        }),

        getTags: builder.query<ResponseGetTags, unknown>({
            query: () => `contents/getTags?company=${process.env.REACT_APP_COMPANY}`,
        }),

        promotionLobbies: builder.query({
            query: ({ lobby }) => `contents/getPromotionsLobby?company=${process.env.REACT_APP_COMPANY}&lobby=${lobby}`,
        }),

        promotionDetail: builder.query({
            query: ({ promotion }) => `contents/getPromotionDetails?company=${process.env.REACT_APP_COMPANY}&promotion=${promotion}`,
        }),

        tournamentLobbies: builder.query({
            query: ({ lobby }) => {
                const user = Session().getUser()
                const body = new URLSearchParams()
                body.append('company', process.env.REACT_APP_COMPANY)
                body.append('lobby', lobby)
                if (user?.session) {
                    body.append('session', user.session)
                }

                return {
                    url: `contents/getTournamentsLobby`,
                    body,
                    method: 'POST',
                }
            },
            keepUnusedDataFor: 5,
        }),

        tournamentDetail: builder.query({
            query: ({ tournament }) => {
                const user = Session().getUser()
                const body = new URLSearchParams()
                body.append('company', process.env.REACT_APP_COMPANY)
                body.append('tournament', tournament)
                if (user?.session) {
                    body.append('session', user.session)
                }
                return { url: `contents/getTournamentDetails`, body, method: 'POST' }
            },
        }),

        rankingTournament: builder.query({
            query: ({ tournament }) => `contents/getTournamentRanking?company=${process.env.REACT_APP_COMPANY}&tournament=${tournament}`,
        }),

        getAgentShops: builder.query({
            query: ({ agent }) => `contents/getAgentShops?company=${process.env.REACT_APP_COMPANY}&agent=${agent}`,
        }),

        getPreferences: builder.query({
            query: () => `contents/getPreferences?company=${process.env.REACT_APP_COMPANY}`,
        }),

        getConsents: builder.query({
            query: () => `contents/getConsents?company=${process.env.REACT_APP_COMPANY}`,
        }),
        getPaymentMethods: builder.query({
            query: () => {
                const session = Session().getUser('user').session || ''
                return {
                    url: `contents/getDepositLobby`,
                    method: 'post',
                    body: new URLSearchParams({
                        company: process.env.REACT_APP_COMPANY,
                        session: session,
                    }),
                }
            },
        }),
    }),
})

export const {
    useGetConsentsQuery,
    useGetPreferencesQuery,
    useGetAgentShopsQuery,
    useGetBannersQuery,
    usePromotionDetailQuery,
    usePromotionLobbiesQuery,
    useRankingTournamentQuery,
    useTournamentDetailQuery,
    useTournamentLobbiesQuery,
    useGetContentMutation,
    useGetFragmentQuery,
    useGetPayoutLobbyQuery,
    useGetPayoutLobbyAstropayQuery,
    useGetPayoutLobbyShopQuery,
    useGetPayoutLobbyBankQuery,
    useGetPayoutLobbyNiubizQuery,
    useGetBankAccountTypesQuery,
    useGetBanksQuery,
    useGetShopsMutation,
    useGetProvidersQuery,
    useGetTagsQuery,
    useGetContentQueryQuery,
    useGetLobbyQuery,
    useGetPaymentMethodsQuery,
} = calimacoContentApi
