import {
    GET_TRENDING_HASH_TAG_INIT,
    GET_TRENDING_HASH_TAG_SUCCESS,
    GET_TRENDING_HASH_TAG_FAILED,
    GET_TOP_JOBS_LIST_INIT,
    GET_TOP_JOBS_LIST_SUCCESS,
    GET_TOP_JOBS_LIST_FAILED,
    GET_SUGGESTED_USERS_LIST_INIT,
    GET_SUGGESTED_USERS_LIST_SUCCESS,
    GET_SUGGESTED_USERS_LIST_FAILED,
    GET_TIMELINE_USER_INIT,
    GET_TIMELINE_USER_SUCCESS,
    GET_TIMELINE_USER_FAILED,
    GET_TIMELINE_POST_INIT,
    GET_TIMELINE_POST_SUCCESS,
    GET_TIMELINE_POST_FAILED,
    CREATE_TIMELINE_POST_INIT,
    CREATE_TIMELINE_POST_SUCCESS,
    POST_LIKE_SUCCESS,
    POST_LIKE_FAILED,
    POST_LIKE_INIT,
    POST_COMMENT_INIT,
    POST_COMMENT_SUCCESS,
    CREATE_TIMELINE_POST_FAILED,
    POST_DELETE_INIT,
    POST_DELETE_SUCCESS,
    UPDATE_TIMELINE_POST_INIT,
    UPDATE_TIMELINE_POST_SUCCESS,
    UPDATE_TIMELINE_POST_FAILED,
    GET_TIMELINE_POST_DETAIL_INIT,
    GET_TIMELINE_POST_DETAIL_SUCCESS,
    POST_DELETE_FAILED,
    SEND_CONNECTION_REQUEST_SUCCESS,
    SEND_CONNECTION_REQUEST_FAILED,
    SEND_CONNECTION_REQUEST_INIT,
    CREATE_TIMELINE_POST_CLEAR,
    UPDATE_TIMELINE_POST_CLEAR,

    REPOST_COMMUNITY_POST_INIT,
    REPOST_COMMUNITY_POST_SUCCESS,
    REPOST_COMMUNITY_POST_FAILED,
    REPOST_COMMUNITY_POST_CLEAR,

    GET_USERS_LIST_INIT,
    GET_USERS_LIST_SUCCESS,
    GET_USERS_LIST_FAILED,
    REPORT_CONTENT_INIT,
    REPORT_CONTENT_SUCCESS,
    REPORT_CONTENT_FAILED,
} from '../actionTypes/timeline.actionTypes';

const iniitialState = {
    topJobs: [],
    userDetail: [],
    suggestedUsers: [],
    trendingHashTags: [],
    timelinePosts: [],
    timelinePostDetail: null,
    postTotalCount: null,
    loading: false,
    addEditSuccess: false,
    timeLinePostStatus: false,
    timeLinePostLoader: false,
    postLikeStatus: null,
    repostCommunityStatus: null,
    allUsersList: [],
    reportSuccess: false
}

