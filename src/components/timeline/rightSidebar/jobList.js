import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import timelineReducer from "redux/reducers/timelineReducer";
import * as action from '../../../redux/actions/timelineActions';
import { useRouter } from "next/router";

export const SidebarJobList = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { topJobs } = useSelector(({ timelineReducer }) => timelineReducer);

    useEffect(() => {
        dispatch(action.getTopJobs());
    }, []);

    return (
        <ul className="rs-jobs-list">
            {topJobs &&
                topJobs.map((item, index) => {
                    return (
                        <li key={index} onClick={() => router.push('/jobs/details/' + item?.jobId)}>
                            <div className="job-img">
                                <img src={item?.companyLogo?.trim()} alt="profile-img" />
                            </div>
                            <div className="job-info">
                                <p className="job-company">{item?.role}</p>
                                <h4 className="job-title">{item?.companyName}</h4>
                                <p className="job-pay">
                                    <span>$2K - $3K</span>
                                    <span>Full Time</span>
                                </p>
                                <p className="job-location">{item?.jobLocation}</p>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default SidebarJobList;