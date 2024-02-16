import { Fragment, useContext, useEffect, useState } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import Router, { useRouter } from "next/router";
import { BASE_URL } from "constants/constants";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "helper/helper";

import { getRequirementList } from "redux/actions/workActions";
import { getSkillsList, getVisaType } from "redux/actions/jobBrowse";
import { PostjobContext } from "../../post-job/postJobContext";
import { Formik } from "formik";
import { Alert, Col, Row } from "react-bootstrap";
import {
  showErrorMessage,
  showErrorRequirements,
  showErrorVaccineStatus,
  showErrorVisaType,
} from "constants/ShowError";
import { editAJob } from "redux/actions/jobBrowse";

// For map
const RequirementDetails = ({ handleSwitchComp, edit }) => {
  const {
    educationListData,
    skillsListData,
    visaTypeData,
    redirect,
    jobDetail,
  } = useSelector(({ jobBrowseReducer }) => jobBrowseReducer);
  const { requirementList } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );
  const router = useRouter();
  const { formData, setFormData } = useContext(PostjobContext);
  const dispatch = useDispatch();
  useEffect(() => {
    if (redirect) {
      dispatch({ type: "RESET_REDIRECT_FALSE" });
      router.push(`/jobs/details/${jobDetail.job_Id}`);
    }
  }, [redirect]);
  const [seekerId, setSeekerId] = useState(null);
  const [selectedOption, setSelect] = useState(null);
  const [seekerSkill, setSeekerSkill] = useState(null);
  const [otpss, setOtps] = useState(() => []);
  const [requirements, setRequirement] = useState([]);
  const [flag, setFlag] = useState(false);
  const [vaccineStatus, setVaccineStatus] = useState(null);
  const [visaType, setvisaType] = useState(null);
  const [description, setDescription] = useState("");
  const [formsData, setFormsdata] = useState(null);
  const [error, setError] = useState(() => "");
  const [errorRequirement, setErrorRequirement] = useState(() => "");
  const [errorVaccine, setErrorVaccine] = useState(() => "");
  const [errorVisa, setErrorVisa] = useState(() => "");
  const [errorDesc, setErrorDesc] = useState(() => "");

  const onChangeRequirement = (item, index) => {
    // console.log(item);
    let array = [...requirements];
    array.includes(item?.special_requirements_id)
      ? array.splice(array.indexOf(item?.special_requirements_id), 1)
      : array.push(item?.special_requirements_id);
    // console.log(array);
    setRequirement(array);
    setFlag(true);
  };
  useEffect(() => {
    setFormsdata(formData);
    // console.log("formData", formData)
  }, []);

  const vaccinationStatusMapping = (id) => {
    switch (id) {
      case 1:
        return "singleDose";
      case 2:
        return "doubleDose";
      case 3:
        return "tripleDose";
      case 4:
        return "notVaccinated";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (formData) {
      setFormsdata(formData);
      if (localStorage.getItem("isEdit") == 1) {
        //selected options start
        // console.log("form data--->", formData);
        let options = formData.Skill?.map((item) => {
          return {
            value: item?.skill_id || item?.value,
            label: item?.skill || item?.label,
          };
        });
        let optIds = formData.Skill?.map((item) => {
          return item?.skill_id || item?.value;
        });
        setSelect(options ? [...options] : []);
        setOtps(optIds ? [...optIds] : []);
        //selected options end

        let reqIds = formData?.Special_Requirement.map((item) =>
          typeof item == "object" ? item.special_requirements_id : item
        );
        setRequirement([...reqIds]);
        setVaccineStatus(() => {
          return vaccinationStatusMapping(parseInt(formData?.vaccination_Type));
        });
        setvisaType(formData?.visa_type);
        setDescription(formData?.Description);
      } else {
        let optIds =
          formData.Skill && formData.Skill.length != 0
            ? formData.Skill?.map((item) => {
              return item.value;
            })
            : [];
        setSelect(
          formData.Skill && formData.Skill.length != 0
            ? [...formData.Skill]
            : []
        );
        setOtps([...optIds]);
        //selected options end

        setRequirement(
          formData?.Selected_Special_Requirement
            ? [...JSON.parse(formData?.Selected_Special_Requirement)]
            : []
        );
        setVaccineStatus(() => {
          return vaccinationStatusMapping(parseInt(formData?.vaccination_Type));
        });
        setvisaType(formData?.visa_type);
        setDescription(formData?.Description);
      }
    }
  }, [formData]);

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
    document.getElementById("scroll-helper").scrollIntoView();
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const { userId } = JSON.parse(applyKart);
      setSeekerId(userId);
    }
  }, []);
  // const {profile_pic,first_name,last_name,prefered_job_category}  = jobSeekerDetails;
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
  const handleChangeData = (selectedOption) => {
    // console.log(selectedOption);
    const selectedOtp = selectedOption?.map((item) => item?.value);
    setSelect(selectedOption);
    setOtps(selectedOtp);
  };
  useEffect(() => {
    dispatch(getSkillsList());
    dispatch(getRequirementList());
    dispatch(getVisaType());
  }, [dispatch]);

  const handleSubmit = () => {
    // if (!otpss || otpss == "") {
    //   showErrorMessage("Skills are required", setError);
    //   return;
    // }
    if (!description || description.trim() == "") {
      showErrorMessage("Enter job description", setErrorDesc);
      return;
    }
    // if (!requirements || requirements == "") {
    //   showErrorMessage(
    //     "Special Requirements are required",
    //     setErrorRequirement
    //   );
    //   return;
    // }
    // if (!vaccineStatus) {
    //   showErrorMessage("Vaccination is required", setErrorVaccine);
    //   return;
    // }
    // if (!visaType) {
    //   showErrorMessage("Visa Type is required", setErrorVisa);
    //   return;
    // }

    setFormData((prev) => {
      return {
        ...prev,
        Description: description,
        vaccination_Type:
          (vaccineStatus == "singleDose" && "1") ||
          (vaccineStatus == "doubleDose" && "2") ||
          (vaccineStatus == "tripleDose" && "3") ||
          (vaccineStatus == "notVaccinated" && "4") ||
          "",
        Company_Description: description,
        Selected_Special_Requirement: JSON?.stringify(requirements),
        Special_Requirement: requirements,
        Skill: [...selectedOption],
        SelectedSkills: JSON?.stringify(otpss),
        visa_requirement: visaType,
        visa_type: visaType,
      };
    });
    setTimeout(() => {
      if (otpss) {
        handleSwitchComp(2);
      }
    }, 1000);
  };

  const vaccinationType = (type) => {
    switch (type) {
      case 1:
        return "Single Dose";
      case 2:
        return "Double Dose";
      case 3:
        return "Triple Dose";
      default:
        return "Not Vaccinated";
    }
  };

  const saveAndExit = () => {
    if (!otpss || otpss == "") {
      showErrorMessage("Skills are required", setError);
      return;
    }
    if (!requirements || requirements == "") {
      showErrorMessage(
        "Special Requirements are required",
        setErrorRequirement
      );
      return;
    }
    if (!vaccineStatus) {
      showErrorMessage("Vaccination is required", setErrorVaccine);
      return;
    }
    if (!visaType) {
      showErrorMessage("Visa Type is required", setErrorVisa);
      return;
    }
    let obj = {
      job_id: localStorage.getItem("jobId"),
      Special_Requirement: JSON?.stringify(requirements),
      vaccination_type_name: vaccinationType(
        (vaccineStatus == "singleDose" && "1") ||
        (vaccineStatus == "doubleDose" && "2") ||
        (vaccineStatus == "tripleDose" && "3") ||
        (vaccineStatus == "notVaccinated" && "4")
      ),
      vaccination_Type:
        (vaccineStatus == "singleDose" && "1") ||
        (vaccineStatus == "doubleDose" && "2") ||
        (vaccineStatus == "tripleDose" && "3") ||
        (vaccineStatus == "notVaccinated" && "4"),
      Description: description,
      Skill: JSON?.stringify(otpss),
      visa_requirement: visaType,
      Company: description,
    };
    // return;
    dispatch({ type: "POSTED_EDIT_JOB_INIT" });
    dispatch(editAJob(obj));
  };

  const createOptionsVisa = visaTypeData?.map((el) => {
    return {
      label: el?.visa_type,
      value: el?.visa_id,
      id: el?.visa_id,
    };
  });

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main_wrapper" id="scroll-helper">
        <div className="row p-3">
          <div className="col-xl-6 col-lg-6 col-md-8 col-xs-12">
            <div className="dashboard_title_bar">
              <h3 className="title">
                <span
                  className="icon"
                  onClick={() => {
                    router.back();
                  }}
                >
                  <img
                    src={"/assets/images/icons/icon-ios-arrow-left.svg"}
                    alt="icon"
                  />
                </span>{" "}
                CANDIDATE REQUIREMENT
              </h3>
            </div>

            <form className="formpostjob">
              <div className="row">
                <div className="col-md-12 col-lg-12 col-xs-12">
                  <div className="form-group">
                    <label className="label">Job Skills</label>
                    <Select
                      id="skills-dropdown"
                      instanceId="skills-dropdown"
                      options={createOptions()}
                      placeholder="Add Skills"
                      className="form-control form-select"
                      closeMenuOnSelect={true}
                      isMulti
                      onChange={handleChangeData}
                      value={selectedOption}
                    />
                    {error ? (
                      <div style={{ color: "tomato" }}>{error}</div>
                    ) : null}
                  </div>

                  <div className="selected-options">
                    {selectedOption &&
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
                        ))}
                  </div>
                  <div className="form-group row radio-forms">
                    <label className="label">Special Requirements</label>
                    <div className="row image_radio default">
                      {requirementList?.map((item) => (
                        <div
                          key={item?.special_requirements_id}
                          className="col-md-6"
                        >
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="requirement"
                              value={requirements}
                              id={
                                "specialRequirement" +
                                item?.special_requirements_id
                              }
                              onChange={() => onChangeRequirement(item)}
                              checked={
                                requirements.includes(
                                  item.special_requirements_id
                                )
                                  ? "checked"
                                  : ""
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={
                                "specialRequirement" +
                                item?.special_requirements_id
                              }
                            >
                              <span className="icon">
                                <img
                                  src={
                                    "/assets/images/icons/checkbox/inactive.svg"
                                  }
                                  alt="icon"
                                />
                                <img
                                  src={
                                    "/assets/images/icons/checkbox/active.svg"
                                  }
                                  alt="icon"
                                />
                              </span>
                              <div className="text">
                                {item?.special_requirements}
                              </div>
                            </label>

                            {/* <label>
                          <input
                            type="checkbox"
                            name="requirement"
                            value={requirements}
                            id={requirements}
                            onChange={() => onChangeRequirement(item)}
                            checked={
                              requirements.includes(
                                item.special_requirements_id
                              )
                                ? "checked"
                                : ""
                            }
                          />
                          {item?.special_requirements}
                        </label> */}
                          </div>
                        </div>
                      ))}
                    </div>
                    {errorRequirement ? (
                      <div style={{ color: "tomato" }}>{errorRequirement}</div>
                    ) : null}
                    <div className="form-group row radio-forms">
                      <label className="label">Vaccination Required</label>
                      <div className="row image_radio default noSpace">
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="vaccineStatus"
                              value="singleDose"
                              id="singleDose"
                              onChange={(e) => {
                                setVaccineStatus(e.target.value);
                              }}
                              checked={
                                vaccineStatus == "singleDose" && "checked"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="singleDose"
                            >
                              <span className="icon">
                                <img
                                  src={
                                    "/assets/images/icons/vaccine/inactive/singleDose.svg"
                                  }
                                  alt="icon"
                                />
                                <img
                                  src={
                                    "/assets/images/icons/vaccine/active/singleDose.svg"
                                  }
                                  alt="icon"
                                />
                              </span>
                              <div className="text">Single Dose</div>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="vaccineStatus"
                              value="doubleDose"
                              id="doubleDose"
                              onChange={(e) => {
                                setVaccineStatus(e.target.value);
                              }}
                              checked={
                                vaccineStatus == "doubleDose" && "checked"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="doubleDose"
                            >
                              <span className="icon">
                                <img
                                  src={
                                    "/assets/images/icons/vaccine/inactive/doubleDose.svg"
                                  }
                                  alt="icon"
                                />
                                <img
                                  src={
                                    "/assets/images/icons/vaccine/active/doubleDose.svg"
                                  }
                                  alt="icon"
                                />
                              </span>
                              <div className="text">Double Dose</div>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="vaccineStatus"
                              value="tripleDose"
                              id="tripleDose"
                              onChange={(e) => {
                                setVaccineStatus(e.target.value);
                              }}
                              checked={
                                vaccineStatus == "tripleDose" && "checked"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="tripleDose"
                            >
                              <span className="icon">
                                <img
                                  src={
                                    "/assets/images/icons/vaccine/inactive/tripleDose.svg"
                                  }
                                  alt="icon"
                                />
                                <img
                                  src={
                                    "/assets/images/icons/vaccine/active/tripleDose.svg"
                                  }
                                  alt="icon"
                                />
                              </span>
                              <div className="text">Triple Dose</div>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="vaccineStatus"
                              id="notVaccinated"
                              value="notVaccinated"
                              onChange={(e) => {
                                setVaccineStatus(e.target.value);
                              }}
                              checked={
                                vaccineStatus == "notVaccinated" && "checked"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="notVaccinated"
                            >
                              <span className="icon">
                                <img
                                  src={
                                    "/assets/images/icons/vaccine/inactive/notVaccinated.svg"
                                  }
                                  alt="icon"
                                />
                                <img
                                  src={
                                    "/assets/images/icons/vaccine/active/notVaccinated.svg"
                                  }
                                  alt="icon"
                                />
                              </span>
                              <div className="text">Not Vaccinated</div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {errorVaccine ? (
                        <div style={{ color: "tomato" }}>{errorVaccine}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="label">Visa Requirement</label>
                      <Select
                        id="visa_type"
                        instanceId="visa_type"
                        options={createOptionsVisa}
                        placeholder="Visa Type"
                        className="form-control form-select"
                        closeMenuOnSelect={true}
                        isMulti={false}
                        value={
                          createOptionsVisa &&
                          createOptionsVisa?.find(
                            (option) => option.value == visaType
                          )
                        }
                        //onChange={handleOnChange}
                        onChange={(item) => {
                          //setFieldValue("college", item?.value)
                          // console.log(item);
                          setvisaType(item?.id);
                        }}
                        name="visaType"
                      />
                      {errorVisa ? (
                        <div style={{ color: "tomato" }}>{errorVisa}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="label d-flex">
                        Description
                        <svg width="7" height="7" viewBox="0 0 100 100" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve"><path fill="#f32121" d="m37.926 54.672-29.155-8.04 5.812-16.886L43.114 41.45 40.879 10h19.137l-2.323 32.076L85.415 30.64l5.814 17.065-29.514 8.041 19.587 23.701L65.83 90 49.464 63.706l-16.456 25.4-15.473-10.107z" data-original="#2196f3"/></svg>
                      </label>
                      <textarea
                        id="text"
                        value={description}
                        className="form-control rounded-0 p-3"
                        rows="3"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write Here"
                        required
                      />
                      {errorDesc ? (
                        <div style={{ color: "tomato" }}>{errorDesc}</div>
                      ) : null}
                      {/* <input
                        id="text"
                        className="form-control mb-3"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write Here"
                        required
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap">
                  <button
                    type="submit"
                    className="btn btn-warning  mb-3 me-5"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwitchComp(0);
                    }}
                  >
                    <i className="fal fa-long-arrow-left me-2"></i> Back
                  </button>
                  {edit && (
                    <button
                      type="submit"
                      className="btn btn-warning  mb-3 me-5"
                      onClick={(e) => {
                        e.preventDefault();
                        saveAndExit();
                      }}
                    >
                      Save and Exit
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-warning  mb-3 me-5"
                    onClick={handleSubmit}
                  >
                    Next <i className="fal fa-long-arrow-right"></i>
                  </button>
                </div>

                {/* <div className='row'>
                                    <div className='col-md-12 text-center'>
                                    <button type="submit" className='btn btn-warning mx-auto w-50 mt-3 mb-3'>Next <i className="fal fa-long-arrow-right"></i></button>
                                    </div>
                                </div> */}
              </div>
            </form>

            {/* <button onClick={scrollUp}>Scroll Up</button> */}
          </div>
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

export default RequirementDetails;
