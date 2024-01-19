import { GET_JOB_CATEGORY_LIST_INIT, GET_JOB_SUB_CATEGORY_LIST_INIT, SAVE_JOB_DETAIL_INIT, SAVE_JOB_PREFERENCES_INIT } from "redux/actionTypes/categoryTypes";

//category action
export const getJobCategory = (obj) => {
    return { type: GET_JOB_CATEGORY_LIST_INIT, payload: obj };

  };
// subcategory action
export const getJobsubCategory = (obj) => {
    return { type: GET_JOB_SUB_CATEGORY_LIST_INIT, payload: obj };

  };
// updated the prefrences of job
export const saveJobDetails = (obj) => {
    return { type: SAVE_JOB_DETAIL_INIT, payload: obj };
  };

// updated the prefrences
export const saveJobPreferences = (obj) => {
  return { type: SAVE_JOB_PREFERENCES_INIT, payload: obj };
};

export const resetRedirect = () => {
  return { type: 'RESET_REDIRECT_CATEGORY' };
};

