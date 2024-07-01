import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Link from 'next/link';
import stylePropObject from 'eslint-plugin-react/lib/rules/style-prop-object';
import { style } from '@mui/system';

const Newssection = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const CylinderNews = () => {
    useEffect(() => {
      const cylinder = document.querySelector('.cylinder');
      const items = document.querySelectorAll('.news-item');
      const itemCount = items.length;
      const angle = 360 / itemCount;

      items.forEach((item, index) => {
        const rotateAngle = angle * index;
        item.style.transform = `rotateY(${rotateAngle}deg) translateZ(150px)`;
      });
    }, []);
  };
  <style>
    {`{
          .cylinder-container {
          display:flex;
          justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    margin: 0;
    perspective: 1000px;
}

.cylinder {
    position: relative;
    width: 300px;
    height: 300px;
    transform-style: preserve-3d;
    animation: rotateCylinder 10s infinite linear;
}
    .news-item {
    position: absolute;
    width: 300px;
    height: 50px;
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    font-family: Arial, sans-serif;
}

@keyframes rotateCylinder {
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(360deg);
    }
}
      }`}
  </style>;
  return (
    <div className="newssection py-5">
      <div className="container">
        <h2 className="py-4 text-center text-white">News Coverage</h2>
        <div
          className="py-3 swiperjs cylinder-container"
          // data-aos="slide-up"
          // data-aos-offset="200"
          // data-aos-easing="ease"
          // data-aos-duration="400"
          // data-aos-delay="200"
        >
          <Swiper
            className="category-slider cylinder"
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
                spaceBetween: 1,
              },
              1000: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            navigation
            allowSlidePrev={true}
            // pagination={{ clickable: true }}
            // className="mySwiper"
          >
            <SwiperSlide>
              <div className="slider-inner news-item active">
                <div className="slider-profile">
                  <Link href="https://www.prlog.org/12995980-applykarts-global-vision-transforming-job-search-experiences-for-the-nextgeneration.html">
                    <img src={'/assets/images/prolog.png'} className="prologimage" alt="user" />
                  </Link>
                </div>
                <div className="category-slider-text">
                  <p className="">
                    Applykart's Global Vision: Transforming Job Search Experiences for the Next Generation
                  </p>
                </div>

                <Link href="https://www.prlog.org/12995980-applykarts-global-vision-transforming-job-search-experiences-for-the-nextgeneration.html">
                  <Button className="btn active slider-btn">
                    Read More
                    <span className="ps-2 btn-right-arrow">
                      <img src={'/assets/images/right-arrow.svg'} alt="right-arrow" />
                    </span>
                  </Button>
                </Link>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="slider-inner news-item">
                <div className="slider-profile">
                  <Link href="https://www.issuewire.com/from-migrant-struggles-to-job-market-innovation-bharati-babbars-impactful-journey-applykart-1783240775672099">
                    <img src={'/assets/images/issuewire.png'} className="issuewireimage" alt="retail" />
                  </Link>
                </div>
                <div className="category-slider-text">
                  <p>From Migrant Struggles to Job Market Innovation: Bharati Babbar's Impactful journey - ApplyKart</p>
                </div>

                <Link href="https://www.issuewire.com/from-migrant-struggles-to-job-market-innovation-bharati-babbars-impactful-journey-applykart-1783240775672099">
                  <Button className="btn slider-btn">
                    Read More
                    <span className="ps-2 btn-right-arrow">
                      <img src={'/assets/images/right-arrow.svg'} alt="right-arrow" />
                    </span>
                  </Button>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-inner news-item">
                <div className="slider-profile">
                  <Link href="https://www.prurgent.com/2024-02-26/pressrelease473045.htm">
                    <img src={'/assets/images/urgent.png'} className="urgentimage" alt="cleaning" />
                  </Link>
                </div>
                <div className="category-slider-text">
                  <p>
                    ApplyKart the new hiring platform is winning hearts by talking the talk and walking the walk the Gen
                    Z way
                  </p>
                </div>

                <Link href="https://www.prurgent.com/2024-02-26/pressrelease473045.htm">
                  <Button className="btn slider-btn">
                    Read More
                    <span className="ps-2 btn-right-arrow">
                      <img src={'/assets/images/right-arrow.svg'} alt="right-arrow" />
                    </span>
                  </Button>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-inner news-item">
                <div className="slider-profile">
                  <Link href="https://www.startupdaily.net/topic/women-in-tech-news-analysis/jobs-networking-app-applykart-is-helping-gen-z-older-people-and-migrants-find-work/">
                    <img src={'/assets/images/startupdaily.svg'} className="startupimage" alt="user" />
                  </Link>
                </div>
                <div className="category-slider-text">
                  <p>Jobs networking app ApplyKart is helping Gen Z, older people and migrants find work</p>
                  <br />
                </div>

                <Link href="https://www.startupdaily.net/topic/women-in-tech-news-analysis/jobs-networking-app-applykart-is-helping-gen-z-older-people-and-migrants-find-work/">
                  <Button className="btn  slider-btn">
                    Read More
                    <span className="ps-2 btn-right-arrow">
                      <img src={'/assets/images/right-arrow.svg'} alt="right-arrow" />
                    </span>
                  </Button>
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Newssection;
