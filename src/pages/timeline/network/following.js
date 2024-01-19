import React, { useEffect, useState } from 'react';
import TrendingTags from './trending-tags';
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../redux/actions/networkActions";
import CommonPagination from 'components/shared/CommonPagination';
import { REMOVE_REQUEST_CLEAR } from 'redux/actionTypes/network.actionTypes';
import Link from 'next/link';

function Following(props) {
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const { networkFollowing, removeRequest } = useSelector(({ networkReducer }) => networkReducer);

    useEffect(() => {
        if (networkFollowing) {
            props.setCount(networkFollowing);
        }
    }, [networkFollowing, props])

    useEffect(() => {
        dispatch(action.getNetworkFollowingList({
            pageNo: pageNo + 1,
            pageSize: pageSize,
            type: "Followings",
            searchText: searchText
        }));
    }, [pageNo, pageSize, searchText.length > 3]);
    useEffect(() => {
        if (removeRequest?.success) {
            dispatch({ type: REMOVE_REQUEST_CLEAR });
            dispatch(action.getNetworkFollowingList({
                pageNo: pageNo + 1,
                pageSize: pageSize,
                type: "Followings",
                searchText: searchText
            }));
        }
    }, [removeRequest?.success])
    const handleRemoveRequest = (item) => {
        dispatch(action.removeRequestAction({
            fromUserId: item?.followerUserId
        }));
    }
    function handlePageClick(data) {
        setPageNo(data.selected);
        return data.selected;
    }
    return (
        <div className='row'>
            <div className="col-lg-9">
                <div className="row">
                    <div className="col-md-6">
                        <div className="input-group mb-4">
                            <input type="text" className='form-control' placeholder='Search...' value={searchText} onChange={(event) => setSearchText(event.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="network-items row">
                    {/*  */}
                    {networkFollowing?.data?.length > 0 ?
                        networkFollowing?.data.map((item, index) => (
                            <div className="network-item col-lg-3 col-md-6" key={index}>
                                <div className="network-item-inner">
                                    {/* <div> */}
                                    <Link href={'/timeline/' + item?.followerUserId}>
                                        <a style={{display: 'block', width: '100%'}}>
                                            <img src={item?.followerProfilePic ? item?.followerProfilePic?.trim() : "/assets/images/profile.jpg"} alt={item?.firstName} className='image-fit rounded-circle image' onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                                            <h5 className='name'>{item?.firstName || '-'}</h5>
                                            <p className='designation'>{item?.jobTitle || '-'}, {item?.company || '-'}</p>
                                            <p className='location'> <i className='icon-Icon-feather-map-pin' /> {item?.location || '-'}</p>
                                        </a>
                                    </Link>
                                    {/* </div> */}
                                    <div>
                                        <button type='button' className='connect-btn danger' onClick={() => handleRemoveRequest(item)}><i className='icon-reject' /> Remove</button>
                                    </div>
                                </div>
                            </div>
                        )) : <div className='col-12 text-center'><p className='bg-white p-3'>No Record Found</p></div>
                    }
                    {/*  */}
                </div>
                {networkFollowing?.data?.length > 0 ?
                    <CommonPagination total={networkFollowing?.totalFollowingCount} pageLimit={pageSize} currentPage={pageNo} hitAction={handlePageClick} />
                    : null}
            </div>
            <div className="col-lg-3">
                <TrendingTags />
            </div>
        </div>
    );
}

export default Following;