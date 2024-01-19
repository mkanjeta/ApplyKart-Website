import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import { BASE_URL } from "constants/constants";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobSeekerDetail,
  saveSkillsDetails,
  saveVcardEducationDetails,
} from "redux/actions/workActions";
import { getSkillsList } from "redux/actions/jobBrowse";
import Loader from "components/shared/loader";
import FileUpload from "components/fileUploader";
import * as actions from "../../../redux/actions/vcardActions";

const SkillsInfo = () => {
  const { educationListData, skillsListData } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  const { jobSeekerDetails, loading, redirect } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  // console.log(redirect);

  const router = useRouter();
  const dispatch = useDispatch();
  const [seekerId, setSeekerId] = useState(null);
  const [selectedOption, setSelect] = useState(null);
  const [options, setOptions] = useState(null);
  const [seekerSkill, setSeekerSkill] = useState(jobSeekerDetails?.skills);
  const [otpss, setOtps] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageData = (file) => {
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

  useEffect(() => {
    if (skillsListData) {
      let arr = [];
      for (let i = 0; i < skillsListData.length; ++i) {
        if (otpss.includes(skillsListData[i].skill_id)) {
          arr = [
            ...arr,
            {
              label: skillsListData[i]?.skill,
              value: skillsListData[i]?.skill_id,
            },
          ];
        }
      }

      // console.log(arr);
      setSelect([...arr]);
    }
  }, [skillsListData]);

  useEffect(() => {
    if (jobSeekerDetails) {
      let skills = jobSeekerDetails?.skills.map((item) => item.skill_id);
      setOtps([...skills]);
      setSeekerSkill(jobSeekerDetails?.skills);
    }
  }, [jobSeekerDetails]);

  const createOptions = () => {
    const opts = skillsListData?.map((el) => {
      return {
        label: el?.skill,
        value: el?.skill_id,
      };
    });
    return opts;
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const { userId } = JSON.parse(applyKart);
      setSeekerId(userId);
    }
  }, []);
  const handleChange = (selectedOption) => {
    // const optionArray = []
    const selectedOtp = selectedOption?.map((item) => item?.value);
    setSelect(selectedOption);
    setOtps(selectedOtp);
  };
  // const {profile_pic,first_name,last_name,prefered_job_category}  = jobSeekerDetails;

  useEffect(() => {
    if (jobSeekerDetails == null) {
      dispatch(getJobSeekerDetail());
    }

    if (jobSeekerDetails) {
      setSeekerSkill(jobSeekerDetails?.skills);
    }
  }, [jobSeekerDetails]);
  const hanadleClick = () => {
    // let obj = {
    //   skill: "",
    // };
    // if (otpss.length == 0 && jobSeekerDetails?.skills.length == 0) {
    //   obj.skill = "Select your skills";
    //   setError(obj);
    //   return;
    // }

    let arr = [];
    for (let i = 0; i < skillsListData.length; ++i) {
      if (otpss.includes(skillsListData[i].skill_id)) {
        arr = [
          ...arr,
          {
            skill_id: skillsListData[i].skill_id,
            skill: skillsListData[i].skill,
          },
        ];
      }
    }

    const vcardEducationDetails = {
      user_id: seekerId,
      skill: JSON.stringify(otpss),
      skills: [...arr],
    };
    dispatch(saveSkillsDetails(vcardEducationDetails));
  };
  useEffect(() => {
    if (redirect) {
      dispatch({ type: "SET_REDIRECT_FALSE" });
      router.push("/vcard/job-type");
    }
  }, [redirect]);
  const removeOption = (name, id) => {
    if (name) {
      const newSelect = selectedOption.filter((item) => item.label !== name);
      setSelect(newSelect);
    }
    if (id) {
      const filterSkill = seekerSkill.filter((item) => item.skill !== id);
      setSeekerSkill(filterSkill);
    }
  };
  useEffect(() => {
    dispatch(getSkillsList());
  }, [dispatch]);

  // console.log(selectedOption);
  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="style_two" logoUrl="/assets/images/white-logo.svg" />
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
                      src={`${
                        image
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
                        handleImageData={handleImageData}
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
                    {/* <div className="top_actions">
                    <img
                      src={`${BASE_URL}/assets/images/icons/vaccine/white/${jobSeekerDetails?.vaccination_Status == 1 && "singleDose" || jobSeekerDetails?.vaccination_Status == 2 && "doubleDose" || jobSeekerDetails?.vaccination_Status == 3 && "tripleDose" || "notVaccinated"}.svg`}
                      alt="icon"
                    />
                    <button type="button" className="mode">
                      {jobSeekerDetails?.shift == 2 && <img
                        src={BASE_URL + `${jobSeekerDetails?.shift == 2 && "/assets/images/moon.svg"}`}
                        alt="icon"
                      />}
                    </button>
                  </div> */}
                    {/* {console.log(seekerSkill?.concat(selectedOption)?.slice(0, 5))} */}
                    <div className="user_info">
                      <h5 className="name text-capitalize">
                        {jobSeekerDetails?.first_name
                          ? `${jobSeekerDetails?.first_name} ${jobSeekerDetails?.last_name}`
                          : "Your Name"}
                      </h5>
                      <p className="designation">
                        {jobSeekerDetails?.worked_before == 1
                          ? jobSeekerDetails?.jobRole
                            ? jobSeekerDetails?.jobRole
                            : ""
                          : "Newbie"}
                      </p>
                      {/* {console.log(selectedOption)} */}
                      {selectedOption ? (
                        <div className="d-flex flex-row-reverse justify-content-center flex-wrap">
                          {selectedOption?.slice(0, 3).map((item) => (
                            <button
                              type="button"
                              className="tag"
                              key={item?.value}
                            >
                              {item?.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        // :
                        //   (!!jobSeekerDetails?.skills.length) ?
                        //     <div className="d-flex flex-row-reverse justify-content-center g-0 row">
                        //       {selectedOption && selectedOption.filter((item)=>item).map((item) => {

                        //       return (
                        //      <button type="button" className="tag col-auto" key={item?.skill_id}>
                        //         {item?.skill}
                        //       </button>
                        //       )
                        //      })}
                        //     </div>
                        <div className="d-flex flex-row-reverse justify-content-center flex-wrap">
                          <button type="button" className="tag">
                            Add Skills
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="vCard_textarea ps-lg-5">
                  <div className="section-header">
                    <h3 className="title">Special Skills</h3>
                    <p className="text mb-0">Please add your skills here.</p>
                  </div>
                  <form>
                    <div className="form-group">
                      <Select
                        id="skills-dropdown"
                        instanceId="skills-dropdown"
                        options={createOptions()}
                        placeholder="Chef, Barista, Cleaner, etc"
                        className="form-control form-select"
                        closeMenuOnSelect={true}
                        isMulti
                        onChange={handleChange}
                        value={selectedOption}
                      />
                    </div>

                    <div className="selected-options">
                      {selectedOption === null
                        ? selectedOption &&
                          selectedOption
                            .filter((el) => el)
                            .map((item) => (
                              <p className="option" key={item?.value}>
                                {item?.label || item?.skill}
                                <button
                                  className="remove_option"
                                  type="button"
                                  name={item?.label}
                                  id={item?.skill}
                                  onClick={() =>
                                    removeOption(item?.label, item?.skill)
                                  }
                                >
                                  x
                                </button>
                              </p>
                            ))
                        : selectedOption &&
                          selectedOption.map((item) => (
                            <p className="option" key={item?.value}>
                              {item?.label || item?.skill}
                              <button
                                className="remove_option"
                                type="button"
                                name={item?.label}
                                id={item?.skill}
                                onClick={() =>
                                  removeOption(item?.label, item?.skill)
                                }
                              >
                                x
                              </button>
                            </p>
                          ))}
                    </div>

                    {/* {error?.skill && (
                      <div>
                        <span style={{ color: "red" }}>{error.skill}</span>
                      </div>
                    )} */}
                  </form>
                  {/* <div className="m-5">  {jobSeekerDetails && jobSeekerDetails?.skills?.map((el, i) => (
											<p className='rounded-pill d-inline-block border text-capitalize fw-bold mx-1 py-2 ps-3 pe-2'>{el?.skill} {" "} <i className="fa py-1 px-2 bg-dark text-light rounded-circle fa-times" /></p>
										))}</div> */}
                  {/* <button
                  className="btn btn-warning w-50 mx-auto d-block"
                  type="button"
                  onClick={hanadleClick}
                >
                  Next <i className="fal fa-long-arrow-right"></i>
                </button> */}
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-warning mx-3 d-block"
                      type="button"
                      onClick={() => router.push("/vcard/education-details")}
                    >
                      <i className="fal fa-long-arrow-left me-3"></i>Back
                    </button>
                    <button
                      className="btn btn-warning mx-3 d-block"
                      type="submit"
                      onClick={hanadleClick}
                    >
                      Next <i className="fal fa-long-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </Fragment>
  );
};

export default SkillsInfo;
