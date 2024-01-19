import { Fragment, useState, useRef, useEffect } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import Filter from "components/shared/filter";
import { BASE_URL } from "constants/constants";
import Router from "next/router";
import ReactPlayer from "react-player";
import { deleteVideoData, getJobSeekerDetail } from "redux/actions/workActions";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Loader from "components/shared/loader";
import { useRouter } from "next/router";
import { RWebShare } from "react-web-share";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import { toggleHamburger } from "helper/helper";

const MyVcard = () => {
  const history = Router;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("applyKart")) {
      router?.push("/login");
    }
  }, []);
  const [seekerId, setSeekerId] = useState(null);
  const { jobSeekerDetails, loading, showSuccessModal } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  // console.log("Job seeker details showSuccessModal", showSuccessModal);

  const skillData = [
    { id: 1, name: "React" },
    { id: 2, name: "Html" },
    { id: 3, name: "Redux" },
    { id: 4, name: "Asynchronous" },
  ];
  const [showPopup, setShowPopup] = useState(false);
  // const [videoUrl, setVideoUrl] = useState(jobSeekerDetails?.intro_video_link)

  const vidRef = useRef(null);
  const [videoPoster, setVideoPoster] = useState(false);
  const handlePlayVideo = () => {
    setVideoPoster(!videoPoster);
    vidRef.current.play();
  };
  useEffect(() => {
    if (jobSeekerDetails == null || showSuccessModal) {
      dispatch(getJobSeekerDetail());
    }
  }, [dispatch, showSuccessModal]);
  useEffect(() => {
    dispatch({ type: "GET_JOB_SEEKER_DETAIL_INIT" });
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const { userId } = JSON.parse(applyKart);
      setSeekerId(userId);
    }
  }, []);
  const handleDelete = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const onSubmitData = () => {
    const obj = {
      User_Id: seekerId,
      Intro_Video_Available: 0,
      Intro_Video_Link: null,
    };
    dispatch(deleteVideoData(obj));
  };

  useEffect(() => {
    if (jobSeekerDetails) {
      // console.log("encoded", base64_encode(jobSeekerDetails?.user_Id));
      console.log(
        "decoded",
        base64_decode(base64_encode(jobSeekerDetails?.user_Id))
      );
    }
  }, [jobSeekerDetails]);

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
            <div className="col-xl-12">
              <div className="dashboard_title_bar">
                <h3 className="title">My V-Card</h3>
              </div>
            </div>
          </div>
          {/* Content Box */}
          {loading && <Loader />}
          <div className="row">
            <div className="col-md-6">
              <div className="card profile_box mycard">
                <div className="card-header">
                  <h5 className="card-title">
                    <RWebShare
                      data={{
                        text: "Check this amazing oppurtunity",
                        url: `https://applykart.co/view/vcard/${base64_encode(
                          jobSeekerDetails?.user_Id
                        )}`,
                        title: "ApplyKart",
                      }}
                      onClick={() => console.log("shared successfully!")}
                    >
                      <button type="button" className="link share">
                        <img
                          src={"/assets/images/icons/share.svg"}
                          alt="icon"
                        />
                      </button>
                    </RWebShare>
                  </h5>
                </div>
                <div className="card-body pt-0">
                  <div className="v_card form-group">
                    <div className="image">
                      <img
                        src={`${jobSeekerDetails?.profile_pic ||
                          "/assets/images/default-user.png"
                          }`}
                        //src={`${jobSeekerDetails?.profile_pic || BASE_URL + "/assets/images/user.png"}`}
                        // src={BASE_URL + "/assets/images/user.png"}
                        style={{ borderRadius: "50%" }}
                        className="image-fit"
                        alt="img"
                      />
                    </div>
                    <div
                      className="card_content section-bg no-overlay"
                      style={{
                        background:
                          "center / cover no-repeat url(/../assets/images/v_card_bg.png),transparent linear-gradient(90deg, #0000FF 0%, #1CB5E0 100%)",
                      }}
                    >
                      <div className="user_info">
                        <h5 className="name text-capitalize ">
                          {jobSeekerDetails?.first_name
                            ? `${jobSeekerDetails?.first_name} ${jobSeekerDetails?.last_name}`
                            : "Jacqueline Baum"}
                        </h5>
                        <p className="designation">
                          {jobSeekerDetails?.worked_before == 1
                            ? jobSeekerDetails?.professionaldetails?.experience
                              .length != 0
                              ? jobSeekerDetails?.professionaldetails
                                ?.experience[0]?.job_Title
                              : ""
                            : "Newbie"}
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
                            {jobSeekerDetails?.job_location?.split(",")[0] ||
                              "Sydney"}
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
                              : "English"}
                          </li>
                        </ul>
                        {!!jobSeekerDetails?.skills.length ? (
                          <>
                            {jobSeekerDetails?.skills
                              ?.slice(0, 3)
                              .map((item) => (
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
                  <div className="form-group text-center">
                    <button
                      type="button"
                      className="btn btn-warning mx-auto w-50"
                      onClick={(e) => {
                        e.preventDefault();
                        router?.push("/dashboard");
                      }}
                    >
                      Search Job<i className="fal fa-long-arrow-right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card profile_box mycard">
                <div className="card-header">
                  <h5 className="card-title">
                    Introduction Video
                    {jobSeekerDetails?.intro_video_link && (
                      <button
                        type="button"
                        className="link share"
                        onClick={handleDelete}
                      >
                        <img src={"/assets/images/icons/delete.svg"} alt="icon" />
                      </button>
                    )}
                  </h5>
                </div>
                <div className="card-body vCard_textarea pt-0">
                  <div className="form-group">
                    <div className="video_box">
                      {jobSeekerDetails?.intro_video_link ? <>
                        {/* <ReactPlayer
                          url={jobSeekerDetails?.intro_video_link}
                          className="image-fit"
                          controls={true}
                          //muted
                          playing={true}
                        /> */}
                        <video src={jobSeekerDetails?.intro_video_link} className="image-fit" controls></video>
                        <br />
                        <span style={{ color: "tomato" }}>
                          <sup>*</sup>Double click for full screen preview
                        </span>
                      </> : 'No Video Here'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Content Box */}
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />{" "}
      </main>
      <Modal
        size="sm"
        className="custom_modal"
        centered
        show={showPopup}
        onHide={handleClosePopup}
      >
        <Modal.Header>
          <label
            className="form-check-label justify-content-start mb-2 text-black fw-500"
            htmlFor="typeTwo"
          >
            Delete Introduction Video?
          </label>
        </Modal.Header>
        <Modal.Body>
          <form className="setavailablity image_radio basic checkbox">
            <div className="form-group">
              <div className="form-check">
                <label
                  className="form-check-label justify-content-start mb-2 text-black fw-500"
                  htmlFor="typeTwo"
                >
                  Are you sure you want to delete your introduction video?
                </label>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={() => {
              handleClosePopup();
              onSubmitData();
              //onClickData();
              //router?.push("/dashboard")
            }}
            className="btn btn-warning mx-auto w-75"
          >
            Continue <i className="fal fa-long-arrow-right"></i>
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default MyVcard;
