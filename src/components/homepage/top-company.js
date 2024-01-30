import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import Head from "next/head";
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
    <Head>
 <link href="../../../styles/css/whyChooseSection.css" rel="stylesheet"/>

    </Head>
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
      <div
        className="section2-card"
        data-aos="fade-up"
        data-aos-easing="ease"
        data-aos-duration="10"
        data-aos-delay="100"
      >
        <main className="chooseJobCard">
          <ul id="cards">
            <li className="card" id="card-1">
              <div className="card-content">
                <div>
                  <h2>Pod Early School</h2>
                  <h5>Barista/Kitchen Hand</h5>
                  <div className="address-location">
                    <span className="map-icon">
                      <img src={"/assets/images/map.png"} alt="map" />
                    </span>
                    <address>Mount Gravatt QLD 4122, Australia</address>
                  </div>
                  <p className="card-text">
                    At Pod Early School, we are passionate about giving children
                    the best possible start in life. We are seeking a
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
                <figure>
                  <img
                    src={"/assets/images/job-images/pod-early-school.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>

            <li className="card" id="card-2">
              <div className="card-content">
                <div>
                  <h2>Vault Espresso</h2>
                  <h5>Barista</h5>
                  <div className="address-location">
                    <span className="map-icon">
                      <img src={"/assets/images/map.png"} alt="map" />
                    </span>
                    <address>Melbourne VIC 3000, Australia</address>
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
                <figure>
                  <img
                    src={"/assets/images/job-images/vault-espresso.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>

            <li className="card" id="card-3">
              <div className="card-content">
                <div>
                  <h2>Pipers by the Lake</h2>
                  <h5>Barista</h5>
                  <div className="address-location">
                    <span className="map-icon">
                      <img src={"/assets/images/map.png"} alt="map" />
                    </span>
                    <address>Lake Wendouree VIC 3350, Australia</address>
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
                <figure>
                  <img
                    src={"/assets/images/job-images/pipers-by-the-lake.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>

            <li className="card" id="card-4">
              <div className="card-content">
                <div>
                  <h2>NSW Government</h2>
                  <h5>Financial Assurance Officers</h5>
                  <div className="address-location">
                    <span className="map-icon">
                      <img src={"/assets/images/map.png"} alt="map" />
                    </span>
                    <address>
                      52 Martin Place; Chief Secretary's building
                    </address>
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
                <figure>
                  <img
                    src={"/assets/images/job-images/nsw-government.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-5">
              <div className="card-content">
                <div>
                  <h2>ACCOTAX ADVISORY PTY LTD</h2>
                  <h5>Assistant Accountant</h5>
                  <div className="address-location">
                    <span className="map-icon">
                      {" "}
                      <img src={"/assets/images/map.png"} alt="map" />
                    </span>
                    <address>Hobart TAS 7000, Australia</address>
                  </div>
                  <p className="card-text">
                    ACCOTAX ADVISORY PTY LTD is a public accountants firm
                    providing Tax, Accounting & Business services for small &
                    medium businesses, self-managed super funds, and
                    individuals. Based in Hobart, we are looking for an
                    experienced Assistant Accountant to assist with the
                    management of our day-to-day accounting.
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
                <figure>
                  <img
                    src={"/assets/images/job-images/accotax-advisory.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-6">
              <div className="card-content">
                <div>
                  <h2>NSW Government</h2>
                  <h5>Fixed Asset Accountants</h5>
                  <div className="address-location">
                    <span className="map-icon">
                      <img src={"/assets/images/map.png"} alt="map" />
                    </span>
                    <address>
                      52 Martin Place; Chief Secretary's building
                    </address>
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
                <figure>
                  <img
                    src={"/assets/images/job-images/nsw-government.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-7">
              <div className="card-content">
                <div>
                  <h2>Costa Asset Management</h2>
                  <h5>Accountant</h5>
                  <div className="address-location">
                    <span className="map-icon">
                      <img src={"/assets/images/map.png"} alt="map" />
                    </span>
                    <address>Geelong VIC 3220, Australia</address>
                  </div>
                  <p className="card-text">
                    Costa Asset Management is a private investment house. Its
                    activities focus on growing, managing, and sustaining
                    capital by delivering positive risk adjusted returns. This
                    is a busy and dynamic role suitable for someone taking the
                    next step in their career. Join this sought-after industry
                    leader and enjoy a collaborative and supportive team
                    environment.
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
                <figure>
                  <img
                    src={"/assets/images/job-images/costa-asset-management.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-8">
              <div className="card-content">
                <div>
                  <h2>NSW Government</h2>
                  <h5>Financial Reporting Accountant</h5>
                  <div className="address-location">
                    <span className="map-icon">
                      <img src={"/assets/images/map.png"} alt="map" />
                    </span>
                    <address>
                      52 Martin Place; Chief Secretary's building
                    </address>
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
                <figure>
                  <img
                    src={"/assets/images/job-images/nsw-government.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
          </ul>
        </main>
      </div>
      <div className="card-bg d-flex justify-content-center align-items-end"></div>

      {/* <div className="inline content-full">
        <section className="Hero inline gap-2">
          <div className="Wrapper block content-3">
            <div className="Visual block-center-center">
              <picture className="FirstPic">
                <source
                  srcSet="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-desktop-3.avif
                "
                  media="(width >= 1024px)"
                  type="image/avif"
                />
                <source
                  srcSet="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-3.avif
                "
                  type="image/avif"
                />

                <source
                  srcSet="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-desktop-3.webp
                "
                  media="(width >= 1024px)"
                  type="image/webp"
                />
                <img
                  src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-3.webp"
                  alt="Stories Unveiled"
                />
              </picture>
              <picture className="SecondPic">
                <source
                  srcSet="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-desktop-2.avif
                "
                  media="(width >= 1024px)"
                  type="image/avif"
                />
                <source
                  srcSet="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-2.avif
                "
                  type="image/avif"
                />

                <source
                  srcSet="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-desktop-2.webp
                "
                  media="(width >= 1024px)"
                  type="image/webp"
                />
                <img
                  src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-2.webp"
                  alt="Celebrating Life Together"
                />
              </picture>
              <picture className="ThirdPic">
                <source
                  srcSet="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-desktop-1.avif
                "
                  media="(width >= 1024px)"
                  type="image/avif"
                />
                <source
                  srcSet="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-1.avif
                "
                  type="image/avif"
                />

                <source
                  srcSet="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-desktop-1.webp
                "
                  media="(width >= 1024px)"
                  type="image/webp"
                />
                <img
                  src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-1.webp"
                  alt="The Art of Giving"
                />
              </picture>
            </div>
          </div>

          <div className="Content block">
            <div
              id="StoriesUnveiled"
              className="FirstLockup block-center-start"
            >
              <div className="block gap-3">
                <h3>Stories Unveiled</h3>
                <div className="subhead">
                  Capture the essence of family celebration.
                </div>
                <p>Share the moments that weave your family tale.</p>
              </div>
            </div>
            <div
              id="CelebratingLifeTogether"
              className="SecondLockup block-center-start"
            >
              <div className="block gap-3">
                <h3>Celebrating Life Together</h3>
                <div className="subhead">
                  Embrace the significance of shared joy.
                </div>
                <p>In every celebration, find the heartwarming stories.</p>
              </div>
            </div>
            <div id="TheArtofGiving" className="ThirdLockup block-center-start">
              <div className="block gap-3">
                <h3>The Art of Giving</h3>
                <div className="subhead">
                  Explore the stories within each present.
                </div>
                <p>Every gift is a chapter in your family's narrative.</p>
              </div>
            </div>
          </div>

          <div className="SmallScreenContent block-center-center">
            <p className="FirstStory">The Art of Giving</p>
            <p className="SecondStory">Celebrating Life Together</p>
            <p className="ThirdStory">Stories Unveiled</p>
          </div>
        </section>

         <div className="pagination block-center-center content-full">
        <div className="inline gap-3">
          <a href="#StoriesUnveiled"></a>
          <a href="#CelebratingLifeTogether"></a>
          <a href="#TheArtofGiving"></a>
        </div>
      </div> 
      </div> */}

      {/*  */}
    </div>
  );
};

export default TopCompanies;
