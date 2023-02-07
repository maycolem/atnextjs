import { FormControlLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Switch from '@mui/material/Switch'
import hexAlpha from 'hex-alpha'
import { setUser, userSelector, userSessionSelector } from 'states/features/slices/userSlice'
import { useGetUserDetailsMutation, useUpdateUserAccountsMutation } from 'states/calimaco/calimacoDataApi'
import { useAppDispatch, useAppSelector } from '@states/store'
import { User } from '@interfaces/index'

interface Props {
    className?: string
}

export const Bonus = ({ className }: Props) => {
    const session = useAppSelector(userSessionSelector)
    const user = useAppSelector(userSelector)
    const [checked, setChecked] = useState<boolean>(false)
    const [update, { isLoading }] = useUpdateUserAccountsMutation()
    const [getUserDetails] = useGetUserDetailsMutation()
    const dispatch = useAppDispatch()

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueSwitch = event.target.checked
        setChecked(valueSwitch)
        const data = await update({ session: session, account: 'CASINO-BONUS', active: Number(valueSwitch) })
        if ('data' in data && data.data.result === 'OK') {
            const response = await getUserDetails({ session: session })
            if ('data' in response) {
                const data = response.data
                if ('user' in data) {
                    const detailUser = data.user
                    handleSetStateUser({ ...detailUser, session })
                }
            }
        }
    }

    const handleSetStateUser = (data: User) => {
        dispatch(setUser(data))
    }

    useEffect(() => {
        if (user) {
            handleGetAccountBoolean()
        }
    }, [user])

    const handleGetAccountBoolean = () => {
        const casinoBonus = user?.accounts?.find((acc) => acc.account === 'CASINO-BONUS')
        if (casinoBonus) {
            setChecked(Boolean(casinoBonus.active))
            return
        }
        setChecked(false)
    }

    return (
        <Styled className={className}>
            <div className="wrapper-detail">
                <div className="balance-name">Casino</div>
                <div className="status">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checked}
                                color="success"
                                disabled={isLoading}
                                inputProps={{ 'aria-label': 'controlled' }}
                                onChange={handleChange}
                            />
                        }
                        label=""
                    />
                </div>
                <div className="amount">
                    {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(user.casinoBonus / 100)}
                </div>
            </div>
            <div className="wrapper-detail">
                <div className="balance-name">Deportivas</div>
                <div className="status"></div>
                <div className="amount">
                    {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(user.bettingBonus / 100)}
                </div>
            </div>
            <div className="wrapper-detail">
                <div className="balance-name">Total bonos</div>
                <div className="status"></div>
                <div className="amount">
                    {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(user.totalBonus / 100)}
                </div>
            </div>
        </Styled>
    )
}

const Styled = styled.div`
    & {
        background: inherit;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 5px;
        z-index: 99;
        position: relative;
        > .wrapper-detail {
            padding: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            :hover {
                /* background: ${(p) => hexAlpha(p.theme.palette.primary.main, 0.2)}; */
            }
            > div {
                min-width: 80px;
                min-height: 30px;
                color: #464646;
                text-align: left;
                display: flex;
                align-items: center;
                /* color: ${(p) => p.theme.palette.alternate13.main}; */
                font-size: 0.9rem;
                font-weight: 400;
                white-space: nowrap;
                &.status {
                    justify-content: center;
                    position: relative;
                    z-index: 99;
                    .MuiFormControlLabel-root {
                        margin: 0 !important;
                    }
                }
                &.amount {
                    justify-content: flex-end;
                }
            }
        }
    }
`
