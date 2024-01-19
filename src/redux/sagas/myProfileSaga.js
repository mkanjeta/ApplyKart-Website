import { getAuthorizedApi, getNonAuthorizedApi } from "api/apiInstance";
import { baseUrl } from "../../api/constant";
import { call, put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    GET_MY_PROFILE_INIT,
    GET_MY_PROFILE_SUCCESS,
    GET_MY_PROFILE_FAILED,
    UPDATE_MY_PROFILE_INIT,
    UPDATE_MY_PROFILE_SUCCESS,
    UPDATE_MY_PROFILE_FAILED,
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

    GET_SKILLS_INIT,
    GET_SKILLS_SUCCESS,
    GET_SKILLS_FAILED,

    UPDATE_PORTFOLIO_INIT,
    UPDATE_PORTFOLIO_SUCCESS,
    UPDATE_PORTFOLIO_FAILED,
    ADD_PORTFOLIO_INIT,
    ADD_PORTFOLIO_SUCCESS,
    ADD_PORTFOLIO_FAILED,
    UPDATE_EDUCATION_INIT,
    UPDATE_EDUCATION_SUCCESS,
    UPDATE_EDUCATION_FAILED,

    UPDATE_EXPERIENCE_INIT,
    UPDATE_EXPERIENCE_SUCCESS,
    UPDATE_EXPERIENCE_FAILED,

    GET_JOB_TYPE_INIT,
    GET_JOB_TYPE_SUCCESS,
    GET_JOB_TYPE_FAILED,
    GET_JOB_PREFERENCE_INIT,
    GET_JOB_PREFERENCE_SUCCESS,
    GET_JOB_PREFERENCE_FAILED,
    UPDATE_JOB_PREFERENCE_INIT,
    UPDATE_JOB_PREFERENCE_SUCCESS,
    UPDATE_JOB_PREFERENCE_FAILED,
    UPDATE_JOB_AVAILABILITY_INIT,
    UPDATE_JOB_AVAILABILITY_SUCCESS,
    UPDATE_JOB_AVAILABILITY_FAILED,

    GET_ALL_UNIVERSITY_LIST_INIT,
    GET_ALL_UNIVERSITY_LIST_SUCCESS,
    GET_ALL_UNIVERSITY_LIST_FAILED,
    GET_VISA_LIST_INIT,
    GET_VISA_LIST_SUCCESS,
    GET_VISA_LIST_FAILED,
    GET_DEGREE_LIST_INIT,
    GET_DEGREE_LIST_SUCCESS,
    GET_DEGREE_LIST_FAILED,
} from "../actionTypes/myProfile.actionTypes";

var upload = async (dataUrl, file) => {
    const response1 = await fetch(dataUrl, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": "image/jpg",
            "x-ms-blob-type": "BlockBlob",
            "x-ms-blob-content": "image/jpg",
        },
    })
        .then((res) => console.log("response", res))
        .catch((e) => console.log("@@@error", e));
    return response1;
};

