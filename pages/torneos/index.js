import styled from '@emotion/styled'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { Skeleton } from '@mui/material'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
// import { CalimacoClient } from '@calimaco/base'
import TorneosCards from 'components/torneos/TorneosCards'
import { useTournamentLobbiesQuery } from 'states/calimaco/calimacoContentApi'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { Meta } from '@components/Meta'

const Torneos = () => {
    const { data, isLoading, refetch } = useTournamentLobbiesQuery({ lobby: 'MAIN' })
    const user = useSelector(userSelector)
    // const computedData = data?.lobby.filter((item) => item?.to_be_enrolled === true)
    useEffect(() => {
        if (user) {
            refetch()
        }
    }, [user])

    return (
        <>
            <Meta title="Torneo" />

            <TorneosS>
                <TitleS>Torneos</TitleS>
                {/* <FormS>
        <FilterByEstado></FilterByEstado>
        <FilterByEstadoDeRegistro></FilterByEstadoDeRegistro>
      </FormS> */}
                {isLoading ? (
                    <Skeletons>
                        {Array.from({ length: 6 }).map((_, i) => {
                            return (
                                <div key={i}>
                                    <Skeleton>
                                        <TorneosCards data={data?.lobby}></TorneosCards>
                                    </Skeleton>
                                </div>
                            )
                        })}
                    </Skeletons>
                ) : (
                    <TorneosCards data={data?.lobby}></TorneosCards>
                )}
            </TorneosS>
        </>
    )
}

export default Torneos
const Skeletons = styled.div`
    & {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(calc(300px + 10vw), 1fr));
        grid-auto-rows: calc(300px + 4vw);
        gap: 1rem;
        > div {
            > .MuiSkeleton-root {
                min-height: 100%;
                height: 100%;
                width: 100%;
                min-width: 100%;
                transform: initial;
            }
        }
    }
`
const FormS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        ${MEDIA_QUERIES.min_width.tabletS} {
            flex-direction: row;
            width: 100%;
            max-width: 500px;
            > .MuiFormControl-root {
                flex: 1;
            }
        }
    }
`
const TitleS = styled.h1`
    & {
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
        ${MEDIA_QUERIES.min_width.tabletS} {
            text-align: left;
        }
    }
`
const TorneosS = styled.div`
    & {
        padding: 1.2rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`
