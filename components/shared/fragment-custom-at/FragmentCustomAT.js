import React from 'react'
import { Parser } from 'html-to-react'
import styled from 'styled-components'
import hexAlpha from 'hex-alpha'
const FragmentCustomAT = ({ fragment }) => {
    return (
        <StyledS>
            {/* <DefaultCssFragments></DefaultCssFragments> */}
            {Parser().parse(fragment)}
        </StyledS>
    )
}

export default FragmentCustomAT
const StyledS = styled.div`
    & {
        width: 100%;

        img {
            display: inline-block;
            width: initial;
            height: initial;
            width: 100%;
        }
        strong {
            font-weight: bold;
            color: ${(p) => hexAlpha(p.theme.contrastText, 0.9)} 
        }
        em {
            font-style: normal;
        }
        h1 {
            display: block;
            font-size: 2em;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
        }
        h2 {
            display: block;
            font-size: 1.5em;
            margin-top: 0.83em;
            margin-bottom: 0.83em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
        }
        h3 {
            display: block;
            font-size: 1.17em;
            margin-top: 1em;
            margin-bottom: 1em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
        }
        h4 {
            display: block;
            margin-top: 1.33em;
            margin-bottom: 1.33em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
        }
        h5 {
            display: block;
            font-size: 0.83em;
            margin-top: 1.67em;
            margin-bottom: 1.67em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
        }
        h6 {
            display: block;
            font-size: 0.67em;
            margin-top: 2.33em;
            margin-bottom: 2.33em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
        }
        p {
            display: block;
            margin-top: 1em;
            margin-bottom: 1em;
            margin-left: 0;
            margin-right: 0;
            /* color: #5a5a5a; */
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 1rem;
            line-height: 21px;
            text-align: left;
        }
        ul {
            display: block;
            list-style: initial;
            list-style-type: disc;
            margin-top: 1em;
            margin-bottom: 1em;
            margin-left: 0;
            margin-right: 0;
            padding-left: 40px;
        }
        li {
            color: ${(p) => hexAlpha(p.theme.contrastText, 0.6)};
            display: list-item;
            text-align: initial;
        }
        ol {
            display: block;
            list-style-type: decimal;
            margin-top: 1em;
            margin-bottom: 1em;
            margin-left: 0;
            margin-right: 0;
            padding-left: 40px;
        }
        a {
            &:link {
                color: (internal value);
                text-decoration: underline;
                cursor: pointer;
            }
            &:visited {
                color: (internal value);
                text-decoration: underline;
                cursor: pointer;
            }
            &:link:active {
                color: (internal value);
            }
            &:visited:active {
                color: (internal value);
            }
        }

        hr {
            display: block;
            margin-top: 0.5em;
            margin-bottom: 0.5em;
            margin-left: auto;
            margin-right: auto;
            border-style: inset;
            border-width: 1px;
        }

        div {
            color: ${(p) => hexAlpha(p.theme.contrastText, 0.7)} !important;
            background: ${(p) => p.theme.background};
        }
        
        div>.textItemsS {
            background: ${(p) => hexAlpha(p.theme.contrastText, 0.1)};
        }
        
        .tituloPri, .subtituloPri, .headerS {
            color: ${(p) => hexAlpha(p.theme.background, 0.9)} !important;
        }
    }
`
// const DefaultCssFragments = createGlobalStyle`
// `
