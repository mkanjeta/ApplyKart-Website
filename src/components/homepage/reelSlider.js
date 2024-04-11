'use client';
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectFade, Navigation, Autoplay, A11y } from "swiper";

export default function ReelSlider() {
  return (
    <>
    <div className="container">
      <div className="my-5">
        <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')} 
        >
          <SwiperSlide>
            <img src="/assets/images/reelgif.gif" />
          </SwiperSlide>
          <SwiperSlide>
             <img src="/assets/images/reel2.gif" />
          </SwiperSlide>
          <SwiperSlide>
          <img src="/assets/images/reelgif.gif" />  
          </SwiperSlide>
          <SwiperSlide>
          <img src="/assets/images/reel2.gif" />
          </SwiperSlide>
         
        </Swiper>
      </div>
      </div>
    </>
  );
}
