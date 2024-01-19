import { Fragment, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import Filter from "components/shared/filter";
import { BASE_URL } from "constants/constants";
import Router, { useRouter } from "next/router";
import { toggleHamburger } from "helper/helper";

// For map
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavoriteJob,
  particularJobDetail,
  removeSavedJob,
} from "redux/actions/jobBrowse";
const LocationMap = dynamic(() => import("../../map/Map"), {
  ssr: false,
});

const FavoriteJobsBox = () => {
  //const history = Router;
  const router = useRouter();
  const dispatch = useDispatch();
  const { favoriteJobs } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  useEffect(() => {
    if (!localStorage.getItem("applyKart")) {
      router?.push("/login");
    }
  }, []);
  useEffect(() => {
    dispatch(getFavoriteJob());
  }, []);
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
        return "";
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

  const removeJob = (id) => {
    // console.log("iddd->>>>", id);
    dispatch(removeSavedJob(id));
  };

  //const onClick = () => history.push("/jobs/details");
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
          {/* TopBar */}
          <TopBar />
          {/* TopBar */}
          <div className="row">
            <div className="col-xl-10">
              <div className="dashboard_title_bar">
                <h3 className="title">Favorite</h3>
              </div>
              {/* Job Box */}
              {favoriteJobs?.jobs?.map((item, i) => (
                <div key={i} className="dashboard_bar job_box">
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
                        <button
                          type="button"
                          className="btn btns active"
                          onClick={() => {
                            removeJob(item?.job_Id);
                          }}
                        >
                          <i className="fas fa-heart" />
                        </button>
                      </div>
                    </div>
                    <div className="desc_area">
                      <h5 className="jobtitle">{item?.job_title}</h5>
                      <p className="text">
                        {item?.description}
                        {/* <button type="button" className='a' onClick={onClick}>Read more</button> */}
                      </p>
                    </div>
                    <div className="action_tags_area">
                      <ul>
                        <li>
                          <label>Salary</label>
                          <button
                            type="button"
                            className="btn btn-light-warning "
                          >
                            {`$${item?.max_salary_offered} - $${item?.min_Salary_Offered}`}
                            {`${getSalaryType(item?.base)}`}
                          </button>
                        </li>
                        <li>
                          <label>Job Type</label>
                          {item?.job_Type ? (
                            item?.job_Type.map((val, index) => (
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
                            {item?.job_Type === 1
                              ? "Full Time"
                              : item?.job_Type === 2
                              ? "Part Time"
                              : "Contracted based"}
                          </button> */}
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => handleJobDetail(item?.job_Id)}
                      >
                        View details
                      </button>
                    </div>
                  </div>
                  <div className="map_area">
                    <LocationMap mapLat="51.5072" mapLong="0.1276" />
                  </div>
                </div>
              ))}
            </div>
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

export default FavoriteJobsBox;
