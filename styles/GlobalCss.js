import { GlobalStyles } from '@mui/material'
import React from 'react'
import { MEDIA_QUERIES } from './MEDIA_QUERIES'

const GlobalCss = () => {
    return (
        <GlobalStyles
            styles={{
                html: {
                    fontSize: '13px',
                    textSizeAdjust: '100%',
                    /* scroll-behavior: smooth; */
                    textRendering: 'optimizeSpeed',
                    [MEDIA_QUERIES.min_width.tabletS]: {
                        fontSize: '14px',
                    },
                    [MEDIA_QUERIES.min_width.desktopXS]: {
                        fontSize: '15px',
                    },
                    [MEDIA_QUERIES.min_width.desktopL]: {
                        // fontSize: '16px',
                    },
                },
                'body, ul[class] , ol[class] , li , figure , figcaption , blockquote , dl , dd ': {
                    margin: '0',
                    padding: '0',
                },

                body: {
                    minHeight: '100vh',
                    [MEDIA_QUERIES.min_width.tabletL]: {
                        // overflowX: 'hidden',
                    },
                },

                '*,*::before,*::after': {
                    boxSizing: 'border-box',
                    fontFamily: 'Rubik , Rubik , Poppins, sans-serif',
                    padding: '0px',
                    margin: '0px',
                    //   lineHeight: '1.4',
                    color: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    wordSpacing: '2px',
                    lineHeight: 'initial',
                },
                'ul[class],ol[class],button,a': {
                    border: 'none',
                    textDecoration: 'none',
                },
                'a, button': {
                    cursor: 'pointer',
                },
                ul: {
                    cursor: 'default',
                },
                'ul[class] , ol[class]': {
                    listStyle: 'none',
                },
                'h1 , h2 , h3 ,h4 , h5 ,h6 , p ': {
                    margin: '0',
                    padding: '0',
                },

                img: {
                    display: 'block',
                    width: '100%',
                    height: '100%',
                },
            }}
        />
    )
}

export default GlobalCss
