import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import TorneoDetailInfoContent from './TorneoDetailInfoContent'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import TorneoDetailMoreDetails from './TorneoDetailMoreDetails'
import TorneoDetailPremios from './TorneoDetailPremios'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import { useGetContentQueryQuery, useRankingTournamentQuery } from 'states/calimaco/calimacoContentApi'
import { userSelector } from 'states/features/slices/userSlice'
import { useSelector } from 'react-redux'
import { useGetUserSingleTournamentQuery } from 'states/calimaco/calimacoDataApi'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'

const TorneoDetailInfo = ({ tournament }) => {
    const { data: dataRanking } = useRankingTournamentQuery(
        { tournament: tournament?.tournament },
        {
            skip: !tournament?.tournament,
        }
    )
    const { data: dataLobbies } = useGetContentQueryQuery(
        { lobby: tournament?.tournament },
        {
            skip: !tournament?.tournament,
        }
    )
    const user = useSelector(userSelector)
    const { data: dataUserTournament } = useGetUserSingleTournamentQuery(
        { session: user?.session, tournament: tournament?.tournament },
        { skip: !user || !tournament?.tournament }
    )
    const userAmount = dataUserTournament?.data?.amount
    const userPosition = dataUserTournament?.data?.position
    const isEnrolled = !tournament?.to_be_enrolled
    const totalPLayers = tournament?.total_players || 0

    return (
        <TorneoDetailInfoS>
            <BannerS $src={`${process.env.REACT_APP_WEB_BASE}/${tournament?.cms?.summary_image}`} className="banner">
                <div className="wrapper">
                    {/* TODO//: actualizar la imagen fake */}
                    <img
                        alt={tournament?.cms?.title}
                        onClick={() => {
                            let url = 'https://www.apuestatotal.com/casino-en-vivo/'
                            if (tournament?.tournament === 'torneo-australian-open-2023') {
                                url = 'https://www.apuestatotal.com/apuestas-deportivas/#/tree/all/0/0/3013/0/odds/byleague'
                            }
                            window.open(url, '_blank')
                        }}
                        src={`${process.env.REACT_APP_WEB_BASE}/${tournament?.cms?.summary_image}`}
                    />
                    {/* <img alt={tournament?.cms?.title} src={torneoFAKEandreaIMG.src} /> */}
                </div>
            </BannerS>
            {/* <GamesS className="games">
        {dataLobbies?.lobby?.map((item, i) => {
          return <img alt={item?.name} key={i} src={`${process.env.REACT_APP_WEB_BASE}/${item?.logo}`} />
        })}
        <div className="more-games">+ Ver mas juegos</div>
      </GamesS> */}
            <div className="details">
                <TorneoDetailInfoContent
                    end={tournament?.end_date}
                    init={tournament?.init_date}
                    minAmount={tournament?.min_amount}
                    minRounds={tournament?.min_rounds}
                    prize={tournament?.prize}
                    title={tournament?.cms?.summary_title}
                    to_be_enrolled={tournament?.to_be_enrolled}
                    tournament={tournament?.tournament ?? true}
                    winners={tournament?.winners}
                ></TorneoDetailInfoContent>
            </div>
            {user && dataUserTournament?.result !== 'error' && isEnrolled && (
                // <PuestoS className="puesto">
                //   <EmojiEventsIcon></EmojiEventsIcon>
                //   <p>
                //     Tienes {Number(Number(userAmount) / 1000).toFixed(3)} puntos y estas en el{' '}
                //     <span className="puesto-bold">puesto {userPosition}</span>
                //   </p>
                // </PuestoS>
                <div className="more-datail">
                    <TorneoDetailMoreDetails
                        endDate={dataRanking?.tournament?.end_date}
                        initDate={dataRanking?.tournament?.init_date}
                        isEnrolled={isEnrolled}
                        position={userPosition}
                        status={dataRanking?.tournament?.status}
                        totalPLayers={totalPLayers}
                        userAmount={userAmount}
                        userPosition={userPosition}
                    />
                </div>
            )}
            <div className="premios">
                <TorneoDetailPremios icon={CardGiftcardIcon} ranking={tournament?.prizes} title={'Premios'}></TorneoDetailPremios>
            </div>
            <div className="clasificacion">
                <TorneoDetailPremios
                    haveId
                    icon={EmojiEventsIcon}
                    ranking={dataRanking?.data}
                    title={'Tabla de clasificación'}
                ></TorneoDetailPremios>
            </div>
            <div className="term_condition">
                <FragmentCustomAT fragment={tournament?.cms?.terms}></FragmentCustomAT>
            </div>
        </TorneoDetailInfoS>
    )
}

export default TorneoDetailInfo
const PuestoS = styled.div`
    & {
        text-align: center;
        color: ${(p) => p.theme.palette.alternate16.main};
        font-size: 1.2rem;
        > p {
            width: 80%;
            margin: auto;
            > .puesto-bold {
                font-weight: 600;
            }
        }
    }
`
const BannerS = styled.div`
    & {
        /* max-height: 200px; */
        display: flex;
        > .wrapper {
            /* background-image: ${(p) => `url(${p.$src})`};
      background-repeat: no-repeat;
      background-size: cover; */
            /* border-radius: 1rem;
      overflow: hidden; */
            /* display: flex; */
            flex: 1;
            > img {
                object-fit: contain;
                object-fit: initial;
                height: initial;
                backdrop-filter: blur(20px);
                cursor: pointer;
            }
        }
        /* ${MEDIA_QUERIES.min_width.tabletS} {
      max-height: 300px;
    }
    ${MEDIA_QUERIES.min_width.desktopS} {
      max-height: 350px;
    } */
    }
`
const GamesS = styled.div`
    & {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 0.3rem;
        grid-auto-rows: 1fr;

        > img {
            border-radius: 5px;
            object-fit: cover;
        }
        > .more-games {
            background: white;
            font-size: 0.9rem;
            text-align: center;
            display: grid;
            place-items: center;
            color: ${(p) => p.theme.palette.primary.main};
            text-decoration: underline;
            text-underline-offset: 2px;
        }
        ${MEDIA_QUERIES.min_width.tabletL} {
            grid-template-columns: repeat(auto-fill, minmax(calc(100px + 4vw), 1fr));
        }
        ${MEDIA_QUERIES.min_width.desktopS} {
            grid-template-columns: repeat(auto-fill, minmax(calc(110px + 8vw), 1fr));
        }
    }
`
const TorneoDetailInfoS = styled.div`
    & {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1rem;
        > .term_condition {
            grid-column: span 1;
            overflow: hidden;
        }
        ${MEDIA_QUERIES.min_width.tabletL} {
            grid-template-columns: repeat(2, 1fr);
            /* grid-template-columns: auto 1fr; */
            > .banner,
            > .details {
                order: -1;
            }
            > .games {
                grid-column: span 2;
            }
            > .puesto,
            > .more-datail {
                grid-column: span 2;
            }
            > .term_condition {
                grid-column: span 2;
            }
        }
        ${MEDIA_QUERIES.min_width.desktopXS} {
            > .banner {
                /* padding-right: 2rem; */
            }
            > .more-datail {
                width: 100%;
                max-width: 1100px;
                margin: auto;
            }
            > .premios {
                width: 100%;
                max-width: 450px;
                margin-left: auto;
            }
            > .clasificacion {
                width: 100%;
                max-width: 450px;
                margin-right: auto;
            }
        }
    }
`
