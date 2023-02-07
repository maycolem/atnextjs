import { Avatar } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import { ActiveBonusAnimationAvatarSelector } from 'states/slice/ActiveBonusAnimationAvatar'
import styled, { css } from 'styled-components'
import UserMenu from './UserMenu'

const UserAvatar = ({ desktopS, handleEnter, handleLeave, handleToggle, isOpenUserMenu, user }) => {
  const { animated: socketBonusActive } = useSelector(ActiveBonusAnimationAvatarSelector)
  //   const socketBonusActive = true
  return (
    <AvatarS
      id="toggle-menu-user-menu"
      onClick={handleToggle}
      onMouseEnter={desktopS ? handleEnter : null}
      onMouseLeave={desktopS ? handleLeave : null}
    >
      <AvatarMuiS
        $socketBonusActive={socketBonusActive}
        className={classNames({ isOpenUserMenu })}
        src={user?.image}
        sx={{ bgcolor: 'red', width: '35px', height: '35px' }}
        variant="circular"
      >
        <span style={{ textTransform: 'uppercase' }}>{user?.firstName?.slice(0, 1)}</span>
      </AvatarMuiS>

      <UserMenu $menuMax={isOpenUserMenu} onClose={handleToggle} socketBonusActive={socketBonusActive}></UserMenu>
    </AvatarS>
  )
}

export default UserAvatar
const AvatarS = styled.div`
  position: relative;
  background: inherit;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  svg {
    font-size: 30px;
  }
`
const AvatarMuiS = styled(Avatar)`
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

    animation-name: none;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    ${(p) => {
      if (p.$socketBonusActive) {
        return css`
          /* &::after {
            content: '';
            z-index: 2;
            width: 10px;
            height: 10px;
            position: absolute;
            top: -2px;
            left: calc(100% - 9px);
            border-radius: 50%;
            background: #ffc700;
            border: 1px solid #ffa726;
          }
          overflow: initial !important; */
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
