import {
  AUTH_LOGGEDIN_INIT,
  AUTH_LOGGEDIN_SUCCESS,
  AUTH_LOGGEDIN_FAILED,
  AUTH_SIGNOUT_INIT,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_FAILED,
  AUTH_SIGNUP_INIT,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILED,
  AUTH_CHECK_CONTACT_INIT,
  AUTH_CHECK_CONTACT_SUCCESS,
  AUTH_CHECK_CONTACT_FAILED,
  AUTH_VERIFY_CONTACT_INIT,
  AUTH_VERIFY_CONTACT_SUCCESS,
  AUTH_VERIFY_CONTACT_FAILED,
  AUTH_FORGOT_PASSWORD_INIT,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILED,
  AUTH_SOCIAL_SIGN_IN_SUCCESS,
  AUTH_SOCIAL_SIGN_IN_FAILED,
  SAVE_SOCIAL_MEDIA_DATA_SUCCESS,
  SAVE_SOCIAL_MEDIA_DATA_FAILED,
  SOCIAL_AUTH_LOGGEDIN_INIT,
  SOCIAL_AUTH_LOGGEDIN_FAILED,
  SOCIAL_AUTH_SIGNUP_INIT,
  SOCIAL_AUTH_SIGNUP_SUCCESS,
  SOCIAL_AUTH_SIGNUP_FAILED,
  SOCIAL_AUTH_LOGGEDIN_SUCCESS,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_INIT,
  AUTH_RESET_PASSWORD_FAILED,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_INIT,
  RESET_NEXT_STEP,
  GET_CURRENT_PLAN_INIT,
  GET_CURRENT_PLAN_SUCCESS,
  GET_CURRENT_PLAN_FAILED,
  GET_CURRENT_PLAN_RESET,
  VALIDATE_SESSION_INIT,
  VALIDATE_SESSION_SUCCESS,
  VALIDATE_SESSION_FAILED,
  UPDATE_QR_TYPE_INIT,
  UPDATE_QR_TYPE_SUCCESS,
  UPDATE_QR_TYPE_FAILED,
  UPDATE_BASIC_DETAILS_INIT,
  UPDATE_BASIC_DETAILS_SUCCESS,
  UPDATE_BASIC_DETAILS_FAILED
} from "../actionTypes/auth.actionTypes";

const iniitialState = {
  deviceToken: null,
  userData: null,
  isLoggedIn: typeof window != 'undefined' && localStorage.getItem("applyKart") ? true : false,
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
  isCompleted: 0,
  loading: false,
  deleted: false,
  contactUsSuccess: false,
  currentSubscriptionPlan: null,
  planSuccess: false,
  sessionValidateSuccess: false,
  qrUpdated: false,
  allDataUser:null,
  signUpData: null,
  basicDetailSuccess: false
};

