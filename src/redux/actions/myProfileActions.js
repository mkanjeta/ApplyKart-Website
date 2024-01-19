import { 
    GET_MY_PROFILE_INIT,
    UPDATE_MY_PROFILE_INIT,
    GET_ALL_LIKES_INIT,
    GET_MY_EXPERIENCE_INIT,
    GET_MY_PORTFOLIO_INIT,
    UPDATE_SKILLS_INIT,
    UPDATE_PORTFOLIO_INIT,
    ADD_PORTFOLIO_INIT,
    GET_SKILLS_INIT,
    UPDATE_EXPERIENCE_INIT,
    UPDATE_EDUCATION_INIT,
    GET_JOB_TYPE_INIT,
    GET_JOB_PREFERENCE_INIT,
    UPDATE_JOB_PREFERENCE_INIT,
    UPDATE_JOB_AVAILABILITY_INIT,
    GET_VISA_LIST_INIT,
    GET_DEGREE_LIST_INIT,
    GET_ALL_UNIVERSITY_LIST_INIT,
 } from "redux/actionTypes/myProfile.actionTypes";

export const getMyProfile = (obj) => {
    return { type: GET_MY_PROFILE_INIT, payload: obj }
}
export const getMyExperience = (obj) => {
    return { type: GET_MY_EXPERIENCE_INIT, payload: obj }
}
export const getMyPortfolio = (obj) => {
    return { type: GET_MY_PORTFOLIO_INIT, payload: obj }
}
export const updateMyProfile = (obj) => {
    return { type: UPDATE_MY_PROFILE_INIT, payload: obj }
}
export const getAllLikes = (obj) => {
    return { type: GET_ALL_LIKES_INIT, payload: obj }
}
export const putUpdateSkills = (obj) => {
    return { type: UPDATE_SKILLS_INIT, payload: obj }
}
export const postPortfolioImage = (obj) => {
    return { type: ADD_PORTFOLIO_INIT, payload: obj }
}
export const putPortfolioImage = (obj) => {
    return { type: UPDATE_PORTFOLIO_INIT, payload: obj }
}
export const getSkills = (obj) => {
    return { type: GET_SKILLS_INIT, payload: obj }
}
export const putUpdateExperience = (obj) => {
    return { type: UPDATE_EXPERIENCE_INIT, payload: obj }
}
export const putUpdateEducation = (obj) => {
    return { type: UPDATE_EDUCATION_INIT, payload: obj }
}

export const getJobType = (obj) => {
    return { type: GET_JOB_TYPE_INIT, payload: obj }
}
export const getJobPreference = (obj) => {
    return { type: GET_JOB_PREFERENCE_INIT, payload: obj }
}
export const putJobPreference = (obj) => {
    return { type: UPDATE_JOB_PREFERENCE_INIT, payload: obj }
}
export const putJobAvailability = (obj) => {
    return { type: UPDATE_JOB_AVAILABILITY_INIT, payload: obj }
}
export const getAllUniversityList = (obj) => {
    
    return { type: GET_ALL_UNIVERSITY_LIST_INIT, payload: obj }
}
export const getVisaList = (obj) => {
    return { type: GET_VISA_LIST_INIT, payload: obj }
}
export const getDegreeList = (obj) => {
    return { type: GET_DEGREE_LIST_INIT, payload: obj }
}