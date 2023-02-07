import { PATHS } from '@routes/paths/PATHS'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Button } from '@mui/material'
import { Parser } from 'html-to-react'
import { useGetFragmentQuery } from '@states/calimaco/calimacoContentApi'
import { Session } from '@services/Session'
import { User } from '@interfaces/index'

export const AltertNotVerified = () => {
    const router = useRouter()
    const user: User = Session().getUser()
    const { data: verificar } = useGetFragmentQuery({ company: 'ATP', session: user?.session, fragment: 'VERIFICA_TU_CUENTA' })
    const handlePushPageVerify = async () => {
        await router.push({
            pathname: PATHS.CUENTA_VERIFICAR.url,
        })
    }

    return (
        <AlertSVerifyAccountS>
            <div className="content-text">
                <div className="icon">
                    <WarningAmberIcon></WarningAmberIcon>
                    <span className="title">Verifica tu cuenta</span>
                </div>
                <p className="text">{Parser().parse(verificar)}</p>
                <div className="accions">
                    <Button onClick={handlePushPageVerify} variant="contained">
                        Verificar aquí
                    </Button>
                </div>
            </div>
        </AlertSVerifyAccountS>
    )
}

const AlertSVerifyAccountS = styled.div`
    & {
        padding-left: 14px;
        position: relative;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 99;
        backdrop-filter: blur(2px);
        > .content-text {
            background: ${(p: any) => p.theme.palette.linkPink.main};
            padding: 4rem 3rem;
            padding-bottom: 8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            > .text {
                font-size: 1rem;
                line-height: 1.6;
                text-align: center;
            }
            > .accions {
                display: flex;
                gap: 1rem;
                width: 100%;
                > button {
                    flex: 1;
                    padding: 0.8rem 1rem;
                    text-transform: capitalize;
                    font-size: 1rem;
                }
            }
            > .icon {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                > .title {
                    font-size: 1.2rem;
                    text-align: center;
                    color: ${(p: any) => p.theme.palette.primary.main};
                }
                svg {
                    font-size: 3rem;
                    color: ${(p: any) => p.theme.palette.primary.main};
                }
            }
        }
        ${MEDIA_QUERIES.min_width.desktopS} {
            padding: 0;
            top: 0;
            > .content-text {
                padding: 1rem 50px;
                flex-direction: row;
                > .text {
                    text-align: left;
                    line-height: 1.4;
                }
                > .accions {
                    flex: 0 1 30%;
                    > button {
                        white-space: nowrap;
                        flex: 0 1 50%;
                        padding: 0.8rem 2rem;
                        text-transform: capitalize;
                        font-size: 1rem;
                    }
                }
            }
        }
    }
`
