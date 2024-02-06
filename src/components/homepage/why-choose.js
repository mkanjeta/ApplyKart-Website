import { Container, Row, Col } from "react-bootstrap";
import CountUp, { useCountUp } from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import Typewriter from "typewriter-effect";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChoose = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
    
      <div className="section2">
        <div className="container">
          <div
            className="text-center margin-bt md-sticky"
            data-aos="fade-up"
            data-aos-easing="ease"
            data-aos-duration="100"
            data-aos-delay="100"
          >
            <h1 className="section1-heading">
              Why Choose ApplyKart for
              <span className="animate">
                <strong>
                  <Typewriter
                    options={{
                      strings: ["Your Next JOB?"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </strong>
              </span>
            </h1>
            <p className="para">
              We have industry-first features which will make you fall in love
              with us!
            </p>
          </div>
         {/* reeshabh code starts */}


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
                  <h2>AI-based Predictive Job/Candidate Search:</h2>
                  <h5>Unlock your career potential with intelligent search, where jobs find you.</h5>
                  <p className="card-text">
                  Let the future guide your career path with our AI-driven search, ensuring the perfect match between jobs and candidates effortlessly.
                  </p>

                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
                </div>
                
                <figure>
                  <img
                    src={"/assets/images/applykart_features/1.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>


            <li className="card" id="card-2">
              <div className="card-content">
                <div>
                  <h2>Digital Visiting Cards:</h2>
                  <h5>Make your mark in the digital realm – your career on a QR.</h5>
                  <p className="card-text">
                  Forge a memorable digital identity – encapsulate your professional essence in a card, leaving a lasting impression in the virtual world.
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/2.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>

            <li className="card" id="card-3">
              <div className="card-content">
                <div>
                  <h2>Intro Videos:</h2>
                  <h5>Bring your resume to life</h5>
                  <p className="card-text">
                  Elevate your application by adding a personal touch – showcase your skills and personality through engaging intro videos, making recruiters notice you beyond the resume.
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                   
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/3.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-4">
              <div className="card-content">
                <div>
                  <h2>Live Interviews:</h2>
                  <h5>Connect instantly, interview seamlessly</h5>
                 
                  <p className="card-text">
                  Bridge the gap between distances and time zones – experience real-time interviews from anywhere, making the hiring process more accessible and efficient.
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/4.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-5">
              <div className="card-content">
                <div>
                  <h2>Refer-A-Job:</h2>
                  <h5>Turn connections into opportunities with a single click.</h5>
                  <p className="card-text">
                  Empower your network with a click – effortlessly refer and share job opportunities, turning connections into valuable career paths.
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                   
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/5.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-6">
              <div className="card-content">
                <div>
                  <h2>Location-based Jobs/Hiring:</h2>
                  <h5>The perfect job right where you want it.</h5>
                  <p className="card-text">
                  Customize your job search based on location preferences, ensuring that your next career move aligns perfectly with your lifestyle and aspirations.
                  </p>

                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/6.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
          </ul>
        </main>
      </div>
      <div className="card-bg d-flex justify-content-center align-items-end"></div>


         {/* reeshabh code ends */}
        </div>
        <div className="section-company">
          <div className="brand-icon-img">
            <img src="/assets/images/company-icon.png" alt="brand-icon" />
          </div>
          <div className="container">
            <div className="top-company">
              <div
                className="tp-left"
                data-aos="fade-right"
                data-aos-duration="200"
                data-aos-delay="100"
              >
                <h2>
                  Work with{" "}
                  <span className="animate">
                    <Typewriter
                      options={{
                        strings: ["best-in-industry"],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </span>{" "}
                  <br /> businesses!
                </h2>
                <p>
                  Do what you love. Love what you do.{" "}
                  <span className="heart-emoji">&hearts;</span>
                </p>
                <div className="search-job-btn">
                  <button className="btn btn-warning search-btn">
                    Get Started
                    <span className="ps-2 btn-right-arrow">
                      <img
                        src={"/assets/images/right-arrow.svg"}
                        alt="right-arrow"
                      />
                    </span>
                  </button>
                </div>
              </div>
              {/* <div
              className="tp-right"
              data-aos="fade-left"
              data-aos-offset="200"
              data-aos-easing="ease"
              data-aos-duration="600"
            >
              <img src={"/assets/images/brands-logo.png"} alt="brands" />
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChoose;
