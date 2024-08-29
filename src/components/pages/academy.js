import Head from "next/head";
import ReelSlider from "components/homepage/reelSlider";
import React, {Fragment } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from "next/link";


const AcademyPage = () => {
  return (
    <Fragment>
      <Head>
      <title>ApplyKart Academy | ApplyKart</title>
        <meta name="description" content="Find jobs with ApplyKart"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content=" ApplyKart Academy | ApplyKart" />
        <meta property="og:description" content="Find jobs with ApplyKart" />
        <meta property="og:image" content="https://applykart.co/assets/images/applykart-logo.png" />
        <meta property="og:url" content="https://www.applykart.co/academy" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en-au" />
        <meta name="twitter:card" content="website" />
        <meta name="twitter:site" content="https://applykart.co/" />
        <meta name="twitter:title" content="ApplyKart Academy | ApplyKart" />
        <meta name="twitter:description" content="Find jobs with ApplyKart" />
        <meta name="twitter:image" content="https://applykart.co/assets/images/applykart-logo.png" />
      </Head>
     

      {/* Content Box */}
      <div className="academy-us-container pt-5">

      <div className="d-flex justify-content-evenly align-items-end">

          <img src="/assets/images/academyprofile.jpg" className="img-fluid academyprofile" alt="Academy Profile" />
          <img src="/assets/images/white-logo.svg" className="w-50" />
          <p className="fs-4 fw-normal mb-0 text-white">academy</p>
      </div>

       <div className="heading my-4 mx-3">
        <h1 className="text-white fw-bold" style={{ fontSize: "36px" }}>Unlock your PTE learning.</h1>

        <p className="text-white fw-normal">More than <span className="text-warning">15K+</span> practice questions waiting for you.</p>

       </div>
        
        <div className="mockmasterimage">
            <div className="couponcode">
                <p className="text-dark text-center fs-5 fw-bold mb-0">your code : 210678</p>
                <Link href="/" ><button className="mockmaster_link">Start Your Free PTE Mock Test Now</button></Link>
            </div>
        </div>

        <p className="fs-2 fw-normal my-3 text-center text-white">Top ONLINE Courses for you</p>

    <Swiper className="mx-2 my-3"
      spaceBetween={15}
      slidesPerView={1.5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide >
        <div className="rt-course-box">
        <Link href="/" passHref>
            <a className="courseurl">
            
             <img src="/assets/images/pte-naati.png" className="w-100" />
              <div className="rt-course-desc my-4">
                <p className=" text-warning mt-1 fs-6 mb-0">PTE</p>
                <p className="fs-6 text-white mb-2">UNLIMITED -  2 MONTHS</p>

              <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src="/assets/images/academyprofile.png" className="img-fluid rounded-circle h-100" alt="Academy Profile" />
                      <div className="authordetail mx-1">
                        <p className="text-white mb-0">MALCOLM</p>
                        <p className="text-white mb-0">15k+ Enrolled</p>
                      </div>
                  </div>  
                <p className="text-white mb-0 courseprice">$99 <span className="text-white mb-0">$145</span></p>
               </div>
            </div>
            </a>
            </Link>
        </div>
      </SwiperSlide>

      <SwiperSlide >
        <div className="rt-course-box">
        <Link href="/" passHref>
            <a className="courseurl">
            
             <img src="/assets/images/pte-naati.png" className="w-100" />
              <div className="rt-course-desc my-4">
                <p className=" text-warning mt-1 fs-6 mb-0">NAATI</p>
                <p className="fs-6 text-white mb-2">UNLIMITED - 1 MONTHS</p>

              <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src="/assets/images/academyprofile.png" className="img-fluid rounded-circle h-100" alt="Academy Profile" />
                      <div className="authordetail mx-1">
                        <p className="text-white mb-0">MALCOLM</p>
                        <p className="text-white mb-0">9572+ Enrolled</p>
                      </div>
                  </div>  
                <p className="text-white mb-0 courseprice">$75 <span className="text-white mb-0">$130</span></p>
               </div>
            </div>
            </a>
            </Link>
        </div>
      </SwiperSlide>

      <SwiperSlide >
        <div className="rt-course-box">
        <Link href="/" passHref>
            <a className="courseurl">
            
             <img src="/assets/images/pte-naati.png" className="w-100" />
              <div className="rt-course-desc my-4">
                <p className=" text-warning mt-1 fs-6 mb-0">PTE</p>
                <p className="fs-6 text-white mb-2">UNLIMITED -  2 MONTHS</p>

              <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src="/assets/images/academyprofile.png" className="img-fluid rounded-circle h-100" alt="Academy Profile" />
                      <div className="authordetail mx-1">
                        <p className="text-white mb-0">MALCOLM</p>
                        <p className="text-white mb-0">15k+ Enrolled</p>
                      </div>
                  </div>  
                <p className="text-white mb-0 courseprice">$99 <span className="text-white mb-0">$145</span></p>
               </div>
            </div>
            </a>
            </Link>
        </div>
      </SwiperSlide>

      <SwiperSlide >
        <div className="rt-course-box">
            <a className="courseurl">
            
             <img src="/assets/images/pte-naati.png" className="w-100" />
              <div className="rt-course-desc my-4">
                <p className=" text-warning mt-1 fs-6 mb-0">PTE</p>
                <p className="fs-6 text-white mb-2">UNLIMITED -  2 MONTHS</p>

              <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src="/assets/images/academyprofile.png" className="img-fluid rounded-circle h-100" alt="Academy Profile" />
                      <div className="authordetail mx-1">
                        <p className="text-white mb-0">MALCOLM</p>
                        <p className="text-white mb-0">15k+ Enrolled</p>
                      </div>
                  </div>  
                <p className="text-white mb-0 courseprice">$99 <span className="text-white mb-0">$145</span></p>
               </div>
            </div>
            </a>
        </div>
      </SwiperSlide>
    </Swiper>

        <p className="fs-2 fw-normal mb-1 mt-4 text-center text-white">Learn from reels, just for you </p>
        <ReelSlider />

     <div className="explore pb-4">

        <p className="fs-2 fw-normal mb-3 mt-4 mx-3 text-white">Explore More Resources </p>

        <div className="explore-iconlist">
            <div className="d-flex my-4">
                <div className="iconbox" style={{background: "#056325"}}>
                  <img src="/assets/images/fd.svg" />
                </div>
                <div className="explore-description">
                <h6>Fundamental of Designing</h6>
                    <p>12 Lesson</p>
                </div>
            </div>

            <div className="d-flex my-4">
                <div className="iconbox" style={{background: "#C04152"}}>
                <img src="/assets/images/adt.svg" />
                </div>
                <div className="explore-description">
                    <h6>Fundamental of Designing</h6>
                    <p>12 Lesson</p>
                </div>
            </div>

            <div className="d-flex my-4">
                <div className="iconbox" style={{background: "#D4CCFC"}}>
                  <i className="fas fa-code"></i>
                </div>
                <div className="explore-description">
                <h6>Fundamental of Designing</h6>
                    <p>12 Lesson</p>
                </div>
            </div>
        </div>
    </div>
       </div>
   
    </Fragment>
  );
};

export default AcademyPage;
