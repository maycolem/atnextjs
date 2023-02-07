import { userSelector, userSessionSelector } from '@states/features/slices/userSlice'
import { Session } from 'services/Session'
import { useDispatch } from 'react-redux'
import { setUser, reset } from 'states/features/slices/userSlice'
import { ProviderAt } from 'services/ProviderAtService'
import { NotificationClient } from '@calimaco/base'
import { PATHS } from 'routes/paths/PATHS'
import { open } from 'states/slice/ModalLogout'
import { onOpen } from 'states/slice/layout/SnackBar'
import { activeAnimated } from 'states/slice/ActiveBonusAnimationAvatar'
import { useAppSelector } from '@states/store'
const Socket = () => {
    const user = useAppSelector(userSelector)
    const dispatch = useDispatch()
    const providerAt = new ProviderAt()
    const config = {
        host: process.env.REACT_APP_CALIMACO_BASE,
        path: '/api/notifications',
        cms: process.env.REACT_APP_WEB_CMS,
        company: process.env.REACT_APP_COMPANY,
        user: user ?? {
            session: 'anonymous',
            user: 'anonymous',
        },
        notificationCallback: async function (notification) {
            // console.log('Notification Message: ' + JSON.stringify(notification))
            switch (notification.type) {
                case 'LOGIN_OK':
                    if (typeof window !== 'undefined') {
                        localStorage?.removeItem('IsLogout')
                    }
                    break
                case 'PROMOTION':
                    console.log('SOCKET NEW PROMOTION')
                    dispatch(activeAnimated())
                    break
                case 'UPDATE_BALANCE':
                    if (notification.data) {
                        const last = user.accounts
                        const socketAccounts = notification.data
                        const joinAccounts = [...socketAccounts, ...last]
                        const filterOverrideAccounts = joinAccounts.filter((v, i, a) => a.findIndex((v2) => v2.account === v.account) === i)

                        if (user.session) {
                            const newUser = {
                                ...user,
                                accounts: filterOverrideAccounts,
                            }
                            Session().setUser(newUser)
                            dispatch(setUser(newUser))
                        }
                    }
                    break

                case 'LOW_BALANCE':
                    console.log('Notification LOW_BALANCE: ' + JSON.stringify(notification.data))
                    break

                case 'LOGIN_ERROR':
                    dispatch(reset())
                    Session().removeUser()

                    if (typeof window !== 'undefined') {
                        window.open(PATHS.HOME.url, '_self')
                    }
                    break

                case 'USER_VERIFIED':
                    if (user.session) {
                        const response = await providerAt.userDetail(user.session)
                        const newUser = {
                            ...response.user,
                            session: user.session,
                        }
                        Session().setUser(newUser)
                        dispatch(setUser(newUser))
                        if (newUser?.verified)
                            dispatch(
                                onOpen({
                                    message: 'Sobrino tu cuenta ha sido verificada.',
                                    severity: 'success',
                                    open: true,
                                    autoHideDuration: 3000,
                                })
                            )
                    }

                    break

                case 'SESSION_EXPIRED':
                    dispatch(open())
                    dispatch(reset())
                    Session().removeUser()
                    if (typeof window !== 'undefined') {
                        localStorage?.setItem('IsLogout', JSON.stringify('true'))
                        window.open(PATHS.HOME.url, '_self')
                    }
                    break
            }
        },
        // pendingNotificationCallback: async function (pendings) {
        //   console.log('Pending Notifications : ' + JSON.stringify(pendings))
        // },
    }

    return (
        <div
            id="9895834dsdasdsadsads324-at"
            style={{
                opacity: '0',
                pointerEvents: 'none',
                position: 'absolute',
                visibility: 'hidden',
            }}
        >
            <NotificationClient config={config} />
        </div>
    )
}

export const SocketCalimaco = () => {
    const session = useAppSelector(userSessionSelector)

    if (session) {
        return <Socket />
    }
    return <></>
}
