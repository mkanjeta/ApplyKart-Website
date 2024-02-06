import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Button } from "react-bootstrap";
import { useRouter } from 'next/router'
import { createChannelForUser } from "redux/actions/workActions";
import * as networkAction from "../../../redux/actions/networkActions";
import * as timeLineAction from '../../../redux/actions/timelineActions';

export const ConnectButton = ({ connectionStatus, userId }) => {
    // console.log("connection status ==>>", connectionStatus)
    // console.log("user ==>>", userId)
    const dispatch = useDispatch();
    const { removeRequest, connectRequest } = useSelector(({ networkReducer }) => networkReducer);

    // console.log(removeRequest, connectRequest)

    useEffect(() => {
        if (removeRequest?.success || connectRequest?.success) {
            dispatch(timeLineAction.getTimelineUser({
                userId
            }));
        }
    }, [removeRequest, connectRequest])

    const handleConnect = () => {
        dispatch(networkAction.connectRequestAction({
            toUserId: userId
        }))
    }

    const handleRemove = () => {
        dispatch(networkAction.removeRequestAction({
            fromUserId: userId
        }))
    }

    if (connectionStatus == 0 || connectionStatus == 2) {
        return (
            <div>
                <Button
                    className="connect-btn primary mt-1"
                    onClick={handleConnect}
                    style={{ minHeight: "40px" }}
                >
                    <span className="px-1"><i className='icon-connect' /> Connect</span>
                </Button>

                {/* <button type='button' className='connect-btn primary' onClick={() => handleConnectRequest(item)}><i className='icon-connect' /> Connect</button> */}
            </div>
        )
    } else if (connectionStatus == 1) {
        return (
            <div>
                <Button
                    className="connect-btn danger mt-1"
                    onClick={handleRemove}
                    style={{ minHeight: "40px" }}
                >
                    <span className="px-1"><i className='icon-reject' /> Remove</span>
                </Button>

                {/* <button type='button' className='connect-btn danger' onClick={() => handleRemoveRequest(item)}><i className='icon-reject' /> Remove</button> */}
            </div>
        )
    } else if (connectionStatus == 4) {
        return (<div>
            <Button
                className="connect-btn primary mt-1"
                // onClick={handleSendMessageButton}
                style={{ minHeight: "40px" }}
            >
                <span className="px-1"><i className='icon-connect' /> Pending</span>
            </Button>

            {/* <button type='button' className='connect-btn danger' onClick={() => handleRemoveRequest(item)}><i className='icon-reject' /> Remove</button> */}
        </div>
            // <i className='icon-connect' /> Pending
        )
    }
}

const ProfileCard = (props) => {
    const dispatch = useDispatch();
    const { userDetail } = useSelector(({ timelineReducer }) => timelineReducer);
    const { myProfile } = useSelector(({ myProfileReducer }) => myProfileReducer);
    const { channelData } = useSelector(({ vcardWorkReducer }) => vcardWorkReducer);
    const [userName, setUserName] = useState('');
    const router = useRouter();
    const [applyKartData, setApplyKartData] = useState('');

    // let applyKartData = {};
    useEffect(() => {
        applyKartData = JSON.parse(
            localStorage.getItem("applyKart")
        );
        setApplyKartData(applyKartData)
        // console.log(applyKartData);    
    }, []);

    // console.log("user details ==>>", userDetail)
    // console.log("myProfile ==>>", myProfile)
    // console.log("applyKartData ==>>", applyKartData)

    const handleSendMessageButton = () => {
        // console.log("my profile ==>>", myProfile)
        const channelId = myProfile?.channelId;
        if (channelId) {
            // router.push("/chat");
            window.location.href = "/chat"
        } else {
            createChannelId();
        }
    }

    const createChannelId = async () => {
        const obj = {
            responderId: userDetail?.userId,
        };
        dispatch(createChannelForUser(obj));
        // router.push("/chat");
        window.location.href = "/chat"
    }

    useEffect(() => {
        if (userDetail?.firstName || userDetail?.lastName) {
            setUserName(`${userDetail?.firstName} ${userDetail?.lastName}`);
        } else {
            if (typeof window != undefined) {
                applyKartData = JSON.parse(
                    localStorage.getItem("applyKart")
                );
                setUserName(applyKartData?.userName);
            }
        }
    }, [userDetail]);

    return (
        <>
            <div className="profile-card mdx-sticky">
                <div className="pc-head">
                    <div className="p-user-name">
                        <h4 className="text-capitalize">{userName}</h4>
                        <p>{userDetail?.designation}</p>
                    </div>
                    <div className="percentage-bar">
                        <CircularProgressbar value={myProfile?.profileCompletedPercentage || 0} text={`${myProfile?.profileCompletedPercentage || 0}%`} styles={buildStyles({
                            strokeLinecap: 'round',
                            textSize: '28px',
                            pathTransitionDuration: 0.5,
                            pathColor: `#ffffff`,
                            textColor: '#ffffff',
                            trailColor: '#4c5dfb',
                            backgroundColor: '#ffffff',
                        })} />
                    </div>
                </div>
                <div className="profile-img">
                    <img
                        src={userDetail?.profilePic?.trim() || "/assets/images/profile.jpg"}
                        alt={userDetail?.firstName}
                        onError={(e) => {
                            e.target.onerror = null; // Avoid potential infinite loop
                            e.target.src = "/assets/images/profile.jpg"; // Fallback image in case of an error
                        }}
                    />
                </div>

                <div className="pc-footer">
                    <ul className="follow-info">
                        <li><i className="icon-network_selected"></i> {userDetail?.totalFollowingCount} <span>Followings</span></li>
                        <li><i className="icon-accept"></i> {userDetail?.totalFollowersCount} <span>Followers</span></li>
                    </ul>

                    <div className="d-flex justify-content-between">
                        {/* to send message for all users we kept a button here */}
                        {/* MSG BUTTON ONLY ENABLE FOR PROD OR LOCALHOST */}
                        {
                            Object.keys(applyKartData).length > 0 && (applyKartData?.userId != userDetail?.userId) && (
                                <div>
                                    <Button
                                        className="btn px-2"
                                        onClick={handleSendMessageButton}
                                    >
                                        <img src="/assets/images/msg-send.svg" />
                                        <span className="px-1">Message</span>
                                    </Button>
                                </div>
                            )
                        }
                        {/* {userDetail && <p>{userDetail?.description} hhh</p>} */}
                        {
                            Object.keys(applyKartData).length > 0 && (applyKartData?.userId != userDetail?.userId) && (
                                <ConnectButton
                                    connectionStatus={userDetail?.connectionStatus}
                                    userId={userDetail?.userId}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard;