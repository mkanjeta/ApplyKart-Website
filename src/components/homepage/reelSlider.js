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
    "/assets/images/reelgif.gif",
    "/assets/images/reel2.gif",
    "/assets/images/reel3.gif",
    "/assets/images/reel4.gif",
    "/assets/images/reel5.gif",
    "/assets/images/reel2.gif",
    "/assets/images/reel3.gif",
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
        delay: 1000,
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView="auto"
      centeredSlides= "true"
      coverflowEffect={{
        opacity: 0.5
      }}
      breakpoints={{
        300: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        920: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        1340: {
          slidesPerView: 5,
          spaceBetween: 15
        },
      }}
    >

      {slide_img.map((img, i) => {
          return (
            <SwiperSlide key={i}>
             <div className="carousel-cell" style={{ opacity: centerIndex == i ? 1 : '' }}> <img src={img} alt="" /> </div>
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
