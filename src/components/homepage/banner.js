import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";
import Swal from "sweetalert2";
import Autocomplete from "react-google-autocomplete";
import { useDispatch } from "react-redux";
import { getJobBrowseList } from "redux/actions/jobBrowse";

const Banner = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(() => "");
  const [location, setLocation] = useState(() => {
    return router.query.location ? router.query.location : ''
  });
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const handleSearch = (e) => {
    e.preventDefault();
    let obj = {
      search: search,
      WorkLocation: location,
    };
    // dispatch(getJobBrowseList(obj));
    // router?.push(`/dashboard?search=${search}&location=${location}`);
    window.location.href = `/dashboard?search=${search}&location=${location}`;
  };
  return (
    <div className="banner banner-bg">
      {/* bg animation */}

      <div className="container">
        <div className="banner-content">
          <Row className=" justify-content-center">
            <Col lg={6}>
              <div className="d-flex flex-column hero-section">
                <div className="banner-text-center">
                  <h1 className="banner-heading">
                    <strong>ApplyKart </strong> will help you{" "}
                    <span className="animate">
                      <Typewriter
                        options={{
                          strings: ["hire staff "],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </span>
                    <br className="line-break" /> and
                    <span className="animate">
                      <Typewriter
                        options={{
                          strings: [" get hired in 2 hours! "],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </span>
                  </h1>
                </div>
                <form onSubmit={handleSearch}>
                  <div className="search-job-w">
                    <div className="job-title1">
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
                      />
                    </div>
                    <div className="job-title2">
                      <span className="job-location-icons">
                        <img src={"/assets/images/icon-map.svg"} alt="map" />
                      </span>
                      <Autocomplete
                        apiKey={apiKey}
                        options={{
                          types: ["establishment", "geocode"],
                          fields: ["formatted_address", "geometry", "name"],
                        }}
                        onPlaceSelected={(place) => {
                          // console.log(place);
                          setLocation(place?.formatted_address);
                        }}
                        name="Work Location"
                        className="form-control "
                      />
                    </div>
                    <button
                      className="btn btn-warning search-btn"
                      // onClick={handleSearch}
                    >
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

                {/* <div className="tabs-content">
                  <div className="tabs-btn">
                    <a href="#" className="find-job-btn1">
                      Find Jobs
                    </a>
                    <a href="#" className="find-job-btn2">
                      Job by Map
                    </a>
                  </div>
                  <div className="tab-indicator">
                    <span className="p-bars1 d-block"></span>
                    <span className="p-bars2 d-block"></span>
                  </div>
                </div> */}
              </div>
            </Col>
            <Col lg={6} md={8}>
              <div className="banner-iphone mb-2">
                <div className="home-iphone">
                  <img
                    src={"/assets/images/home_iphone.png"}
                    className="banner-bg-phone"
                    alt="iphone"
                  />
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
        {/* <div className="tabs-content">
          <div className="tabs-btn">
            <a href="#" className="find-job-btn1">
              Find Jobs
            </a>
            <a href="#" className="find-job-btn2">
              Job by Map
            </a>
          </div>
          <div className="tab-indicator">
            <span className="p-bars1 d-block"></span>
            <span className="p-bars2 d-block"></span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Banner;