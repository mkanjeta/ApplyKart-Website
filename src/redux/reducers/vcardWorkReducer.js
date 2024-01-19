import {
  GET_JOB_SEEKER_DETAIL_FAILED,
  GET_JOB_SEEKER_DETAIL_SUCCESS,
  GET_UNIVERSITY_LIST_FAILED,
  GET_UNIVERSITY_LIST_SUCCESS,
  SAVE_VCARD_EDUCATION_DETAIL_FAILED,
  SAVE_VCARD_EDUCATION_DETAIL_INIT,
  SAVE_VCARD_EDUCATION_DETAIL_SUCCESS,
  SAVE_VCARD_SET_AVAILABILITY_FAILED,
  SAVE_VCARD_SET_AVAILABILITY_SUCCESS,
  SAVE_VCARD_WORK_DETAIL_FAILED,
  SAVE_VCARD_WORK_DETAIL_INIT,
  SAVE_VCARD_WORK_DETAIL_SUCCESS,
  SAVE_VCARD_SET_AVAILABILITY_INIT,
  GET_JOB_TYPE_LIST_SUCCESS,
  GET_JOB_TYPE_LIST_FAILED,
  GET_JOB_TYPE_LISTS_SUCCESS,
  GET_JOB_TYPE_LISTS_FAILED,
  SAVE_VCARD_SKILL_DETAIL_SUCCESS,
  SAVE_VCARD_SKILL_DETAIL_FAILED,
  SAVE_FILE_DATA_SUCCESS,
  SAVE_PORTFOLIA_DATA_FAILED,
  SAVE_PORTFOLIA_DATA_SUCCESS,
  GET_PORTFOLIO_DATA_FAILED,
  GET_PORTFOLIO_DATA_SUCCESS,
  DELETE_PORTFOLIO_DATA_SUCCESS,
  DELETE_PORTFOLIO_DATA_FAILED,
  UPDATE_PORTFOLIA_DATA_SUCCESS,
  UPDATE_PORTFOLIA_DATA_FAILED,
  GET_LANGUAGE_LIST_SUCCESS,
  GET_LANGUAGE_LIST_FAILED,
  GET_REQUIREMENT_LIST_SUCCESS,
  GET_REQUIREMENT_LIST_FAILED,
  GET_UPLOAD_DATA_SUCCESS,
  GET_UPLOAD_DATA_FAILED,
  GET_CALENDER_DATA_SUCCESS,
  GET_CALENDER_DATA_FAILED,
  DELETE_VIDEO_DATA_SUCCESS,
  DELETE_VIDEO_DATA_FAILED,
  CHANNEL_FOR_USER_SUCCESS,
  CHANNEL_FOR_USER_FAILED,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_FAILED,
  GET_MESSAGE_LIST_SUCCESS,
  GET_MESSAGE_LIST_FAILED,
} from "redux/actionTypes/work.actionTypes";
import Swal from "sweetalert2";

