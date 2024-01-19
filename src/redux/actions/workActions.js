import {
  CLOSE_CHAT_INIT,
  CHANNEL_FOR_USER_INIT,
  DELETE_PORTFOLIO_DATA_INIT,
  DELETE_VIDEO_DATA_INIT,
  GET_CALENDER_DATA_INIT,
  GET_CHAT_LIST_INIT,
  GET_JOB_SEEKER_DETAIL_INIT,
  GET_JOB_TYPE_LISTS_INIT,
  GET_JOB_TYPE_LIST_INIT,
  GET_LANGUAGE_LIST_INIT,
  GET_MESSAGE_LIST_INIT,
  GET_PORTFOLIO_DATA_INIT,
  GET_REQUIREMENT_LIST_INIT,
  GET_UNIVERSITY_LIST_INIT,
  GET_UPLOAD_DATA_INIT,
  SAVE_FILE_DATA_SUCCESS,
  SAVE_PORTFOLIA_DATA_INIT,
  SAVE_PORTFOLIA_DATA_SUCCESS,
  SAVE_VCARD_EDUCATION_DETAIL_INIT,
  SAVE_VCARD_SET_AVAILABILITY_INIT,
  SAVE_VCARD_SKILL_DETAIL_INIT,
  SAVE_VCARD_WORK_DETAIL_INIT,
  UPDATE_PORTFOLIA_DATA_INIT,
} from "redux/actionTypes/work.actionTypes";

//work details
export const saveVcardWorkDetails = (obj) => {
  return { type: SAVE_VCARD_WORK_DETAIL_INIT, payload: obj };
};
//job seeker details
export const getJobSeekerDetail = (obj) => {
  return { type: GET_JOB_SEEKER_DETAIL_INIT, payload: obj };
};
// get university list
export const getUniversitylist = (obj) => {
  return { type: GET_UNIVERSITY_LIST_INIT, payload: obj };
};
// get language list
export const getLanguagelist = (obj) => {
  return { type: GET_LANGUAGE_LIST_INIT, payload: obj };
};

// get language list
export const getRequirementList = (obj) => {
  return { type: GET_REQUIREMENT_LIST_INIT, payload: obj };
};
// save education detail
export const saveVcardEducationDetails = (obj) => {
  return { type: SAVE_VCARD_EDUCATION_DETAIL_INIT, payload: obj };
};

export const saveSkillsDetails = (obj) => {
  return { type: SAVE_VCARD_SKILL_DETAIL_INIT, payload: obj };
};

// save education detail
export const saveSetAvailabilityDetails = (obj) => {
  return { type: SAVE_VCARD_SET_AVAILABILITY_INIT, payload: obj };
};

// get jobType
export const getJobTypeLists = (obj) => {
  return { type: GET_JOB_TYPE_LISTS_INIT, payload: obj };
};
//uplaod file

export const SaveFileDataSucess = (obj) => {
  return { type: SAVE_FILE_DATA_SUCCESS, payload: obj };
};

//upload portfolio data
export const postPortfoliaData = (obj) => {
  return { type: SAVE_PORTFOLIA_DATA_INIT, payload: obj };
};

// get the portfolio data
export const getPortfolioData = (obj) => {
  return { type: GET_PORTFOLIO_DATA_INIT, payload: obj };
};

//delete the portfolio
export const deletePortfolio = (obj) => {
  return { type: DELETE_PORTFOLIO_DATA_INIT, payload: obj };
};

//update the portfolio
export const updatePortfolioData = (obj) => {
  return { type: UPDATE_PORTFOLIA_DATA_INIT, payload: obj };
};

// get the uploaded document data

export const getUploadedDocument = (obj) => {
  return { type: GET_UPLOAD_DATA_INIT, payload: obj };
};

// calender data
export const getCalenderData = (obj) => {
  return { type: GET_CALENDER_DATA_INIT, payload: obj };
};
// delete video
export const deleteVideoData = (obj) => {
  return { type: DELETE_VIDEO_DATA_INIT, payload: obj };
};

export const createChannelForUser = (obj) => {
  return { type: CHANNEL_FOR_USER_INIT, payload: obj };
};
// get chat data
export const getChatList = (obj) => {
  return { type: GET_CHAT_LIST_INIT, payload: obj };
};

// get message list Data
export const getMessageList = (obj) => {
  return { type: GET_MESSAGE_LIST_INIT, payload: obj };
};

//close a chat

export const closeAChat = (obj) => {
  return { type: CLOSE_CHAT_INIT, payload: obj };
};

//delete a chat

export const deleteAChat = (obj) => {
  return { type: "DELETE_CHAT_INITIATE", payload: obj };
};

export const sendEmail = (obj) => {
  return { type: "SEND_EMAIL_INIT", payload: obj };
};
