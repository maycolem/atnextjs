// import { Container } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const CardNoticias = (props) => {
    const { title, image, id, canal, team1, team2, tituloSlug } = props

    const router = useRouter()

    const onClick = () => {
        router.push(`/noticias/partido-${team1}-vs-${team2}-${tituloSlug}/${canal}.notas.${id}`)
    }
    return (
        <div>
            <NewsItem onClick={onClick}>
                <NewsImage src={image} />
                <NewsInfo key={id} country1={team1} country2={team2} slug={tituloSlug}>
                    <InfoText>{title}</InfoText>
                    <InfoDetail>{canal}</InfoDetail>
                </NewsInfo>
            </NewsItem>
        </div>
    )
}

export default CardNoticias

const NewsItem = styled.div`
    margin-bottom: 1rem;
    width: 240px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        transform: scale(1.01);
    }
`

const NewsImage = styled.img`
    width: 240px;
    height: 140px;
    border-radius: 5px 5px 1px 1px;
    object-fit: cover;

    flex: none;
    order: 0;
    flex-grow: 0;
`

const NewsInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
`

const InfoText = styled.p`
    font-weight: bold;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
`

const InfoDetail = styled.p`
    font-size: 14;
    margin-top: 0;
    margin-bottom: 0;
    color: #c7c7c7;
`
