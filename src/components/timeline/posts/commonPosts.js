import CreatePostModal from 'components/modals/createPostModal';
import SuccessPostModal from 'components/modals/successPostModal';
import React from 'react';
import { TimeLinePosts } from '.';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CREATE_TIMELINE_POST_CLEAR, UPDATE_TIMELINE_POST_CLEAR } from 'redux/actionTypes/timeline.actionTypes';

function CommonPosts(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState();
    const [postType, setPostType] = useState('createPost');
    const [postModal, setPostModal] = useState(false);
    const [post, setPost] = useState('');
    const { addEditSuccess, timelinePostDetail, timeLinePostStatus } = useSelector(({ timelineReducer }) => timelineReducer);
    const [userId, setUserId] = useState('');

    const handleTogglePostModal = (type) => {
        if (type === "createPost") {
            setPostType('createPost');
            setPost('');
        }
        setPostModal(!postModal);
    }

    const handlePostEdit = (item) => {
        setPost(item);
        setPostType('editPost');
        setPostModal(!postModal);
    }
    useEffect(() => {
        if (addEditSuccess) {
            setPostModal(false);
        }
    }, [addEditSuccess])
    useEffect(() => {
        const applyKart = localStorage.getItem("applyKart");
        // if (!applyKart) {
        //     return false;
        // } else {
        if (applyKart) {
            setUserInfo(JSON.parse(applyKart));
        }
    }, []);

    const [successModal, setSuccessModal] = useState(false);
    const handleToggleSuccessModal = () => {
        setSuccessModal(!successModal)
    }
    // useEffect(() => {
    //     if(addEditSuccess) {
    //         setSuccessModal(true);
    //         // setPostModal(!postModal);
    //         setTimeout(() => {
    //             setSuccessModal(false);
    //         }, 1600)
    //         dispatch({type:UPDATE_TIMELINE_POST_CLEAR});
    //         dispatch({type:CREATE_TIMELINE_POST_CLEAR});
    //     }
    // }, [addEditSuccess])
    // useEffect(()=>{
    //     if(timeLinePostStatus){
    //         setPostModal(false);
    //     }
    // },[timeLinePostStatus])
    return (
        <div>
            <TimeLinePosts userInfo={props.userInfo} handlePostEdit={handlePostEdit} id={props.id} />

            <CreatePostModal postType={postType} userInfo={userInfo} action={handleTogglePostModal} data={post} state={postModal} size={"md"} setMediaUploadProcess={props?.setMediaUploadProcess} />
            <SuccessPostModal action={handleToggleSuccessModal} state={successModal} size={"sm"} />
        </div>
    );
}

export default CommonPosts;