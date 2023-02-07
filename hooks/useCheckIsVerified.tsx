import React, { useEffect } from 'react'
import { User } from '@interfaces/user'
import { userSelector } from '@states/features/slices/userSlice'
import { onOpen } from '@states/slice/layout/SnackBar'
import { useAppDispatch, useAppSelector } from '@states/store'
import { useRouter } from 'next/router'
import { set as setVerify } from 'states/slice/layout/VerifyMessage'

interface Props {
    message: string
    redirectPathname: string
}

export const useCheckIsVerified = ({ message, redirectPathname }: Props) => {
    const user = useAppSelector(userSelector)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleVerified = async (user: User) => {
        if (user && !user.verified) {
            dispatch(onOpen({ message }))
            dispatch(setVerify(false))
            await router.push(redirectPathname)
        }
    }

    useEffect(() => {
        handleVerified(user)
    }, [user])

    return null
}
