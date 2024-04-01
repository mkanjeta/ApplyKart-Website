import { Fragment, useEffect, useState, useCallback } from "react";
import Sidebar from "components/shared/sidebar";
import { Dropdown, Alert } from "react-bootstrap";
import Head from "next/head";
// For map
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "helper/helper";
import { Mixpanel } from "helper/MixPanel";
import { Modal } from "react-bootstrap";
import domtoimage from 'dom-to-image';
import { useQRCode } from 'next-qrcode';
import NavBar from "components/shared/navbar";
import { priceFormat, indianPriceFormat } from "CommonHelper";

import { QRCodeSVG } from 'qrcode.react';

import {
  editJobDetails,
  getCandidateList,
  particularJobDetail,
  postApplyJobs,
  postStatusPostedJobs,
  removeJobs,
  postFavoriteJob,
  referAFriend,
} from "redux/actions/jobBrowse";
import { useRouter } from "next/router";
import Loader from "components/shared/loader";
import { RWebShare } from "react-web-share";
import Swal from "sweetalert2";
import PreviewJobQrCode from "../post-job/post-job-modals/previewqrmodal";
import Type1 from "components/QRCodes/Type1";
import Type3 from "components/QRCodes/Type3";
import Type2 from "components/QRCodes/Type2";
import TimelineHeader from "components/shared/timelineHeader";
const LocationMap = dynamic(() => import("../../map/DetailsMap"), {
  ssr: false,
});
// import LocationMap from "../../map/DetailsMap";

