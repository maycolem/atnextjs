import { styled } from '@mui/system'

export const FeaturedPromotionsStyled = styled('div')`
    > h1 {
        font-size: 1.1rem;
        font-weight: 400;
        font-style: italic;
        margin-bottom: 0.5rem;
        @media (min-width: 700px) {
            font-size: 1.3rem;
        }
        span {
            font-weight: 500;
        }
    }
    > div.FeaturedPromotions__images {
        display: flex;
        gap: 1rem;
    }
`

export const FeaturedPromotionsBannersStyled = styled('div')`
    overflow: hidden;
    display: flex;
    width: 100%;
    gap: 0.5rem;
    > div.FeaturedPromotions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;
        &.--large {
            flex: 0.7;
        }
        &.--short {
            flex: 0.3;
        }
        > .FeaturedPromotions__image {
            height: clamp(150px, 40vw, 400px);
            border-radius: 1rem;
            overflow: hidden;
            img {
                object-fit: cover;
            }
        }

        > .FeaturedPromotions__content {
            flex: 1;
            > div.FeaturedPromotions__contentTop {
                font-weight: 500;
                font-size: clamp(0.8rem, 3vw, 0.95rem);
                text-transform: uppercase;
            }
            > div.FeaturedPromotions__contentBottom {
                color: ${(props) => props.theme.palette.grey[600]};
                display: flex;
                align-items: center;
                font-weight: 400;
                font-size: clamp(0.75rem, 3vw, 0.8rem);

                svg {
                    font-size: 1.2rem;
                }
            }
        }
    }
`
