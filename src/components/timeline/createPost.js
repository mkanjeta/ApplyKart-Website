import { useSelector } from "react-redux";

const CreatePost = (props) => {
    const { userInfo } = props;
    const handleTogglePostModal = () => {
        props.handleTogglePostModal('createPost');
    }
    const { userDetail } = useSelector(({ timelineReducer }) => timelineReducer);
    // console.log("userDetail ==>>", userDetail);

    return (
        <>
            <div className="create-post" onClick={handleTogglePostModal}>
                <div className="message-area">
                    <div className="profile-img">
                        <img
                            src={userInfo?.profilePic?.trim() || "/assets/images/profile.jpg"}
                            alt={userInfo?.userName?.trim()}
                            onError={(e) => {
                                e.target.src = "/assets/images/profile.jpg"; // Fallback image in case of an error
                            }}
                        />
                    </div>
                    <textarea
                        name=""
                        id=""
                        className="form-control bg-transparent"
                        placeholder="What do you want to talk about?"
                    ></textarea>
                </div>

                <ul className="post-attach-list">
                    <li>
                        <label htmlFor="upload-photo">
                            {/* <input type="file" className="d-none" id="upload-photo" /> */}
                            <span><i className="icon-photo"></i>Photo</span>
                        </label>
                    </li>
                    <li><label htmlFor="upload-video">
                        {/* <input type="file" className="d-none" id="upload-video" /> */}
                        <span><i className="icon-video"></i>Video</span>
                    </label></li>
                    {/* <li><label htmlFor="upload-file">
                       <input type="file" className="d-none" id="upload-file" /> 
                        <span><i className="icon-file"></i>File</span>
                    </label></li> */}
                    <li><button type="button" className="btn btn-primary">Post</button></li>
                </ul>
            </div>

        </>
    )
}
export default CreatePost;