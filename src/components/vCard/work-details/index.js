import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import { BASE_URL } from "constants/constants";
import DatePicker from "react-datepicker";
import { Formik } from "formik";
import * as actions from "../../../redux/actions/vcardActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobSeekerDetail,
  saveVcardWorkDetails,
} from "redux/actions/workActions";
import { cssTransition } from "react-toastify";
import { getVisaType } from "redux/actions/jobBrowse";
import moment from "moment";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Loader from "components/shared/loader";
import FileUpload from "components/fileUploader";

const initialValues = {
  visa_type: "",
  worked_before: "",
  months: "",
  company: "",
  specialisation: "",
  jobRole: "",
  startDate: "",
  endDate: "",
};

const WorkInfo = () => {
  //const history = Router;
  const router = useRouter();
  const dispatch = useDispatch();
  const [seekerId, setSeekerId] = useState(null);
  const { jobSeekerDetails, loading, redirect } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );
  const { visaTypeData } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  // const companyName = jobSeekerDetails?.company
  // const jobRole = jobSeekerDetails?.job_title
  // const jobSpec = jobSeekerDetails?.job_responsiblity
  // const onClick = () => history.push("/vcard/education-details");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [experience, setExperience] = useState(1);
  const [jobSpecialisation, setJobSpecialisation] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [companyNames, setCompanyNames] = useState("");
  const [jobRoles, setJobRole] = useState("");
  const [details, setDetails] = useState(initialValues);
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

    // let obj = {
    //   first_name: jobSeekerDetails?.first_name,
    //   last_name: jobSeekerDetails?.last_name,
    //   location: jobSeekerDetails?.location,
    //   vaccination_status: jobSeekerDetails?.vaccination_Status,
    //   gender: jobSeekerDetails?.gender,
    //   profile_pic: "dog-care.webp",
    //   latitude: 28.6222163,
    // };
    // setImageFileData(URL.createObjectURL(file));
  };
  const radioHandler = (experience) => {
    setExperience(experience);
  };
  useEffect(() => {
    if (jobSeekerDetails !== null) {
      const detailData =
        jobSeekerDetails?.professionaldetails?.experience[
          jobSeekerDetails?.professionaldetails?.experience?.length - 1
        ];
      setProfessional(detailData);
      // console.log("@@@@", jobSeekerDetails?.totalExperience);
      setExperience(jobSeekerDetails?.totalExperience);
    }
    //console.log("@@@detail11", jobSeekerDetails?.professionaldetails?.experience[jobSeekerDetails?.professionaldetails?.experience?.length - 1])
  }, [jobSeekerDetails]);

  // console.log("@@professional", jobSeekerDetails);

  const ValidationSchema = Yup.object().shape({
    visa_type: Yup.string().nullable(),
  });

  const workExpList = [
    { id: 1, name: "0-1 year" },

    { id: 2, name: "1-2 years" },

    { id: 3, name: "2-3 years" },

    { id: 4, name: "3-5 years" },

    { id: 5, name: "5-7 years" },

    { id: 6, name: "7-10 years" },

    { id: 7, name: "10+ years" },
  ];

  useEffect(() => {
    dispatch(getJobSeekerDetail());
  }, [dispatch]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const { userId } = JSON.parse(applyKart);
      setSeekerId(userId);
    }
  }, []);

  useEffect(() => {
    if (jobSeekerDetails !== null) {
      setCompanyNames(professional?.company);
      setExperience(jobSeekerDetails?.totalExperience);
      setJobSpecialisation(professional?.job_Responsiblity);
      setJobRole(professional?.job_Title);
      // console.log(professional);
      // setExperience(jobSeekerDetails?.)
      setDetails((prevState) => {
        return {
          ...prevState,
          visa_type: jobSeekerDetails?.visa_type,
          worked_before: jobSeekerDetails?.worked_before,
          experience: jobSeekerDetails?.worked_before == 1 ? "yes" : "no",
          //months: jobSeekerDetails?.months,
          company: professional?.company,
          jobRole: professional?.job_Title,
          specialisation: professional?.job_Responsiblity,
          startDate: professional?.start_date,
          endDate: professional?.end_date,
        };
      });

      setExperience(jobSeekerDetails?.totalExperience);

      if (professional?.start_date && professional?.end_date) {
        setStartDate(moment(professional?.start_date).format('YYYY-MM-DD'));
        setEndDate(moment(professional?.end_date).format('YYYY-MM-DD'));
      }
    }
  }, [jobSeekerDetails, professional]);

  useEffect(() => {
    dispatch(getVisaType());
  }, [dispatch]);

  const handleSubmit = (values) => {
    // if (!values.visa_type) {
    //   Swal.fire({
    //     icon: "error",
    //     text: "Select a visa type",
    //   });
    //   return;
    // }

    if (values.experience === "yes") {
      if (!experience) {
        Swal.fire({ title: "Experience required", icon: "error" });
        return;
      }
      if (!values.company || values.company.trim() == "") {
        Swal.fire({ title: "Company name required", icon: "error" });
        return;
      }
      if (!startDate) {
        Swal.fire({ title: "Start date required", icon: "error" });
        return;
      }
      if (!endDate) {
        Swal.fire({ title: "End date required", icon: "error" });
        return;
      }
    }

    // console.log(experience);
    // return;
    const vcardWorkDetails = {
      user_id: seekerId,
      visa_type: values.visa_type,
      worked_before: values.experience === "yes" ? 1 : 0,
      work_experience: [
        {
          months: experience,
          company: values.company,
          role: values.jobRole,
          specialisation: values.specialisation,
          start_date: startDate,
          end_date: endDate,
        },
      ],
    };
    dispatch(saveVcardWorkDetails(vcardWorkDetails));
  };

  useEffect(() => {
    if (redirect) {
      dispatch(actions.setRedFalse());
      router.push("/vcard/education-details");
    }
  }, [redirect]);

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
                  {/* <div className="image">
                  <img
                    src={`${
                      jobSeekerDetails?.profile_pic || "/assets/images/user.png"
                    }`}
                    style={{ borderRadius: "50%" }}
                    className="image-fit"
                    alt="img"
                  />
                </div> */}
                  <div
                    className="card_content section-bg no-overlay"
                    style={{
                      background:
                        "center / cover no-repeat url(" +
                        BASE_URL +
                        "/../assets/images/v_card_bg.png),transparent linear-gradient(90deg, #0000FF 0%, #1CB5E0 100%)",
                    }}
                  >
                    <div className="user_info text-start">
                      <h5 className="name text-center">
                        {jobSeekerDetails?.first_name
                          ? `${jobSeekerDetails?.first_name} ${jobSeekerDetails?.last_name}`
                          : "Your Name"}
                      </h5>
                      <ul className="basic_form user_data">
                        <li>
                          {experience && experience != "undefined"
                            ? `${experience}`
                            : jobSeekerDetails?.totalExperience
                            ? `${jobSeekerDetails?.totalExperience}`
                            : "Total work experience"}
                        </li>
                        <li className="text-transform">
                          {companyNames || "Company name"}
                          <span className="type">{jobRoles || "Job Role"}</span>
                        </li>
                        <li>{jobSpecialisation || "Job specialization"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="vCard_textarea ps-lg-5">
                  <div className="section-header">
                    <h3 className="title">Work Details</h3>
                    <p className="text mb-0">
                      Please add your work details here.
                    </p>
                  </div>
                  <Formik
                    //initialValues={initialValues}
                    enableReinitialize={true}
                    initialValues={details}
                    onSubmit={(values) => {
                      // console.log("@@values", values)
                      handleSubmit(values);
                    }}
                    validationSchema={ValidationSchema}
                  >
                    {({
                      values,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      handleChange,
                      errors,
                    }) => {
                      return (
                        <form>
                          <Fragment>
                            <div className="form-group">
                              <select
                                className="form-control form-select form-select"
                                name="visa_type"
                                value={values.visa_type}
                                //onChange={handleChange}
                                onChange={(e) =>
                                  setFieldValue("visa_type", e.target.value)
                                }
                                onBlur={handleBlur}
                                required
                              >
                                <option>Select Visa Type</option>
                                {visaTypeData?.map((item) => (
                                  <option
                                    key={`index${item?.visa_id}`}
                                    value={item?.visa_type}
                                  >
                                    {item?.visa_type}
                                  </option>
                                ))}
                              </select>
                              {errors.visa_type ? (
                                <div style={{ color: "red" }}>
                                  {errors.visa_type}
                                </div>
                              ) : null}
                            </div>
                          </Fragment>
                          <div className="form-group">
                            <label className="text-black">
                              Have you worked before?
                            </label>
                            <div className="image_radio basic">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="experience"
                                  value="yes"
                                  id="yes"
                                  onChange={(e) => {
                                    setFieldValue("experience", e.target.value);
                                  }}
                                  checked={
                                    values.experience === "yes" && "checked"
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="yes"
                                >
                                  <span className="icon">
                                    <img
                                      src="/assets/images/icons/radio/inactive.png"
                                      alt="icon"
                                    />
                                    <img
                                      src="/assets/images/icons/radio/active.png"
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
                                  name="experience"
                                  id="no"
                                  value="no"
                                  onChange={(e) =>
                                    setFieldValue("experience", e.target.value)
                                  }
                                  checked={
                                    values.experience === "no" && "checked"
                                  }
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="no"
                                >
                                  <span className="icon">
                                    <img
                                      src="/assets/images/icons/radio/inactive.png"
                                      alt="icon"
                                    />
                                    <img
                                      src="/assets/images/icons/radio/active.png"
                                      alt="icon"
                                    />
                                  </span>
                                  <div className="text">No</div>
                                </label>
                              </div>
                            </div>
                          </div>
                          {values.experience === "yes" && (
                            <Fragment>
                              <div className="form-group">
                                <select
                                  className="form-control form-select"
                                  name="workExp"
                                  onChange={(e) =>
                                    setExperience(e.target.value)
                                  }
                                  required
                                  value={experience}
                                >
                                  <option>Total Work Experience</option>
                                  {workExpList.map((item) => (
                                    <option
                                      key={item.id}
                                      value={item.name}
                                      // selected={
                                      //   jobSeekerDetails?.totalExperience ==
                                      //   item.name
                                      // }
                                    >
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="company"
                                  placeholder="Company Name"
                                  value={values?.company}
                                  onChange={(e) => {
                                    setFieldValue("company", e.target.value);
                                    setCompanyNames(e.target.value);
                                  }}
                                  onBlur={handleBlur}
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="specialisation"
                                  value={values?.specialisation}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "specialisation",
                                      e.target.value
                                    );
                                    setJobSpecialisation(e.target.value);
                                  }}
                                  onBlur={handleBlur}
                                  placeholder="Job Specialization"
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="jobRole"
                                  value={values?.jobRole}
                                  onChange={(e) => {
                                    setFieldValue("jobRole", e.target.value);
                                    setJobRole(e.target.value);
                                  }}
                                  onBlur={handleBlur}
                                  placeholder="Job Role"
                                  required
                                />
                              </div>
                              <div className="row g-2 g-sm-4">
                                <div className="col-6">
                                  <div className="form-group">
                                    <div className="input-group date_style">
                                    <input 
                                      className="form-control"
                                      placeholder="Start Date"
                                      type="date"
                                      id="start" 
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
                                          setStartDate(date);
                                        }}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        className="form-control"
                                        placeholderText="Start Date"
                                      /> */}
                                      {/* <div className="input-group-append">
                                        <button
                                          type="button"
                                          className="input-group-text"
                                        >
                                          <i className="fal fa-calendar-alt" />
                                        </button>
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <div className="input-group date_style">
                                    <input 
                                      className="form-control"
                                      placeholder="End Date"
                                      type="date"
                                      id="start" 
                                      name="trip-start"
                                      value={endDate || ''}
                                      onChange={(e) => {
                                        // console.log(e.target.value);
                                        setEndDate(moment(e?.target?.value).format('YYYY-MM-DD'));
                                      }}
                                      />
                                      {/* <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        className="form-control"
                                        placeholderText="End Date"
                                      /> */}
                                      {/* <div className="input-group-append">
                                        <button
                                          type="button"
                                          className="input-group-text"
                                        >
                                          <i className="fal fa-calendar-alt" />
                                        </button>
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          )}
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-warning mx-3 d-block"
                              type="button"
                              onClick={() => router.push("/vcard/basic")}
                            >
                              <i className="fal fa-long-arrow-left me-3"></i>
                              Back
                            </button>
                            <button
                              className="btn btn-warning mx-3 d-block"
                              type="submit"
                              onClick={handleSubmit}
                            >
                              Next <i className="fal fa-long-arrow-right"></i>
                            </button>
                          </div>
                        </form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </Fragment>
  );
};

export default WorkInfo;
