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
                  <h2>Intro Videos</h2>
                  <h5>Explore the stories within each present.</h5>
                  <p className="card-text">
                  one line text will come here.
                  </p>

                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/intro_video.svg"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>


            <li className="card" id="card-2">
              <div className="card-content">
                <div>
                  <h2>Digital Visiting Cards</h2>
                  <h5>Embrace the significance of Digital card.</h5>
                  <p className="card-text">
                  In every meeting, find the heartwarming stories.
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/visiting_card.svg"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>

            <li className="card" id="card-3">
              <div className="card-content">
                <div>
                  <h2>Job/Candidate Search</h2>
                  <h5>AI-based Predictive</h5>
                  <p className="card-text">
                  one liner content for better UI.
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                   
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/ai_based.svg"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-4">
              <div className="card-content">
                <div>
                  <h2>Live Interview</h2>
                  <h5>Get the experience within each Hiring.</h5>
                 
                  <p className="card-text">
                  one line text will come here.
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/interview.svg "}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-5">
              <div className="card-content">
                <div>
                  <h2>Location Based</h2>
                  <h5>Jobs/Hiring</h5>
                  <p className="card-text">
                  one line text will come here.   
                  </p>
                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                   
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/job_location.svg"}
                    alt="user"
                  />
                </figure>
              </div>
            </li>
            <li className="card" id="card-6">
              <div className="card-content">
                <div>
                  <h2>Refer-A-Job</h2>
                  <h5>Refer a job to anyone</h5>
                  <p className="card-text">
                  one line text will come here.
                  </p>

                  <div className="d-flex slider-btn">
                    {/* <Button href="#" className="btn1">
                  $2K-$3K
                </Button> */}
                  
                  </div>
                </div>
                <figure>
                  <img
                    src={"/assets/images/applykart_features/refer_job.svg"}
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
