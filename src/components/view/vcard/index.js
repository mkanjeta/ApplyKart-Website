//import styled from "styled-components";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Header from "components/shared/header";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVcardInfo } from "redux/actions/vcardActions";
import Loader from "components/shared/loader";
import { BASE_URL } from "constants/constants";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Link from "next/link";

const ViewVcard = (props) => {
  const router = useRouter();
  let dispatch = useDispatch();

  const { vcardDetails: jobSeekerDetails, loading } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );

  const [shifts, setShifts] = useState(() => []);
  // console.log("vcard details", vcardDetails);

  useEffect(() => {
    if (router?.query?.id) {
      // console.log(router?.query?.id);
      dispatch(getVcardInfo(router?.query?.id));
    }
  }, [router?.query?.id]);

  useEffect(() => {
    if (jobSeekerDetails && jobSeekerDetails.preffered_job_type) {
      let data = jobSeekerDetails.preffered_job_type.map((item) => {
        return item.Job_Type_id;
      });
      // console.log("data", data);
      setShifts([...data]);
    }
  }, [jobSeekerDetails]);
  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header
        styleClass="style_two"
        logoUrl="/assets/images/white-logo.svg"
        hideButtons={1}
      />
      <section className="relative full-height section-padding ">
        <div
          className="section-bg half-bg no-overlay"
          style={{
            backgroundImage: "url(" + BASE_URL + "/assets/images/bg/1.png)",
          }}
        ></div>
        {
          <div className="d-flex align-items-center vh-height">
            <Container>
              {loading && <Loader />}
              {
                <div className="row p-4 align-items-center">
                  <div className="col-lg-6">
                    <div className="v_card">
                      <div className="image">
                        <img
                          src={`${
                            jobSeekerDetails?.profile_pic ||
                            "/assets/images/user.png"
                          }`}
                          style={{ borderRadius: "50%" }}
                          className="image-fit"
                          id="profile-picture"
                          alt="img"
                          onError={() => {
                            document.getElementById("profile-picture").src =
                              "/assets/images/user.png";
                          }}
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
                            src={`/assets/images/icons/vaccine/white/${
                              (jobSeekerDetails?.vaccination_Status == 1 &&
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
                            {shifts && shifts.length != 0 ? (
                              shifts.includes("4") && shifts.length > 1 ? (
                                <span>
                                  <img
                                    src={"/assets/images/moon.svg"}
                                    alt="icon"
                                  />
                                  <img
                                    src={"/assets/images/day_shift.svg"}
                                    alt="icon"
                                  />
                                </span>
                              ) : shifts.includes("4") ? (
                                <img
                                  src={"/assets/images/moon.svg"}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  src={"/assets/images/day_shift.svg"}
                                  alt="icon"
                                />
                              )
                            ) : (
                              <></>
                            )}
                            {/* {(jobSeekerDetails?.preffered_job_type && jobSeekerDetails?.preffered_job_type.filter(()) 
                          && (
                            <img
                              src={`${
                                jobSeekerDetails?.shift == 2 &&
                                "/assets/images/moon.svg"
                              }`}
                              alt="icon"
                            />
                          )) || (
                            <img src={"/assets/images/moon.svg"} alt="icon" />
                          )
                          } */}
                          </button>
                        </div>
                        <div className="user_info">
                          <h5 className="name text-capitalize">
                            {jobSeekerDetails?.first_name
                              ? `${jobSeekerDetails?.first_name} ${jobSeekerDetails?.last_name}`
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
                              {`${
                                jobSeekerDetails?.totalExperience
                                  ? jobSeekerDetails?.totalExperience
                                  : "Newbie"
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
                              {jobSeekerDetails?.language &&
                              jobSeekerDetails?.language.length > 0
                                ? jobSeekerDetails?.language.length > 1
                                  ? "Multilingual"
                                  : jobSeekerDetails?.language[0].language
                                : ""}
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
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="vCard_textarea ps-lg-5">
                      <div className="section-header">
                        <h3 className="title">V-card</h3>
                        <p className="text mb-0">
                          {/* Cras magna libero, gravida et mollis ut, consectetur
                          aliquet felis. Sed rhoncus nunc vitae turpis interdum
                          pretium */}
                        </p>
                      </div>
                      <Link href={"#"}>
                        <button
                          className="btn btn-warning w-50 mx-auto d-block"
                          type="button"
                          onClick={() => {
                            // console.log("clicked");
                            router?.push("/login");
                          }}
                        >
                          Sign In <i className="fal fa-long-arrow-right"></i>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              }
            </Container>
          </div>
        }
      </section>
    </Fragment>
  );
};

export default ViewVcard;
