import { useEffect } from "react";
import ProfileCard from "./profileCard";
import WorkExperienceCard from "./workExperienceCard";
import * as action from '../../../redux/actions/timelineActions';
import * as profileAction from '../../../redux/actions/myProfileActions';
import { useDispatch } from "react-redux";

const TimelineLeftSidebar = (props) => {
    // console.log("props ==>>", props);
    const { id } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(action.getTimelineUser({ userId: id }));
            dispatch(profileAction.getMyProfile({
                UserId: id
            }));
        }
    }, [id]);



    return (
        <div className="left-sidebar">
            <ProfileCard id={id} />
            <WorkExperienceCard />
        </div>
    )
}

export default TimelineLeftSidebar;