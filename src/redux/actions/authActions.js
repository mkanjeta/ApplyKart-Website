import { UPDATE_PORTFOLIA_DATA_INIT } from "redux/actionTypes/work.actionTypes";
import {
  AUTH_LOGGEDIN_INIT,
  AUTH_SIGNOUT_INIT,
  AUTH_SIGNUP_INIT,
  AUTH_CHECK_CONTACT_INIT,
  AUTH_VERIFY_CONTACT_INIT,
  AUTH_FORGOT_PASSWORD_INIT,
  AUTH_SOCIAL_SIGN_IN_INIT,
  SAVE_SOCIAL_MEDIA_DATA_INIT,
  SAVE_SOCIAL_MEDIA_DATA_SUCCESS,
  SOCIAL_AUTH_SIGNUP_INIT,
  SOCIAL_AUTH_LOGGEDIN_INIT,
  AUTH_RESET_PASSWORD_INIT,
  CHANGE_PASSWORD_INIT,
  GET_CURRENT_PLAN_INIT,
  VALIDATE_SESSION_INIT,
  UPDATE_QR_TYPE_INIT,
  UPDATE_BASIC_DETAILS_INIT,
} from "../actionTypes/auth.actionTypes";

//login actions
export const LoggedIn = (obj) => {
  return { type: AUTH_LOGGEDIN_INIT, payload: obj };
};

export const SocialLoggedIn = (obj) => {
  return { type: SOCIAL_AUTH_LOGGEDIN_INIT, payload: obj };
};

//Signup normal actions
export const SignupCheckContact = (obj) => {
  return {
    type: AUTH_CHECK_CONTACT_INIT,
    payload: { payload: obj, loginType: "normal" },
  };
};

export const SignupVeriyContact = (obj) => {
  return {
    type: AUTH_VERIFY_CONTACT_INIT,
    payload: { payload: obj, loginType: "normal" },
  };
};

export const SignupSubmit = (obj) => {
  return { type: AUTH_SIGNUP_INIT, payload: obj };
};
export const SocialSignupSubmit = (obj) => {
  return { type: SOCIAL_AUTH_SIGNUP_INIT, payload: obj };
};

//Forgot password actions
export const ForgotPasswordVerify = (obj) => {
  return { type: AUTH_FORGOT_PASSWORD_INIT, payload: obj };
};

//logout action
export const LoggedOut = (obj) => {
  // localStorage.removeItem("lallantopUser");
  return { type: AUTH_SIGNOUT_INIT, payload: obj };
};
//reset password
export const resetPassword = (obj) => {
  return { type: AUTH_RESET_PASSWORD_INIT, payload: obj };
};

//save social media data  action
export const SaveSocialMediaData = (obj) => {
  // localStorage.removeItem("lallantopUser");
  return { type: SAVE_SOCIAL_MEDIA_DATA_SUCCESS, payload: obj };
};

//social sign in  action
export const SocialSignIn = (obj) => {
  // localStorage.removeItem("lallantopUser");
  return { type: AUTH_SOCIAL_SIGN_IN_INIT, payload: obj };
};

//Signup social actions
export const SignupCheckContactSocial = (obj) => {
  return {
    type: AUTH_CHECK_CONTACT_INIT,
    payload: { payload: obj, loginType: "social" },
  };
};

export const SignupVeriyContactSocial = (obj) => {
  return {
    type: AUTH_VERIFY_CONTACT_INIT,
    payload: { payload: obj, loginType: "social" },
  };
};

export const changePassword = (obj) => {
  return {
    type: CHANGE_PASSWORD_INIT,
    payload: obj,
  };
};

export const deleteAccount = () => {
  return {
    type: "DELETE_ACCOUNT_INIT",
  };
};

export const contactUs = (obj) => {
  return { type: "CONTACT_US_INIT", payload: obj };
};
export const getCurrentPlan = (obj) => {
  return { type: GET_CURRENT_PLAN_INIT, payload: obj }
}

export const validateSession = (obj) => {
  return { type: VALIDATE_SESSION_INIT, payload: obj }
}
export const updateQRType = (obj) => {
  return { type: UPDATE_QR_TYPE_INIT, payload: obj }
}
export const updateBasicDetails = (obj) => {
  return {type: UPDATE_BASIC_DETAILS_INIT, payload: obj};
}
