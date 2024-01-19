import {
  BASIC_DETAIL_JOBPOSTER_FAILED,
  BASIC_DETAIL_JOBPOSTER_SUCCESS,
  CANDIDATE_SHORTLIST_FAILED,
  CANDIDATE_SHORTLIST_SUCCESS,
  EDIT_JOBS_FAILED,
  EDIT_JOBS_SUCCESS,
  GET_APPLIED_JOB_FAILED,
  GET_APPLIED_JOB_SUCCESS,
  GET_CANDIDATE_DETAIL_FAILED,
  GET_CANDIDATE_DETAIL_SUCCESS,
  GET_CANDIDATE_LIST_FAILED,
  GET_CANDIDATE_LIST_SUCCESS,
  GET_EDUCATION_LIST_FAILED,
  GET_EDUCATION_LIST_SUCCESS,
  GET_FAVORITE_FAILED,
  GET_FAVORITE_SUCCESS,
  GET_JOB_BROWSE_LIST_FAILED,
  GET_JOB_BROWSE_LIST_INIT,
  GET_JOB_BROWSE_LIST_SUCCESS,
  GET_JOB_DETAIL_FAILED,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_TYPE_LIST_FAILED,
  GET_JOB_TYPE_LIST_INIT,
  GET_JOB_TYPE_LIST_SUCCESS,
  GET_LIST_VISA_TYPE_FAILED,
  GET_LIST_VISA_TYPE_SUCCESS,
  GET_SKILLS_LIST_FAILED,
  GET_SKILLS_LIST_SUCCESS,
  GET_SUBSCRIPTION_PLAN_FAILED,
  GET_SUBSCRIPTION_PLAN_INIT,
  GET_SUBSCRIPTION_PLAN_SUCCESS,
  POSTED_NEW_JOB_FAILED,
  POSTED_NEW_JOB_SUCCESS,
  POST_APPLY_JOB_FAILED,
  POST_APPLY_JOB_SUCCESS,
  POST_FAVORITE_FAILED,
  POST_FAVORITE_INIT,
  POST_FAVORITE_SUCCESS,
  POST_POSTED_JOB_STATUS_FAILED,
  POST_POSTED_JOB_STATUS_SUCCESS,
  REMOVE_JOBS_FAILED,
  REMOVE_JOBS_SUCCESS,
  SCHEDULE_INTERVIEW_FAILED,
  SCHEDULE_INTERVIEW_SUCCESS,
  UPLOADED_DOCUMENT_FAILED,
  UPLOADED_DOCUMENT_SUCCESS,
} from "redux/actionTypes/jobBrowseTypes";
import Swal from "sweetalert2";

