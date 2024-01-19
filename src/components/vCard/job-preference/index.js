import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import { BASE_URL } from "constants/constants";
import MultiRangeSlider from "constants/MultiRangeSlider";
import Select from "react-select";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  resetRedirect,
  saveJobPreferences,
} from "redux/actions/categoryActions";
import { getJobSeekerDetail, getJobTypeLists } from "redux/actions/workActions";
import Autocomplete from "react-google-autocomplete";
import Loader from "components/shared/loader";
import Swal from "sweetalert2";
import { baseUrl } from "api/constant";
import { getAuthorizedApi } from "api/apiInstance";
import FileUpload from "components/fileUploader";
import * as actions from "../../../redux/actions/vcardActions";

const skillData = [
  { id: 1, name: "React" },
  { id: 2, name: "Html" },
  { id: 3, name: "Redux" },
  { id: 4, name: "Asynchronous" },
];
const salaryBaseData = [
  { id: 1, name: "Hourly" },
  { id: 2, name: "Weekly" },
  { id: 3, name: "Monthly" },
  { id: 4, name: "Annual" },
];

const JobPreference = () => {
  //const history = Router;
  //const onClick = () => history.push('/vcard/set-availability');
  const [address, setAddresses] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const dispatch = useDispatch();
  const { jobSeekerDetails, jobTypeLists, loading } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  const { redirect, loading: loading1 } = useSelector(
    ({ categoryReducer }) => categoryReducer
  );
  // console.log(jobSeekerDetails);

  const router = useRouter();
  const [minValue, set_minValue] = useState("");
  const [maxValue, set_maxValue] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState([]);
  const [preference, setPreferences] = useState("");
  const [salaryBase, setSalaryBase] = useState("");
  const [languages, setLanguage] = useState(
    jobSeekerDetails?.language
      ? jobSeekerDetails?.language.map((item) => item.id)
      : []
  );
  const [location, setLocation] = useState("");
  const [seekerId, setSeekerId] = useState(null);
  const [localStorageData, setLocalStorageData] = useState(null);
  const [dropJobPref, setDropJobPref] = useState([]);
  const [error, setError] = useState(null);
  const [languageList, setLanguageList] = useState(() => []);
  const [image, setImage] = useState(null);
  const [signUpCountryCode, setSignUpCountryCode] = useState('');

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
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      if(localStorage?.getItem("countryCode")) {
        setSignUpCountryCode(localStorage?.getItem("countryCode"));
      }
      const localStorageData = JSON.parse(applyKart);
      setLocalStorageData(localStorageData);
    }

    fetch(`${baseUrl}/Languages`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // console.log(result.data);
        setLanguageList(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (redirect) {
      dispatch(resetRedirect());
      router.push("/vcard/set-availability");
    }
  }, [redirect]);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  const removePreference = (idx) => {
    let tempPrefArr = preference?.split(",");
    tempPrefArr.splice(idx, 1);
    setPreferences(tempPrefArr.join(","));
  };
  const createOptions = () => {
    const opts = jobTypeLists?.map((el) => {
      return {
        label: el?.job_Type,
        value: el?.job_Type,
        id: el?.job_Type_id,
      };
    });
    return opts;
  };
  const handleSubmit = async () => {
    let status = false;
    let errObj = { ...error };

    if (!address) {
      errObj["address"] = "Location Required";
      status = true;
    }

    // console.log(jobType);
    if (!jobType || jobType.length == 0) {
      errObj["jobType"] = "Job Type Required";
      status = true;
    }

    // if (!preference) {
    //   errObj["preference"] = "Job Preference Required";
    //   status = true;
    // }

    if (!languages && languages.length == 0) {
      errObj["language"] = "Select a language";
      status = true;
    }
    if (!minValue || !maxValue) {
      errObj["salary"] = "Salary range required";
      status = true;
    }
    if (Number(minValue) > Number(maxValue)) {
      errObj["salary"] = "Minimum salary cannot be greated than maximum salary";
      status = true;
    }
    // if (!salaryBase) {
    //   errObj["salaryBase"] = "Select a Salary Type";
    //   status = true;
    // }
    if (status) {
      setError(errObj);
    } else {
      const obj = {
        User_Id: jobSeekerDetails?.user_Id,
        Salary_Range: `${minValue}-${maxValue}`,
        minSalary: minValue ? minValue : 0,
        maxSalary: maxValue ? maxValue : 0,
        Location: address,
        Job_type: jobType.map((item) => item.id),
        Language: [...languages],
        Job_Preference: preference,
        base: salaryBase,
      };
      // let categories = {
      //   Job_Subcategory: preference.split(","),
      //   Job_Category_Id: localStorage.getItem("cat_id"),
      // };

      // fetch(`${baseUrl}/SubCategory`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: JSON.parse(localStorage.getItem("applyKart"))
      //       .encryptedToken,
      //   },
      //   body: JSON.stringify(categories),
      // })
      //   .then((res) => {
      //     console.log(res);
      dispatch(saveJobPreferences(obj));
      // })
      // .catch((err) => {
      //   dispatch(saveJobPreferences(obj));
      // });
      dispatch({
        type: "UPDATE_JOB_SEEKER_SKILLS",
        payload: { skills: [...jobType] },
      });
      // yield put({
      //   type: "UPDATE_JOB_SEEKER_SKILLS",
      //   payload: {
      //     skills: action.payload.types,
      //   },
      // });
      router.push("/vcard/set-availability");
    }
  };
  useEffect(() => {
    if (jobSeekerDetails == null) {
      dispatch(getJobSeekerDetail());
    }
  }, [jobSeekerDetails]);
  useEffect(() => {
    dispatch(getJobTypeLists());
  }, [dispatch]);
  useEffect(() => {
    // console.log("Job Seeekr details", jobSeekerDetails);
    if (jobSeekerDetails) {
      setJobType(jobSeekerDetails?.preffered_job_type);
      setLanguage(
        jobSeekerDetails?.language
          ? jobSeekerDetails?.language.map((item) => item.id)
          : []
      );
      setLocation(jobSeekerDetails?.location);
      setSalaryBase(jobSeekerDetails?.base);
      setPreferences(jobSeekerDetails?.job_Preference);
      setAddresses(jobSeekerDetails?.job_location);
      if (jobSeekerDetails?.salary_range) {
        set_minValue(
          jobSeekerDetails?.salary_range !== null &&
          Number(jobSeekerDetails?.salary_range?.split("-")[0].split("k")[0])
        );
        set_maxValue(
          jobSeekerDetails?.salary_range !== null &&
          Number(jobSeekerDetails?.salary_range?.split("-")[1].split("k")[0])
        );
        let jobT = jobSeekerDetails?.preffered_job_type
          ? [...jobSeekerDetails?.preffered_job_type]
          : [];
        let value = jobT.map((item) => {
          return {
            label: item?.Job_Type,
            value: item?.Job_Type,
            id: item?.Job_Type_id,
          };
        });
        setJobType([...value]);
      }
    } else {
      dispatch({ type: "GET_JOB_SEEKER_DETAIL_INIT" });
    }
  }, [jobSeekerDetails, jobSeekerDetails?.salary_range]);

  const removeLanguage = (id) => {
    // console.log(id);
    let arr = [...languages];
    arr = arr.filter((item) => item != id);
    // console.log(arr);
    setLanguage([...arr]);
  };

  const getCurrencySymbol = () => {
    const countryCode = localStorageData?.countryCode;
    const phoneCode = countryCode ? countryCode : Number(signUpCountryCode);
    switch(phoneCode) {
      case 61:
        return '$'
      case 91:
        return '₹'
      default:
        return '$'
    }
  }

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
        />
        {(loading || loading1) && <Loader />}
        <div className="d-flex align-items-center vh-height">
          <Container>
            <div className="row p-4 align-items-center">
              <div className="col-lg-6">
                <div className="v_card">
                  <div className="image">
                    <img
                      // URL.createObjectURL(fileName)
                      src={`${image
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
                    <div className="top_actions">
                      <img
                        src={`/assets/images/icons/vaccine/white/${(jobSeekerDetails?.vaccination_Status == 1 &&
                          "singleDose") ||
                          (jobSeekerDetails?.vaccination_Status == 2 &&
                            "doubleDose") ||
                          (jobSeekerDetails?.vaccination_Status == 3 &&
                            "tripleDose") ||
                          "notVaccinated"
                          }.svg`}
                        alt="icon"
                      />
                      <button type="button" className="mode">
                        {jobSeekerDetails?.shift == 2 && (
                          <img
                            src={
                              BASE_URL +
                              `${jobSeekerDetails?.shift == 2 &&
                              "/assets/images/moon.svg"
                              }`
                            }
                            alt="icon"
                          />
                        )}
                      </button>
                    </div>
                    <div className="user_info">
                      <h5 className="name text-capitalize">
                        {jobSeekerDetails?.first_name
                          ? `${jobSeekerDetails?.first_name} ${jobSeekerDetails?.last_name}`
                          : "Your Name"}
                      </h5>
                      <p className="designation">
                        {jobSeekerDetails?.jobRole
                          ? jobSeekerDetails?.jobRole
                          : ""}
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
                          {`${jobSeekerDetails?.totalExperience
                            ? jobSeekerDetails?.totalExperience
                            : "0-1 year"
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
                          {(jobSeekerDetails?.location &&
                            jobSeekerDetails?.location?.split(",")[0]) ||
                            jobSeekerDetails?.job_location?.split(",")[0] ||
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
                          {languageList.filter((item) =>
                            languages.includes(JSON.stringify(item.id))
                          ) &&
                            languageList.filter((item) =>
                              languages.includes(JSON.stringify(item.id))
                            ).length != 0
                            ? languageList.filter((item) =>
                              languages.includes(JSON.stringify(item.id))
                            )[0]["language"]
                            : "" || ""}
                        </li>
                      </ul>
                      {jobSeekerDetails?.skills.length ? (
                        <>
                          {jobSeekerDetails?.skills?.slice(0, 3).map((item) => (
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
                        <>
                          {skillData?.map((item) => (
                            <button
                              type="button"
                              className="tag"
                              key={item?.id}
                            >
                              {item?.name}
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="vCard_textarea ps-lg-5">
                  <div className="section-header">
                    <h3 className="title">Job Preference</h3>
                    <p className="text mb-0">
                      Please add your job preference here.
                    </p>
                  </div>
                  <form>
                    <div className="form-group">
                      <Select
                        id="jobType"
                        instanceId="jobType"
                        options={createOptions()}
                        placeholder={"Type of job"}
                        className="form-control form-select"
                        closeMenuOnSelect={true}
                        isMulti={true}
                        value={jobType}
                        //onChange={handleOnChange}
                        onChange={(item) => {
                          //setFieldValue("jobType", item)
                          setJobType(item);
                        }}
                      />
                      <div className="selected-options">
                        {jobType &&
                          jobType.length != 0 &&
                          jobType?.map((item, i) => (
                            <p className="option" key={i}>
                              {item?.value}
                              <button
                                className="remove_option"
                                type="button"
                                name={item?.value}
                                onClick={() => {
                                  let value = jobType.filter(
                                    (val) => item.id != val.id
                                  );
                                  setJobType([...value]);
                                }}
                              >
                                x
                              </button>
                            </p>
                          ))}
                      </div>
                      {error?.jobType && (
                        <span style={{ color: "red" }}>{error?.jobType}</span>
                      )}
                    </div>
                    {/* <div className="form-group">
                    <input
                      id="text"
                      className="form-control mb-3"
                      type="text"
                      value={preference || jobSeekerDetails?.job_type}
                      onChange={(e) => setPreferences(e.target.value)}
                      placeholder="Enter job preference ' , ' separated"
                      required
                    />
                    <span>
                      <sup>*</sup>Please add the job categories that you want to
                      add.
                    </span>
                  </div> */}
                    <div className="selected-options">
                      {preference === null
                        ? ""
                        : preference &&
                        preference
                          .split(",")
                          ?.filter((el) => el)
                          ?.map((item, i) => (
                            <p className="option" key={i}>
                              {item}
                              <button
                                className="remove_option"
                                type="button"
                                name={item}
                                onClick={() => removePreference(i)}
                              >
                                x
                              </button>
                            </p>
                          ))}
                      {error?.preference && (
                        <span style={{ color: "red" }}>
                          {error?.preference}
                        </span>
                      )}
                    </div>
                    <div className="form-group ateet">
                      <select
                        className="form-control form-select"
                        name="SalaryBase"
                        defaultValue={salaryBase}
                        value={salaryBase}
                        placeholder="Select Salary Type"
                        onChange={(e) => {
                          setSalaryBase(e.target.value);
                        }}
                        required
                      >
                        <option>Select Salary Type (Optional)</option>
                        {salaryBaseData?.map((item) => {
                          return (
                            <option key={`index${item?.id}`} value={item?.name}>
                              {item?.name}
                            </option>
                          );
                        })}
                      </select>
                      {error?.salaryBase && (
                        <span style={{ color: "red" }}>
                          {error?.salaryBase}
                        </span>
                      )}
                    </div>
                    <div className="form-group range_slider">
                      {/* <MultiRangeSlider
                      min={0}
                      max={5000}
                      step={5}
                      ruler={true}
                      label={true}
                      preventWheel={false}
                      minValue={minValue}
                      maxValue={maxValue}
                      onInput={(e) => {
                        handleInput(e);
                      }}
                    /> */}
                      {/* <div className="range_value">
                      <span>$ {minValue}</span>
                      <span>$ {maxValue}</span>
                    </div> */}

                      <div className="form-group row">
                        <div className="col-md-6">
                          <label htmlFor="minsalary">Minimum(in {getCurrencySymbol()})</label>
                          <input
                            type="number"
                            className="form-control"
                            name="Salary_Offered"
                            id="Salary_Offered"
                            value={minValue}
                            placeholder="Minimum Salary"
                            onChange={(e) => {
                              // console.log("Min value", e.target.value);
                              set_minValue(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="maxsalary">Maximum(in {getCurrencySymbol()})</label>
                          <input
                            type="number"
                            className="form-control"
                            name="Max_Salary_Offered"
                            id="Max_Salary_Offered"
                            value={maxValue}
                            placeholder="Maximum Salary"
                            onChange={(e) => {
                              set_maxValue(e.target.value);
                            }}
                          />
                        </div>
                        {error?.salary && (
                          <span style={{ color: "red" }}>{error?.salary}</span>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <Autocomplete
                        apiKey={apiKey}
                        options={{
                          types: ["establishment", "geocode"],
                          fields: ["formatted_address", "geometry", "name"],
                        }}
                        onPlaceSelected={(places) => {
                          // const { address_components, formatted_address } = places;
                          // const i = places?.address_components.length;
                          // const country =
                          //   places?.address_components[i - 1].long_name;
                          // const state =
                          //   places?.address_components[i - 2].long_name;
                          // const city =
                          //   i >= 3
                          //     ? places?.address_components[i - 3].long_name
                          //     : "";
                          // setFieldValue("address", formatted_address);
                          // setFieldValue("country", country);
                          // setFieldValue("state", state);
                          // setFieldValue("city", city);
                          setAddresses(places?.formatted_address);
                        }}
                        defaultValue={address}
                        name="address"
                        className={`form-control`}
                        placeholder={"Enter preferred job location"}
                      />
                      {error?.address && (
                        <span style={{ color: "red" }}>{error?.address}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <select
                        value={languages}
                        className="form-control form-select"
                        name="language"
                        required
                        onChange={(evt) => {
                          setLanguage((prev) =>
                            prev
                              ? [...prev, evt.target.value]
                              : [evt.target.value]
                          );
                        }}
                      >
                        <option>Select Language (Optional)</option>
                        {languageList.length != 0 ? (
                          languageList.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.language}
                            </option>
                          ))
                        ) : (
                          <></>
                        )}
                      </select>
                      <div className="selected-options">
                        {
                          // jobSeekerDetails?.language && jobSeekerDetails?.language.length ?
                          // 	<>
                          // 	{jobSeekerDetails?.language.map((item) =>
                          // 		<p type="button" className="option" key={item?.id}>
                          // 			{item?.language}
                          // 			<button
                          // 				className="remove_option"
                          // 				type="button"
                          // 				name={item}
                          // 				onClick={() => {
                          // 				   removeLanguage(item.id);
                          // 				}}
                          // 			>
                          // 				x
                          // 			</button>
                          // 		</p>
                          // 	)}
                          //          </>
                          //          :
                          <>
                            {languageList &&
                              languages &&
                              languageList.filter((item) =>
                                languages.includes(
                                  JSON.stringify(item.id) || item.id
                                )
                              ) &&
                              languageList
                                .filter((item) =>
                                  languages.includes(
                                    JSON.stringify(item.id) || item.id
                                  )
                                )
                                .map((item) => (
                                  <p
                                    type="button"
                                    className="option"
                                    key={item?.id}
                                  >
                                    {item?.language}
                                    <button
                                      className="remove_option"
                                      type="button"
                                      name={item}
                                      onClick={() => {
                                        removeLanguage(item.id);
                                      }}
                                    >
                                      x
                                    </button>
                                  </p>
                                ))}
                          </>
                        }
                      </div>
                      {error?.language && (
                        <span style={{ color: "red" }}>{error?.language}</span>
                      )}
                    </div>
                    <div className="image_radio basic checkbox">
                      {/* Box */}
                      {/* <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="update"
                            id="update"
                          />
                          <label className="form-check-label" htmlFor="update">
                            <span className="icon">
                              <img
                                src={
                                  "/assets/images/icons/checkbox/inactive.svg"
                                }
                                alt="icon"
                              />
                              <img
                                src={"/assets/images/icons/checkbox/active.svg"}
                                alt="icon"
                              />
                            </span>
                            <div className="text">
                              Get the latest job updated on{" "}
                              <i className="fab fa-whatsapp" /> WhatsApp
                            </div>
                          </label>
                        </div>
                      </div> */}
                      {/* Box */}
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-warning mx-3 d-block"
                        type="button"
                        onClick={() => router.push("/vcard/job-type")}
                      >
                        <i className="fal fa-long-arrow-left me-3"></i>Back
                      </button>
                      <button
                        className="btn btn-warning mx-3 d-block"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Next <i className="fal fa-long-arrow-right"></i>
                      </button>
                    </div>
                    {/* <button
										className="btn btn-warning w-50 mx-auto d-block"
										type="button"
										onClick={handleSubmit}
									>
										Next <i className="fal fa-long-arrow-right" />
									</button> */}
                  </form>
                  {/* 
										)
									}}
								</Formik> */}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </Fragment>
  );
};

export default JobPreference;
