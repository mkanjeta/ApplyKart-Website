import { BASE_URL } from "constants/constants";
import { useEffect, useInsertionEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobBrowseList } from "redux/actions/jobBrowse";
import { Dropdown, Row } from "react-bootstrap";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";
import { toggleHamburger } from "../../../helper/helper";
import JobPlanModal from "components/dashboard/jobs/post-job/post-job-modals/jobplanmodal";
import Swal from "sweetalert2";
import TimelineHeader from "../timelineHeader";

const TopBar = (props) => {
  // console.log(props);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [profile, setProfile] = useState(
    () => "/assets/images/placeholder.jpg"
  );
  // const [searchText, setSearchText] = useState("");
  // const [value] = useDebounce(props.searchText, 1000);
  const { search, location, notifications } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  ); 
  const { deleted, currentSubscriptionPlan } = useSelector(({ AuthReducer }) => AuthReducer);
  const [showPlan, setShowPlan] = useState(()=>false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("applyKart")) {
        const { userName, profilePic } = JSON.parse(
          localStorage.getItem("applyKart")
        );

        setName(userName);
        setProfile(profilePic);
        dispatch({ type: "GET_NOTIFICATION_INIT" });
      }
    }
  }, []);
  // console.log('Location', location);
  useEffect(() => {
    // console.log(props.value);
    // if (value) {
    const obj = {
      search: props?.value,
      WorkLocation: router?.query?.location ? router?.query?.location : location ? location : "",
      jobType: props?.jobType,
      category: props?.category,
    };
    dispatch(getJobBrowseList(obj));
  }, [props?.value]);

  useEffect(() => {
    if (search) {
      props?.setSearchText(search);
    }
  }, [props?.search]);

  // const handleShow = () => {
  //   setShow((prev) => !prev);
  // };
  return (
    <>
    {/* <div className="topbar dashboard_bar" id="scroll-helper">
      <Row className="w-100 align-items-center">
        <div className="col-sm">
          <div className="input-group search_bar">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fal fa-search" />
              </span>
            </div>
            <input
              type="text"
              name="search"
              className="form-control"
              value={props.searchText}
              placeholder={
                userTypeId == 2
                  ? "Search job by category, title or company name"
                  : "Search candidates by name, skills"
              }
              onChange={(e) => props.setSearchText(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-sm-auto">
          <div className="actions">
            <ul>
              <li className="hamburger" onClick={toggleHamburger}>
                <button type="button" className="hamburger_btn">
                  <span />
                  <span />
                  <span />
                </button>
              </li>
              <li>
                <Dropdown className="notify-dropdown">
                  <Dropdown.Toggle id="dropdown-basic" className="shadow-none">
                    <a href="#" className="notification">
                      <i className="fas fa-bell" />
                      {/* <span className="dot" /> */}
                    {/*</a>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {notifications && notifications.length > 0 ? (
                      notifications.map((item, index) => (
                        <Dropdown.Item className="notify-list" key={index}>
                          <figure className="figure-img">
                            <img
                              src="/assets/images/default-user.png"
                              className="circular-image"
                            />
                          </figure>

                          <div className="notify-data-text">
                            <p className="title-subject"></p>
                            <p className="text-subject">{item.notifyMessage}</p>
                          </div>
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item className="notify-list">
                        <figure className="figure-img"></figure>

                        <div className="notify-data-text">
                          <p className="text-subject">No Notification(s)</p>
                        </div>
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li>
                <a href="#" className="user">
                  <span>{name || ""}</span>
                  <img
                    src={profile ? profile : "/assets/images/placeholder.jpg"}
                    alt="img"
                    className="image-fit"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xl-auto">
          {userTypeId == 3 && (
            <div
              onClick={() => {
                if(currentSubscriptionPlan?.jobsLeft > 0){
                  localStorage.setItem("isEdit", 0);
                  router.push("/jobs/post-job");
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: `Your ${currentSubscriptionPlan?.planType?.toLowerCase() || 'free'} plan has ended, please purchase a subscription plan.`
                  })
                  setShowPlan(true);
                }
              }}
            >
              <button type="button" className="btn job-posted-add-btn mb-3">
                Post Now <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </Row>
      <JobPlanModal showPlanModal={showPlan} closeModal={()=>{setShowPlan(false)}}/>
    </div> */}
    <TimelineHeader/>
    </>
  );
};
export default TopBar;
