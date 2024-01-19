import EditProfileModal from 'components/modals/editProfileModal';
import LikesModal from 'components/modals/likesModal';
import MyVcard from 'components/modals/myVcard';
import React, { useState, useEffect } from 'react';
import { numberFormatStyle } from 'CommonHelper';

function ProfileCard(props) {
    const { item, data } = props;
    const [localStorageData, setLocalStorageData] = useState(null);
    const [userName, setUserName] = useState('');
    const [viewCardModal, setViewCardModal] = useState(false);
    const handleToggleViewCardModal = () => {
        setViewCardModal(!viewCardModal)
    }
    const [editProfileModal, setEditProfileModal] = useState(false);
    const handleToggleEditProfileModal = () => {
        setEditProfileModal(!editProfileModal)
    }
    const [likesModal, setLikesModal] = useState(false);
    const handleToggleLikesModal = () => {
        setLikesModal(!likesModal)
    }

    useEffect(() => {
        if(typeof window != undefined) {
            const applyKartLocalData = localStorage?.getItem("applyKart");
            if(applyKartLocalData) {
                setLocalStorageData(JSON.parse(applyKartLocalData));
            }
        }
    },[]);

    useEffect(() => {
        getName();
    },[localStorageData]);


    function getName() {
        if(item?.first_name || item?.last_name) {
            return setUserName(`${item?.first_name} ${item?.last_name}`)
        } else if(localStorageData) {
            return setUserName(`${localStorageData?.userName}`)
        } else {
            return '-'
        }
    }

    return (
        <>
            <div className='profileCardBox'>
                <div className="imageBox">
                    <img src={item?.profile_pic ? item?.profile_pic?.trim() : "/assets/images/profile.jpg"} alt={item?.first_name} className='image-fit rounded-circle image' onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                    {!props.show ? <label onClick={handleToggleEditProfileModal}>
                        {/* <input type="file" id='imageUpload' /> */}
                        <span className='icon'>
                            <i className='icon-edit' />
                        </span>
                    </label> : null}
                </div>
                <h5 className='name text-capitalize'>{userName}</h5>
                <p className='designation'>{item?.professionaldetails?.experience[0]?.job_Title || '-'}</p>
                {item?.education?.education.map((edu, i) => (
                    <p className='infoData mb-0' key={i}>
                        <span className='mb-3 d-inline-flex'>{edu?.university || '-'}</span>
                        <span className='mb-3 d-inline-flex'>{edu?.education_Level || '-'}</span>
                    </p>
                ))}

                <div className='buttonWrap mb-3'>
                    <button type='button' className='viewButton' onClick={handleToggleViewCardModal}>View V Card</button>
                </div>
                <div className='profileCardInfoWrap'>
                    <ul className='profileCardInfo'>
                        <li>
                            <span className='count'>{item?.totalFollowersCount ? numberFormatStyle(item?.totalFollowersCount) : 0}</span>
                            <p className='text mb-0'>Followers</p>
                        </li>
                        <li>
                            <span className='count'>{item?.totalFollowingCount ? numberFormatStyle(item?.totalFollowingCount) : 0}</span>
                            <p className='text mb-0'>Following</p>
                        </li>

                        {!props.show ? <li onClick={handleToggleLikesModal}>
                            <span className='count'>{item?.totalLikeCount ? numberFormatStyle(item?.totalLikeCount) : 0}</span>
                            <p className='text mb-0'>Likes</p>
                        </li> : <li>
                            <span className='count'>{item?.totalLikeCount ? numberFormatStyle(item?.totalLikeCount) : 0}</span>
                            <p className='text mb-0'>Likes</p>
                        </li>}
                    </ul>
                </div>
            </div>
            {viewCardModal ? <MyVcard action={handleToggleViewCardModal} data={item} state={viewCardModal} userName = {userName} size={"md"} /> : null}

            {editProfileModal ? <EditProfileModal action={handleToggleEditProfileModal} data={item} dataTwo={data} state={editProfileModal} size={"md"} /> : null}
            {likesModal ? <LikesModal action={handleToggleLikesModal} state={likesModal} size={"md"} /> : null}
        </>
    );
}

export default ProfileCard;