import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import Typewriter from "typewriter-effect";
import AOS from "aos";
import "aos/dist/aos.css";


const Faqs = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();

    const accordionItemHeaders = document.querySelectorAll(".accordion-title");
    accordionItemHeaders.forEach((accordionItemHeader) => {
      accordionItemHeader.addEventListener("click", (event) => {
        const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-title.active");
        if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
          currentlyActiveAccordionItemHeader.classList.toggle("active");
          currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
        }
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains("active")) {
          accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        } else {
          accordionItemBody.style.maxHeight = 0;
        }
      });
    });
  }, []);

  return (
    <div
      className="section4 py-4"
      data-aos="fade-up"
      data-aos-easing="ease-in-shine"
      data-aos-duration="600"
      data-aos-delay="200"
    >
      <div className="container">
        <div className="text-center locate-your-map-txt">
          <h2 className="">
            FAQ
            <span className="animate">
              <strong>
                <Typewriter
                  options={{
                    strings: ["s"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </strong>
            </span>
          </h2>
          <p className="para">
            Still have a doubt? Please find your answer below
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
          
        <div className="accordion">
          <div className="accordion-item">
            <div className="accordion-title">
              <h3>Q.  How does ApplyKart help with job search?</h3><svg width="20px" height="20px" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-.7 10.54L5.75 9l1.41-1.41L10 10.4l2.83-2.82L14.24 9 10 13.24l-.7-.7z" /></svg>
            </div>
            <div className="accordion-item-body">
              <div className="tab-content">
                ApplyKart helps with job search by allowing users to search for jobs by location and category, and by providing features such as AI Predictive Search and Live Interviews.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-title">
              <h3> Q. What are the different features offered by ApplyKart?</h3><svg width="20px" height="20px" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-.7 10.54L5.75 9l1.41-1.41L10 10.4l2.83-2.82L14.24 9 10 13.24l-.7-.7z" /></svg>
            </div>
            <div className="accordion-item-body">
              <div className="tab-content">
                ApplyKart offers a variety of features to both job seekers and employers, including AI job search, digital visiting cards, live interviews, and more. </div>
            </div>
          </div>

          <div className="accordion-item">
            <div className="accordion-title">
              <h3> Q. What are the benefits of using ApplyKart for job search?</h3><svg width="20px" height="20px" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-.7 10.54L5.75 9l1.41-1.41L10 10.4l2.83-2.82L14.24 9 10 13.24l-.7-.7z" /></svg>
            </div>
            <div className="accordion-item-body">
              <div className="tab-content">
                ApplyKart helps users find jobs and get hired in 2 hours. It also lists features such as AI Predictive Search to find jobs that fit the user's profile, Digital Visiting Cards to showcase the user's talent to potential employers, and Live Interviews to connect with employers instantly.</div>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <div className="accordion-title">
            <h3> Q. Is ApplyKart a free platform?</h3><svg width="20px" height="20px" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-.7 10.54L5.75 9l1.41-1.41L10 10.4l2.83-2.82L14.24 9 10 13.24l-.7-.7z" /></svg>
          </div>
          <div className="accordion-item-body">
            <div className="tab-content">
              Using ApplyKart to search for jobs is free. However, there are premium features or services that require payment. </div>
          </div>
        </div>

        <div className="accordion-item">
          <div className="accordion-title">
            <h3> Q. What payment methods are accepted on ApplyKart?</h3><svg width="20px" height="20px" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-.7 10.54L5.75 9l1.41-1.41L10 10.4l2.83-2.82L14.24 9 10 13.24l-.7-.7z" /></svg>
          </div>
          <div className="accordion-item-body">
            <div className="tab-content">
              ApplyKart accepts major credit cards, debit cards, and popular online payment platforms like PayPal and Stripe.</div>
          </div>
        </div>

        <div className="accordion-item">
          <div className="accordion-title">
            <h3> Q. Is my personal information secure on ApplyKart?</h3><svg width="20px" height="20px" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-.7 10.54L5.75 9l1.41-1.41L10 10.4l2.83-2.82L14.24 9 10 13.24l-.7-.7z" /></svg>
          </div>
          <div className="accordion-item-body">
            <div className="tab-content">
              Yes, ApplyKart employs industry-standard encryption and security measures to protect your personal information and ensure confidentiality. </div>
          </div>
        </div>

        <div className="accordion-item">
          <div className="accordion-title">
            <h3> Q. How long does it typically take for applications to be processed on ApplyKart?</h3><svg width="20px" height="20px" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-.7 10.54L5.75 9l1.41-1.41L10 10.4l2.83-2.82L14.24 9 10 13.24l-.7-.7z" /></svg>
          </div>
          <div className="accordion-item-body">
            <div className="tab-content">
              Application processing times vary depending on the service or product. However, most applications are processed within 2-5 business days.</div>
          </div>
        </div>
      </div>
  
      </div>
        </div>


    </div>
  );
};

export default Faqs;
