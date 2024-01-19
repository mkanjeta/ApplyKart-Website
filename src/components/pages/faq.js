import { Fragment } from "react";
import { useState } from "react";
import Header from "components/shared/header";
import Footer from "components/shared/footer";
import Head from "next/head";
import { Row } from "react-bootstrap";

const FAQPage = () => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => {
    setIsShowing(!isShowing);
  };
  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header
        styleClass="style_two"
        logoUrl="assets/images/white-logo.svg"
        hideButtons={1}
      />
      {/* Content Box */}
      <div className="faq-content-wrapper">
        <div className="container">
          <div className="faq-topbar mx-2">
            <h4 className="text-center my-3 faq-text">FAQ's</h4>
            <h3 className="text-center faq-ask-que">
              Frequently asked questions
            </h3>
            <p className="text-center faq-question-text my-3">
              Have questions? we're to help
            </p>
          </div>
          <div className="mx-2">
            <div className="accordion-container my-3">
              <div
                className="faq-accordion-title d-flex justify-content-between align-items-center"
                onClick={toggle}
              >
                <h6 className="mb-0">What is Lorem Ipsum?</h6>
                <span className="faq-accordion"></span>
              </div>
              <div
                className="accordion-content"
                style={{
                  display: isShowing ? "none" : "block",
                }}
              >
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
            <div className="accordion-container my-3">
              <div className="faq-accordion-title d-flex justify-content-between align-items-center">
                <h6 className="mb-0">What is Lorem Ipsum?</h6>
                <span className="faq-accordion"></span>
              </div>
              <div
                className="accordion-content"
                style={{
                  display: "none",
                }}
              >
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
            <div className="accordion-container my-3">
              <div className="faq-accordion-title d-flex justify-content-between align-items-center">
                <h6 className="mb-0">What is Lorem Ipsum?</h6>
                <span className="faq-accordion"></span>
              </div>
              <div
                className="accordion-content"
                style={{
                  display: "none",
                }}
              >
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
            <div className="accordion-container my-3">
              <div className="faq-accordion-title d-flex justify-content-between align-items-center">
                <h6 className="mb-0">What is Lorem Ipsum?</h6>
                <span className="faq-accordion"></span>
              </div>
              <div
                className="accordion-content"
                style={{
                  display: "none",
                }}
              >
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Box */}

      {/* <Banner/> */}
      {/* <Footer /> */}
    </Fragment>
  );
};

export default FAQPage;
