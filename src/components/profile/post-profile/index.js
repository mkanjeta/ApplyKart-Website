import { Fragment, useEffect } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import { Container, Row, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Filter from "components/shared/filter";
import { BASE_URL } from "constants/constants";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { toggleHamburger } from "helper/helper";

// import { useDispatch, useSelector } from 'react-redux';
// import { candidateShortlist, getCandidateDetail, scheduleInterview } from 'redux/actions/jobBrowse';
// import { TimeSchedule } from "constants/constants";
import FileUpload from "components/fileUploader";
import Autocomplete from "react-google-autocomplete";
import { getUploadedDocument } from "redux/actions/workActions";
import { useDispatch, useSelector } from "react-redux";
import {
  jobPosterBasicDetails,
  postedNewJob,
  uploadDocuments,
} from "redux/actions/jobBrowse";
import { showErrorMessage } from "constants/ShowError";
import { saveUserSetting } from "redux/actions/vcardActions";
import Loader from "components/shared/loader";
import Swal from "sweetalert2";

const JobPosterProfileBox = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { uplodedDocumentData } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );
  const {
    uplodeDocumentStatus,
    basicDetailJobPoster,
    fromPostJob,
    job,
    postedJobStatus,
    redirect,
    loading,
    jobDetail,
  } = useSelector(({ jobBrowseReducer }) => jobBrowseReducer);

  const [countryCode, setCountryCode] = useState(null);
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [ownerName, setOwnerName] = useState(null);
  const [location, setLocation] = useState(null);
  const [websiteUrl, setWebsiteUrl] = useState(null);
  const [seekerId, setSeekerId] = useState("");
  const [numABN, setNumABN] = useState(null);
  const [numACN, setNumACN] = useState(null);
  const [numGST, setNumGST] = useState(null);
  const [imageABN, setImageABN] = useState(null);
  const [imageACN, setImageACN] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [showImage, setImageShow] = useState(false);
  const [imageShowACN, setImageShowACN] = useState(false);
  const [frontImageShow, setFrontImageShow] = useState(false);
  const [backImageShow, setBackImageShow] = useState(false);
  const [medicareShow, setMedicareShow] = useState(false);
  const [medicare, setMedicare] = useState(null);
  const [ACNImage, setACNImage] = useState(null);
  const [ABNImage, setABNImage] = useState(null);
  const [GSTImage, setGSTImage] = useState(null);
  const [GSTImageUrl, setGSTImageUrl] = useState("");
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [medico, setMedico] = useState(null);
  const [error, setError] = useState(() => "");
  const [errorOwnerName, setErrorOwnerName] = useState(() => "");
  const [errorLocation, setErrorLocation] = useState(() => "");
  const [errorWebsiteUrl, setErrorWebsiteUrl] = useState(() => "");
  const [errorNumABN, setErrorNumABN] = useState(() => "");
  const [errorNumACN, setErrorNumACN] = useState(() => "");
  const [errGST, setErrorGST] = useState("");
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [show, setShow] = useState(false);
  const [docType, setDocType] = useState(() => "abn");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  // useEffect(() => {
  //   checkStatus();
  // }, []);

  useEffect(() => {
    if (fromPostJob && jobDetail && redirect) {
      dispatch({ type: "POST_A_JOB_COMPLETE" });
      dispatch({ type: "RESET_REDIRECT_FALSE" });
      // router.push(`/jobs/details/${jobDetail.job_Id}`);
    }
  }, [jobDetail, redirect]);

  useEffect(() => {
    if (uplodedDocumentData && !modes.type) {
      if (uplodedDocumentData?.abn_No) {
        setDocType("abn");
      } else if (uplodedDocumentData?.acn_No) {
        setDocType("acn");
      } else if (uplodedDocumentData?.aus_Driving_license_back) {
        setDocType("dl");
      } else if (uplodedDocumentData?.medicard_front) {
        setDocType("medicard");
      } else if (uplodedDocumentData?.gstNo) {
        setDocType("gstin");
      } else {
        setDocType("abn");
      }
      setLocation(uplodedDocumentData?.company_Location);
      setOwnerName(uplodedDocumentData?.owner);
      setCompanyName(uplodedDocumentData?.company);
      setWebsiteUrl(uplodedDocumentData?.website);
      setCountryCode(uplodedDocumentData?.countryCode);
      setNumGST(uplodedDocumentData?.gstNo);

      setABNImage(uplodedDocumentData?.abn_Doc);
      setACNImage(uplodedDocumentData?.acn_Doc);
      setMedico(uplodedDocumentData?.medicard_front);
      setFront(uplodedDocumentData?.aus_Driving_license_front);
      setBack(uplodedDocumentData?.aus_Driving_license_back);
      setNumABN(uplodedDocumentData?.abn_No);
      setNumACN(uplodedDocumentData?.acn_No);
      setGSTImage(uplodedDocumentData?.gstDoc);

      setImage(uplodedDocumentData?.profile_Pic);
    }
  }, [uplodedDocumentData]);

  const checkStatus = () => {
    let docStatus = 0;
    if (uplodedDocumentData?.abn_No && uplodedDocumentData?.abn_No) {
      docStatus = 1;
    } else if (uplodedDocumentData?.acn_No && uplodedDocumentData?.acn_No) {
      docStatus = 1;
    } else if (
      uplodedDocumentData?.aus_Driving_license_back &&
      uplodedDocumentData?.aus_Driving_license_front
    ) {
      docStatus = 1;
    } else if (uplodedDocumentData?.medicard_front) {
      docStatus = 1;
    }
    if (!docStatus) {
      let complete = false;
      // if (ownerName && companyName && location && websiteUrl) {

      if (docType == "abn" && numABN && ABNImage) {
        complete = true;
      } else if (docType == "acn" && numACN && ACNImage) {
        complete = true;
      } else if (docType == "dl" && front && back) {
        complete = true;
      } else if (docType == "medicard" && medico) {
        complete == true;
      } else if (docType == "gstin" && GSTImage) {
        complete = true;
      }
      if (complete) {
        const applyKart = localStorage.getItem("applyKart");
        const { userId } = JSON.parse(applyKart);
        const obj = {
          user_id: userId,
          action_type: "completed",
          value: 1,
        };
        dispatch(saveUserSetting(obj));
      }

      // }
    }

    dispatch({ type: "POSTER_COMPLETED" });
    if (fromPostJob && job) {
      dispatch(postedNewJob(job));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      if (applyKart) {
        const { userId } = JSON.parse(applyKart);
        setSeekerId(userId);
      } else {
        router?.push("/login");
      }
    }
  }, []);

  useEffect(() => {
    dispatch(getUploadedDocument());
  }, []);
  const [modes, setModes] = useState({
    mode: "saved",
    type: "",
  });
  const handleEdit = (mode, type) => {
    setModes({
      mode: mode,
      type: type,
    });
  };

  const handleSave = (type) => {
    const workDetails = {
      //User_Id: ,
      user_id: seekerId,
      company: companyName,
      owner: ownerName,
      website: websiteUrl,
      location: location,
      abn: docType == "abn" ? numABN : "",
      acn: docType == "acn" ? numACN : "",
      abn_doc: null,
      acn_doc: null,
      aus_Driving_License_Front: null,
      aus_Driving_License_Back: null,
      medicard_Front: null,
    };
    const uploadedDocs = {
      //User_Id: ,
      user_id: seekerId,
      company: companyName,
      owner: ownerName,
      website: websiteUrl,
      location: location,
      abn: docType == "abn" ? numABN : "",
      abn_doc:
        docType == "abn"
          ? typeof ABNImage == "object"
            ? ABNImage?.name
            : null
          : null,
      gstNumber: docType == "gstin" ? numGST : "",
      gstDocImage: docType == "gstin" ? (typeof GSTImage ? GSTImage?.name : null) : null,
      acn: docType == "acn" ? numACN : "",
      acn_doc:
        docType == "acn" ? (typeof ACNImage ? ACNImage?.name : null) : null,
      aus_Driving_License_Front:
        docType == "dl" ? (typeof front ? front?.name : null) : null,
      aus_Driving_License_Back:
        docType == "dl" ? (typeof back ? back?.name : null) : null,
      medicard_Front:
        docType == "medicard" ? (typeof medico ? medico?.name : null) : null,
      images: {
        abn_doc: docType == "abn" ? ABNImage : null,
        acn_doc: docType == "acn" ? ACNImage : null,
        aus_Driving_License_Front: docType == "dl" ? front : null,
        aus_Driving_License_Back: docType == "dl" ? back : null,
        medicard_Front: docType == "medicard" ? medico : null,
        gstDocImage: docType == "gstin" ? GSTImage : null
      },
    };
    // return;
    if (type == 1) {
      if (
        (!companyName && uplodedDocumentData?.company == null) ||
        companyName == ""
      ) {
        showErrorMessage("Company Name is required", setError);
        return;
      }
      if (
        (!ownerName && uplodedDocumentData?.owner == null) ||
        ownerName == ""
      ) {
        showErrorMessage("Owner Name is required", setErrorOwnerName);
        return;
      }
      if (
        (!location && uplodedDocumentData?.company_Location == null) ||
        location == ""
      ) {
        showErrorMessage("Location is required", setErrorLocation);
        return;
      }
      if (
        (!websiteUrl && uplodedDocumentData?.website == null) ||
        websiteUrl == ""
      ) {
        showErrorMessage("Website url is required", setErrorWebsiteUrl);
        return;
      }
      dispatch(uploadDocuments(workDetails));
      if (uplodeDocumentStatus) {
        dispatch(getUploadedDocument());
        setModes({
          mode: "saved",
          type: "",
        });
      }
    }
    if (type == 2) {
      if (
        docType == "abn" &&
        ((!numABN && uplodedDocumentData?.abn_No == null) || numABN == "")
      ) {
        showErrorMessage("ABN number is required", setErrorNumABN);
        return;
      }
      if (
        docType == "acn" &&
        ((!numACN && uplodedDocumentData?.acn_No == null) || numACN == "")
      ) {
        showErrorMessage("ACN number is required", setErrorNumACN);
        return;
      }
      if(docType == "gstin" && ((!numGST && !uplodedDocumentData?.gstNo) || numGST == null)) {
        Swal.fire({
          icon: "info",
          text: "GST number is required"
        })
        return;
      }
      dispatch(uploadDocuments(uploadedDocs));
      if (uplodeDocumentStatus) {
        dispatch(getUploadedDocument());
      }
      setModes({
        mode: "saved",
        type: "",
      });
    }
    // checkStatus();
  };

  const uploadFile = (file, type) => {
    // console.log("file",file)
    if (!file) return;
    if (type == "ABNImage") {
      // console.log(file);
      setABNImage(file);
      setImageABN(URL.createObjectURL(file));
      setImageShow(true);
    } else if (type == "ACNImage") {
      setACNImage(file);
      setImageACN(URL.createObjectURL(file));
      setImageShowACN(true);
    } else if (type == "frontImage") {
      setFront(file);
      setFrontImage(URL.createObjectURL(file));
      setFrontImageShow(true);
    } else if (type == "backImage") {
      setBack(file);
      setBackImage(URL.createObjectURL(file));
      setBackImageShow(true);
    } else if (type == "medicare") {
      setMedico(file);
      setMedicare(URL.createObjectURL(file));
      setMedicareShow(true);
    } else if (type == "profilePic") {
      setProfile(file);
      setProfilePic(URL.createObjectURL(file));
    } else if (type == "GSTImage") {
      setGSTImage(file);
      setGSTImageUrl(URL.createObjectURL(file));
    }
  };
  const handleDetails = () => {
    const obj = {
      user_id: seekerId,
      first_name: firstname || uplodedDocumentData?.first_Name,
      last_name: lastname || uplodedDocumentData?.last_Name,
      profile_pic: profile?.name || null,
      proFile: profile,
      contact_no: uplodedDocumentData?.contact,
    };
    //User_Id: ,
    dispatch(jobPosterBasicDetails(obj));
    //dispatch(uploadDocuments(obj))
    handleClose();
  };
  useEffect(() => {
    if (basicDetailJobPoster) {
      dispatch(getUploadedDocument());
    }
  }, [basicDetailJobPoster]);

  useEffect(() => {
    if (image && typeof image == "object") {
      // console.log(image);
      let obj = {
        user_id: uplodedDocumentData?.user_Id,
        first_name: uplodedDocumentData?.first_Name,
        last_name: uplodedDocumentData?.last_Name,
        profile_pic: image.name.split(" ").join(""),
        contact_no: uplodedDocumentData?.contact,
        proFile: image,
      };
      dispatch(jobPosterBasicDetails(obj));
    }
  }, [image]);

  function isValidURL(url) {
    const urlPattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    return urlPattern.test(url);
  }

  const handleSetWebsiteUrl = (url) => {
    if (!isValidURL(url)) {
      setErrorWebsiteUrl("Invalid website url format!!");
    } else {
      setErrorWebsiteUrl("");
    }
    setWebsiteUrl(url);
  }

  const handleNext = () => {
    // if(countryCode == 61) {

    // } else if (countryCode == 91) {

    // }

    // console.log("docType ==>>", docType)

    let complete = false;
    if (countryCode == 61) {
      if (docType == "abn" && numABN && ABNImage) {
        complete = true;
      } else if (docType == "acn" && numACN && ACNImage) {
        complete = true;
      } else if (docType == "dl" && front && back) {
        complete = true;
      } else if (docType == "medicard" && medico) {
        complete == true;
      }
    } else if(countryCode == 91) {
      if(docType == "gstin" && GSTImage) {
        complete = true;
      }
    }
    // console.log("complete ==>>", complete)
    // console.log("modes type ==>>", modes?.type)
    if (complete && (modes?.type == 1 || modes?.type == 2)) {
      Swal.fire({
        title: "Please save the changes",
        icon: "error"
      });
    } else if(complete && modes?.type == "") {
      router.push('/dashboard?jobType=ALLJOBS')
    }else {
      Swal.fire({
        title: "At least one document is Required",
        icon: "error"
      });
    }
  }
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
          {/* <TopBar /> */}
          {/* TopBar */}
          <div className="dashboard_title_bar">
            <h3 className="title">My Profile</h3>
          </div>
          {/* Content Box */}
          {loading && <Loader />}
          <div className="profile_header">
            {/* <button
              type="button"
              htmlFor="updateImage"
              className=" btn-right-edit p-0"
              onClick={() => handleShow()}
            >
              <img
                src="/assets/images/icons/profile-edit-icon.svg"
                alt="edit-icon"
              />

            </button> */}
            <div className="image-area">
              <img
                src={
                  image
                    ? typeof image == "object"
                      ? URL.createObjectURL(image)
                      : image
                    : "/assets/images/default-user.png"
                  //   profilePic ||
                  //   (uplodedDocumentData?.profile_Pic &&
                  //     uplodedDocumentData?.profile_Pic != "")
                  //     ? uplodedDocumentData?.profile_Pic
                  //     : "/assets/images/default-user.png"
                }
                alt="img"
                className="image-fit"
              />
              {/* <label
                htmlFor="updateImage"
                className="transform-center btn btn-circle btn-warning p-0"
              >
                <i className="bi-pencil ms-0" />
              </label> */}
              <label
                htmlFor="file-profile-pic"
                className="transform-center btn btn-circle btn-warning p-0"
              >
                <i className="bi-pencil ms-0"></i>
                <input
                  type="file"
                  name="image"
                  className="fileupload hidden-data"
                  id="file-profile-pic"
                  onChange={(e) => {
                    if (e) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </label>

              <a
                href="#"
                className="d-block fs-6 link my-2 text-center text-white"
              >
                Change Picture
              </a>
            </div>
            <div className="profile_text">
              <div className="info_text border-none">
                <h5 className="name text-white">
                  {uplodedDocumentData?.first_Name
                    ? `${uplodedDocumentData?.first_Name} ${uplodedDocumentData?.last_Name}`
                    : "Your Name"}
                </h5>
                <p className="email mb-2 pf-name">
                  {uplodedDocumentData?.email || ""}
                </p>
                <p className="post pf-contact">
                  {uplodedDocumentData?.contact
                    ? `${uplodedDocumentData?.contact}`
                    : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Cards*/}
          <Row>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Row>
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                  <div className="card profile_box">
                    <div className="card-header">
                      <h5 className="card-title">
                        <span className="icon">
                          <img
                            src={"/assets/images/icons/profile/bag_dark.svg"}
                            alt="icon"
                            className="image-fit-contain"
                          />
                        </span>
                        Company Details
                        {modes?.type == "1" ? (
                          <a onClick={() => handleSave(1)} className="link">
                            Save
                          </a>
                        ) : (
                          <a
                            onClick={() => handleEdit("edit", 1)}
                            className="link"
                          >
                            Edit
                          </a>
                        )}
                      </h5>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="companyName">Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="company"
                            id="companyName"
                            value={companyName}
                            placeholder="Company Name"
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            disabled={modes?.type != "1"}
                          />
                          {error ? (
                            <div style={{ color: "tomato" }}>{error}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jobRole">Owner Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="OwnerName"
                            id="OwnerName"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            placeholder="Owner Name"
                            disabled={modes?.type != "1"}
                            required
                          />
                          {errorOwnerName ? (
                            <div style={{ color: "tomato" }}>
                              {errorOwnerName}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="location">Location</label>
                          <Autocomplete
                            apiKey={apiKey}
                            options={{
                              types: ["establishment", "geocode"],
                              fields: ["formatted_address", "geometry", "name"],
                            }}
                            defaultValue={location}
                            onPlaceSelected={(place) => {
                              // console.log(place);
                              // const { address_components, formatted_address } = place;
                              // const i = place?.address_components.length;
                              // const country =
                              //   place?.address_components[i - 1].long_name;
                              // const state =
                              //   place?.address_components[i - 2].long_name;
                              // const city =
                              //   i >= 3
                              //     ? place?.address_components[i - 3].long_name
                              //     : "";
                              //setCities(place?.formatted_address);
                              setLocation(place?.formatted_address);
                            }}
                            name="street"
                            className="form-control mb-3"
                            disabled={modes?.type != "1"}
                            placeholder="Location"
                          />
                          {errorLocation ? (
                            <div style={{ color: "tomato" }}>
                              {errorLocation}
                            </div>
                          ) : null}
                          {/* <input
                                                        type="text"
                                                        className="form-control"
                                                        name="job_specialisation"
                                                        id="jobSpecialization"
                                                        placeholder="Job Specialization"
                                                        required

                                                    /> */}
                        </div>
                        <div className="form-group">
                          <label htmlFor="websiteUrl">Website URL</label>
                          <input
                            type="text"
                            className="form-control"
                            name="websiteUrl"
                            id="websiteUrl"
                            value={websiteUrl}
                            onChange={(e) => handleSetWebsiteUrl(e.target.value)}
                            placeholder="website url"
                            disabled={modes?.type != "1"}
                            required
                          />
                          {errorWebsiteUrl ? (
                            <div style={{ color: "tomato" }}>
                              {errorWebsiteUrl}
                            </div>
                          ) : null}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Row>
            </div>

            {/* Upload Document started  */}

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Row>
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                  <div className="card profile_box">
                    <div className="card-header">
                      <h5 className="card-title">
                        <span className="icon">
                          <img
                            src={"/assets/images/icons/profile/skills.svg"}
                            alt="icon"
                            className="image-fit-contain"
                          />
                        </span>
                        Documents (Upload any one document)
                        {modes?.type == "2" ? (
                          <a onClick={() => handleSave(2)} className="link">
                            Save
                          </a>
                        ) : (
                          <a
                            onClick={() => handleEdit("edit", 2)}
                            className="link"
                          >
                            Edit
                          </a>
                        )}
                      </h5>
                    </div>
                    <div className="card-body">
                      <form className="formpostjob form-data-class" action="">
                        <Row>
                          <div className="col-md-12 col-lg-12 col-xs-12">
                            <div className="form-group">
                              <label className="label">Document Type</label>
                              <div className="row image_radio default">
                                {
                                  countryCode == 61 && (
                                    <>
                                      <div className="col-auto">
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="abn-doc"
                                            id="abn"
                                            disabled={modes?.type != "2"}
                                            checked={docType == "abn"}
                                            onClick={() => {
                                              setDocType("abn");
                                            }}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="abn"
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
                                            <div className="text">ABN</div>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="abn-doc"
                                            id="acn"
                                            disabled={modes?.type != "2"}
                                            checked={docType == "acn"}
                                            onClick={() => {
                                              setDocType("acn");
                                            }}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="acn"
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
                                            <div className="text">ACN</div>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="abn-doc"
                                            id="dl"
                                            disabled={modes?.type != "2"}
                                            checked={docType == "dl"}
                                            onClick={() => {
                                              setDocType("dl");
                                            }}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="dl"
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
                                            <div className="text">
                                              Driving Licence
                                            </div>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="abn-doc"
                                            id="medicard"
                                            disabled={modes?.type != "2"}
                                            checked={docType == "medicard"}
                                            onClick={() => {
                                              setDocType("medicard");
                                            }}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="medicard"
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
                                            <div className="text">Medicard</div>
                                          </label>
                                        </div>
                                      </div>
                                    </>
                                  )
                                }
                                {
                                  countryCode == 91 && (
                                    <div className="col-auto">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="gstin"
                                          id="gstin"
                                          disabled={modes?.type != "2"}
                                          checked={docType == "gstin"}
                                          onClick={() => {
                                            setDocType("gstin");
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="gstin"
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
                                          <div className="text">GSTIN</div>
                                        </label>
                                      </div>
                                    </div>
                                  )
                                }
                              </div>
                            </div>
                            {/* {errorNumABN ? (
                              <div style={{ color: "tomato" }}>
                                {errorNumABN}
                              </div>
                            ) : null} */}
                          </div>
                        </Row>

                        {docType == "abn" && countryCode == 61 && (
                          <>
                            <Row>
                              <div className="col-md-12 col-lg-12 col-xs-12">
                                <div className="form-group">
                                  <label className="label">ABN Number</label>
                                  <input
                                    type="text"
                                    name="abn-doc"
                                    value={numABN}
                                    onChange={(e) => setNumABN(e.target.value)}
                                    className="form-control uppercase"
                                    placeholder="ABN Number"
                                    disabled={modes?.type != "2"}
                                  />
                                </div>
                                {errorNumABN ? (
                                  <div style={{ color: "tomato" }}>
                                    {errorNumABN}
                                  </div>
                                ) : null}
                              </div>
                            </Row>

                            <Row className="mt-2">
                              <div className="d-flex space-between center-items">
                                <div>
                                  <label className="label">ABN Document</label>
                                </div>
                                <div>
                                  {!ABNImage ? (
                                    <>
                                      <input
                                        type="file"
                                        name="image"
                                        className="fileupload hidden-data"
                                        onChange={(e) =>
                                          uploadFile(
                                            e.target.files[0],
                                            "ABNImage"
                                          )
                                        }
                                        id="file-uploadone"
                                        disabled={modes?.type != "2"}
                                      />
                                      <label
                                        htmlFor="file-uploadone"
                                        className="files-upload-data "
                                      >
                                        <img
                                          src="../assets/images/icons/camera.png"
                                          className="img-fluid"
                                          alt="Logo"
                                        />{" "}
                                        Attach Image
                                      </label>
                                    </>
                                  ) : (
                                    <>
                                      <i
                                        className="fas fa-times-circle"
                                        onClick={() => {
                                          setABNImage(null);
                                          setImageShow(false);
                                        }}
                                      ></i>
                                      <label
                                        htmlFor="file-uploadone"
                                        className="files-upload-data "
                                      >
                                        <div className="uploaded-img">
                                          {typeof ABNImage == "object" ? (
                                            ABNImage.type == "application/pdf" ? (
                                              <>
                                                <iframe
                                                  src={URL.createObjectURL(
                                                    ABNImage
                                                  )}
                                                ></iframe>
                                              </>
                                            ) : (
                                              <img
                                                src={URL.createObjectURL(
                                                  ABNImage
                                                )}
                                                className="img-fluid"
                                                alt="data"
                                              />
                                            )
                                          ) : ABNImage.includes(".pdf") ? (
                                            <>
                                              <iframe src={ABNImage}></iframe>
                                            </>
                                          ) : (
                                            <img
                                              src={ABNImage}
                                              className="img-fluid"
                                              alt="data"
                                            />
                                          )}
                                        </div>{" "}
                                      </label>
                                    </>
                                  )}
                                </div>
                              </div>
                            </Row>
                          </>
                        )}

                        {docType == "acn" && (countryCode == 61) && (
                          <>
                            <Row>
                              <div className="col-md-12 col-lg-12 col-xs-12">
                                <div className="form-group">
                                  <label className="label">ACN Number</label>
                                  <input
                                    type="text"
                                    name="acn-doc"
                                    value={numACN}
                                    onChange={(e) => setNumACN(e.target.value)}
                                    className="form-control uppercase"
                                    placeholder="ACN Number"
                                    disabled={modes?.type != "2"}
                                  />
                                </div>
                                {errorNumACN ? (
                                  <div style={{ color: "tomato" }}>
                                    {errorNumACN}
                                  </div>
                                ) : null}
                              </div>
                            </Row>

                            <Row className="mt-2">
                              <div className="d-flex space-between center-items">
                                <div>
                                  <label className="label">ACN Document</label>
                                </div>
                                <div>
                                  {!ACNImage ? (
                                    <>
                                      <input
                                        type="file"
                                        name="image"
                                        className="fileupload hidden-data"
                                        onChange={(e) =>
                                          uploadFile(
                                            e.target.files[0],
                                            "ACNImage"
                                          )
                                        }
                                        id="file-uploadone"
                                        disabled={modes?.type != "2"}
                                      />
                                      <label
                                        htmlFor="file-uploadone"
                                        className="files-upload-data "
                                      >
                                        <img
                                          src="../assets/images/icons/camera.png"
                                          className="img-fluid"
                                          alt="Logo"
                                        />{" "}
                                        Attach Image
                                      </label>
                                    </>
                                  ) : (
                                    <>
                                      <i
                                        className="fas fa-times-circle"
                                        onClick={() => {
                                          setACNImage(null);
                                          setImageShowACN(false);
                                        }}
                                      ></i>
                                      <label
                                        htmlFor="file-uploadone"
                                        className="files-upload-data "
                                      >
                                        <div className="uploaded-img">
                                          {typeof ACNImage == "object" ? (
                                            ACNImage.type == "application/pdf" ? (
                                              <>
                                                <iframe
                                                  src={URL.createObjectURL(
                                                    ACNImage
                                                  )}
                                                ></iframe>
                                              </>
                                            ) : (
                                              <img
                                                src={URL.createObjectURL(
                                                  ACNImage
                                                )}
                                                className="img-fluid"
                                                alt="data"
                                              />
                                            )
                                          ) : ACNImage.includes(".pdf") ? (
                                            <>
                                              <iframe src={ACNImage}></iframe>
                                            </>
                                          ) : (
                                            <img
                                              src={ACNImage}
                                              className="img-fluid"
                                              alt="data"
                                            />
                                          )}
                                        </div>{" "}
                                      </label>
                                    </>
                                  )}
                                  {/* <input
                                                                type='file'
                                                                name=''
                                                                className='fileupload hidden-data'
                                                                onChange={(e) => {
                                                                    // getVideoDuration(e.target.files, setFieldValue);
                                                                    uploadFile(e.target.files[0], "ACNImage");
                                                                }}
                                                                id='file-uploadtwo'
                                                            />
                                                            {imageShowACN ?
                                                                <>
                                                                    <i className='fas fa-times-circle' onClick={() => setImageShowACN(false)}></i>
                                                                    <label htmlFor='file-uploadtwo' className='files-upload-data '>
                                                                        <div className='uploaded-img'>

                                                                            <img
                                                                                src={imageACN || uplodedDocumentData?.acn_Doc || '../assets/images/jobcat/abn-document.png'}
                                                                                className="img-fluid"
                                                                                alt="data"
                                                                            />
                                                                        </div> </label></> : <label htmlFor='file-uploadtwo' className='files-upload-data '>
                                                                    <img
                                                                        src='../assets/images/icons/camera.png'
                                                                        className="img-fluid"
                                                                        alt="Logo"
                                                                    /> Attach Image

                                                                </label>

                                                            } */}
                                </div>
                              </div>
                            </Row>
                          </>
                        )}

                        {docType == "gstin" && (countryCode == 91) && (
                          <>
                            <Row>
                              <div className="col-md-12 col-lg-12 col-xs-12">
                                <div className="form-group">
                                  <label className="label">GSTIN Number</label>
                                  <input
                                    type="text"
                                    name="gst-num"
                                    value={numGST}
                                    onChange={(e) => {
                                      if (e.target.value.length <= 15) {
                                        setNumGST(e.target.value)
                                      }
                                    }}
                                    className="form-control uppercase"
                                    placeholder="GSTIN Number"
                                    disabled={modes?.type != "2"}
                                  />
                                </div>
                                {/* {errGST ? (
                                  <div style={{ color: "tomato" }}>
                                    {errGST}
                                  </div>
                                ) : null} */}
                              </div>
                            </Row>

                            <Row className="mt-2">
                              <div className="d-flex space-between center-items">
                                <div>
                                  <label className="label">GSTIN Document</label>
                                </div>
                                <div>
                                  {!GSTImage ? (
                                    <>
                                      <input
                                        type="file"
                                        name="image"
                                        className="fileupload hidden-data"
                                        onChange={(e) =>
                                          uploadFile(
                                            e.target.files[0],
                                            "GSTImage"
                                          )
                                        }
                                        id="file-uploadone"
                                        disabled={modes?.type != "2"}
                                      />
                                      <label
                                        htmlFor="file-uploadone"
                                        className="files-upload-data "
                                      >
                                        <img
                                          src="../assets/images/icons/camera.png"
                                          className="img-fluid"
                                          alt="Logo"
                                        />{" "}
                                        Attach Image
                                      </label>
                                    </>
                                  ) : (
                                    <>
                                      <i
                                        className="fas fa-times-circle"
                                        onClick={() => {
                                          setGSTImage(null);
                                          // setImageShowACN(false);
                                        }}
                                      ></i>
                                      <label
                                        htmlFor="file-uploadone"
                                        className="files-upload-data "
                                      >
                                        <div className="uploaded-img">
                                          {typeof GSTImage == "object" ? (
                                            GSTImage.type == "application/pdf" ? (
                                              <>
                                                <iframe
                                                  src={URL.createObjectURL(
                                                    GSTImage
                                                  )}
                                                ></iframe>
                                              </>
                                            ) : (
                                              <img
                                                src={URL.createObjectURL(
                                                  GSTImage
                                                )}
                                                className="img-fluid"
                                                alt="data"
                                              />
                                            )
                                          ) : GSTImage.includes(".pdf") ? (
                                            <>
                                              <iframe src={GSTImage}></iframe>
                                            </>
                                          ) : (
                                            <img
                                              src={GSTImage}
                                              className="img-fluid"
                                              alt="data"
                                            />
                                          )}
                                        </div>{" "}
                                      </label>
                                    </>
                                  )}
                                </div>
                              </div>
                            </Row>
                          </>
                        )}

                        <hr />
                        {docType == "dl" && countryCode == 61 && (
                          <Row className="mt-2">
                            <label className="label">
                              Australian Driving License
                            </label>
                            <div className="d-flex space-between center-items">
                              <div>
                                <label className="label">Front</label>
                              </div>
                              <div>
                                {!front ? (
                                  <>
                                    <input
                                      type="file"
                                      name="image"
                                      className="fileupload hidden-data"
                                      onChange={(e) =>
                                        uploadFile(
                                          e.target.files[0],
                                          "frontImage"
                                        )
                                      }
                                      id="file-uploadone"
                                      disabled={modes?.type != "2"}
                                    />
                                    <label
                                      htmlFor="file-uploadone"
                                      className="files-upload-data "
                                    >
                                      <img
                                        src="../assets/images/icons/camera.png"
                                        className="img-fluid"
                                        alt="Logo"
                                      />{" "}
                                      Attach Image
                                    </label>
                                  </>
                                ) : (
                                  <>
                                    <i
                                      className="fas fa-times-circle"
                                      onClick={() => {
                                        setFront(null);
                                        setFrontImageShow(false);
                                      }}
                                    ></i>
                                    <label
                                      htmlFor="file-uploadone"
                                      className="files-upload-data "
                                    >
                                      <div className="uploaded-img">
                                        {typeof front == "object" ? (
                                          front.type == "application/pdf" ? (
                                            <>
                                              <iframe
                                                src={URL.createObjectURL(front)}
                                              ></iframe>
                                            </>
                                          ) : (
                                            <img
                                              src={URL.createObjectURL(front)}
                                              className="img-fluid"
                                              alt="data"
                                            />
                                          )
                                        ) : front.includes(".pdf") ? (
                                          <>
                                            <iframe src={front}></iframe>
                                          </>
                                        ) : (
                                          <img
                                            src={front}
                                            className="img-fluid"
                                            alt="data"
                                          />
                                        )}
                                      </div>{" "}
                                    </label>
                                  </>
                                )}
                                {/* <input
                                                                type='file'
                                                                name=''
                                                                className='fileupload hidden-data'
                                                                onChange={(e) => {
                                                                    // getVideoDuration(e.target.files, setFieldValue);
                                                                    uploadFile(e.target.files[0], "frontImage");
                                                                }}
                                                                disabled={modes?.type != "2"}
                                                                id='file-upload-front'

                                                            />
                                                            {frontImageShow ?
                                                                <>
                                                                    <i className='fas fa-times-circle' onClick={() => setFrontImageShow(false)}></i>
                                                                    <label htmlFor='file-upload-front' className='files-upload-data '>
                                                                        <div className='uploaded-img'>

                                                                            <img
                                                                                src={frontImage || uplodedDocumentData?.aus_Driving_license_front || '../assets/images/jobcat/licence.jpg'}
                                                                                className="img-fluid"
                                                                                alt="data"
                                                                            />
                                                                        </div> </label></> : <label htmlFor='file-upload-front' className='files-upload-data '>
                                                                    <img
                                                                        src='../assets/images/icons/camera.png'
                                                                        className="img-fluid"
                                                                        alt="Logo"
                                                                    /> Attach Image

                                                                </label>

                                                            } */}
                              </div>
                            </div>
                            <div className="d-flex space-between center-items mt-3">
                              <div>
                                <label
                                  htmlFor="file-upload-back"
                                  className="label"
                                >
                                  Back
                                </label>
                              </div>
                              <div>
                                {!back ? (
                                  <>
                                    <input
                                      type="file"
                                      name="image"
                                      className="fileupload hidden-data"
                                      onChange={(e) =>
                                        uploadFile(
                                          e.target.files[0],
                                          "backImage"
                                        )
                                      }
                                      id="file-uploadone"
                                      disabled={modes?.type != "2"}
                                    />
                                    <label
                                      htmlFor="file-uploadone"
                                      className="files-upload-data "
                                    >
                                      <img
                                        src="../assets/images/icons/camera.png"
                                        className="img-fluid"
                                        alt="Logo"
                                      />{" "}
                                      Attach Image
                                    </label>
                                  </>
                                ) : (
                                  <>
                                    <i
                                      className="fas fa-times-circle"
                                      onClick={() => {
                                        setBack(null);
                                        setBackImageShow(false);
                                      }}
                                    ></i>
                                    <label
                                      htmlFor="file-uploadone"
                                      className="files-upload-data "
                                    >
                                      <div className="uploaded-img">
                                        {typeof back == "object" ? (
                                          back.type == "application/pdf" ? (
                                            <>
                                              <iframe
                                                src={URL.createObjectURL(back)}
                                              ></iframe>
                                            </>
                                          ) : (
                                            <img
                                              src={URL.createObjectURL(back)}
                                              className="img-fluid"
                                              alt="data"
                                            />
                                          )
                                        ) : back.includes(".pdf") ? (
                                          <>
                                            <iframe src={back}></iframe>
                                          </>
                                        ) : (
                                          <img
                                            src={back}
                                            className="img-fluid"
                                            alt="data"
                                          />
                                        )}
                                      </div>{" "}
                                    </label>
                                  </>
                                )}

                                {/* <input
                                                                type='file'
                                                                name='image'
                                                                className='fileupload hidden-data'
                                                                onChange={(e) => {
                                                                    // getVideoDuration(e.target.files, setFieldValue);
                                                                    uploadFile(e.target.files[0], "backImage");
                                                                }}
                                                                disabled={modes?.type != "2"}
                                                                id='file-upload-back'


                                                            />
                                                            {backImageShow ?
                                                                <>
                                                                    <i className='fas fa-times-circle' onClick={() => setBackImageShow(false)}></i>
                                                                    <label htmlFor='file-upload-back' className='files-upload-data '>
                                                                        <div className='uploaded-img'>

                                                                            <img
                                                                                src={backImage || uplodedDocumentData?.aus_Driving_license_back || '../assets/images/jobcat/licence.jpg'}
                                                                                className="img-fluid"
                                                                                alt="data"
                                                                            />
                                                                        </div> </label></> : <label htmlFor='file-upload-back' className='files-upload-data '>
                                                                    <img
                                                                        src='../assets/images/icons/camera.png'
                                                                        className="img-fluid"
                                                                        alt="Logo"
                                                                    /> Attach Image

                                                                </label>

                                                            } */}
                              </div>
                            </div>
                          </Row>
                        )}
                        <hr />

                        {docType == "medicard" && countryCode == 61 && (
                          <Row className="mt-2 mb-3">
                            <label className="label">Medicare Card</label>
                            <div className="d-flex space-between center-items">
                              <div>
                                <label className="label">Front</label>
                              </div>
                              <div>
                                {!medico ? (
                                  <>
                                    <input
                                      type="file"
                                      name="image"
                                      className="fileupload hidden-data"
                                      onChange={(e) =>
                                        uploadFile(
                                          e.target.files[0],
                                          "medicare"
                                        )
                                      }
                                      id="file-uploadone"
                                      disabled={modes?.type != "2"}
                                    />
                                    <label
                                      htmlFor="file-uploadone"
                                      className="files-upload-data "
                                    >
                                      <img
                                        src="../assets/images/icons/camera.png"
                                        className="img-fluid"
                                        alt="Logo"
                                      />{" "}
                                      Attach Image
                                    </label>
                                  </>
                                ) : (
                                  <>
                                    <i
                                      className="fas fa-times-circle"
                                      onClick={() => {
                                        setMedico(null);
                                        setMedicareShow(false);
                                      }}
                                    ></i>
                                    <label
                                      htmlFor="file-uploadone"
                                      className="files-upload-data "
                                    >
                                      <div className="uploaded-img">
                                        {typeof medico == "object" ? (
                                          medico.type == "application/pdf" ? (
                                            <>
                                              <iframe
                                                src={URL.createObjectURL(
                                                  medico
                                                )}
                                              ></iframe>
                                            </>
                                          ) : (
                                            <img
                                              src={URL.createObjectURL(medico)}
                                              className="img-fluid"
                                              alt="data"
                                            />
                                          )
                                        ) : medico.includes(".pdf") ? (
                                          <>
                                            <iframe src={medico}></iframe>
                                          </>
                                        ) : (
                                          <img
                                            src={medico}
                                            className="img-fluid"
                                            alt="data"
                                          />
                                        )}
                                      </div>{" "}
                                    </label>
                                  </>
                                )}
                                {/* <input
                                                                type='file'
                                                                name='image'
                                                                className='fileupload hidden-data'
                                                                onChange={(e) => {
                                                                    uploadFile(e.target.files[0], "medicare");
                                                                }}
                                                                id='file-upload-medicare'
                                                                disabled={modes?.type != "2"}

                                                            />
                                                            {medicareShow || uplodedDocumentData?.medicard_front ?
                                                                <>
                                                                    <i className='fas fa-times-circle' onClick={() => setMedicareShow(false)}></i>
                                                                    <label htmlFor='file-upload-medicare' className='files-upload-data '>
                                                                        <div className='uploaded-img'>

                                                                            <img
                                                                                src={medicare || uplodedDocumentData?.medicard_front || '../assets/images/jobcat/licence.jpg'}
                                                                                className="img-fluid"
                                                                                alt="data"
                                                                            />
                                                                        </div> </label></> : <label htmlFor='file-upload-medicare' className='files-upload-data '>
                                                                    <img
                                                                        src='../assets/images/icons/camera.png'
                                                                        className="img-fluid"
                                                                        alt="Logo"
                                                                    /> Attach Image

                                                                </label>

                                                            } */}
                              </div>
                            </div>
                          </Row>
                        )}
                      </form>
                      <div className='col-md-12 text-center'>
                        <button
                          type="button"
                          className='btn btn-warning mx-auto w-50 mt-3 mb-3'
                          onClick={handleNext}
                        >
                          Next <i className="fal fa-long-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </Row>
          {/* Bottom Cards end */}
          {/* Content Box */}
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-black">Change Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="form-meta profile-box">
              <Row>
                <div className="col-12">
                  <div className="image-area">
                    <img
                      src={profilePic || "/assets/images/user.png"}
                      style={{ borderRadius: "50%" }}
                      className="image-fit"
                      alt="img"
                    />
                    <label
                      htmlFor="file-profile-pic"
                      className="transform-center btn btn-circle btn-warning p-0"
                    >
                      <i className="bi-pencil ms-0" />
                      <input
                        type="file"
                        name="image"
                        className="fileupload hidden-data"
                        onChange={(e) => {
                          // getVideoDuration(e.target.files, setFieldValue);
                          uploadFile(e.target.files[0], "profilePic");
                        }}
                        id="file-profile-pic"
                      />
                      {/* <FileUpload id="updateImage" fileData={"image"} dataId={"updateImage"} /> */}
                    </label>
                    <a
                      href="#"
                      className="d-block fs-6 link my-2 text-center text-black"
                    >
                      Change Picture
                    </a>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label className="label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="first"
                      id="firstName"
                      value={firstname || uploadDocuments?.first_Name}
                      onChange={(e) => setFirstname(e.target.value)}
                      placeholder="first Name"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label className="label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="last"
                      id="lastName"
                      value={lastname || uploadDocuments?.Last_Name}
                      onChange={(e) => setLastname(e.target.value)}
                      placeholder="last Name"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group text-center">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleDetails()}
                    >
                      Submit Details
                    </button>
                  </div>
                </div>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </main>
    </Fragment>
  );
};

export default JobPosterProfileBox;
