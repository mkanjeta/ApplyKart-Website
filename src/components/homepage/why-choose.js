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
                  <h2>AI Predictive Search</h2>
                  
                  <p className="card-text">
                  Unlock your career potential with intelligent search, where jobs find you.
                  </p>

                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
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
                  <h2>Digital Visiting Cards</h2>
                  <p className="card-text">
                  Make your mark in the digital realm – your career on a QR.
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
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
                  <h2>Live Interviews</h2>
                  <p className="card-text">
                  Connect instantly, interview seamlessly
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
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
                <figure>
                  <img
                    src={"/assets/images/applykart_features/4.png"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-4">
              <div className="card-content">
                <div>
                  <h2>Refer-A-Job</h2>
                  <p className="card-text">
                  Turn connections into opportunities with a single click.
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                   
                  </div>
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
                <figure>
                  <img
                    src={"/assets/images/applykart_features/5.png"}
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
        {/* <div className="section-company">
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
             
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default WhyChoose;
