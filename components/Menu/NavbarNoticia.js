import styled from '@emotion/styled'
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PATHS } from '@routes/paths/PATHS'

const NavbarNoticia = () => {
    const router = useRouter()
    return (
        <WrapperScrolS>
            <ScrollContainerS>
                <ButtonsContainersS>
                    <div className="wrapper">
                        <div>
                            <Link href={PATHS.INFORMACION_APUESTAS_DEPORTIVAS.url} passHref legacyBehavior>
                                <ButtonS className={router.pathname == PATHS.INFORMACION_APUESTAS_DEPORTIVAS.url ? 'active_link' : ''}>
                                    Informacion Apuestas Deportivas
                                </ButtonS>
                            </Link>
                        </div>
                        <div>
                            <Link href={PATHS.CALENDARIO_PREMIER_LEAGUE.url} passHref legacyBehavior>
                                <ButtonS className={router.pathname == PATHS.CALENDARIO_PREMIER_LEAGUE.url ? 'active_link' : ''}>
                                    {PATHS.CALENDARIO_PREMIER_LEAGUE.name}
                                </ButtonS>
                            </Link>
                        </div>
                        <div>
                            <Link href={PATHS.NOTICIAS.url} passHref legacyBehavior>
                                <ButtonS className={router.pathname == PATHS.NOTICIAS.url ? 'active_link' : ''}>
                                    Noticias Premier League
                                </ButtonS>
                            </Link>
                        </div>
                    </div>
                </ButtonsContainersS>
            </ScrollContainerS>
        </WrapperScrolS>
    )
}

export default NavbarNoticia

const WrapperScrolS = styled.div`
    & {
        position: relative;
        width: calc(100% + 27px);
        /* margin-bottom: 1rem; */
        right: 14px;
        position: relative;
        ::after {
            content: '';
            height: 100%;
            position: absolute;
            width: 40px;
            background: linear-gradient(to left, white, transparent);
            right: 0;
            top: 0;
        }
    }
`

const ScrollContainerS = styled(ScrollContainer)`
    & {
        background: ${(p) => p.theme.palette.alternate9.main};
    }
`

const ButtonS = styled(Button)`
    & {
        white-space: nowrap;
        min-height: inherit;
        color: ${(p) => p.theme.palette.dark.light};
        padding: 1rem 14px;
        border-radius: 0;

        &.active_link {
            color: ${(p) => p.theme.palette.primary.main};
            box-shadow: inset 0px -2px 0 0 ${(p) => p.theme.palette.primary.main};
        }
    }
`

const ButtonsContainersS = styled.div`
    & {
        display: flex;
        flex-direction: row;
        /* gap: 1rem; */
        min-height: 40px;
        align-items: center;
        > .wrapper {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            > div {
                min-height: inherit;
                height: 100%;
            }
        }
    }
`
