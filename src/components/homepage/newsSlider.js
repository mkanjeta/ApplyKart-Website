import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import Typewriter from "typewriter-effect";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function NewsSlider({ items }) {
  const scrollContainerRef = useRef(null);
  const [scroll, setScroll] = useState(0);

  function scrollUl() {
    setTimeout(() => {
      if (scrollContainerRef?.current?.scrollWidth) {
        console.log(scrollContainerRef?.current?.scrollIntoView);

        setScroll(scroll + 10);
        scrollContainerRef.current.scrollIntoView({
          //   behaviour: "smooth",
          //   top: scroll,
        });
        // scrollContainerRef?.current?.scrollWidth =scrollContainerRef?.current?.scrollWidth+10;
      }
      scrollUl();
    }, 3000);
  }

  useEffect(() => {
    scrollUl();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 20,
    autoplay: true,
    arrows: false,
    speed: 90000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 20,
          infinite: true,
          dots: true,
          speed: 90000,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          speed: 5000,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 3000,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  return (
    <>
      <div className="newsslider">
        <div className="newsparent">
          <div className="newscoverage">
            <h6>News Coverage</h6>
          </div>
        </div>
      </div>
      <Slider {...settings} className="news-timeline-slick">
        {items.map((slide, key) => {
          return (
            <div key={key}>
              <div>
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                >
                  <img src={slide.image} className="newsimgs" />
                </a>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
}

export default NewsSlider;
