import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import { BASE_URL } from "constants/constants";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getJobSeekerDetail } from "redux/actions/workActions";
import { useRouter } from "next/router";
// import Loader from "components/shared/loader";
import TakeTour from "components/homepage/takeTour";

const VCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { isCompleted } = useSelector(({ AuthReducer }) => AuthReducer);
  const { jobSeekerDetails, loading } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  const [activeSlide, setActiveSlide] = useState(0);
  // console.log("active slide ==>>", activeSlide);

  // const {profile_pic,first_name,last_name,prefered_job_category}  = jobSeekerDetails;

  // useEffect(() => {
  //   if (isCompleted == 1) {
  //     router.push("/dashboard");
  //   }

  // }, [isCompleted]);

  useEffect(() => {
    if(activeSlide == 6) {
      setTimeout(()=>{
        setActiveSlide(7);
      },2000);
    }
  },[activeSlide])

  useEffect(() => {
    if (jobSeekerDetails) {
      if (jobSeekerDetails?.is_Completed) {
        // router.push("/dashboard");
        router.push("/timeline");
      }
    }
  }, [jobSeekerDetails]);

  useEffect(() => {
    dispatch(getJobSeekerDetail());
  }, []);

  const skillData = [
    { id: 1, name: "React" },
    { id: 2, name: "Html" },
    { id: 3, name: "Redux" },
    { id: 4, name: "Asynchronous" },
  ];

  // console.log()

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="style_two" logoUrl="/assets/images/white-logo.svg" />
      <section className="relative full-height section-padding ">
        <div
          className="section-bg half-bg no-overlay"
          style={{
            backgroundImage: "url(" + BASE_URL + "/assets/images/bg/1.png)",
          }}
        ></div>
        {activeSlide == 7 ? (
          <div className="d-flex align-items-center vh-height">
            <div className="row p-4 align-items-center">
              <div className="col-lg-6">
                <div className="v_card">
                  <div className="image">
                    <img
                      src={`${jobSeekerDetails?.profile_pic?.trim() ||
                        "/assets/images/user.png"
                        }`}
                      style={{ borderRadius: "50%" }}
                      className="image-fit"
                      id="profile-picture"
                      alt="img"
                    // onError={() => {
                    //   document.getElementById("profile-picture").src =
                    //     "/assets/images/user.png";
                    // }}
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
                      <button type="button" className="mode">
                        {(jobSeekerDetails?.shift == 2 && (
                          <img
                            src={`${jobSeekerDetails?.shift == 2 &&
                              "/assets/images/moon.svg"
                              }`}
                            alt="icon"
                          />
                        )) || (
                            <img src={"/assets/images/moon.svg"} alt="icon" />
                          )}
                      </button>
                    </div>
                    <div className="user_info">
                      <h5 className="name text-capitalize">
                        {jobSeekerDetails?.first_name
                          ? `${jobSeekerDetails?.first_name} ${jobSeekerDetails?.last_name || ''}`
                          : "Jacqueline Baum"}
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
                            : "1 year"
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
                            ""}
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src={"/assets/images/icons/language.svg"}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {jobSeekerDetails?.language
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
              </div>
              <div className="col-lg-6">
                <div className="vCard_textarea ps-lg-5">
                  <div className="section-header">
                    <h3 className="title">
                      Let's start with creating your professional visiting
                      card (V-Card)
                    </h3>
                    <p className="text mb-0">
                      This will be your CV/Resume that will help
                      HR/Businesses to know you better
                    </p>
                  </div>
                  <Link href="/vcard/basic" passHref>
                    <button
                      className="btn btn-warning w-50 mx-auto d-block"
                      type="button"
                    >
                      Let’s Go <i className="fal fa-long-arrow-right"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-100">
            <TakeTour setActiveSlide={setActiveSlide} />
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default VCard;
