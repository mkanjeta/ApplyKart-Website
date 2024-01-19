import { Fragment, useEffect, useState } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
// import { BASE_URL } from "constants/constants";
// import Router from "next/router";
import BasicDetails from "./basic-details";
import LocationDetails from "./location-details";
//import RequirementDetails from 'pages/jobs/post-job/requirement-details';
import Interviewinformation from "./interview-details";
import { PostjobContextProvider } from "./postJobContext";
import AvailabilityDetails from "./availability";
import AcknowledgeBox from "./acknowledgement";
import RequirementDetails from "./requirement-details";
// import { editJobDetails } from "redux/actions/jobBrowse";
import { useDispatch, useSelector } from "react-redux";
import { Stepper } from "react-form-stepper";
import { toggleHamburger } from "helper/helper";
import { useRouter } from "next/router";
// import JobQrCode from "./jobqrcode";
// import NavBar from "components/shared/navbar";

const NewJob = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const [switchComp, setSwitchComp] = useState(0);
  //const jobDetail
  const { jobDetail } = useSelector(({ jobBrowseReducer }) => jobBrowseReducer);
  const [edit, setEdit] = useState(() => false);

  useEffect(() => {
    if (!localStorage.getItem("applyKart")) {
      router?.push("/login");
    }
  }, []);

  const { uplodedDocumentData } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  const [formData, setFormData] = useState({
    Job_Title: "",
    Company: "",
    Location: "",
    Posting_Date: "",
    Availablity: null,
    Contact_No: "",
    Description: "",
    Designation_Id: 0,
    Salary_Offered: "",
    Role: "",
    education: "",
    Job_Type: [],
    jobType: [],
    Min_Edu_Qualification: 0,
    Min_Experience: 0,
    Work_Permit_Req: true,
    Duration: 0,
    vacancies: "",
    Shift: 1,
    Availablity: "",
    Interview_Location_Same: true,
    Interview_Option: 0,
    Intro_Video: "",
    vaccination_Type: "",
    Company_Description: "",
    Address: "",
    Special_Requirement: "",
    Category_id: 0,
    Skill: "",
    Interview_address: "",
    visa_requirement: 0,
    language_preference: "",
    Base: "",
    gender: [],
    Max_Salary_Offered: "",
    interview_location: "",
    latitude: 0,
    longitude: 0,
    recieve_applications_from: 0,
    created_by: 0,
  });


  useEffect(() => {
    if (typeof window != undefined) {
      let edit = localStorage?.getItem("isEdit")
        ? localStorage?.getItem("isEdit")
        : 0;
      setEdit(edit == 1 ? true : false);
      if (edit == 1 && jobDetail) {
        let obj = {
          jobtitle: jobDetail?.job_Title,
          companyname: jobDetail?.company,
          street: jobDetail?.location,
          Availablity: jobDetail?.availablity,
          Posting_Date: jobDetail?.posting_Date,
          contactdata: jobDetail?.contact_No,
          Description: jobDetail?.description,
          Designation_Id: jobDetail?.designation_Id,
          Salary_Offered: jobDetail?.salary_Offered,
          jobRole: jobDetail?.role,
          jobType: jobDetail?.job_Type,
          education: jobDetail?.min_Edu_Qualification,
          experiences: jobDetail?.min_Experience,
          experience: jobDetail?.min_Experience ? "experienced" : "newbie",
          Work_Permit_Req: jobDetail?.work_Permit_Req,
          Duration: jobDetail?.duration,
          vacancies: jobDetail?.no_Of_Vacancy,
          Shift: jobDetail?.shift,
          Availablity: jobDetail?.availablity,
          Interview_Location_Same: jobDetail?.interview_Location_Same,
          Interview_Option: jobDetail?.interview_Option,
          Intro_Video: jobDetail?.Intro_Video,
          vaccination_Type: jobDetail?.vaccination_Type,
          Company_Description: jobDetail?.company_Description,
          email: jobDetail?.email,
          Special_Requirement: jobDetail?.special_Requirement,
          Category_id: jobDetail?.category_id,
          Skill: jobDetail?.skills,
          Interview_address: jobDetail?.interview_address,
          visa_requirement: jobDetail?.visa_requirement,
          visa_type: jobDetail?.visa_requirement,
          language: jobDetail?.language_preference,
          language_preference: jobDetail?.language_preference,
          Base: jobDetail?.base,
          gender: jobDetail?.gender,
          Max_Salary_Offered: jobDetail?.max_Salary_Offered,
          interview_location: jobDetail?.interview_location,
          latitude: jobDetail?.latitude,
          longitude: jobDetail?.longitude,
          recieve_applications_from: 0,
          created_by: jobDetail?.created_By,
          jobposter: jobDetail?.job_Poster_Name,
        };
        setFormData(obj);
      }
    }

  }, [jobDetail]);

  useEffect(() => {
    if (uplodedDocumentData && !(edit == 1)) {
      // console.log(uplodedDocumentData);
      setFormData((prev) => {
        return {
          ...prev,
          companyname: uplodedDocumentData?.company,
          contactdata: uplodedDocumentData?.contact,
          email: uplodedDocumentData?.email,
          jobposter: `${uplodedDocumentData?.first_Name} ${uplodedDocumentData?.last_Name}`
        }
      })
    }
  }, [uplodedDocumentData]);

  const handleSwitchComp = (value) => {
    setSwitchComp(value);
  };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const id = localStorage.getItem("jobId");
  //     dispatch(editJobDetails(id));
  //   }
  // }, []);

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
        <div className="right_side dashboard" id="scroll-top-top-id">
          {/* TopBar */}
          <TopBar />

          <Stepper
            stepClassName="custom-stepper"
            steps={[
              { label: "Basic Details" },
              { label: "Requirements" },
              { label: "Interview Information" },
              { label: "Job Location" },
              { label: "Availability" },
              { label: "Acknowledgement" }
            ]}
            activeStep={switchComp}
          />

          <PostjobContextProvider value={{ formData, setFormData }}>
            <>
              {switchComp == 0 && (
                <BasicDetails
                  handleSwitchComp={handleSwitchComp}
                  data={jobDetail}
                  edit={edit}
                />
              )}
              {switchComp == 1 && (
                <RequirementDetails
                  handleSwitchComp={handleSwitchComp}
                  data={jobDetail}
                  edit={edit}
                />
              )}
              {switchComp == 2 && (
                <Interviewinformation
                  handleSwitchComp={handleSwitchComp}
                  data={jobDetail}
                  edit={edit}
                />
              )}
              {switchComp == 3 && (
                <LocationDetails
                  handleSwitchComp={handleSwitchComp}
                  data={jobDetail}
                  edit={edit}
                />
              )}
              {switchComp == 4 && (
                <AvailabilityDetails
                  handleSwitchComp={handleSwitchComp}
                  data={jobDetail}
                  edit={edit}
                />
              )}
              {switchComp == 5 && (
                <AcknowledgeBox
                  handleSwitchComp={handleSwitchComp}
                  data={jobDetail}
                />
              )}
              {/* {switchComp == 6 && (
                <JobQrCode
                  handleSwitchComp={handleSwitchComp}
                  data={jobDetail}
                />
              )} */}
            </>
          </PostjobContextProvider>
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

export default NewJob;
