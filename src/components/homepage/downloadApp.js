import { Button } from "react-bootstrap";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const DownloadApp = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div>
      <div className="download-app">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="download-app-wrap">
                <div
                  className="download-title"
                  data-aos="slide-right"
                  data-aos-duration="200"
                  data-aos-delay="100"
                >
                  <h2>Download our mobile app for iOS & Android Today!</h2>
                  <p>
                    ApplyKart - made in Australia for the world.
                    <span className="heart-emoji">&hearts;</span>
                  </p>
                </div>
                <div className="download-content">
                  <div className="download-store">
                    <div className="store-qr">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.applykart"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="play_store mb-2">
                          <img
                            src={"/assets/images/play_store.png"}
                            alt="play_store"
                          />
                        </div>
                        <div
                          className="qr-0 d-flex justify-content-center align-items-center"
                          data-aos="fade-up"
                          data-aos-offset="200"
                          data-aos-easing="ease"
                          data-aos-duration="300"
                          data-aos-delay="100"
                        >
                          <img
                            src={"/assets/images/android-qr-code.png"}
                            alt="app_store"
                          />
                          <span className="mt-1">For Android</span>
                        </div>
                      </a>
                    </div>
                    <div className="store-qr">
                      <a
                        href="https://apps.apple.com/us/app/applykart/id1638867413"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="app_store mb-2">
                          <img
                            src={"/assets/images/app_store.png"}
                            alt="app_store"
                          />
                        </div>

                        <div
                          className="qr-0 d-flex justify-content-center align-items-center"
                          data-aos="fade-up"
                          data-aos-offset="200"
                          data-aos-easing="ease"
                          data-aos-duration="400"
                          data-aos-delay="400"
                        >
                          <img
                            src={"/assets/images/ios-qr-code.png"}
                            alt="app_store"
                          />
                          <span className="mt-1">For iOS</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="iphone-banner">
                <img src={"/assets/images/download-app.png"} alt="download" />

                {/* <div
                  className="img-1"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease"
                  data-aos-duration="300"
                  data-aos-delay="400"
                >
                  <img src={"/assets/images/Home_ss.png"} alt="Home_ss" />
                </div>
                <div
                  className="img-2"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease"
                  data-aos-duration="500"
                  data-aos-delay="600"
                >
                  <img src={"/assets/images/Message_ss.png"} alt="Message_ss" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
