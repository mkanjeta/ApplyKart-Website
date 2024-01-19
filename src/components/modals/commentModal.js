import moment from "moment";
import { useState } from "react";
import ModalLayout from './modalLayout';
import * as action from "../../redux/actions/timelineActions";
import { useDispatch } from "react-redux";

const CommentModal = (props) => {
    // console.log("props ==>>", props)
    const { comments, communityPostId } = props?.data;
    const [comment, setComment] = useState();
    const dispatch = useDispatch();

    const handleComment = (event, communityPostId) => {
        const keyCode = event.keyCode || event.which;

        if (keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            dispatch(action.postComment({ communityPostId: communityPostId, comment: comment }));
            setComment('');
        }
    }
    const handleSendComment = (communityPostId) => {
        if(comment?.length>0){
            dispatch(action.postComment({ communityPostId: communityPostId, comment: comment }));
            setComment('');
        }
    }

    return (
        <ModalLayout state={props.state} size={props.size} >
            <div className="timeline-modal-layout">
                <h4 className='title-header'>All Comments <button type='button' className='cross-button' onClick={props.action}><i className='bi bi-x' /></button></h4>
            </div>
            <div className="comment-modal">
                <div className="c-body">
                    {!comments?.length && <p className="text-center">No comments</p>}
                    {comments?.map((item, index) => {
                        return (
                            <div className="comment-list" key={index}>
                                <div className="c-user-image">
                                    <img src={props?.profilePic?.trim()} alt="" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                                </div>
                                <div className="comment-data">
                                    <h6 className="name">{item?.firstName + ' ' + item?.lastName}</h6>
                                    <p className="designation">{item?.designation || '-'}<span>{moment.utc(item?.createdAt).fromNow()}</span></p>
                                    <p className="comment">{item?.comment}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="c-footer">
                    <div className="comment-list">
                        <div className="c-user-image">
                            <img src={props?.userInfo?.profilePic?.trim()} alt="" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                        </div>
                        <textarea
                            className="c-comment-area"
                            placeholder="Write your comment"
                            value={comment}
                            onKeyPress={(event) => handleComment(event, communityPostId)}
                            onChange={(event) => setComment(event.target.value)}
                        >
                        </textarea>
                        <button type="button" className="send-comment btn btn-primary" onClick={() => handleSendComment(communityPostId)}>Send</button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default CommentModal;