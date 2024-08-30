import Head from "next/head";
import React, {Fragment } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Academyreels from "./academyreels";
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
        
        {/* <div className="mockmasterimage">
            <div className="couponcode">
                <p className="text-dark text-center d-block fs-5 fw-bold mb-0">your code : 210678</p>
                <Link href="/" ><button className="mockmaster_link">Start Your Free PTE Mock Test Now</button></Link>
            </div>
        </div> */}


        <div className="mockmasterimage">
          <div className="platform-heading">
            <h5 className="mb-1 mt-2 fw-700">Mock Master's Free</h5>
            <h2><span>PTE MOCK TEST</span></h2>
        </div>
            <div className="couponcode mt-3">
                <p className="text-dark text-center d-block fs-5 fw-bold mb-0">Your Code : 210678</p>
              <Link passHref href={"https://app.mockmaster.ai/user/signin"}><button className="mockmaster_link">Start Your Free PTE Mock Test Now</button></Link>
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
            <div className="courseurl"> 
             <img src="/assets/images/pte-naati.png" className="w-100" />
              <div className="rt-course-desc my-4">
                <p className=" text-warning mt-1 fs-6 mb-0 text-start">Portal + Video Course</p>
                <p className="fs-6 text-white text-start mb-3">Lifetime Portal Memebership Punjabi</p>

              <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src="/assets/images/academyprofile.png" className="img-fluid rounded-circle h-100" alt="Academy Profile" />
                      <div className="authordetail mx-1">
                        <p className="text-white mb-0">MALCOLM</p>
                        <p className="text-white mb-0">15k+ Enrolled</p>
                      </div>
                  </div>  
                <p className="text-white mb-0 courseprice">$448 <span className="text-white mb-0">$549</span></p>
               </div>
            </div>
            </div>
        </div>
      </SwiperSlide>

      <SwiperSlide >
        <div className="rt-course-box">
            <div className="courseurl">
            
             <img src="/assets/images/pte-naati.png" className="w-100" />
              <div className="rt-course-desc my-4">
                <p className=" text-warning mt-1 fs-6 text-start mb-0">Portal + Video Course</p>
                <p className="fs-6 text-white text-start mb-3">Lifetime Portal Memebership Punjabi</p>

              <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src="/assets/images/academyprofile.png" className="img-fluid rounded-circle h-100" alt="Academy Profile" />
                      <div className="authordetail mx-1">
                        <p className="text-white mb-0">MALCOLM</p>
                        <p className="text-white mb-0">9572+ Enrolled</p>
                      </div>
                  </div>  
                <p className="text-white mb-0 courseprice">$448 <span className="text-white mb-0">$549</span></p>
               </div>
            </div>
            </div>
        </div>
      </SwiperSlide>

      <SwiperSlide >
        <div className="rt-course-box">
            <div className="courseurl">
            
             <img src="/assets/images/pte-naati.png" className="w-100" />
              <div className="rt-course-desc my-4">
                <p className=" text-warning mt-1 text-start fs-6 mb-0">Portal + Video Course</p>
                <p className="fs-6 text-white text-start mb-3">1 Month Membership English</p>

              <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src="/assets/images/academyprofile.png" className="img-fluid rounded-circle h-100" alt="Academy Profile" />
                      <div className="authordetail mx-1">
                        <p className="text-white mb-0">MALCOLM</p>
                        <p className="text-white mb-0">15k+ Enrolled</p>
                      </div>
                  </div>  
                <p className="text-white mb-0 courseprice">$169 <span className="text-white mb-0">$299</span></p>
               </div>
            </div>
            </div>
        </div>
      </SwiperSlide>

      <SwiperSlide >
        <div className="rt-course-box">
            <div className="courseurl">
             <img src="/assets/images/pte-naati.png" className="w-100" />
              <div className="rt-course-desc my-4">
                <p className=" text-warning mt-1 text-start fs-6 mb-0">Portal + Video Course</p>
                <p className="fs-6 text-white text-start mb-3">1 Month Membership Punjabi</p>

              <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src="/assets/images/academyprofile.png" className="img-fluid rounded-circle h-100" alt="Academy Profile" />
                      <div className="authordetail mx-1">
                        <p className="text-white mb-0">MALCOLM</p>
                        <p className="text-white mb-0">15k+ Enrolled</p>
                      </div>
                  </div>  
                <p className="text-white mb-0 courseprice">$169 <span className="text-white mb-0">$299</span></p>
               </div>
            </div>
            </div>
        </div>
      </SwiperSlide>
    </Swiper>

        <p className="fs-2 fw-normal mb-1 mt-4 text-center text-white">Learn from reels, just for you </p>
        <Academyreels />

       </div>
   
    </Fragment>
  );
};

export default AcademyPage;
