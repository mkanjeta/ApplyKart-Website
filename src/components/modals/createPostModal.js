import React, { useState } from 'react';
import ModalLayout from './modalLayout';
import AttachPhotoModal from './attachPhotoModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as action from '../../redux/actions/timelineActions';
import { baseUrl } from 'api/constant';
import { CREATE_TIMELINE_POST_CLEAR, UPDATE_TIMELINE_POST_CLEAR } from 'redux/actionTypes/timeline.actionTypes';
import Loader from 'components/shared/loader';
import { Mention, MentionsInput } from 'react-mentions';
import defaultMentionStyle from './styles/defaultMentionStyle';
import defaultStyle from './styles/defaultStyle';

const neverMatchingRegex = /($a)/;

function CreatePostModal(props) {
    const { postType, userInfo, data } = props;
    const [communityPostId, setCommunityPostId] = useState('');
    const [description, setDescription] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const dispatch = useDispatch();
    const { trendingHashTags } = useSelector(({ timelineReducer }) => timelineReducer)
    const [photoModal, setPhotoModal] = useState(false);
    const { addEditSuccess, allUsersList } = useSelector(({ timelineReducer }) => timelineReducer);
    // const [mediaUploadProcess, setMediaUploadProcess] = useState(false);

    useEffect(() => {
        if (addEditSuccess) {
            // props.action();
            setMediaFiles('');
            setDescription('');
            dispatch({ type: UPDATE_TIMELINE_POST_CLEAR });
            dispatch({ type: CREATE_TIMELINE_POST_CLEAR });
        }
    }, [addEditSuccess])

    useEffect(() => {
        if (data) {
            setCommunityPostId(data?.communityPostId);
            setDescription(data?.postDescription);
            setMediaFiles(data?.media);
        }
    }, [data]);

    useEffect(() => {
        if (postType === 'createPost') {
            setDescription('');
            setMediaFiles('');
        }
    }, [postType])


    const selectedMedia = (media) => {
        if (media) {
            if (postType === 'createPost') {
                setMediaFiles(media)
            } else {
                mediaFiles.push(...media)
            }

            // setMediaFiles((prevState) => { return { ...prevState, Object.assign(media) } })
        }

    }
    // console.log(mediaFiles,"mediaFiles") 
    const handleRemoveMedia = (i) => {
        // console.log(mediaFiles, 'outdated');
        // const newMedia = mediaFiles.filter((item, j) => i !== j);
        const newMedia = mediaFiles?.map((item, j) => {
            if (i == j) {
                if (item.hasOwnProperty('isDeleted')) {
                    return {
                        ...item,
                        isDeleted: 1
                    }
                } else {
                    return null
                }
            }
            return item
        }).filter(obj => obj !== null);

        // console.log(newMedia);
        setMediaFiles(newMedia);
    }

    let upload = async (dataurl, files) => {

        let response = await fetch(dataurl, {
            method: "PUT",
            body: files,
            headers: {
                "Content-Type": files?.type,
                "x-ms-blob-type": "BlockBlob",
                "x-ms-blob-content": files?.type,
            },
        });
        return response;
    };

    const handleSingleUploadPostMedia = async (media) => {

        let obj = {
            fileName: media?.fileName?.name,
            fileType: media?.fileType
        }

        let mediaResponse = await fetch(`${baseUrl}/upload-post-media`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ media: [obj] })
        })

        return await mediaResponse.json();
    }

    const handleCancel = () => {
        setMediaFiles('');
        setDescription('');
        props.action();
    }

    const handleSubmit = async () => {
        const mediaData = { media: [] }

        // console.log('clicked')
        const taggedUsers = description
            ?.match(/[\@\[]+(...)+[\)]/g)
            ?.join()
            ?.match(/[^(]+(?=\))/g) || [];


        if (mediaFiles) {
            props.setMediaUploadProcess(true);
            const mediaResponse = mediaFiles;

            if (mediaResponse) {
                let i = 0;
                for (const item of mediaResponse) {
                    if (typeof mediaResponse[i].fileName == 'object') {
                        const url = await handleSingleUploadPostMedia(item);
                        const uploaded = await upload(url?.data?.media[0]?.fileName, mediaResponse[i].fileName);
                        mediaData?.media?.push({
                            id: 0,
                            fileName: mediaResponse[i]?.fileName?.name,
                            fileType: mediaResponse[i]?.fileType
                        })
                    } else {
                        mediaData?.media?.push({ ...mediaResponse[i], fileName: mediaResponse[i]?.fileName.split('/')[mediaResponse[i]?.fileName.split('/')?.length - 1] })
                    }

                    i++;
                }
            }

            props.setMediaUploadProcess(false);

        }
        // dispatch({type: "GET_TIMELINE_POST_INIT", payload: []})
        if (postType === 'createPost') {
            const data = {
                postDescription: description,
                media: mediaData?.media,
                taggedUser: taggedUsers
            }
            description
            dispatch(action.createTimelinePost(data))
        } else {
            const data = {
                postDescription: description,
                communityPostId: communityPostId,
                media: mediaData?.media,
                taggedUser: taggedUsers
            }
            dispatch(action.updateTimelinePost(data))
        }

    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const insertHashTags = (tags) => {
        // let htmlTag = `<strong><a href=''>${tags}</a></strong>`
        setDescription(description ? (description + ' ' + tags + ' ') : (description + tags + ' '));
    }


    const [modalType, setModalType] = useState('');
    const handleTogglePhotoModal = (data) => {
        setPhotoModal(!photoModal);
        setModalType(data);
    }
    const getUsers = (query, callback) => {
        const payload = { Search: query, pageNo: 1, pageSize: 20, };
        const applyKart = localStorage.getItem("applyKart");
        const { encryptedToken } = JSON.parse(applyKart);
        fetch(`${baseUrl}/userListTag?pageNo=1&pageSize=20&Search=${query}`, {
            headers: {
                Authorization: encryptedToken
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                let data = response?.data?.map((item) => {
                    return {
                        id: item.userId?.toString(),
                        display: item.name,
                    }
                });
                callback(data);
            })
            .catch((err) => {
                console.log(err);
            })
        // dispatch(action.getAllUsersList(payload));
    };

    // const queryEmojis = (query, callback) => {
    //     if (query.length === 0) return;

    //     const matches = emojis
    //       .filter((emoji) => {
    //         return emoji.name.indexOf(query?.toLowerCase()) > -1;
    //       })
    //       .slice(0, 10);
    //     return matches.map(({ emoji }) => ({ id: emoji }));
    //   };

    if (photoModal) return <AttachPhotoModal setMediaFiles={setMediaFiles} action={handleTogglePhotoModal} state={photoModal} size={"md"} modalType={modalType} selectedMedia={selectedMedia} />
    return (
        <ModalLayout state={props.state} size={props.size} >
            <div className="timeline-modal-layout">
                {/* tag area */}
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
                {/* title */}
                <div className='title-header'>{data ? 'Edit' : 'Create'} a post </div>
                {/* user area */}
                {/* <div className="user-box mb-3">
                    <img src={userInfo?.profilePic} className='image-fit rounded-circle me-3 mb-3' alt={userInfo?.userName} />
                    <h6 className='title mb-3'>{userInfo?.userName} <span className='fw-lighter'>posting in</span> (applykart)</h6>
                </div> */}
                <div className="px-4 py-2 textarea">
                    <MentionsInput
                        style={defaultStyle}
                        className='mention-text-box'
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder={"Write a post here"}
                        id="description">

                        <Mention trigger="@"
                            data={getUsers}
                            appendSpaceOnAdd
                            style={defaultMentionStyle}
                        />
                    </MentionsInput>
                    {/* <textarea className='w-100 border-0 resize-none p-0' rows={6} value={description} placeholder='What do you want to talk about?' onChange={handleDescriptionChange}></textarea> */}
                </div>
                {mediaFiles?.length ? <div className='pe-2'>

                    <div className="image-area mb-3 px-3 modalScrollBar">
                        {/* {console.log(mediaFiles, "mediaFiles")} */}
                        {mediaFiles?.map((item, i) => {
                            return (
                                <>
                                    {item.hasOwnProperty('isDeleted') ?
                                        <>
                                            {!item?.isDeleted && <div className='image-box mb-3' key={i}>
                                                <button type='button' className='remove-image' onClick={() => handleRemoveMedia(i)}><i className='fas fa-times fw-500' /></button>
                                                {item?.fileType === 1 ? (
                                                    <img
                                                        src={
                                                            typeof item?.fileName === 'object'
                                                                ? URL.createObjectURL(item?.fileName)
                                                                : item?.fileName?.trim()
                                                        }
                                                        className='image-fit image-fit-thumbnail'
                                                        alt={`Image ${i}`}
                                                        style={{
                                                            maxWidth: '100%', /* Set the maximum width of the thumbnail to the container width */
                                                            maxHeight: '200px', /* Set the maximum height of the thumbnail */
                                                            width: 'auto',
                                                            height: 'auto'
                                                        }} // Adjust the values accordingly
                                                    />
                                                ) : (
                                                    <video
                                                        src={
                                                            typeof item?.fileName === 'object'
                                                                ? URL.createObjectURL(item?.fileName)
                                                                : item?.fileName?.trim()
                                                        }
                                                        controls
                                                        className="image-fit"
                                                        alt={`Video ${i}`}
                                                        style={{
                                                            maxWidth: '100%', /* Set the maximum width of the thumbnail to the container width */
                                                            maxHeight: '200px', /* Set the maximum height of the thumbnail */
                                                            width: 'auto',
                                                            height: 'auto'
                                                        }} // Adjust the values accordingly
                                                    />
                                                )}
                                            </div>}
                                        </>
                                        :
                                        <div className='image-box mb-3' key={i}>
                                            <button type='button' className='remove-image' onClick={() => handleRemoveMedia(i)}><i className='fas fa-times fw-500' /></button>
                                            {item?.fileType === 1 ? (
                                                <img
                                                    src={
                                                        typeof item?.fileName === 'object'
                                                            ? URL.createObjectURL(item?.fileName)
                                                            : item?.fileName?.trim()
                                                    }
                                                    className='image-fit image-fit-thumbnail'
                                                    alt={`Image ${i}`}
                                                    style={{
                                                        maxWidth: '100%', /* Set the maximum width of the thumbnail to the container width */
                                                        maxHeight: '200px', /* Set the maximum height of the thumbnail */
                                                        width: 'auto',
                                                        height: 'auto'
                                                    }} // Adjust the values accordingly
                                                />
                                            ) : (
                                                <video
                                                    src={
                                                        typeof item?.fileName === 'object'
                                                            ? URL.createObjectURL(item?.fileName)
                                                            : item?.fileName?.trim()
                                                    }
                                                    controls
                                                    className="image-fit"
                                                    alt={`Video ${i}`}
                                                    style={{
                                                        maxWidth: '100%', /* Set the maximum width of the thumbnail to the container width */
                                                        maxHeight: '200px', /* Set the maximum height of the thumbnail */
                                                        width: 'auto',
                                                        height: 'auto'
                                                    }} // Adjust the values accordingly
                                                />
                                            )}
                                        </div>
                                    }
                                </>
                            )
                        })}


                    </div>
                </div> : <></>}

                {/* buttons area */}
                <div className="buttons-area">
                    <ul className="attach-list">
                        <li onClick={() => handleTogglePhotoModal('photos')}><i className="icon-photo" />Photo</li>
                        <li onClick={() => handleTogglePhotoModal('videos')}><i className="icon-video" />Video</li>
                        {/* <li><i className="icon-file" />File</li> */}
                    </ul>
                    <div className="action-buttons">
                        <button type="button" className="btn btn-transparent" onClick={handleCancel}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Post</button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
}

export default CreatePostModal;