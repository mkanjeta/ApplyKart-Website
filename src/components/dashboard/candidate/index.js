import { Fragment, useEffect, useState } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import Filter from "components/shared/filter";
import { BASE_URL } from "constants/constants";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getCandidateDetail,
  getCandidateList,
  setIsNewFalse,
} from "redux/actions/jobBrowse";
import { Link } from "react-bootstrap-icons";
import { toggleHamburger } from "helper/helper";
import { Dropdown } from "react-bootstrap";

const AppliedCandidate = () => {
  //const history = Router;
  const router = useRouter();
  const dispatch = useDispatch();
  const onClick = () => history.push("/jobs/details");
  const { candidateList } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  const handleCandidatedetail = (id, job_id) => {
    localStorage.setItem("jobId", router?.query?.id);
    // dispatch(getCandidateDetail({id : id, jobId : router?.query?.id}));
    router.push(`/dashboard/candidates/details/${id}`);
  };
  useEffect(() => {
    if (router?.query?.id) {
      const obj = {
        JobId: router?.query?.id,
      };
      dispatch(getCandidateList(obj));
      dispatch(setIsNewFalse({ jobId: router?.query?.id }));
    }
  }, [router?.query?.id]);

  const handleCardClick = (id) => {
    localStorage.setItem("jobId", router?.query?.id);
    router.push(`/dashboard/candidates/details/${id}`);
  };
  const imageError = (id) => {
    // console.log(id);
    document.getElementById(id).src = "/assets/images/default-user.png";
  };

  const vaccineStatus = (type) => {
    switch (type) {
      case "1":
        return "singleDose";
      case "2":
        return "doubleDose";
      case "3":
        return "tripleDose";
      default:
        return "notVaccinated";
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
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard_title_bar">
                <h3 className="title">Applied Candidates</h3>
              </div>
            </div>
          </div>
          {/* Content Box */}
          <div className="row">
            {/* Box */}
            {candidateList?.data?.map((item, index) => (
              <div className="col-xl-4 col-md-6 col-sm-12" key={item?.index}>
                <div
                  key={index}
                  className="v_card fixed-height"
                  onClick={() => {
                    handleCardClick(item?.job_Seeker_Id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="image">
                    <img
                      // src={`${jobSeekerDetails?.profile_pic || "/assets/images/user.png"}`}
                      src={item?.profile_pic}
                      style={{ borderRadius: "50%" }}
                      className="image-fit"
                      alt="img"
                      id={`profilepic${index}`}
                      onError={() => {
                        imageError(`profilepic${index}`);
                      }}
                    />
                  </div>
                  <div
                    className="card_content section-bg no-overlay position-relative overflow-visible"
                    style={{
                      background:
                        "center / cover no-repeat url(" +
                        BASE_URL +
                        "/../assets/images/v_card_bg.png),transparent linear-gradient(90deg, #0000FF 0%, #1CB5E0 100%)",
                    }}
                  >
                    {item?.isNew ? (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        New
                      </span>
                    ) : (
                      <></>
                    )}
                    <div className="top_actions">
                      <img
                        src={`/assets/images/icons/vaccine/white/${
                          vaccineStatus(item?.vaccination_status) ||
                          "notVaccinated"
                        }.svg`}
                        alt="icon"
                      />
                      <button type="button" className="mode">
                        {item?.shift == 2 && (
                          <img
                            src={`${
                              item?.shift == 2 && "/assets/images/moon.svg"
                            }`}
                            alt="icon"
                          />
                        )}
                      </button>
                    </div>
                    <div className="user_info">
                      <h5 className="name">
                        {item?.first_name
                          ? `${item?.first_name} ${item?.last_name}`
                          : ""}
                      </h5>
                      <p className="designation">{item?.job_title || ""}</p>
                      <ul className="user_data">
                        <li>
                          <span className="icon">
                            <img
                              src={"/assets/images/icons/experience.svg"}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {item?.total_experience
                            ? `${item?.total_experience}`
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
                          {item?.location ? item?.location.split(",")[0] : ""}
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src={"/assets/images/icons/language.svg"}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {item?.language
                            ? item?.language.length > 1
                              ? "Multilingual"
                              : item?.language[0].language
                            : ""}
                        </li>
                      </ul>
                      {item?.skills && !!item?.skills?.length ? (
                        <>
                          {item?.skills.map((val) => (
                            <button
                              type="button"
                              className="tag"
                              key={val?.Skill_id}
                            >
                              {/* {console.log(item)} */}
                              {val?.Skill}
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
            ))}
          </div>
          {/* Content Box */}
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />
      </main>
    </Fragment>
  );
};

export default AppliedCandidate;
