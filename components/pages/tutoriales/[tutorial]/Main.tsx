import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React from 'react'
import styled from 'styled-components'
import SectionBanner from '../SectionBanner'
import styles from '../styles/styles'
import SecctionMoreTutorialsVideo from './SecctionMoreTutorialsVideo'
import SecctionTutorialVideo from './SecctionTutorialVideo'

const Main = () => {
    const Content = () => (
        <Styled.Page>
            <Styled.Wrapper>
                <SectionBanner ></SectionBanner>
                <SecctionTutorialVideo></SecctionTutorialVideo>
                <StyledTitleMoreTutorial>Tutoriales relacionados</StyledTitleMoreTutorial>
                <SecctionMoreTutorialsVideo></SecctionMoreTutorialsVideo>
            </Styled.Wrapper>
        </Styled.Page>
    )

    return <Content />
}

export default Main
const Styled = styles()
const StyledTitleMoreTutorial = styled.div`
    padding: 14px calc(14px + 0.5rem);
    padding-top: 0;
    font-size: 1.3rem;
    font-weight: 600;
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 14px calc(50px + 1rem);
        font-size: 1.5rem;
    }
`
