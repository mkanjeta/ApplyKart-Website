import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import Typewriter from "typewriter-effect";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";

const AdvertisingJob = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const router = useRouter();

  const startRecruiting = () => {
    let isLoggedIn = localStorage.getItem("applyKart") ? true : false;
    if (isLoggedIn) {
      router?.push("/dashboard");
    } else {
      router?.push("/login");
    }
  };
  
  return (
    <div>
      <div className="advertising">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="ad-round">
                <span className="circle-1">
                  <img src={"/assets/images/Ellipse 18.svg"} alt="Ellipse" />
                </span>
                <span className="circle-2">
                  <img src={"/assets/images/Ellipse 17.svg"} alt="Ellipse" />
                </span>
                <span className="circle-3">
                  <img src={"/assets/images/Ellipse 16.svg"} alt="Ellipse" />
                </span>
                <span className="circle-4">
                  <img src={"/assets/images/Ellipse 16.svg"} alt="Ellipse" />
                </span>
                <span className="circle-5">
                  <img src={"/assets/images/online.svg"} alt="Ellipse" />
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="ad-title"
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-easing="ease"
                data-aos-duration="600"
                data-aos-delay="200"
              >
                <>
                  Finding
                  <span className="animate">
                    <strong>
                      <Typewriter
                        options={{
                          strings: ["the best talent"],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </strong>
                  </span>
                  for your business was never so easy !
                </>
                <h2>
                  With Christmas and summer round the corner, make sure you get
                  the best staff in time for the holiday season!
                </h2>
                <>
                  And did we tell you it's
                  <span className="animate">
                    <strong>
                      <Typewriter
                        options={{
                          strings: ["FREE"],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </strong>
                  </span>
                  ?
                </>
                <p style={{ fontSize: "14px" }}>
                  That's right! Whether you're a business owner or a recruiter,
                  you'll LOVE ApplyKart.
                </p>
                <Button className="btn btn-warning" onClick={startRecruiting}>
                  Start Recruiting
                  <span className="ps-3 btn-right-arrow">
                    <img
                      src={"/assets/images/right-arrow.svg"}
                      alt="right-arrow"
                    />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingJob;
