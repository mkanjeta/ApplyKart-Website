import { 
    GET_NETWORK_FOLLOWER_LIST_INIT,
    GET_NETWORK_FOLLOWING_LIST_INIT,
    GET_NETWORK_REQUESTS_LIST_INIT,
    GET_NETWORK_SUGGESTIONS_LIST_INIT,
    GET_NETWORK_HASHTAGS_LIST_INIT,
    CONNECT_REQUEST_INIT,
    REMOVE_REQUEST_INIT,
    ACCEPT_REQUEST_INIT,
    REJECT_REQUEST_INIT,
 } from "redux/actionTypes/network.actionTypes";


export const getNetworkFollowerList = (obj) => {
    return { type: GET_NETWORK_FOLLOWER_LIST_INIT, payload: obj }
}
export const getNetworkFollowingList = (obj) => {
    return { type: GET_NETWORK_FOLLOWING_LIST_INIT, payload: obj }
}
export const getNetworkRequestsList = (obj) => {
    return { type: GET_NETWORK_REQUESTS_LIST_INIT, payload: obj }
}
export const getNetworkSuggestionsList = (obj) => {
    return { type: GET_NETWORK_SUGGESTIONS_LIST_INIT, payload: obj }
}
export const getNetworkHashtagsList = (obj) => {
    return { type: GET_NETWORK_HASHTAGS_LIST_INIT, payload: obj }
}
export const connectRequestAction = (obj) => {
    return { type: CONNECT_REQUEST_INIT, payload: obj }
}
export const removeRequestAction = (obj) => {
    return { type: REMOVE_REQUEST_INIT, payload: obj }
}
export const acceptRequestAction = (obj) => {
    return { type: ACCEPT_REQUEST_INIT, payload: obj }
}
export const rejectRequestAction = (obj) => {
    return { type: REJECT_REQUEST_INIT, payload: obj }
}