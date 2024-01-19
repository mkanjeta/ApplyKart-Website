import {
  Fragment,
  useEffect,
  useInsertionEffect,
  useRef,
  useState,
} from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import { BASE_URL } from "constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobSeekerDetail,
  getUniversitylist,
  saveVcardEducationDetails,
} from "redux/actions/workActions";
import { Formik } from "formik";
import Select from "react-select";
import { getEducationList, getSkillsList } from "redux/actions/jobBrowse";
import * as Yup from "yup";
import Loader from "components/shared/loader";
import FileUpload from "components/fileUploader";
import * as actions from "../../../redux/actions/vcardActions";

const initialValues = {
  education: "",
  specialization: "",
  college: "",
};

const EducationInfo = () => {
  const { educationListData, skillsListData, loading } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );

  const [search, setSearch] = useState(() => "");

  // console.log("@@@12", skillsListData)
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(null);
  const [seekerId, setSeekerId] = useState(null);
  // const [specializations, setSpecialization] = useState("");
  const [educations, setEducation] = useState("");
  const [college, setCollege] = useState("");
  const [educationData, setEducationData] = useState(null);
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

  const [educationDetails, setEducationDetail] = useState(initialValues);
  const dispatch = useDispatch();
  const {
    jobSeekerDetails,
    universityList,
    loading: loading1,
    redirect,
  } = useSelector(({ vcardWorkReducer }) => vcardWorkReducer);
  // console.log("@@redirect", redirect);

  // console.log("jobSeekerDetails ==>>", jobSeekerDetails)

  useEffect(() => {
    dispatch(getJobSeekerDetail());
  }, []);
  useEffect(() => {
    dispatch(getUniversitylist());
  }, []);

  const createOptions = educationListData?.map((el) => {
    return {
      label: el?.education_Level,
      value: el?.education_Level_Id,
      id: el?.education_Level_Id,
    };
  });

  const createOptionsSpec = skillsListData?.map((el) => {
    return {
      label: el?.skill,
      value: el?.skill,
      id: el?.skill_id,
    };
  });

  const createOptionsCol = universityList?.data.map((el) => {
    return {
      label: el?.university,
      value: el?.university,
      id: el?.university_id,
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const { userId } = JSON.parse(applyKart);
      setSeekerId(userId);
    }
  }, []);
  useEffect(() => {
    if (jobSeekerDetails !== null) {
      const detailData =
        jobSeekerDetails?.education?.education[
          jobSeekerDetails?.education?.education?.length - 1
        ];
      setEducationData(detailData);
    }
    // console.log("@@@detail11",educationData )
  }, [jobSeekerDetails]);

  const handleSubmit = (values) => {
    const vcardEducationDetails = {
      user_id: seekerId,
      education_details: [
        {
          education_level: values.education ? values.education : 8,
          // specialization: values.specialization,
          university: values.college || "",
          skills: "[]",
          start_date: "2021/01/13",
          end_date: "2022/01/13",
        },
      ],
    };
    dispatch(saveVcardEducationDetails(vcardEducationDetails));
  };
  useEffect(() => {
    if (redirect) {
      dispatch({ type: "SET_VCARD_REDIRECT_FALSE" });
      router.push("/vcard/skills");
    }
  }, [redirect]);
  useEffect(() => {
    dispatch(getEducationList());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getSkillsList());
  }, [dispatch]);

  useEffect(() => {
    if (jobSeekerDetails !== null) {
      // setSpecialization(educationData?.specialization);
      setCollege(educationData?.university);
      setEducation(educationData?.education_Level);
    }
  }, [jobSeekerDetails, educationData]);

  // console.log("@@details", jobSeekerDetails);

  const formikRef = useRef();
  useEffect(() => {
    if (!formikRef.current) return;
    formikRef.current.setFieldValue(
      "education",
      educationData?.education_Level_Id
    );
    // formikRef.current.setFieldValue("specialization", educationData?.specialization)
    formikRef.current.setFieldValue("college", educationData?.university);
  }, [educationData]);

  const EducationSchema = Yup.object().shape({
    education: Yup.number(),
    college: Yup.string(),
  });

  useEffect(() => {
    // console.log(search);
    dispatch({ type: "GET_UNIVERSITY_LIST_INIT", payload: search });
  }, [search]);

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
            {loading1 && <Loader />}
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
                    //src={`${jobSeekerDetails?.profile_pic || BASE_URL + "/assets/images/user.png"}`}
                    // src={BASE_URL + "/assets/images/user.png"}
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
                      <h5 className="name text-center text-capitalize">
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
                      <ul className="basic_form user_data">
                        <li>{educations || "Education"}</li>
                        <li>{college || "College"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="vCard_textarea ps-lg-5">
                  <div className="section-header">
                    <h3 className="title">Education Details</h3>
                    <p className="text mb-0">
                      Please add your education details here.
                    </p>
                  </div>
                  <Formik
                    innerRef={formikRef}
                    initialValues={educationDetails}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      handleSubmit(values);
                    }}
                    validationSchema={EducationSchema}
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
                          <div className="form-group">
                            <Select
                              id="education"
                              instanceId="education"
                              options={createOptions}
                              placeholder="Education"
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
                                // console.log(item);
                                setFieldValue("education", item?.value);
                                setEducation(item?.label);
                              }}
                              name="education"
                            />
                            {errors.education ? (
                              <div style={{ color: "red" }}>
                                {errors.education}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <Select
                              id="college"
                              instanceId="college"
                              options={createOptionsCol}
                              placeholder="College"
                              className="form-control form-select"
                              closeMenuOnSelect={true}
                              onInputChange={(e) => {
                                setSearch(e);
                              }}
                              isMulti={false}
                              value={
                                createOptionsCol &&
                                createOptionsCol?.find(
                                  (option) => option.value === values.college
                                )
                              }
                              onChange={(item) => {
                                setFieldValue("college", item?.value);
                                setCollege(item?.label);
                              }}
                              name="college"
                            />
                            {errors.college ? (
                              <div style={{ color: "red" }}>
                                {errors.college}
                              </div>
                            ) : null}
                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-warning mx-3 d-block"
                              type="button"
                              onClick={() => router.push("/vcard/work-details")}
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

export default EducationInfo;
