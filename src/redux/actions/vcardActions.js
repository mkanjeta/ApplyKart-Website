import {
  SAVE_USER_SETTING_INIT,
  SAVE_VCARD_BASIC_DETAIL_INIT,
} from "redux/actionTypes/vcard.actionTypes";

//basic details actions
export const saveVcardBasicDetails = (obj) => {
  return { type: SAVE_VCARD_BASIC_DETAIL_INIT, payload: obj };
};

export const uploadResume = (obj) => {
  return { type: "UPLOAD_CV_INIT", payload: obj };
};

// user setting for completing vcard
//login actions
export const saveUserSetting = (obj) => {
  return { type: SAVE_USER_SETTING_INIT, payload: obj };
};

export const getVcardInfo = (id) => {
  return { type: "GET_VCARD_INFO_INIT", payload: id };
};

export const setRedirectFalse = () => {
  return { type: "SET_LOADING_FALSE" };
};

export const setRedFalse = () => {
  return { type: "SET_REDIRECT_FALSE" };
};
