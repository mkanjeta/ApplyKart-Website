import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";
import Swal from "sweetalert2";
import Autocomplete from "react-google-autocomplete";
import { useDispatch } from "react-redux";
import { getJobBrowseList } from "redux/actions/jobBrowse";
import jobTitles from "../../../public/assets/titles.json";
import _ from "lodash";
import Tooltip from '@mui/material/Tooltip';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Banner = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(() =>
    router.query.location ? router.query.location : ""
  );

  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const handleSearch = (e) => {
    e.preventDefault();
    let obj = {
      search: search,
      WorkLocation: location,
    };
    window.location.href = `/dashboard?search=${search}&location=${location}`;
  };

  useEffect(() => {


    function updatelivecounter() {
      const livecounter = document.getElementById("livecounter");
      const randomNumber = Math.floor(Math.random() * (20001 - 15000) + 20000);
      if(livecounter)livecounter.innerHTML = randomNumber + ' LIVE NOW';
  }

  updatelivecounter();
  setTimeout(updatelivecounter, 10000);
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear" ,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="banner banner-bg">
      <div className="container">
        <div className="banner-content">

       

          <Row className=" justify-content-center">
            <Col lg={6}>
              
              <div className="d-flex flex-column hero-section">
              <div className="counterlivediv d-flex align-items-center">
              <svg width="20" height="20">
            <circle fill="#ff0000" stroke="none" cx="10" cy="10" r="10">
              <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"></animate>
            </circle>
          </svg> <div id="livecounter" className="livecounter"></div>
          </div>


                <div className="banner-text-center">
                  <h1 className="banner-heading">
                    <strong>All in one </strong> professional{" "}
                    <span className="animate">
                      <Typewriter
                        options={{
                          strings: ["AI driven "],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </span>
                    <br className="line-break" /> networking{" "}
                    <span className="animate">
                      <Typewriter
                        options={{
                          strings: [" platform "],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </span>
                  </h1>
                </div>
                <form onSubmit={handleSearch}>
                  <div className="search-job-w activeusers">
                    <div
                      className="job-title1"  id="jobtitle1"
                    >
                      <span className="job-search-icons">
                        <img
                          src={"/assets/images/icon-search.svg"}
                          alt="search"
                        />
                      </span>
                      <input
                        type="text"
                        className="banner-searchbar"
                        placeholder="Search Jobs By Title"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        onFocus={()=>{document.getElementById('jobtitle2').style = 'display:block'}}
                        onBlur={()=>{document.getElementById('jobtitle2').style = 'display:none'}}
                      />
                    </div>

                      <div className="job-title2" id="jobtitle2">
                        <span className="job-location-icons">
                          <img
                            src={"/assets/images/icon-map.svg"}
                            alt="map"
                          />
                        </span>
                        <Autocomplete
                          apiKey={apiKey}
                          options={{
                            types: ["establishment", "geocode"],
                            fields: ["formatted_address", "geometry", "name"],
                          }}
                          onPlaceSelected={(place) => {
                            setLocation(place?.formatted_address);
                          }}
                          name="Work Location"
                          className="form-control"
                        />
                      </div>
                   
                    <button className="btn btn-warning search-btn">
                      Search Job
                      <span className="ps-2 btn-right-arrow">
                        <img
                          src={"/assets/images/right-arrow.svg"}
                          alt="right-arrow"
                        />
                      </span>
                    </button>
                  </div>
                </form>

              </div>      
            </Col>

            <Col lg={6} md={8}>
              <div className="banner-iphone mb-2">
                <div className="home-iphone">
                  <img src="/assets/images/homepage.png" className="bannergif" />
                  <img
                    src={"/assets/images/home-circle-img.png"}
                    className="banner-bg-circle"
                    alt="bg-circle"
                  />
                </div>
              </div>
            </Col>

            <div className="image-slider-container">
      <Slider {...settings}>
        <div>
          <div className="divimgbox">
            <img src="/assets/images/nikhil.jpg" />
            <p>Nikhil got job 3 hours ago</p>
          </div>
        </div>
        <div>
          <div className="divimgbox">
            <img src="/assets/images/stella.jpg" />
            <p>Stella uploaded a reel</p>
          </div>
        </div>

        <div>
          <div className="divimgbox">
             <img src="/assets/images/priya.jpg" />
            <p>Priya got job 4 hours ago</p>
          </div>
        </div>


        <div>
          <div className="divimgbox">
            <img src="/assets/images/chandrajeet.jpg" />
            <p>Chandrajeet has fixed an interview</p>
          </div>
        </div>

        <div>
          <div className="divimgbox">
             <img src="/assets/images/jennie.jpg" />
            <p>Jennie has fixed an interview</p>
          </div>
        </div>


        <div>
          <div className="divimgbox">
            <img src="/assets/images/han.jpg" />
            <p>Han viewed a profile</p>
          </div>
        </div>

        <div>
          <div className="divimgbox">
             <img src="/assets/images/melissa.jpg" />
            <p>Melissa uploaded a reel</p>
          </div>
        </div>


        <div>
          <div className="divimgbox">
            <img src="/assets/images/dinesh.jpg" />
            <p>Dinesh has fixed an interview</p>
          </div>
        </div>

        
        <div>
          <div className="divimgbox">
             <img src="/assets/images/kristina.jpg" />
            <p>Kristina got job 9 hours ago</p>
          </div>
        </div>

        <div>
          <div className="divimgbox">
            <img src="/assets/images/abhijeet.jpg" />
            <p>Abhijeet got job 7 hours ago</p>
          </div>
        </div>
       

        <div>
          <div className="divimgbox">
             <img src="/assets/images/jack.jpg" />
            <p>Jack has fixed an interview</p>
          </div>
        </div>
   

        <div>
          <div className="divimgbox">
             <img src="/assets/images/stephnie.jpg" />
            <p>Stephnie got job 3 hours ago</p>
          </div>
        </div>
        <div>
          <div className="divimgbox">
             <img src="/assets/images/tao.jpg" />
            <p>Tao has fixed an interview</p>
          </div>
        </div>


        <div>
          <div className="divimgbox">
             <img src="/assets/images/xiu.jpg" />
            <p>Xiu uploaded a reel</p>
          </div>
        </div>
      </Slider>
    </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Banner;
