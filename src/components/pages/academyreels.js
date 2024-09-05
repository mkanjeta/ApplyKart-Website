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
import VideoPlayer from "components/VideoPlayer";

SwiperCore.use([Navigation, Autoplay, EffectFade, A11y]);

export default function Academyreels() {
  const [centerIndex, setCenterIndex] = useState();
  const [autoplay, setAutoplay] = useState({
      delay: 0,
      disableOnInteraction: 1,
    });

  const handleSlideChange = (swiper) => {
    setCenterIndex(swiper.realIndex);
  };

  const slide_img = [
    "videos/2024-08-29T11:06:17.244Z.m3u8",
    "videos/2024-08-29T11:06:17.238Z.m3u8",
    "videos/2024-08-29T11:06:17.217Z.m3u8",
    "videos/2024-08-29T11:06:17.226Z.m3u8",
  ];

  return (
    <>
      <div className="reelslider">
        <div className="viewmaster">
          <div className="" onClick={()=>setAutoplay(false)}>
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
              autoplay={autoplay}
              loop={false}
              effect="slide"
              speed={6000}
              spaceBetween={0}
              breakpoints={{
                300: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                920: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
                1340: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
              }}
              freeMode="true"
              grabCursor="true"
            >
              {slide_img.map((url, i) => {
                return (
                  <SwiperSlide key={i}>
                    <div className="doteffect">
                      <div className="carousel-cell sepiaEffect">
                      <VideoPlayer key={i} src={"https://share.applykart.co/"+url} />
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
