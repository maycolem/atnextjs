import React, { useEffect, useState } from 'react'
import fakeIMG from 'public/assets/promotions/fake.jpg'
import { BiChevronRight } from 'react-icons/bi'
import { MorePromotionsStyled } from './PromotionMore.css'
import styled from '@emotion/styled'
import { CalimacoClient } from '@calimaco/base'
// import { CalimacoClient } from '@calimaco/base'
import cfg from 'config/config'
import Link from 'next/link'

const PromotionMore = () => {
    const client = new CalimacoClient(cfg)

    const [promos, setpromos] = useState(null)

    useEffect(() => {
        let maunted = true
        const promise = client.getPromotionsLobby('MAIN')
        promise.then((response) => {
            if (maunted) {
                setpromos(response)
                console.log(response)
            }
        })
        return () => {
            maunted = false
        }
    }, [])

    return (
        <MorePromotionsStyled>
            <h1 className="MorePromotions__title">
                ENCUENTRA MAS <span>PROMOCIONES</span>
            </h1>
            <MorePromotionsCardsStyled>
                {promos &&
                    promos.lobby.map((promo, index) => (
                        <div key={index}>
                            <MorePromotionsCardStyled>
                                <div className="MorePromotion__image drop">
                                    <Link as={`/promociones/${promo.summary_title}`} href={`/promociones/${index}`}>
                                        <img alt="Banner Apuesta Total" src={`https://demo-apuestatotal.calimaco.com${promo.image}`}></img>
                                    </Link>
                                </div>
                                <div className="MorePromotion__content">
                                    <div className="MorePromotion__contentTop">
                                        <Link href={`/promociones/${index}`}>
                                            <span>{promo.summary_title}</span>
                                        </Link>
                                    </div>
                                    <div className="MorePromotion__contentBottom"></div>
                                </div>
                            </MorePromotionsCardStyled>
                        </div>
                    ))}
            </MorePromotionsCardsStyled>
        </MorePromotionsStyled>
    )
}

export default PromotionMore

const MorePromotionsCardsStyled = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.2rem;
    @media (min-width: 700px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        row-gap: 1rem;
    }
    @media (min-width: 876px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        padding: 50px 100px 50px 100px;
        row-gap: 1rem;
    }
    @media (min-width: 1200px) {
        grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
        row-gap: 1rem;
        padding: 50px 120px 50px 120px;
    }
`
const MorePromotionsCardStyled = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > .MorePromotion__image {
        border-radius: 1rem;
        overflow: hidden;
    }
    .drop {
        filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.9));
    }
    .drop:hover {
        filter: drop-shadow(0 2px 5px red);
    }

    > .MorePromotion__content {
        flex: 1;
        > div.MorePromotion__contentTop {
            font-weight: 400;
            font-size: 18px;
            text-transform: uppercase;
            text-align: center;
        }
        > div.MorePromotion__contentBottom {
            color: ${(props) => props.theme.palette.grey[600]};
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: clamp(1.1rem, 3vw, 0.8rem);

            svg {
                font-size: 1.2rem;
            }
        }
    }
    &:hover {
        color: red;
        text-shadow: 4px 4px 4px #41414a;
    }
`
