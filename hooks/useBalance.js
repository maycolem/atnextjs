import { Session } from 'services/Session'
import { useDispatch } from 'react-redux'
import { setUser, reset } from 'states/features/slices/userSlice'
import { ProviderAt } from 'services/ProviderAtService'
import { NotificationClient } from '@calimaco/base'
import { PATHS } from 'routes/paths/PATHS'
import { open } from 'states/slice/ModalLogout'
import { onOpen } from 'states/slice/layout/SnackBar'
import { activeAnimated } from 'states/slice/ActiveBonusAnimationAvatar'
const SocketBalance = () => {
    const user = Session().getUser()
    const dispatch = useDispatch()
    const providerAt = new ProviderAt()
    const INITIAL_SOCKET = {
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
                        const ___user = Session().getUser()
                        const last = ___user.accounts
                        const _new = notification.data
                        const newAccounts = [..._new, ...last]
                        const __new2 = newAccounts.filter((v, i, a) => a.findIndex((v2) => v2.account === v.account) === i)

                        if (___user.session) {
                            const newUser = {
                                ...___user,
                                accounts: __new2,
                            }
                            Session().setUser(newUser)
                            dispatch(setUser(newUser))
                            console.log(newUser)
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
                        const resUserDetail = await providerAt.userDetail(user.session)
                        const _user = {
                            ...resUserDetail.user,
                            session: user.session,
                        }
                        Session().setUser(_user)
                        dispatch(setUser(_user))
                        if (_user?.verified)
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
                    // dispatch(setIsLogout())
                    dispatch(open())
                    dispatch(reset())
                    Session().removeUser()
                    if (typeof window !== 'undefined') {
                        localStorage?.setItem('IsLogout', JSON.stringify('true'))
                        window.open(PATHS.HOME.url, '_self')
                    }
                    // await router.push(PATHS.HOME.url)
                    break
            }
        },
        // pendingNotificationCallback: async function (pendings) {
        //   console.log('Pending Notifications : ' + JSON.stringify(pendings))
        // },
    }

    if (user) {
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
                <NotificationClient config={INITIAL_SOCKET}></NotificationClient>
            </div>
        )
    } else {
        return null
    }
}

export default SocketBalance
