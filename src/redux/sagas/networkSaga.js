import { getAuthorizedApi, getNonAuthorizedApi } from "api/apiInstance";
import { baseUrl } from "../../api/constant";
import { call, put, takeLatest } from "redux-saga/effects";

import {
    GET_NETWORK_FOLLOWER_LIST_INIT,
    GET_NETWORK_FOLLOWER_LIST_SUCCESS,
    GET_NETWORK_FOLLOWER_LIST_FAILED,

    GET_NETWORK_FOLLOWING_LIST_INIT,
    GET_NETWORK_FOLLOWING_LIST_SUCCESS,
    GET_NETWORK_FOLLOWING_LIST_FAILED,

    GET_NETWORK_REQUESTS_LIST_INIT,
    GET_NETWORK_REQUESTS_LIST_SUCCESS,
    GET_NETWORK_REQUESTS_LIST_FAILED,

    GET_NETWORK_SUGGESTIONS_LIST_INIT,
    GET_NETWORK_SUGGESTIONS_LIST_SUCCESS,
    GET_NETWORK_SUGGESTIONS_LIST_FAILED,

    GET_NETWORK_HASHTAGS_LIST_INIT,
    GET_NETWORK_HASHTAGS_LIST_SUCCESS,
    GET_NETWORK_HASHTAGS_LIST_FAILED,

    CONNECT_REQUEST_INIT,
    CONNECT_REQUEST_SUCCESS,
    CONNECT_REQUEST_FAILED,

    REMOVE_REQUEST_INIT,
    REMOVE_REQUEST_SUCCESS,
    REMOVE_REQUEST_FAILED,

    ACCEPT_REQUEST_INIT,
    ACCEPT_REQUEST_SUCCESS,
    ACCEPT_REQUEST_FAILED,

    REJECT_REQUEST_INIT,
    REJECT_REQUEST_SUCCESS,
    REJECT_REQUEST_FAILED,
} from '../actionTypes/network.actionTypes';
import Swal from "sweetalert2";

function* handleGetNetworkFollower(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { pageNo,pageSize,type, searchText } = action.payload;
        const url = `pageNo=${pageNo}&pageSize=${pageSize}&type=${type}&search=${searchText}`
        const { data } = yield call(
            client.get, `${baseUrl}/get-follow-list?${url}`
        );
        if (data) {
            yield put({
                type: GET_NETWORK_FOLLOWER_LIST_SUCCESS,
                payload: {
                    entity: data?.data,
                },
            })
        } else {
            yield put({
                type: GET_NETWORK_FOLLOWER_LIST_FAILED,
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
function* handleGetNetworkFollowing(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { pageNo,pageSize,type,searchText } = action.payload;
        const url = `pageNo=${pageNo}&pageSize=${pageSize}&type=${type}&search=${searchText}`
        const { data } = yield call(
            client.get, `${baseUrl}/get-follow-list?${url}`
        );
        if (data) {
            
            yield put({
                type: GET_NETWORK_FOLLOWING_LIST_SUCCESS,
                payload: {
                    entity: data?.data,
                },
            })
        } else {
            yield put({
                type: GET_NETWORK_FOLLOWING_LIST_FAILED,
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
function* handleGetNetworkRequests(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { pageNo,pageSize,type,searchText } = action.payload;
        const url = `pageNo=${pageNo}&pageSize=${pageSize}&type=${type}&search=${searchText}`
        const { data } = yield call(
            client.get, `${baseUrl}/get-follow-list?${url}`
        );
        if (data) {
            
            yield put({
                type: GET_NETWORK_REQUESTS_LIST_SUCCESS,
                payload: {
                    entity: data?.data,
                },
            })
        } else {
            yield put({
                type: GET_NETWORK_REQUESTS_LIST_FAILED,
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
function* handleGetNetworkSuggestions(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { pageNo,pageSize, searchText } = action.payload;
        const url = `pageNo=${pageNo}&pageSize=${pageSize}&search=${searchText}`
        const { data } = yield call(
            client.get, `${baseUrl}/SuggestedUsers?${url}`
        );
        if (data) {
            yield put({
                type: GET_NETWORK_SUGGESTIONS_LIST_SUCCESS,
                payload: {
                    entity: data?.data,
                },
            })
        } else {
            yield put({
                type: GET_NETWORK_SUGGESTIONS_LIST_FAILED,
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
function* handleGetNetworkHashtags(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { pageNo,pageSize } = action.payload;
        const url = `pageNo=${pageNo}&pageSize=${pageSize}`
        const { data } = yield call(
            client.get, `${baseUrl}/hashtags?${url}`
        );
        if (data) {
            yield put({
                type: GET_NETWORK_HASHTAGS_LIST_SUCCESS,
                payload: {
                    entity: data?.data?.data,
                },
            })
        } else {
            yield put({
                type: GET_NETWORK_HASHTAGS_LIST_FAILED,
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
function* handleConnectRequest(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.post,
            `${baseUrl}/send-connection-request`,
            action.payload
        );
        if (data) {
            yield put({
                type: CONNECT_REQUEST_SUCCESS,
                payload: {
                    entity: data,
                },
            })
        } else {
            yield put({
                type: CONNECT_REQUEST_FAILED,
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
function* handleRemoveRequest(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.put,
            `${baseUrl}/remove-connected-friend`,
            action.payload
        );
        if (data) {
            yield put({
                type: REMOVE_REQUEST_SUCCESS,
                payload: {
                    entity: data,
                },
            })
        } else {
            yield put({
                type: REMOVE_REQUEST_FAILED,
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
function* handleAcceptRequest(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.put,
            `${baseUrl}/respond-connection-request`,
            action.payload
        );
        if (data) {
            yield put({
                type: ACCEPT_REQUEST_SUCCESS,
                payload: {
                    entity: data,
                },
            })
        } else {
            yield put({
                type: ACCEPT_REQUEST_FAILED,
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
function* handleRejectRequest(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);
    try {
        const { data } = yield call(
            client.put,
            `${baseUrl}/respond-connection-request`,
            action.payload
        );
        if (data) {
            yield put({
                type: REJECT_REQUEST_SUCCESS,
                payload: {
                    entity: data,
                },
            })
        } else {
            yield put({
                type: REJECT_REQUEST_FAILED,
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

function* networkSaga() {
    yield takeLatest(GET_NETWORK_FOLLOWER_LIST_INIT, handleGetNetworkFollower),
    yield takeLatest(GET_NETWORK_FOLLOWING_LIST_INIT, handleGetNetworkFollowing),
    yield takeLatest(GET_NETWORK_REQUESTS_LIST_INIT, handleGetNetworkRequests),
    yield takeLatest(GET_NETWORK_SUGGESTIONS_LIST_INIT, handleGetNetworkSuggestions),
    yield takeLatest(GET_NETWORK_HASHTAGS_LIST_INIT, handleGetNetworkHashtags),

    yield takeLatest(CONNECT_REQUEST_INIT, handleConnectRequest),
    yield takeLatest(REMOVE_REQUEST_INIT, handleRemoveRequest),
    yield takeLatest(ACCEPT_REQUEST_INIT, handleAcceptRequest),
    yield takeLatest(REJECT_REQUEST_INIT, handleRejectRequest)
}

export default networkSaga;