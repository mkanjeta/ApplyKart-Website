import React, { useState, useEffect } from 'react';
import ModalLayout from './modalLayout';
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../redux/actions/myProfileActions";
import CommonPagination from 'components/shared/CommonPagination';

function LikesModal(props) {
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();
    const { allLikes } = useSelector(({ myProfileReducer }) => myProfileReducer);
    useEffect(() => {
        dispatch(action.getAllLikes({
            pageNo: pageNo + 1,
            pageSize: pageSize,
        }));
    }, [pageNo, pageSize]);
    function handlePageClick(data) {
        setPageNo(data.selected);
        return data.selected;
    }
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <div className="timeline-modal-layout">
                <h4 className='title-header'>{allLikes?.data?.data[0]?.totalCount || '0 Like'} {allLikes?.data?.data ? allLikes?.data?.data[0]?.totalCount === 1 ? 'Like' : 'Likes' : null} <button type='button' className='cross-button' onClick={props.action}><i className='bi bi-x' /></button></h4>
            </div>
            <div className="p-3 pb-0">
                <ul className='profilesLikes'>
                    {allLikes?.data?.data?.length > 0 ?
                        allLikes?.data?.data.map((item, index) => (
                            <li key={index}>
                                <div className="left-side">
                                    <img src={item?.profilePic ? item?.profilePic?.trim() : "/assets/images/profile.jpg"} alt={item?.firstName} className='image-fit rounded-circle image' onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                                    <i className='icon-like_selected' />
                                    <div className="text">
                                        <h6 className='name'>{item?.firstName || '-'} {item?.lastName}</h6>
                                        <p className='designation'>{item?.jobTitle || '-'}, {item?.company || '-'}</p>
                                    </div>
                                </div>
                                {/* <button type='button' className='connect-btn danger'><i className='icon-reject'/> Remove</button> */}
                            </li>
                        ))
                        : <div className='col-12 text-center'><p className='bg-white p-3'>No Record Found</p></div>}
                </ul>
                {allLikes?.data?.data?.length > 0 ?
                    <div className='mb-4'><CommonPagination total={allLikes?.data?.data[0]?.totalCount || 0} pageLimit={pageSize} currentPage={pageNo} hitAction={handlePageClick} /></div> : null}
            </div>
        </ModalLayout>
    );
}

export default LikesModal;