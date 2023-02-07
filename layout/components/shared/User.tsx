import styled, { css } from 'styled-components'
import React, { useState } from 'react'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import UserMenu from './UserMenu'
import UserBalance from './UserBalance'
import { userSelector } from 'states/features/slices/userSlice'
import { setOpen } from 'states/features/slices/LoginModalSlice'
import { LoadingButton } from '@mui/lab'
import { GoogleTagManager } from 'google/TagManager'
import { Avatar, ClickAwayListener } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import classNames from 'classnames'
import { open } from 'states/slice/ModalRecarga'
import { ShowSaldoSelector } from 'states/slice/ShowSaldo'
import hexAlpha from 'hex-alpha'
import useMediaQueryAT from 'hooks/useMediaQueryAT'
import { ActiveBonusAnimationAvatarSelector } from 'states/slice/ActiveBonusAnimationAvatar'
import { useAppDispatch, useAppSelector } from '@states/store'
import { dtHeaderClick, dtHeaderRecarga } from '@layout/dt'
const User = ({ ...rest }) => {
    const user = useAppSelector(userSelector)
    const dispatch = useAppDispatch()
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    const { value: valueShowSaldo } = useAppSelector(ShowSaldoSelector)
    const handleOpen = () => {
        dispatch(setOpen())
    }
    const [isOpenUserMenu, setIsOpenUserMenu] = useState(false)
    const [isOpenBalance, setIsOpenBalance] = useState(false)
    const { animated } = useAppSelector(ActiveBonusAnimationAvatarSelector)
    const handleToggle = () => {
        setIsOpenUserMenu(!isOpenUserMenu)
    }
    const handleEnter = () => {
        setIsOpenUserMenu(true)
    }
    const handleLeave = () => {
        setIsOpenUserMenu(false)
    }

    const handleToggleBalance = () => {
        setIsOpenBalance(!isOpenBalance)
    }

    const handleOpenBalanceAway = () => {
        setIsOpenBalance(false)
    }
    const handleOpenUserMenuAway = () => {
        setIsOpenUserMenu(false)
    }
    const handleOnClickRecharge = () => {
        dispatch(open())
        dtHeaderRecarga()
    }
    return (
        <Styled {...rest}>
            {user ? (
                <>
                    <StyledUserInfo>
                        <ClickAwayListener onClickAway={handleOpenBalanceAway}>
                            <div>
                                <StyledAmount onClick={handleToggleBalance} $valueShowSaldo={valueShowSaldo}>
                                    <div className="top">
                                        {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(user?.totalAmount / 100)}
                                    </div>
                                    <div className="bottom">
                                        <div className="bono-balance-expand">
                                            <KeyboardArrowDownIcon />
                                            <p className="bono-balance-expand-amount">
                                                <span>Bono</span>
                                                <span>
                                                    {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
                                                        user?.totalBonus / 100
                                                    )}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </StyledAmount>
                                <UserBalance isOpenBalance={isOpenBalance} />
                            </div>
                        </ClickAwayListener>

                        <ClickAwayListener onClickAway={handleOpenUserMenuAway}>
                            <StyledUser
                                onClick={handleToggle}
                                onMouseEnter={desktopS ? handleEnter : null}
                                onMouseLeave={desktopS ? handleLeave : null}
                            >
                                <StyledAvatar
                                    $socketBonusActive={animated}
                                    className={classNames({ isOpenUserMenu })}
                                    src={user['image'] || null}
                                    sx={{ bgcolor: 'red', width: '35px', height: '35px' }}
                                    variant="circular"
                                >
                                    <span style={{ textTransform: 'uppercase' }}>{user?.firstName?.slice(0, 1)}</span>
                                </StyledAvatar>

                                <UserMenu isOpenUserMenu={isOpenUserMenu} onClose={handleToggle} socketBonusActive={animated} />
                            </StyledUser>
                        </ClickAwayListener>
                        <StyledButtonRecharge color="secondary" onClick={handleOnClickRecharge} variant="contained">
                            Recargar
                        </StyledButtonRecharge>
                    </StyledUserInfo>
                </>
            ) : (
                <>
                    <StyledAuth>
                        <Link href={PATHS.REGISTRO.url} onClick={() => dtHeaderClick('mi cuenta / registrate')}>
                            <p>Regístrate</p>
                        </Link>
                        <span>|</span>
                        <a onClick={() => dtHeaderClick('mi cuenta / inicia sesion')}>
                            <p onClick={handleOpen}>Inicia sesión</p>
                        </a>
                    </StyledAuth>
                </>
            )}
        </Styled>
    )
}

