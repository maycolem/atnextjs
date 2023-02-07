import { useDispatch } from 'react-redux'
import { setUser, reset as resetUser, userSelector } from 'states/features/slices/userSlice'
import { User } from '@interfaces/index'
import { useGetUserDetailsMutation } from '@states/calimaco/calimacoDataApi'
import { useAppSelector } from '@states/store'

export const useGetDetailsUser = () => {
    const dispatch = useDispatch()
    const user = useAppSelector(userSelector)
    // const Client = new CalimacoClient(cfg)
    const [getUserDetails] = useGetUserDetailsMutation()

    const handleSetStateUser = (data: User) => {
        dispatch(setUser(data))
    }
    const handleRemoveStateUser = () => {
        dispatch(resetUser())
    }

    const fetchUserDetails = async () => {
        if (user) {
            const session = user.session
            try {
                const response = await getUserDetails({ session })
                if ('data' in response) {
                    const data = response.data
                    if ('user' in data) {
                        const detailUser = data.user
                        handleSetStateUser({ ...detailUser, session })
                    }
                }
            } catch (error) {
                handleRemoveStateUser()
            }
        }
    }

    return { fetchUserDetails }
}
