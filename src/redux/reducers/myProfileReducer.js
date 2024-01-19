import {
    GET_MY_PROFILE_INIT,
    GET_MY_PROFILE_SUCCESS,
    GET_MY_PROFILE_FAILED,
    UPDATE_MY_PROFILE_INIT,
    UPDATE_MY_PROFILE_SUCCESS,
    UPDATE_MY_PROFILE_FAILED,
    UPDATE_MY_PROFILE_CLEAR,
    GET_ALL_LIKES_INIT,
    GET_ALL_LIKES_SUCCESS,
    GET_ALL_LIKES_FAILED,

    GET_MY_EXPERIENCE_INIT,
    GET_MY_EXPERIENCE_SUCCESS,
    GET_MY_EXPERIENCE_FAILED,

    GET_MY_PORTFOLIO_INIT,
    GET_MY_PORTFOLIO_SUCCESS,
    GET_MY_PORTFOLIO_FAILED,

    UPDATE_SKILLS_INIT,
    UPDATE_SKILLS_SUCCESS,
    UPDATE_SKILLS_FAILED,
    UPDATE_SKILLS_CLEAR,

    GET_SKILLS_INIT,
    GET_SKILLS_SUCCESS,
    GET_SKILLS_FAILED,

    UPDATE_PORTFOLIO_INIT,
    UPDATE_PORTFOLIO_SUCCESS,
    UPDATE_PORTFOLIO_FAILED,
    UPDATE_PORTFOLIO_CLEAR,

    ADD_PORTFOLIO_INIT,
    ADD_PORTFOLIO_SUCCESS,
    ADD_PORTFOLIO_FAILED,
    ADD_PORTFOLIO_CLEAR,

    UPDATE_EDUCATION_INIT,
    UPDATE_EDUCATION_SUCCESS,
    UPDATE_EDUCATION_FAILED,
    UPDATE_EDUCATION_CLEAR,

    UPDATE_EXPERIENCE_INIT,
    UPDATE_EXPERIENCE_SUCCESS,
    UPDATE_EXPERIENCE_FAILED,
    UPDATE_EXPERIENCE_CLEAR,

    GET_JOB_TYPE_INIT,
    GET_JOB_TYPE_SUCCESS,
    GET_JOB_TYPE_FAILED,
    GET_JOB_PREFERENCE_INIT,
    GET_JOB_PREFERENCE_SUCCESS,
    GET_JOB_PREFERENCE_FAILED,
    UPDATE_JOB_PREFERENCE_INIT,
    UPDATE_JOB_PREFERENCE_SUCCESS,
    UPDATE_JOB_PREFERENCE_FAILED,
    UPDATE_JOB_PREFERENCE_CLEAR,
    UPDATE_JOB_AVAILABILITY_INIT,
    UPDATE_JOB_AVAILABILITY_SUCCESS,
    UPDATE_JOB_AVAILABILITY_FAILED,
    UPDATE_JOB_AVAILABILITY_CLEAR,
    GET_ALL_UNIVERSITY_LIST_INIT,
    GET_ALL_UNIVERSITY_LIST_SUCCESS,
    GET_ALL_UNIVERSITY_LIST_FAILED,
    GET_VISA_LIST_INIT,
    GET_VISA_LIST_SUCCESS,
    GET_VISA_LIST_FAILED,
    GET_DEGREE_LIST_INIT,
    GET_DEGREE_LIST_SUCCESS,
    GET_DEGREE_LIST_FAILED,
} from "redux/actionTypes/myProfile.actionTypes";

const iniitialState = {
    myProfile: null,
    myExperience: null,
    myPortfolio: null,
    updateMyProfile: null,
    updateSkills: null,
    addPortfolio: null,
    updatePortfolio: null,
    updateEducation: null,
    updateExperience: null,
    allSkills: null,
    allLikes: null,
    allUniversities: null,
    allVisaList: null,
    allDegreeList: null,

    allJobTypes: null,
    allJobPreferences: null,
    updateJobPreferences: null,
    updateJobAvailability: null,
    loading: false
}

