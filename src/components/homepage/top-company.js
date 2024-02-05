import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

import AOS from "aos";
import "aos/dist/aos.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper";

import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

const TopCompanies = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
    
  return (
    <div className="section2">
      <div className="container md-sticky">
        <h1
          className="section2-heading text-cente r"
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

        
      <div className="JobcardDesign pt-5">
     
      <div className="jobCardContainer">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <div className="jobCardBox">
                <div className="card-content">
                  <figure>
                    <img
                      src={"/assets/images/job-images/pod-early-school.png"}
                      alt="user"
                    />
                  </figure>
                  <div>
                    <h2>Pod Early School</h2>
                    <h5>Barista/Kitchen Hand</h5>
                    <div className="address-location d-flex">
                      <span className="map-icon">
                        <img src={"/assets/images/map.png"} alt="map" />
                      </span>
                      <address className="mx-2">Mount Gravatt QLD 4122, Australia</address>
                    </div>
                    <p className="card-text">
                      At Pod Early School, we are passionate about giving
                      children the best possible start in life. We are seeking a
                      Barista/Kitchen Hand for our childcare centre located in
                      Mount Gravatt. You will be responsible for providing a
                      barista service to our families in the morning and
                      supporting our chef in planning and preparing meals for
                      children.
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
                </div>
              </div>
              <div className="jobCardBox">
                <div className="card-content">
                  <figure>
                  <img
                    src={"/assets/images/job-images/vault-espresso.png"}
                    alt="user"
                  />
                  </figure>
                  <div>
                  <h2>Vault Espresso</h2>
                  <h5>Barista</h5>
                    <div className="address-location d-flex">
                      <span className="map-icon">
                        <img src={"/assets/images/map.png"} alt="map" />
                      </span>
                      <address className="mx-2">Melbourne VIC 3000, Australia</address>
                    </div>
                    <p className="card-text">
                    Vault Espresso is an exciting new cafe opening in the heart
                    of Noosa's industrial estate. Opening to the public Monday
                    to Friday 5am-2pm, this is a rare opportunity to work within
                    hospitality and still maintain the always sort after
                    "work/life balance" with your nights, weekends, and public
                    holidays completely FREE!
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
                </div>
              </div>
              <div className="jobCardBox">
                <div className="card-content">
                  <figure>
                  <img
                    src={"/assets/images/job-images/pipers-by-the-lake.png"}
                    alt="user"
                  />
                  </figure>
                  <div>
                  <h2>Pipers by the Lake</h2>
                  <h5>Barista</h5>
                    <div className="address-location d-flex">
                      <span className="map-icon">
                        <img src={"/assets/images/map.png"} alt="map" />
                      </span>
                      <address className="mx-2">Lake Wendouree VIC 3350, Australia</address>
                    </div>
                    <p className="card-text">
                    Pipers by the Lake is one of Western Victoria's leading
                    restaurants and function centre. We are looking for a fun
                    and engaged person to join our friendly and professional
                    team. We are a highly respected, diverse and collaborative
                    team that is excited to be engaged with our customers in one
                    of Ballarat's most idyllic settings
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
                </div>
              </div>
              <div className="jobCardBox">
                <div className="card-content">
                  <figure>
                  <img
                    src={"/assets/images/job-images/nsw-government.png"}
                    alt="user"
                  />
                  </figure>
                  <div>
                  <h2>NSW Government</h2>
                  <h5>Financial Assurance Officers</h5>
                    <div className="address-location d-flex">
                      <span className="map-icon">
                        <img src={"/assets/images/map.png"} alt="map" />
                      </span>
                      <address className="mx-2"> 52 Martin Place; Chief Secretary's building</address>
                    </div>
                    <p className="card-text">
                    The Department of Planning and Environment's (DPE) vision is
                    to create thriving environments, communities and economies
                    for the people of New South Wales.We strive to be a
                    high-performing, world-class public service organisation.
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      </div>

      <div className="container text-center mb-5">
   <Link href="/dashboard?jobType=ALLJOBS" passHref><button className="btn btn-warning" type="submit">View more jobs<i className="fal fa-long-arrow-right"></i></button></Link>
    </div>
    </div>
  );
};

export default TopCompanies;
