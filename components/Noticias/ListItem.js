import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const ListItem = (props) => {
    const { title, image, id, canal, team1, team2, tituloSlug, noteText, description } = props

    const router = useRouter()

    const onClick = () => {
        router.push(`/noticias/partido-${team1}-vs-${team2}-${tituloSlug}/${canal}.notas.${id}`)
    }
    return (
        <Grid item xs={12} md={6} mt={3} onClick={onClick}>
            <CardActionArea component="a" sx={{ display: { xs: 'none', sm: 'block', borderRadius: 20 } }}>
                <Card sx={{ display: 'flex', bgcolor: '#F7F7F7', boxShadow: 'none', borderRadius: 5 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 280, height: 200, display: { xs: 'none', sm: 'block' } }}
                        src={image}
                        alt={title}
                    />
                    <CardContent sx={{ flex: 1 }} keys={id} country1={team1} country2={team2} slug={tituloSlug} channel={canal}>
                        <Typography component="h2" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {noteText}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {description}
                        </Typography>
                        <ButtonView>Ver Noticia</ButtonView>
                    </CardContent>
                </Card>
            </CardActionArea>
            {/* change default colors or variable defined colors */}
            <CardActionArea component="a" sx={{ display: { xs: 'block', sm: 'none', borderRadius: 20 } }}>
                <Card sx={{ display: 'grid', borderRadius: 5, bgcolor: '#F7F7F7', boxShadow: 'none' }}>
                    <NewsTitle>{title}</NewsTitle>
                    <NewsImage width="10" src={image} alt={title} />
                    <CardContent keys={id} country1={team1} country2={team2} slug={tituloSlug} channel={canal}>
                        <Descriptions sx={{ display: 'flex' }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {description}
                            </Typography>
                            <ButtonView>Ver Noticia</ButtonView>
                        </Descriptions>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    )
}

export default ListItem

const NewsImage = styled.img`
    padding: 1rem;
    margin: 0 auto;
    object-fit: cover;
    border-radius: 2rem;
`

const NewsTitle = styled.h2`
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(p) => p.theme.palette.dark3.main};
`
const Descriptions = styled.h2`
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ButtonView = styled.button`
    && {
        display: flex;
        border-radius: 0.625rem;
        padding: 1rem;
        font-size: 0.9rem;
        font-weight: 600;
        color: #fff;
        background-color: ${(p) => p.theme.palette.primary.main};
        &:hover {
            background-color: ${(p) => p.theme.palette.primary.dark};

    }
`
