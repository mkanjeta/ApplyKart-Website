import React, { useEffect, useState } from 'react';
import TrendingTags from './trending-tags';
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../redux/actions/networkActions";
import CommonPagination from 'components/shared/CommonPagination';
import { CONNECT_REQUEST_CLEAR } from 'redux/actionTypes/network.actionTypes';
import Link from 'next/link';

function Suggestions(props) {
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const { networkSuggestions, connectRequest } = useSelector(({ networkReducer }) => networkReducer);
    useEffect(() => {
        dispatch(action.getNetworkSuggestionsList({
            pageNo: pageNo + 1,
            pageSize: pageSize,
            searchText: searchText
        }));
    }, [pageNo, pageSize, searchText.length > 3]);
    useEffect(() => {
        if (networkSuggestions) {
            props.setCount(networkSuggestions);
        }
    }, [networkSuggestions, props])
    useEffect(() => {
        if (connectRequest?.success) {
            dispatch({ type: CONNECT_REQUEST_CLEAR });
            dispatch(action.getNetworkSuggestionsList({
                pageNo: pageNo + 1,
                pageSize: pageSize,
                searchText: searchText
            }));
        }
    }, [connectRequest?.success])
    const handleConnectRequest = (item) => {
        dispatch(action.connectRequestAction({
            toUserId: item?.userId
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
                    {networkSuggestions?.data?.length > 0 ?
                        networkSuggestions?.data.map((item, index) => (
                            <div className="network-item col-lg-3 col-md-6" key={index}>
                                <div className="network-item-inner">
                                    <Link href={'/timeline/' + item?.userId}>
                                        <a style={{ display: 'block', width: '100%' }}>
                                            <img src={item?.profilePic ? item?.profilePic?.trim() : "/assets/images/profile.jpg"} alt={item?.firstName} className='image-fit rounded-circle image' onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                                            <h5 className='name'>{item?.firstName || '-'}</h5>
                                            <p className='designation'>{item?.jobTitle || '-'}, {item?.company || '-'}</p>
                                            <p className='location'> <i className='icon-Icon-feather-map-pin' /> {item?.location || '-'}</p>
                                        </a>
                                    </Link>
                                    {item?.connectionStatus === 4 ?
                                        (
                                            <div>
                                                <button
                                                    type='button'
                                                    className='connect-btn primary'
                                                    disabled
                                                >
                                                    <i className='icon-connect' /> Pending
                                                </button>
                                            </div>
                                        )
                                        : (
                                            <div>
                                                <button
                                                    type='button'
                                                    className='connect-btn primary'
                                                    onClick={() => handleConnectRequest(item)}
                                                >
                                                    <i className='icon-connect' /> Connect
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )) : <div className='col-12 text-center'><p className='bg-white p-3'>No Record Found</p></div>
                    }
                    {/*  */}
                </div>
                {networkSuggestions?.data?.length > 0 ?
                    <CommonPagination total={networkSuggestions?.totalSuggestions} pageLimit={pageSize} currentPage={pageNo} hitAction={handlePageClick} />
                    : null}
            </div>
            <div className="col-lg-3">
                <TrendingTags />
            </div>
        </div>
    );
}

export default Suggestions;