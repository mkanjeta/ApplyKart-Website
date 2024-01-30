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
    
      <div className="section1">
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
          <div className="applykart-features">
            <div className="scroll-reveal-section">
              <div className="item">
                <div className="image-holder">
                  <img
                    src="/assets/images/applykart_features/intro_video.svg"
                    alt=""
                  />
                </div>

                <div className="text-holder">
                  <div className="block gap-3">
                    <h3>Intro Videos</h3>
                    <div className="subhead">
                      Explore the stories within each present.
                    </div>
                    <p>one line text will come here.</p>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="image-holder">
                  <img
                    src="/assets/images/applykart_features/visiting_card.svg"
                    alt=""
                  />
                </div>

                <div className="text-holder">
                  <div className="block gap-3">
                    <h3>Digital Visiting Cards</h3>
                    <div className="subhead">
                      Embrace the significance of Digital card.
                    </div>
                    <p>In every meeting, find the heartwarming stories.</p>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="image-holder">
                  <img
                    src="/assets/images/applykart_features/ai_based.svg"
                    alt=""
                  />
                </div>

                <div className="text-holder">
                  <div className="block gap-3">
                    <h3>Job/Candidate Search</h3>
                    <div className="subhead">AI-based Predictive</div>
                    <p>one liner content for better UI.</p>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="image-holder">
                  <img
                    src="/assets/images/applykart_features/interview.svg"
                    alt=""
                  />
                </div>

                <div className="text-holder">
                  <div className="block gap-3">
                    <h3>Live Interview</h3>
                    <div className="subhead">
                      Get the experience within each Hiring.
                    </div>
                    <p>one line text will come here.</p>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="image-holder">
                  <img
                    src="/assets/images/applykart_features/job_location.svg"
                    alt=""
                  />
                </div>

                <div className="text-holder">
                  <div className="block gap-3">
                    <h3>Location Based</h3>
                    <div className="subhead">Jobs/Hiring.</div>
                    <p>one line text will come here.</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="image-holder">
                  <img
                    src="/assets/images/applykart_features/refer_job.svg"
                    alt=""
                  />
                </div>

                <div className="text-holder">
                  <div className="block gap-3">
                    <h3>Refer-A-Job</h3>
                    <div className="subhead">Refer a job to anyone .</div>
                    <p>one line text will come here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