const iniitialState = {
  deviceToken: null,
  userData: null,
  isLoggedIn: false,
  encryptedToken: "",
  showSuccessModal: false,
  typeLoggedIn: false,
  currentStep: null,
  nextStep: null,
  userData: {},
  error: false,
  message: "",
  socialMediaData: {},
  loginType: "normal",
  signupSucces: false,
  entity: null,
  jobSeekerDetails: null,
  workDetail2: false,
  educationDetail2: false,
  setAvailabilityDetail: false,
  jobTypeLists: null,
  fileName: "",
  languageList: null,
  requirementList: null,
  uplodedDocumentData: null,
  calenderData: null,
  deleteStatus: null,
  errorData: null,
  loading: false,
  channelStatus: false,
  ChatListData: null,
  channelData: null,
  messageListData: null,
  redirect: false,
  selectedUserChat: []
};
export default function vcardWorkReducer(state = iniitialState, action) {
  switch (action.type) {
    case SAVE_VCARD_WORK_DETAIL_INIT:
      return {
        ...state,
        ...action.payload,
        currentStep: "",
        redirect: false,
        loading: true,
      };
    case "SET_LOADING_FALSE":
      return {
        ...state,
        currentStep: "",
        redirect: false,
        loading: false,
      };
    case "SET_REDIRECT_FALSE":
      return {
        ...state,
        redirect: false,
        loading: false,
      };
    case "SAVE_VCARD_SKILL_DETAIL_INIT":
      return {
        ...state,
        ...action.payload,
        error: false,
        workDetail2: true,
        redirect: false,
        loading: true,
      };

    case SAVE_VCARD_WORK_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        workDetail2: true,
        redirect: true,
        loading: false,
      };
    case SAVE_VCARD_WORK_DETAIL_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
        redirect: false,
      };
    case "GET_JOB_SEEKER_DETAIL_INIT":
      return {
        ...state,
        error: false,
        loading: true,
      };
    case GET_JOB_SEEKER_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        jobSeekerDetails: action.payload.entity,
        error: false,
        message: action.payload.message,
        loading: false,
      };
    case GET_JOB_SEEKER_DETAIL_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case GET_UNIVERSITY_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        universityList: action.payload.entity,
        error: false,
        message: action.payload.message,
      };
    case GET_UNIVERSITY_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case GET_LANGUAGE_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        languageList: action.payload.entity,
        error: false,
        message: action.payload.message,
      };
    case GET_LANGUAGE_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case GET_REQUIREMENT_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        requirementList: action.payload.entity,
        error: false,
        message: action.payload.message,
      };
    case GET_REQUIREMENT_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case GET_JOB_TYPE_LISTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: false,
        message: action.payload.message,
        jobTypeLists: action.payload.entity,
        loading: false,
      };
    case GET_JOB_TYPE_LISTS_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case GET_PORTFOLIO_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: false,
        message: action.payload.message,
        portFolioData: action.payload.entity,
      };
    case GET_PORTFOLIO_DATA_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case DELETE_PORTFOLIO_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: false,
        message: action.payload.message,
        deletePortFolioData: true,
      };
    case DELETE_PORTFOLIO_DATA_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case SAVE_VCARD_EDUCATION_DETAIL_INIT:
      return {
        ...state,
        ...action.payload,
        currentStep: "",
        loading: true,
        redirect: false,
      };
    case SAVE_VCARD_EDUCATION_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        educationDetail2: true,
        loading: false,
        redirect: true,
      };
    case SAVE_VCARD_EDUCATION_DETAIL_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
        redirect: false,
      };
    case "SET_VCARD_REDIRECT_FALSE":
      return {
        ...state,
        loading: false,
        redirect: false,
      };

    case SAVE_VCARD_SKILL_DETAIL_SUCCESS:
      let jSeeker = { ...state.jobSeekerDetails };
      jSeeker["skills"] = action.payload.skills;
      return {
        ...state,
        ...action.payload,
        jobSeekerDetails: { ...jSeeker },
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        skillsDetail: true,
        loading: false,
        redirect: true,
      };
    case SAVE_VCARD_SKILL_DETAIL_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case SAVE_VCARD_SET_AVAILABILITY_INIT:
      return {
        ...state,
        ...action.payload,
        loading: true,
        redirect: false,
      };
    case SAVE_VCARD_SET_AVAILABILITY_SUCCESS:
      let jobSeeker = { ...state.jobSeekerDetails };
      jobSeeker["avalablity"] = action.payload.avaData;
      return {
        ...state,
        ...action.payload,
        jobSeekerDetails: jobSeeker,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        setAvailabilityDetail: true,
        loading: false,
        redirect: true,
      };

    case SAVE_FILE_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        redirect: false,
      };

    case SAVE_VCARD_SET_AVAILABILITY_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case "SAVE_PORTFOLIA_DATA_INIT":
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        portfolio: true,
        loading: true,
        redirect: false,
      };
    case SAVE_PORTFOLIA_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        portfolio: true,
        loading: false,
        redirect: true,
      };
    case SAVE_PORTFOLIA_DATA_FAILED:
      return {
        ...state,
        ...action.payload,
        //message: action.payload.message,
        error: true,
        loading: false,
        redirect: false,
      };
    case GET_UPLOAD_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        //message: action.payload.message,
        uplodedDocumentData: action.payload.entity,
      };
    case GET_UPLOAD_DATA_FAILED:
      return {
        ...state,
        ...action.payload,
        //message: action.payload.message,
        error: true,
      };
    case UPDATE_PORTFOLIA_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        //message: action.payload.message,
        portfolioUpdated: true,
      };
    case UPDATE_PORTFOLIA_DATA_FAILED:
      return {
        ...state,
        ...action.payload,
        //message: action.payload.message,
        error: true,
      };

    case GET_CALENDER_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        calenderData: action.payload.entity,
      };
    case GET_CALENDER_DATA_FAILED:
      return {
        ...state,
        ...action.payload,
        errorData: action?.payload?.entity,
      };
    case DELETE_VIDEO_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        deleteStatus: true,
      };
    case DELETE_VIDEO_DATA_FAILED:
      return {
        ...state,
        ...action.payload,
        error: true,
      };
    case CHANNEL_FOR_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        //deleteStatus: true,
        channelData: action?.payload?.entity,
        channelStatus: true,
      };
    case CHANNEL_FOR_USER_FAILED:
      return {
        ...state,
        ...action.payload,
        error: true,
      };
    case GET_CHAT_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        //deleteStatus: true,
        ChatListData: action?.payload?.entity,
      };
    case GET_CHAT_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        error: true,
      };
    case "GET_MESSAGE_LIST_INIT":
      return {
        ...state,
        loading: false,
      };
    case GET_MESSAGE_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        //deleteStatus: true,
        messageListData: action?.payload?.entity,
        loading: false,
      };
    case GET_MESSAGE_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        error: true,
        loading: false,
      };
    case "CLOSE_CHAT_INIT":
      return {
        ...state,
      };
    case "CLOSE_CHAT_SUCCESS":
      let messages = state.messageListData
        ? [...state.messageListData.messages]
        : [];
      for (let i = 0; i < messages.length; ++i) {
        if (messages[i].channelId == action.payload.channelId) {
          messages[i].isActive = 0;
        }
      }

      let obj = {
        messages: [...messages],
      };

      Swal.fire({
        icon: "success",
        title: "Chat closed",
      });

      return {
        ...state,
        messageListData: { ...obj },
      };

    case "DELETE_CHAT_SUCCESS":
      let messages1 = state.messageListData
        ? state.messageListData.messages.filter(
            (item) => item.channelId != action.payload.channelId
          )
        : [];
      // for(let i=0; i<messages1.length; ++i){
      //     if(messages1[i].channelId == action.payload.channelId){
      //       messages1[i].isActive = 0;
      //     }
      // }
      let obj1 = {
        messages: [...messages1],
      };

      Swal.fire({
        icon: "success",
        title: "Chat Deleted",
      });

      return {
        ...state,
        messageListData: { ...obj1 },
      };

    case "UPDATE_JOB_SEEKER_SKILLS":
      if (state.jobSeekerDetails) {
        let js = { ...state.jobSeekerDetails };
        let types = [...action.payload.skills];
        let skills = types.map((item) => {
          return {
            Job_Type: item?.label,
            Job_Type_id: item?.id,
          };
        });

        js["preffered_job_type"] = [...skills];
        return {
          ...state,
          jobSeekerDetails: { ...js },
        };
      } else {
        return {
          ...state,
        };
      }

    case "POSTER_COMPLETED":
      let poster = { ...state.uplodedDocumentData };
      poster.isCompleted = 1;
      return {
        ...state,
        uplodedDocumentData: { ...poster },
      };
    
    case "SELECT_USER_CHAT": 
      return {
        ...state,
        selectedUserChat: [...action.payload]
      }

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
