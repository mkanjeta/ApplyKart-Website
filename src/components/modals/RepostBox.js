import React from 'react';
import ModalLayout from './modalLayout';
import { useState } from 'react';
import PostItem from 'components/timeline/posts/postItem';
import { useEffect } from 'react';
import * as action from '../../redux/actions/timelineActions';
import { CREATE_TIMELINE_POST_CLEAR, REPOST_COMMUNITY_POST_CLEAR, UPDATE_TIMELINE_POST_CLEAR } from 'redux/actionTypes/timeline.actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/shared/loader';

function RepostBox(props) {
    const dispatch = useDispatch();
    const { repostCommunityStatus, loading, trendingHashTags, addEditSuccess } = useSelector(({ timelineReducer }) => timelineReducer);
    const [userInfo, setUserInfo] = useState();
    const [description, setDescription] = useState('');
    useEffect(() => {
        const applyKart = localStorage.getItem("applyKart");
        if (!applyKart) {
            // return false;
        } else {
            setUserInfo(JSON.parse(applyKart));
        }
    }, []);
    const handlePostEdit = () => { }
    const insertHashTags = (tags) => {
        // let htmlTag = `<strong><a href=''>${tags}</a></strong>`
        setDescription(description ? (description + ' ' + tags + ' ') : (description + tags + ' '));
    }
    const handleRepost = () => {
        if(props.repostType === 'edit'){
            dispatch(action.updateTimelinePost({
                postDescription: description,
                communityPostId: props.repostItem?.communityPostId,
                media: []
            }))
        } else {
            dispatch(action.repostCommunityPost({
                communityPostId: props.repostItem?.communityPostId,
                postDescription: description
            }));
        }
        
    }
    useEffect(()=>{
        if(props.repostType === 'edit'){
            setDescription(props.repostItem?.postDescription);
        }
    },[props.repostType])
    useEffect(() => {
        if (repostCommunityStatus?.success) {
            dispatch({ type: REPOST_COMMUNITY_POST_CLEAR });
            setDescription('');
            props.action();
        }
    }, [repostCommunityStatus?.success]);
    useEffect(() => {
        if (addEditSuccess) {
            props.action();
            setDescription('');
            dispatch({ type: UPDATE_TIMELINE_POST_CLEAR });
            dispatch({ type: CREATE_TIMELINE_POST_CLEAR });
        }
    }, [addEditSuccess])
    return (
        <>
            {loading ? <Loader /> : null}
            <ModalLayout action={props.action} state={props.state} size={props.size}>
                <div className="timeline-modal-layout">
                <div className="tag-area">
                    <h6 className='tag-title'>Select a Hashtag to post</h6>
                    {/* tags */}
                    {trendingHashTags &&
                        <div className="tags">
                            {trendingHashTags.map((items) => {
                                return (
                                    <label htmlFor="brandidentity" className='tag' key={items.hashtag} onClick={() => insertHashTags(items.hashtag)}>
                                        <input type="checkbox" id={items.hashtag} />
                                        <span>{items.hashtag}</span>
                                    </label>
                                )
                            })}
                        </div>
                    }
                </div>
                    <h4 className='title-header'>Repost a post</h4>
                    <div className="px-4 pt-4 py-2 textarea h-auto">
                        <textarea className='w-100 border-0 resize-none p-0 ' rows={4} value={description} placeholder='What do you want to talk about?' onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="reposted-post">
                        <PostItem userInfo={userInfo} handlePostEdit={handlePostEdit} item={props.repostType === 'edit' ? props.repostItem?.originalPost : props.repostItem} index={1} key={1} />
                    </div>
                    <div className="buttons-area justify-content-between w-100">
                        <div className="action-buttons w-100">
                            <button type="button" className="btn btn-transparent w-50" onClick={props.action}>Cancel</button>
                            <button type="submit" className="btn btn-primary w-50" onClick={() => handleRepost()}>Submit</button>
                        </div>
                    </div>
                </div>
            </ModalLayout>
        </>
    );
}

export default RepostBox;