import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs, FreeMode, Navigation, Pagination } from "swiper";
import { useEffect } from "react";
import Typewriter from "typewriter-effect";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="section-swiper">
      <div
        className="header-text"
        data-aos="fade-left"
        data-aos-easing="ease-in-shine"
        data-aos-duration="100"
        data-aos-delay="100"
      >
        <h2 className="text-center how-it-work">
          This Is
          <span className="animate">
            <strong>
              <Typewriter
                options={{
                  strings: ["How It Works"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </strong>
          </span>
        </h2>
      </div>
      <div className="container">
        <div className="swiper-main-container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <div
                className="circle-slide-0"
                data-aos-easing="ease"
                data-aos-duration="200"
                data-aos-delay="100"
              >
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  direction="vertical"
                  watchSlidesProgress={true}
                  modules={[Navigation, Thumbs]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div
                      className="swiper-text"
                      data-aos="slide-right"
                      data-aos-easing="ease"
                      data-aos-duration="100"
                      data-aos-delay="100"
                    >
                      <ul>
                        <li>
                          <h2>01.</h2>
                          <span className="v-card-text-0">
                            <h4>Register</h4>
                            <p>
                              Register yourself on ApplyKart by creating an
                              account with a unique OTP. We promise it won't
                              take more than 3 minutes!
                            </p>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div
                      className="swiper-text"
                      data-aos="slide-right"
                      data-aos-easing="ease"
                      data-aos-duration="200"
                      data-aos-delay="200"
                    >
                      <ul>
                        <li>
                          <h2>02.</h2>
                          <span className="v-card-text-0">
                            <h4>Create a V-Card</h4>
                            <p>
                              Create a unique visiting card to showcase your
                              talent to potential employers/recruiters
                            </p>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div
                      className="swiper-text"
                      data-aos="slide-right"
                      data-aos-easing="ease"
                      data-aos-duration="300"
                      data-aos-delay="300"
                    >
                      <ul>
                        <li>
                          <h2>03.</h2>
                          <span className="v-card-text-0">
                            <h4>Find a Job</h4>
                            <p>
                              Enter your job/hiring preferences and let our
                              magic sauce do the hard work
                            </p>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div
                      className="swiper-text"
                      data-aos="slide-right"
                      data-aos-easing="ease"
                      data-aos-duration="400"
                      data-aos-delay="400"
                    >
                      <ul>
                        <li>
                          <h2>04.</h2>
                          <span className="v-card-text-0">
                            <h4>Apply to a Job</h4>
                            <p>
                              If you love what you see, apply to a job and get
                              invited to a LIVE job interview on our app! Let's
                              get ready to crack that interview!
                            </p>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <div className="col-lg-6 col-10 order-first order-lg-last">
              <div className="circle-slide-1">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    waitForTransition: true,
                  }}
                  spaceBetween={10}
                  navigation={true}
                  pagination={{ clickable: true }}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[Autoplay, FreeMode, Navigation, Pagination, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <div className="swiper-img-box">
                      <img
                        src={"/assets/images/register.png"}
                        alt="swiper-iphone"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-img-box">
                      <img src={"/assets/images/my_vcard.png"} alt="my_vcard" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-img-box">
                      <img
                        src={"/assets/images/find-a-job.png"}
                        alt="my_vcard"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-img-box">
                      <img src={"/assets/images/apply-job.png"} alt="user" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
