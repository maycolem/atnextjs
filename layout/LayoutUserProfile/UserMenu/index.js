import React from 'react'
import UserMenuComponent from 'layout/components/shared/UserMenu'
import styled from 'styled-components'
const UserMenu = () => {
    return <UserMenuComponentCustom>UserMenu</UserMenuComponentCustom>
}

export default UserMenu
const UserMenuComponentCustom = styled(UserMenuComponent)`
    && {
        position: static;
        max-height: initial;
        height: initial;
        z-index: 99 !important;
        opacity: 1;
        top: initial;
        right: initial;
        pointer-events: all;
        flex: 1;
        flex-direction: column;
        box-shadow: none;
        border: 0;
        ::after,
        ::before {
            display: none;
        }
        > .wrapper {
            border: 0;
            padding: 0;
            flex: 1;
            max-height: initial;
            background: transparent;
            a {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
            }
        }
    }
`
