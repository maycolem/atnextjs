import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import NuevaCuenta from 'components/retirar/nueva-cuenta/NuevaCuenta'
import SeleccionarCuenta from '@components/pages/cuenta/retirar/Methods/SelectAccount'
import { Button } from '@mui/material'
import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { LAYOUT_TYPES, PROTECTED_LEVEL_TYPES } from 'config/constants'

export const CUENTAS = {
    NUEVA_CUENTA: {
        name: 'Nueva Cuenta',
        url: '/cuenta/retirar/nueva-cuenta',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    SELECCIONAR_CUENTA: {
        name: 'Seleccionar Cuenta',
        url: '/cuenta/retirar/seleccionar-cuenta',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },
}

const MetodoSeleccionar = ({ tabsUrls = CUENTAS, defaultActive = 0, errors = '' }) => {
    const [tabs, setTabs] = useState(Object.values(tabsUrls))

    const ContextPannelsAtSRef = useRef()
    const dispatch = useDispatch()

    const [active, setActive] = useState({
        name: tabs[defaultActive].name,
        url: tabs[defaultActive].url,
        protectedLevel: tabs[defaultActive].protectedLevel,
        layout: tabs[defaultActive].layout,
    })

    const handleClickTab = (el) => (e) => {
        setActive(el)
    }

    return (
        <div>
            <MetodoDeDepositoS>
                <div className="wrapper">
                    <StyledS>
                        <ScrollContainerS className="container">
                            <TabsS>
                                {tabs.map((el) => {
                                    return (
                                        <ButtonTapS
                                            className={classNames({ active: active.url === el.url })}
                                            key={el.url}
                                            onClick={handleClickTab(el)}
                                        >
                                            {el.name}
                                        </ButtonTapS>
                                    )
                                })}
                            </TabsS>
                        </ScrollContainerS>
                        <ContextPannelsAtS ref={ContextPannelsAtSRef}>
                            {active.url === CUENTAS.NUEVA_CUENTA.url && <NuevaCuenta errors={errors} />}
                            {active.url === CUENTAS.SELECCIONAR_CUENTA.url && <SeleccionarCuenta errors={errors} />}
                        </ContextPannelsAtS>
                    </StyledS>
                </div>
            </MetodoDeDepositoS>
        </div>
    )
}

export default MetodoSeleccionar

const MetodoDeDepositoS = styled.div`
    background: #fafafa;
    min-height: 100%;
    // padding: 1rem 40px;
    ${MEDIA_QUERIES.min_width.tabletS} {
        // padding: 1rem 50px;
    }
    & {
        > .wrapper {
            //  max-width: 400px;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
`

const StyledS = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: inherit;
    overflow: hidden;
`
const ScrollContainerS = styled(ScrollContainer)`
    & {
        background: ${(p) => p.theme.palette.alternate12.main};
        min-width: 100%;
        min-height: max-content;
        border-top: 1px solid ${(p) => p.theme.palette.alternate8.main};
        border-bottom: 1px solid ${(p) => p.theme.palette.alternate8.main};
    }
`
const TabsS = styled.div`
    & {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        text-transform: uppercase;
        padding: 1rem;
    }
`
const ButtonTapS = styled(Button)`
    && {
        flex: 1;
        padding: 0.7rem 1.2rem;
        min-width: initial;
        width: initial;
        text-transform: lowercase;
        display: block;
        white-space: nowrap;
        border: 1px solid transparent;
        font-size: 1rem;
        color: ${(p) => p.theme.palette.alternate13.main};
        :hover {
            color: ${(p) => p.theme.palette.dark2.dark};
            background: ${(p) => p.theme.palette.light.main};
            border: 1px solid transparent;
        }
        &::first-letter {
            text-transform: uppercase;
        }
        &.active {
            color: ${(p) => p.theme.palette.dark2.dark};
            background: ${(p) => p.theme.palette.light.main};
            border: 1px solid ${(p) => p.theme.palette.alternate8.main};
        }
    }
`
const ContextPannelsAtS = styled.div`
    flex: 1;
    display: flex;
    > div {
        flex: 1;
    }
`