export default function AuthReducer(state = iniitialState, action) {
  switch (action.type) {
    // Do something here based on the different types of actions

    case AUTH_LOGGEDIN_INIT:
      return {
        ...state,
        ...action.payload,
        currentStep: "login",
        loading: true,
      };
    case AUTH_LOGGEDIN_SUCCESS:
      return {
        ...state,
        encryptedToken: action.payload.encryptedToken,
        showSuccessModal: true,
        typeLoggedIn: false,
        isLoggedIn: true,
        isCompleted: action.payload.isCompleted,
        error: false,
        message: action.payload.message,
        loading: false,
        allDataUser:action.payload.entity
      };
    case AUTH_LOGGEDIN_FAILED:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: false,
        message: action.payload.message,
        error: true,
        loading: false,
        allDataUser:null
      };

    case SOCIAL_AUTH_LOGGEDIN_INIT:
      return {
        ...state,
        ...action.payload,
        //currentStep: "Social login",
      };
    case SOCIAL_AUTH_LOGGEDIN_SUCCESS:
      return {
        ...state,
        encryptedToken: action.payload.encryptedToken,
        showSuccessModal: true,
        typeLoggedIn: false,
        isLoggedIn: true,
        signupSucces: true,
        error: false,
      };
    case SOCIAL_AUTH_LOGGEDIN_FAILED:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: false,
        message: action.payload.message,
        error: true,
      };

    case AUTH_CHECK_CONTACT_INIT:
      return {
        ...state,
        ...action.payload,
        currentStep: "checkContact",
      };
    case AUTH_CHECK_CONTACT_SUCCESS:
      return {
        ...state,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        checkContactSuccess: true,
        nextStep: "verifyTheOtp",
        loginType: action.payload.loginType,
        entity: action.payload.entity,
      };
    case AUTH_CHECK_CONTACT_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        checkContactSuccess: false,
      };

    case AUTH_VERIFY_CONTACT_INIT:
      return {
        ...state,
        ...action.payload,
        currentStep: "verifyContact",
      };
    case AUTH_VERIFY_CONTACT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        verifyContactSuccess: true,
        loginType: action.payload.loginType,
        nextStep: "verifySuccess",
      };
    case AUTH_VERIFY_CONTACT_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        verifyContactSuccess: false,
      };

    case AUTH_SIGNUP_INIT:
      return {
        ...state,
        ...action.payload,
        currentStep: "signup",
        accountCreated: false,
        loading: true,
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        signupSucces: true,
        // nextStep: "generateOtp",
        entity: action.payload.entity,
        loading: false,
        signUpData: action?.payload?.entity
      };
    case AUTH_SIGNUP_FAILED:
      return {
        ...state,
        ...action.payload,
        accountCreated: false,
        message: action.payload.message,
        error: true,
        currentStep: null,
        loading: false,
      };

    case "AUTH_SIGNIN_RESET":
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        signupSucces: false,
        loading: false,
        basicDetailSuccess: false,
        checkContactSuccess: false,
        verifyContactSuccess: false
      };

    case SOCIAL_AUTH_SIGNUP_INIT:
      return {
        ...state,
        ...action.payload,
        // currentStep: "Social signup",
        signupSucces: true,
        accountCreated: false,
      };
    case SOCIAL_AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        accountCreated: true,
        currentStep: null,
      };
    case SOCIAL_AUTH_SIGNUP_FAILED:
      return {
        ...state,
        ...action.payload,
        accountCreated: false,
        message: action.payload.message,
        error: true,
        currentStep: null,
      };

    case AUTH_SIGNOUT_INIT:
      return {
        ...state,
        ...action.payload,
        currentStep: "signout",
      };
    case AUTH_SIGNOUT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        encryptedToken: "",
        isLoggedIn: false,
      };
    case AUTH_SIGNOUT_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case AUTH_FORGOT_PASSWORD_INIT:
      return {
        ...state,
        ...action.payload,
        currentStep: "forgotPassword",
        otp: action.payload.otp,
      };
    case AUTH_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        nextStep: "forgotPasswordSuccess",
        message: action.payload.message,
      };
    case AUTH_FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };
    case AUTH_RESET_PASSWORD_INIT:
      return {
        ...state,
        ...action.payload,
        currentStep: "resetPassword",
      };
    case AUTH_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        nextStep: "resetPassword",
        message: action.payload.message,
      };
    case AUTH_RESET_PASSWORD_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case SAVE_SOCIAL_MEDIA_DATA_SUCCESS:
      return {
        ...state,
        socialMediaData: action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        loginType: "social",
      };

    case AUTH_SOCIAL_SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        message: action.payload.message,
        loginType: "social",
      };
    case AUTH_SOCIAL_SIGN_IN_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
        loginType: "social",
      };
    case CHANGE_PASSWORD_INIT:
      return {
        ...state,
        ...action.payload,
        currentStep: "changePassword",
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showSuccessModal: true,
        error: false,
        nextStep: "changePassword",
        message: action.payload.message,
      };
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
        error: true,
      };

    case "DELETE_ACCOUNT_SUCCESS":
      return {
        ...state,
        deleted: true,
      };

    case "SET_DELETED_FALSE":
      return {
        ...state,
        deleted: false,
      };

    case "CONTACT_US_SUCCESS":
      return {
        ...state,
        contactUsSuccess: true,
      };
    case "CONTACT_US_RESET":
      return {
        ...state,
        contactUsSuccess: false,
      };
    case "LOGGED_IN_FALSE":
        return {
          ...state,
          isLoggedIn: false
        };
    case RESET_NEXT_STEP:
      return {
        ...state,
        nextStep: null,
        checkContactSuccess: false
      }
      case GET_CURRENT_PLAN_INIT: 
      return {
        ...state
      }
      case GET_CURRENT_PLAN_SUCCESS: 
      return {
        ...state,
        currentSubscriptionPlan: action.payload,
        planSuccess: true
      }
      case GET_CURRENT_PLAN_FAILED: 
      return {
        ...state
      }
      case GET_CURRENT_PLAN_RESET:
        return {
          ...state,
          planSuccess: false
        }
      case VALIDATE_SESSION_INIT:
        return {
          ...state
        }
      case VALIDATE_SESSION_SUCCESS:
        return {
          ...state,
          sessionValidateSuccess: true
        }
        case VALIDATE_SESSION_FAILED:
        return {
          ...state,
          sessionValidateSuccess: false
        }
        case UPDATE_QR_TYPE_INIT: 
        return {
          ...state
        }
        case UPDATE_QR_TYPE_SUCCESS: 
        return {...state, qrUpdated: true}
        case UPDATE_QR_TYPE_FAILED: 
        return {...state, qrUpdated: false}
        case UPDATE_BASIC_DETAILS_INIT:
          return {
            ...state,
            loading: true
          }
        case UPDATE_BASIC_DETAILS_SUCCESS:
          return {
            ...state,
            loading: false,
            basicDetailSuccess: true
          }
        case UPDATE_BASIC_DETAILS_FAILED:
          return {
            ...state,
            loading: false,
            basicDetailSuccess: false
          }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
