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
  const [slides, setSlides] = useState([]);
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
  randomUserSlides()
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 20,
    autoplay: true,
    arrows: false,
    speed: 40000,
    autoplaySpeed: 2000,
    cssEase: "linear" ,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 20,
          infinite: true,
          dots: true,
          speed: 40000,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          speed: 3000,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 2000,
          autoplaySpeed: 2000,
        }
      }
    ]
  };

  function randomUserSlides(){
    let users = [
      {"name": "Akash Patel", "imgurl": "https://randomuser.me/api/portraits/men/45.jpg"},
      {"name": "Rajesh Sharma", "imgurl": "https://randomuser.me/api/portraits/men/65.jpg"},
      {"name": "Arjun Singh", "imgurl": "https://randomuser.me/api/portraits/men/38.jpg"},
      {"name": "Siddharth Kumar", "imgurl": "https://randomuser.me/api/portraits/men/47.jpg"},
      {"name": "Rahul Gupta", "imgurl": "https://randomuser.me/api/portraits/men/12.jpg"},
      {"name": "Priya Sharma", "imgurl": "https://randomuser.me/api/portraits/women/50.jpg"},
      {"name": "Aarti Desai", "imgurl": "https://randomuser.me/api/portraits/women/37.jpg"},
      {"name": "Neha Reddy", "imgurl": "https://randomuser.me/api/portraits/women/15.jpg"},
      {"name": "Ananya Kapoor", "imgurl": "https://randomuser.me/api/portraits/women/38.jpg"},
      {"name": "Pooja Mehta", "imgurl": "https://randomuser.me/api/portraits/women/88.jpg"},
      {"name": "Jack Thompson", "imgurl": "https://randomuser.me/api/portraits/men/44.jpg"},
      {"name": "Liam Wilson", "imgurl": "https://randomuser.me/api/portraits/men/81.jpg"},
      {"name": "Ethan Campbell", "imgurl": "https://randomuser.me/api/portraits/men/46.jpg"},
      {"name": "Oliver Harris", "imgurl": "https://randomuser.me/api/portraits/men/16.jpg"},
      {"name": "Noah Roberts", "imgurl": "https://randomuser.me/api/portraits/men/29.jpg"},
      {"name": "Olivia Smith", "imgurl": "https://randomuser.me/api/portraits/women/79.jpg"},
      {"name": "Isabella Jones", "imgurl": "https://randomuser.me/api/portraits/women/80.jpg"},
      {"name": "Kate William", "imgurl": "https://randomuser.me/api/portraits/women/68.jpg"},
      {"name": "Charlotte Taylor", "imgurl": "https://randomuser.me/api/portraits/women/32.jpg"},
      {"name": "Ava Wilson", "imgurl": "https://randomuser.me/api/portraits/women/81.jpg"}
  ]

  let slugs = [
    "has fixed an interview",
    "got job 4 hours ago",
    "uploaded a reel",
    "got job 3 hours ago",
    "got job 9 hours ago",
    "uploaded a reel",
    "viewed a profile"
  ]
  let random_users = [];
  let used_indeces = [];

  while(random_users.length < users.length){
    let randomIndex = Math.floor(Math.random() * users.length);
    let randomSlugIndex = Math.floor(Math.random() * slugs.length);
    if(!used_indeces.includes(randomIndex)){
      random_users.push({"slug":slugs[randomSlugIndex],...users[randomIndex]})
      used_indeces.push(randomIndex);
    }
  }
  setSlides(random_users)
  }
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
        {slides.map((slide,key)=>{
          return (
            <div key={key}>
              <div className="divimgbox">
                <img src={slide.imgurl} />
                <p>{slide.name} {slide.slug}</p>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Banner;
