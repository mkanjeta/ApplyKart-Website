import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { particularJobDetail, postFavoriteJob } from "redux/actions/jobBrowse";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { priceFormat, indianPriceFormat } from "CommonHelper";
import axios from "axios";

const LocationMap = dynamic(() => import("./map/DetailsMap").then((module) => {
  return module.default
}), {
  ssr: false,
});

const DashboardComp = (props) => {
  const router = useRouter();
  const { jobBrowseListById } = props;
  const dispatch = useDispatch();
  const [jobBrowse, setJobBrowse] = useState(jobBrowseListById);

  const [fav, setFav] = useState(jobBrowseListById?.is_favourite);
  const [latLong, setLatLong] = useState(null);
  const { jobFavBrowseById } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );

  useEffect(() => {
    // console.log("jobBrowseListById ==>>", jobBrowseListById)
    async function getLatLong(lat, long, currencyType, location) {
      if (lat && long) {
        return [lat, long];
      } else {
          if (currencyType == "AUD") {
            return [-37.840935, 144.946457]
          } else {
            return [28.644800, 77.216721]
          }
      }
    }

    if (jobBrowseListById) {
      // let office = [jobBrowseListById?.latitude, jobBrowseListById?.longitude]; // getLatLong(jobBrowseListById?.latitude, jobBrowseListById?.longitude, jobBrowseListById?.currencyType)
      
      if(jobBrowseListById?.location){
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        let search_location = jobBrowseListById?.location; 
        axios
        .post(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${search_location}&key=${apiKey}`
        )
        .then((response) => {
          if(response.data.results.length){
            console.log(response.data.results[0]?.geometry?.location)
            let office = [response.data.results[0]?.geometry.location.lat, response.data.results[0].geometry.location.lng]
            setLatLong({ office: office, current: office });
          }else{
            if (currencyType == "AUD") {
              let office = [-37.840935, 144.946457];
            } else {
              let office = [28.644800, 77.216721];
            }
            setLatLong({ office: office, current: office });
          }
        })
        .catch((err) => {
          console.log('errr ===========>>>>>>>>',err);
        });
      }else{
        const office = getLatLong(jobBrowseListById?.latitude, jobBrowseListById?.longitude, jobBrowseListById?.currencyType);
        setLatLong({ office: office, current: office });
      }
      setJobBrowse(jobBrowseListById);
    }
  }, [jobBrowseListById]);

  useEffect(() => {
    if (jobBrowse?.job_Id === jobFavBrowseById?.job_Id) {
      setJobBrowse(jobFavBrowseById);
      setFav(jobFavBrowseById?.is_favourite);
    }
  }, [jobFavBrowseById]);

  const handleFav = useCallback(
    (jobObj, jobDetail) => {
      dispatch(postFavoriteJob(jobObj, jobDetail));
    },
    [dispatch]
  );

  const handleJobDetail = (id) => {
    dispatch(particularJobDetail(id));
    router?.push(`/jobs/details/${id}`);
  };

  const jobTypeFunc = (type) => {
    switch (type) {
      case 1:
        return "Freelance";
      case 2:
        return "Full Time";
      case 3:
        return "Casual";
      case 4:
        return "Part Time";
      case 5:
        return "Allows Remote Work";
      case 6:
        return "Night Shift";
      // case 7:
      //   return "Work From Home";
      default:
        return "N/A";
    }
  };

  const getSalaryType = (type) => {
    switch (type) {
      case "Monthly":
        return " Per Month";
      case "Weekly":
        return " Per Week";
      case "Hourly":
        return " Per Hour";
      case "Annual":
        return " Per Annum";
      default:
        return "";
    }
  };


  function getPriceRange(price, currencyType) {
    if (price >= 0) {
      if (currencyType == "AUD") {
        return priceFormat(price);
      } else {
        return indianPriceFormat(price);
      }
    }
    return "";
  }

  function getLocation(location, currencyType) {
    if (location && currencyType) {
      if (currencyType === "AUD") {
        return location;
      } else {
        return location;
      }
    }
    return "";
  }

  // 28.644800, 77.216721.
  function getLatitute(lat, currencyType) {
    if (lat) {
      return lat;
    } else {
      if (currencyType == "AUD") {
        return -37.840935;
      } else if (currencyType == "INR") {
        return 28.644800;
      }
    }
  }

  function getLongitude(long, currencyType) {
    if (long) {
      return long;
    } else {
      if (currencyType == "AUD") {
        return 144.946457;
      } else if (currencyType == "INR") {
        return 77.216721;
      }
    }
  }

  const postedDate = new Date(jobBrowse?.posted_Date);
const formattedDate = `${postedDate.getDate()}${getOrdinalSuffix(postedDate.getDate())} ${getMonthName(postedDate.getMonth())} ${postedDate.getFullYear()}`;
function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}
function getMonthName(month) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
}



  return (
    <div className="row">
      <div className="col-md-12">
        <div
          className="dashboard_bar job_box position-relative"
          key={jobBrowse?.job_Id}
        >
          {jobBrowse?.newCandidates ? (
            <span className="badge  rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
              {jobBrowse?.newCandidates} New Candidate
            </span>
          ) : (
            <></>
          )}

          <div className="content_area">
            <div className="topBar">
              <div className="company_info">
                <div className="image">
                  {/* <img
                    src={
                      jobBrowse?.companyLogo
                        ? jobBrowse?.companyLogo
                        : "/assets/images/placeholder.jpg"
                    }
                    alt="img"
                    className="image-fit"
                  /> */}
                  <img
                    src={jobBrowse?.companyLogo?.trim() || "https://ui-avatars.com/api/?name="+jobBrowse?.company+"&background=random&color=fff&bold=true"}
                    alt="img"
                    className="image-fit"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://ui-avatars.com/api/?name="+jobBrowse?.company+"&background=random&color=fff&bold=true";
                    }}
                  />
                </div>
                <span style={{ textTransform: "capitalize" }}>
                  {jobBrowse?.company}
                </span>
              </div>
              <div className="actions">
                <button
                  onClick={() => {
                    handleFav(
                      {
                        id: jobBrowse?.job_Id,
                        isFav: jobBrowse?.is_favourite ? 0 : 1,
                      },
                      jobBrowse
                    );
                  }}
                  type="button"
                  className={`btn btns ${fav && "active"}`}
                >
                  <i className="fas fa-heart" />
                </button>
              </div>
            </div>
            <div className="desc_area">
              <h5 className="jobtitle">{jobBrowse?.job_Title}</h5>
              <p className="text">
                {jobBrowse?.description}{" "}
                {jobBrowse?.description && (
                  <button type="button" className="a">
                    Read more
                  </button>
                )}
              </p>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <label style={{ marginRight: '10px'}}>Location</label>
              <button type="button" className="btn btn-light-info" style={{padding: '1px 11px'}}>
                {jobBrowse?.location
                  ? getLocation(jobBrowse?.location, jobBrowse?.currencyType)
                  : "Not Available"}
              </button>
            </div>
            <div className="action_tags_area">
              <ul>
                <li>
                  <label>Min Salary</label>
                  <button type="button" className="btn btn-light-warning ">
                    {jobBrowse?.salary
                        ? `${getPriceRange(jobBrowse?.salary, jobBrowse?.currencyType)}`
                      : "Not Disclosed"}
                    {`${getSalaryType(jobBrowse?.base)}`}
                  </button>
                </li>
                <li>
                  <label>Posted Date</label>
                  <div style={{ maxWidth: "355px", width: "100%" }}>

                    <button
                        type="button"
                        className="btn btn-light-info"
                        style={{ marginRight: "2px" }}
                    >
                        {formattedDate ? formattedDate : "Not Available"}
                    </button>

                    {/* {jobBrowse?.job_Type &&
                      jobBrowse?.job_Type.length != 0 ?
                      jobBrowse?.job_Type.map((item, i) => {
                        return (
                          <button
                            type="button"
                            className="btn btn-light-info"
                            style={{ marginRight: "2px" }}
                            key={i}
                          >
                            {jobTypeFunc(item)}
                          </button>
                        );
                      })
                      :
                      <button
                        type="button"
                        className="btn btn-light-info"
                        style={{ marginRight: "2px" }}
                      >
                        N/A
                      </button>
                    } */}
                  </div>
                </li>

                <li>
                  <label>Basic Requirements</label>
                  <button
                        type="button"
                        className="btn"
                        style={{ marginRight: "2px", background: "rgb(155, 0, 228, 0.7)", color: "#fff"}}
                    >
                        Basic English
                    </button>
                </li>

              </ul>
              <button
                type="submit"
                className="btn btn-warning"
                onClick={() => {
                  handleJobDetail(jobBrowse?.job_Id);
                }}
              >
                View details
              </button>
            </div>
          </div>
          <div className="map_area">
            {latLong?.office && <LocationMap
              mapLat={getLatitute(jobBrowse?.latitude, jobBrowse?.currencyType)}
              mapLong={getLongitude(jobBrowse?.longitude, jobBrowse?.currencyType)}
              latLong={latLong}
            />}
          </div>
        </div>
      </div>
    </div >
  );
};

export default DashboardComp;
