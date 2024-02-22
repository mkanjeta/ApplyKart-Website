import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Typewriter from "typewriter-effect";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";

const SearchJob = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div>
      <div className="section5">
        <div className="banner5">
          <div
            className="left-content"
            data-aos="fade-up"
            data-aos-easing="ease"
            data-aos-duration="50"
            data-aos-delay="100"
          >
            <h1 className="section5-heading">
              Search Jobs by
              <span className="animate">
                <strong>
                  <Typewriter
                    options={{
                      strings: ["Categories"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </strong>
              </span>
            </h1>
            <p className="para">
              All businesses - big and small - need staff. <br /> They need you!
              And we've got you covered!
            </p>
          </div>
          <div className="right-content"></div>
        </div>
        <div
          className="swiperjs"
          data-aos="slide-up"
          data-aos-offset="200"
          data-aos-easing="ease"
          data-aos-duration="400"
          data-aos-delay="200"
        >
          <Swiper
            className="category-slider"
            // slidesPerView={4}
            // spaceBetween={30}
            // centeredSlides={true}
            modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
            // spaceBetween={40}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              600: {
                slidesPerView: 1,
                spaceBetween: 1
              },
              1000:{
                slidesPerView:2,
                spaceBetween: 20
              },
              1300:{
                slidesPerView:4,
                spaceBetween: 20
              },
            }}
            navigation
            allowSlidePrev={true}
            // pagination={{ clickable: true }}
            // className="mySwiper"
          >
            <SwiperSlide>
              <div className="slider-inner active">
                <div className="slider-profile">
                  <img
                    src={"/assets/images/category-slider/aged-care.jpg"}
                    alt="user"
                  />
                </div>
                <div className="category-slider-text">
                  <h5 className="active">Aged Care </h5>
                  <p className="">
                    An aged care worker provides personal, physical and
                    emotional support to older people who require assistance
                    with daily living.
                  </p>
                </div>
                <Button className="btn active slider-btn">
                  View Jobs
                  <span className="ps-2 btn-right-arrow">
                    <img
                      src={"/assets/images/right-arrow.svg"}
                      alt="right-arrow"
                    />
                  </span>
                </Button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-inner">
                <div className=" slider-profile">
                  <img
                    src={"/assets/images/category-slider/hospitality.png"}
                    alt="hospitality"
                  />
                </div>
                <div className="category-slider-text">
                  <h5>Hospitality</h5>
                  <p>
                    Being a professional working for the Hospitality industry
                    requires dedication, excellent problem-solving skills,
                    outstanding organizational skills.
                  </p>
                </div>
                <Button className="btn btn-warning slider-btn">
                  View Jobs
                  <span className="ps-3 btn-right-arrow">
                    <img
                      src={"/assets/images/right-arrow.svg"}
                      alt="right-arrow"
                    />
                  </span>
                </Button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-inner">
                <div className="slider-profile">
                  <img
                    src={"/assets/images/category-slider/logistic.png"}
                    alt="logistic"
                  />
                </div>
                <div className="category-slider-text">
                  <h5>Transportation & Logistics </h5>
                  <p>
                    Strategically plan and manage logistics, warehouse,
                    transportation and customer services · Direct, optimize and
                    coordinate full order cycle.
                  </p>
                </div>
                <Button className="btn slider-btn">
                  View Jobs
                  <span className="ps-3 btn-right-arrow">
                    <img
                      src={"/assets/images/right-arrow.svg"}
                      alt="right-arrow"
                    />
                  </span>
                </Button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-inner">
                <div className="slider-profile">
                  <img
                    src={"/assets/images/category-slider/nursing.png"}
                    alt="nursing"
                  />
                </div>
                <div className="category-slider-text">
                  <h5>Nursing </h5>
                  <p>
                    Assessing, observing, and speaking to patients · Recording
                    details and symptoms of patient medical history.
                  </p>
                </div>
                <Button className="btn  slider-btn">
                  View Jobs
                  <span className="ps-3 btn-right-arrow">
                    <img
                      src={"/assets/images/right-arrow.svg"}
                      alt="right-arrow"
                    />
                  </span>
                </Button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-inner">
                <div className="slider-profile">
                  <img
                    src={"/assets/images/category-slider/retail.png"}
                    alt="retail"
                  />
                </div>
                <div className="category-slider-text">
                  <h5>Retail</h5>
                  <p>
                    A Retail Sales Associate is responsible for all sales
                    activities and sales associate job duties, from greeting
                    customers, answering questions,
                  </p>
                </div>
                <Button className="btn slider-btn">
                  View Jobs
                  <span className="ps-3 btn-right-arrow">
                    <img
                      src={"/assets/images/right-arrow.svg"}
                      alt="right-arrow"
                    />
                  </span>
                </Button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-inner">
                <div className="slider-profile">
                  <img
                    src={"/assets/images/category-slider/cleaning.png"}
                    alt="cleaning"
                  />
                </div>
                <div className="category-slider-text">
                  <h5>Cleaning</h5>
                  <p>
                    Responsible for all basic cleaning in and around residences
                    or office buildings. Cleans floors and rooms. including dust
                    mopping, damp mopping.
                  </p>
                </div>
                <Button className="btn slider-btn">
                  View Jobs
                  <span className="ps-3 btn-right-arrow">
                    <img
                      src={"/assets/images/right-arrow.svg"}
                      alt="right-arrow"
                    />
                  </span>
                </Button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-inner">
                <div className="slider-profile">
                  <img
                    src={"/assets/images/category-slider/warehousing.jpg"}
                    alt="user"
                  />
                </div>
                <div className="category-slider-text">
                  <h5>Warehousing</h5>
                  <p>
                    Warehouse workers work in warehouses where they receive,
                    unpack, arrange and store goods, and gather, pack, prepare
                    and load goods for dispatching.
                  </p>
                </div>
                <Button className="btn  slider-btn">
                  View Jobs
                  <span className="ps-3 btn-right-arrow">
                    <img
                      src={"/assets/images/right-arrow.svg"}
                      alt="right-arrow"
                    />
                  </span>
                </Button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SearchJob;
