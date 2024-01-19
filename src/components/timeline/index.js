// import NavBar from "components/shared/navbar";
import TimelineHeader from "components/shared/timelineHeader";
import CreatePost from "./createPost";
import HashTag from "./hashtag";
import TimelineLeftSidebar from "./leftSidebar";
// import { TimeLinePosts } from "./posts";
import TimelineRightSidebar from "./rightSidebar";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreatePostModal from "components/modals/createPostModal";
import { useDispatch, useSelector } from "react-redux";
import SuccessPostModal from "components/modals/successPostModal";
// import PostItem from "./posts/postItem";
import CommonPosts from "./posts/commonPosts";
import Loader from "components/shared/loader";
import { CREATE_TIMELINE_POST_CLEAR, UPDATE_TIMELINE_POST_CLEAR } from "redux/actionTypes/timeline.actionTypes";

const TimelineComponent = (props) => {
    const { postDetail } = props;
    const router = useRouter();
    // console.log("router ==>>", router)
    const dispatch =useDispatch();
    const { id } = router.query;
    const [userInfo, setUserInfo] = useState();
    const [postType, setPostType] = useState('createPost');
    const [postModal, setPostModal] = useState(false);
    const [post, setPost] = useState('');
    const { addEditSuccess, timelinePostDetail, loading, timeLinePostLoader, timeLinePostStatus } = useSelector(({ timelineReducer }) => timelineReducer);
    // const [userId, setUserId] = useState('');
    const [mediaUploadProcess, setMediaUploadProcess] = useState(false); 

    const handleTogglePostModal = (type) => {
        if (type === "createPost") {
            setPostType('createPost');
            setPost('');
            
        }
        setPostModal(!postModal);
    }

    const handlePostEdit = (item) => {
        // setPost(item);
        // setPostType('editPost');
        // setPostModal(!postModal);
    }
    useEffect(() => {
        const applyKart = localStorage.getItem("applyKart");
        // if (!applyKart) {
        //     return false;
        // } else {
        if(applyKart){
            setUserInfo(JSON.parse(applyKart));
        }
    }, []);

    const [successModal, setSuccessModal] = useState(false);
    const handleToggleSuccessModal = () => {
        setSuccessModal(!successModal)
    }
    useEffect(() => {
        if (addEditSuccess) {
            setSuccessModal(true);
            setPostModal(false);
            setTimeout(() => {
                setSuccessModal(false);
            }, 1600); 
            
            dispatch({type:UPDATE_TIMELINE_POST_CLEAR});
            dispatch({type:CREATE_TIMELINE_POST_CLEAR});
        }
    }, [addEditSuccess])
   
    return (
        <main className="main_wrapper wrapper_style_two">
            {timeLinePostLoader || mediaUploadProcess ?  <Loader/> : null}
            <TimelineHeader />
            <div className="container">
                <div className="content-wrap">
                    <TimelineLeftSidebar id={id || '0'} />
                    <TimelineRightSidebar />
                    <div className="content-area">
                        {/* <NavBar /> */}
                        {!postDetail && <HashTag />}
                        {!postDetail && <CreatePost userInfo={userInfo} handleTogglePostModal={handleTogglePostModal} />}

                        {!postDetail && <div className="post-type-filter">
                            {/* <p className="d-inline-block">Adverts may affect post order</p> */}
                            <Dropdown className="filter-style d-inline-block d-none">
                                <Dropdown.Toggle variant="null" id="dropdown-basic" className=" p-0">
                                    Recent
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="custom-submenu">
                                    <Dropdown.Item href="#/action-1">Recent</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Trending</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>}
                        {!postDetail && <CommonPosts userInfo={userInfo} id={id || '0'} setMediaUploadProcess={setMediaUploadProcess} />}
                        {/* {(postDetail && timelinePostDetail) && <PostItem userInfo={userInfo} handlePostEdit={handlePostEdit} item={timelinePostDetail} index={1} key={1} />} */}
                        <CreatePostModal postType={postType} userInfo={userInfo} action={handleTogglePostModal} data={post} state={postModal} size={"md"} setMediaUploadProcess={setMediaUploadProcess} />
                        <SuccessPostModal action={handleToggleSuccessModal} state={successModal} size={"sm"} />
                    </div>

                </div>
            </div>
        </main>
    );
};

export default TimelineComponent;