export default function timelineReducer(state = iniitialState, action) {
    switch (action.type) {
        case GET_TRENDING_HASH_TAG_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            }
        case GET_TRENDING_HASH_TAG_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                trendingHashTags: action.payload.entity
            }
        case GET_TRENDING_HASH_TAG_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            }
        case GET_TOP_JOBS_LIST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            }
        case GET_TOP_JOBS_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                topJobs: action.payload.entity
            }
        case GET_TOP_JOBS_LIST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
        case GET_SUGGESTED_USERS_LIST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            }
        case GET_SUGGESTED_USERS_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                suggestedUsers: action.payload.entity
            }
        case GET_SUGGESTED_USERS_LIST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
        case GET_TIMELINE_USER_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            }
        case GET_TIMELINE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                userDetail: action.payload.entity
            }
        case GET_TIMELINE_USER_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
        case GET_TIMELINE_POST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            }
        case GET_TIMELINE_POST_SUCCESS:
            if (action.payload.pageNo === 1) {
                const combinePosts = action.payload.data
            } else {
                const combinePosts = [
                    ...state.timelinePosts,
                    ...action.payload.data
                ]
            }
            return {
                ...state,
                // ...action.payload,
                loading: false,
                timelinePosts: action.payload.pageNo === 1 ? action.payload.data : [...state.timelinePosts, ...action.payload.data],
                postTotalCount: action.payload.totalCount
            }
        case GET_TIMELINE_POST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
        case GET_TIMELINE_POST_DETAIL_INIT: {
            return {
                ...state,
                ...action.payload,
                loading: true
            }
        }
        case GET_TIMELINE_POST_DETAIL_SUCCESS: {
            return {
                ...state,
                timelinePostDetail: action.payload.entity
            }
        }
        case GET_TIMELINE_POST_FAILED: {
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
        }
        case CREATE_TIMELINE_POST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true,
                timeLinePostLoader: true,
                timeLinePostStatus: false,
                addEditSuccess: false
            }
        case CREATE_TIMELINE_POST_SUCCESS:
            const updatedPostArray = [
                action.payload.entity,
                ...state.timelinePosts
            ]
            return {
                ...state,
                loading: false,
                timeLinePostLoader: false,
                timeLinePostStatus: true,
                timelinePosts: updatedPostArray,
                postTotalCount: state.postTotalCount + 1,
                addEditSuccess: true
            }
        case CREATE_TIMELINE_POST_CLEAR:
            return {
                ...state,
                loading: false,
                timeLinePostLoader: false,
                timeLinePostStatus: false,
                addEditSuccess:false,
            }
        case CREATE_TIMELINE_POST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                timeLinePostLoader: false,
                timeLinePostStatus: false,
                message: action.payload.message,
                error: action.payload.error,
                addEditSuccess: false
            }
        case UPDATE_TIMELINE_POST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true,
                timeLinePostLoader: true,
                timeLinePostStatus: false,
                addEditSuccess: false
            }
        case UPDATE_TIMELINE_POST_SUCCESS:
            const { communityPostId: cPostId, postDescription, media } = action.payload.entity;
            const updatedTimelinePost = state.timelinePosts.map(post => {
                if (post.communityPostId === cPostId) {
                    return {
                        ...post,
                        postDescription: postDescription,
                        media: media,
                    }
                }
                return post;
            });
            return {
                ...state,
                loading: false,
                timeLinePostLoader: false,
                timeLinePostStatus: true,
                timelinePosts: updatedTimelinePost,
                addEditSuccess: true
            }
        case UPDATE_TIMELINE_POST_CLEAR:
            return {
                ...state,
                loading: false,
                timeLinePostLoader: false,
                timeLinePostStatus: false,
                addEditSuccess:false,
            }
        case UPDATE_TIMELINE_POST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                timeLinePostLoader: false,
                timeLinePostStatus: false,
                message: action.payload.message,
                error: action.payload.error,
                addEditSuccess: false
            }
        case POST_LIKE_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true,
                postLikeStatus: false,
            }
        case POST_LIKE_SUCCESS:
            const { communityPostId, isLiked } = action.payload.entity;
            const updatedTimelinePosts = state.timelinePosts.map(post => {
                if (post.communityPostId === communityPostId) {
                    return {
                        ...post,
                        likeCount: isLiked ? post.likeCount + 1 : post.likeCount - 1,
                        isLiked: !post.isLiked
                    };
                }
                return post;
            })
            return {
                ...state,
                loading: false,
                postLikeStatus: true,
                timelinePosts: updatedTimelinePosts
            }
        case POST_LIKE_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                postLikeStatus: false,
                message: action.payload.message,
                error: action.payload.error
            }
        case 'POST_LIKE_CLEAR':
            return {
                ...state,
                postLikeStatus: null
            }
        case POST_COMMENT_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            }
        case POST_COMMENT_SUCCESS:
            const { communityPostId: postId } = action.payload.entity;
            const updatedPost = state.timelinePosts.map(post => {
                if (post.communityPostId === postId) {
                    const updatedCommentsArray = [...post?.comments, action.payload.entity];
                    return {
                        ...post,
                        totalComments: post.totalComments + 1,
                        comments: [...post?.comments, action.payload.entity]
                    };
                }
                return post;
            })
            return {
                ...state,
                loading: false,
                timelinePosts: updatedPost
            }
        case POST_DELETE_INIT: {
            return {
                ...state,
                ...action.payload,
                loading: true
            }
        }
        case POST_DELETE_SUCCESS: {
            const { communityPostId: postId } = action.payload.entity;

            const updatedPostArrays = state.timelinePosts.filter(post => post.communityPostId !== postId);
            return {
                ...state,
                loading: false,
                timelinePosts: updatedPostArrays,
                postTotalCount: state.postTotalCount - 1
            }
        }
        case POST_DELETE_FAILED: {
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
        }
        case SEND_CONNECTION_REQUEST_INIT: {
            return {
                ...state,
                ...action.payload,
                loading: true
            }
        }
        case SEND_CONNECTION_REQUEST_SUCCESS: {
            const { toUserId, connectionStatus } = action.payload.entity;
            const updatedUserArray = state.suggestedUsers.map(user => {
                // console.log(communityPostId, isLiked);
                if (user.userId === toUserId) {
                    return {
                        ...user,
                        connectionStatus: connectionStatus
                    };
                }
                return user;
            })
            return {
                ...state,
                loading: false,
                suggestedUsers: updatedUserArray
            }
        }
        case SEND_CONNECTION_REQUEST_FAILED: {
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
        }
        // repost community
        case REPOST_COMMUNITY_POST_INIT:
            return {
                ...state,
                ...action.payload,
                loading: true
            };
        case REPOST_COMMUNITY_POST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                repostCommunityStatus: action.payload.entity
            };
        case REPOST_COMMUNITY_POST_FAILED:
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case REPOST_COMMUNITY_POST_CLEAR:
            return {
                ...state,
                repostCommunityStatus: null,
            }
        case GET_USERS_LIST_INIT: {
            return {
                ...state,
                ...action.payload,
                loading: true
            }
        }
        case GET_USERS_LIST_SUCCESS: {
            return {
                ...state,
                allUsersList: action.payload.entity
            }
        }
        case GET_USERS_LIST_FAILED: {
            return {
                ...state,
                ...action.payload,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
        }
        case REPORT_CONTENT_INIT:
            return {
                ...state,
                loading: true,
            }
        case REPORT_CONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                reportSuccess: true
            }
        case REPORT_CONTENT_FAILED:
            return {
                ...state,
                loading: false,
                reportSuccess: false
            }
        case "RESET_REPORT_CONTENT":
            return {
                ...state,
                reportSuccess: false
            }
        default:
            return state
    }
}