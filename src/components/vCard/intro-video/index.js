import { Fragment, useState, useRef, useEffect } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Modal, Row } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import { BASE_URL } from "constants/constants";
import FileUpload from "components/fileUploader";
import { useDispatch, useSelector } from "react-redux";
import { saveUserSetting } from "redux/actions/vcardActions";
import {
  getJobSeekerDetail,
  postPortfoliaData,
} from "redux/actions/workActions";
import Loader from "components/shared/loader";
// import FileUpload from "components/fileUploader";
import * as actions from "../../../redux/actions/vcardActions";

const IntroVideo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [seekerId, setSeekerId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [show, setShow] = useState(false);
  const [video, setVideo] = useState(1);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [state, setState] = useState({
    profileImage: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageShow, setImageShow] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageData1 = (file) => {
    setImage(file);
    // console.log(jobSeekerDetails);

    const vcardBasicDetails = {
      first_name: jobSeekerDetails?.first_name,
      last_name: jobSeekerDetails?.last_name,
      location: jobSeekerDetails?.location,
      vaccination_status: jobSeekerDetails?.vaccination_Status,
      gender: jobSeekerDetails?.gender,
      user_id: jobSeekerDetails?.user_Id,
      profile_pic: file.name || null,
      file: file,
      latitude: jobSeekerDetails?.latitude,
      longitude: jobSeekerDetails?.longuitude,
      image: file,
    };
    dispatch(actions.saveVcardBasicDetails(vcardBasicDetails));
  };
  const {
    jobSeekerDetails,
    workDetail2,
    educationDetail2,
    setAvailabilityDetail,
    loading,
    redirect,
  } = useSelector(({ vcardWorkReducer }) => vcardWorkReducer);
  // console.log("@@loading", loading);
  // console.log("@@redirect", redirect);
  const { basicDetail1, entity } = useSelector(({ vcardReducer }) => vcardReducer);

  // console.log(jobSeekerDetails);

  console.log(basicDetail1, entity)

  useEffect(() => {
    if(entity) {
      const localData = JSON.parse(localStorage.getItem("applyKart"));
      localData.profilePic = entity?.profilePic;
      localStorage?.setItem("applyKart", JSON.stringify(localData)); 
      window.location.href = "/dashboard?jobType=ALLJOBS";
    }
  },[entity])


  useEffect(() => {
    if (jobSeekerDetails == null) {
      dispatch(getJobSeekerDetail());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "GET_JOB_SEEKER_DETAIL_INIT" });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const { userId } = JSON.parse(applyKart);
      setSeekerId(userId);
    }
  }, [dispatch]);
  const handleVideoData = (file) => {
    setVideoData(file);
  };
  const onClickData = () => {
    // setShow(true);
    if (jobSeekerDetails?.preffered_job_type == "Freelance") {
      setShow(true);
    } else {
      const obj1 = {
        user_id: seekerId,
        action_type: "completed",
        value: 1,
      };
      dispatch(saveUserSetting(obj1));
      window.location.href="/dashboard";
    }
  };
  const onClick = (data) => {
    // console.log(data);
    if (data == "video" && videoData) {
      // if (data == "video") {
      setShowPopup(true);
      // }
    } else if (
      data == "novideo" &&
      jobSeekerDetails?.preffered_job_type == "Freelance"
    ) {
      setShow(true);
    } else if (jobSeekerDetails?.preffered_job_type == "Freelance") {
      setShow(true);
    } else {
      const obj = {
        user_id: seekerId,
        action_type: "completed",
        value: 1,
      };
      dispatch(saveUserSetting(obj));
    }

    // if (basicDetail1 && workDetail2 &&
    //   educationDetail2 &&
    //   setAvailabilityDetail) {

    // } else {
    //   const obj = {
    //     user_id: seekerId,
    //     action_type: "completed",
    //     value: 0,
    //   }
    //   dispatch(saveUserSetting(obj));
    //   router.push("/dashboard")
    // }
  };
  const skillData = [
    { id: 1, name: "React" },
    { id: 2, name: "Html" },
    { id: 3, name: "Redux" },
    { id: 4, name: "Asynchronous" },
  ];
  const vidRef = useRef(null);
  const radioHandler = (video) => {
    setVideo(video);
  };
  const handleClose = () => setShow(false);
  const handleCloseVideoPopup = () => {
    setShowPopup(false);
  };
  const handleShowPopup = () => {
    setShowPopup(true);
  };
  const handleShow = () => {
    setShow(true);
  };

  function handleFileChange(event) {
    if (event.target.value) {
      setImageShow(true);
    }
  }
  const handleSave = () => {
    const obj = {
      user_id: seekerId,
      title: title,
      description: description,
      image: fileName.name,
      file: fileName,
    };
    const obj1 = {
      user_id: seekerId,
      action_type: "completed",
      value: 1,
    };
    dispatch(saveUserSetting(obj1));
    dispatch(postPortfoliaData(obj));
  };
  useEffect(() => {
    if (redirect) {
      dispatch({ type: "SET_REDIRECT_FALSE" });
      window.localStorage.href = "/dashboard";
    }
  }, [redirect]);

  const handleImageData = (file) => {
    setFileName(file);
    setImageFile(URL.createObjectURL(file));
    setImageShow(true);
  };

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="style_two" logoUrl="assets/images/white-logo.svg" />
      <section className="relative full-height section-padding d-flex align-items-center">
        <div
          className="section-bg half-bg no-overlay"
          style={{
            backgroundImage: "url(/assets/images/bg/1.png)",
          }}
        ></div>
        <div className="d-flex align-items-center vh-height">
          <Container>
            {loading && <Loader />}
            <div className="row p-4 align-items-center">
              <div className="col-lg-6">
                <div className="v_card">
                  <div className="image">
                    <img
                      // URL.createObjectURL(fileName)
                      src={`${image
                          ? URL.createObjectURL(image)
                          : jobSeekerDetails?.profile_pic
                            ? jobSeekerDetails?.profile_pic
                            : BASE_URL + "/assets/images/default-user.png"
                        }`}
                      style={{ borderRadius: "50%" }}
                      className="image-fit"
                      alt="img"
                    />
                    <label
                      htmlFor="updateImage"
                      className="transform-center btn btn-circle btn-warning p-0"
                    >
                      <i className="bi-pencil ms-0" />
                      <FileUpload
                        fileData={"image"}
                        dataId={"updateImage"}
                        handleImageData={handleImageData1}
                      />
                    </label>
                    <button type="button"></button>
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
                        src={`/assets/images/icons/vaccine/white/${(jobSeekerDetails?.vaccination_Status == 1 &&
                            "singleDose") ||
                          (jobSeekerDetails?.vaccination_Status == 2 &&
                            "doubleDose") ||
                          (jobSeekerDetails?.vaccination_Status == 3 &&
                            "tripleDose") ||
                          "doubleDose"
                          }.svg`}
                        alt="icon"
                      />
                    </div>
                    <div className="user_info">
                      <h5 className="name text-capitalize ">
                        {jobSeekerDetails?.first_name
                          ? `${jobSeekerDetails?.first_name} ${jobSeekerDetails?.last_name}`
                          : ""}
                      </h5>
                      <p className="designation">
                        {jobSeekerDetails?.jobRole || ""}
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
                          {`${jobSeekerDetails?.totalExperience
                              ? jobSeekerDetails?.totalExperience
                              : "0 year"
                            }`}
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src={"/assets/images/icons/location.svg"}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {jobSeekerDetails?.location?.split(",")[0] || ""}
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src={"/assets/images/icons/language.svg"}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {jobSeekerDetails?.language &&
                            jobSeekerDetails?.language.length != 0
                            ? jobSeekerDetails?.language[0].language
                            : ""}
                        </li>
                      </ul>
                      {!!jobSeekerDetails?.skills.length ? (
                        <>
                          {jobSeekerDetails?.skills?.slice(0, 3).map((item) => (
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
              </div>
              <div className="col-lg-6">
                {video === 1 && (
                  <div className="vCard_textarea ps-lg-5">
                    <div className="section-header pb-0 mb-3">
                      <h3 className="title">V Card</h3>
                    </div>
                    <form>
                      <div className="form-group">
                        <label className="text-black mb-3">
                          Do you want to Upload a 30sec introduction video?
                        </label>
                        <div className="image_radio basic">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="video"
                              id="yes"
                              onClick={(e) => radioHandler(2)}
                              defaultChecked={video === 2}
                            />
                            <label
                              className="form-check-label mb-1"
                              htmlFor="yes"
                            >
                              <span className="icon">
                                <img
                                  src={
                                    "/assets/images/icons/radio/inactive.png"
                                  }
                                  alt="icon"
                                />
                                <img
                                  src={"/assets/images/icons/radio/active.png"}
                                  alt="icon"
                                />
                              </span>
                              <div className="text">Yes</div>
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="video"
                              id="no"
                              onClick={(e) => radioHandler(1)}
                              defaultChecked={video === 1}
                            />
                            <label
                              className="form-check-label mb-1"
                              htmlFor="no"
                            >
                              <span className="icon">
                                <img
                                  src={
                                    "/assets/images/icons/radio/inactive.png"
                                  }
                                  alt="icon"
                                />
                                <img
                                  src={"/assets/images/icons/radio/active.png"}
                                  alt="icon"
                                />
                              </span>
                              <div className="text">No</div>
                            </label>
                          </div>
                        </div>
                        <i className="text-black d-block mb-4">
                          An intro video can increase your chances of getting
                          hired by 30%
                        </i>
                      </div>
                    </form>
                    <div className="d-flex w-50">
                      <button
                        className="btn btn-warning mb-2 me-2"
                        type="button"
                        onClick={() => router.push("/vcard/set-availability")}
                      // onClick={() => handleShow()}
                      >
                        Back <i className="fal fa-long-arrow-left"></i>
                      </button>

                      <button
                        className="btn btn-warning mb-2"
                        type="button"
                        onClick={() => onClick("novideo")}
                      // onClick={() => handleShow()}
                      >
                        Next <i className="fal fa-long-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                )}
                {video === 2 && (
                  <div className="vCard_textarea ps-lg-5">
                    <div className="section-header">
                      <h3 className="title">Introduction Video</h3>
                    </div>
                    <FileUpload
                      setState={setState}
                      state={state}
                      fileData={"video"}
                      handleVideoData={handleVideoData}
                    />
                    <button
                      className="btn btn-warning w-50 mx-auto d-block  mt-5"
                      type="button"
                      onClick={() => onClick("video")}
                    >
                      Next <i className="fal fa-long-arrow-right"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </section>
      <Modal
        size="sm"
        className="custom_modal"
        centered
        show={showPopup}
        onHide={handleCloseVideoPopup}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <form className="setavailablity image_radio basic checkbox">
            <div className="form-group">
              <div className="form-check">
                <label
                  className="form-check-label justify-content-start mb-2 text-black fw-500"
                  htmlFor="typeTwo"
                >
                  Are you sure to upload a video ?
                </label>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            onClick={() => {
              handleCloseVideoPopup();
              onClickData();
            }}
            className="btn btn-warning mx-auto w-75"
          >
            Continue <i className="fal fa-long-arrow-right"></i>
          </button>
        </Modal.Footer>
      </Modal>
      <Modal className="custom_modal" centered show={show} onHide={handleClose}>
        <Modal.Body>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
          <div className="job_category justify-content-center">
            <div className="text text-center">
              <h5 className="title mb-0">My Portfolio</h5>
            </div>
          </div>
          <form>
            <div className="form-group">
              <label className="text-black fw-bold mb-2">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </div>
            <div className="form-group">
              <label className="text-black fw-bold mb-2">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write here..."
                required
              />
            </div>
            <div className="form-group image_choose">
              <label className="text-black fw-bold mb-0">Add Image</label>
              {!imageShow ? (
                <label className="image_area input" htmlFor="updateImage">
                  <img src={"/assets/images/icons/camera.png"} />
                  Attach Image
                  <FileUpload
                    fileData={"image"}
                    dataId={"updateImage"}
                    handleImageData={handleImageData}
                  />
                </label>
              ) : (
                <label className="image_area image" htmlFor="addimage">
                  <button type="button" className="remove">
                    x
                  </button>
                  <img src={imageFile?.trim() || "/assets/images/video_thumb.png"} />
                </label>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-warning w-50 d-block mx-auto"
            type="button"
            onClick={handleSave}
          >
            Save <i className="fal fa-long-arrow-right"></i>
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default IntroVideo;
