import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from '@emotion/styled'
import { Breadcrumbs, CardMedia, Divider, Skeleton, Typography } from '@mui/material'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import { Container } from '@mui/system'
import { Meta } from '@components/Meta'
import NavbarNoticia from '@components/Menu/NavbarNoticia'
import FragmentCustomAT from '@components/shared/fragment-custom-at/FragmentCustomAT'
import { map } from 'lodash'
import { PATHS } from '@routes/paths/PATHS'

// interface DetailNewsProps {
//     id: string
// }

const DetailNews = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [headLine, setHeadLine] = useState<string | null>(null)
    const [metaContent, setMetaContent] = useState<string | null>(null)
    const [bullet, setBullet] = useState<string | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [league, setLeague] = useState<string | null>(null)
    const [dateMatch, setDateMatch] = useState<string | null>(null)
    const [textNote, setTextNote] = useState<string | null>(null)

    const urlBase = `https://feed.datafactory.la/index.php`

    const router = useRouter()
    const { id } = router.query

    const breadcrumbs = [
        <Link href={PATHS.NOTICIAS.url} prefetch>
            {PATHS.NOTICIAS.name}
        </Link>,
    ] as any

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const { data } = await axios.get(urlBase, {
                    params: {
                        ppaass: '4pu35t4T0t41',
                        canal: `deportes.futbol.${id}.borrador`,
                    },
                    headers: {
                        'Content-Type': 'application/xml; charset=utf-8',
                    },
                })

                const parser = new DOMParser()
                const doc = parser.parseFromString(data, 'text/xml')
                const titulo = doc.getElementsByTagName('Bullet').item(0).childNodes[0].nodeValue
                const headLine = doc.getElementsByTagName('HeadLine').item(0).childNodes[0].nodeValue
                const metaContent = doc.getElementsByTagName('Meta').item(1).getAttribute('content')
                try {
                    var contentImage2 = doc.getElementsByTagName('ContentItem').item(1).getAttribute('href')
                } catch (error) {
                    var contentImage1 = doc.getElementsByTagName('ContentItem').item(0).getAttribute('href')
                }
                const league = doc.getElementsByTagName('Match').item(0).getAttribute('league')
                const dateMatch = doc.getElementsByTagName('Match').item(0).getAttribute('date')
                const textNote = doc.getElementsByTagName('Text').item(0).childNodes[0].nodeValue
                const statusMatch = doc.getElementsByTagName('Status').item(0).getAttribute('value')

                setHeadLine(headLine)
                setMetaContent(metaContent)
                setBullet(statusMatch || titulo)
                setImage(contentImage2 || contentImage1)
                setLeague(league)
                setDateMatch(dateMatch)
                setTextNote(textNote)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setError(error)
            }
        }
        fetchData()
        return () => {
            setIsLoading(false)
            setHeadLine(null)
            setMetaContent(null)
            setBullet(null)
            setImage(null)
            setLeague(null)
            setDateMatch(null)
            setTextNote(null)
        }
    }, [id])

    return (
        <>
            <Meta title={headLine} description={metaContent} />
            <StyledS>
                <StyledSS>
                    <NavbarNoticia />
                    {error ? (
                        <Typography
                            sx={{
                                backgroundColor: '#f3f3f3',
                                color: 'red',
                                textAlign: 'center',
                                mt: 2,
                                p: 2,
                                borderRadius: 1,
                            }}
                            variant="h4"
                            color="red"
                            gutterBottom
                        >
                            No se encontró la noticia
                        </Typography>
                    ) : (
                        <Container
                            sx={{
                                display: 'grid',
                                mt: 2,
                            }}
                        >
                            <Breadcrumbs separator="›" aria-label="breadcrumb">
                                {breadcrumbs} <Typography color="ActiveBorder">{headLine}</Typography>
                            </Breadcrumbs>
                            <Divider sx={{ my: 2 }} />
                            {isLoading ? (
                                <Skeleton animation="wave" variant="text" />
                            ) : (
                                <Typography variant="h4" color="CaptionText" gutterBottom>
                                    {headLine}
                                </Typography>
                            )}
                            {isLoading ? (
                                <Skeleton animation="wave" variant="text" />
                            ) : (
                                <h5>
                                    <BadgeNews>{bullet}</BadgeNews>
                                </h5>
                            )}
                            {isLoading ? (
                                <Skeleton animation="wave" />
                            ) : (
                                <Typography variant="caption" display="block" gutterBottom sx={{ mt: 2 }}>
                                    Fecha: {dateMatch?.slice(0, 4)}/{dateMatch?.slice(4, 6)}/{dateMatch?.slice(6, 8)}
                                </Typography>
                            )}
                            {isLoading ? (
                                <>
                                    {map([1, 2, 3, 4, 5], (item) => (
                                        <Skeleton animation="wave" variant="text" height={10} style={{ marginBottom: 6 }} />
                                    ))}
                                </>
                            ) : (
                                <FragmentCustomAT fragment={textNote ?? ''}></FragmentCustomAT>
                            )}
                            {isLoading ? (
                                <Skeleton sx={{ height: 200 }} animation="wave" variant="rounded" />
                            ) : (
                                <CardMedia
                                    sx={{
                                        width: '100%',
                                        height: 0,
                                        paddingTop: '56.25%',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundImage: `url(${image})`,
                                        [MEDIA_QUERIES.sm]: {
                                            height: 200,
                                        },
                                    }}
                                />
                            )}
                        </Container>
                    )}
                </StyledSS>
            </StyledS>
        </>
    )
}

export default DetailNews

// const NewsImage = styled(CardMedia)`
//     background-size: cover;
//     background-repeat: no-repeat;
//     background-position: center;
//     width: 100%;
//     height: 100%;
//     margin-top: 1rem;
//     margin-bottom: 1rem;
// `

const BadgeNews = styled.span`
    background-color: red;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    display: inline-block;
    ${MEDIA_QUERIES.sm} {
        font-size: 1rem;
    }

    ${MEDIA_QUERIES.md} {
        font-size: 1.2rem;
    }

    ${MEDIA_QUERIES.lg} {
        font-size: 1.4rem;
    }

    ${MEDIA_QUERIES.xl} {
        font-size: 1.6rem;
    }
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
