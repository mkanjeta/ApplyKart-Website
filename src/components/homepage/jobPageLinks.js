import { Button } from "react-bootstrap";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const JobPageLinks = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div>
      <div className="job-page-links">
        <div className="container">
          <div className="row">
            {/* <div className="col-md-6">
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
              </div>
            </div> */}
            <div className="px-3 py-2 d-flex flex-column">
              <h4 className="fs-6 fw-600 text-white">Jobs by Location:</h4>
              <div className="d-flex justify-content-between mt-3">
                <div className="col-md-4">
                  <ul className="flink">
                    <li>
                      <a href="/jobs/jobs-in-brisbane" target="_blank">Brisbane</a>
                    </li>
                    <li>
                      <a href="/jobs/jobs-in-melbourne" target="_blank">Melbourne</a>
                    </li>
                    <li>
                      <a href="/jobs/jobs-in-perth" target="_blank">Perth</a>
                    </li>
                    <li>
                      <a href="/jobs/jobs-in-adelaide" target="_blank">Adelaide</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul className="flink">
                    <li>
                      <a href="/jobs/jobs-in-canberra" target="_blank">Canberra</a>
                    </li>
                    <li>
                      <a href="/jobs/best-jobs-in-sydney" target="_blank">Sydney</a>
                    </li>
                    <li>
                      <a href="/jobs/Best-jobs-in-newcastle" target="_blank">Newcastle</a>
                    </li>
                    <li>
                      <a href="/jobs/best-jobs-in-goldcoast" target="_blank">Gold coast</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul className="flink">
                    <li>
                      <a href="/jobs/best-jobs-in-hobart" target="_blank">Hobart</a>
                    </li>
                    <li>
                      <a href="/jobs/best-jobs-in-darwin" target="_blank">Darwin</a>
                    </li>
                    <li>
                      <a href="/jobs/Best-jobs-in-Surry-Hills" target="_blank">Surry Hills</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="px-3 py-2 d-flex flex-column">
              <h4 className="fs-6 fw-600 text-white">Jobs by Category:</h4>
              <div className="d-flex justify-content-between mt-3">
                <div className="col-md-4">
                  <ul className="flink">
                    <li>
                      <a href="/jobs/Claims-Management-Officer-jobs-in-Australia-ApplyKart" target="_blank">Claims Management Officer</a>
                    </li>
                    <li>
                      <a href="/jobs/Plumber-Pipe-Fitter-jobs-in-Australia-ApplyKart" target="_blank">Plumber / Pipe Fitter</a>
                    </li>
                    <li>
                      <a href="/Pest-Technician-jobs-in-Australia-ApplyKart" target="_blank">Pest Technician</a>
                    </li>
                    <li>
                      <a href="/jobs/Logistic-Driver-jobs-in-Australia-ApplyKart" target="_blank">Logistic Driver</a>
                    </li>
                    <li>
                      <a href="/jobs/Apprentice-Hairdresser" target="_blank">Apprentice Hairdresser</a>
                    </li>
                    <li>
                      <a href="/jobs/Mortgage-Lender" target="_blank">Mortgage lender</a>
                    </li>
                    <li>
                      <a href="/jobs/Fibre-Composite-Technician" target="_blank">Fibre composite technician</a>
                    </li>
                    <li>
                      <a href="/jobs/Real-estate-agent" target="_blank">Real estate agent</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul className="flink">
                    <li>
                      <a href="/jobs/Business-Broker-jobs-in-Australia-ApplyKart" target="_blank">Business Broker</a>
                    </li>
                    <li>
                      <a href="/jobs/Entry-Level-Drillers-Offsiders-Surface-Underground-jobs-in-Australia-ApplyKart" target="_blank">Entry Level Drillers Offsiders - Surface & Underground</a>
                    </li>
                    <li>
                      <a href="/jobs/Parts-Interpreter-jobs-in-Australia-ApplyKart" target="_blank">Parts Interpreter</a>
                    </li>
                    <li>
                      <a href="/jobs/Heritage-Architect-Built-Heritage-Consultant-jobs-in-Australia-ApplyKart" target="_blank">Heritage Architect / Built Heritage Consultant</a>
                    </li>
                    <li>
                      <a href="/jobs/Print-Operator" target="_blank">Print Operator</a>
                    </li>
                    <li>
                      <a href="/jobs/best-nurse- jobs-in-Australia-Applykart" target="_blank">Nurse</a>
                    </li>
                    <li>
                      <a href="/jobs/Dewatering-Supervisor" target="_blank">Dewatering Supervisor</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul className="flink">
                    <li>
                      <a href="/jobs/Electrical-project-engineer-jobs-in-Australia-ApplyKart" target="_blank">Electrical project engineer</a>
                    </li>
                    <li>
                      <a href="/jobs/Leading-head-carpenter-jobs-in-Australia-ApplyKart" target="_blank">Leading head carpenter</a>
                    </li>
                    <li>
                      <a href="/jobs/Content-writer-for-kids-baby-brands" target="_blank">Content writer for kids/baby brands</a>
                    </li>
                    <li>
                      <a href="/jobs/Disability-support-worker-Jobs-in-Australia" target="_blank">Disability support worker</a>
                    </li>
                    <li>
                      <a href="/jobs/Travel-Consultant-Tour-Cruise-Specialist" target="_blank">Travel Consultant: Tour + Cruise Specialist</a>
                    </li>
                    <li>
                      <a href="/jobs/Bar-supervisor" target="_blank">Bar supervisor</a>
                    </li>
                    <li>
                      <a href="/jobs/Environmental-Scientist" target="_blank">Environmental Scientist</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPageLinks;