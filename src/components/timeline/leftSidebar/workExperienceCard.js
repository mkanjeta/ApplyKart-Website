import { corruptedDateFormat } from "constants/constants";
import moment from "moment";
import { useSelector } from "react-redux";

const WorkExperienceCard = () => {

    const { userDetail } = useSelector(({ timelineReducer }) => timelineReducer);

    const { workExperiences } = userDetail;


    return (
        <>
            {workExperiences?.length > 0 ?
                <div className="work-experience">
                    <div className="work-experience-head">
                        <h4>Work Experience</h4>
                        {/* <button type="button" className="edit-btn"><i className="icon-edit"></i></button> */}
                    </div>
                    <div className="work-experience-body">
                        <ul className="we-list">
                            {workExperiences &&
                                workExperiences.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {/* <div className="we-img">
                                                <img src="https://picsum.photos/200/300/" className="profile-img" alt="profile-img" />
                                            </div> */}
                                            <div className="we-info ms-0">
                                                <h4 className="c-name">{item?.company}</h4>
                                                <p className="c-designation">{item?.role}</p>
                                                <p className="c-duration">{moment(item?.start_date).format("MMM Do YYYY")} - {item?.end_date && item?.end_date !== corruptedDateFormat ? moment(item?.end_date).format("MMM Do YYYY") : 'Present'}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                : null}
        </>
    )
}

export default WorkExperienceCard;