const iniitialState = {
  jobBrowseList: null,
  totalData: 0,
  jobTypeList: null,
  jobDetail: null,
  infoMessage: "",
  url: "",
  appliedJobList: null,
  entity: null,
  skillsListData: null,
  candidateStatus: null,
  postedJobStatus: null,
  favoriteJobs: null,
  uplodeDocumentStatus: null,
  jobFavBrowseById: {},
  removeStatus: null,
  basicDetailJobPoster: null,
  loading: false,
  redirect: false,
  message: "",
  error: "",
  jobPosted: false,
  job: null,
  fromPostJob: false,
  search: "",
  location: "",
  vcardDetails: null,
  notifications: [], 
  subscriptionPlans: [],
  subscriptionLoading: false,
  status: 0,
  experience: ''
};
export default function jobBrowseReducer(state = iniitialState, action) {
  switch (action.type) {
    case GET_JOB_BROWSE_LIST_INIT:
      return {
        ...state,
        ...action.payload,
        search: action?.payload?.search,
        location: action.payload?.WorkLocation,
        loading: true,
      };
    case "CREATE_JOB_FILTER_URL":
      return {
        ...state,
        ...action.payload,
        url: action.payload.url,
      };
    case "RESET_REDIRECT_FALSE":
      return {
        ...state,
        loading: false,
        redirect: false,
      };
    case "RESET_JOB_FILTER_URL":
      return {
        ...state,
        ...action.payload,
        url: "",
      };
    case GET_JOB_BROWSE_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        jobBrowseList:
          state.jobBrowseList &&
          !action.payload.search &&
          action.payload.pageNo > 1
            ? {
                jobs: [...action.payload.entity.jobs],
              }
            : action.payload.entity,
        loading: false,
        totalData: action.payload.entity.totalJobCount
          ? action.payload.entity.totalJobCount
          : 0,
      };
    case GET_JOB_BROWSE_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
      };
    case GET_LIST_VISA_TYPE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        visaTypeData: action.payload.entity,
      };
    case GET_LIST_VISA_TYPE_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case GET_EDUCATION_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        educationListData: action.payload.entity,
      };
    case GET_EDUCATION_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case GET_SKILLS_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        skillsListData: action.payload.entity,
      };
    case GET_SKILLS_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case GET_JOB_TYPE_LIST_INIT:
      return {
        ...state,
        ...action.payload,
      };
    case GET_JOB_TYPE_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        jobTypeList: action.payload.entity,
      };
    case GET_JOB_TYPE_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case "GET_JOB_DETAIL_INIT":
      return {
        ...state,
        ...action.payload,
        jobDetail: null,
        loading: true,
      };
    case GET_JOB_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        jobDetail: action.payload.entity,
        loading: false,
      };
    case GET_JOB_DETAIL_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
      };
    case "POST_APPLY_JOB_INIT":
      return {
        ...state,
        loading: true,
        //jobDetail: action.payload.entity
      };
    case POST_APPLY_JOB_SUCCESS:
      Swal.fire({
        icon: "success",
        title: "Application Submitted",
      });
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        infoMessage: "job applied",
        loading: false,
        //jobDetail: action.payload.entity
      };
    case POST_APPLY_JOB_FAILED:
      Swal.fire({
        icon: "error",
        title: action.payload.message,
      });
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
      };
    case POST_POSTED_JOB_STATUS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        // infoMessage: "job applied"
        //jobDetail: action.payload.entity
      };
    case POST_POSTED_JOB_STATUS_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case REMOVE_JOBS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        removeStatus: true,
        // infoMessage: "job applied"
        //jobDetail: action.payload.entity
      };
    case REMOVE_JOBS_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case GET_APPLIED_JOB_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        appliedJobList: action.payload.entity,
        //jobDetail: action.payload.entity
      };

    case "SET_JOB_FAV_UNFAV":
      let obj = null,
        obj1 = null;
      let details = null;
      let list = [];

      if (state.appliedJobList) {
        list = [...state.appliedJobList.jobs];
        for (let i = 0; i < list.length; ++i) {
          if (list[i].job_Id == action.payload.jobId) {
            list[i].isFav = list[i].isFav ? 0 : 1;
          }
        }
        obj1 = { jobs: [...list] };
      }

      if (state.jobBrowseList) {
        list = [...state.jobBrowseList.jobs];
        for (let i = 0; i < list.length; ++i) {
          if (list[i].job_Id == action.payload.jobId) {
            list[i].isFav = list[i].isFav ? 0 : 1;
          }
          obj = { jobs: [...list] };
        }
      }

      if (state.jobDetail) {
        details = { ...state.jobDetail };
        details.is_favourite = details.is_favourite ? 0 : 1;
      }

      Swal.fire({
        icon: "success",
        text: action.payload.entity.message,
      });

      return {
        ...state,
        jobBrowseList: obj ? { ...obj } : null,
        appliedJobList: obj1 ? { ...obj1 } : null,
        jobDetail: details ? { ...details } : null,
      };

    case GET_APPLIED_JOB_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case GET_CANDIDATE_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        candidateList: action.payload.entity,
        //jobDetail: action.payload.entity
      };
    case GET_CANDIDATE_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case "GET_CANDIDATE_DETAIL_INIT":
      return {
        ...state,
        loading: true,
        //jobDetail: action.payload.entity
      };

    case GET_CANDIDATE_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        candidateDetails: action.payload.entity,
        loading: false,
        //jobDetail: action.payload.entity
      };
    case GET_CANDIDATE_DETAIL_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
      };
    case CANDIDATE_SHORTLIST_SUCCESS:
      Swal.fire({
        icon: "success",
        title: "Candidate shortlisted",
      });
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        candidateStatus: "SHORTLISTED",
        //jobDetail: action.payload.entity
      };
    case CANDIDATE_SHORTLIST_FAILED:
      Swal.fire({
        icon: "success",
        title: "Candidate Rejected",
      });
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: false,
        candidateStatus: "REJECT"
      };

    case SCHEDULE_INTERVIEW_SUCCESS:
      Swal.fire({
        icon: "success",
        title: "Interview scheduled successfully!",
      });
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        //candidateStatus: true
        //jobDetail: action.payload.entity
      };
    case SCHEDULE_INTERVIEW_FAILED:
      Swal.fire({
        icon: "error",
        title: action.payload.message,
      });
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    //posted a new job
    case "POSTED_NEW_JOB_INIT":
      return {
        ...state,
        redirect: false,
        loading: true,
      };
    case POSTED_NEW_JOB_SUCCESS:
      Swal.fire({
        icon: "success",
        title: "Job Posted",
      });
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        postedJobStatus: true,
        redirect: true,
        loading: false,
        jobDetail: action.payload.entity,
      };
    case POSTED_NEW_JOB_FAILED:
      Swal.fire({
        icon: "error",
        title: action.payload.message,
      });
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
        redirect: false,
        status: action.payload.status
      };
    //
    case "POSTED_EDIT_JOB_INIT":
      return {
        ...state,
        redirect: false,
        loading: true,
      };
    case "POSTED_EDIT_JOB_SUCCESS":
      Swal.fire({
        icon: "success",
        title: "Job Edited",
      });
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        postedJobStatus: true,
        redirect: true,
        loading: false,
        jobDetail: action.payload.entity,
      };
    case "POSTED_EDIT_JOB_FAILED":
      Swal.fire({
        icon: "error",
        title: action.payload.message,
      });
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
        redirect: false,
      };
    case EDIT_JOBS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        //postedJobStatus: true
        jobDetail: action.payload.entity,
      };
    case EDIT_JOBS_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    //uploaded document
    case "UPLOADED_DOCUMENT_INIT":
      return {
        ...state,
        loading: true,
      };
    case UPLOADED_DOCUMENT_SUCCESS:
      Swal.fire({
        icon: "success",
        title: "Updated",
      });
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        uplodeDocumentStatus: true,
        loading: false,
        //jobDetail: action.payload.entity
      };
    case UPLOADED_DOCUMENT_FAILED:
      Swal.fire({
        icon: "error",
        title: action.payload.message,
      });
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
      };
    // basic jobPoster details
    case BASIC_DETAIL_JOBPOSTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        basicDetailJobPoster: true,
        //jobDetail: action.payload.entity
      };
    case BASIC_DETAIL_JOBPOSTER_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case POST_FAVORITE_INIT:
      return {
        ...state,
        jobFavBrowseById: {
          ...action.jobDetail,
          is_favourite: action.jobDetail.is_favourite == 1 ? 0 : 1,
        },
      };

    case POST_FAVORITE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        // message: action.payload.message,
      };
    case POST_FAVORITE_FAILED:
      return {
        ...state,
        jobFavBrowseById: {
          ...state.jobDetail,
          is_favourite: !state.jobDetail.is_favourite,
        },
      };
    case GET_FAVORITE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        favoriteJobs: action.payload.entity,
      };
    case GET_FAVORITE_FAILED:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
      };

    case "REFER_A_FRIEND_INIT":
      return {
        ...state,
        loading: true,
      };

    case "REFER_A_FRIEND_SUCCESS":
      Swal.fire({
        icon: "success",
        title: action.payload,
      });
      return {
        ...state,
        loading: false,
      };

    case "REFER_A_FRIEND_ERROR":
      Swal.fire({
        icon: "error",
        title: "Something went wrong while refering",
      });
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case "POST_A_JOB_PROFILE":
      return {
        ...state,
        job: action.payload,
        fromPostJob: true,
      };

    case "POST_A_JOB_COMPLETE":
      return {
        ...state,
        job: null,
        fromPostJob: false,
      };

    case "GET_VCARD_INFO_INIT":
      return {
        ...state,
        loading: true,
      };
    case "GET_VCARD_INFO_SUCCESS":
      return {
        ...state,
        loading: false,
        vcardDetails: action.payload,
      };

    case "GET_VCARD_INFO_FAILURE":
      Swal.fire({
        icon: "error",
        message: "cannot fetch details",
      });
      return {
        ...state,
        loading: false,
      };

    case "HOME_PAGE_SEARCH":
      return {
        ...state,
        search: action.payload.search,
        location: action.payload.location,
      };

    case "REMOVE_SAVED_JOB":
      return {
        ...state,
        loading: true,
      };

    case "REMOVE_SAVED_JOB_SUCCESS":
      let data = [...state.favoriteJobs.jobs];
      data = data.filter((item) => item?.job_Id != action.payload);
      let favJobs = {
        jobs: [...data],
      };

      return {
        ...state,
        favoriteJobs: { ...favJobs },
        loading: false,
      };
    case "REMOVE_SAVED_JOB_FAILURE":
      return {
        ...state,
        loading: false,
      };

    case "NOTIFICATION_SUCCESS":
      return {
        ...state,
        notifications: [...action.payload],
      };

    case "CLEAR_JOBS":
      return {
        ...state,
        jobBrowseList: null,
      };
      case GET_SUBSCRIPTION_PLAN_INIT: 
      return {
        ...state,
        subscriptionLoading: true
      };
      case GET_SUBSCRIPTION_PLAN_SUCCESS: 
      return {
        ...state,
        subscriptionPlans: [...action.payload],
        subscriptionLoading: false
      };
      case GET_SUBSCRIPTION_PLAN_FAILED: 
      return {
        ...state,
        subscriptionLoading: false
      };

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
