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
    function updateCounter() {
      const counter = document.getElementById("countertext");
      const randomNumber = Math.floor(Math.random() * (20001 - 15000) + 20000);
      counter.innerHTML = randomNumber + " Active Users";
      counter.style.color = "#fff";
      counter.style.background = "transparent";
      animateText(counter);
      setTimeout(flipCounter, 10000);
    }

    function flipCounter() {
      const counter = document.getElementById("countertext");
      const randomNumber = Math.floor(Math.random() * (30001 - 25000) + 25000);
      counter.innerHTML = randomNumber + " Daily Active Users";
      counter.style.color = "#0315fb";
      counter.style.background = "#fff";
      animateText(counter);
      setTimeout(updateCounter, 10000);
    }

    function animateText(element) {
      // Trigger reflow to restart the animation
      element.style.animation = "none";
      element.offsetHeight; /* trigger reflow */
      element.style.animation = null;
    }

    updateCounter();
  }, []);

  return (
    <div className="banner banner-bg">
      <div className="container">
        <div className="banner-content">
          <Row className=" justify-content-center">
            <Col lg={6}>
              <div className="d-flex flex-column hero-section">
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
                  <div className="search-job-w">
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

                <div className="activeusers">
                  <div className="counter">
                    <div id="countertext" className="countertext"></div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={8}>
              <div className="banner-iphone mb-2">
                <div className="home-iphone">
                  <img src="/assets/images/reelgif.gif" className="bannergif" />
                  <img
                    src={"/assets/images/home-circle-img.png"}
                    className="banner-bg-circle"
                    alt="bg-circle"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Banner;
