import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, {
  Navigation,
  Autoplay,
  EffectFade,
  A11y,
  EffectCoverflow,
} from "swiper";

SwiperCore.use([Navigation, Autoplay, EffectFade, A11y]);

export default function Academyreels() {
  const [centerIndex, setCenterIndex] = useState();

  const handleSlideChange = (swiper) => {
    setCenterIndex(swiper.realIndex);
  };

  const slide_img = [
    "/assets/images/academyreel1.gif",
    "/assets/images/academyreel2.gif",
    "/assets/images/academyreel3.gif",
    "/assets/images/academyreel4.gif",
  ];

  return (
    <>
      <div className="reelslider">
        <div className="viewmaster">
          <div className="">
            <Swiper
              modules={[
                Navigation,
                A11y,
                Autoplay,
                EffectFade,
                EffectCoverflow,
              ]}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={handleSlideChange}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView="auto"
              // centeredSlides= "true"
              effect="slide"
              // coverflowEffect={{
              //   opacity: 0.5
              // }}
              speed={6000}
              breakpoints={{
                300: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                920: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1340: {
                  slidesPerView: 5,
                  spaceBetween: 15,
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
                          <img src={img} alt="" className="academyslider-gif" />
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
