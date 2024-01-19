import { useRouter } from "next/router";
import { useEffect } from "react";
import { baseUrl } from 'api/constant';
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as action from '../../../redux/actions/timelineActions';
import TimelineComponent from "components/timeline";

export default function PostDetail(props) {
    const router = useRouter();
    const { postId } = router.query;
    const dispatch = useDispatch();

    useEffect(() => {
        if(postId) {
            dispatch(action.getTimelinePostDetail({postId: postId}))
        }        
    }, [postId])

    return(
        <TimelineComponent postDetail={true} />
    )
}