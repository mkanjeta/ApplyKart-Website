import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function NotificationBar(props) {
    const dispatch = useDispatch();
    const [notificationList, setNotificationList] = useState([]);
    const { notifications } = useSelector(
        ({ jobBrowseReducer }) => jobBrowseReducer
    );
    useEffect(() => {
        dispatch({ type: "GET_NOTIFICATION_INIT" });
    }, []);

    useEffect(() => {
        if (notifications?.length > 0) {
            const data = notifications?.map((elm) => {
                console.log("elm ==>>", elm)
                if (typeof elm.notifyPayload == "string") {
                    return (
                        elm.notifyPayload = JSON.parse(elm.notifyPayload)
                    )
                } else {
                    return elm.notifyPayload;
                }

            });
            setNotificationList(data)
        }
    }, [notifications])

    return (
        <div className={props.state ? "fixed-sidebar timeline-modal active" : "fixed-sidebar timeline-modal"}>
            <div className="modal-content">
                <div className="modal-body">
                    <div className="timeline-modal-layout">
                        <h4 className="title-header">Notifications <button type="button" className="cross-button" onClick={props.action}><i className="bi bi-x" /></button></h4>
                        <div className="p-2 pb-0">
                            <ul className='profilesLikes style_two'>
                                {notificationList?.length > 0 ? notificationList?.map((item, i) => (
                                    <li key={i}>
                                        <div className="left-side">
                                            <img src={item?.coverImage?.trim()} alt={item?.heading} className='image-fit rounded-circle image' />
                                            <div className="text">
                                                <h6 className='name'>{item?.heading}</h6>
                                                <p className='designation'>{item?.message}</p>
                                            </div>
                                        </div>
                                        <span className='time-period' style={{ lineHeight: "30px" }}>{moment.utc(item?.createdAt).fromNow()}</span>
                                    </li>
                                )) : (
                                    <div
                                        className="no-job-posted-box"
                                        style={{
                                            margin: "auto",
                                            // border : '3px solid green',
                                            padding: "10px",
                                        }}
                                    >
                                        <h6>-- No Notifications --</h6>
                                    </div>
                                )}

                                {/* <li>
                                    <div className="left-side">
                                        <i className='icon-bell image icon' />
                                        <div className="text">
                                            <h6 className='name'>Vernon Bradley posted a Job</h6>
                                            <p className='designation'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                    </div>
                                    <span className='time-period'>5m</span>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationBar;