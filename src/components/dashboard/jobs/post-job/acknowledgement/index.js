import { Fragment, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { Row } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  editAJob,
  postedNewJob,
  postJobFromProfileInit,
} from "redux/actions/jobBrowse";
import { PostjobContext } from "../../post-job/postJobContext";
import Loader from "components/shared/loader";
import Swal from "sweetalert2";
import JobPlanModal from "../post-job-modals/jobplanmodal";

const AcknowledgeBox = ({ handleSwitchComp }) => {
  const [edit, setEdit] = useState(() => false);
  const [showPlan, setShowPlan] = useState(false);
  const { formData, setFormData } = useContext(PostjobContext);
  const { postedJobStatus, redirect, loading, jobDetail, status } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );

  useEffect(()=>{
    if(status && status == 409){
      let obj = {
        Job_Title: formData?.Job_Title,
        Designation_Id: 1,
        Role: formData?.Role,
        Job_Type: formData?.Job_Type,
        Min_Edu_Qualification: formData?.Min_Edu_Qualification
          ? formData?.Min_Edu_Qualification
          : 0,
        Min_Experience: formData?.Min_Experience,
        Work_Permit_Req: true, //not in ui
        Duration: 3, // not mention in ui
        No_Of_Vacancy: formData?.No_Of_Vacancy || 0,
        Shift: 1, // not mentiones
        language_preference: formData?.language_preference
          ? formData?.language_preference.map((item) => item.id)
          : [],
        Base: formData?.Base,
        gender: formData?.gender,
        Salary_Offered: formData?.Salary_Offered,
        Max_Salary_Offered: formData?.Max_Salary_Offered,
        Category_id: formData?.Category_id,
        Intro_Video: "video", //
        Special_Requirement: formData?.Selected_Special_Requirement,
        vaccination_type_name: vaccinationType(formData?.vaccination_Type),
        vaccination_Type: formData?.vaccination_Type,
        Description: formData?.Description,
        Skill: formData?.SelectedSkills,
        visa_requirement: formData?.visa_requirement,
        Availablity: JSON?.stringify(formData.Availablity)
          ? JSON?.stringify(formData.Availablity)
          : JSON.stringify(ava),
        Company: formData?.Company,
        Posting_Date: new Date(),
        Contact_No: formData?.Contact_No,
        Interview_Option: 1, //not mention
        Company_Description: "great company", // not mention
        location: formData?.Location,
        email: formData?.Address,
        job_Poster_Name: formData?.job_poster_name,
        latitude: formData?.latitude,
        longitude: formData?.longitude,
        interview_Location_Same: formData?.Interview_Location_Same,
        Interview_address: formData?.Interview_address,
      };
      localStorage.setItem('unsavedJob', JSON.stringify(obj));
      setShowPlan(true);
    }
  }, [status])

  const { uplodedDocumentData } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  const [checked, setChecked] = useState(() => false);

  const dispatch = useDispatch();
  const router = useRouter();
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
  const handleFormSubmit = () => {
    if (!checked) {
      Swal.fire({
        icon: "error",
        title: "Please check the acknowledgement",
      });
      return;
    }

    let ava = {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    };

    if (!localStorage.getItem("isEdit")) {
      let obj = {
        Job_Title: formData?.Job_Title,
        Designation_Id: 1,
        Role: formData?.Role,
        Job_Type: formData?.Job_Type,
        Min_Edu_Qualification: formData?.Min_Edu_Qualification
          ? formData?.Min_Edu_Qualification
          : 0,
        Min_Experience: formData?.Min_Experience,
        Work_Permit_Req: true, //not in ui
        Duration: 3, // not mention in ui
        No_Of_Vacancy: formData?.No_Of_Vacancy || 0,
        Shift: 1, // not mentiones
        language_preference: formData?.language_preference
          ? formData?.language_preference.map((item) => item.id)
          : [],
        Base: formData?.Base,
        gender: formData?.gender,
        Salary_Offered: formData?.Salary_Offered,
        Max_Salary_Offered: formData?.Max_Salary_Offered,
        Category_id: formData?.Category_id,
        Intro_Video: "video", //
        Special_Requirement: formData?.Selected_Special_Requirement,
        vaccination_type_name: vaccinationType(formData?.vaccination_Type),
        vaccination_Type: formData?.vaccination_Type,
        Description: formData?.Description,
        Skill: formData?.SelectedSkills,
        visa_requirement: formData?.visa_requirement,
        Availablity: JSON?.stringify(formData.Availablity)
          ? JSON?.stringify(formData.Availablity)
          : JSON.stringify(ava),
        Company: formData?.Company,
        Posting_Date: new Date(),
        Contact_No: formData?.Contact_No,
        Interview_Option: 1, //not mention
        Company_Description: "great company", // not mention
        location: formData?.Location,
        email: formData?.Address,
        job_Poster_Name: formData?.job_poster_name,
        latitude: formData?.latitude,
        longitude: formData?.longitude,
        interview_Location_Same: formData?.Interview_Location_Same,
        Interview_address: formData?.Interview_address,
      };
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

      // console.log(docStatus);
      // return;

      // if (docStatus) {
        // dispatch({ type: "POSTED_NEW_JOB_INIT" });
        dispatch(postedNewJob(obj));
        dispatch(postJobFromProfileInit(obj));
        setTimeout(() => {
          router.push(`/profile/post-profile`);
        },3000)
      // } else {
      //   // Swal.fire({
      //   //   icon: "error",
      //   //   title: "Please upload documents to post the job",
      //   // });
      
      // }
    } else {
      let obj = {
        job_id: localStorage.getItem("jobId"),
        Job_Title: formData?.Job_Title,
        Designation_Id: 1,
        Role: formData?.Role,
        Job_Type: formData?.jobType,
        Min_Edu_Qualification: formData?.Min_Edu_Qualification
          ? formData?.Min_Edu_Qualification
          : 0,
        Min_Experience: formData?.Min_Experience,
        Work_Permit_Req: true, //not in ui
        Duration: 3, // not mention in ui
        No_Of_Vacancy: formData?.No_Of_Vacancy || 0,
        Shift: 1, // not mentiones
        language_preference: formData?.language_preference.map(
          (item) => item.id
        ),
        Base: formData?.Base,
        gender: formData?.gender,
        Salary_Offered: formData?.Salary_Offered,
        Max_Salary_Offered: formData?.Max_Salary_Offered,
        Category_id: formData?.Category_id,
        Intro_Video: "video", //
        Special_Requirement: formData?.Selected_Special_Requirement,
        vaccination_type_name: vaccinationType(formData?.vaccination_Type),
        vaccination_Type: formData?.vaccination_Type,
        Description: formData?.Description,
        Skill: formData?.SelectedSkills,
        visa_requirement: formData?.visa_requirement,
        Availablity: formData.Availablity
          ? JSON.stringify(formData.Availablity)
          : JSON.stringify(ava),
        Company: formData?.Company,
        Posting_Date: new Date(),
        Contact_No: formData?.Contact_No,
        Interview_Option: 1, //not mention
        Company_Description: "great company", // not mention
        location: formData?.Location,
        job_Poster_Name: formData?.job_poster_name,
        email: formData?.Address,
        latitude: formData?.latitude,
        longitude: formData?.longitude,
        interview_Location_Same: formData?.Interview_Location_Same,
      };
      // return;
      dispatch({ type: "POSTED_EDIT_JOB_INIT" });
      dispatch(editAJob(obj));
    }
  };

  useEffect(() => {
    document.getElementById("scroll-helper").scrollIntoView();
    if (localStorage.getItem("isEdit") == 1) {
      setEdit(true);
    }
  }, []);

  // useEffect(() => {
  //   if (redirect) {
  //     dispatch({ type: "RESET_REDIRECT_FALSE" });
  //     // router.push(`/jobs/details/${jobDetail.job_Id}`);
  //     handleSwitchComp(6);
  //   }
  // }, [redirect]);

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main_wrapper" id="scroll-helper">
        <Row>
          <div className="col-xl-8">
            <div className="dashboard_title_bar p-3">
              <h3 className="title">
                Acknowledgement <small></small>
              </h3>
            </div>
          </div>
        </Row>
        <Row>
          {loading && <Loader />}
          <div className="col-xl-8 col-lg-8 col-md-8 col-xs-12">
            <div className="listings-data p-3">
              <ul className="lists numbers">
                <li>
                  If you have mentioned your number respond to the
                  calls/WhatsApp when the candidate contacts you or if you have
                  scheduled a meeting please be present during the meeting.
                </li>
                <li>
                  Videos uploaded are for screening purposed only and can't be
                  shared or used to any other purpose.
                </li>
                <li>
                  Be polite and respectful to a candidate wanting to work for
                  you.
                </li>
                <li>
                  Deactivate the job once you have to stop interviewing for it.
                </li>
                <li>
                  Not charge any money for any purpose of selecting and hiring.
                </li>
              </ul>
              <p>
                Jobs automatically deactivated after 15days of posting. You can
                come back and reactivate them if candidate is still not
                selected.
              </p>
              <div className="image_radio default noSpace">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="agreement"
                    value=" "
                    id="agreement"
                    onChange={(e) => {
                      setChecked(e.target.checked);
                    }}
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    <span className="icon">
                      <img
                        src={"/assets/images/icons/checkbox/inactive.svg"}
                        alt="icon"
                      />
                      <img
                        src={"/assets/images/icons/checkbox/active.svg"}
                        alt="icon"
                      />
                    </span>
                    <div className="text">
                      I agree to Applykart Terms and conditions and Code of
                      conduct.
                    </div>
                  </label>
                </div>
              </div>
              <p></p>
            </div>
          </div>
        </Row>

        <div className="d-flex flex-wrap stepper-form-btn p-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSwitchComp(4);
            }}
            className="btn btn-warning  mb-3 me-5"
          >
            {`Back`}
            <i className="fal fa-long-arrow-left me-2"></i>
          </button>
          <button
            type="button"
            onClick={handleFormSubmit}
            className="btn btn-warning  mb-3 me-5"
          >
            Next<i className="fal fa-long-arrow-right"></i>
          </button>
        </div>
      </main>
      <JobPlanModal showPlanModal={showPlan} closeModal={()=>{setShowPlan(false)}}  redirect={`/dashboard`}/>
    </Fragment>
  );
};

export default AcknowledgeBox;