const JobDetails = () => {
  // const { SVG, Image } = useQRCode();

  const router = useRouter();
  const dispatch = useDispatch();
  const [seekerId, setSeekerId] = useState(null);
  const [isActive, setActive] = useState(null);

  const [name, setName] = useState(() => "");
  const [email, setEmail] = useState(() => "");
  const [phone, setPhone] = useState(() => "");
  const [error, setError] = useState(() => "");
  const [latLong, setLatLong] = useState(null);

  const [countryCode, setCountryCode] = useState(null);

  useEffect(() => {
    if (router?.query?.session_id) {
      // console.log(router);
    }
  }, [router])

  useEffect(() => {
    if (typeof window != undefined) {
      let localStorageData = localStorage?.getItem("applyKart");
      const signUpCountryCode = localStorage?.getItem("countryCode");
      let countryCode = null;
      if (localStorageData) {
        localStorageData = JSON.parse(localStorageData);
        countryCode = localStorageData?.countryCode
      } else {
        countryCode = signUpCountryCode
      }

      setCountryCode(countryCode)
    }
  }, []);

  // const [showQr, setShowQr] = useState(() => false);
  // const [qr, setQr] = useState(() => false);

  const [eta, setEtas] = useState(() => {
    return {
      drive: "",
      walk: "",
      bus: "",
      bike: "",
    };
  });

  // const [share, setShare] = useState(() => false);

  const { jobDetail, infoMessage, removeStatus, loading } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  const { currentSubscriptionPlan } = useSelector(state => state?.AuthReducer);

  // console.log("jobDetail ==>>", jobDetail)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      if (applyKart) {
        const { userId } = JSON.parse(applyKart);
        setSeekerId(userId);
      }
    }
  }, [dispatch]);
  useEffect(() => {

    function getLatLong(lat, long, currencyType) {
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

    if (jobDetail) {
      setActive(jobDetail?.is_Active);
      // let office = [jobDetail?.latitude, jobDetail?.longitude];
      const office = getLatLong(jobDetail?.latitude, jobDetail?.longitude, jobDetail?.currencyType);
      setLatLong({ office: office, current: office });
    }
  }, [jobDetail]);

  const handleFav = useCallback(
    (jobObj, jobDetail) => {
      dispatch(postFavoriteJob(jobObj, jobDetail));
    },
    [dispatch]
  );

  const handleApplied = () => {
    const isLoggedIn = localStorage?.getItem("applyKart") || false;
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      const obj = {
        User_Id: seekerId,
        job_id: jobDetail?.job_Id,
      };
      dispatch(postApplyJobs(obj));
    }
  };
  useEffect(() => {
    if (router?.query?.id) {
      dispatch(particularJobDetail(router?.query?.id));
    }
    //console.log("router",router)
  }, [router?.query?.id]);

  const handleStatus = () => {
    if (jobDetail?.is_Active == 1) {
      let body = {
        job_Id: jobDetail?.job_Id,
        IsActive: 0,
      };
      dispatch(postStatusPostedJobs(body));
    } else {
      let body = {
        job_Id: jobDetail?.job_Id,
        IsActive: 1,
      };
      dispatch(postStatusPostedJobs(body));
    }
  };
  const handleremove = () => {
    const obj = {
      job_Id: router?.query?.id,
    };
    dispatch(removeJobs(obj));
    //if(removeStatus){
    router?.push("/dashboard?jobType=CREATEDJOBS");
    //}
  };
  const handleCandidate = () => {
    const obj = {
      JobId: jobDetail?.job_Id,
    };
    dispatch(getCandidateList(obj));
    router.push(`/dashboard/candidates/${jobDetail?.job_Id}`);
  };

  const handleEdit = (id) => {
    localStorage?.setItem("jobId", id);
    localStorage.setItem("isEdit", 1);
    dispatch(editJobDetails(id));
    router?.push("/jobs/post-job");
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

  const referAFriendFunc = (e) => {
    e.preventDefault();
    if (!name || name.trim() == "") {
      setError("Enter name");
      return;
    }
    if (!phone || phone.trim() == "") {
      setError("Enter phone no.");
      return;
    }
    if (!email || email.trim() == "") {
      setError("Enter email");
      return;
    }
    let obj = {
      job_id: jobDetail?.job_Id,
      email: email,
      name: name,
      contactNo: phone,
    };
    dispatch(referAFriend(obj));
    setPhone("");
    setEmail("");
    setName("");
    // console.log("here");
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

  const style = {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  };

  // const [showPlanModal, setShowPlanModal] = useState(false);
  // const handleClose = () => setShowPlanModal(false);
  // const handleShow = () => setShowPlanModal(true);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const handleClosePreview = () => setShowPreviewModal(false);
  // const handleShowPreview = () => setShowPreviewModal(true);

  // const downloadQR = () => {
  //   domtoimage.toBlob(document.getElementById("qr-code-id"))
  //     .then(function (blob) {
  //       const link = window.URL.createObjectURL(blob);
  //       let downloadLink = document.createElement("a");
  //       downloadLink.href = link;
  //       downloadLink.download = "123456.png";
  //       document.body.appendChild(downloadLink);
  //       downloadLink.click();
  //       document.body.removeChild(downloadLink);
  //     });
  // };

  // console.log('jobDetail', jobDetail);

  function getPrice(price) {
    if (price >= 0 && Object.keys(jobDetail)?.length > 0) {
      if (jobDetail?.currencyType == "INR") {
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
        <TimelineHeader />
        {/* <div className="content-area" style={{ width: 'calc(100% - 700px)', flex: '1 1 auto', marginLeft: 'calc(100% - 1000px)' }}>
          <NavBar />
        </div> */}
        <div className="left_side sidebar" id="left_side">
          <Sidebar />
        </div>
        <div
          className="left_side sidebar"
          id="left_side"
          style={{ overflow: "hidden" }}
        >
          <div className="logo mb-4">
            <img
              src={"/assets/images/white-logo.svg"}
              alt="logo"
              className="image-fit-contain"
            />
          </div>
          <ul className="side_menu">
            <Dropdown as="li" className={"menu-item"}>
              <Dropdown.Toggle
                as="a"
                onClick={() => {
                  router?.back();
                }}
              >
                <span className="image">
                  <img
                    src={"/assets/images/icons/back-button.svg"}
                    alt="icon"
                  />
                  <img
                    src={"/assets/images/icons/back-button.svg"}
                    alt="icon"
                  />
                </span>
                Back
              </Dropdown.Toggle>
            </Dropdown>
          </ul>
        </div>
        <div className="right_side dashboard">
          {/* TopBar */}
          {/* TopBar */}
          {/* Details */}
          {loading && <Loader />}
          <div className="row">
            <div className="col-12">
              <div className="dashboard_title_bar mb-0">
                <h3 className="title my-3">Job Details</h3>
              </div>
              {/* <button type="submit" className="btn btn-primary ms-3" onClick={handleShow}>
                Plan Modal 
              </button> */}
              {/* <button type="submit" className="btn btn-primary ms-3" onClick={handleShowPreview}>
                Preview QR Modal 
              </button> */}
            </div>
            <div className="col-xl-9">
              <div className="dashboard_bar style_two job_box d-inline-block  w-100 position-relative">
                {/* <span className="badge  rounded-pill bg-primary position-absolute top-0 start-100 translate-middle">New</span> */}

                <div className="topBar style_two">
                  <div className="company_info">
                    <div className="image">
                      <img
                        src={
                          jobDetail?.companyLogo
                            ? jobDetail?.companyLogo
                            : "/assets/images/placeholder.jpg"
                        }
                        alt="img"
                        className="image-fit"
                      />
                    </div>
                    <div className="text">
                      {jobDetail?.job_Title}
                      {!jobDetail?.isScraped ? (
                        <p className="design">{jobDetail?.role}</p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="actions">
                    {
                      jobDetail?.created_By != seekerId && (
                        <>
                          <button
                            type="button"
                            className="btn btn-warning me-3"
                            onClick={
                              infoMessage === "job applied" ||
                                jobDetail?.application_Status > 0
                                ? () => {
                                  Swal.fire({
                                    title: "Job application exists",
                                    icon: "error",
                                  });
                                }
                                : jobDetail?.isScraped
                                  ? () => {
                                    window.open(
                                      jobDetail?.scrapedJobUrl,
                                      "_blank"
                                    );
                                  }
                                  : () => {
                                    handleApplied();
                                  }
                            }
                          >
                            {infoMessage === "job applied" ||
                              jobDetail?.application_Status > 0
                              ? "Applied"
                              : "Apply Now"}
                          </button>


                          < button
                            onClick={() => {
                              handleFav(
                                {
                                  id: jobDetail?.job_Id,
                                  isFav: jobDetail?.is_favourite ? 0 : 1,
                                },
                                jobDetail
                              );
                            }}
                            type="button"
                            className="btn btns"
                          >
                            {jobDetail?.is_favourite ? (
                              <i
                                style={{ color: "red" }}
                                className="fas fa-heart"
                              />
                            ) : (
                              <i className="fas fa-heart" />
                            )}
                          </button>
                        </>
                      )}
                    <RWebShare
                      data={{
                        text: "Check this amazing oppurtunity",
                        url: `https://applykart.co/jobs/details/${router?.query?.id}`,
                        title: "ApplyKart",
                      }}
                      onClick={() => {
                        Mixpanel.track("Job shared website");
                      }}
                    >
                      <button type="button" className="btn btns text-black">
                        <i className="fas fa-share" />
                      </button>
                    </RWebShare>
                    {
                      seekerId && jobDetail?.created_By != seekerId && (
                        <Dropdown>
                          <Dropdown.Toggle type="button" id="dropdown-condition">
                            <img src={"/assets/images/3_dot.svg"} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="toggle-box">
                            <Dropdown.Item
                              href={`mailto:support@applykart.co?Subject=Report Job ${jobDetail?.job_Title} (id ${router?.query?.id})`}
                              className="job-details-menu"
                            >
                              <i
                                className="fa fa-ban"
                                style={{ color: "red" }}
                              ></i>{" "}
                              Report
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )
                    }
                    {
                      jobDetail?.created_By == seekerId && (
                        <Dropdown>
                          <Dropdown.Toggle type="button" id="dropdown-condition">
                            <i className="fas fa-ellipsis-v"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="toggle-box">
                            <Dropdown.Item
                              href="#"
                              onClick={() => handleremove()}
                              className="job-details-menu"
                            >
                              Remove Job
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#"
                              onClick={() => handleEdit(jobDetail?.job_Id)}
                              className="job-details-menu"
                            >
                              Edit Job
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )
                    }
                  </div>
                </div>
                <ul className="table_data">
                  <li>
                    <p className="title">
                      <i className="fas fa-clock" />
                      Experience
                    </p>
                    <span className="text">
                      {jobDetail?.min_Experience
                        ? `${jobDetail?.min_Experience} Years`
                        : "Newbie"}
                    </span>
                  </li>
                  <li>
                    <p className="title">
                      {
                        jobDetail?.isScraped == 0 && jobDetail?.currencyType == "AUD" && (
                          <i className="fas fa-usd-circle" />
                        )}
                      {jobDetail?.isScraped == 0 && jobDetail?.currencyType == "INR" &&
                        (
                          <i className="fas fa-rupee-sign" />
                        )
                      }
                      Salary
                    </p>
                    <span className="text">
                      {jobDetail?.salary_Offered &&
                        jobDetail?.max_Salary_Offered && jobDetail?.isScraped == 0
                        ? `${getPrice(jobDetail?.salary_Offered)}-${getPrice(jobDetail?.max_Salary_Offered)}`
                        : "Not Disclosed"}
                      {getSalaryType(jobDetail?.base)}
                    </span>
                  </li>
                  <li>
                    <p className="title">
                      <i className="bi-briefcase-fill" />
                      Job Type
                    </p>
                    {/* <span className="text"> */}
                    {jobDetail?.job_Type?.length
                      ? jobDetail?.job_Type
                        .map((item) => {
                          return jobTypeFunc(item);
                        })
                        .join(", ")
                      : "Full Time"}
                    {/* </span> */}
                  </li>
                  {
                    jobDetail?.created_By == seekerId && (
                      <li
                        onClick={() => handleCandidate()}
                        style={{ cursor: "pointer" }}
                      >
                        <p className="title candidateAppliedIcon">
                          <i className="bi-geo-alt-fill" />
                          Candidate Applied
                          <i className="bi bi-chevron-right mx-2" />
                        </p>
                        <span className="text ApplyCondidatesNumber">
                          {jobDetail?.no_Of_Candidates}
                        </span>
                      </li>
                    )
                  }
                </ul>

                <div className="desc_area ">
                  <h5 className="jobtitle">Description</h5>
                  <p className="text ">{jobDetail?.description ? jobDetail?.description : 'No Description'}</p>
                </div>
                {jobDetail?.job_Type
                  ? jobDetail?.job_Type.map((item, index) => {
                    return (
                      <button
                        key={index}
                        type="button"
                        className="btn btns tags active"
                      >
                        {jobTypeFunc(item)}
                      </button>
                    );
                  })
                  : ""}

                <div className="desc_area">
                  <h5 className="jobtitle">Availablity</h5>
                  <ul>
                  <li>
                    Monday{" "}
                    <span>{`${jobDetail?.availablity?.monday?.from || ''} ${jobDetail?.availablity?.monday?.to || ''}`}</span>
                  </li>
                  <li>
                    Tuesday{" "}
                    <span>{`${jobDetail?.availablity?.tuesday?.from || ''} ${jobDetail?.availablity?.tuesday?.to || ''}`}</span>
                  </li>
                  <li>
                    Wednesday{" "}
                    <span>{`${jobDetail?.availablity?.wednesday?.from || ''} ${jobDetail?.availablity?.wednesday?.to || ''}`}</span>
                  </li>
                  <li>
                    Thursday{" "}
                    <span>{`${jobDetail?.availablity?.thursday?.from || ''} ${jobDetail?.availablity?.thursday?.to || ''}`}</span>
                  </li>
                  <li>
                    Friday{" "}
                    <span>{`${jobDetail?.availablity?.friday?.from || ''} ${jobDetail?.availablity?.friday?.to || ''}`}</span>
                  </li>
                  {jobDetail?.availablity?.saturday?.from && (
                    <li>
                      Saturday{" "}
                      <span>{`${jobDetail?.availablity?.saturday?.from} ${jobDetail?.availablity?.saturday?.to}`}</span>
                    </li>
                  )}
                  {jobDetail?.availablity?.sunday?.from && (
                    <li>
                      Sunday{" "}
                      <span>{`${jobDetail?.availablity?.sunday?.from} ${jobDetail?.availablity?.sunday?.to}`}</span>
                    </li>
                  )}
                </ul>

                </div>
              </div>
              <div className="row">
                <div className={"col-lg-12"}>
                  <div className="dashboard_bar style_two with_map job_box jobDetailsMap">
                    <h5 className="jobtitle">Job Location</h5>
                    <div className="map_area">
                      <LocationMap
                        mapLat={jobDetail?.latitude || "-37.840935"}
                        mapLong={jobDetail?.longitude || "144.946457"}
                        setEtas={setEtas}
                        type="details"
                        latLong={latLong}
                      />
                    </div>
                    <div className="location_text">
                      <div className="travel_type_group">
                        {eta?.drive && (
                          <button className="travel_type active">
                            <i className="far fa-car" />
                            {eta?.drive}
                          </button>
                        )}
                        {eta?.bus && (
                          <button className="travel_type">
                            <i className="far fa-subway" />
                            {eta?.bus}
                          </button>
                        )}
                        {eta?.walk && (
                          <button className="travel_type">
                            <i className="far fa-hiking" />
                            {eta?.walk}
                          </button>
                        )}
                        {eta?.bike && (
                          <button className="travel_type">
                            <i className="bi-bicycle" />
                            {eta?.bike}
                          </button>
                        )}
                      </div>
                      <p className="text-black fs-6">
                        <i className="fas fa-map-marker-alt me-2" />
                        {jobDetail?.location ||
                          "3554 Jefferson Street. Hampton, US"}
                      </p>
                      {/* <button type="button" className="btn btn-warning">
                        Calculated Estimated Time
                      </button> */}
                    </div>
                  </div>
                </div>
                {/* {userType == 3 ? <div className="col-lg-6">
                  <div className="job-details-qrbox">
                    <h3>Scan Job Code</h3>
                    <div className="preview-job-qr-modal">
                      {
                        (currentSubscriptionPlan?.qrType == 0 || currentSubscriptionPlan?.qrType == 1) ?
                          <Type1 jobDetails={jobDetail} />
                          :
                          currentSubscriptionPlan?.qrType == 2 ?
                            <Type3 jobDetails={jobDetail} />
                            :
                            currentSubscriptionPlan?.qrType == 3 ?
                              <Type2 jobDetails={jobDetail} />
                              :
                              <Type1 jobDetails={jobDetail} />
                      }

                    </div>

                    {qrType == 2 ? <Type3 jobDetails={jobDetails} /> : <></>}
                    {qrType == 3 ? <Type2 jobDetails={jobDetails} /> : <></>}

                    <div className="jd-qrbox-inner">
                      <img src="/assets/images/qr-code-white.png" />
                    </div>

                    <ul className="jd-qrbox-bottom">
                      <li className="qrbox-bottom-inner" onClick={handleShowPreview}>
                        <img src="/assets/images/icons/view.svg" alt="view" />
                        <span className="qrbox-bottom-text">View</span>
                      </li>
                      <li className="qrbox-bottom-inner">
                        <img src="/assets/images/icons/share1.svg" alt="share" />
                        <span className="qrbox-bottom-text">Share</span>
                      </li>
                      <li className="qrbox-bottom-inner">
                        <img src="/assets/images/icons/print.svg" alt="Print" />
                        <span className="qrbox-bottom-text">Print</span>
                      </li>
                    </ul>
                  </div>
                </div> : <></>} */}
              </div>
            </div>
            <div className="col-xl-3">
              <div className="dashboard_bar job_box sidebar d-block">
                <h3 className="title">Job Details</h3>
                <ul className="job_info d-inline-block">
                  {jobDetail?.no_Of_Vacancy ? (
                    <li>
                      <p>Vacancies</p>
                      {jobDetail?.no_Of_Vacancy}
                    </li>
                  ) : (
                    <></>
                  )}
                  {jobDetail?.min_education ? (
                    <li>
                      <p>Education</p>
                      {jobDetail?.min_education}
                    </li>
                  ) : (
                    <></>
                  )}
                  <li>
                    <p>Experience</p>
                    {jobDetail?.min_Experience
                      ? `${jobDetail?.min_Experience} Year(s)`
                      : "Newbie"}
                  </li>
                  <li style={{ textTransform: "capitalize" }}>
                    <p>Gender Preference</p>
                    {jobDetail?.gender
                      ? typeof jobDetail?.gender == "object"
                        ? jobDetail?.gender.join("/")
                        : JSON.parse(jobDetail?.gender).join("/")
                      : `Male / Female`}
                  </li>
                  <li>
                    <p>Special requirements</p>
                    {jobDetail?.special_Requirement.length ? jobDetail?.special_Requirement.map((item, i) => (
                      <div key={i}>{item?.special_requirements}</div>
                    )) : 'No Special requirements'}
                  </li>
                  <li>
                    <p>Visa requirement</p>
                    {jobDetail?.visa_type ? jobDetail.visa_type : 'Not Specified'}
                  </li>
                  <li>
                    <p>Language Preference</p>
                    {jobDetail?.language_preference ?
                      jobDetail?.language_preference
                        .map((item) => item.language)
                        .join(",") : 'English'}
                  </li>
                </ul>
              </div>

              <div className="dashboard_bar job_box sidebar d-block">
                <h3 className="title" style={{ marginBottom: "16px" }}>
                  Posted by
                </h3>
                <div className="userbox">
                  <img
                    src={
                      jobDetail?.companyLogo
                        ? jobDetail?.companyLogo
                        : "https://ui-avatars.com/api/?name="+jobDetail?.company+"&background=random&color=fff&bold=true"
                    }
                    alt="img"
                    className="image-fit rounded-circle"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://ui-avatars.com/api/?name="+jobDetail?.company+"&background=random&color=fff&bold=true";
                    }}
                  />
                  <h6 className="name">{jobDetail?.job_Poster_Name}</h6>
                  <p>
                    {jobDetail?.posting_Date
                      ? jobDetail?.posting_Date.split("T")[0]
                      : ""}
                  </p>
                </div>
              </div>

              <div className="dashboard_bar job_box sidebar d-block">
                <div className="desc_area">
                  <h5 className="jobtitle">Refer a friend</h5>
                  <p className="text">
                    Do you want a friend to apply for this job?
                  </p>
                </div>
                <form className="d-table refer w-100">
                  {error && <Alert variant="danger">{error}</Alert>}
                  <div className="form-group">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setError("")
                        setName(e.target.value);
                      }}
                      name="name"
                      id="name"
                      placeholder="Name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setError("")
                        setEmail(e.target.value);
                      }}
                      name="email"
                      id="email"
                      placeholder="Enter email ID of a friend"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      value={phone}
                      onChange={(e) => {
                        setError("")
                        setPhone(e.target.value);
                      }}
                      name="email"
                      id="email"
                      placeholder="Enter phone no. of a friend"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className="btn btn-warning"
                      onClick={referAFriendFunc}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              {/* )} */}
            </div>
          </div>
          {/* Details */}
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />{" "}
      </main>

      {/* <JobPlanModal showPlanModal={showPlanModal} closeModal={handleClose}/> */}
      {/* <PreviewJobQrCode showModal={showPreviewModal} closeModal={handleClosePreview}
        qrType={currentSubscriptionPlan?.qrType == 0 ? 1 : currentSubscriptionPlan?.qrType}
        jobDetails={jobDetail}
      /> */}
    </Fragment >
  );
};

export default JobDetails;
