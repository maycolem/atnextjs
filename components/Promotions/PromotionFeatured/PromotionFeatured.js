import React from 'react'
import fakeIMG from 'public/assets/promotions/fake.jpg'
// import {
//   FeaturedPromotionsBannersStyled,
//   FeaturedPromotionsStyled,
//   PromotionCardStyledCustom,
// } from './PromotionFeatured.css'
import { BiChevronRight } from 'react-icons/bi'
// import { PromotionCardStyled } from 'components/WinnerMonday/WinnerMonday.css'
import { useMediaQuery } from '@mui/material'
import classNames from 'classnames'
// mobileS: `(max-width : 330px)`,
// mobileM: `(max-width : 400px)`,
// mobileL: `(max-width : 480px)`,
// tabletS: `(max-width : 600px)`,
// tabletL: `(max-width : 768px)`,
// desktopXS: `(max-width : 900px)`,
// desktopS: `(max-width : 1080px)`,
// desktopM: `(max-width : 1200px)`,
// desktopL: `(max-width : 1400px)`,
// desktopXL: `(max-width : 1920px)`,
const PromotionFeatured = () => {
    const isTabletL = useMediaQuery('@media (min-width: 768px)')
    return (
        <FeaturedPromotionsStyled>
            <h1 className="FeaturedPromotions__title">
                PROMOCIÓN <span>DESTACADA</span>
            </h1>
            <FeaturedPromotionsBannersStyled>
                <div className={classNames('FeaturedPromotions', { '--large': isTabletL })}>
                    <div className="FeaturedPromotions__image">
                        <img alt="Banner Apuesta Total" src={fakeIMG.src}></img>
                    </div>
                    <div className="FeaturedPromotions__content">
                        <div className="FeaturedPromotions__contentTop">SED UT PERSPICIATIS UNDE</div>
                        <div className="FeaturedPromotions__contentBottom">
                            Beatae vitae <BiChevronRight />
                        </div>
                    </div>
                </div>
                {isTabletL && (
                    <div className="FeaturedPromotions --short">
                        <div className="FeaturedPromotions__image">
                            <img alt="Banner Apuesta Total" src={fakeIMG.src}></img>
                        </div>
                        <div className="FeaturedPromotions__content">
                            <div className="FeaturedPromotions__contentTop">SED UT PERSPICIATIS UNDE</div>
                            <div className="FeaturedPromotions__contentBottom">
                                Beatae vitae <BiChevronRight />
                            </div>
                        </div>
                    </div>
                )}
            </FeaturedPromotionsBannersStyled>
        </FeaturedPromotionsStyled>
    )
}

export default PromotionFeatured
