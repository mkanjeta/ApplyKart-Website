import {
  BASIC_DETAIL_JOBPOSTER_INIT,
  CANDIDATE_SHORTLIST_INIT,
  EDIT_JOBS_INIT,
  GET_APPLIED_JOB_INIT,
  GET_CANDIDATE_DETAIL_INIT,
  GET_CANDIDATE_LIST_INIT,
  GET_EDUCATION_LIST_INIT,
  GET_FAVORITE_INIT,
  GET_JOB_BROWSE_LIST_INIT,
  GET_JOB_DETAIL_INIT,
  GET_JOB_TYPE_LIST_INIT,
  GET_LIST_VISA_TYPE_INIT,
  GET_SKILLS_LIST_INIT,
  GET_SUBSCRIPTION_PLAN_INIT,
  POSTED_NEW_JOB_INIT,
  POST_APPLY_JOB_INIT,
  POST_FAVORITE_INIT,
  POST_POSTED_JOB_STATUS_INIT,
  REMOVE_JOBS_INIT,
  SCHEDULE_INTERVIEW_INIT,
  UPLOADED_DOCUMENT_INIT,
} from "redux/actionTypes/jobBrowseTypes";

// job browse on seeker dashboard
export const getJobBrowseList = (obj) => {
  return { type: GET_JOB_BROWSE_LIST_INIT, payload: obj };
};

// job type list
export const getJobTypeList = (obj) => {
  return { type: GET_JOB_TYPE_LIST_INIT, payload: obj };
};
// particular job detail
export const particularJobDetail = (obj) => {
  return { type: GET_JOB_DETAIL_INIT, payload: obj };
};
// particular job detail
export const postApplyJobs = (obj) => {
  return { type: POST_APPLY_JOB_INIT, payload: obj };
};
// active and inactive the posted jobs

export const postStatusPostedJobs = (obj) => {
  return { type: POST_POSTED_JOB_STATUS_INIT, payload: obj };
};

export const removeJobs = (obj) => {
  return { type: REMOVE_JOBS_INIT, payload: obj };
};
//
// get the list of applied job
export const getAppliedJobs = (obj) => {
  return { type: GET_APPLIED_JOB_INIT, payload: obj };
};
//get list of visa type
export const getVisaType = () => {
  return { type: GET_LIST_VISA_TYPE_INIT };
};

//get list of visa type
export const getEducationList = () => {
  return { type: GET_EDUCATION_LIST_INIT };
};

//get list of visa type
export const getSkillsList = () => {
  return { type: GET_SKILLS_LIST_INIT };
};
// get the candidate list
export const getCandidateList = (obj) => {
  return { type: GET_CANDIDATE_LIST_INIT, payload: obj };
};
export const setIsNewFalse = (obj) => {
  return { type: "SET_IS_NEW_FALSE", payload: obj };
};
// get the candidate detail
export const getCandidateDetail = (obj) => {
  return { type: GET_CANDIDATE_DETAIL_INIT, payload: obj };
};
//shorlist or reject candidate
export const candidateShortlist = (obj) => {
  return { type: CANDIDATE_SHORTLIST_INIT, payload: obj };
};
//schedule Interview
export const scheduleInterview = (obj) => {
  return { type: SCHEDULE_INTERVIEW_INIT, payload: obj };
};

//post a new job
export const postedNewJob = (obj) => {
  return { type: POSTED_NEW_JOB_INIT, payload: obj };
};

export const editAJob = (obj) => {
  return { type: "POSTED_EDIT_JOB_INIT", payload: obj };
};
//edit a job details
export const editJobDetails = (obj) => {
  return { type: EDIT_JOBS_INIT, payload: obj };
};
// upload documents
export const uploadDocuments = (obj) => {
  return { type: UPLOADED_DOCUMENT_INIT, payload: obj };
};

//  documents
export const jobPosterBasicDetails = (obj) => {
  return { type: BASIC_DETAIL_JOBPOSTER_INIT, payload: obj };
};

// add favorite job
export const postFavoriteJob = (jobObj, jobDetail) => {
  return { type: POST_FAVORITE_INIT, jobObj, jobDetail };
};
// get the favorite job
export const getFavoriteJob = (obj) => {
  return { type: GET_FAVORITE_INIT, payload: obj };
};

export const referAFriend = (obj) => {
  return { type: "REFER_A_FRIEND_INIT", payload: obj };
};

export const postJobFromProfileInit = (obj) => {
  return { type: "POST_A_JOB_PROFILE", payload: obj };
};

export const removeSavedJob = (id) => {
  return { type: "REMOVE_SAVED_JOB", payload: id };
};

export const getSubscriptionPlans = (obj) => {
  return {type: GET_SUBSCRIPTION_PLAN_INIT, payload: obj};
}
