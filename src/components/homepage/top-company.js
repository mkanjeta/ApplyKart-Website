import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import AOS from "aos";
import "aos/dist/aos.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper";

import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

const TopCompanies = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="section2">
      <div className="container">
        <h1
          className="section2-heading text-center"
          data-aos="fade-up"
          data-aos-easing="ease"
          data-aos-delay="50"
        >
          Find and{" "}
          <span className="animate">
            <strong>
              <Typewriter
                options={{
                  strings: ["Choose a Job"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </strong>
          </span>
          That Suits Your Passion
        </h1>
        {/* <p className="para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p> */}
      </div>
      <div
        className="section2-card"
        data-aos="fade-up"
        data-aos-easing="ease"
        data-aos-duration="10"
        data-aos-delay="100"
      >
        <Swiper
          modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={40}
          slidesPerView={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // navigation
          pagination={{ clickable: true }}
          allowSlidePrev={true}
        >
          <SwiperSlide>
            <div className="slider-inner">
              <div className=" slider-header">
                <span className="slider-profile">
                  <img
                    src={"/assets/images/job-images/pod-early-school.png"}
                    alt="user"
                  />
                </span>
                <p className="c-name">Pod Early School</p>
              </div>
              <h5>Barista/Kitchen Hand</h5>
              <div className="address-location">
                <span className="map-icon">
                  <img src={"/assets/images/map.png"} alt="map" />
                </span>
                <address>Mount Gravatt QLD 4122, Australia</address>
              </div>
              <p className="card-text">
                At Pod Early School, we are passionate about giving children the
                best possible start in life. We are seeking a Barista/Kitchen
                Hand for our childcare centre located in Mount Gravatt. You will
                be responsible for providing a barista service to our families
                in the morning and supporting our chef in planning and preparing
                meals for children.
              </p>

              <div className="d-flex slider-btn">
                {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                <Button href="#" className="btn2">
                  Full Time
                </Button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slider-inner">
              <div className=" slider-header">
                <span className="slider-profile">
                  <img
                    src={"/assets/images/job-images/vault-espresso.png"}
                    alt="user"
                  />
                </span>
                <p className="c-name">Vault Espresso</p>
              </div>
              <h5>Barista</h5>
              <div className="address-location">
                <span className="map-icon">
                  <img src={"/assets/images/map.png"} alt="map" />
                </span>
                <address>Melbourne VIC 3000, Australia</address>
              </div>
              <p className="card-text">
                Vault Espresso is an exciting new cafe opening in the heart of
                Noosa's industrial estate. Opening to the public Monday to
                Friday 5am-2pm, this is a rare opportunity to work within
                hospitality and still maintain the always sort after "work/life
                balance" with your nights, weekends, and public holidays
                completely FREE!
              </p>
              <div className="d-flex slider-btn">
                {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                <Button href="#" className="btn2">
                  Full Time
                </Button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slider-inner">
              <div className=" slider-header">
                <span className="slider-profile">
                  <img
                    src={"/assets/images/job-images/pipers-by-the-lake.png"}
                    alt="user"
                  />
                </span>
                <p className="c-name">Pipers by the Lake</p>
              </div>
              <h5>Barista</h5>
              <div className="address-location">
                <span className="map-icon">
                  <img src={"/assets/images/map.png"} alt="map" />
                </span>
                <address>Lake Wendouree VIC 3350, Australia</address>
              </div>
              <p className="card-text">
                Pipers by the Lake is one of Western Victoria's leading
                restaurants and function centre. We are looking for a fun and
                engaged person to join our friendly and professional team. We
                are a highly respected, diverse and collaborative team that is
                excited to be engaged with our customers in one of Ballarat's
                most idyllic settings
              </p>
              <div className="d-flex slider-btn">
                {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                <Button href="#" className="btn2">
                  Full Time
                </Button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slider-inner">
              <div className=" slider-header">
                <span className="slider-profile">
                  <img
                    src={"/assets/images/job-images/nsw-government.png"}
                    alt="user"
                  />
                </span>
                <p className="c-name">NSW Government</p>
              </div>
              <h5>Financial Assurance Officers</h5>
              <div className="address-location">
                <span className="map-icon">
                  <img src={"/assets/images/map.png"} alt="map" />
                </span>
                <address>52 Martin Place; Chief Secretary's building</address>
              </div>
              <p className="card-text">
                The Department of Planning and Environment's (DPE) vision is to
                create thriving environments, communities and economies for the
                people of New South Wales.We strive to be a high-performing,
                world-class public service organisation.
              </p>
              <div className="d-flex slider-btn">
                {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                <Button href="#" className="btn2">
                  Full Time
                </Button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slider-inner">
              <div className=" slider-header">
                <span className="slider-profile">
                  <img
                    src={"/assets/images/job-images/accotax-advisory.png"}
                    alt="user"
                  />
                </span>
                <p className="c-name">ACCOTAX ADVISORY PTY LTD</p>
              </div>
              <h5>Assistant Accountant</h5>
              <div className="address-location">
                <span className="map-icon">
                  {" "}
                  <img src={"/assets/images/map.png"} alt="map" />
                </span>
                <address>Hobart TAS 7000, Australia</address>
              </div>
              <p className="card-text">
                ACCOTAX ADVISORY PTY LTD is a public accountants firm providing
                Tax, Accounting & Business services for small & medium
                businesses, self-managed super funds, and individuals. Based in
                Hobart, we are looking for an experienced Assistant Accountant
                to assist with the management of our day-to-day accounting.
              </p>
              <div className="d-flex slider-btn">
                {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                <Button href="#" className="btn2">
                  Full Time
                </Button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slider-inner">
              <div className=" slider-header">
                <span className="slider-profile">
                  <img
                    src={"/assets/images/job-images/nsw-government.png"}
                    alt="user"
                  />
                </span>
                <p className="c-name">NSW Government</p>
              </div>
              <h5>Fixed Asset Accountants</h5>
              <div className="address-location">
                <span className="map-icon">
                  <img src={"/assets/images/map.png"} alt="map" />
                </span>
                <address>52 Martin Place; Chief Secretary's building</address>
              </div>
              <p className="card-text">
                The Department of Planning and Environment's (DPE) vision is to
                create thriving environments, communities and economies for the
                people of New South Wales.We strive to be a high-performing,
                world-class public service organisation.
              </p>
              <div className="d-flex slider-btn">
                {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                <Button href="#" className="btn2">
                  Full Time
                </Button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slider-inner">
              <div className=" slider-header">
                <span className="slider-profile">
                  <img
                    src={"/assets/images/job-images/costa-asset-management.png"}
                    alt="user"
                  />
                </span>
                <p className="c-name">Costa Asset Management</p>
              </div>
              <h5>Accountant</h5>
              <div className="address-location">
                <span className="map-icon">
                  <img src={"/assets/images/map.png"} alt="map" />
                </span>
                <address>Geelong VIC 3220, Australia</address>
              </div>
              <p className="card-text">
                Costa Asset Management is a private investment house. Its
                activities focus on growing, managing, and sustaining capital by
                delivering positive risk adjusted returns. This is a busy and
                dynamic role suitable for someone taking the next step in their
                career. Join this sought-after industry leader and enjoy a
                collaborative and supportive team environment.
              </p>

              <div className="d-flex slider-btn">
                {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                <Button href="#" className="btn2">
                  Full Time
                </Button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slider-inner">
              <div className="slider-header">
                <span className="slider-profile">
                  <img
                    src={"/assets/images/job-images/nsw-government.png"}
                    alt="user"
                  />
                </span>
                <p className="c-name">NSW Government</p>
              </div>
              <h5>Financial Reporting Accountants</h5>
              <div className="address-location">
                <span className="map-icon">
                  <img src={"/assets/images/map.png"} alt="map" />
                </span>
                <address>52 Martin Place; Chief Secretary's building</address>
              </div>
              <p className="card-text">
                The Department of Planning and Environment's (DPE) vision is to
                create thriving environments, communities and economies for the
                people of New South Wales.We strive to be a high-performing,
                world-class public service organisation.
              </p>
              <div className="d-flex slider-btn">
                {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                <Button href="#" className="btn2">
                  Full Time
                </Button>
              </div>
            </div>
          </SwiperSlide>

          {/* <SwiperSlide>
            <div>
              <div className="">
                <span className="slider-profile">
                  <img
                    src={"/assets/images/user-images/user2.png"}
                    alt="user"
                  />
                </span>
                <p className="c-name">ABNWORLD</p>
              </div>
              <h5>Plumber</h5>
              <div className="address-location">
                <span className="map-icon">
                  <img src={"/assets/images/map.png"} alt="map" />
                </span>
                <address>Sydney NSW, Australia</address>
              </div>
              <p className="card-text">
                ABNWORLD is a leading nationwide Recruitment & Labour Hire
                provider who is now one of Australia’s largest Architecture,
                Engineering, Construction, Renewable Energy and Property
                agencies.
              </p>
              <div className="d-flex slider-btn">
                <Button href="#" className="btn1">
                  $2K-$3K
                </Button>
                <Button href="#" className="btn2">
                  Full Time
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="silder-inner">
              <div className="d-flex align-items-center slider-header">
                <span className="slider-profile">
                  <img
                    src={"/assets/images/user-images/user4.png"}
                    alt="user"
                  />
                </span>
                <p className="c-name">Comp Things</p>
              </div>
              <h5>Barista</h5>
              <div className="address-location">
                <span className="map-icon">
                  <img src={"/assets/images/map.png"} alt="map" />
                </span>
                <address>Geelong VIC, Australia</address>
              </div>
              <p className="card-text">
                We are seeking energetic and experienced baristas to join our
                fast paced cafe.
              </p>
              <div className="d-flex slider-btn">
                <Button href="#" className="btn1">
                  $2K-$3K
                </Button>
                <Button href="#" className="btn2">
                  Full Time
                </Button>
              </div>
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
      <div className="card-bg d-flex justify-content-center align-items-end"></div>

      {/*  */}
    </div>
  );
};

export default TopCompanies;
