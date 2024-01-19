import {
  GET_JOB_CATEGORY_LIST_FAILED,
  GET_JOB_CATEGORY_LIST_INIT,
  GET_JOB_CATEGORY_LIST_SUCCESS,
  GET_JOB_SUB_CATEGORY_LIST_FAILED,
  GET_JOB_SUB_CATEGORY_LIST_INIT,
  GET_JOB_SUB_CATEGORY_LIST_SUCCESS,
  SAVE_JOB_DETAIL_FAILED,
  SAVE_JOB_DETAIL_INIT,
  SAVE_JOB_DETAIL_SUCCESS,
  SAVE_JOB_PREFERENCES_FAILED,
  SAVE_JOB_PREFERENCES_SUCCESS,
} from "redux/actionTypes/categoryTypes";

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
  jobCategory: [],
  jobPreferencesWork3: null,
  loading: false,
  redirect: false,
};
export default function categoryReducer(state = iniitialState, action) {
  switch (action.type) {
    case "RESET_REDIRECT_CATEGORY":
      return {
        ...state,
        redirect: false,
        loading: false,
      };

    case "SAVE_JOB_PREFERENCES_INIT":
      return {
        ...state,
        ...action.payload,
        loading: true,
        redirect: false,
      };

    case GET_JOB_CATEGORY_LIST_INIT:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_JOB_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        jobCategory: action.payload.entity,
        loading: false,
      };
    case GET_JOB_CATEGORY_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case GET_JOB_SUB_CATEGORY_LIST_INIT:
      return {
        ...state,
        ...action.payload,
      };
    case GET_JOB_SUB_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        jobSubCategory: action.payload.entity,
      };
    case GET_JOB_SUB_CATEGORY_LIST_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case SAVE_JOB_DETAIL_INIT:
      return {
        ...state,
        ...action.payload,
        loading: true,
        redirect: false,
      };
    case SAVE_JOB_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        jobDetails: action.payload.entity,
        loading: false,
        redirect: true,
      };
    case SAVE_JOB_DETAIL_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
        redirect: false,
      };

    case SAVE_JOB_PREFERENCES_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        redirect: true,
      };

    case SAVE_JOB_PREFERENCES_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        jobPreferences: action.payload.entity,
        jobPreferencesWork3: true,
        loading: true,
        redirect: true,
      };
    case SAVE_JOB_PREFERENCES_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
        redirect: false,
      };
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
