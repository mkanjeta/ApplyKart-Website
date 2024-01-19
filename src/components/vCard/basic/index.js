import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { BASE_URL } from "constants/constants";
import { Formik } from "formik";
import Autocomplete from "react-google-autocomplete";
import * as actions from "../../../redux/actions/vcardActions";
import { useDispatch, useSelector } from "react-redux";
import { getJobSeekerDetail } from "redux/actions/workActions";
import FileUpload from "components/fileUploader";
import Loader from "components/shared/loader";
import * as Yup from "yup";
import Swal from "sweetalert2";

const initialValues = {
  first_name: "",
  last_name: "",
  address: "",
  vaccineStatus: "",
  gender: "",
};
const BasicInfo = () => {
  const dispatch = useDispatch();
  const {
    jobSeekerDetails,
    fileName,
    loading: loading1,
  } = useSelector(({ vcardWorkReducer }) => vcardWorkReducer);
  const { basicDetail1, loading, redirect } = useSelector(
    ({ vcardReducer }) => vcardReducer
  );

  // console.log("jobSeekerDetails ==>>", jobSeekerDetails)


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vaccineStatus, setVaccineStatus] = useState("");
  const [gender, setGeneder] = useState("");
  const [address, setAddresses] = useState("");
  const [profile, setProfile] = useState(initialValues);
  const [imageFileData, setImageFileData] = useState(null);
  const router = useRouter();
  const { entity } = useSelector(({ AuthReducer }) => AuthReducer);
  // const onClick = () => history.push("/vcard/work-details");
  // const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // const [accessToken, setaccessToken] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longuitude, setLonguitude] = useState("");
  const [image, setImage] = useState(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const applyKart = localStorage.getItem("applyKart");
  //     const applyKartData = JSON.parse(applyKart);
  //     setaccessToken(applyKartData?.encryptedToken);
  //   }
  // }, []);

  const handleImageData = (file) => {
    setImage(file);
    setImageFileData(URL.createObjectURL(file));
  };

  const handleFormSubmit = (values) => {
    if (!imageFileData && !jobSeekerDetails?.profile_pic) {
      Swal.fire({ title: "Upload a profile picture", icon: "error" });
      return;
    }
    const vcardBasicDetails = {
      first_name: values.first_name,
      last_name: values.last_name,
      location: values.address,
      vaccination_status: values.vaccineStatus,
      gender: values.gender,
      user_id: entity?.user_id,
      profile_pic: fileName.name || null,
      file: fileName,
      latitude: latitude || jobSeekerDetails?.latitude,
      longitude: longuitude || jobSeekerDetails?.longuitude,
      image: image,
    };
    dispatch(actions.saveVcardBasicDetails(vcardBasicDetails));
    // setTimeout(() => {
    // router.push("/vcard/work-details")
    // }, [5000])
  };

  useEffect(() => {
    if (redirect) {
      // console.log("Work details");
      dispatch(actions.setRedirectFalse());
      router.push("/vcard/work-details");
    }
  }, [redirect]);

  useEffect(() => {
    if (jobSeekerDetails == null) {
      dispatch(getJobSeekerDetail());
    }
  }, [dispatch]);

  useEffect(() => {
    if (jobSeekerDetails !== null) {
      setFirstName(jobSeekerDetails?.first_name);
      setLastName(jobSeekerDetails?.last_name);
      setGeneder(jobSeekerDetails?.gender);
      setAddresses(jobSeekerDetails?.job_location);
      setVaccineStatus(
        ((jobSeekerDetails?.vaccination_Status == "1" ||
          jobSeekerDetails?.vaccination_Status == "singleDose") &&
          "singleDose") ||
        ((jobSeekerDetails?.vaccination_Status == "2" ||
          jobSeekerDetails?.vaccination_Status == "doubleDose") &&
          "doubleDose") ||
        ((jobSeekerDetails?.vaccination_Status == "3" ||
          jobSeekerDetails?.vaccination_Status == "tripleDose") &&
          "tripleDose") ||
        ""
      );
      setProfile((prevState) => {
        return {
          ...prevState,
          first_name: jobSeekerDetails?.first_name,
          last_name: jobSeekerDetails?.last_name,
          address: jobSeekerDetails?.location,
          vaccineStatus:
            ((jobSeekerDetails?.vaccination_Status == "1" ||
              jobSeekerDetails?.vaccination_Status == "singleDose") &&
              "singleDose") ||
            ((jobSeekerDetails?.vaccination_Status == "2" ||
              jobSeekerDetails?.vaccination_Status == "doubleDose") &&
              "doubleDose") ||
            ((jobSeekerDetails?.vaccination_Status == "3" ||
              jobSeekerDetails?.vaccination_Status == "tripleDose") &&
              "tripleDose") ||
            "",
          gender: jobSeekerDetails?.gender,
        };
      });
    }
  }, [jobSeekerDetails]);

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("First Name Required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Last Name Required"),
    address: Yup.string().required("Location Required").nullable(),
    vaccineStatus: Yup.string()
      .nullable(),
    gender: Yup.string().nullable(),
  });

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="style_two" logoUrl="/assets/images/logo-white.png" />
      <section className="relative full-height section-padding d-flex align-items-center">
        <div
          className="section-bg half-bg no-overlay"
          style={{
            backgroundImage: "url(" + BASE_URL + "/assets/images/bg/1.png)",
          }}
        ></div>
        <div className="d-flex align-items-center vh-height">
          <Container>
            {(loading || loading1) && <Loader />}
            <div className="row p-4 align-items-center">
              <div className="col-lg-6">
                <div className="v_card">
                  <div className="image">
                    <img
                      // URL.createObjectURL(fileName)
                      src={`${imageFileData ||
                        jobSeekerDetails?.profile_pic ||
                        "/assets/images/default-user.png"
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
                    <div className="user_info text-start">
                      <h5 className="name text-center text-capitalize">
                        {firstName || lastName
                          ? `${firstName} ${lastName || ''}`
                          : "Your Name"}
                      </h5>
                      <ul className="basic_form user_data">
                        <li>
                          <span className="icon">
                            <img
                              src={"/assets/images/icons/location.svg"}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {address
                            ? address
                            : jobSeekerDetails?.job_location
                              ? jobSeekerDetails?.job_location
                              : "Your Location"}
                          {/* <span className="type">{addresses ? addresses : jobSeekerDetails?.location}</span> */}
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src={`/assets/images/icons/gender/white/${gender
                                ? gender
                                : jobSeekerDetails?.gender || "gender_default"
                                }.svg`}
                              // src={`/assets/images/icons/gender/white/gender_default.svg`}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {gender == "non_binary"
                            ? "Non Binary"
                            : (gender == "female" && "Female") ||
                            (gender == "male" && "Male") ||
                            "Gender"}
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src={`/assets/images/icons/vaccine/white/${vaccineStatus ||
                                (jobSeekerDetails?.vaccination_Status == 1 &&
                                  "singleDose") ||
                                (jobSeekerDetails?.vaccination_Status == 2 &&
                                  "doubleDose") ||
                                (jobSeekerDetails?.vaccination_Status == 3 &&
                                  "tripleDose") ||
                                "singleDose"
                                }.svg`}
                              alt="icon"
                              className="image-fit-contain"
                            />
                          </span>
                          {vaccineStatus
                            ? ((vaccineStatus == "singleDose" &&
                              "Single Dose") ||
                            (vaccineStatus == "doubleDose" &&
                              "Double Dose") ||
                            (vaccineStatus == "tripleDose" &&
                              "Triple Dose") ||
                            (vaccineStatus == "notVaccinated" && 
                            "Not Vaccinated"))
                            : ((jobSeekerDetails?.vaccination_Status == 3 &&
                              "Triple Dose") ||
                            (jobSeekerDetails?.vaccination_Status == 2 &&
                              "Double Dose") ||
                            (jobSeekerDetails?.vaccination_Status == 1 &&
                              "Single Dose") ||
                            (jobSeekerDetails?.vaccination_Status == 0 &&
                              "Not Vaccinated") ||
                            "Vaccination Status")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="vCard_textarea ps-lg-5">
                  <div className="section-header">
                    <h3 className="title">V-Card</h3>
                    <p className="text mb-0">
                      Let's start with getting your visiting card up-to-date. We
                      promise it won't take more than 5 minutes!
                    </p>
                  </div>
                  <Formik
                    validationSchema={SignupSchema}
                    enableReinitialize={true}
                    initialValues={profile}
                    onSubmit={(values) => {
                      handleFormSubmit(values);
                    }}
                  >
                    {({
                      values,
                      setFieldValue,
                      errors,
                      touched,
                      handleBlur,
                      handleSubmit,
                    }) => {

                      return (
                        <form>
                          <div className="form-group">
                            <input
                              type="name"
                              className="form-control text-capitalize"
                              name="first_name"
                              placeholder="First Name"
                              value={values?.first_name}
                              maxLength="50"
                              onChange={(e) => {
                                setFieldValue("first_name", e.target.value);
                                setFirstName(e.target.value);
                              }}
                              onBlur={handleBlur}
                              required
                            />
                            {errors.first_name && touched.first_name ? (
                              <div style={{ color: "red" }}>
                                {errors.first_name}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <input
                              type="name"
                              className="form-control text-capitalize"
                              name="last_name"
                              maxLength="50"
                              placeholder="Last Name"
                              value={values?.last_name}
                              onChange={(e) => {
                                setFieldValue("last_name", e.target.value);
                                setLastName(e.target.value);
                              }}
                              onBlur={handleBlur}
                              required
                            />
                            {errors.last_name ? (
                              <div style={{ color: "red" }}>
                                {errors.last_name}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <Autocomplete
                              name="address"
                              options={{
                                types: ["establishment", "geocode"],
                                fields: [
                                  "formatted_address",
                                  "geometry",
                                  "name",
                                ],
                              }}
                              defaultValue={
                                address
                              }
                              apiKey={
                                process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                              }
                              onPlaceSelected={(places) => {
                                // console.log(places);
                                if (
                                  !places ||
                                  Object.keys(places).length === 0
                                ) {
                                  return;
                                }
                                setLatitude(places.geometry.location.lat());
                                setLonguitude(places.geometry.location.lng());
                                setFieldValue(
                                  "address",
                                  places?.formatted_address
                                );
                                setAddresses(places?.formatted_address);
                              }}
                              className={`form-control`}
                            />
                            {errors.address ? (
                              <div style={{ color: "red" }}>
                                {errors.address}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <label className="text-black">
                              Vaccination status <span className="optional">(optional)</span>
                            </label>

                            <div className="image_radio">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="vaccineStatus"
                                  value="singleDose"
                                  id="singleDose"
                                  onChange={(e) => {
                                    setFieldValue("vaccineStatus", "1");
                                    setVaccineStatus(e.target.value);
                                  }}
                                  checked={
                                    (values.vaccineStatus === "1" ||
                                      vaccineStatus == "singleDose") &&
                                    "checked"
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
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="vaccineStatus"
                                  value="doubleDose"
                                  id="doubleDose"
                                  onChange={(e) => {
                                    setFieldValue("vaccineStatus", "2");
                                    setVaccineStatus(e.target.value);
                                  }}
                                  checked={
                                    (values.vaccineStatus === "2" ||
                                      vaccineStatus == "doubleDose") &&
                                    "checked"
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
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="vaccineStatus"
                                  value="tripleDose"
                                  id="tripleDose"
                                  onChange={(e) => {
                                    setFieldValue("vaccineStatus", "3");
                                    setVaccineStatus(e.target.value);
                                  }}
                                  checked={
                                    (values.vaccineStatus === "3" ||
                                      vaccineStatus == "tripleDose") &&
                                    "checked"
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
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="vaccineStatus"
                                  id="notVaccinated"
                                  value="notVaccinated"
                                  onChange={(e) => {
                                    setFieldValue("vaccineStatus", "0");
                                    setVaccineStatus(e.target.value);
                                  }}
                                  checked={
                                    (values.vaccineStatus === '0' ||
                                      vaccineStatus ==
                                      "notVaccinated") &&
                                    "checked"
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
                                {errors.vaccineStatus ? (
                                  <div style={{ color: "red" }}>
                                    {errors.vaccineStatus}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="text-black">I am <span className="optional">(optional)</span></label>
                            <div className="image_radio gender">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  value="male"
                                  id="male"
                                  onChange={(e) => {
                                    setFieldValue("gender", e.target.value);
                                    setGeneder(e.target.value);
                                  }}
                                  checked={
                                    values.gender === "male" && "checked"
                                  }
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
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  value="female"
                                  id="female"
                                  onChange={(e) => {
                                    setFieldValue("gender", e.target.value);
                                    setGeneder(e.target.value);
                                  }}
                                  checked={
                                    values.gender === "female" && "checked"
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
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  value="non_binary"
                                  id="non_binary"
                                  onChange={(e) => {
                                    setFieldValue("gender", e.target.value);
                                    setGeneder(e.target.value);
                                  }}
                                  checked={
                                    values.gender === "non_binary" && "checked"
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="non_binary"
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
                                  <div className="text">Non-Binary</div>
                                </label>
                              </div>

                              {errors.gender ? (
                                <div style={{ color: "red" }}>
                                  {errors.gender}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-warning mx-3 d-block"
                              type="button"
                              onClick={() => router.push("/vcard")}
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

export default BasicInfo;
