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
    REJECT_REQUEST_CLEAR,
    ACCEPT_REQUEST_CLEAR,
    REMOVE_REQUEST_CLEAR,
    CONNECT_REQUEST_CLEAR,
} from "redux/actionTypes/network.actionTypes";

const iniitialState = {
    networkFollower: null,
    networkFollowing: null,
    networkRequests: null,
    networkSuggestions: null,
    networkHashtags: null,

    connectRequest: null,
    removeRequest: null,
    acceptRequest: null,
    rejectRequest: null,
    loading: false
}

export default function networkReducer(state = iniitialState, action) {
    switch (action.type) {
        // follower
        case GET_NETWORK_FOLLOWER_LIST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_NETWORK_FOLLOWER_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                networkFollower: action.payload.entity
            };
        case GET_NETWORK_FOLLOWER_LIST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // following
        case GET_NETWORK_FOLLOWING_LIST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_NETWORK_FOLLOWING_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                networkFollowing: action.payload.entity
            };
        case GET_NETWORK_FOLLOWING_LIST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // requests
        case GET_NETWORK_REQUESTS_LIST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_NETWORK_REQUESTS_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                networkRequests: action.payload.entity
            };
        case GET_NETWORK_REQUESTS_LIST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // suggestions
        case GET_NETWORK_SUGGESTIONS_LIST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_NETWORK_SUGGESTIONS_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                networkSuggestions: action.payload.entity
            };
        case GET_NETWORK_SUGGESTIONS_LIST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // hashtags
        case GET_NETWORK_HASHTAGS_LIST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case GET_NETWORK_HASHTAGS_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                networkHashtags: action.payload.entity
            };
        case GET_NETWORK_HASHTAGS_LIST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        // connect
        case CONNECT_REQUEST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case CONNECT_REQUEST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                connectRequest: action.payload.entity
            };
        case CONNECT_REQUEST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case CONNECT_REQUEST_CLEAR:
            return {
                ...state,
                connectRequest: null,
            }
        // remove
        case REMOVE_REQUEST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case REMOVE_REQUEST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                removeRequest: action.payload.entity
            };
        case REMOVE_REQUEST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case REMOVE_REQUEST_CLEAR:
            return {
                ...state,
                removeRequest: null,
            }
        // accept
        case ACCEPT_REQUEST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case ACCEPT_REQUEST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                acceptRequest: action.payload.entity
            };
        case ACCEPT_REQUEST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case ACCEPT_REQUEST_CLEAR:
            return {
                ...state,
                acceptRequest: null,
            }
        // reject
        case REJECT_REQUEST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case REJECT_REQUEST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                rejectRequest: action.payload.entity
            };
        case REJECT_REQUEST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case REJECT_REQUEST_CLEAR:
            return {
                ...state,
                rejectRequest: null,
            }

        default:
            return state;
    }
}