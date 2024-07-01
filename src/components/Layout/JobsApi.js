import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "components/shared/sidebar";
import { Dropdown } from "react-bootstrap";
import Header from "components/shared/header";
import TimelineHeader from "components/shared/timelineHeader";
// For map
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { particularJobDetail, postFavoriteJob } from "redux/actions/jobBrowse";
import Pagination from "react-responsive-pagination";
const LocationMap = dynamic(
  () => import("components/dashboard/map/DetailsMap"),
  { ssr: false }
);
const JobsApi = ({ apps }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleFav = useCallback(
    (jobObj, jobDetail) => {
      dispatch(postFavoriteJob(jobObj, jobDetail));
    },
    [dispatch]
  );
  const [latLong, setLatLong] = useState(null);
  const [pageNo, setPageNo] = useState(parseInt(router.query.page) || 1);
  const [data, setData] = useState(() => []);
  const [seekerId, setSeekerId] = useState("");
  const [accessToken, setaccessToken] = useState("");

  const handleJobDetail = (id) => {
    dispatch(particularJobDetail(id));
    router?.push(`/jobs/details/${id}`);
  };

  const { search, totalData, loading } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );

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

  const handlePaginationChange = (pageindex) => {
    setPageNo(pageindex);
    router.push(`/jobs/${router.query.id}/?page=${pageindex}`, undefined, {
      shallow: true,
    });
  };

  const appsdata = apps[0].jobs;

  const locationdata = appsdata[0];

  const jobscount = apps[0].totalJobCount;

  useEffect(() => {
    setData(apps[0]?.jobs ? apps[0]?.jobs : []);

    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const data = JSON.parse(applyKart);
      setaccessToken(data?.encryptedToken);
      setSeekerId(data?.userId);
    }
  }, [apps[0]]);

  return (
    <main className="main_wrapper">
      <div
        className="left_side sidebar"
        id="left_side"
        style={{ overflowY: "hidden" }}
      >
        <div className="logo mb-4">
          <img
            src={"/assets/images/white-logo.svg"}
            alt="logo"
            className="image-fit-contain"
          />
        </div>
        <Sidebar />
        <ul className="side_menu">
          <Dropdown as="li" className={"menu-item"}>
            <Dropdown.Toggle
              as="a"
              onClick={() => {
                router?.push("/");
              }}
            >
              <span className="image">
                <img src={"/assets/images/icons/home.svg"} alt="icon" />
                <img src={"/assets/images/icons/home.svg"} alt="icon" />
              </span>
              Home
            </Dropdown.Toggle>
          </Dropdown>
        </ul>
      </div>

      {seekerId || accessToken ? (
        <TimelineHeader />
      ):(
        <Header
        styleClass="style_two p-0"
        logoUrl="assets/images/black-logo.svg"
      />
      )}
      <div className="right_side dashboard" id="right_side">
        <div className="row">
        {/* {locationdata? (
          <div className="col-12">
            <div className="dashboard_title_bar mb-0">
              <p className="title my-3">Job In {locationdata?.location}</p>
            </div>
          </div>
        ):(<></>)} */}
          
          <div className="col-xl-12">
            <div className="dashboard_bar style_two job_box d-inline-block w-100 position-relative">
              <div className="desc_area ">
                {/* <h5 className="jobtitle">Description</h5>` */}
                <div className="text">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: apps[1].data.description,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {locationdata ? (
          <div className="row">
          <div className="col-xl-12">
            <div className="dashboard_title_bar">
              <h3 className="title">Jobs
                {!loading ? (
                  <small style={{ marginLeft: "10px" }}>
                    {" "}
                    {(pageNo - 1) * 20 + data.length}/{jobscount}
                  </small>
                ) : (
                  <></>
                )}
              </h3>
              <form></form>

              {/* pagination */}
              <div className="style-pagination mb-1">
                <Pagination
                  current={pageNo}
                  total={parseInt(jobscount / 20 + 1)}
                  onPageChange={(setPageNo) =>
                    handlePaginationChange(setPageNo)
                  }
                />
              </div>
            </div>
            {/* Job Box */}
            {appsdata.map((jobBrowse, i) => (
              <div className="row" key={i}>
                <div className="col-md-12">
                  <div
                    className="dashboard_bar job_box"
                    key={jobBrowse?.job_Id}
                  >
                    <div className="content_area">
                      <div className="topBar">
                        <div className="company_info">
                          <div className="image">
                            <img
                              src={
                                jobBrowse?.companyLogo
                                  ? jobBrowse?.companyLogo
                                  : "/assets/images/placeholder.jpg"
                              }
                              alt="img"
                              className="image-fit"
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
                            className={`btn btns ${"active"}`}
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
                      <div className="action_tags_area">
                        <ul>
                          <li>
                            <label>Salary</label>
                            <button
                              type="button"
                              className="btn btn-light-warning "
                            >
                              {jobBrowse?.salary == jobBrowse?.max_Salary
                                ? `$${jobBrowse?.salary}`
                                : `$${jobBrowse?.salary} - $${jobBrowse?.max_Salary}`}
                              {`${getSalaryType(jobBrowse?.base)}`}
                            </button>
                          </li>
                          <li>
                            <label>Job Type</label>
                            <div style={{ maxWidth: "355px", width: "100%" }}>
                              {/* <button type="button" className="btn btn-light-info"> */}
                              {jobBrowse?.job_Type &&
                                jobBrowse?.job_Type.length != 0 &&
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
                                })}
                            </div>
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
                      <LocationMap
                        mapLat={jobBrowse?.latitude || "51.5072"}
                        mapLong={jobBrowse?.longitude || "0.1276"}
                        latLong={latLong}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Pagination
              current={pageNo}
              total={parseInt(jobscount / 20 + 1)}
              onPageChange={(setPageNo) => handlePaginationChange(setPageNo)}
            />
          </div>
        </div>
        ):(
          <></>
        )}
        
      </div>
    </main>
  );
};

export default JobsApi;
