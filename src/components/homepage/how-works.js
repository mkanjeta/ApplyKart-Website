import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import Typewriter from "typewriter-effect";
import AOS from "aos";
import "aos/dist/aos.css";

const HowItWork = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      className="section4"
      data-aos="fade-up"
      data-aos-easing="ease-in-shine"
      data-aos-duration="600"
      data-aos-delay="200"
    >
      <div className="container">
        <div className="text-center locate-your-map-txt">
          <h2 className="">
            Locate your Job by
            <span className="animate">
              <strong>
                {" "}
                <Typewriter
                  options={{
                    strings: ["Location"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </strong>
            </span>
          </h2>
          <p className="para">
            See the job location on a live map and get real-time ETA. Don't
            guess. Be sure.
          </p>
        </div>
      </div>
      <div className="world-map-section">
        <div className="world-map-content">
          <video width="100%" height="100%" muted autoPlay loop playsInline>
            <source src={"/assets/videos/dotted-line.mp4"} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
