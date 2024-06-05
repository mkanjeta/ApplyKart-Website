import React, { useRef, useState, useEffect  } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation, Autoplay, EffectFade, A11y, EffectCoverflow } from 'swiper';

SwiperCore.use([Navigation, Autoplay, EffectFade, A11y]);


export default function ReelSlider() {

  const [centerIndex, setCenterIndex] = useState();

  const handleSlideChange = (swiper) => {
    setCenterIndex(swiper.realIndex);
  };

  const slide_img = [
    "/assets/images/slider-gifs/4NewFeaturesOnTheApplyKartApp.gif",
    "/assets/images/slider-gifs/BenefitsOfTheApplyKartApp.gif",
    "/assets/images/slider-gifs/BlackMinimalistTechnology.gif",
    "/assets/images/slider-gifs/BrightFunkyBusinessTips.gif",
    "/assets/images/slider-gifs/HiringFacebookVideoinWhitePurpleYellowBusinessHipStyle.gif",
    "/assets/images/slider-gifs/JobsThatRequireNoExperience.gif",
    "/assets/images/reelgif.gif",
    "/assets/images/reel2.gif",
    "/assets/images/reel3.gif",
    "/assets/images/reel4.gif",
    "/assets/images/reel5.gif",
  ];

  return (
    <>
    <div className="mb-5 reelslider">
      <div className="viewmaster">

    
      <div className="">
      <Swiper
      modules={[Navigation, A11y, Autoplay, EffectFade, EffectCoverflow ]}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={handleSlideChange}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView="auto"
      centeredSlides= "true"
      effect="slide"
      // coverflowEffect={{
      //   opacity: 0.5
      // }}
      speed={6000}
      breakpoints={{
        300: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        920: {
          slidesPerView: 4,
          spaceBetween: 15
        },
        1340: {
          slidesPerView: 7,
          spaceBetween: 15
        },
      }}
  freeMode="true"
  grabCursor="true"
  freeModeMomentum="false"
    >

      {slide_img.map((img, i) => {
          return (
            <SwiperSlide key={i}>
            <div className="doteffect">
              <div className="carousel-cell sepiaEffect"> 
                <a href="https://play.google.com/store/apps/details?id=com.applykart" target="blank"> 
                <img src={img} alt="" className="slider-gif"/>
                </a> 
              </div>
            </div> 
            </SwiperSlide>
          );
        })}
         
    </Swiper>
      </div>
      </div>
      </div>
    </>
  );
}
