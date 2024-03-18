import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const AppFooter = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div>
      <div className="app-footer">
        <div className="footer-content">
          <div className="footer-images">
            <img src={"/assets/images/app-footer.png"} alt="footer-img" />
          </div>
          <div className="row justify-content-between bottom-border">
            <div className="col-md-5">
              <div className="flink-logo">
                <a
                  href="#"
                  className="footer-logo"
                  data-aos="fade-right"
                  data-aos-easing="ease"
                  data-aos-duration="100"
                  data-aos-delay="100"
                >
                  <img src={"/assets/images/white-logo.svg"} alt="applykart" />
                </a>
                <p className="get-hired">Hire and get hired within 2 hours!</p>
                <a href="mailto:support@applykart.co" className="support">
                  support@applykart.co
                </a>
              </div>
            </div>
            <div className="col-md-7 p-0">
              <div className="row">
                <div className="col-md-4">
                  <ul className="flink">
                    <li>
                      <h4>For Candidate</h4>
                    </li>
                    <li>
                      <a href="#">Browse Jobs</a>
                    </li>
                    <li>
                      <a href="#">Register Now</a>
                    </li>
                    <li>
                      <a href="#">All Jobs</a>
                    </li>
                    <li>
                      <a href="#">Login</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul className="flink">
                    <li>
                      <h4>For Job Poster</h4>
                    </li>
                    <li>
                      <a href="#">Post Jobs</a>
                    </li>
                    <li>
                      <a href="#">Browse Candidates</a>
                    </li>
                    <li>
                      <a href="#">Job Poster Dashboard</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul className="flink">
                    <li>
                      <h4>Information</h4>
                    </li>
                    <li>
                      <Link href="/terms">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link href="/privacy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <a href="#">FAQs</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="copyright">
            <div className="c-left">
              <p>Copyright © 2024 Applykart. All Rights Reserved.</p>
            </div>
            <div className="c-right">
              <ul className="social-icon">
                <li>Follow us on</li>
                <li>
                  <a
                    href="https://www.facebook.com/Applykart"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={"/assets/images/footer-icon/facebook.svg"}
                      alt="facebook"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/APPLYKART"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={"/assets/images/footer-icon/twitter.svg"}
                      alt="twitter"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/applykart/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={"/assets/images/footer-icon/instagram.svg"}
                      alt="instagram"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
