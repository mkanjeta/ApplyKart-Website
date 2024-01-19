import { Fragment, useContext, useEffect, useState } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import { BASE_URL } from "constants/constants";
import Router, { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { PostjobContext } from "../../post-job/postJobContext";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import { toggleHamburger } from "helper/helper";
import { editAJob } from "redux/actions/jobBrowse";
import { useDispatch, useSelector } from "react-redux";

const interviewSchema = Yup.object().shape({
  companyname: Yup.string().max(100).nullable(true).required("Company Name is required"),
  jobposter: Yup.string().max(50).required("Job Poster Name is required"),
  contactdata: Yup.string()
    .min(8, "Invalid number")
    .max(50, "Invalid number")
    .required("Contact number is required"),
  email: Yup.string().email("invalid email").required("Email is required"),
});

const Interviewinformation = ({ handleSwitchComp, edit }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { redirect, jobDetail } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  const { uplodedDocumentData } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );
  // console.log("formData ==>>", formData)
  useEffect(() => {
    if (redirect) {
      dispatch({ type: "RESET_REDIRECT_FALSE" });
      router.push(`/jobs/details/${jobDetail.job_Id}`);
    }
  }, [redirect]);
  const { formData, setFormData } = useContext(PostjobContext);
  const [formsData, setFormsdata] = useState(null);
  const handleFormSubmit = (values) => {
    setFormData((prev) => {
      return {
        ...prev,
        Company: values?.companyname ? values?.companyname : "",
        companyname: values?.companyname ? values?.companyname : "",

        Contact_No: values?.contactdata,
        contactdata: values?.contactdata,

        Address: values?.email,
        email: values?.email,

        job_poster_name: values?.jobposter,
        jobposter: values?.jobposter,
      };
    });
    setTimeout(() => {
      if (values?.companyname && values?.contactdata && values?.email) {
        handleSwitchComp(3);
      }
    }, 1000);
  };
  const saveAndExit = (values) => {
    let obj = {
      job_id: localStorage.getItem("jobId"),
      Company: values?.companyname,
      Contact_No: values?.contactdata,
      job_Poster_Name: values?.jobposter,
      email: values?.email,
    };
    // console.log(obj);
    // return;
    dispatch({ type: "POSTED_EDIT_JOB_INIT" });
    dispatch(editAJob(obj));
  };

  useEffect(() => {
    setFormsdata(formData);
    document.getElementById("scroll-helper").scrollIntoView();
  }, [formsData]);

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
                <span className="icon">
                  <img
                    src={"/assets/images/icons/icon-ios-arrow-left.svg"}
                    alt="icon"
                  />
                </span>{" "}
                INTERVIEW INFORMATION
              </h3>
            </div>
            <Formik
              //initialValues={initialValues}
              enableReinitialize={true}
              initialValues={formData}
              validationSchema={interviewSchema}
              onSubmit={(values) => {
                // console.log("@@values", values);
                handleFormSubmit(values);
              }}
            >
              {({
                values,
                handleBlur,
                handleSubmit,
                setFieldValue,
                handleChange,
                errors,
                touched,
              }) => {
                // console.log("values ==>>", values)
                return (
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className="formpostjob"
                  >
                    <div className="row p-3">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="companyname" className="label">
                            Company Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyname"
                            id="companyname"
                            placeholder="Company Name"
                            value={values?.companyname == null ? "" : values.companyname}
                            onChange={(e) => {
                              setFieldValue("companyname", e.target.value);
                            }}
                            onBlur={handleBlur}
                          //required
                          />
                          {errors.companyname ? (
                            <div style={{ color: "tomato" }}>
                              {errors.companyname}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jobposter" className="label">
                            Name Of Job Poster
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="jobposter"
                            id="jobposter"
                            placeholder="Name Of Job Poster"
                            value={values?.jobposter}
                            onChange={(e) => {
                              setFieldValue("jobposter", e.target.value);
                            }}
                            onBlur={handleBlur}
                          //required
                          />
                          {errors.jobposter ? (
                            <div style={{ color: "tomato" }}>
                              {errors.jobposter}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="contactdata" className="label">
                            Contact Number
                          </label>
                          <PhoneInput
                            country={"au"}
                            onlyCountries={["au, in"]}
                            countryCodeEditable={true}
                            placeholder="Enter contact number"
                            inputClass="form-control phnInput"
                            value={values?.contactdata}
                            onChange={(phone, code) => {
                              setFieldValue("contactdata", phone);
                            }}
                          />
                          {errors.contactdata ? (
                            <div style={{ color: "tomato" }}>
                              {errors.contactdata}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="email" className="label">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Write your email"
                            value={values?.email}
                            onChange={(e) => {
                              setFieldValue("email", e.target.value);
                            }}
                            onBlur={handleBlur}
                          //required
                          />
                          {errors.email ? (
                            <div style={{ color: "tomato" }}>
                              {errors.email}
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
                      <button
                        type="submit"
                        className="btn btn-warning  mb-3 me-5"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSwitchComp(1);
                        }}
                      >
                        <i className="fal fa-long-arrow-left me-2"></i> Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-warning  mb-3 me-5"
                      >
                        Next <i className="fal fa-long-arrow-right"></i>
                      </button>
                    </div>

                    {/* <div className='row'>
                                    <div className='col-md-12 text-center'>
                                    <button type="submit" className='btn btn-warning mx-auto w-50 mt-3 mb-3'>Next <i className="fal fa-long-arrow-right"></i></button>
                                    </div>
                                </div> */}
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

export default Interviewinformation;
