import { Fragment, useEffect, useState } from "react";
import Sidebar from "components/shared/sidebar";
import TopBar from "components/shared/topbar";
import Head from "next/head";
import { BASE_URL } from "constants/constants";
// For map
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { postApplyJobs } from "redux/actions/jobBrowse";
import { toggleHamburger } from "helper/helper";

const LocationMap = dynamic(() => import("../map/DetailsMap"), {
  ssr: false,
});

const JobDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [seekerId, setSeekerId] = useState(null);
  const { jobDetail } = useSelector(({ jobBrowseReducer }) => jobBrowseReducer);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const { userId } = JSON.parse(applyKart);
      setSeekerId(userId);
    }
  }, [dispatch]);
  const handleApplyJob = (id) => {
    const obj = {
      job_Id: id,
      user_id: seekerId,
    };
    dispatch(postApplyJobs(obj));
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
          {/* Details */}
          <div className="row">
            <div className="col-12">
              <div className="dashboard_title_bar">
                <h3 className="title">Job Details</h3>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="dashboard_bar style_two job_box d-inline-block">
                <div className="topBar style_two">
                  <div className="company_info">
                    <div className="image">
                      <img
                        src="https://via.placeholder.com/60"
                        alt="img"
                        className="image-fit"
                      />
                    </div>
                    <div className="text">
                      {jobDetail?.company}
                      <p className="design">IT, Android</p>
                    </div>
                  </div>
                  <div className="actions">
                    <button
                      type="button"
                      className="btn btn-warning me-3"
                      onClick={() => handleApplyJob(jobDetail?.job_Id)}
                    >
                      Apply Now
                    </button>
                    <button type="button" className="btn btns">
                      <i className="fas fa-heart" />
                    </button>
                    <button type="button" className="btn btns text-black">
                      <i className="fas fa-share" />
                    </button>
                  </div>
                </div>
                <div className="desc_area">
                  <h5 className="jobtitle">Description</h5>
                  <p className="text">{jobDetail?.description}</p>
                </div>
                <button type="button" className="btn btns tags">
                  Full Time
                </button>
                <button type="button" className="btn btns tags">
                  Documentation
                </button>
                <button type="button" className="btn btns tags">
                  Wireframe
                </button>
                <button type="button" className="btn btns tags">
                  UAT
                </button>
                <div className="desc_area">
                  <h5 className="jobtitle">About Company</h5>
                  <ul>
                    {jobDetail?.availablity?.monday?.from && (
                      <li>
                        Monday{" "}
                        <span>{`${jobDetail?.availablity?.monday?.from} to ${jobDetail?.availablity?.monday?.to}`}</span>
                      </li>
                    )}
                    {jobDetail?.availablity?.tuesday?.from && (
                      <li>
                        Tuesday{" "}
                        <span>{`${jobDetail?.availablity?.tuesday?.from} to ${jobDetail?.availablity?.tuesday?.to}`}</span>
                      </li>
                    )}
                    {jobDetail?.availablity?.wednesday?.from && (
                      <li>
                        Wednesday{" "}
                        <span>{`${jobDetail?.availablity?.tuesday?.from} to ${jobDetail?.availablity?.tuesday?.to}`}</span>
                      </li>
                    )}
                    {jobDetail?.availablity?.thursday?.from && (
                      <li>
                        Thursday{" "}
                        <span>{`${jobDetail?.availablity?.thursday?.from} to ${jobDetail?.availablity?.thursday?.to}`}</span>
                      </li>
                    )}
                    {jobDetail?.availablity?.friday?.from && (
                      <li>
                        Friday{" "}
                        <span>{`${jobDetail?.availablity?.friday?.from} to ${jobDetail?.availablity?.friday?.to}`}</span>
                      </li>
                    )}
                    {jobDetail?.availablity?.saturday?.from && (
                      <li>
                        Saturday{" "}
                        <span>{`${jobDetail?.availablity?.saturday?.from} to ${jobDetail?.availablity?.saturday?.to}`}</span>
                      </li>
                    )}
                    {jobDetail?.availablity?.sundays?.from && (
                      <li>
                        Sunday{" "}
                        <span>{`${jobDetail?.availablity?.sunday?.from} to ${jobDetail?.availablity?.sunday?.to}`}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="dashboard_bar style_two with_map job_box">
                <div className="map_area">
                  <LocationMap
                    mapLat={jobDetail?.latitude || "51.5072"}
                    mapLong={jobDetail?.longitude || "0.1276"}
                  />
                </div>
                <p className="location_text text-black">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {jobDetail?.location}
                </p>
              </div>
            </div>
            <div className="col-xl-3">Job</div>
          </div>
          {/* Details */}
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

export default JobDetails;
