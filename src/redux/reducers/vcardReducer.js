import {
  SAVE_USER_SETTING_FAILED,
  SAVE_USER_SETTING_SUCCESS,
  SAVE_VCARD_BASIC_DETAIL_FAILED,
  SAVE_VCARD_BASIC_DETAIL_INIT,
  SAVE_VCARD_BASIC_DETAIL_SUCCESS,
} from "redux/actionTypes/vcard.actionTypes";
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
  basicDetail1: false,
  loading: false,
  redirect: false,
};
export default function vcardReducer(state = iniitialState, action) {
  switch (action.type) {
    case SAVE_VCARD_BASIC_DETAIL_INIT:
      return {
        ...state,
        ...action.payload,
        loading: true,
        redirect: false,
      };
    case SAVE_VCARD_BASIC_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        basicDetail1: true,
        loading: false,
        redirect: true,
      };
    case SAVE_VCARD_BASIC_DETAIL_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loading: false,
        redirect: false,
      };
    case "SET_LOADING_FALSE":
      return {
        ...state,
        currentStep: "",
        redirect: false,
        loading: false,
      };
    case SAVE_USER_SETTING_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
      };
    case SAVE_USER_SETTING_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case "UPLOAD_CV_INIT":
      return {
        ...state,
        loading: true,
      };

    case "UPLOAD_CV_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "UPLOAD_CV_ERROR":
      return {
        ...state,
        loading: false,
      };

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
