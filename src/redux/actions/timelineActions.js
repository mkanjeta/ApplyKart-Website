import { CREATE_TIMELINE_POST_INIT, GET_SUGGESTED_USERS_LIST_INIT, GET_TIMELINE_POST_DETAIL_INIT, GET_TIMELINE_POST_INIT, GET_TIMELINE_USER_INIT, GET_TOP_JOBS_LIST_INIT, GET_TRENDING_HASH_TAG_INIT, POST_COMMENT_INIT, POST_DELETE_INIT, POST_LIKE_INIT, SEND_CONNECTION_REQUEST_INIT, UPDATE_TIMELINE_POST_INIT, REPOST_COMMUNITY_POST_INIT, GET_USERS_LIST_INIT, REPORT_CONTENT_INIT } from "redux/actionTypes/timeline.actionTypes"

export const getTrendingHashTags = (obj) => {
    return { type: GET_TRENDING_HASH_TAG_INIT, payload: obj }
}

export const getTopJobs = (obj) => {
    return { type: GET_TOP_JOBS_LIST_INIT, payload: obj }
}

export const getSuggestedUsers = (obj) => {
    return { type: GET_SUGGESTED_USERS_LIST_INIT, payload: obj }
}

export const getTimelineUser = (obj) => {
    return { type: GET_TIMELINE_USER_INIT, payload: obj }
}

export const getTimelinePosts = (obj) => {
    return { type: GET_TIMELINE_POST_INIT, payload: obj }
}

export const getTimelinePostDetail = (obj) => {
    return { type: GET_TIMELINE_POST_DETAIL_INIT, payload: obj}
}

export const createTimelinePost = (obj) => {
    return { type: CREATE_TIMELINE_POST_INIT, payload: obj }
}

export const updateTimelinePost = (obj) => {
    return { type: UPDATE_TIMELINE_POST_INIT, payload: obj}
}

export const postLike = (obj) => {
    return {type: POST_LIKE_INIT, payload: obj}
}

export const postComment = (obj) => {
    return {type: POST_COMMENT_INIT, payload: obj}
}

export const postDelete = (obj) => {
    return {type: POST_DELETE_INIT, payload: obj}
}

export const sendConnectionRequest = (obj) => {
    return {type: SEND_CONNECTION_REQUEST_INIT, payload: obj}
}
export const repostCommunityPost = (obj) => {
    return {type: REPOST_COMMUNITY_POST_INIT, payload: obj}
}
export const getAllUsersList = (obj) => {
    return {type: GET_USERS_LIST_INIT, payload: obj}
}

export const reportContent = (obj) => {
    return {type: REPORT_CONTENT_INIT, payload: obj};
}