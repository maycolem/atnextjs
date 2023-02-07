const { styled } = require('@mui/system')

export const PromotionStyled = styled('div')`
  > div.promotions__wrapper {
    margin: auto;
    padding: 1.5rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (min-width: 1436px) {
      padding: 2rem 0;
    }
  }
`
