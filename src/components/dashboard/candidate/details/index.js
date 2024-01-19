import { Fragment, useEffect } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import { Dropdown, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Filter from "components/shared/filter";
import { BASE_URL } from "constants/constants";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "helper/helper";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import moment from "moment";

import {
  candidateShortlist,
  getCandidateDetail,
  scheduleInterview,
} from "redux/actions/jobBrowse";
import { TimeSchedule } from "constants/constants";
import { createChannelForUser, sendEmail } from "redux/actions/workActions";
import Loader from "components/shared/loader";
import { parse } from "path";

const AppliedCandidateDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { candidateDetails, candidateStatus, loading } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  const { channelStatus, ChatListData } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  // console.log("candidateDetails ==>>", candidateDetails)
  // console.log("candidateStatus ==>>", candidateStatus)

  const [startDate, setStartDate] = useState(null);
  const [startnewDate, setStartnewDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [show, setShow] = useState(false);
  const [mailshow, setMailShow] = useState(false);
  const [callshow, setCallShow] = useState(false);
  const [scheduleshow, setScheduleShow] = useState(false);
  const [showButton, setButtonShow] = useState(false);
  const [showStatus, setstatusshow] = useState(false);
  const [candidateData, setCandidateData] = useState(null);
  const [jobid, setJobid] = useState(null);
  const [clicked, setClicked] = useState(() => false);
  // update status
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  // email
  const mailerClose = () => setMailShow(false);
  const mailerOpen = () => {
    setMailShow(true);
  };
  // Phone
  const callClose = () => setCallShow(false);
  const callOpen = () => {
    setCallShow(true);
  };
  // Schedule
  const scheduleClose = () => setScheduleShow(false);
  const scheduleOpen = () => {
    setScheduleShow(true);
  };

  const handleStatus = (status, id) => {
    const obj = {
      id: id,
      status: status,
    };
    dispatch(candidateShortlist(obj));
  };

  useEffect(() => {
    if (candidateStatus) {
      // setstatusshow(true);
      findCandidateDetails();
      // if (candidateStatus == "SHORTLISTED") {
      //   setButtonShow(true);
      // } else if (candidateStatus == "REJECTED") {
      //   setButtonShow(false);
      // }
    }
  }, [candidateStatus])

  useEffect(() => {
    if (channelStatus && clicked) {
      // router?.push("/chat");
      window.location.href = "/chat";
    }
  }, [channelStatus]);

  useEffect(() => {
    if (candidateDetails !== null) {
      const detailData =
        candidateDetails?.experience?.experience[
        candidateDetails?.experience?.experience.length - 1
        ];
      setCandidateData(detailData);
    }
  }, [candidateDetails]);
  const skillData = [];
  const handleRejection = (status, id) => {
    const obj = {
      id: id,
      status: status,
    };
    dispatch(candidateShortlist(obj));
    if (candidateStatus) {
      handleClose();
    }
  };
  const handleChat = () => {
    if (candidateDetails?.isChannelActive && candidateDetails?.channelId != 0) {
      // router.push("/chat");
      window.location = "/chat";
    } else {
      const obj = {
        responderId: candidateDetails?.userId,
      };
      dispatch(createChannelForUser(obj));
      setClicked(true);
    }
  };

  const findCandidateDetails = () => {
    if (router?.query?.id && router?.query?.id != "undefined") {
      dispatch(
        getCandidateDetail({
          id: router?.query?.id,
          jobId: localStorage.getItem("jobId"),
        })
      );
    }
  }

  useEffect(() => {
    // dispatch(getCandidateDetail(router?.query?.id));
    findCandidateDetails();
  }, [router?.query?.id]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const jobId = localStorage.getItem("jobId");
      setJobid(jobId);
    }
  }, []);
  const formatDate = (date) => {
    let dte = date.split("/");
    return `${dte[1]}/${dte[0]}/${dte[2]}`;
  };
  const handleSchedule = () => {
    const obj = {
      candidateId: candidateDetails?.userId,
      Job_Id: jobid,
      Platform_Link: "",
      Date: formatDate(new Date(startDate).toLocaleDateString()),
      to_time: `${endTime}:00`,
      from_time: `${startTime}:00`,
      Duration: 0,
      Is_Virtual: 1,
      Result_Remarks: "",
      Interview_Location_Same: 0,
      Interview_Option: "",
      Country: "",
      Zip_Cod: "",
      City: "",
      State: "",
      Need_Video_Intro: 0
    };
    dispatch(scheduleInterview(obj));
    scheduleClose();
  };

  const [email, setEmail] = useState(() => "");

  const sendMail = (e) => {
    e.preventDefault();

    // dispatch(sendEmail({}))

    setMailShow(false);
    setEmail("");
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
          <TopBar />
          {/* TopBar */}

          {/* Content Box */}
          {/* {loading && <Loader />} */}
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-5 col-xs-12">
              <div className="mb-4">
                <div className="dashboard_title_bar">
                  <h3 className="title">Job Seeker Detail</h3>
                </div>
                
                <div className="v_card fixed-height mb-5" style={{marginTop: "35px"}}>
                  <div className="image">
                    <img
                      src={`${candidateDetails?.profile_Pic ||
                        "/assets/images/user.png"
                        }`}
                      // src="/assets/images/user.png"
                      style={{ borderRadius: "50%" }}
                      className="image-fit"
                      alt="img"
                    />
                  </div>
                  <div
                    className="card_content section-bg no-overlay"
                    style={{
                      background:
                        "center / cover no-repeat url(" +
                        BASE_URL +
                        "/../assets/images/v_card_bg.png),transparent linear-gradient(90deg, #0000FF 0%, #1CB5E0 100%)",
                    }}
                  >
                    <div className="top_actions">
                      <img
                        src={`/assets/images/icons/vaccine/white/${(candidateDetails?.vaccination_Status == 1 &&
                          "singleDose") ||
                          (candidateDetails?.vaccination_Status == 2 &&
                            "doubleDose") ||
                          (candidateDetails?.vaccination_Status == 3 &&
                            "tripleDose") ||
                          "notVaccinated"
                          }.svg`}
                        alt="icon"
                      />
                      <button type="button" className="mode">
                        {candidateDetails?.shift == 2 && (
                          <img
                            src={`${candidateDetails?.shift == 2 &&
                              "/assets/images/moon.svg"
                              }`}
                            alt="icon"
                          />
                        )}
                      </button>
                    </div>
                    <div className="user_info">
                      <h5 className="name">
                        {candidateDetails?.first_Name
                          ? `${candidateDetails?.first_Name} ${candidateDetails?.last_Name}`
                          : "John Doe"}
                      </h5>
                      <p className="designation">
                        {candidateData?.job_Title || ""}
                      </p>
                      <ul className="user_data">
                        <li>
                          <span className="icon">
                            <img
                              src={"/assets/images/icons/experience.svg"}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {candidateDetails?.totalExperience
                            ? `${candidateDetails?.totalExperience}`
                            : "0 years"}
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src={"/assets/images/icons/location.svg"}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {candidateDetails?.location
                            ? candidateDetails?.location.split(",")[0]
                            : ""}
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src={"/assets/images/icons/language.svg"}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {candidateDetails?.language
                            ? candidateDetails?.language[0].language
                            : ""}
                        </li>
                      </ul>
                      {!!candidateDetails?.skills?.skills?.length ? (
                        <>
                          {candidateDetails?.skills?.skills?.map((item) => (
                            <button
                              type="button"
                              className="tag"
                              key={item?.skill_Id}
                            >
                              {item?.skill}
                            </button>
                          ))}
                        </>
                      ) : (
                        <>
                          {skillData?.map((item) => (
                            <button
                              type="button"
                              className="tag"
                              key={item?.id}
                            >
                              {item?.name}
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {
                  candidateDetails && (candidateDetails?.applicationStatus == 2) && (
                    <div className="text-center my-3">
                      <span className="fw-600">Status: </span> Shortlisted
                    </div>
                  )
                }

                {
                  candidateDetails && (candidateDetails?.applicationStatus == 3) && (
                    <div className="text-center my-3">
                      <span className="fw-600">Status: </span> Rejected
                    </div>
                  )
                }

                {
                  candidateDetails && (candidateDetails?.applicationStatus == 4) && (
                    <div className="text-center my-3">
                      <span className="fw-600">Status: </span> In Progress
                    </div>
                  )
                }

                {
                  candidateDetails && (candidateDetails?.applicationStatus == 5) && (
                    <div className="text-center my-3">
                      <span className="fw-600">Status: </span> Hired
                    </div>
                  )
                }


                {/* buttons */}
                {candidateDetails && (candidateDetails?.applicationStatus == 2) ? (
                  <>
                    <div className="space-btns shotlisted-btn row">
                      <div className="col-xl-6 col-md-6 col-12">
                        <button
                          type="button"
                          className="btn-square btn-wh"
                          onClick={() => scheduleOpen()}
                        >
                          Schedule Interview
                        </button>
                      </div>
                      {/* <div className="col-xl-6 col-md-6 col-12">
                          <button
                            type="button"
                            className="btn-square btn-wh"
                          // onClick={() => callOpen()}
                          >
                            <a href={`tel:${candidateDetails?.phone_No}`}>
                              Call
                            </a>
                          </button>
                        </div> */}
                      <div className="col-xl-6 col-md-6 col-12">
                        <button
                          type="button"
                          className="btn-square btn-wh"
                        // onClick={() => mailerOpen()}
                        >
                          <a href={`mailto:${candidateDetails?.email}`}>
                            Email
                          </a>
                        </button>
                      </div>
                      {/* <div className="col-xl-6 col-md-6 col-12">
                          <button
                            type="button"
                            className="btn-square btn-default btn-wh"
                            onClick={() => handleChat()}
                          >
                            Chat
                          </button>
                        </div> */}
                    </div>
                  </>
                ) : (
                  ""
                )}
                {/*buttons end here */}
                {candidateDetails && (candidateDetails?.applicationStatus == 2 || candidateDetails?.applicationStatus == 3) && (
                  <div className="status-update text-center mt-3">
                    <button
                      type="button"
                      className="btn-square btn-grey"
                      onClick={() => handleShow()}
                    >
                      Update Status
                    </button>
                  </div>
                )}
              </div>

              {/* reject & shortlist */}
              {candidateDetails && (candidateDetails?.applicationStatus == 1) && (
                <>
                  <div className="space-btns shortlist-btns row">
                    <div className="col-xl-6 col-md-6 col-12">
                      <button
                        type="button"
                        className="btn-square btn-wh"
                        onClick={() =>
                          handleRejection(3, candidateDetails?.userProfileId)
                        }
                      >
                        Reject
                      </button>
                    </div>
                    <div className="col-xl-6 col-md-6 col-12">
                      <button
                        type="button"
                        className="btn-square btn-default btn-wh"
                        onClick={() =>
                          handleStatus(2, candidateDetails?.userProfileId)
                        }
                      >
                        Shortlist
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-xl-6 col-md-12 offset-xl-1 offset-md-0">
              <div className="side-data-scroll">
                {/* Work experience */}
                <div className="card profile_box">
                  <div className="card-header">
                    <h5 className="card-title">
                      <span className="icon">
                        <img
                          src={"/assets/images/icons/profile/bag_dark.svg"}
                          alt="icon"
                          className="image-fit-contain"
                        />
                      </span>
                      Work Experience
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="flex-list list-data">
                      <div className="flex-item left">
                        <p>Organisation</p>
                      </div>
                      <div className="flex-item right">
                        <p>{candidateData?.company || ""}</p>
                      </div>
                    </div>
                    <div className="flex-list list-data">
                      <div className="flex-item left">
                        <p>Designation</p>
                      </div>
                      <div className="flex-item right">
                        <p>{candidateData?.job_Title || ""}</p>
                      </div>
                    </div>
                    <div className="flex-list list-data">
                      <div className="flex-item left">
                        <p>Experience</p>
                      </div>
                      <div className="flex-item right">
                        <p>
                          {candidateDetails?.totalExperience
                            ? `${candidateDetails?.totalExperience}`
                            : "0 years"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Work experience end */}

                {/* Skills Card start */}

                <div className="card profile_box">
                  <div className="card-header">
                    <h5 className="card-title">
                      <span className="icon">
                        <img
                          src={"/assets/images/icons/profile/skills.svg"}
                          alt="icon"
                          className="image-fit-contain"
                        />
                      </span>
                      Skills
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="tag-list pb-3">
                      <ul>
                        {!!candidateDetails?.skills?.skills?.length ? (
                          <>
                            {candidateDetails?.skills?.skills?.map((item) => (
                              <li key={item?.skill_Id}>
                                <a href="#">{item?.skill}</a>
                              </li>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Skills Card ends */}

                {/* Education card start */}

                <div className="card profile_box">
                  <div className="card-header">
                    <h5 className="card-title">
                      <span className="icon">
                        <img
                          src={"/assets/images/icons/profile/education.svg"}
                          alt="icon"
                          className="image-fit-contain"
                        />
                      </span>
                      Education
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="flex-list list-data">
                      <div className="flex-item left">
                        <p>Qualification:</p>
                      </div>
                      <div className="flex-item right">
                        <p>{candidateDetails?.qualification || ""}</p>
                      </div>
                    </div>
                    <div className="flex-list list-data">
                      <div className="flex-item left">
                        <p>College/University</p>
                      </div>
                      <div className="flex-item right">
                        <p>{candidateDetails?.university || ""}</p>
                      </div>
                    </div>
                    {/* <div className="flex-list list-data">
                      <div className="flex-item left">
                        <p>Specialization</p>
                      </div>
                      <div className="flex-item right">
                        <p>{candidateData?.specialization || ""}</p>
                      </div>
                    </div> */}
                  </div>
                </div>
                {/* Education card end */}

                {/* Job Preference Card start */}

                <div className="card profile_box">
                  <div className="card-header">
                    <h5 className="card-title">
                      <span className="icon">
                        <img
                          src={"/assets/images/icons/profile/jobPre.svg"}
                          alt="icon"
                          className="image-fit-contain"
                        />
                      </span>
                      Job Preference
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="flex-list list-data">
                      <div className="flex-item left">
                        <p className="me-2">Type of Job:</p>
                      </div>
                      <div className="flex-item right">
                        <p>
                          {candidateDetails?.preffered_Job_Type &&
                            candidateDetails?.preffered_Job_Type
                              .map((item) => item.Job_Type)
                              .join(",")}
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex-list list-data">
                      <div className="flex-item left">
                        <p>Job Preference:</p>
                      </div>
                      <div className="flex-item right">
                        {typeof candidateDetails?.job_Preference == "object"
                          ? candidateDetails?.job_Preference.join(",")
                          : typeof candidateDetails?.job_Preference == "string"
                          ? candidateDetails?.job_Preference
                          : candidateDetails?.job_Preference}
                      </div>
                    </div> */}
                    {/* <div className="flex-list list-data">
                      <div className="flex-item left">
                        <p>Shift:</p>
                      </div>
                      <div className="flex-item right">
                        <p>{candidateDetails?.shift}</p>
                      </div>
                    </div> */}
                    <div className="flex-list list-data align-items-start">
                      <div className="flex-item left">
                        <p className="me-2">Location</p>
                      </div>
                      <div className="flex-item right text-end">
                        <p>
                          {candidateDetails?.job_Location}
                        </p>
                      </div>
                    </div>
                    <div className="flex-list list-data">
                      <div className="flex-item left">
                        <p className="me-2">Language</p>
                      </div>
                      <div className="flex-item right">
                        <p>
                          {candidateDetails?.language
                            ? candidateDetails?.language[0].language
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Job preference Card ends */}

                {/* Set Availability Card start*/}
                <div className="card profile_box">
                  <div className="card-header">
                    <h5 className="card-title">
                      <span className="icon">
                        <img
                          src={"/assets/images/icons/profile/jobPre.svg"}
                          alt="icon"
                          className="image-fit-csontain"
                        />
                      </span>
                      Set Availability
                    </h5>
                  </div>
                  <div className="card-body">
                    {candidateDetails?.availablities?.monday?.from && (
                      <div className="flex-list list-data">
                        <div className="flex-item left">
                          <p>Monday</p>
                        </div>
                        <div className="flex-item right">
                          <p>{`${candidateDetails?.availablities?.monday?.from} to ${candidateDetails?.availablities?.monday?.to}`}</p>
                        </div>
                      </div>
                    )}
                    {candidateDetails?.availablities?.tuesday?.from && (
                      <div className="flex-list list-data">
                        <div className="flex-item left">
                          <p>Tuesday</p>
                        </div>
                        <div className="flex-item right">
                          <p>{`${candidateDetails?.availablities?.tuesday?.from} to ${candidateDetails?.availablities?.tuesday?.to}`}</p>
                        </div>
                      </div>
                    )}
                    {candidateDetails?.availablities?.wednesday?.from && (
                      <div className="flex-list list-data">
                        <div className="flex-item left">
                          <p>Wednesday</p>
                        </div>
                        <div className="flex-item right">
                          <p>{`${candidateDetails?.availablities?.wednesday?.from} to ${candidateDetails?.availablities?.wednesday?.to}`}</p>
                        </div>
                      </div>
                    )}
                    {candidateDetails?.availablities?.thursday?.from && (
                      <div className="flex-list list-data">
                        <div className="flex-item left">
                          <p>Thursday</p>
                        </div>
                        <div className="flex-item right">
                          <p>{`${candidateDetails?.availablities?.thursday?.from} to ${candidateDetails?.availablities?.thursday?.to}`}</p>
                        </div>
                      </div>
                    )}
                    {candidateDetails?.availablities?.friday?.from && (
                      <div className="flex-list list-data">
                        <div className="flex-item left">
                          <p>Friday</p>
                        </div>
                        <div className="flex-item right">
                          <p>{`${candidateDetails?.availablities?.friday?.from} to ${candidateDetails?.availablities?.friday?.to}`}</p>
                        </div>
                      </div>
                    )}
                    {candidateDetails?.availablities?.saturday?.from && (
                      <div className="flex-list list-data">
                        <div className="flex-item left">
                          <p>Saturday</p>
                        </div>
                        <div className="flex-item right">
                          <p>{`${candidateDetails?.availablities?.saturday?.from} to ${candidateDetails?.availablities?.saturday?.to}`}</p>
                        </div>
                      </div>
                    )}
                    {candidateDetails?.availablities?.saturday?.from && (
                      <div className="flex-list list-data">
                        <div className="flex-item left">
                          <p>Sunday</p>
                        </div>
                        <div className="flex-item right">
                          <p>{`${candidateDetails?.availablities?.sunday?.from} to ${candidateDetails?.availablities?.sunday?.to}`}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Set Availability Card End*/}

                {/* Contact info */}

                {candidateDetails &&
                  (candidateDetails?.applicationStatus == 2 || candidateDetails?.applicationStatus == 4 || candidateDetails?.applicationStatus == 5) && (
                    <div className="card profile_box">
                      <div className="card-header">
                        <h5 className="card-title">
                          <span className="icon">
                            <img
                              src={"/assets/images/icons/phone_dark.svg"}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          Contact Info
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="flex-list list-data">
                          <div className="flex-item left">
                            <p>Email Id</p>
                          </div>
                          <div className="flex-item right">
                            <p className="text-primary">
                              {candidateDetails?.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex-list list-data">
                          <div className="flex-item left">
                            <p>Phone Number</p>
                          </div>
                          <div className="flex-item right">
                            <p>{candidateDetails?.phone_No}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                {/* Contact info card end */}
              </div>
            </div>
          </div>
          {/* Content Box */}
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />
      </main>

      {/* Modal for update status */}
      <Modal
        size="sm"
        className="custom_modal"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="justify-center">
          <Modal.Title className="fw-600 text-center">
            Update Status
          </Modal.Title>
          <button
            type="button"
            className="btn-close m-0"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="text-data-modal text-center">
            {
              candidateDetails && (candidateDetails?.applicationStatus == 2) && (
                <p>
                  Are you sure you want to reject the candidate from the shortlist ?
                </p>
              )
            }
            {
              candidateDetails && (candidateDetails?.applicationStatus == 3) && (
                <p>
                  Are you sure you want to shorlist the rejected candidates ?
                </p>
              )
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-warning mx-auto w-75"
            onClick={() => {
              if (candidateDetails && (candidateDetails?.applicationStatus == 2)) {
                handleRejection(3, candidateDetails?.userProfileId)
              } else if (candidateDetails && (candidateDetails?.applicationStatus == 3)) {
                handleStatus(2, candidateDetails?.userProfileId)
              }
              setShow(false);
            }}
          >
            Confirm <i className="fal fa-long-arrow-right"></i>
          </button>
        </Modal.Footer>
      </Modal>
      {/* Modal end for update status */}

      {/* Modal for Email data */}
      <Modal
        size="sm"
        className="custom_modal"
        centered
        show={mailshow}
        onHide={mailerClose}
      >
        <Modal.Header className="justify-center">
          <Modal.Title className="fw-600 text-center">
            Send an email
          </Modal.Title>
          <button
            type="button"
            className="btn-close m-0"
            aria-label="Close"
            onClick={mailerClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <form className="setavailablity">
            <div className="form-group">
              <label htmlFor="message"></label>
              <textarea
                type="textarea"
                className="form-control radius-15"
                rows="6"
                name="messageData"
                id="messageData"
                placeholder="Write Message here"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-warning mx-auto w-75"
            onClick={sendMail}
          >
            Submit <i className="fal fa-long-arrow-right"></i>
          </button>
        </Modal.Footer>
      </Modal>
      {/* Modal end for Email data end */}

      {/* Modal for Call data */}
      <Modal
        size="md"
        className="custom_modal"
        centered
        show={callshow}
        onHide={callClose}
      >
        <Modal.Header className="justify-center">
          <Modal.Title className="fw-600 text-center">
            Phone Details
          </Modal.Title>
          <button
            type="button"
            className="btn-close m-0"
            aria-label="Close"
            onClick={callClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="text-data-modal text-center">
            <label className="form-check-label justify-content-start mb-2 text-black fw-500">
              <span className="icon">
                <img src={"/assets/images/icons/phone_dark.svg"} alt="icon" />
              </span>
              <span className="m-3">
                Phone Number: {candidateDetails?.phone_No}
              </span>
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* Modal end for Call data end */}

      {/* Modal for schedule data */}
      <Modal
        size="md"
        className="custom_modal"
        centered
        show={scheduleshow}
        onHide={scheduleClose}
      >
        <Modal.Header className="justify-center">
          <Modal.Title className="fw-600 text-center">
            Schedule an interview
          </Modal.Title>
          <button
            type="button"
            className="btn-close m-0"
            aria-label="Close"
            onClick={scheduleClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <form className="formStatus">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <div
                    className="input-group date_style"
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      className="form-control"
                      placeholder="Interview Date"
                      type="date"
                      id="start"
                      min={moment(new Date()).format('YYYY-MM-DD')}
                      name="trip-start"
                      value={startDate || ''}
                      onChange={(e) => {
                        // console.log(e.target.value);
                        setStartDate(moment(e?.target?.value).format('YYYY-MM-DD'));
                      }}
                    />
                    {/* <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        console.log(date);
                        setStartDate(date);
                      }}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      className="form-control"
                      placeholderText="Interview Date"
                      id="startDate"
                      name="startDate"
                    />
                    <div className="input-group-append">
                      <button type="button" className="input-group-text">
                        <i className="fal fa-calendar-alt" />
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <label className="label">Interview Time Slot</label>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="input-group date_style">
                    <TimePicker
                      className="form-control"
                      name="startTime"
                      value={startTime}
                      onChange={(e) => setStartTime(e)}
                      required
                    />
                    {/* <select
                      className="form-control form-select"
                      name="startTime"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    >
                      {TimeSchedule.map((el, i) => (
                        <option key={i} value={el?.value}>
                          {el?.name}
                        </option>
                      ))}
                    </select> */}

                    <div className="input-group-append">
                      <button type="button" className="input-group-text">
                        {/* <i className="fal fa-calendar-alt" /> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="input-group date_style">
                    <TimePicker
                      className="form-control"
                      name="endTime"
                      value={endTime}
                      onChange={(e) => setEndTime(e)}
                      required
                    />
                    {/* <select
                      className="form-control form-select"
                      name="endTime"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    >
                      {TimeSchedule.map((el, i) => (
                        <option key={i} value={el?.value}>
                          {el?.name}
                        </option>
                      ))}
                    </select> */}
                    <div className="input-group-append">
                      <button type="button" className="input-group-text">
                        {/* <i className="fal fa-calendar-alt" /> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <span style={{ color: "red" }}>
              Note - The interview will be scheduled as per
              Melbourne/Sydney/Canberra time.
            </span> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-warning mx-auto w-75"
            onClick={handleSchedule}
          >
            Confirm <i className="fal fa-long-arrow-right"></i>
          </button>
        </Modal.Footer>
      </Modal>
      {/* Modal end for Schedule data end */}
    </Fragment>
  );
};

export default AppliedCandidateDetails;
