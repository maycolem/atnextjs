import React, { useEffect, useState } from 'react'
import fondoIMG from 'components/Register/assets/Land_Logo.jpg'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { getUTMS } from 'helpers/getUTMS'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import SnackBarForm from '@components/Register/SnackBarForm'
import styled from 'styled-components'
import Form from './Form'
import { delay } from '@helpers/delay'
import { Utm } from '@interfaces/index'

interface Props {
    agent: string
}

const Registro = ({ agent = '' }: Props) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [utms, setUtms] = useState<Utm | null>(null)

    const fetchGetUTMS = async () => {
        await delay(500)
        const result: Utm = getUTMS()
        setUtms(result)
        setLoading(false)
    }

    useEffect(() => {
        fetchGetUTMS()
    }, [])
    return (
        <Styled>
            <StyledContent>
                <div className="wrapper">
                    <div className="wrapper-relative">
                        {loading ? <LoadingDefault loading={loading} /> : <Form agent={agent} {...utms} />}
                    </div>
                    <SnackBarForm />
                </div>
            </StyledContent>
        </Styled>
    )
}

export default Registro
const Styled = styled.div`
    min-width: 360px;
    position: relative;
    z-index: 10;
`
const StyledContent = styled.div`
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(p: any) => p.theme.palette.alternate4.main};
    background: white;
    width: 100%;
    max-width: 1980px;
    margin: auto;
    ${MEDIA_QUERIES.min_width.tabletL} {
        padding: 1rem;
        background: none;
        background-image: url(${fondoIMG.src});
        background-size: cover;
        background-repeat: no-repeat;
    }
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 1rem;
        justify-content: flex-end;
        padding-right: 3rem;
    }
    ${MEDIA_QUERIES.min_width.desktopL} {
        justify-content: flex-end;
        padding-right: 5rem;
    }
    ${MEDIA_QUERIES.min_width.desktopXXL} {
        padding-right: 9rem;
    }
    ${MEDIA_QUERIES.min_width.desktopXL} {
        padding-right: 15rem;
    }
    > .wrapper {
        background: white;
        padding: clamp(10px, 2.5vw, 30px);
        padding-top: 2rem;
        padding-bottom: 2rem;
        border-radius: 7px;
        max-width: 700px;
        width: 100%;
        position: relative;
        ${MEDIA_QUERIES.min_width.tabletL} {
            border: 1px solid ${(p: any) => p.theme.palette.alternate4.dark};
        }
        ${MEDIA_QUERIES.min_width.desktopS} {
            padding-top: 3rem;
            padding-bottom: 3rem;
            border: 1px solid ${(p: any) => p.theme.palette.alternate4.dark};
        }
        .wrapper-relative {
            position: relative;
        }
    }
`
