import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import timelineReducer from "redux/reducers/timelineReducer";
import * as action from "../../../redux/actions/timelineActions";

const SidebarProfileSuggestions = () => {
    const dispatch = useDispatch();
    const { suggestedUsers } = useSelector(({ timelineReducer }) => timelineReducer)

    useEffect(() => {
        dispatch(action.getSuggestedUsers());
    }, []);

    const handleSendConnectionRequest = (userId) => {
        dispatch(action.sendConnectionRequest({toUserId: userId}));
    }

    return (
        <ul className="profile-suggestions">
            {suggestedUsers &&
                suggestedUsers.map((item, index) => {
                    return (
                        <li key={index}>
                            <div className="p-img">
                                <img src={item?.profilePic?.trim()} alt="profile-img" />
                            </div>
                            <h4 className="p-name">
                                <Link href={`/timeline/${item?.userId}`}>
                                    {item?.firstName + " " + item?.lastName}
                                </Link>
                            </h4>
                            {item?.jobTitle && <p className="p-designation">{item?.jobTitle}</p>}
                            {item?.location && <p className="p-location"><i className="icon-Icon-feather-map-pin" /> {item?.location}</p>}
                            <button 
                                type="button" 
                                className={`connect-btn mx-auto mb-0 ${item?.connectionStatus !== 4 ? 'primary' : ''}`} 
                                disabled={item?.connectionStatus === 4}
                                onClick={() => handleSendConnectionRequest(item?.userId)}
                            >
                                <i className='icon-connect' />
                                {
                                    item?.connectionStatus === 4 && (    
                                        <span>
                                            Requested
                                        </span>
                                    )
                                }
                                
                                {
                                    item?.connectionStatus !== 4 && (
                                        <span>
                                            Connect
                                        </span>
                                    )
                                }
                                
                                {/* <i className="icon-add-user"></i> {item?.connectionStatus === 4 ? 'Requested' : 'Connect'} */}
                            </button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default SidebarProfileSuggestions;