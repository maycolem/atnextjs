import registerModalSuccessReducer from './features/slices/registerModalSuccessSlice'
import loginModalReducer from './features/slices/LoginModalSlice'
import casinoModalReducer from './features/slices/CasinoModalSlice'
import recuperarPasswordReducer from './features/slices/RecuperarPasswordSlice'
import ModalRechargeReducer from './slice/ModalRecharge'
import ModalRecarga from './slice/ModalRecarga'
import ShowSaldo from './slice/ShowSaldo'
import PannelBackArrowURL from './slice/layout/PannelBackArrowURL'
import VerifyMessage from './slice/layout/VerifyMessage'
import SnackBar from './slice/layout/SnackBar'
import CasinoLobbies from './slice/casino/CasinoLobbies'
import retiroPaymentReducer from './features/slices/retiroPaymentSlice'
import ModalLogout from './slice/ModalLogout'
import ActiveBonusAnimationAvatar from './slice/ActiveBonusAnimationAvatar'
import KushkiPromoBonus from './slice/kushki/PromoBonus'
import PromoCashGifts from './slice/cashGifts/PromoCashGifts'
import UserReducer from './features/slices/userSlice'
import WebThemes from './slice/themes/WebThemes'
import { calimacoAuthApi } from './calimaco/calimacoAuthApi'
import { calimacoContentApi } from './calimaco/calimacoContentApi'
import { calimacoDataApi } from './calimaco/calimacoDataApi'
import { calimacoPaymentApi } from './calimaco/calimacoPaymentApi'
import { calimacoProviderApi } from './calimaco/calimacoProviderApi'
import { paymentApi } from './api/calimaco/payment'
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
    configureStore({
        reducer: {
            user: UserReducer,
            registerModalSuccess: registerModalSuccessReducer,
            loginModal: loginModalReducer,
            casinoModal: casinoModalReducer,
            recuperarPasswordModal: recuperarPasswordReducer,
            ModalRecharge: ModalRechargeReducer,
            ModalRecarga,
            ShowSaldo,
            retiroPayment: retiroPaymentReducer,
            PannelBackArrowURL,
            SnackBar,
            CasinoLobbies,
            ModalLogout,
            VerifyMessage,
            ActiveBonusAnimationAvatar,
            KushkiPromoBonus,
            PromoCashGifts,
            WebThemes,
            [calimacoAuthApi.reducerPath]: calimacoAuthApi.reducer,
            [calimacoContentApi.reducerPath]: calimacoContentApi.reducer,
            [paymentApi.reducerPath]: paymentApi.reducer,
            [calimacoDataApi.reducerPath]: calimacoDataApi.reducer,
            [calimacoPaymentApi.reducerPath]: calimacoPaymentApi.reducer,
            [calimacoProviderApi.reducerPath]: calimacoProviderApi.reducer,
        },
        // devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(calimacoAuthApi.middleware)
                .concat(calimacoContentApi.middleware)
                .concat(paymentApi.middleware)
                .concat(calimacoDataApi.middleware)
                .concat(calimacoPaymentApi.middleware)
                .concat(calimacoProviderApi.middleware),
        ...options,
    })

export const store = createStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