function* handleGetMyProfile(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { UserId } = action.payload;
        const url = `user_id=${UserId}`
        const { data } = yield call(
            client.get, `${baseUrl}/jobseeker?${url}`
        );
        if (data) {
            yield put({
                type: GET_MY_PROFILE_SUCCESS,
                payload: {
                    entity: data,
                },
            })
        } else {
            yield put({
                type: GET_MY_PROFILE_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleUpdateMyProfile(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken, userId } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const obj = {
            profile_pic: action.payload.profile_pic,
            user_id: action.payload?.user_id,
            first_name: action.payload?.first_name,
            last_name: action.payload?.last_name,
            contact_no: action.payload?.contact_no,
            description: action.payload?.description,
        }
        const { data } = yield call(
            client.put, `${baseUrl}/JobPosterBasic`, obj
        );
        if (data) {
            yield put({
                type: UPDATE_MY_PROFILE_SUCCESS,
                payload: {
                    entity: data,
                },
            });
            let newobj = {
                encryptedToken:encryptedToken,
                profilePic:data.data.profile_pic?.split('?')[0],
                userId:userId,
                userName:data.data.first_name + data.data.last_name,
            }
            localStorage.setItem('applyKart',JSON.stringify(newobj))
            if (action.payload.profile_pic !== null) {
                upload(data.data.profile_pic, action.payload.profile);
            }

        } else {
            yield put({
                type: UPDATE_MY_PROFILE_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleGetAllLikes(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { pageNo, pageSize } = action.payload;
        const url = `pageNo=${pageNo}&pageSize=${pageSize}&communityPostId=0`
        const { data } = yield call(
            client.get, `${baseUrl}/all-likes?${url}`
        );
        if (data) {
            yield put({
                type: GET_ALL_LIKES_SUCCESS,
                payload: {
                    entity: data,
                },
            })
        } else {
            yield put({
                type: GET_ALL_LIKES_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleGetMyExperience(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { UserId } = action.payload;
        const url = `UserId=${UserId}`
        // const url = `UserId=1`
        const { data } = yield call(
            client.get, `${baseUrl}/user-profile-timeline?${url}`,
        );
        if (data) {
            yield put({
                type: GET_MY_EXPERIENCE_SUCCESS,
                payload: {
                    entity: data?.data,
                },
            })
        } else {
            yield put({
                type: GET_MY_EXPERIENCE_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleGetMyPortfolio(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { UserId } = action.payload;
        const url = `candidateId=${UserId}`
        // const url = `candidateId=1`
        const { data } = yield call(
            client.get, `${baseUrl}/JobSeeker/portfolioWeb?${url}`,
        );
        if (data) {
            yield put({
                type: GET_MY_PORTFOLIO_SUCCESS,
                payload: {
                    entity: data?.data,
                },
            })
        } else {
            yield put({
                type: GET_MY_PORTFOLIO_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleUpdateSkills(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.post, `${baseUrl}/JobSeeker/UserSkills`, action.payload
        );
        if (data) {
            yield put({
                type: UPDATE_SKILLS_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: UPDATE_SKILLS_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleGetSkills(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.get, `${baseUrl}/JobSeeker/skills`,
        );
        if (data) {
            yield put({
                type: GET_SKILLS_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: GET_SKILLS_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleUpdatePortfolio(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        let obj = {
            "portfolio_id": action.payload?.portfolio_id,
            "title": action.payload?.title,
            "description": "",
            "image": action.payload?.image,
        }
        const { data } = yield call(
            client.put, `${baseUrl}/JobSeeker/portfolio`, obj
        );
        if (data) {
            yield put({
                type: UPDATE_PORTFOLIO_SUCCESS,
                payload: {
                    entity: data,
                },
            });

            if (action.payload.image !== undefined) {
                upload(data.image, action.payload.file);
            }

        } else {
            yield put({
                type: UPDATE_PORTFOLIO_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleAddPortfolio(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        let obj = {
            "user_id": action.payload.user_id,
            "title": action.payload.title,
            "description": action.payload.description,
            "image": action.payload.image,
        }
        const { data } = yield call(
            client.post, `${baseUrl}/JobSeeker/portfolio`, obj
        );
        if (data) {
            yield put({
                type: ADD_PORTFOLIO_SUCCESS,
                payload: {
                    entity: data,
                },
            });
            if (action.payload.file !== null) {
                upload(data.data.image, action.payload.file);
            }

        } else {
            yield put({
                type: ADD_PORTFOLIO_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleUpdateExperience(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.post, `${baseUrl}/JobSeeker/ProfessionalDetails`, action.payload
        );
        if (data) {
            yield put({
                type: UPDATE_EXPERIENCE_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: UPDATE_EXPERIENCE_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleGetJobType(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.get, `${baseUrl}/JobTypes`,
        );
        if (data) {
            yield put({
                type: GET_JOB_TYPE_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: GET_JOB_TYPE_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleGetJobPreference(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.get, `${baseUrl}/Categories`,
        );
        if (data) {
            yield put({
                type: GET_JOB_PREFERENCE_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: GET_JOB_PREFERENCE_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleUpdateJobPreference(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.put, `${baseUrl}/Preference`, action.payload
        );
        if (data) {
            yield put({
                type: UPDATE_JOB_PREFERENCE_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: UPDATE_JOB_PREFERENCE_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleUpdateJobAvailability(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.put, `${baseUrl}/Availability`, action.payload
        );
        if (data) {
            yield put({
                type: UPDATE_JOB_AVAILABILITY_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: UPDATE_JOB_AVAILABILITY_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handleUpdateEducation(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.post, `${baseUrl}/JobSeeker/EducatonalDetails`, action.payload
        );
        if (data) {
            yield put({
                type: UPDATE_EDUCATION_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: UPDATE_EDUCATION_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleGetUniversityList(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.get, `${baseUrl}/University?pageNo=1&PageSize=20000&search=`,
        );
        if (data) {
            yield put({
                type: GET_ALL_UNIVERSITY_LIST_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: GET_ALL_UNIVERSITY_LIST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleGetVisaTypeList(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.get, `${baseUrl}/VisaType`,
        );
        if (data) {
            yield put({
                type: GET_VISA_LIST_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: GET_VISA_LIST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleGetDegreeList(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.get, `${baseUrl}/Education`,
        );
        if (data) {
            yield put({
                type: GET_DEGREE_LIST_SUCCESS,
                payload: {
                    entity: data,
                },
            });

        } else {
            yield put({
                type: GET_DEGREE_LIST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            });
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* myProfileSaga() {
    yield takeLatest(GET_MY_PROFILE_INIT, handleGetMyProfile),
    yield takeLatest(UPDATE_MY_PROFILE_INIT, handleUpdateMyProfile),
    yield takeLatest(GET_ALL_LIKES_INIT, handleGetAllLikes),
    yield takeLatest(GET_MY_EXPERIENCE_INIT, handleGetMyExperience),
    yield takeLatest(GET_MY_PORTFOLIO_INIT, handleGetMyPortfolio),
    yield takeLatest(UPDATE_SKILLS_INIT, handleUpdateSkills),
    yield takeLatest(GET_SKILLS_INIT, handleGetSkills),
    yield takeLatest(UPDATE_PORTFOLIO_INIT, handleUpdatePortfolio),
    yield takeLatest(ADD_PORTFOLIO_INIT, handleAddPortfolio),
    yield takeLatest(UPDATE_EXPERIENCE_INIT, handleUpdateExperience),
    yield takeLatest(UPDATE_EDUCATION_INIT, handleUpdateEducation),
    yield takeLatest(GET_JOB_TYPE_INIT, handleGetJobType),
    yield takeLatest(GET_JOB_PREFERENCE_INIT, handleGetJobPreference),
    yield takeLatest(UPDATE_JOB_PREFERENCE_INIT, handleUpdateJobPreference),
    yield takeLatest(UPDATE_JOB_AVAILABILITY_INIT, handleUpdateJobAvailability),
    yield takeLatest(GET_ALL_UNIVERSITY_LIST_INIT, handleGetUniversityList),
    yield takeLatest(GET_VISA_LIST_INIT, handleGetVisaTypeList),
    yield takeLatest(GET_DEGREE_LIST_INIT, handleGetDegreeList)
    
}

export default myProfileSaga;