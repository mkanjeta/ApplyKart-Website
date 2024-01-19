import { Fragment, useEffect, useState } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { WeekSchedule } from "constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "../../helper/helper";
import {
  deletePortfolio,
  getJobSeekerDetail,
  getJobTypeLists,
  getPortfolioData,
  getUniversitylist,
  saveSetAvailabilityDetails,
  saveSkillsDetails,
  saveVcardEducationDetails,
  saveVcardWorkDetails,
} from "redux/actions/workActions";
import { getEducationList, getSkillsList } from "redux/actions/jobBrowse";
import moment from "moment";
import { saveJobPreferences } from "redux/actions/categoryActions";
import Autocomplete from "react-google-autocomplete";
import Portfolio from "components/shared/modal/portfolioModal";
import Loader from "components/shared/loader";
import FileUpload from "components/fileUploader";
import * as actions from "redux/actions/vcardActions";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const options = [
  { id: 1, value: "Wordpress", label: "Wordpress" },
  { id: 2, value: "Javascript", label: "Javascript" },
  { id: 3, value: "HTML", label: "HTML" },
  { id: 4, value: "Design", label: "Design" },
  { id: 5, value: "ReactNative", label: "React Native" },
];
const salaryBaseData = [
  { id: 1, name: "Weekly" },
  { id: 2, name: "Monthly" },
  { id: 3, name: "Annual" },
];
const minAmount = 0;
const maxAmount = 5000;

const ProfileForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("applyKart")) {
      router?.push("/login");
    }
  }, []);
  const { jobPreferencesWork3 } = useSelector(
    ({ categoryReducer }) => categoryReducer
  );
  const {
    setAvailabilityDetail,
    portfolioUpdated,
    deletePortFolioData,
    portFolioData,
    jobTypeLists,
    universityList,
    educationDetail2,
    skillsDetail,
    workDetail2,
    jobSeekerDetails,
    loading,
  } = useSelector(({ vcardWorkReducer }) => vcardWorkReducer);

  const { educationListData, skillsListData } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelect] = useState(null);
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const [professional, setProfessional] = useState("");
  const [educationData, setEducationData] = useState(null);
  const [jobType, setJobType] = useState([]);
  const [salaryBase, setSalaryBase] = useState("");
  const [preference, setPreferences] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddresses] = useState("");
  const [college, setCollege] = useState("");
  const [modes, setModes] = useState({
    mode: "saved",
    type: "",
  });
  const [seekerId, setSeekerId] = useState(null);
  const [options, setOptions] = useState(null);
  const [seekerSkill, setSeekerSkill] = useState(null);
  const [otpss, setOtps] = useState([]);
  const [showPortFolio, setShowPortFolio] = useState(false);
  const [portfolioModal, setPortfolioModal] = useState({
    type: "create",
    id: null,
    portfolio: null,
  });
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [imageFileData, setImageFileData] = useState(null);
  const [image, setImage] = useState(null);

  const [firstName, setFirstname] = useState(() => "");
  const [lastName, setLastName] = useState(() => "");

  const [cv, setCv] = useState(null);

  const [state, setState] = useState({
    isAllSelected: false,
    checkList: WeekSchedule,
    endTime: null,
    startTime: null,
    dataObj: {
      User_id: seekerId,
      Available_Slot_From: moment().format("YYYY-MM-DD HH:mm:ss"),
      Availablity: {},
    },
    error: "",
  });

  const educationListOptions = educationListData?.map((el) => {
    return {
      label: el?.education_Level,
      value: el?.education_Level_Id,
    };
  });
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
    if (jobSeekerDetails == null) {
      dispatch(getJobSeekerDetail());
    }
    if (jobSeekerDetails && jobSeekerDetails?.skills) {
      let arr = [];
      for (let i = 0; i < jobSeekerDetails?.skills.length; ++i) {
        arr = [
          ...arr,
          {
            value: jobSeekerDetails?.skills[i].skill_id,
            label: jobSeekerDetails?.skills[i].skill,
          },
        ];
      }
      // console.log("skill arr", arr);
      setSeekerSkill([...arr]);
    }
    if (jobSeekerDetails) {
      const detailData =
        jobSeekerDetails?.education?.education[
          jobSeekerDetails?.education?.education?.length - 1
        ];
      // console.log("details data", detailData);
      setEducationData(detailData);
      setImageFileData(jobSeekerDetails?.profile_pic);
    }
  }, [jobSeekerDetails, deletePortFolioData]);
  const createOptions = () => {
    const opts = skillsListData?.map((el) => {
      return {
        label: el?.skill,
        value: el?.skill_id,
      };
    });
    return opts;
  };

  const onCheckBoxChange = (checkName, isChecked) => {
    let isAllChecked = checkName === "all" && isChecked;
    let isAllUnChecked = checkName === "all" && !isChecked;
    const checked = isChecked;
    const checkList = state.checkList.map((city, index) => {
      if (isAllChecked || city.value === checkName) {
        return Object.assign({}, city, {
          checked,
        });
      } else if (isAllUnChecked) {
        return Object.assign({}, city, {
          checked: false,
        });
      }
      return city;
    });

    let isAllSelected =
      checkList.findIndex((item) => item.checked === false) === -1 ||
      isAllChecked;
    setState({
      ...state,
      checkList,
      isAllSelected,
    });
  };

  const onHandleChangeFor = (dayKey, stm, etm) => {
    let availablity = {
      ...state.dataObj?.Availablity,
      [dayKey]: {
        from:
          stm == "block" ? state.dataObj?.Availablity[dayKey]?.from || "" : stm,
        to: etm == "block" ? state.dataObj?.Availablity[dayKey]?.to || "" : etm,
      },
    };

    setState({
      ...state,
      dataObj: {
        ...state.dataObj,
        Availablity: availablity,
      },
      error: "",
    });
  };

  const createOptionsCol = universityList?.data.map((el) => {
    return {
      label: el?.university,
      value: el?.university,
    };
  });
  const createOptionsJobType = () => {
    const opts = jobTypeLists?.map((el) => {
      return {
        label: el?.job_Type,
        value: el?.job_Type,
        id: el?.job_Type_id,
      };
    });
    return opts;
  };
  useEffect(() => {
    dispatch(getSkillsList());
    dispatch(getEducationList());
    dispatch(getUniversitylist());
    dispatch(getJobTypeLists());
    dispatch(getPortfolioData());
  }, [dispatch]);
  const handleChange = (selectedOption) => {
    const selectedOtp = selectedOption?.map((item) => item?.value);

    setSeekerSkill([...selectedOption]);
    // console.log(selectedOption);
    setSelect(selectedOption);
    setOtps(selectedOtp);
  };
  const handleValuChange = (type, e) => {
    if (type == "1") {
      setProfessional({
        ...professional,
        [e.target.name]: e.target.value,
      });
    }
    if (type == "3") {
      setEducationData({
        ...educationData,
        [e.target.name]: e.target.value,
        education_Level_Id: e.target.value,
      });
    }
  };
  const removeOption = (name, id) => {
    if (name) {
      const newSelect = selectedOption.filter((item) => item.label !== name);
      setSelect(newSelect);
    }
    if (id) {
      const filterSkill = seekerSkill.filter((item) => item.skill !== id);
      setSeekerSkill(filterSkill);
    }
  };
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  const handleEdit = (mode, type) => {
    setModes({
      mode: mode,
      type: type,
    });
  };
  const removePortfolio = (id) => {
    const obj = {
      PortfolioId: id,
    };
    dispatch(deletePortfolio(obj));
  };
  useEffect(() => {
    if (portfolioUpdated == true) {
      dispatch(getPortfolioData());
    }
    if (deletePortFolioData == true) {
      dispatch(getPortfolioData());
    }
  }, [portfolioUpdated, deletePortFolioData]);

  useEffect(() => {
    if (jobSeekerDetails) {
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
      setCollege(educationData?.university);
      setLocation(jobSeekerDetails?.location);
      setSalaryBase(jobSeekerDetails?.base);
      setAddresses(jobSeekerDetails?.job_location);
      setPreferences(jobSeekerDetails?.job_Preference);
      set_minValue(
        jobSeekerDetails?.minSalary !== null &&
          Number(jobSeekerDetails?.minSalary)
      );
      set_maxValue(
        jobSeekerDetails?.maxSalary !== null &&
          Number(jobSeekerDetails?.maxSalary)
      );

      if (jobSeekerDetails?.avalablity) {
        let data = jobSeekerDetails?.avalablity;
        let checkArr = [],
          avaObj = {};
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; ++i) {
          if (data[keys[i]] && data[keys[i]].from && data[keys[i]].to) {
            checkArr = [
              ...checkArr,
              {
                value: keys[i],
                name: keys[i],
                checked: true,
              },
            ];
            let buff = {
              from: data[keys[i]].from,
              to: data[keys[i]].to,
            };

            avaObj[keys[i]] = buff;
          } else {
            checkArr = [
              ...checkArr,
              {
                value: keys[i],
                name: keys[i],
                checked: false,
              },
            ];
            avaObj[keys[i]] = null;
          }
        }

        let obj = {
          isAllSelected: false,
          checkList: [...checkArr],
          endTime: null,
          startTime: null,
          dataObj: {
            User_id: null,
            Available_Slot_From: "2022-08-01 15:25:24",
            Availablity: avaObj,
          },
          error: "",
        };
        setState(obj);
      }
    }
  }, [jobSeekerDetails, educationData]);

  const handleSave = (type) => {
    const workDetailsReq = {
      user_id: seekerId,
      worked_before: 1,
      work_experience: [
        {
          months: jobSeekerDetails?.months,
          company: professional?.company || jobSeekerDetails?.company,
          role: professional?.job_Title || jobSeekerDetails?.job_Title,
          specialisation:
            professional?.job_specialisation ||
            jobSeekerDetails?.job_specialisation,
          start_date:
            new Date(startDate)
              .toISOString()
              .split("T")[0]
              .split("-")
              .join("/") || jobSeekerDetails?.startDate,
          end_date:
            new Date(endDate)
              .toISOString()
              .split("T")[0]
              .split("-")
              .join("/") || jobSeekerDetails?.endDate,
        },
      ],
    };

    // console.log(seekerSkill);
    // return;

    let skills = seekerSkill.map((item) => item.value);

    // skills = [...skills, ...otpss];
    let arr = [];
    // console.log(skills);
    for (let i = 0; i < skills.length; ++i) {
      if (!arr.includes(skills[i])) {
        arr = [...arr, skills[i]];
      }
    }
    // console.log(arr);

    const skillDetailsReq = {
      user_id: seekerId,
      skill: JSON.stringify(arr),
    };

    const educationDetailsReq = {
      user_id: seekerId,
      education_details: [
        {
          education_level: educationData?.education_Level,
          university: college,
          skills: "[]",
          start_date: "2021/01/13",
          end_date: "2022/01/13",
        },
      ],
    };

    const preferencesDetailReq = {
      User_Id: seekerId,
      // Salary_Range: `${minValue}k-${maxValue}k`,
      minSalary: minValue,
      maxSalary: maxValue,
      Location: address,
      Job_type: jobType.map((item) => item.id),
      Language: jobSeekerDetails?.language
        ? jobSeekerDetails?.language.map((item) => {
            return item?.id;
          })
        : [],
      Job_Preference: preference,
      base: salaryBase,
    };
    const dataObj = {
      User_id: seekerId,
      Available_Slot_From: moment().format("YYYY-MM-DD HH:mm:ss"),
      Availablity: state?.dataObj?.Availablity,
    };

    if (type == 1) {
      dispatch(saveVcardWorkDetails(workDetailsReq));
      if (workDetail2) {
        dispatch(getJobSeekerDetail());
        setModes({
          mode: "saved",
          type: "",
        });
      }
    }
    if (type == 2) {
      dispatch(saveSkillsDetails(skillDetailsReq));
      if (skillsDetail) {
        dispatch(getJobSeekerDetail());
        setModes({
          mode: "saved",
          type: "",
        });
      }
    }
    if (type == 3) {
      dispatch(saveVcardEducationDetails(educationDetailsReq));
      if (educationDetail2) {
        dispatch(getJobSeekerDetail());
        setModes({
          mode: "saved",
          type: "",
        });
      }
    }
    if (type == 4) {
      dispatch({
        type: "UPDATE_JOB_SEEKER_SKILLS",
        payload: { skills: [...jobType] },
      });
      dispatch(saveJobPreferences(preferencesDetailReq));
      if (jobPreferencesWork3) {
        dispatch(getJobSeekerDetail());
        setModes({
          mode: "saved",
          type: "",
        });
      }
    }

    if (type == 6) {
      dispatch(saveSetAvailabilityDetails(dataObj));
      if (setAvailabilityDetail) {
        dispatch(getJobSeekerDetail());
        setModes({
          mode: "saved",
          type: "",
        });
      }
    }
    if (type == 7) {
      const vcardBasicDetails = {
        first_name: firstName,
        last_name: lastName,
        location: jobSeekerDetails?.location,
        vaccination_status: jobSeekerDetails?.vaccination_Status,
        gender: jobSeekerDetails?.gender,
        user_id: jobSeekerDetails?.user_Id,
        profile_pic: null,
        latitude: jobSeekerDetails?.latitude,
        longitude: jobSeekerDetails?.longuitude,
      };
      dispatch(actions.saveVcardBasicDetails(vcardBasicDetails));
    }
    if (type == 8) {
      if (typeof cv == "object") {
        let obj = {
          file: cv,
          curriculumVitae: cv.name,
        };
        dispatch(actions.uploadResume(obj));
      }
    }
    if (portFolioData) {
      setModes({
        mode: "saved",
        type: "",
      });
    }
  };
  useEffect(() => {
    if (jobSeekerDetails !== null) {
      // console.log(jobSeekerDetails);
      const detailData =
        jobSeekerDetails?.professionaldetails?.experience[
          jobSeekerDetails?.professionaldetails?.experience?.length - 1
        ];
      setProfessional(detailData);
      setStartDate(
        moment(jobSeekerDetails?.start_date).format('YYYY-MM-DD')
      );
      setEndDate(
        moment(jobSeekerDetails?.end_date).format('YYYY-MM-DD')
      );
      setFirstname(jobSeekerDetails?.first_name);
      setLastName(jobSeekerDetails?.last_name);
      setCv(jobSeekerDetails?.curriculumVitae);
    }
  }, [jobSeekerDetails]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      if (applyKart) {
        const { userId } = JSON.parse(applyKart);
        setSeekerId(userId);
      }
    }
  }, []);
  const handleEditPortfolio = (type, id, item) => {
    setShowPortFolio(true);
    setPortfolioModal({
      type: type,
      id: id,
      portfolio: item,
    });
  };

  // console.log("@@##", seekerSkill);

  const uploadCV = (file) => {
    // console.log(file);
    if (file.type != "application/pdf") {
      Swal.fire({
        icon: "error",
        title: "Please upload pdf only",
      });
    } else {
      setCv(file);
    }
  };

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
          {loading && <Loader />}
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard_title_bar">
                <h3 className="title">Profile</h3>
              </div>
            </div>
          </div>
          {/* Content Box */}
          <div className="profile_header">
            <div className="image-area">
              <img
                src={
                  image && typeof image == "object"
                    ? URL.createObjectURL(image)
                    : imageFileData || "/assets/images/user.png"
                }
                alt="img"
                className="image-fit"
              />
              <label
                htmlFor="updateImage"
                className="transform-center btn btn-circle btn-warning p-0"
              >
                <i className="bi-pencil ms-0" />
                <FileUpload
                  id="updateImage"
                  fileData={"image"}
                  dataId={"updateImage"}
                  handleImageData={handleImageData}
                />
              </label>
            </div>
            <div className="profile_text">
              <div className="info_text">
                <h5 className="name text-white">
                  {jobSeekerDetails?.first_name
                    ? `${jobSeekerDetails?.first_name} ${jobSeekerDetails?.last_name}`
                    : "Jacqueline Baum"}
                </h5>
                <p className="post">
                  {professional?.job_Title ? professional?.job_Title : ""}
                </p>
              </div>
              <ul className="details_text">
                <li>
                  <span className="icon">
                    <i className="fas fa-envelope" />
                  </span>
                  {jobSeekerDetails?.email
                    ? jobSeekerDetails?.email
                    : "Jacquelinebaum@fakemail.com"}
                </li>
                <li>
                  <span className="icon">
                    <img
                      src={"/assets/images/icons/bag.svg"}
                      alt="icon"
                      className="image-fit-contain"
                    />
                  </span>
                  {jobSeekerDetails?.worked_before == "1"
                    ? jobSeekerDetails?.totalExperience
                      ? `${jobSeekerDetails?.totalExperience}`
                      : "0 years"
                    : "Newbie"}
                </li>
                <li>
                  <span className="icon">
                    <img
                      src={"/assets/images/icons/phone.svg"}
                      alt="icon"
                      className="image-fit-contain"
                    />
                  </span>
                  {jobSeekerDetails?.contact_no
                    ? jobSeekerDetails?.contact_no
                    : ""}
                </li>
                <li>
                  <span className="icon">
                    <img
                      src={"/assets/images/icons/location.svg"}
                      alt="icon"
                      className="image-fit-contain"
                    />
                  </span>
                  {jobSeekerDetails?.job_location
                    ? jobSeekerDetails?.job_location
                    : ""}
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            {/* Box */}
            <div className="col-md-6">
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
                    Work Experience
                    {modes?.type == "1" ? (
                      <a onClick={() => handleSave(1)} className="link">
                        Save
                      </a>
                    ) : (
                      <a onClick={() => handleEdit("edit", 1)} className="link">
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
                        value={professional?.company && professional?.company}
                        placeholder="Company Name"
                        onChange={(e) => handleValuChange(1, e)}
                        required
                        disabled={modes?.type != "1"}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="jobRole">Job Role</label>
                      <input
                        type="text"
                        className="form-control"
                        name="job_Title"
                        id="jobRole"
                        value={
                          professional?.job_Title && professional?.job_Title
                        }
                        placeholder="Job Role"
                        onChange={(e) => handleValuChange(1, e)}
                        required
                        disabled={modes?.type != "1"}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="jobSpecialization">
                        Job Specialization
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="job_specialisation"
                        id="jobSpecialization"
                        value={
                          professional?.job_specialisation &&
                          professional?.job_specialisation
                        }
                        placeholder="Job Specialization"
                        onChange={(e) => handleValuChange(1, e)}
                        required
                        disabled={modes?.type != "1"}
                      />
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="startDate">Start Date</label>
                          <div className="input-group date_style">
                          <input 
                            className="form-control"
                            placeholder="Start Date"
                            type="date"
                            id="start" 
                            name="trip-start"
                            value={startDate || ''}
                            onChange={(e) => {
                              setStartDate(moment(e?.target?.value).format('YYYY-MM-DD'));
                            }}
                            disabled={modes?.type != "1"}
                            />
                            {/* <DatePicker
                              selected={new Date(startDate)}
                              onChange={(date) => setStartDate(new Date(date))}
                              className="form-control"
                              placeholderText="Start Date"
                              id="startDate"
                              name="startDate"
                              disabled={modes?.type != "1"}
                            />
                            <div className="input-group-append">
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
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="endDate">End Date</label>
                          <div className="input-group date_style">
                          <input 
                            className="form-control"
                            placeholder="End Date"
                            type="date"
                            id="start" 
                            name="trip-start"
                            value={endDate || ''}
                            onChange={(e) => {
                              setEndDate(moment(e?.target?.value).format('YYYY-MM-DD'));
                            }}
                            disabled={modes?.type != "1"}
                            />
                            {/* <DatePicker
                              selected={new Date(endDate)}
                              onChange={(date) => setEndDate(new Date(date))}
                              className="form-control"
                              placeholderText="End Date"
                              id="endDate"
                              name="endDate"
                              disabled={modes?.type != "1"}
                            />
                            <div className="input-group-append">
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
                  </form>
                </div>
              </div>
            </div>
            {/*CV Box */}
            <div className="col-md-6">
              <div className="card profile_box">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="icon">
                      <img
                        src={"/assets/images/icons/profile/resume.png"}
                        alt="icon"
                        className="image-fit-contain"
                      />
                    </span>
                    CV
                    {modes?.type == "8" ? (
                      <a onClick={() => handleSave(8)} className="link">
                        Save
                      </a>
                    ) : (
                      <a onClick={() => handleEdit("edit", 8)} className="link">
                        Edit
                      </a>
                    )}
                  </h5>
                </div>
                <div className="card-body">
                  <form
                    style={{
                      pointerEvents: `${
                        modes?.type != "8" ? "none" : "initial"
                      }`,
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="specialSkills">Uploaded CV</label>
                      {cv ? (
                        <>
                          <i
                            className="fas fa-times-circle"
                            onClick={() => {
                              setCv(null);
                            }}
                          ></i>{" "}
                          <iframe
                            src={
                              typeof cv == "object"
                                ? URL.createObjectURL(cv)
                                : cv
                            }
                          ></iframe>
                        </>
                      ) : (
                        <FileUpload
                          fileData={"image"}
                          dataId={"updateImage"}
                          handleImageData={uploadCV}
                        />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/*CV Box */}
            {/* Box */}
            <div className="col-md-6">
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
                    Skills
                    {modes?.type == "2" ? (
                      <a onClick={() => handleSave(2)} className="link">
                        Save
                      </a>
                    ) : (
                      <a onClick={() => handleEdit("edit", 2)} className="link">
                        Edit
                      </a>
                    )}
                  </h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="specialSkills">Special Skills</label>
                      <Select
                        id="skills-dropdown"
                        instanceId="skills-dropdown"
                        options={createOptions()}
                        placeholder=" Chef, Barista, Cleaner, etc"
                        className="form-control form-select"
                        closeMenuOnSelect={true}
                        isMulti
                        onChange={handleChange}
                        value={seekerSkill}
                        isDisabled={modes?.type != "2" && true}
                      />
                    </div>
                    <div className="selected-options">
                      {
                        seekerSkill &&
                          seekerSkill
                            // ?.concat(selectedOption)
                            // ?.filter((el) => el)
                            .map((item) => (
                              <p className="option" key={item?.value}>
                                {item?.label}
                                {modes?.type == "2" && (
                                  <button
                                    className="remove_option"
                                    type="button"
                                    name={item?.label}
                                    id={item?.value}
                                    onClick={() =>
                                      removeOption(item?.label, item?.skill)
                                    }
                                  >
                                    x
                                  </button>
                                )}
                              </p>
                            ))
                        // : selectedOption?.concat(seekerSkill)?.map((item) => (
                        //     <p className="option" key={item?.value}>
                        //       {item?.label || item?.skill}
                        //       {console.log("heyyyyyy--->")}
                        //       {modes?.type == "2" && (
                        //         <button
                        //           className="remove_option"
                        //           type="button"
                        //           name={item?.label}
                        //           id={item?.skill}
                        //           onClick={() =>
                        //             removeOption(item?.label, item?.skill)
                        //           }
                        //         >
                        //           x
                        //         </button>
                        //       )}
                        //     </p>
                        //   ))
                      }
                    </div>
                  </form>
                </div>
              </div>

              <div className="card profile_box">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="icon">
                      <img
                        src={"/assets/images/icons/profile/jobPre.svg"}
                        alt="icon"
                        className="image-fit-contain"
                      />
                    </span>
                    Personal Details
                    {modes?.type == "7" ? (
                      <a onClick={() => handleSave(7)} className="link">
                        Save
                      </a>
                    ) : (
                      <a onClick={() => handleEdit("edit", 7)} className="link">
                        Edit
                      </a>
                    )}
                  </h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        id="companyName"
                        value={firstName}
                        placeholder="First Name"
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                        disabled={modes?.type != "7"}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="language">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        id="language"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={modes?.type != "7"}
                      />
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="mobile">Mobile No.</label>
                      <input
                        type="number"
                        className="form-control"
                        name="company"
                        id="companyName"
                        value={professional?.company && professional?.company}
                        placeholder="Mobile"
                        onChange={(e) => handleValuChange(1, e)}
                        required
                        disabled={modes?.type != "1"}
                      />
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
            {/* Box */}
            <div className="col-md-6">
              <div className="card profile_box">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="icon">
                      <img
                        src={"/assets/images/icons/profile/jobPre.svg"}
                        alt="icon"
                        className="image-fit-contain"
                      />
                    </span>
                    Job Preference
                    {modes?.type == "4" ? (
                      <a onClick={() => handleSave(4)} className="link">
                        Save
                      </a>
                    ) : (
                      <a onClick={() => handleEdit("edit", 4)} className="link">
                        Edit
                      </a>
                    )}
                    {/* <a href="#" className="link">
											Edit
										</a> */}
                  </h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <Select
                        id="jobType"
                        instanceId="jobType"
                        options={createOptionsJobType()}
                        placeholder={"Type of job"}
                        className="form-control form-select"
                        closeMenuOnSelect={true}
                        isMulti={true}
                        isDisabled={modes?.type != "4" && true}
                        value={jobType}
                        //onChange={handleOnChange}
                        onChange={(item) => {
                          //setFieldValue("jobType", item)
                          // console.log(item);
                          setJobType(item);
                        }}
                      />
                      <div className="selected-options">
                        {jobType.length != 0 &&
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
                    </div>

                    <div className="form-group range_slider">
                      <label htmlFor="salaryRange">
                        Salary Range{" "}
                        <div className="range_value">
                          <span>$ {minValue}</span>-<span>$ {maxValue}</span>
                        </div>
                      </label>

                      <div className="form-group">
                        <select
                          className="form-control form-select"
                          name="SalaryBase"
                          value={salaryBase}
                          placeholder="Salary Type"
                          onChange={(e) => {
                            setSalaryBase(e.target.value);
                          }}
                          disabled={modes?.type != "4" && true}
                          required
                        >
                          <option>Select a salary Type</option>
                          {salaryBaseData?.map((item) => {
                            return (
                              <option
                                key={`index${item?.id}`}
                                value={item?.name}
                              >
                                {item?.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-6">
                          <label htmlFor="minsalary">Minimum</label>
                          <input
                            type="number"
                            className="form-control"
                            name="Salary_Offered"
                            id="Salary_Offered"
                            value={minValue}
                            placeholder="$"
                            onChange={(e) => {
                              set_minValue(e.target.value);
                            }}
                            disabled={modes?.type != "4" && true}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="maxsalary">Maximum</label>
                          <input
                            type="number"
                            className="form-control"
                            name="Max_Salary_Offered"
                            id="Max_Salary_Offered"
                            value={maxValue}
                            placeholder="$"
                            onChange={(e) => {
                              set_maxValue(e.target.value);
                            }}
                            disabled={modes?.type != "4" && true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <Autocomplete
                        apiKey={apiKey}
                        options={{
                          types: ["establishment", "geocode"],
                          fields: ["formatted_address", "geometry", "name"],
                        }}
                        onPlaceSelected={(places) => {
                          // const { address_components, formatted_address } = places;
                          setAddresses(places?.formatted_address);
                        }}
                        name="address"
                        className={`form-control`}
                        defaultValue={jobSeekerDetails?.job_location}
                        disabled={modes?.type != "4"}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Box */}
            <div className="col-md-6">
              <div className="card profile_box">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="icon">
                      <img
                        src={"/assets/images/icons/profile/education.svg"}
                        alt="icon"
                        className="image-fit-contain"
                      />
                    </span>
                    Education
                    {modes?.type == "3" ? (
                      <a onClick={() => handleSave(3)} className="link">
                        Save
                      </a>
                    ) : (
                      <a onClick={() => handleEdit("edit", 3)} className="link">
                        Edit
                      </a>
                    )}
                  </h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="selectEducation">Select Education</label>
                      <select
                        className="form-control form-select"
                        name="education_Level"
                        id="selectEducation"
                        onChange={(e) => handleValuChange(3, e)}
                        required
                        placeholder="Select Education"
                        disabled={modes?.type != "3"}
                        value={
                          educationData
                            ? educationData.education_Level_Id
                              ? educationData.education_Level_Id
                              : educationData.education_Level
                            : ""
                        }
                      >
                        <option selected disabled>
                          Select Education
                        </option>
                        {educationListOptions?.map((el, i) => (
                          <option key={i} value={el?.value}>
                            {el?.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="visaType">College</label>
                      <Select
                        id="college"
                        instanceId="college"
                        options={createOptionsCol}
                        placeholder="College"
                        className="form-control form-select"
                        closeMenuOnSelect={true}
                        isMulti={false}
                        value={
                          createOptionsCol &&
                          createOptionsCol?.find(
                            (option) => option.value === college
                          )
                        }
                        onChange={(item) => {
                          setCollege(item?.label);
                        }}
                        name="college"
                        isDisabled={modes?.type != "3"}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Box */}
            {jobSeekerDetails?.preffered_job_type == "Freelance" && (
              <div className="col-md-6">
                <div className="card profile_box">
                  <div className="card-header">
                    <h5 className="card-title">
                      <span className="icon">
                        <img
                          src={"/assets/images/icons/profile/portfolio.svg"}
                          alt="icon"
                          className="image-fit-contain"
                        />
                      </span>
                      My Portfolio
                      {modes?.type == "5" ? (
                        <a
                          onClick={() => {
                            handleSave(5);
                            handleEditPortfolio("create");
                            //setShowPortFolio(true);
                          }}
                          className="link"
                        >
                          Add
                        </a>
                      ) : (
                        <a
                          onClick={() => handleEdit("edit", 5)}
                          className="link"
                        >
                          Edit
                        </a>
                      )}
                    </h5>
                  </div>
                  {jobSeekerDetails?.preffered_job_type == "Freelance" && (
                    <div className="card-body">
                      <div className="row portfolio_slider">
                        {portFolioData?.data?.map((item, i) => (
                          <div className="col form-group" key={i}>
                            {modes?.type == "5" && (
                              <>
                                <button
                                  className="remove_option text-success"
                                  type="button"
                                  //name={item?.label}
                                  onClick={() =>
                                    handleEditPortfolio(
                                      "edit",
                                      item?.portfolio_id,
                                      item
                                    )
                                  }
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="remove_option mx-2 text-danger"
                                  type="button"
                                  //name={item.?.label}
                                  onClick={() =>
                                    removePortfolio(item?.portfolio_id)
                                  }
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </>
                            )}

                            <a href="#">
                              <img
                                src={
                                  item?.image ||
                                  "/assets/images/portfolio/1.png"
                                }
                                alt="image"
                                className="image-fit"
                              />
                            </a>
                            <label>{item?.title}</label>
                          </div>
                        ))}
                        {/* <div className="col form-group">
											<a href="#">
												<img src={ "/assets/images/portfolio/2.png"} alt="image" className='image-fit' />
											</a>
											<label>Work Title</label>
										</div>
										<div className="col form-group">
											<a href="#">
												<img src={ "/assets/images/portfolio/3.png"} alt="image" className='image-fit' />
											</a>
											<label>Work Title</label>
										</div> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Box */}
            <div className="col-md-6">
              <div className="card profile_box">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="icon">
                      <img
                        src={"/assets/images/icons/profile/calendar.svg"}
                        alt="icon"
                        className="image-fit-contain"
                      />
                    </span>
                    Set Availability
                    {modes?.type == "6" ? (
                      <a onClick={() => handleSave(6)} className="link">
                        Save
                      </a>
                    ) : (
                      <a onClick={() => handleEdit("edit", 6)} className="link">
                        Edit
                      </a>
                    )}
                  </h5>
                </div>
                <div className="card-body setavailablity image_radio basic checkbox">
                  <form>
                    {state?.checkList?.map((item, i) => (
                      <div className="form-group" key={i}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name={item.name}
                            id={item.value}
                            value={item.value}
                            checked={item.checked}
                            onChange={(e) =>
                              onCheckBoxChange(item?.value, e.target.checked)
                            }
                          />
                          <label
                            style={{ textTransform: "capitalize" }}
                            className="form-check-label justify-content-start"
                            htmlFor={item.value}
                          >
                            {modes?.type == "6" && (
                              <span className="icon">
                                <img
                                  src={
                                    "/assets/images/icons/checkbox/inactive.svg"
                                  }
                                  alt="icon"
                                />
                                <img
                                  src={
                                    "/assets/images/icons/checkbox/active.svg"
                                  }
                                  alt="icon"
                                />
                              </span>
                            )}

                            {item.name}
                          </label>
                        </div>
                        <div className="row">
                          <div className="col-xl-6 col-md-12">
                            <TimePicker
                              // type="time"
                              className="form-control mb-3"
                              name="startTime"
                              onChange={(e) =>
                                onHandleChangeFor(item?.value, e, "block")
                              }
                              required
                              value={
                                state.dataObj.Availablity[item?.value]
                                  ? state.dataObj.Availablity[item?.value].from
                                  : ""
                              }
                              // value={option.checked ? option.from : ""}
                            />
                            {/* <select
                              className="form-control form-select mb-3"
                              name="startTime"
                              onChange={(e) =>
                                onHandleChangeFor(
                                  item?.value,
                                  e.target.value,
                                  "block"
                                )
                              }
                              required
                              value={
                                state.dataObj.Availablity[item?.value]
                                  ? state.dataObj.Availablity[item?.value].from
                                  : ""
                              }
                            >
                              <option>Start Time</option>
                              {TimeSchedule.map((el, i) => (
                                <option
                                  disabled={
                                    modes?.type == "6" && item.checked === true
                                      ? false
                                      : true
                                  }
                                  key={i}
                                  value={el?.value}
                                >
                                  {el?.name}
                                </option>
                              ))}
                            </select> */}
                          </div>
                          <div className="col-xl-6 col-md-12">
                            <TimePicker
                              // type="time"
                              className="form-control mb-3"
                              name="endTime"
                              onChange={(e) =>
                                onHandleChangeFor(item?.value, "block", e)
                              }
                              value={
                                state.dataObj.Availablity[item.value]
                                  ? state.dataObj.Availablity[item.value].to
                                  : ""
                              }
                              required
                              // value={option.checked ? option.from : ""}
                            />
                            {/* <select
                              className="form-control form-select"
                              name="endTime"
                              onChange={(e) =>
                                onHandleChangeFor(
                                  item?.value,
                                  "block",
                                  e.target.value
                                )
                              }
                              value={
                                state.dataObj.Availablity[item.value]
                                  ? state.dataObj.Availablity[item.value].to
                                  : ""
                              }
                              required
                            >
                              <option>End Time</option>
                              {TimeSchedule.map((el, i) => (
                                <option
                                  key={i}
                                  selected
                                  disabled={
                                    modes?.type == "6" && item.checked === true
                                      ? false
                                      : true
                                  }
                                  value={el?.value}
                                >
                                  {el?.name}
                                </option>
                              ))}
                            </select> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </form>
                </div>
              </div>
            </div>
            {/* Box */}
          </div>
          {/* Content Box */}
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />{" "}
      </main>
      <Portfolio
        showModal={showPortFolio}
        portfolioModal={portfolioModal}
        onClose={() => setShowPortFolio(false)}
      />
    </Fragment>
  );
};

export default ProfileForm;
