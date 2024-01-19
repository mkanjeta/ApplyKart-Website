import { Fragment, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import Filter from "components/shared/filter";
import { BASE_URL } from "constants/constants";
import Router, { useRouter } from "next/router";
import { toggleHamburger } from "helper/helper";
import { priceFormat, indianPriceFormat } from "CommonHelper";

// For map
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { getAppliedJobs, postFavoriteJob } from "redux/actions/jobBrowse";
import Link from "next/link";
const LocationMap = dynamic(() => import("../map/Map"), {
  ssr: false,
});

const JobsBox = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { appliedJobList, message, error } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );

  useEffect(() => {
    if (!localStorage.getItem("applyKart")) {
      router?.push("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(getAppliedJobs());
  }, [dispatch]);

  const handleFav = (jobObj, jobDetail, jobId) => {
    dispatch(postFavoriteJob(jobObj, jobDetail));
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
        return "";
    }
  };

  function getPrice(price, currencyType) {
    if (price >= 0 && currencyType) {
      if (currencyType == "INR") {
        return indianPriceFormat(price)
      } else {
        return priceFormat(price)
      }
    }
  }

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main_wrapper">
        <div className="left_side sidebar" id="left_side">
          <Sidebar />
        </div>
        <div className="right_side dashboard">
          <TopBar />
          <div className="row">
            <div className="col-xl-10">
              <div className="dashboard_title_bar">
                <h3 className="title">
                  Applied Jobs <small>{appliedJobList?.jobs?.length}</small>
                </h3>
                {/* <form>
                  <div className="form-group">
                    <label htmlFor="sort">Sort by:</label>
                    <select name="sort" id="sort">
                      <option>Select Option</option>
                      <option value="Option 1">Option 1</option>
                      <option value="Option 2">Option 2</option>
                      <option value="Option 3">Option 3</option>
                    </select>
                  </div>
                </form> */}
              </div>
              {/* Job Box */}
              {appliedJobList?.jobs?.map((item, i) => (
                <div className="dashboard_bar job_box" key={i}>
                  <div className="content_area">
                    <div className="topBar">
                      <div className="company_info">
                        <div className="image">
                          <img
                            src="/assets/images/placeholder.jpg"
                            alt="img"
                            className="image-fit"
                          />
                        </div>
                        {item?.company}
                      </div>
                      <div className="actions">
                        <button type="button" className="btn success btns text">
                          {item?.applicationStatusName}
                        </button>
                        <button type="button" className="btn btns">
                          {item?.isFav ? (
                            <i
                              onClick={() => {
                                handleFav(
                                  { id: item?.job_Id },
                                  item,
                                  item?.job_Id
                                );
                              }}
                              style={{ color: "red" }}
                              className="fas fa-heart"
                            />
                          ) : (
                            <i
                              onClick={() => {
                                handleFav(
                                  { id: item?.job_Id },
                                  item,
                                  item?.job_Id
                                );
                              }}
                              className="fas fa-heart"
                            />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="desc_area">
                      <h5 className="jobtitle">{item?.job_Title}</h5>
                      {/* <p className="text">
                        {item?.description}{" "}
                        {item?.description && (
                          <button type="button" className="a">
                            Read more
                          </button>
                        )}
                      </p> */}
                    </div>
                    <div className="action_tags_area">
                      <ul>
                        <li>
                          <label>Salary</label>
                          <button
                            type="button"
                            className="btn btn-light-warning "
                          >
                            {`${getPrice(item?.salary, item?.currencyType)}-${getPrice(item?.max_Salary, item?.currencyType)}`}
                          </button>
                        </li>
                        <li>
                          <label>Job Type</label>

                          {item?.job_type ? (
                            item?.job_type.map((val, index) => (
                              <button
                                type="button"
                                className="btn btn-light-info"
                                key={index}
                              >
                                {jobTypeFunc(val)}
                              </button>
                            ))
                          ) : (
                            <></>
                          )}

                          {/* <button type="button" className="btn btn-light-info">
                            {item?.job_type === 1
                              ? "Full Time"
                              : item?.job_type === 2
                              ? "Part Time"
                              : "Contracted based"}
                          </button> */}
                        </li>
                      </ul>
                      <Link href={`/jobs/details/${item?.job_Id}`}>
                        <button type="button" className="btn btn-warning">
                          View details
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="map_area">
                    <LocationMap mapLat="51.5072" mapLong="0.1276" />
                  </div>
                </div>
              ))}
            </div>
            {
              appliedJobList?.jobs?.length == 0 && (
                <>
                  <div
                    className="no-job-posted-box"
                    style={{
                      margin: "auto",
                      width: "30%",
                      height: "30%",
                      // border : '3px solid green',
                      padding: "10px",
                    }}
                  >
                    <img src="./assets/images/job-not-posted.png" />
                    <br />
                    <h6>No applied jobs</h6>
                    <button
                      type="button"
                      className="connect-btn mx-auto primary"
                      // style={{ width: "60px" }}
                      onClick={() => router.push("/dashboard?jobType=ALLJOBS")}
                    >
                      Apply Jobs
                    </button>
                  </div>

                </>
              )
            }
          </div>
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />{" "}
      </main>
    </Fragment>
  );
};

export default JobsBox;
