import moment from "moment";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import * as action from '../../../redux/actions/timelineActions';
import { LikedBy } from "./likedBy";
import ShareViaModal from "components/modals/shareViaModal";
import CommentModal from "components/modals/commentModal";
import Link from "next/link";
import LikesModalPost from "components/modals/likesModalPost";
import RepostBox from "components/modals/RepostBox";
import linkifyHtml from "linkify-html";
import LivePreview from "components/LivePreview";
import parse from "html-react-parser";
import ReportPost from "../reortPost";

const regex = /#(\w+)/g;
const regexUrl = /\b((?:https?|ftp):\/\/[^\s/$.?#].[^\s]*)\b/g;

export const PostItem = (props) => {
    const { userInfo, item, index } = props;
    // console.log("item ==>>", item)
    const dispatch = useDispatch();
    const [comment, setComment] = useState();
    const [shareModal, setShareModal] = useState(false);
    const [commentModal, setCommentModal] = useState(false);
    const [likeModal, setLikeModal] = useState(false);
    const [repostBox, setRepostBox] = useState(false);
    const [repostItem, setRepostItem] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handlePostEdit = (item) => {
        props.handlePostEdit(item);
    }
    const openImageModal = (image) => {
        setSelectedImage(image);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    // console.log(item, 'itemmmmmm')

    const likePost = (isLiked, communityPostId) => {
        dispatch(action.postLike({ communityPostId: communityPostId, value: isLiked ? 0 : 1 }));
    }

    const handleComment = (event, communityPostId) => {
        const keyCode = event.keyCode || event.which;

        if (keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            dispatch(action.postComment({ communityPostId: communityPostId, comment: comment }));
            setComment('');
        }
    }
    const handleSendComment = (communityPostId) => {
        if (comment?.length > 0) {
            dispatch(action.postComment({ communityPostId: communityPostId, comment: comment }));
            setComment('');
        }
    }

    const handlePostDelete = (communityPostId) => {
        dispatch(action.postDelete({ communityPostId: communityPostId }));
    }

    const handleToggleShareModal = () => {
        setShareModal(!shareModal);
    }

    const handleCommentModal = () => {
        setCommentModal(!commentModal);
    }
    const handleLikeModal = () => {
        setLikeModal(!likeModal);
    }
    const handleToggleRepostBox = () => {
        setRepostBox(!repostBox);
    }
    const [repostType, setRepostType] = useState('create');
    const handleRePostEdit = (item) => {
        setRepostType('edit');
        handleToggleRepostBox();
    }


    return (
        <>
            <div className="timeline-item" key={index}>
                <div className="timeline-head">
                    <div className="reacted-users">
                        {/* <ul className="users-list">
                            <li><img src="https://picsum.photos/200/300" alt='post-user' /></li>
                            <li><img src="https://picsum.photos/200/300" alt='post-user' /></li>
                            <li><img src="https://picsum.photos/200/300" alt='post-user' /></li>
                        </ul> */}

                        {item?.repostedPost == 1 && (
                            <>
                                <span>
                                    <i className="fa fa-repeat"></i>
                                </span>
                                <span style={{ marginLeft: "3px !important;" }}><span className="fw-bold text-capitalize">{`${item?.firstName} ${item.lastName}`}</span> has reposted this</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="timeline-body">
                    <div className="t-user-info-wrap">
                        <div className="t-user-info">
                            <div className="t-user-img-wrap 1">
                                <div className="t-user-img">
                                    <Link href={`/timeline/${item?.createdBy}`}>
                                        <img src={item?.userProfilePic?.trim()} alt="img" className="image-fit" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                                    </Link>
                                </div>
                            </div>
                            <div className="t-user">
                                <div className="d-flex">
                                    <h4>
                                        <Link href={`/timeline/${item?.createdBy}`}>
                                            <span className="text-capitalize">{item?.firstName + " " + item?.lastName}</span>
                                        </Link>
                                    </h4>
                                    {/* {
                                    // props?.item?.repostedPost == 1 && (
                                        <span>&nbsp; has reposted this</span>
                                    )
                                } */}
                                </div>
                                <p>{item?.designation}</p>
                            </div>
                        </div>
                        <span>{moment.utc(item?.createdAt).fromNow()}</span>

                        {<Dropdown className="t-more" >
                            <Dropdown.Toggle variant="null" id="dropdown-basic" className="p-0">
                                ...
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="custom-submenu">
                                {item?.createdBy === userInfo?.userId && (item?.originalPost ? <Dropdown.Item onClick={() => { handleRePostEdit(item); setRepostItem(item); }}>Edit Post</Dropdown.Item> : <Dropdown.Item onClick={() => handlePostEdit(item)}>Edit Post</Dropdown.Item>)}

                                {item?.createdBy === userInfo?.userId && <Dropdown.Item onClick={() => handlePostDelete(item?.communityPostId)}>Delete Post</Dropdown.Item>}
                                {item?.createdBy != userInfo?.userId && <Dropdown.Item onClick={(e) => e.preventDefault()}><ReportPost contentId={item?.communityPostId} reportType={1} /></Dropdown.Item>}
                            </Dropdown.Menu>

                        </Dropdown>}
                    </div>
                    <div className="t-post-content wb">

                        <p dangerouslySetInnerHTML={{
                            __html: item?.postDescription ? linkifyHtml(item?.postDescription?.replaceAll("\n", "<br>")
                                ?.replaceAll("@", "")
                                ?.replaceAll("[", "<strong>")
                                ?.replaceAll("]", "</strong>")
                                ?.replace(/[.+?]/gm, "")
                                ?.replace(/(?=\()(.+?)(?:\))/gm, "").replace(regex, '<a href="/timeline?type=$1"><strong class="fw-600">#$1</strong></a>')) : ''
                        }}></p>
                        {item?.postDescription?.match(regexUrl)?.map((url, i) => (
                            <div key={i} className={"preview-url-ui"}>
                                {item?.postDescription &&
                                    <LivePreview url={url} />
                                }
                            </div>
                        ))}
                        {item?.media && item?.media.length > 1 ? (
                            <div>
                                <Carousel
                                    showArrows={true}
                                    showIndicators={true}
                                    showThumbs={false}
                                    showStatus={false}
                                    infiniteLoop={true}
                                    dynamicHeight={false}
                                >
                                    {item?.media.map((mediaItem, i) => (
                                        <div
                                            className="t-post-media"
                                            style={{ maxHeight: '340px', overflowY: 'auto' }}
                                            key={i}
                                            onClick={() => openImageModal(mediaItem)}
                                        >
                                            {mediaItem?.fileType === 1 ? (
                                                <img
                                                    src={mediaItem?.fileName}
                                                    style={{
                                                        maxHeight: '100%',
                                                        maxWidth: '100%',
                                                        width: 'auto',
                                                        height: 'auto',
                                                        cursor: 'pointer',
                                                    }}
                                                    alt=""
                                                />
                                            ) : (
                                                <video src={mediaItem?.fileName} controls></video>
                                            )}
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        ) : (
                            // Render single image if there's only one in the media array
                            item?.media && item?.media.length === 1 && (
                                <div
                                    className="t-post-media"
                                    style={{ maxHeight: '340px', overflowY: 'auto' }}
                                    onClick={() => openImageModal(item?.media[0])}
                                >
                                    {item?.media[0]?.fileType === 1 ? (
                                        <img
                                            src={item?.media[0]?.fileName}
                                            style={{
                                                maxHeight: '100%',
                                                maxWidth: '100%',
                                                width: 'auto',
                                                height: 'auto',
                                                cursor: 'pointer',
                                            }}
                                            alt=""
                                        />
                                    ) : (
                                        <video src={item?.media[0]?.fileName} controls></video>
                                    )}
                                </div>
                            )
                        )}

                        {selectedImage && (
                            // Your modal with close button and click outside to close
                            <>
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'rgba(0, 0, 0, 0.7)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 9999, // Higher z-index to cover the background
                                    }}
                                    onClick={closeImageModal}
                                >
                                    <div
                                        style={{
                                            position: 'relative',
                                            maxWidth: '80%',
                                            maxHeight: '80%',
                                            overflow: 'auto',
                                            background: '#fff',
                                            borderRadius: '8px',
                                            padding: '16px',
                                            margin:' 0 auto',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                cursor: 'pointer',
                                                fontSize: '20px',
                                                color: '#666',
                                                zIndex: '99',
                                                background: '#FFF',
                                                verticalAlign: 'middle',
                                                margin: '0',
                                                padding: '2px 7px 0',
                                                borderRadius: '50%',
                                                height: '30px',
                                                width: '30px',
                                                boxShadow: '0 0 3px 5px #c9c9c9',
                                            }}
                                            onClick={closeImageModal}
                                        >
                                            &times;
                                        </span>
                                        {selectedImage?.fileType === 1 ? (
                                            <img
                                                src={selectedImage?.fileName}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    // You can adjust the zoom level here
                                                    // Example: Zoom in by 20%
                                                    transform: 'none',
                                                    maxWidth: '80%',
                                                    margin: '0 auto',
                                                    textAlign: 'center',
                                                }}
                                                alt=""
                                            />
                                        ) : (
                                            <video
                                                src={selectedImage?.fileName}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                }}
                                                controls
                                            ></video>
                                        )}
                                    </div>
                                </div>
                                {!selectedImage?.media || selectedImage.media.length > 1 ? (
                                    <div
                                        style={{
                                            // This div will cover the background when the modal is open
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            zIndex: 9998, // Z-index should be less than the modal's z-index
                                        }}
                                    ></div>
                                ) : null}
                            </>
                        )}

                        {
                            item?.originalPost ?
                                <div className="timeline-item mt-3 mb-0">
                                    <div className="timeline-body">
                                        <div className="t-user-info-wrap">
                                            <div className="t-user-info">
                                                <div className="t-user-img-wrap">
                                                    <div className="t-user-img">
                                                        <Link href={`/timeline/${item?.originalPost?.createdBy}`}>
                                                            <img src={item?.originalPost?.userProfilePic?.trim()} alt="img" className="image-fit" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="t-user">
                                                    <h4>
                                                        <Link href={`/timeline/${item?.originalPost?.createdBy}`}>
                                                            {item?.originalPost?.firstName + " " + item?.originalPost?.lastName}
                                                        </Link>
                                                    </h4>
                                                    <p>{item?.originalPost?.designation}</p>
                                                </div>
                                            </div>
                                            <span>{moment.utc(item?.originalPost?.createdAt).fromNow()}</span>
                                        </div>
                                        <div className="t-post-content pb-3">
                                            <p dangerouslySetInnerHTML={{ __html: linkifyHtml(item?.originalPost?.postDescription.replace(regex, '<a href="/timeline?type=$1"><strong class="fw-600">#$1</strong></a>')) }}></p>
                                            {item?.originalPost?.postDescription?.match(regexUrl)?.map((url, i) => (
                                                <div key={i} className={"preview-url-ui"}>
                                                    {item?.originalPost?.postDescription && <LivePreview url={url} />}
                                                </div>
                                            ))}
                                            <Carousel
                                                showArrows={true}
                                                showIndicators={true}
                                                showThumbs={false}
                                                showStatus={false}
                                                infiniteLoop={true}
                                                dynamicHeight={false}
                                            // className={styles.mySwiper}
                                            >
                                                {item?.originalPost?.media &&
                                                    item?.originalPost?.media?.map((data, i) => {
                                                        return (
                                                            <div className="t-post-media" key={i}>
                                                                {data?.fileType === 1 ?
                                                                    <img src={data?.fileName} alt="" />
                                                                    :
                                                                    <video src={data?.fileName} controls></video>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                    <LikedBy likedByData={item?.likedBy} />
                    {/* <div className="reacted-users">
                <ul className="users-list">
                    <li><img src="https://picsum.photos/200/300" alt='post-user' /></li>
                    <li><img src="https://picsum.photos/200/300" alt='post-user' /></li>
                    <li><img src="https://picsum.photos/200/300" alt='post-user' /></li>
                </ul>
                <span>Anna & Olivia 31+ Liked this</span>
            </div> */}
                </div>
                <div className="timeline-footer">
                    <ul className="lcs">
                        <li><i className={`icon-like_selected ${item?.isLiked ? 'active' : ''}`} onClick={() => likePost(item?.isLiked, item?.communityPostId)} /> <p onClick={handleLikeModal} className="mb-0"><strong>{item?.likeCount}</strong>&nbsp;{item?.likeCount > 1 ? 'Likes' : 'Like'}</p></li>
                        <li onClick={() => handleCommentModal()}><i className="icon-msg-border fs-4" /> {item?.totalComments} &nbsp;{item?.totalComments > 1 ? 'Comments' : 'Comment'}</li>
                        <li onClick={() => handleToggleShareModal()}><i className="icon-share" />
                            {/* {item?.repostCount}  */}
                            Share</li>
                        <li onClick={() => { handleToggleRepostBox(); setRepostItem(item) }}><i className="fa fa-repeat" /> {item?.repostCount} Repost</li>
                    </ul>
                    <div className="t-comment-wrap">
                        {item?.lastComment && <div className="t-comment">
                            <div className="t-comment-user">
                                <img src={item?.lastComment?.profilePic?.trim()} alt="" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                            </div>
                            <div className="editableText comment-area">
                                <h6 className="name">{item?.lastComment?.firstName + ' ' + item?.lastComment?.lastName}</h6>
                                <p className="designation">{item?.lastComment?.designation}<span>{moment(item?.lastComment?.createdAt).fromNow()}</span></p>
                                <p className="comment">{item?.lastComment?.comment}</p>
                            </div>
                        </div>}

                        <div className="t-comment">
                            <div className="t-comment-user">
                                <img src={userInfo?.profilePic?.trim()} alt={userInfo?.userName} onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                            </div>
                            <textarea
                                className="editableText"
                                placeholder="Write your comment"
                                value={comment}
                                onKeyPress={(event) => handleComment(event, item?.communityPostId)}
                                onChange={(event) => setComment(event.target.value)}
                            >
                            </textarea>
                            <button type="button" className="send-comment btn btn-primary" onClick={() => handleSendComment(item?.communityPostId)}>Send</button>
                            {/* <div 
                        contentEditable="true" 
                        className="editableText" 
                        data-placeholder="Write your comment"
                        onInput={(e) => setComment(e.target.innerHTML)}
                        onKeyPress={(event) => handleComment(event, item?.communityPostId)}
                    ></div> */}
                        </div>
                    </div>
                </div>
                {repostBox ? <RepostBox action={handleToggleRepostBox} state={repostBox} repostItem={repostItem} repostType={repostType} size={"md"} /> : null}
                <ShareViaModal postId={item?.communityPostId} action={handleToggleShareModal} state={shareModal} size={"sm"} />

                <CommentModal data={item || {}} userInfo={userInfo} action={handleCommentModal} state={commentModal} size={"md"} />
                <LikesModalPost allLikes={item} userInfo={userInfo} action={handleLikeModal} state={likeModal} size={"md"} />

            </div >
        </>
    )
}

export default PostItem;