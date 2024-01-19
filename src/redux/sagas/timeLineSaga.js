import { getAuthorizedApi, getNonAuthorizedApi } from "api/apiInstance";
import { baseUrl } from "../../api/constant";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_TRENDING_HASH_TAG_INIT,
    GET_TRENDING_HASH_TAG_SUCCESS,
    GET_TRENDING_HASH_TAG_FAILED,
    GET_TOP_JOBS_LIST_SUCCESS,
    GET_TOP_JOBS_LIST_FAILED,
    GET_TOP_JOBS_LIST_INIT,
    GET_SUGGESTED_USERS_LIST_SUCCESS,
    GET_SUGGESTED_USERS_LIST_FAILED,
    GET_SUGGESTED_USERS_LIST_INIT,
    GET_TIMELINE_USER_SUCCESS,
    GET_TIMELINE_USER_INIT,
    GET_TIMELINE_USER_FAILED,
    GET_TIMELINE_POST_INIT,
    GET_TIMELINE_POST_SUCCESS,
    GET_TIMELINE_POST_FAILED,
    CREATE_TIMELINE_POST_INIT,
    CREATE_TIMELINE_POST_SUCCESS,
    CREATE_TIMELINE_POST_FAILED,
    POST_LIKE_INIT,
    POST_LIKE_SUCCESS,
    POST_LIKE_FAILED,
    POST_COMMENT_INIT,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAILED,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAILED,
    POST_DELETE_INIT,
    UPDATE_TIMELINE_POST_SUCCESS,
    UPDATE_TIMELINE_POST_FAILED,
    UPDATE_TIMELINE_POST_INIT,
    GET_TIMELINE_POST_DETAIL_SUCCESS,
    GET_TIMELINE_POST_DETAIL_FAILED,
    GET_TIMELINE_POST_DETAIL_INIT,
    SEND_CONNECTION_REQUEST_SUCCESS,
    SEND_CONNECTION_REQUEST_FAILED,
    SEND_CONNECTION_REQUEST_INIT,

    REPOST_COMMUNITY_POST_INIT,
    REPOST_COMMUNITY_POST_SUCCESS,
    REPOST_COMMUNITY_POST_FAILED,

    GET_USERS_LIST_INIT,
    GET_USERS_LIST_SUCCESS,
    GET_USERS_LIST_FAILED,
    REPORT_CONTENT_SUCCESS,
    REPORT_CONTENT_FAILED,
    REPORT_CONTENT_INIT,
} from '../actionTypes/timeline.actionTypes';
import Swal from "sweetalert2";

