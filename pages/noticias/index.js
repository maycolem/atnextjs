import React, { useEffect, useState } from 'react'
import LoadingCardNoticias from '@components/Noticias/LoadingCardNoticias'
import NavbarNoticia from '@components/Menu/NavbarNoticia'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import styled from '@emotion/styled'
import axios from 'axios'
import { Meta } from '@components/Meta'
import ListItem from '@components/Noticias/ListItem'
import { Container, Typography } from '@mui/material'
import { map } from 'lodash'
import { format } from 'date-fns'

const Noticias = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [noticias, setNoticias] = useState(null)

    // const dateNow = format(new Date(), 'yyyyMMdd') // 20211001

    const urlBase = `https://feed.datafactory.la/index.php`

    useEffect(() => {
        setIsLoading(true)
        axios
            .get(urlBase, {
                params: {
                    ppaass: '4pu35t4T0t41',
                    desde: '20230101',
                    hora: '000000',
                },
                'Content-Type': 'application/xml; charset=utf-8',
            })
            .then((response) => {
                let xmlDoc
                let parser = new DOMParser()
                xmlDoc = parser.parseFromString(response.data, 'text/xml')
                let elementns = xmlDoc.getElementsByTagName('canal')
                let jsonObject = []
                let canalsFiltereds = []
                let notasFutbolPremierLeagueList = []
                for (let i = 0; i < elementns.length; i++) {
                    jsonObject[i] = elementns[i].textContent
                    if (jsonObject[i].includes('deportes.futbol.premierleague.notas')) {
                        canalsFiltereds.push(jsonObject[i])
                    }
                }

                for (let canal of canalsFiltereds) {
                    ;(async () => {
                        try {
                            const response = await axios.get(`${urlBase}?ppaass=4pu35t4T0t41&canal=${canal}`)
                            let doc
                            let parser = new DOMParser()
                            doc = parser.parseFromString(response.data, 'text/xml')
                            let headLine = doc.getElementsByTagName('HeadLine')[0].textContent
                            let weekMatch = doc.getElementsByTagName('Match')[0].attributes.week.textContent
                            let liga = doc.getElementsByTagName('Match')[0].attributes.league.textContent
                            try {
                                var image1 = doc.getElementsByTagName('ContentItem')[1].attributes.href.textContent
                            } catch (error) {
                                var image = doc.getElementsByTagName('ContentItem')[0].attributes.href.textContent
                            }
                            let channelMatch = doc.getElementsByTagName('Match')[0].attributes.channel.textContent
                            let team1 = doc.getElementsByTagName('Team')[0].attributes.key.textContent
                            let team2 = doc.getElementsByTagName('Team')[1].attributes.key.textContent
                            let matchId = doc.getElementsByTagName('Match')[0].attributes.matchId.textContent

                            const slugify = (str) => {
                                const map = {
                                    '-': ' ',
                                    '-': '_',
                                    a: 'á|à|ã|â|À|Á|Ã|Â',
                                    e: 'é|è|ê|É|È|Ê',
                                    i: 'í|ì|î|Í|Ì|Î',
                                    o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
                                    u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
                                    c: 'ç|Ç',
                                    n: 'ñ|Ñ',
                                }
                                for (const pattern in map) {
                                    str = str.replace(new RegExp(map[pattern], 'g'), pattern).toLowerCase().replace(/ /g, '-')
                                }
                                return str
                            }
                            let slug = slugify(headLine)

                            notasFutbolPremierLeagueList.push({
                                id: matchId,
                                titulo: headLine,
                                liga: liga,
                                imagen: image1 || image,
                                tituloSlug: slug,
                                canal: channelMatch,
                                team1: team1,
                                team2: team2,
                                semana: weekMatch,
                            })
                            setNoticias({ notasFutbolPremierLeagueList })
                            setIsLoading(false)
                        } catch (error) {
                            setError((error) => `Aún no tenemos noticias del ${new Date().toLocaleDateString()}`)
                        }
                    })()
                } // end for
            })
            .catch(function (error) {
                if (error.response) {
                    setIsLoading(false)
                }
                setError((error) => `Aún no tenemos noticias del ${new Date().toLocaleDateString()}`)
            })
    }, [setNoticias])

    useEffect(() => {
        if (noticias) {
            setIsLoading(false)
        }
    }, [noticias])

    useEffect(() => {
        if (error) {
            setIsLoading(false)
        }
    }, [error])

    // if (!noticias) return <NotData>NO tenemos datos </NotData>

    return (
        <>
            <Meta title="Noticias" description="Encuentra todas las noticias del día en Apuesta Total noticias" />
            <StyledS>
                <StyledSS>
                    <NavbarNoticia />
                    <Container fixed>
                        {isLoading ? (
                            <NewsCardList>
                                {map([1, 2, 3, 4, 5], (item) => (
                                    <LoadingCardNoticias key={item} />
                                ))}
                            </NewsCardList>
                        ) : (
                            !error && (
                                <>
                                    {noticias?.notasFutbolPremierLeagueList?.map((noticia, index) => {
                                        return (
                                            <ListItem
                                                key={index}
                                                id={noticia.id}
                                                title={noticia.titulo}
                                                description={noticia.liga}
                                                image={noticia.imagen}
                                                tituloSlug={noticia.tituloSlug}
                                                canal={noticia.canal}
                                                team1={noticia.team1}
                                                team2={noticia.team2}
                                                noteText={noticia.semana}
                                            />
                                        )
                                    })}
                                </>
                            )
                        )}

                        {!isLoading && error && (
                            <ErrorType variant="h6" color="primary">
                                {error}
                            </ErrorType>
                        )}
                    </Container>
                </StyledSS>
            </StyledS>
        </>
    )
}

export default Noticias

const ErrorType = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    margin-top: 2rem;
    background: #ededed;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 2rem;
`

const NewsCardList = styled.div`
    // display: grid;
    grid-template-columns: repeat(auto-fill, 240px);
    gap: 26px;
    place-content: center;
    margin: 3em 0 0 0;
`

const StyledSS = styled.div`
    & {
        width: 100%;
    }
`

const StyledS = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    position: relative;
    justify-content: center;
    background: white;
    width: calc(100% + 28px);
    right: 14px;
    padding: 1rem;
    padding-top: 0;
    flex: 1;
    min-height: 600px;
    ${MEDIA_QUERIES.min_width.desktopS} {
        width: calc(100% + 100px);
        right: 50px;
    }
`
