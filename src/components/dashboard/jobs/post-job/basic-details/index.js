import { Fragment, useContext, useEffect, useState } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import { BASE_URL } from "constants/constants";
import Select from "react-select";
import Router, { useRouter } from "next/router";
import { PostjobContext } from "../../post-job/postJobContext";
import { ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import { getEducationList } from "redux/actions/jobBrowse";
import { useDispatch, useSelector } from "react-redux";
import { getLanguagelist } from "redux/actions/workActions";
import { toggleHamburger } from "helper/helper";
import { getJobCategory } from "redux/actions/categoryActions";
import { editAJob } from "redux/actions/jobBrowse";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import Swal from "sweetalert2";
import { min } from "lodash";

const SignupSchema = Yup.object().shape({
  jobtitle: Yup.string().max(100).required("Job Title is required"),
  jobRole: Yup.string().required("Job category is required"),
  jobType: Yup.array().required("Job Type is required"),
  education: Yup.string(),
  language: Yup.array(),
  experience: Yup.string(),
  gender: Yup.array(),
  Max_Salary_Offered: Yup.number()
    .required("Max Salary is required")
    .nullable(),
  Salary_Offered: Yup.number().required("Min Salary is required").nullable(),
  vacancies: Yup.number()
  .min(1,"Vacancy must be greater than 0")
  .required("Vacancy is required"),
  Category_id: Yup.number()
    .min(1, "Category is required")
    .required("Select a job category"),
  //Base: Yup.string().required("Base is required."),
});

const BasicDetails = ({ handleSwitchComp, data, edit }) => {
  // console.log(edit);
  const dispatch = useDispatch();
  const { educationListData, redirect, jobDetail } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  useEffect(() => {
    if (redirect) {
      dispatch({ type: "RESET_REDIRECT_FALSE" });
      router.push(`/jobs/details/${jobDetail.job_Id}`);
    }
  }, [redirect]);
  const { languageList } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );
  const { jobCategory } = useSelector(({ categoryReducer }) => categoryReducer);

  // console.log("job category", jobCategory);

  const [salaryError, setSalaryError] = useState(() => "");
  const [localStorageData, setLocalStorageData] = useState(null);

  const router = useRouter();
  let hourlysalary = [
    { value: "", label: "Salary Type" },
    { value: "Hourly", label: "Hourly" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Annual", label: "Annually" },
  ];
  let jobTypes = [
    { value: 1, label: "Freelance" },
    { value: 2, label: "Full Time" },
    { value: 3, label: "Part Time" },
    { value: 4, label: "Night Shift" },
    { value: 5, label: "Allows Remote Work" },
    { value: 6, label: "Casual" },
  ];
  function hourlSalaryyData(val) {
    // console.log("Selected: ", val);
    setBase(val?.value);
  }
  const { formData, setFormData } = useContext(PostjobContext);
  // console.log("@@@formData", formData);
  const [base, setBase] = useState(() => "");

  const experienceList ={ 
     1 : "1 year",
     2 : "2 year",
     3 : "3 year",
     4 : "4 year",
     5 : "5 year",
     6 : "6 year",
     7 : "7 year",
     8 : "8 year",
     9 : "9 year",
     10 : "10 year" };

  const createOptions = educationListData?.map((el) => {
    return {
      label: el?.education_Level,
      value: el?.education_Level_Id,
      id: el?.education_Level_Id,
    };
  });
  const createOptionsLang = languageList?.data?.map((el) => {
    return {
      label: el?.language,
      value: el?.id,
      id: el?.id,
    };
  });

  const createOptionsJobcategory = jobCategory?.jobCategories?.map((el) => {
    return {
      label: el?.job_Category,
      value: el?.job_Category_id,
      id: el?.job_Category_id,
    };
  });
  useEffect(() => {
    document.getElementById("scroll-helper").scrollIntoView();
    dispatch(getEducationList());
    dispatch(getLanguagelist());
    const obj = {
      search: "",
    };
    dispatch(getJobCategory(obj));
  }, [dispatch]);

  const handleFormSubmit = (values) => {
    if (parseInt(values.Max_Salary_Offered) < parseInt(values.Salary_Offered)) {
      setSalaryError("Max. salary cannot be smaller than min. salary");
      setTimeout(() => {
        setSalaryError("");
      }, 3500);
      return;
    }

    if (
      (values.Max_Salary_Offered != 0 || values.Salary_Offered != 0) &&
      !base
    ) {
      Swal.fire({
        icon: "error",
        title: "Salary Type Required",
      });
      return;
    }
    if (values?.experience == 'experienced' && !values?.experiences) {
      Swal.fire({
        icon: "error",
        title: "Select experience",
      });
      return;
    }
    
    if (!values.jobType.length) {
      Swal.fire({
        icon: "error",
        title: "Select Job Type",
      });
      return;
    }
    

    setFormData((prev) => {
      return {
        ...prev,
        Job_Title: values?.jobtitle,
        jobtitle: values?.jobtitle,

        Salary_Offered: values?.Salary_Offered,

        Role: values?.jobRole,
        jobRole: values?.jobRole,

        Min_Edu_Qualification: values?.education,
        education: values?.education,

        Job_Type: values?.jobType,
        jobType: values?.jobType,

        Min_Experience: values?.experiences,
        experiences: values?.experiences,
        experience: values?.experience,

        No_Of_Vacancy: values?.vacancies,
        vacancies: values?.vacancies,

        language_preference: values?.language,
        language: values?.language,
        Base: base,
        gender: values?.gender,
        Max_Salary_Offered: values?.Max_Salary_Offered,
        Category_id: values?.Category_id,
      };
    });
    if (
      (values?.Salary_Offered == 0 || values?.Salary_Offered) &&
      (values?.Max_Salary_Offered == 0 || values?.Max_Salary_Offered) &&
      values?.jobtitle &&
      values?.Category_id
    ) {
      handleSwitchComp(1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Data not valid",
      });
    }
  };

  const saveAndExit = (values) => {
    // console.log(values);
    // return;
    let obj = {
      job_id: localStorage.getItem("jobId"),
      Job_Title: values?.jobtitle,
      Role: values?.jobRole,
      Job_Type: values?.jobType,
      Min_Edu_Qualification: values?.education,
      Min_Experience: values?.experiences,
      No_Of_Vacancy: values?.vacancies,
      language_preference: values?.language.map((item) => item.id),
      Base: base,
      gender: values?.gender,
      Salary_Offered: values?.Salary_Offered,
      Max_Salary_Offered: values?.Max_Salary_Offered,
      Category_id: values?.Category_id,
      Special_Requirement: formData?.Selected_Special_Requirement,
    };
    // return;
    dispatch({ type: "POSTED_EDIT_JOB_INIT" });
    dispatch(editAJob(obj));
  };

  useEffect(() => {
    if (formData) {
      setBase(formData?.Base);
    }
  }, [formData]);

  useEffect(() => {
    const data = localStorage.getItem("applyKart");
    if(data) {
      const jsonData = JSON.parse(data);
      setLocalStorageData(jsonData);
    }
  },[]);

  const handleGenderCheck = (gender, values, setFieldValue) => {
    let genders = [...values.gender];
    if (!genders.includes(gender)) {
      genders = [...genders, gender];
    } else {
      genders = genders.filter((item) => item != gender);
    }
    // console.log(genders);
    setFieldValue("gender", [...genders]);
  };

  // console.log("localStorageData =>>", localStorageData)
  // console.log("createOptions ==>>", createOptions)

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main_wrapper" id="scroll-helper">
        <div className="row p-3">
          <div className="col-xl-12 col-lg-6 col-md-8 col-xs-12">
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
                BASIC JOB DETAILS
              </h3>
            </div>
            <Formik
              //initialValues={initialValues}
              enableReinitialize={true}
              initialValues={formData}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                // console.log("@@values", values);
                // console.log("hi");
                handleFormSubmit(values);
              }}
            >
              {({
                values,
                handleBlur,
                handleSubmit,
                errors,
                setFieldValue,
                handleChange,
                touched,
              }) => {
                return (
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      //alert("hii")
                      handleSubmit();
                    }}
                    className="formpostjob"
                  >
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label htmlFor="jobTitle" className="label d-flex">
                            Job Title
                            <svg width="7" height="7" viewBox="0 0 100 100" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve"><path fill="#f32121" d="m37.926 54.672-29.155-8.04 5.812-16.886L43.114 41.45 40.879 10h19.137l-2.323 32.076L85.415 30.64l5.814 17.065-29.514 8.041 19.587 23.701L65.83 90 49.464 63.706l-16.456 25.4-15.473-10.107z" data-original="#2196f3"/></svg>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="jobtitle"
                            id="jobTitle"
                            placeholder="Job Title"
                            value={values?.jobtitle}
                            onChange={(e) => {
                              if(!/^[a-zA-Z0-9()+\-%_#@\$%?:]*$/.test(e.target.value)){
                                return false;
                              };
                              setFieldValue("jobtitle", e.target.value);
                            }}
                            onBlur={handleBlur}
                          //required
                          />
                          {errors.jobtitle ? (
                            <div style={{ color: "tomato" }}>
                              {errors.jobtitle}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jobRole" className="label d-flex">
                            Job Role
                            <svg width="7" height="7" viewBox="0 0 100 100" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve"><path fill="#f32121" d="m37.926 54.672-29.155-8.04 5.812-16.886L43.114 41.45 40.879 10h19.137l-2.323 32.076L85.415 30.64l5.814 17.065-29.514 8.041 19.587 23.701L65.83 90 49.464 63.706l-16.456 25.4-15.473-10.107z" data-original="#2196f3"/></svg>
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            name="jobRole"
                            value={values?.jobRole}
                            placeholder="Job Role"
                            onChange={(e) => {
                              if(!/^[a-zA-Z0-9()]*$/.test(e.target.value)){
                                return false;
                              };
                              setFieldValue("jobRole", e.target.value);
                            }}
                            onBlur={handleBlur}
                          //required
                          />
                          {errors.jobRole ? (
                            <div style={{ color: "tomato" }}>
                              {errors.jobRole}
                            </div>
                          ) : null}
                        </div>
                        <div className="row radio-forms">
                          <label htmlFor="jobType" className="label">
                            Job Type
                          </label>

                          {jobTypes.map((item, index) => (
                            <label key={index}>
                              <input
                                type="checkbox"
                                name={item.label}
                                value={item.value}
                                id={item.label}
                                onChange={(e) => {
                                  let data = [...values.jobType];
                                  if (!data.includes(item.value)) {
                                    data = [...data, item.value];
                                  } else {
                                    data = data.filter(
                                      (val) => item.value != val
                                    );
                                  }
                                  setFieldValue("jobType", [...data]);
                                  // handleGenderCheck(
                                  //   "male",
                                  //   values,
                                  //   setFieldValue
                                  // );
                                }}
                                checked={
                                  values.jobType.includes(item.value) &&
                                  "checked"
                                }
                              // onBlur={handleBlur}
                              />
                              {item.label}
                            </label>
                          ))}

                          {errors.jobType ? (
                            <div style={{ color: "tomato" }}>
                              {errors.jobType}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="requirement" className="label">
                            Education <small>(Optional)</small>
                          </label>
                          <Select
                            id="education"
                            instanceId="education"
                            options={createOptions}
                            placeholder="Minimum Education"
                            className="form-control form-select"
                            closeMenuOnSelect={true}
                            isMulti={false}
                            value={
                              createOptions &&
                              createOptions?.find(
                                (option) => option.value === values.education
                              )
                            }
                            onChange={(item) => {
                              // console.log("education", item);
                              setFieldValue("education", item?.value);
                            }}
                            onBlur={handleBlur}
                            name="education"
                          //required
                          />
                          {errors.education ? (
                            <div style={{ color: "tomato" }}>
                              {errors.education}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="language" className="label">
                            Language Preferences <small>(Optional)</small>
                          </label>

                          <Select
                            id="language"
                            instanceId="language"
                            options={createOptionsLang}
                            placeholder="Select Language"
                            className="form-control form-select"
                            closeMenuOnSelect={true}
                            isMulti={false}
                            value={
                              createOptionsLang &&
                              createOptionsLang?.find(
                                (option) => option.value === values.language
                              )
                            }
                            onChange={(item) => {
                              setFieldValue(
                                "language",
                                values.language
                                  ? [
                                    ...values.language,
                                    { id: item?.id, language: item?.label },
                                  ]
                                  : [{ id: item?.id, language: item?.label }]
                              );
                            }}
                            onBlur={handleBlur}
                            name="language"
                          />
                          {values.language && values.language.length != 0 && (
                            <div className="selected-options">
                              {values.language.map((item, i) => (
                                <p className="option" key={i}>
                                  {item.language}
                                  <button
                                    className="remove_option"
                                    type="button"
                                    name={item.language}
                                    onClick={() => {
                                      let data = values.language.filter(
                                        (value) => value.id != item.id
                                      );
                                      setFieldValue("language", [...data]);
                                    }}
                                  >
                                    x
                                  </button>
                                </p>
                              ))}
                            </div>
                          )}
                          {errors.language ? (
                            <div style={{ color: "tomato" }}>
                              {errors.language}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          {/* {console.log(errors)} */}
                          <label htmlFor="language" className="label d-flex">
                            Job Category
                            <svg width="7" height="7" viewBox="0 0 100 100" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve"><path fill="#f32121" d="m37.926 54.672-29.155-8.04 5.812-16.886L43.114 41.45 40.879 10h19.137l-2.323 32.076L85.415 30.64l5.814 17.065-29.514 8.041 19.587 23.701L65.83 90 49.464 63.706l-16.456 25.4-15.473-10.107z" data-original="#2196f3"/></svg>
                          </label>

                          <Select
                            id="category"
                            instanceId="category"
                            options={createOptionsJobcategory}
                            placeholder="Select Job Type"
                            className="form-control form-select"
                            closeMenuOnSelect={true}
                            isMulti={false}
                            value={
                              createOptionsJobcategory &&
                              createOptionsJobcategory?.find(
                                (option) => option.value === values.Category_id
                              )
                            }
                            onChange={(item) => {
                              setFieldValue("Category_id", item?.value);
                            }}
                            onBlur={handleBlur}
                            name="category"
                          />

                          {errors.Category_id ? (
                            <div style={{ color: "tomato" }}>
                              {errors.Category_id}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group row radio-forms">
                          <label htmlFor="experience" className="label">
                            Experience Required
                          </label>
                          <div className="row image_radio default">
                            <div className="col-md-6">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="experience"
                                  value="newbie"
                                  id="newbie"
                                  onChange={(e) => {
                                    setFieldValue("experience", e.target.value);
                                  }}
                                  checked={
                                    values.experience === "newbie" && "checked"
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="newbie"
                                >
                                  <span className="icon">
                                    <img
                                      src={
                                        "/assets/images/icons/radio/inactive.png"
                                      }
                                      alt="icon"
                                    />
                                    <img
                                      src={
                                        "/assets/images/icons/radio/active.png"
                                      }
                                      alt="icon"
                                    />
                                  </span>
                                  <div className="text">Newbie</div>
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="experience"
                                  value="experienced"
                                  id="experienced"
                                  onChange={(e) => {
                                    setFieldValue("experience", e.target.value);
                                  }}
                                  checked={
                                    values.experience === "experienced" &&
                                    "checked"
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="experienced"
                                >
                                  <span className="icon">
                                    <img
                                      src={
                                        "/assets/images/icons/radio/inactive.png"
                                      }
                                      alt="icon"
                                    />
                                    <img
                                      src={
                                        "/assets/images/icons/radio/active.png"
                                      }
                                      alt="icon"
                                    />
                                  </span>
                                  <div className="text">Experienced</div>
                                </label>
                              </div>
                            </div>
                          </div>

                          {values.experience == "experienced" && (
                              <div className='slider-horizontal px-md-5 px-4'>
                                <Slider
                                  min={1}
                                  max={10}
                                  step={1}
                                  value={values.experiences}
                                  onChange={(e) => {
                                    setFieldValue("experiences", e);
                                  }}
                                  labels={experienceList}
                                  orientation='horizontal'
                                />
                              </div>
                          )}
                          {errors.experience &&
                            values.experience == "experienced" ? (
                            <div style={{ color: "tomato" }}>
                              {errors.experience}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group row radio-forms">
                          <label className="label">Gender <small>(Optional)</small></label>
                          <div className="row image_radio default">
                            <div className="col-md-4">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="gender"
                                  value="male"
                                  id="male"
                                  onChange={(e) => {
                                    handleGenderCheck(
                                      "male",
                                      values,
                                      setFieldValue
                                    );
                                    //   setFieldValue("gender", e.target.value);
                                  }}
                                  checked={
                                    values.gender.includes("male") && "checked"
                                  }
                                  onBlur={handleBlur}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="male"
                                >
                                  <span className="icon">
                                    <img
                                      src={
                                        "/assets/images/icons/gender/inactive/male.svg"
                                      }
                                      alt="icon"
                                    />
                                    <img
                                      src={
                                        "/assets/images/icons/gender/active/male.svg"
                                      }
                                      alt="icon"
                                    />
                                  </span>
                                  <div className="text">Male</div>
                                </label>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="gender"
                                  value="female"
                                  id="female"
                                  onChange={(e) => {
                                    //   setFieldValue("gender", e.target.value);
                                    handleGenderCheck(
                                      "female",
                                      values,
                                      setFieldValue
                                    );
                                  }}
                                  checked={
                                    values.gender.includes("female") &&
                                    "checked"
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="female"
                                >
                                  <span className="icon">
                                    <img
                                      src={
                                        "/assets/images/icons/gender/inactive/female.svg"
                                      }
                                      alt="icon"
                                    />
                                    <img
                                      src={
                                        "/assets/images/icons/gender/active/female.svg"
                                      }
                                      alt="icon"
                                    />
                                  </span>
                                  <div className="text">Female</div>
                                </label>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="gender"
                                  value="nonBinary"
                                  id="nonBinary"
                                  //value={values?.gender}
                                  onChange={(e) => {
                                    handleGenderCheck(
                                      "nonBinary",
                                      values,
                                      setFieldValue
                                    );
                                    //   setFieldValue("gender", e.target.value);
                                  }}
                                  checked={
                                    values.gender.includes("nonBinary") &&
                                    "checked"
                                  }
                                  onBlur={handleBlur}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="nonBinary"
                                >
                                  <span className="icon">
                                    <img
                                      src={
                                        "/assets/images/icons/gender/inactive/non_binary.svg"
                                      }
                                      alt="icon"
                                    />
                                    <img
                                      src={
                                        "/assets/images/icons/gender/active/non_binary.svg"
                                      }
                                      alt="icon"
                                    />
                                  </span>
                                  <div className="text">Non Binary</div>
                                </label>
                              </div>
                            </div>
                          </div>

                          {errors.gender ? (
                            <div style={{ color: "tomato" }}>
                              {errors.gender}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group row">
                          <label className="label">Salary offered (in {`${localStorageData?.countryCode == 61 ? '$' : '₹'}`})</label>
                          <div className="col-md-4">
                            <label htmlFor="minsalary" className="d-flex">
                              Minimum
                              <svg width="7" height="7" viewBox="0 0 100 100" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve"><path fill="#f32121" d="m37.926 54.672-29.155-8.04 5.812-16.886L43.114 41.45 40.879 10h19.137l-2.323 32.076L85.415 30.64l5.814 17.065-29.514 8.041 19.587 23.701L65.83 90 49.464 63.706l-16.456 25.4-15.473-10.107z" data-original="#2196f3"/></svg>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="Salary_Offered"
                              id="Salary_Offered"
                              value={values?.Salary_Offered}
                              placeholder={`${localStorageData?.countryCode == 61 ? '$' : '₹'}`}
                              onChange={(e) => {
                                setFieldValue("Salary_Offered", e.target.value);
                              }}
                              onBlur={handleBlur}
                            //required
                            />
                            {errors.Salary_Offered ? (
                              <div style={{ color: "tomato" }}>
                                {errors.Salary_Offered}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="maxsalary" className="d-flex">
                              Maximum
                              <svg width="7" height="7" viewBox="0 0 100 100" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve"><path fill="#f32121" d="m37.926 54.672-29.155-8.04 5.812-16.886L43.114 41.45 40.879 10h19.137l-2.323 32.076L85.415 30.64l5.814 17.065-29.514 8.041 19.587 23.701L65.83 90 49.464 63.706l-16.456 25.4-15.473-10.107z" data-original="#2196f3"/></svg>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="Max_Salary_Offered"
                              id="Max_Salary_Offered"
                              value={values?.Max_Salary_Offered}
                              placeholder={`${localStorageData?.countryCode == 61 ? '$' : '₹'}`}
                              onChange={(e) => {
                                setFieldValue(
                                  "Max_Salary_Offered",
                                  e.target.value
                                );
                              }}
                            //required
                            />
                            {errors.Max_Salary_Offered ? (
                              <div style={{ color: "tomato" }}>
                                {errors.Max_Salary_Offered}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-4">
                            <Select
                              id="hourly"
                              instanceId="hourly"
                              name="Base"
                              // defaultValue={hourlysalary.find((item)=>item.value == base)}
                              value={hourlysalary.find(
                                (item) => item.value == base
                              )}
                              options={hourlysalary}
                              placeholder="hourly"
                              className="form-control form-select mt-20"
                              closeMenuOnSelect={true}
                              // isMulti={false}
                              onChange={hourlSalaryyData}
                            />
                          </div>
                          {salaryError && (
                            <div style={{ color: "tomato" }}>{salaryError}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="label">No Of Vacancies</label>
                          <input
                            type="number"
                            className="form-control"
                            name="vacancies"
                            id="vacancies"
                            value={values?.vacancies}
                            placeholder=""
                            onChange={(e) => {
                              setFieldValue("vacancies", e.target.value);
                            }}
                            onBlur={handleBlur}

                          //required
                          />
                          {errors.vacancies ? (
                            <div style={{ color: "tomato" }}>
                              {errors.vacancies}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap">
                      {edit && (
                        <button
                          type="submit"
                          className="btn btn-warning  mb-3 me-5"
                          onClick={(e) => {
                            e.preventDefault();
                            saveAndExit(values);
                          }}
                        >
                          Save and Exit
                        </button>
                      )}
                      <button type="submit" className="btn btn-warning  mb-3">
                        Next <i className="fal fa-long-arrow-right"></i>
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
        {/* Content Box ends */}
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />{" "}
      </main>
    </Fragment>
  );
};

export default BasicDetails;
