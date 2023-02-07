import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick/lib/slider'
import styled from '@emotion/styled'
const SliderAT = ({ children, ...rest }) => {
  const defaultSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // centerPadding: '20px',
    // centerMode: true,
  }
  return (
    <>
      <SliderS {...defaultSetting} {...rest}>
        {children}
      </SliderS>
    </>
  )
}

export default SliderAT
const SliderS = styled(Slider)`
  flex: 1;
  overflow: hidden;
  width: 0;

  & {
    && {
      animation-timing-function: linear !important;
    }
    & > button {
      opacity: 0;
      height: 100%;
      width: 5vw;
      z-index: 99;
      &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
      }
    }
    ul li button {
      &:before {
        font-size: 10px;
        color: rgb(150, 158, 171);
      }
    }
    li.slick-active button:before {
      color: white;
    }
    .slick-next {
      right: 0;
    }
    .slick-prev {
      left: 0;
    }
    .slick-dots {
      bottom: 0;
    }
    .slick-list {
      overflow: initial;
    }
  }
`
