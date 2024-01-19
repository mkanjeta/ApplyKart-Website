import React, { useState, useEffect } from 'react';
import ModalLayout from './modalLayout';
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../redux/actions/myProfileActions";
import CommonPagination from 'components/shared/CommonPagination';
import moment from 'moment';

function LikesModalPost(props) {
    const { allLikes } = props;
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <div className="timeline-modal-layout">
                <h4 className='title-header'>All Likes <button type='button' className='cross-button' onClick={props.action}><i className='bi bi-x' /></button></h4>
            </div>
            <div className="p-3 pb-0">
                <ul className='profilesLikes'>
                    {allLikes?.likedBy?.length > 0 ?
                        allLikes?.likedBy.map((item, index) => (
                            <li key={index}>
                                <div className="left-side">
                                    <img src={item?.profilePic ? item?.profilePic?.trim() : "/assets/images/profile.jpg"} alt={item?.firstName} className='image-fit rounded-circle image' onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                                    <i className='icon-like_selected' />
                                    <div className="text">
                                        <h6 className='name'>{item?.firstName || '-'} {item?.lastName}</h6>
                                        <p className='designation'>{item?.designation || '-'} - {moment.utc(item?.createdAt).fromNow()}</p>
                                    </div>
                                </div>
                                {/* <button type='button' className='connect-btn danger'><i className='icon-reject'/> Remove</button> */}
                            </li>
                        ))
                        : <div className='col-12 text-center'><p className='bg-white p-3'>No Record Found</p></div>}
                </ul>
            </div>
        </ModalLayout>
    );
}

export default LikesModalPost;