/* eslint-disable camelcase */
import React from 'react'
import SectionTutorials from './SectionTutorials'
import styles from './styles/styles'
import SectionBanner from './SectionBanner'

const Main = () => {
    return (
        <Styled.Page>
            <Styled.Wrapper>
                <SectionBanner />
                <SectionTutorials />
            </Styled.Wrapper>
        </Styled.Page>
    )
}

export default Main

const Styled = styles()
