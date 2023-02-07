import { Meta } from '@components/Meta'
import { Casino } from '@components/pages/casino-be98867001f70b94097d'
import { Casino as CasinoOld } from '@components/pages/casino/index'
import { PATHS } from '@routes/paths/PATHS'
import styled from 'styled-components'
import * as React from 'react'
import { styled as styledMui } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import classNames from 'classnames'
let rest = 10
const IOSSwitch: any = styledMui((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(({ theme }) => ({
    width: 42 - rest,
    height: 26 - rest,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22 - rest,
        height: 22 - rest,
    },
    '& .MuiSwitch-track': {
        borderRadius: (26 - rest) / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}))
const Index = () => {
    const [checked, setChecked] = React.useState(true)

    const handleChange = (event) => {
        setChecked(event.target.checked)
    }

    return (
        <>
            <Meta title="Casino" />
            <StyledInfo className={classNames({ white: checked })}>
                <FormControlLabel
                    style={{
                        flexDirection: 'row-reverse',
                        marginLeft: '0px',
                    }}
                    control={<IOSSwitch checked={checked} onChange={handleChange} sx={{ m: 1 }} defaultChecked />}
                    label="Nueva versión"
                />
            </StyledInfo>
            {checked ? (
                <Casino
                    containerLeft="CASINO_TOP_LEFT"
                    containerRight="CASINO_TOP_RIGHT"
                    dtSection="casino"
                    lobbyName="CASINO_TODOS"
                    pathname={PATHS.CASINO_GAME_PROVIDER_GAME_NAME.url}
                    filterTags={['TRAGAMONEDAS', 'BUY_FEATURE', 'JACKPOT', 'ESPECIALES', 'BLACKJACK', 'POKER', 'RULETA', 'RASPADITAS']}
                />
            ) : (
                <CasinoOld
                    containerLeft="CASINO_TOP_LEFT"
                    containerRight="CASINO_TOP_RIGHT"
                    dtSection="casino"
                    lobbyName="CASINO_TODOS"
                    pathname={PATHS.CASINO_GAME_PROVIDER_GAME_NAME.url}
                    filterTags={['TRAGAMONEDAS', 'BUY_FEATURE', 'JACKPOT', 'ESPECIALES', 'BLACKJACK', 'POKER', 'RULETA', 'RASPADITAS']}
                />
            )}
        </>
    )
}

export default Index

const StyledInfo = styled.div`
    position: relative;
    width: calc(100% + 28px);
    right: 14px;
    padding-left: 14px;
    padding-right: 5px;
    padding-bottom: 4px;
    z-index: 20;

    background-color: ${(p) => p.theme.primary};
    max-width: min-content;
    position: absolute;
    color: #fff;
    left: 0px;
    top: 200px;
    z-index: 30;
    transform: rotate(-90deg);
    transform-origin: top left;
    overflow: hidden;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: rgb(0 0 0 / 10%) 0px 3px 6px;
    &.white {
        color: dark;
    }
    > label {
        margin-right: 0;
        gap: 4px;
    }
    label > .MuiTypography-root {
        white-space: nowrap;
        font-size: 0.95rem;
        /* text-shadow: #000 1px 0 10px; */
    }

    label > .MuiSwitch-root {
        margin: 4px;
    }
`
