'use client';
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectFade, Navigation, Autoplay, A11y } from "swiper";

export default function ReelSlider() {
  return (
    <>
    <div className="container reelslider">
      <div className="my-5">
      <Swiper
      modules={[Navigation, A11y]}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      breakpoints={{
        // when window width is >= 640px
        300: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        // when window width is >= 768px
        920: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1340: {
          slidesPerView: 6,
          spaceBetween: 30
        },
      }}
    >
      <SwiperSlide>
        <img src="/assets/images/reelgif.gif" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/images/reel2.gif" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/images/reel3.gif" alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/images/reel4.gif" alt="Slide 4" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/images/reel5.gif" alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/images/reel2.gif" alt="Slide 5" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/images/reelgif.gif" alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/images/reel3.gif" alt="Slide 2" />
      </SwiperSlide>
    </Swiper>
      </div>
      </div>
    </>
  );
}
