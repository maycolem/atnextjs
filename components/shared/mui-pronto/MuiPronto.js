import React from 'react'
import styled from 'styled-components'
import Lottie from 'lottie-react'
import incoming from './assets/incoming.json'
const MuiPronto = ({ text = 'MUY PRONTO', subtitle = '' }) => {
    return (
        <StyledS>
            <div className="title">{text}</div>
            <div className="sub-title">{subtitle}</div>
            <div className="lottie">
                <Lottie animationData={incoming} loop></Lottie>
            </div>
        </StyledS>
    )
}

export default MuiPronto
const StyledS = styled.div`
    & {
        font-weight: 600;
        font-size: 1.6rem;
        padding: 2rem;
        padding-top: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.04rem;
        background: white;
        flex-direction: column;
        overflow: hidden;
        flex: 1;
        > .title {
            color: ${(p) => p.theme.palette.dark2.dark};
            position: relative;
            z-index: 2;
        }
        > .sub-title {
            color: ${(p) => p.theme.palette.primary.main};
            position: relative;
            z-index: 2;
            font-size: 1.6rem;
            margin-bottom: -8rem;
        }
        > .lottie {
            position: relative;
            z-index: 1;
            max-width: 400px;
            transform: rotate(45deg);
            margin-bottom: -8rem;
        }
    }
`
