import { Fragment, useContext, useEffect, useState } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import { BASE_URL } from "constants/constants";
import Select from "react-select";
import Router, { useRouter } from "next/router";
import { PostjobContext } from "../../post-job/postJobContext";
import Autocomplete from "react-google-autocomplete";
import { Formik } from "formik";
import * as Yup from "yup";
import { toggleHamburger } from "helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { editAJob } from "redux/actions/jobBrowse";

var submission = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];
function submissionnote(val) {
  // console.log("Selected: ", val);
}
const locationSchema = Yup.object().shape({
  street: Yup.string().required("Location is required"),

  //Base: Yup.string().required("Base is required."),
});
// For map
const LocationDetails = ({ handleSwitchComp, edit }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { redirect, jobDetail } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  useEffect(() => {
    if (redirect) {
      dispatch({ type: "RESET_REDIRECT_FALSE" });
      router.push(`/jobs/details/${jobDetail.job_Id}`);
    }
  }, [redirect]);
  const { formData, setFormData } = useContext(PostjobContext);
  const [formsData, setFormsdata] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longuitude, setLonguitude] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // console.log(apiKey);

  console.log("formData ==>>", formData)
  const current = new Date();
  const handleFormSubmit = (values) => {
    console.log(values);
    // return;
    setFormData((prev) => {
      return {
        ...prev,
        Location: values?.street,
        street: values?.street,
        longitude: values?.longitude,
        latitude: values?.latitude,
        Posting_Date: `${current.getFullYear()}/${
          current.getMonth() + 1
        }/${current.getDate()}`,
        Interview_Location_Same: values?.Interview_Location_Same,
        Interview_address: values?.Interview_Location_Same
          ? values?.street
          : values?.Interview_address,
      };
    });
    setTimeout(() => {
      if (values?.street) {
        handleSwitchComp(4);
      }
    }, 1000);
  };

  const saveAndExit = (values) => {
    let obj = {
      job_id: localStorage.getItem("jobId"),
      location: values?.street,
      latitude: values?.latitude,
      longitude: values?.longitude,
      interview_Location_Same: values?.Interview_Location_Same,
      Interview_address: values?.Interview_Location_Same
        ? values?.street
        : values?.Interview_address,
    };
    // return;
    dispatch({ type: "POSTED_EDIT_JOB_INIT" });
    dispatch(editAJob(obj));
  };
  useEffect(() => {
    setFormsdata(formData);
    document.getElementById("scroll-helper").scrollIntoView();
    // console.log("##formData", formsData);
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
                Job Location
              </h3>
            </div>
            <Formik
              enableReinitialize={true}
              validationSchema={locationSchema}
              initialValues={formData}
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
              }) => {
                return (
                  <form className="formpostjob">
                    <div className="row p-3">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="label">Job Address</label>
                          <Autocomplete
                            
                            apiKey={apiKey}
                            options={{
                              types: ["establishment", "geocode"],
                              fields: ["formatted_address", "geometry", "name"],
                            }}
                            onPlaceSelected={(place) => {
                              console.log("place ==>>", place)
                              setLatitude(place?.geometry.location.lat());
                              setLonguitude(place?.geometry.location.lng());
                              setFieldValue(
                                "latitude",
                                place?.geometry.location.lat()
                              );
                              setFieldValue(
                                "longitude",
                                place?.geometry.location.lng()
                              );
                              setFieldValue("street", place?.formatted_address);
                            }}
                            defaultValue={formData.street}
                            name="street"
                            className="form-control mb-3"
                            placeholder="Job Address"
                          />
                          {errors.street ? (
                            <div style={{ color: "tomato" }}>
                              {errors.street}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label className="label">
                            Interview Address Same?
                          </label>
                          <div className="radio col-md-6">
                            <div className="image_radio default">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  value={true}
                                  name="jobType"
                                  id="fulltime"
                                  onChange={(e) => {
                                    setFieldValue("jobType", 2);
                                  }}
                                  onClick={() => {
                                    setFieldValue(
                                      "Interview_Location_Same",
                                      true
                                    );
                                  }}
                                  checked={
                                    values?.Interview_Location_Same == true
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="fulltime"
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
                                  <div className="text">Yes</div>
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  value={false}
                                  name="jobType"
                                  id="fulltimeNo"
                                  onClick={() => {
                                    setFieldValue(
                                      "Interview_Location_Same",
                                      false
                                    );
                                  }}
                                  checked={
                                    values?.Interview_Location_Same == false
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="fulltimeNo"
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
                                  <div className="text">No</div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {!values?.Interview_Location_Same ? (
                          <div className="form-group">
                            <label className="label">Interview Address</label>
                            <Autocomplete
                              apiKey={apiKey}
                              options={{
                                types: ["establishment", "geocode"],
                                fields: [
                                  "formatted_address",
                                  "geometry",
                                  "name",
                                ],
                              }}
                              onPlaceSelected={(place) => {
                                setFieldValue(
                                  "Interview_address",
                                  place?.formatted_address
                                );
                              }}
                              defaultValue={formData?.Interview_address}
                              name="street"
                              className="form-control mb-3"
                              placeholder="Interview Address"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
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
                          handleSwitchComp(2);
                        }}
                      >
                        <i className="fal fa-long-arrow-left me-2"></i> Back
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-warning  mb-3 me-5"
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

export default LocationDetails;
