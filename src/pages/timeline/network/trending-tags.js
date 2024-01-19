import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../redux/actions/networkActions";
import { createSearchParams } from 'react-router-dom';
import { useRouter } from 'next/router';

function TrendingTags(props) {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const navigate = useRouter();
    const dispatch = useDispatch();
    const {networkHashtags} = useSelector(({ networkReducer }) => networkReducer);
    useEffect(() => {
        dispatch(action.getNetworkHashtagsList({
            pageNo: pageNo,
            pageSize: pageSize,
        }));
    }, [pageNo, pageSize]);
    const handleNavigateToTag = (tag) => {
        const obj = {
            type:tag?.replace('#','')
        }
        navigate.push('/timeline?'+createSearchParams(obj))
    }
    return (
        <div className='trending-sidebar'>
            <h5 className='sidebar-title'>Most Trending Hashtags</h5>
            <ul className='trending-tags'>
                {networkHashtags?.length>0 ? networkHashtags?.map((item, i) => (
                    <li key={i}><a onClick={()=>handleNavigateToTag(item.hashtag)}>{item.hashtag}</a></li>
                )): <div className='col-12 text-center'><p className='bg-white p-3'>No Record Found</p></div>}
            </ul> 
        </div>
    );
}

export default TrendingTags;