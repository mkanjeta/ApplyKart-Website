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
      <style>
        {`
     @import "https://unpkg.com/open-props" layer(design.system);

     @import "https://www.unpkg.com/layout-craft@0.1.1/dist/utilities.css"
       layer(design.utilities);
     /* 
     Source code of these utilities: 
     https://github.com/mobalti/layout-craft/blob/main/lib/utilities.css 
     */
     
     @layer base.normalize-overrides {
       :root {
         font-family: "Inter", sans-serif;
         --surface-1: black;
         --surface-2: oklch(0.19 0 0);
         --surface-3: #f1dadf;
         --text-1: white;
     
         --brand-1: oklch(0.65 0.24 16.93);
         --brand-2: oklch(0.77 0.1 90);
     
         
       }
     
       
     }
     
     @layer base.containers {
       main {
        
         color: var(--surface-1);
       }
       .Visual{position:sticky!important;}
       .Hero {
         @media (width >= 1024px) {
           grid-template-columns: 1.5fr 1fr;
           --_gap: var(--size-10);
         }
       }
     }
     
     @layer base.components {
       
       .Visual {
         & img {
           inline-size: 100%;
           block-size: 100%;
           object-fit: cover;
           object-position: center center;
     
           background: #00113a;
         }
         @media (width >= 1024px) {
           position: fixed;
           inline-size: 62%;
           block-size: calc(100dvb - var(--size-9));
           inset-block-start: var(--size-9);
           left:0;
     
           > * {
             grid-area: 1/1;
           }
     
           & img {
             border-radius: inherit;
           }
     
           & picture {
             max-inline-size: 600px;
             aspect-ratio: var(--ratio-square);
             border-radius: var(--radius-3);
           }
         }
     
         @media (1024px < width < 1440px) {
           & img {
             max-inline-size: 350px;
           }
         }
     
         @media (width < 1024px) {
           > * {
             min-block-size: calc(100dvb - var(--size-9));
           }
     
           picture {
             inline-size: 100%;
             block-size: 100%;
           }
         }
       }
     
       .Content {
         > * {
           min-block-size: calc(100dvb - var(--size-9));
         }
         & h3 {
           max-inline-size: 13ch;
           text-wrap: balance;
           font-size: 3.75rem;
           font-weight: var(--font-weight-7);
           line-height: var(--font-lineheight-0);
           padding-block-end: var(--size-4);
         }
     
         & p {
           max-inline-size: var(--size-content-2);
           font-size: var(--font-size-3);
         }
     
         .subhead {
           color: var(--brand-1);
           font-size: var(--font-size-6);
           font-weight: var(--font-weight-6);
           max-inline-size: var(--size-content-1);
           line-height: var(--font-lineheight-1);
           text-wrap: pretty;
         }
     
         @media (width < 1024px) {
           display: none;
         }
     
         @media (width < 1440px) {
           & h3 {
             font-size: var(--font-size-7);
           }
     
           .subhead {
             font-size: var(--font-size-5);
           }
         }
       }
     
       .SmallScreenContent {
         position: fixed;
         inset-inline: 0;
         inset-block-start: 0;
         min-block-size: var(--size-9);
         color: black;
     
         > * {
           grid-area: 1/1;
         }
     
         @media (width < 1024px) {
           background-color: black;
           > p {
             background-color: black;
             color: white;
             inline-size: 100%;
             text-align: center;
             padding: var(--size-2);
             font-weight: var(--font-weight-5);
     
             box-shadow: var(--shadow-1);
           }
         }
     
         @media (width >= 1024px) {
           display: none;
         }
       }
     }
     
     @supports (animation-timeline: scroll()) {
       @layer animation.ScrollDriven {
         @media (width >= 1024px) {
           body {
             timeline-scope: --first-lockup, --second-lockup, --third-lockup, --fourth-lockup, --fifth-lockup, --six-lockup;
           }
     
           picture {
             inline-size: 400px;
             transform-origin: bottom left;
     
             > img {
               box-shadow: var(--shadow-4);
             }
           }
     
           .FirstPic {
             > img {
               rotate: 8deg;
             }
           }
     
           .SecondPic {
             animation: auto slide-out-rotate linear both;
             animation-timeline: --fifth-lockup;
     
             > img {
               rotate: -5deg;
             }
           }
     
           .ThirdPic {
             animation: auto slide-out-rotate linear forwards;
             animation-timeline: --fourth-lockup;
     
             > img {
               rotate: 20deg;
             }
           }
           .FourthPic {
             animation: auto slide-out-rotate linear forwards;
             animation-timeline: --third-lockup;
     
             > img {
               rotate: 20deg;
             }
           }
           .FifthPic {
             animation: auto slide-out-rotate linear forwards;
             animation-timeline: --second-lockup;
     
             > img {
               rotate: 20deg;
             }
           }
           .SixPic {
             animation: auto slide-out-rotate linear forwards;
             animation-timeline: --first-lockup;
     
             > img {
               rotate: 20deg;
             }
           }
     
           .FirstLockup {
             view-timeline-name: --first-lockup;
           }
     
           .SecondLockup {
             view-timeline-name: --second-lockup;
           }
     
           .ThirdLockup {
             view-timeline-name: --third-lockup;
           }
           .FourthLockup {
             view-timeline-name: --fourth-lockup;
           }
           .FifthLockup {
             view-timeline-name: --fourth-lockup;
           }
           .SixLockup {
             view-timeline-name: --fourth-lockup;
           }
         }
       }
     
       @media (width >= 1440px) {
         .Visual picture {
           inline-size: 350px;
         }
       }
       @media (width >= 1600px) {
         .Visual picture {
           inline-size: 452px;
         }
       }
     
       @media (width < 1024px) {
         body {
           timeline-scope: --first-pic, --second-pic, --third-pic, --fourth-pic, --fifth-pic, --six-pic;
         }
     
         .SmallScreenContent {
           > p {
             animation: auto reveal linear both;
             animation-range: cover 45%;
           }
     
           .FirstStory {
             animation-timeline: --first-pic;
           }
     
           .SecondStory {
             visibility: hidden;
             animation-timeline: --second-pic;
           }
     
           .ThirdStory {
             visibility: hidden;
             animation-timeline: --third-pic;
           }
           .FourthStory {
             visibility: hidden;
             animation-timeline: --fourth-pic;
           }
           .FifthStory {
             visibility: hidden;
             animation-timeline: --fifth-pic;
           }
           .SixStory {
             visibility: hidden;
             animation-timeline: --six-pic;
           }
         }
     
         .FirstPic {
           view-timeline-name: --first-pic;
         }
     
         .SecondPic {
           view-timeline-name: --second-pic;
         }
     
         .ThirdPic {
           view-timeline-name: --third-pic;
         }
         .FourthPic {
           view-timeline-name: --fourth-pic;
         }
         .FifthPic {
           view-timeline-name: --fifth-pic;
         }
         .SixPic {
           view-timeline-name: --six-pic;
         }
       }
     
       .pagination {
         position: fixed;
         inset-block-end: var(--size-8);
         z-index: var(--layer-3);
     
         & a {
           --size: var(--size-3);
           block-size: var(--size);
           inline-size: var(--size);
           border: var(--border-size-1) solid var(--brand-1);
           border-radius: var(--radius-round);
     
           animation: highlight linear both;
     
           &:nth-child(1) {
             animation-timeline: --first-lockup;
           }
           &:nth-child(2) {
             animation-timeline: --second-lockup;
           }
           &:nth-child(3) {
             animation-timeline: --third-lockup;
           }
           &:nth-child(4) {
             animation-timeline: --fourth-lockup;
           }
           &:nth-child(5) {
             animation-timeline: --fifth-lockup;
           }
           &:nth-child(6) {
             animation-timeline: --six-lockup;
           }
         }
     
         @media (width < 1024px) {
           display: none;
         }
       }
     }
     
     @supports not (animation-timeline: scroll()) {
       .pagination {
         display: none;
       }
     }
     
     @keyframes slide-out-rotate {
       50%,
       100% {
         transform: translate(-50%, 50%) rotate(-50deg);
       }
     
       40%,
       100% {
         opacity: 0;
       }
     }
     
     @keyframes reveal {
       to {
         visibility: visible;
       }
     }
     
     @keyframes highlight {
       50% {
         background-color: hsl(347, 100%, 58%);
       }
     }
     
      `}
      </style>
      <div className="section1">
        <div className="container">
          <div
            className="text-center margin-bt"
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
            <main className="inline content-full">
              <section className="Hero inline gap-2">
                <div className="Wrapper block content-3">
                  <div className="Visual block-center-center">
                    <picture className="FirstPic">
                      <img
                        src="/assets/images/applykart_features/intro_video.svg"
                        alt=""
                      />
                    </picture>
                    <picture className="SecondPic">
                      <img
                        src="/assets/images/applykart_features/visiting_card.svg"
                        alt=""
                      />
                    </picture>
                    <picture className="ThirdPic">
                      <img
                        src="/assets/images/applykart_features/ai_based.svg"
                        alt=""
                      />
                    </picture>
                    <picture className="FourthPic">
                      <img
                        src="/assets/images/applykart_features/interview.svg"
                        alt=""
                      />
                    </picture>
                    <picture className="FifthPic">
                      <img
                        src="/assets/images/applykart_features/interview.svg"
                        alt=""
                      />
                    </picture>
                    <picture className="SixPic">
                      <img
                        src="/assets/images/applykart_features/interview.svg"
                        alt=""
                      />
                    </picture>
                  </div>
                </div>

                <div className="Content block">
                  <div
                    id="StoriesUnveiled"
                    className="FirstLockup block-center-start"
                  >
                    <div className="block gap-3">
                      <h3>Job/Candidate Search</h3>
                      <div className="subhead">AI-based Predictive</div>
                      <p>one liner content for better UI.</p>
                    </div>
                  </div>
                  <div
                    id="CelebratingLifeTogether"
                    className="SecondLockup block-center-start"
                  >
                    <div className="block gap-3">
                      <h3>Digital Visiting Cards</h3>
                      <div className="subhead">
                        Embrace the significance of Digital card.
                      </div>
                      <p>In every meeting, find the heartwarming stories.</p>
                    </div>
                  </div>
                  <div
                    id="TheArtofGiving"
                    className="ThirdLockup block-center-start"
                  >
                    <div className="block gap-3">
                      <h3>Intro Videos</h3>
                      <div className="subhead">
                        Explore the stories within each present.
                      </div>
                      <p>one line text will come here.</p>
                    </div>
                  </div>

                  <div
                    id="LiveInterview"
                    className="FourthLockup block-center-start"
                  >
                    <div className="block gap-3">
                      <h3>Live Interview</h3>
                      <div className="subhead">
                        Get the experience within each Hiring.
                      </div>
                      <p>one line text will come here.</p>
                    </div>
                  </div>
                  <div
                    id="referAJob"
                    className="FifthLockup block-center-start"
                  >
                    <div className="block gap-3">
                      <h3>Refer-A-Job</h3>
                      <div className="subhead">
                        Refer a job to anyone .
                      </div>
                      <p>one line text will come here.</p>
                    </div>
                  </div>
                  <div
                    id="LocationBased"
                    className="SixLockup block-center-start"
                  >
                    <div className="block gap-3">
                      <h3>Location Based</h3>
                      <div className="subhead">
                        Jobs/Hiring.
                      </div>
                      <p>one line text will come here.</p>
                    </div>
                  </div>
                </div>

                <div className="SmallScreenContent block-center-center">
                  <p className="FirstStory">The Art of Giving</p>
                  <p className="SecondStory">Celebrating Life Together</p>
                  <p className="ThirdStory">Stories Unveiled</p>
                  <p className="FourthStory">Live Interviews</p>
                  <p className="FifthStory">Refer-A-Job</p>
                  <p className="SixStory">Location-based Jobs/Hiring</p>
                </div>
              </section>

              {/* <div className="pagination block-center-center content-full">
        <div className="inline gap-3">
          <a href="#StoriesUnveiled"></a>
          <a href="#CelebratingLifeTogether"></a>
          <a href="#TheArtofGiving"></a>
        </div>
      </div> */}
            </main>
            
          </div>
          <div></div>
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
