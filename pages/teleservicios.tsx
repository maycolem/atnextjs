import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { Button } from '@mui/material'
import { PATHS } from 'routes/paths/PATHS'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import classnames from 'classnames'
import { Meta } from '@components/Meta'
import { createGlobalStyle } from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import useGetWidthScrollBar from '@hooks/useGetWidthScrollBar'
const FRAGMENTOS = [
    'SEC_TELESERVICIOS_HOME',
    'SEC_TELESERVICIOS_COMO_RECARGAR',
    'SEC_TELESERVICIOS_JUEGA_Y_COBRA',
    'SEC_TELESERVICIOS_GRUPO_TELEGRAM',
    'SEC_TELESERVICIOS_TE_AYUDA',
]
const GlobalCssOverride = createGlobalStyle`
   #layout-main-content{
    background: white;
   }
  `
const TeleServicios = () => {
    const [fragment, setFragment] = useState('')
    const { scrollBardWidth } = useGetWidthScrollBar()
    const { data, isLoading, isFetching } = useGetFragmentQuery(
        {
            fragment,
        },
        {
            skip: !fragment,
        }
    )
    useEffect(() => {
        if (window?.location?.href) {
            const id = window?.location?.href?.split('?')[1]?.split('=')[1]
            const key = FRAGMENTOS[0]
            if (id) {
                setFragment(id)
                history.pushState(null, null, PATHS.TELE_SERVICIOS.url + '/' + `?id=${id}`)
            } else {
                setFragment('SEC_TELESERVICIOS_HOME')
                history.pushState(null, null, PATHS.TELE_SERVICIOS.url + '/' + `?id=${key}`)
            }
        }
    }, [])
    const handleChangueFragment = (key: string) => {
        setFragment(key)
        history.pushState(null, null, PATHS.TELE_SERVICIOS.url + '/' + `?id=${key}`)
    }
    return (
        <>
            <Meta title="Teleservicios" />
            <>
                <ScrollContent $scrollBarWidth={scrollBardWidth}>
                    <ScrollIndian>
                        <div className="wrapper">
                            <div>
                                <ButtonS
                                    className={classnames({ active_fragment: fragment === 'SEC_TELESERVICIOS_HOME' })}
                                    color="dark"
                                    onClick={() => handleChangueFragment('SEC_TELESERVICIOS_HOME')}
                                >
                                    Bienvenido
                                </ButtonS>
                            </div>
                            <div>
                                <ButtonS
                                    className={classnames({ active_fragment: fragment === 'SEC_TELESERVICIOS_COMO_RECARGAR' })}
                                    color="dark"
                                    onClick={() => handleChangueFragment('SEC_TELESERVICIOS_COMO_RECARGAR')}
                                >
                                    Cómo recargar
                                </ButtonS>
                            </div>
                            <div>
                                <ButtonS
                                    className={classnames({ active_fragment: fragment === 'SEC_TELESERVICIOS_JUEGA_Y_COBRA' })}
                                    color="dark"
                                    onClick={() => handleChangueFragment('SEC_TELESERVICIOS_JUEGA_Y_COBRA')}
                                >
                                    Juega y cobra
                                </ButtonS>
                            </div>
                            <div>
                                <ButtonS
                                    className={classnames({ active_fragment: fragment === 'SEC_TELESERVICIOS_TE_AYUDA' })}
                                    color="dark"
                                    onClick={() => handleChangueFragment('SEC_TELESERVICIOS_TE_AYUDA')}
                                >
                                    Teleservicios te ayuda
                                </ButtonS>
                            </div>
                            <div>
                                <ButtonS
                                    className={classnames({ active_fragment: fragment === 'SEC_TELESERVICIOS_GRUPO_TELEGRAM' })}
                                    color="dark"
                                    onClick={() => handleChangueFragment('SEC_TELESERVICIOS_GRUPO_TELEGRAM')}
                                >
                                    Canal oficial
                                </ButtonS>
                            </div>
                        </div>
                    </ScrollIndian>
                </ScrollContent>
                {isLoading || isFetching ? (
                    <LoadingDefault loading={isLoading || isFetching}></LoadingDefault>
                ) : (
                    <StyledContent>
                        <FragmentCustomAT fragment={data ?? ''}></FragmentCustomAT>
                    </StyledContent>
                )}
                <GlobalCssOverride />
            </>
        </>
    )
}

export default TeleServicios
interface StyledProps {
    as?: React.ElementType | keyof JSX.IntrinsicElements
    $scrollBarWidth?: number
    theme?: any
}
const StyledContent = styled.div`
    background: white;
    padding-top: 14px;
    .bodyTele > .imgHeader {
        padding-top: 0;
    }
`
const ScrollContent = styled.div<StyledProps>`
    position: relative;
    &::after {
        content: '';
        position: absolute;
        width: ${(p) => `calc(100vw - ${p.$scrollBarWidth}px)`};
        left: -14px;
        top: 0;
        height: 100%;
        background: ${(p) => p.theme.palette.alternate4.main};
        z-index: -1;
        ${MEDIA_QUERIES.min_width.desktopS} {
            left: -50px;
        }
    }
`

const ScrollIndian = styled(ScrollContainer)`
    & {
        background: #f2f2f2;
        > .wrapper {
            width: max-content;
            z-index: 1;
            padding-right: 1rem;
            display: flex;
            flex: 1;
            margin: auto;
        }
    }
`
const ButtonS = styled(Button)<StyledProps>`
    && {
        white-space: nowrap;
        min-height: inherit;
        color: ${(p) => p.theme.palette.alternate13.main};
        padding: 1rem 14px;
        border-radius: 0;
        text-transform: initial;
        font-size: 1rem;

        &.active_fragment {
            color: ${(p) => p.theme.palette.primary.main};
            box-shadow: inset 0px -2px 0 0 ${(p) => p.theme.palette.primary.main};
        }
    }
`