export default function myProfileReducer(state = iniitialState, action) {
    switch (action.type) {
        // my profile
        case GET_MY_PROFILE_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_MY_PROFILE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                myProfile: action.payload.entity
            };
        case GET_MY_PROFILE_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // my experience
        case GET_MY_EXPERIENCE_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_MY_EXPERIENCE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                myExperience: action.payload.entity
            };
        case GET_MY_EXPERIENCE_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // my portfolio
        case GET_MY_PORTFOLIO_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_MY_PORTFOLIO_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                myPortfolio: action.payload.entity
            };
        case GET_MY_PORTFOLIO_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // add my profile
        case ADD_PORTFOLIO_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case ADD_PORTFOLIO_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                addPortfolio: action.payload.entity
            };
        case ADD_PORTFOLIO_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case ADD_PORTFOLIO_CLEAR:
            return {
                ...state,
                addPortfolio: null,
            }
        // update my profile
        case UPDATE_MY_PROFILE_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case UPDATE_MY_PROFILE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                updateMyProfile: action.payload.entity
            };
        case UPDATE_MY_PROFILE_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case UPDATE_MY_PROFILE_CLEAR:
            return {
                ...state,
                updateMyProfile: null,
            }
        // all skills
        case GET_SKILLS_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_SKILLS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                allSkills: action.payload.entity
            };
        case GET_SKILLS_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // update portfolio
        case UPDATE_PORTFOLIO_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case UPDATE_PORTFOLIO_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                updatePortfolio: action.payload.entity
            };
        case UPDATE_PORTFOLIO_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case UPDATE_PORTFOLIO_CLEAR:
            return {
                ...state,
                updatePortfolio: null,
            }
        // update skills
        case UPDATE_SKILLS_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case UPDATE_SKILLS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                updateSkills: action.payload.entity
            };
        case UPDATE_SKILLS_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case UPDATE_SKILLS_CLEAR:
            return {
                ...state,
                updateSkills: null,
            }
        // get all likes
        case GET_ALL_LIKES_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_ALL_LIKES_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                allLikes: action.payload.entity
            };
        case GET_ALL_LIKES_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // update experience
        case UPDATE_EXPERIENCE_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case UPDATE_EXPERIENCE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                updateExperience: action.payload.entity
            };
        case UPDATE_EXPERIENCE_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case UPDATE_EXPERIENCE_CLEAR:
            return {
                ...state,
                updateExperience: null,
            }
        // update education
        case UPDATE_EDUCATION_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case UPDATE_EDUCATION_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                updateEducation: action.payload.entity
            };
        case UPDATE_EDUCATION_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case UPDATE_EDUCATION_CLEAR:
            return {
                ...state,
                updateEducation: null,
            }
        // get job type
        case GET_JOB_TYPE_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_JOB_TYPE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                allJobTypes: action.payload.entity
            };
        case GET_JOB_TYPE_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };

        // get job preference
        case GET_JOB_PREFERENCE_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_JOB_PREFERENCE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                allJobPreferences: action.payload.entity
            };
        case GET_JOB_PREFERENCE_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // update job preferences
        case UPDATE_JOB_PREFERENCE_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case UPDATE_JOB_PREFERENCE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                updateJobPreferences: action.payload.entity
            };
        case UPDATE_JOB_PREFERENCE_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case UPDATE_JOB_PREFERENCE_CLEAR:
            return {
                ...state,
                updateJobPreferences: null,
            }
        // update job availability
        case UPDATE_JOB_AVAILABILITY_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case UPDATE_JOB_AVAILABILITY_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                updateJobAvailability: action.payload.entity
            };
        case UPDATE_JOB_AVAILABILITY_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case UPDATE_JOB_AVAILABILITY_CLEAR:
            return {
                ...state,
                updateJobAvailability: null,
            }
        // allUniversities
        case GET_ALL_UNIVERSITY_LIST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_ALL_UNIVERSITY_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                allUniversities: action.payload.entity
            };
        case GET_ALL_UNIVERSITY_LIST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // allVisaList
        case GET_VISA_LIST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_VISA_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                allVisaList: action.payload.entity
            };
        case GET_VISA_LIST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // allDegreeList
        case GET_DEGREE_LIST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_DEGREE_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                allDegreeList: action.payload.entity
            };
        case GET_DEGREE_LIST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };


        default:
            return state;
    }
}