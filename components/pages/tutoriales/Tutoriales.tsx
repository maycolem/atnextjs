import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import TutorialComponent from './Tutorial'
import data from './dataTutoriales'
import { Tutorial } from '@interfaces/index'

const Tutoriales = () => {
    return (
        <StyledGrid>
            {data.map(({ title, shortDescription, key, src, img }: Tutorial, i) => {
                return <TutorialComponent description={shortDescription} key={i} pathnameKey={key} src={src} img={img} title={title} />
            })}
        </StyledGrid>
    )
}

export default Tutoriales

const StyledGrid = styled.div`
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 150px), 1fr));
    align-items: stretch;
    padding: 0 50px;
    ${MEDIA_QUERIES.min_width.tabletL} {
        padding: 0 70px;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
    }
`
