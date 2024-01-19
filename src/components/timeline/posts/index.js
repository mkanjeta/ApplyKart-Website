import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./postItem";
import * as action from "../../../redux/actions/timelineActions";
import timelineReducer from "redux/reducers/timelineReducer";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

export const TimeLinePosts = (props) => {
    const { userInfo, id } = props;
    const dispatch = useDispatch();
    const router = useRouter();
    const [tagName, setTagName] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const [hasMoreDiscussion, setHasMoreDiscussion] = useState(false);

    const { timelinePosts, postTotalCount,timeLinePostStatus, postLikeStatus , repostCommunityStatus} = useSelector(({ timelineReducer }) => timelineReducer);
    useEffect(() => {
        if (router.asPath?.includes('type')) {
            setTagName(router.asPath.split('=')[1])
        } else {
            setTagName('')
        }
    }, [])
    useEffect(() => {
        if (id) {
            dispatch(action.getTimelinePosts({ userId: id, pageSize: pageSize, pageNo: pageNo, hashTag: tagName }));
        }
    }, [id, pageNo, tagName, pageSize]);
    useEffect(() => {
        if (timeLinePostStatus || postLikeStatus || repostCommunityStatus?.success) {
            dispatch(action.getTimelinePosts({ userId: id, pageSize: pageSize, pageNo: 1, hashTag: tagName }));
            dispatch({type:'POST_LIKE_CLEAR'});
        }
    }, [timeLinePostStatus, postLikeStatus, repostCommunityStatus?.success]);

    const handlePostEdit = (item) => {
        props.handlePostEdit(item);
    }

    const fetchData = () => {
        setPageSize(pageSize + 10);
    }

    useEffect(() => {
        if (timelinePosts?.length === postTotalCount) {
            setHasMoreDiscussion(false);
        } else {
            setHasMoreDiscussion(true);
        }
    }, [timelinePosts]);

    return (
        <div className="timeline-wrap" id="scrollablescrll">
            <InfiniteScroll
                dataLength={timelinePosts?.length}
                loader={<p>Loading...</p>}
                next={fetchData}
                hasMore={
                    hasMoreDiscussion
                }
            // scrollableTarget="scrollablescrll"
            >
                {timelinePosts &&
                    timelinePosts.map((item, index) => {
                        return (
                            <PostItem userInfo={userInfo} handlePostEdit={handlePostEdit} item={item} index={index} key={index} />
                        )
                    })
                }
            </InfiniteScroll>
        </div>
    )
}