export default User

interface PropsStyled {
    $valueShowSaldo?: boolean
    $socketBonusActive?: boolean
}

const StyledAvatar = styled(Avatar)<PropsStyled>`
    & {
        position: relative;
        transition: 200ms;
        outline: 1px solid transparent;
        outline-offset: 2px;
        overflow: initial;
        &.isOpenUserMenu {
            outline: 1px solid ${(p) => p.theme.palette.primary.main};
            outline-offset: 2px;
        }
        &.isOpenUserMenu.isOpenUserMenuUser {
            outline: 1px solid ${(p) => p.theme.palette.alternate16.main};
        }

        animation-name: none;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        ${(p) => {
            if (p.$socketBonusActive) {
                return css`
                    position: relative;
                    animation-name: pulse;
                    @keyframes pulse {
                        0% {
                            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7), 0 0 0 0 rgba(255, 0, 0, 0.7);
                        }
                        40% {
                            /* transform: scale(1.1); */
                            box-shadow: 0 0 0 12px rgba(255, 0, 0, 0), 0 0 0 0 rgba(255, 0, 0, 0.7);
                        }
                        80% {
                            /* transform: scale(1); */
                            box-shadow: 0 0 0 12px rgba(255, 0, 0, 0), 0 0 0 6px rgba(255, 0, 0, 0);
                        }
                        100% {
                            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0), 0 0 0 9px rgba(255, 0, 0, 0);
                        }
                    }
                `
            }
        }}
    }
`
const StyledUser = styled.div`
    position: relative;
    background: inherit;
    /* padding-left: 10px;
  padding-right: 10px; */
    cursor: pointer;
    svg {
        font-size: 30px;
    }
`

const StyledAuth = styled.div`
    display: flex;
    position: relative;
    align-items: flex-end;
    flex-direction: row;
    cursor: pointer;
    gap: 0.4em;
    align-items: center;
    & {
        > span {
            color: ${(p) => p.theme.palette.alternate8.main};
        }
        p {
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 1rem;
            transition: 250ms;
            font-weight: 400;
            white-space: nowrap;
            &:hover {
                color: ${(p) => p.theme.palette.primary.main};
            }
        }
    }
`
const StyledButtonRecharge = styled(LoadingButton)`
    & {
        font-family: 'Rubik';
        font-style: normal;
        font-size: 1rem;
        border-radius: 4px;
        padding: 0.2rem calc(1rem + 0.5vw);
        font-weight: 500;
        text-transform: capitalize;
        min-height: inherit;
        height: inherit;
        /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
        box-shadow: none;
        border: 2px solid ${(x) => hexAlpha(x.theme.palette.warning.main, 0.4)};
        &:hover {
            box-shadow: none;
        }
    }
`

const Styled = styled.div`
    & {
        display: flex;
        align-items: center;
        /* gap: 10px; */
        background: inherit;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 999999 !important;
        justify-content: flex-end;
    }
`

const StyledAmount = styled.div<PropsStyled>`
    & {
        transition: 150ms;
        background: inherit;
        cursor: pointer;
        > div {
            text-align: right;
        }
        .top {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 500;
            font-size: 1.1em;
            color: ${(p) => p.theme.palette.alternate11.main};
        }
        .bottom {
            cursor: pointer;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 500;
            font-size: 0.7em;
            line-height: 15px;
            color: #a0a0a0;
            display: flex;
            align-items: center;
            color: ${(p) => p.theme.palette.primary.main};
            padding-right: 1px;
            line-height: 1;
            position: relative;
            background: inherit;
            .bono-balance-expand {
                display: flex;
                align-items: center;
                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Old versions of Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
                > .bono-balance-expand-amount {
                    display: flex;
                    > span:first-of-type {
                        margin-right: 3px;
                    }
                }
            }
            :hover {
                svg {
                    opacity: 1;
                }
            }
            svg {
                transition: 100ms;
                opacity: 1;
                font-size: 16px;
                position: relative;
            }
        }
        ${(p) => {
            if (p.$valueShowSaldo) {
                return css`
                    & {
                        opacity: 1;
                    }
                `
            }
            if (!p.$valueShowSaldo) {
                return css`
                    & {
                        opacity: 0;
                        overflow: hidden;
                        & ~ div {
                            opacity: 0;
                        }
                    }
                `
            }
        }}
    }
`

const StyledUserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    background: inherit;
    z-index: 999999 !important;
`
