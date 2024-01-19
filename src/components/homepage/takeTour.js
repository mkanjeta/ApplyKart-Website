'use client';
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectFade, Navigation, Pagination } from "swiper";

export default function TakeTour({ setActiveSlide }) {
  return (
    <>
      <div className="take-tour-container">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
          onSlideChange={(e) => {
            // console.log("Slide changed ==>>", e);
          }}
          onActiveIndexChange={(swiper) => {
            // console.log(swiper.activeIndex);
            setActiveSlide(swiper.activeIndex);
          }}
        >
          <SwiperSlide>
            <img src="/assets/images/take_tour_img/tour-1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/take_tour_img/tour-2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/take_tour_img/tour-3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/take_tour_img/tour-4.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/take_tour_img/tour-5.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/take_tour_img/tour-6.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/take_tour_img/tour-7.png" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
