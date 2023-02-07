import styled from '@emotion/styled'
import { PATHS } from 'routes/paths/PATHS'
import { currency } from 'helpers/currency'
import UserMenuSidebar from 'layout/LayoutDefault/Header/UserMenuSidebar/UserMenuSidebar'
import Link from 'next/link'
import { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { ProviderAt } from 'services/ProviderAtService'
import giftPNG from 'public/assets/Layout/gift.png'
import { Session } from 'services/Session'

const LoginLink = () => {
    const user = Session().getUser()
    const [toggleUserMenu, setToggleUserMenu] = useState(false)
    const handleOpenMenuUser = () => {
        setToggleUserMenu(true)
    }

    const handleCloseMenuUser = () => {
        setToggleUserMenu(false)
    }
    const handleToggleMenuUser = () => {
        setToggleUserMenu(!toggleUserMenu)
    }
    return (
        <LoginLinkS>
            <Link href={PATHS.ACCOUNT_MY_BILLETERA_RECARGA.url} legacyBehavior>
                <RechargeS className="px-14 py-2 bg-amber-400 rounded-8">RECARGA</RechargeS>
            </Link>
            <UserInfoS>
                {!user ? (
                    <>
                        <Link href={PATHS.LOGIN.url}>INGRESA</Link>
                        {'/'}
                        <Link href={PATHS.REGISTRO.url}>REGISTRATE</Link>
                        <BiUserCircle className="iconUser" color="#757575" size="40px" />
                    </>
                ) : (
                    <>
                        <GiftS>
                            <img alt="gift Apuest Total" src={giftPNG.src} />
                        </GiftS>
                        <AmountS>
                            <div className="top">{currency(user?.totalAmount, user?.currency)}</div>
                            <div className="bottom">{currency(user?.totalAmount, user?.currency)}</div>
                        </AmountS>
                        <div className="iconUser-login" onClick={handleToggleMenuUser}>
                            <BiUserCircle color="#757575" size="40px" />
                        </div>
                    </>
                )}
                {toggleUserMenu && <UserMenuSidebar handleCloseMenuUser={handleCloseMenuUser} handleOpenMenuUser={handleOpenMenuUser} />}
            </UserInfoS>
        </LoginLinkS>
    )
}

export default LoginLink
const GiftS = styled('div')`
    margin: 0 1rem;
    img {
        max-width: 2rem;
        min-width: 2rem;
        object-fit: contain;
    }
`
const UserInfoS = styled('div')`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    svg.iconUser {
        font-size: 2.3rem;
    }
    & {
        a {
            font-size: 0.7rem;
            font-weight: 500;
            line-height: initial;
        }
        .iconUser-login {
            cursor: pointer;
            display: grid;
            place-items: center;
        }
    }
`
const LoginLinkS = styled('div')`
    display: flex;
    align-items: center;
    gap: 1rem;
`
const AmountS = styled('div')`
    & {
        > div {
            text-align: right;
        }
        .top {
            font-size: 1rem;
            font-weight: 400;
            line-height: initial;
        }
        .bottom {
            font-size: 0.7rem;
            font-weight: 400;
            margin-right: 2px;
            line-height: initial;
        }
    }
`
const RechargeS = styled('div')`
    & {
        cursor: pointer;
        font-size: 0.8rem;
        line-height: initial;
        padding: 0.5rem 2rem;
        border-radius: 1rem;
        background: #ffca28;
        border-radius: 1rem;
        font-weight: 500;
        transition: 0.2s;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        :hover {
            box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
        }
    }
`
