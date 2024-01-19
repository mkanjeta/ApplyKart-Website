import React, { Component, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ImageGallery = () =>{
    
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // console.log(thumbsSwiper);

    return(
        <>
        <div className="new-section-1">
        {/* {thumbsSwiper &&
           <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper:  thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
            </SwiperSlide>       
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </SwiperSlide>
      </Swiper>} */}

<Swiper
       modules={[Navigation, Pagination, Scrollbar, A11y, FreeMode, Thumbs]}
       thumbs={{ swiper: thumbsSwiper }}
       spaceBetween={40}
       slidesPerView={4}
       navigation={true}
       allowSlidePrev={true}
       
        
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
       
      </Swiper>
      <Swiper
         modules={[FreeMode, Navigation, Thumbs]}
         //onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
         watchSlidesProgress={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        
      </Swiper>

      </div>
        </>
    );
};

export default ImageGallery;

 