function* handleGetTrendingHashTags(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { userId, encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.get, `${baseUrl}/hashtags?pageNo=1&pageSize=10`
        );
        if (data) {
            yield put({
                type: GET_TRENDING_HASH_TAG_SUCCESS,
                payload: {
                    entity: data?.data?.data,
                },
            })
        } else {
            yield put({
                type: GET_TRENDING_HASH_TAG_FAILED,
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

function* handleGetTopJobs(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { userId, encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.get, `${baseUrl}/get-top-jobs?pageNo=1&pageSize=5`
        );
        if (data) {
            yield put({
                type: GET_TOP_JOBS_LIST_SUCCESS,
                payload: {
                    entity: data?.data?.jobList
                }
            })
        } else {
            yield put({
                type: GET_TOP_JOBS_LIST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured",
                },
            })
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handleGetProfileSuggestions(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { userId, encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.get, `${baseUrl}/suggestedUsers?pageNo=1&pageSize=5`
        );

        if (data) {
            yield put({
                type: GET_SUGGESTED_USERS_LIST_SUCCESS,
                payload: {
                    entity: data?.data?.data
                }
            })
        } else {
            yield put({
                type: GET_SUGGESTED_USERS_LIST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handleGetTimelineUser(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { userId } = action.payload;
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.get, `${baseUrl}/user-profile-timeline?userId=${userId}`
        );

        if (data) {
            yield put({
                type: GET_TIMELINE_USER_SUCCESS,
                payload: {
                    entity: data?.data
                }
            })
        } else {
            yield put({
                type: GET_TIMELINE_USER_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }

    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handleGetTimelinePost(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { userId, pageSize, pageNo, hashTag } = action.payload;
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.get, `${baseUrl}/community-post-list?pageNo=${pageNo}&pageSize=${pageSize}&userIdForPostList=${userId}&hashTag=${hashTag}`
        );

        if (data) {
            yield put({
                type: GET_TIMELINE_POST_SUCCESS,
                payload: {
                    data: data?.data?.data || [],
                    pageNo: pageNo,
                    totalCount: data?.data?.totalCount
                }
            })
        } else {
            yield put({
                type: GET_TIMELINE_POST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }

    } catch (error) {
        console.log(error, 'error');
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handleGetTimelinePostDetail(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { postId } = action.payload;
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.get, `${baseUrl}/get-community-post-details?communityPostId=${postId}`
        );

        if (data) {
            yield put({
                type: GET_TIMELINE_POST_DETAIL_SUCCESS,
                payload: {
                    entity: data?.data
                }
            })
        } else {
            yield put({
                type: GET_TIMELINE_POST_DETAIL_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }

    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handleCreatePost(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.post,
            `${baseUrl}/add-community-post`,
            action.payload
        );

        if (data) {
            yield put({
                type: CREATE_TIMELINE_POST_SUCCESS,
                payload: {
                    entity: data?.data
                }
            })
        } else {
            yield put({
                type: CREATE_TIMELINE_POST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }

    } catch (error) {
        console.log(error);
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handleUpdatePost(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.put,
            `${baseUrl}/edit-community-post`,
            action.payload
        );

        if (data) {
            yield put({
                type: UPDATE_TIMELINE_POST_SUCCESS,
                payload: {
                    entity: data?.data
                }
            })
        } else {
            yield put({
                type: UPDATE_TIMELINE_POST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }

    } catch (error) {
        console.log(error);
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handlePostLike(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.post,
            `${baseUrl}/like-post?communityPostId=${action.payload.communityPostId}&value=${action.payload.value}`            
        );

        if (data) {
            yield put({
                type: POST_LIKE_SUCCESS,
                payload: {
                    entity: data?.data
                }
            })
        } else {
            yield put({
                type: POST_LIKE_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handlePostComment(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.post,
            `${baseUrl}/add-comment`,
            action.payload        
        );

        if (data) {
            yield put({
                type: POST_COMMENT_SUCCESS,
                payload: {
                    entity: data?.data
                }
            })
        } else {
            yield put({
                type: POST_COMMENT_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handlePostDelete(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const { data } = yield call(
            client.put,
            `${baseUrl}/delete-community-post?communityPostId=${action.payload.communityPostId}`                  
        );

        if (data) {
            yield put({
                type: POST_DELETE_SUCCESS,
                payload: {
                    entity: data?.data
                }
            })
        } else {
            yield put({
                type: POST_DELETE_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* handleSendConnectionRequest(action) {
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
                type: SEND_CONNECTION_REQUEST_SUCCESS,
                payload: {
                    entity: data?.data
                }
            })
        } else {
            yield put({
                type: SEND_CONNECTION_REQUEST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }
    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleRepostPost(action) {
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const response = yield call(
            client.post,
            `${baseUrl}/repost`,
            action.payload
        );
        if (response?.data?.success) {
            yield put({
                type: REPOST_COMMUNITY_POST_SUCCESS,
                payload: {
                    entity: response?.data
                }
            })
        } else {
            yield put({
                type: REPOST_COMMUNITY_POST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }

    } catch (error) {
        console.log(error);
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}
function* handleAllUsersList(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { Search,pageNo,pageSize } = action.payload;
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const response = yield call(
            client.get, `${baseUrl}/userListTag?pageNo=${pageNo}&pageSize=${pageSize}&Search=${Search}`
        );

        if (response.data.success) {
            yield put({
                type: GET_USERS_LIST_SUCCESS,
                payload: {
                    entity: response?.data?.data
                }
            })
        } else {
            yield put({
                type: GET_USERS_LIST_FAILED,
                payload: {
                    error: true,
                    message: "Error Occured"
                }
            })
        }

    } catch (error) {
        const { message } = error.response.data;
        Swal.fire({
            icon: "error",
            title: message || "Something went wrong",
        });
    }
}

function* reportAContent(action){
    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
        return;
    }
    const { encryptedToken } = JSON.parse(applyKart);
    const client = yield getAuthorizedApi(encryptedToken);

    try {
        const {data} = yield call(
            client.post, `${baseUrl}/report`,
            action?.payload
        );

        if (data) {
            Swal.fire({icon: 'success', title: 'Content reported'});
            yield put({
                type: REPORT_CONTENT_SUCCESS,
            })
        } else {
            Swal.fire({icon: 'error', title: 'Something went wrong'});
            yield put({
                type: REPORT_CONTENT_FAILED,
            })
        }

    } catch (error) {
     console.log(error);
        Swal.fire({
            icon: "error",
            title: "Something went wrong",
        });
        yield put({
            type: REPORT_CONTENT_FAILED,
        })
    }
}

function* timelineSaga() {
    yield takeLatest(GET_TRENDING_HASH_TAG_INIT, handleGetTrendingHashTags),
    yield takeLatest(GET_TOP_JOBS_LIST_INIT, handleGetTopJobs),
    yield takeLatest(GET_SUGGESTED_USERS_LIST_INIT, handleGetProfileSuggestions),
    yield takeLatest(GET_TIMELINE_USER_INIT, handleGetTimelineUser),
    yield takeLatest(GET_TIMELINE_POST_INIT, handleGetTimelinePost),
    yield takeLatest(GET_TIMELINE_POST_DETAIL_INIT, handleGetTimelinePostDetail),
    yield takeLatest(CREATE_TIMELINE_POST_INIT, handleCreatePost),
    yield takeLatest(UPDATE_TIMELINE_POST_INIT, handleUpdatePost)
    yield takeLatest(POST_LIKE_INIT, handlePostLike),
    yield takeLatest(POST_COMMENT_INIT, handlePostComment),
    yield takeLatest(POST_DELETE_INIT, handlePostDelete),
    yield takeLatest(SEND_CONNECTION_REQUEST_INIT, handleSendConnectionRequest),
    yield takeLatest(REPOST_COMMUNITY_POST_INIT, handleRepostPost),
    yield takeLatest(GET_USERS_LIST_INIT, handleAllUsersList),
    yield takeLatest(REPORT_CONTENT_INIT, reportAContent);
}

export default timelineSaga;