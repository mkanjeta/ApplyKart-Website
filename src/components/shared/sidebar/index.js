import { BASE_URL } from "constants/constants";
import { Fragment, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, LoggedOut } from "redux/actions/authActions";
import Link from "next/link";
import { uploadDocuments } from "redux/actions/jobBrowse";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import AuthReducer from "redux/reducers/authReducer";
import { toggleHamburger } from "helper/helper";
import { toast } from "react-toastify";
import JobPlanModal from "components/dashboard/jobs/post-job/post-job-modals/jobplanmodal";

const Sidebar = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPath = router.pathname;
  const { uplodedDocumentData } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  const { deleted, currentSubscriptionPlan } = useSelector(({ AuthReducer }) => AuthReducer);
  const [showPlan, setShowPlan] = useState(() => false);

  // console.log(currentSubscriptionPlan);

  const [show, setShow] = useState(() => false);
  const [deletestr, setDelete] = useState(() => "");
  const [error, setError] = useState(() => "");
  const [dropdown, setDropdown] = useState(() => "");


  const { status } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );

  useEffect(() => {
    if (status && status == 409) {
      setShowPlan(true);
    }
  }, [status])

  useEffect(() => {
    if (!uplodedDocumentData) {
      dispatch({ type: "GET_UPLOAD_DATA_INIT" });
    }
  }, []);

  const handleLogout = () => {
    dispatch({ type: "CLEAR_JOBS" });
    dispatch(LoggedOut());
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleAJobClick = () => {
    if (currentSubscriptionPlan?.jobsLeft > 0) {
      localStorage.setItem("isEdit", 0);
      router.push("/jobs/post-job");
    } else {
      Swal.fire({
        icon: 'error',
        title: `Your ${currentSubscriptionPlan?.planType?.toLowerCase() || 'free'} plan has ended, please purchase a subscription plan.`
      })
      setShowPlan(true);
    }
  };
  const handleDelete = () => {
    dispatch(deleteAccount());
    router?.push("/login");
  };
  return (
    <Fragment>
      <div className="logo">
        <img
          src={"/assets/images/white-logo.svg"}
          alt="logo"
          className="image-fit-contain"
        />
      </div>
      <ul className="side_menu">
        <Dropdown as="li" className={"menu-item"}>
          <Dropdown.Toggle
            as="a"
            onClick={() => {
              router?.push("/dashboard");
            }}
          >
            <span className="image">
              <img src={"/assets/images/icons/home.svg"} alt="icon" />
              <img src={"/assets/images/icons/home_blue.svg"} alt="icon" />
            </span>
            Home
          </Dropdown.Toggle>
        </Dropdown>

        <Dropdown
          as="li"
          className={
            dropdown == "profile"
              ? "menu-item has_submenu show"
              : "menu-item has_submenu"
          }
          onClick={() => {
            if (dropdown == "profile") {
              setDropdown("");
            } else {
              setDropdown("profile");
            }
          }}
          show={dropdown == "profile"}
        >
          <Dropdown.Toggle
            as="a"
            id="dropdown-three"
            className={currentPath.includes("/profile") ? "active" : ""}
          >
            <span className="image">
              <img
                src={"/assets/images/icons/my_profile_white.png"}
                alt="icon"
              />
              <img
                src={"/assets/images/icons/my_profile_blue.png"}
                alt="icon"
              />
            </span>
            My Profile
          </Dropdown.Toggle>
          <Dropdown.Menu show>
            <Dropdown.Item
              className={currentPath.includes("/profile") ? "active" : ""}
            >
              <Link href="/profile">View Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item
              className={currentPath === "/post-profile" ? "active" : ""}
            >
              <Link href="/profile/post-profile">View Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item
              className={currentPath === "/profile/my-vcard" ? "active" : ""}
            >
              <Link href="/profile/my-vcard">My V-Card</Link>
            </Dropdown.Item>

            <Dropdown.Item
              className={currentPath === "/profile/calendar" ? "active" : ""}
            >
              <Link href="/profile/calendar">Calendar</Link>
            </Dropdown.Item>
            <Dropdown.Item
              className={currentPath === "/change-password" ? "active" : ""}
            >
              <Link href="/change-password">Change Password</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown
          as="li"
          className={
            dropdown == "myjobs"
              ? "menu-item has_submenu show"
              : "menu-item has_submenu"
          }
          onClick={() => {
            if (dropdown == "myjobs") {
              setDropdown("");
            } else {
              setDropdown("myjobs");
            }
          }}
          show={dropdown == "myjobs"}
        >
          <Dropdown.Toggle
            as="a"
            id="dropdown-one"
            className={currentPath.includes("/jobs") ? "active" : ""}
          >
            <span className="image">
              <img src={"/assets/images/icons/bag.svg"} alt="icon" />
              <img src={"/assets/images/icons/bag_blue.png"} alt="icon" />
            </span>
            My Jobs
          </Dropdown.Toggle>
          <Dropdown.Menu show>
            <Dropdown.Item
              className={currentPath === "/dashboard" ? "active" : ""}
            >
              <Link href="/dashboard">All</Link>
            </Dropdown.Item>
            <Dropdown.Item
              className={
                currentPath === "/jobs" || "/jobs/details" ? "active" : ""
              }
            >
              <Link href="/jobs">Applied Jobs</Link>
            </Dropdown.Item>
            <Dropdown.Item
              className={currentPath === "/jobs/favorite" ? "active" : ""}
            >
              <Link href="/jobs/favorite">Favorite</Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleAJobClick}>
              Post a New Job
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as="li" className="menu-item">
          <Link href="#">
            <Dropdown.Toggle
              as="a"
              id="dropdown-two"
              className={currentPath.includes("/chat") ? "active" : ""}
              onClick={() => {
                window.location = "/chat";
              }}
            >
              <span className="image">
                <img
                  src={"/assets/images/icons/message_white.png"}
                  alt="icon"
                />
                <img src={"/assets/images/icons/message_blue.png"} alt="icon" />
              </span>
              Message
            </Dropdown.Toggle>
          </Link>
        </Dropdown>

        <Dropdown as="li" className="menu-item">
          <Link href='' onClick={(e) => {
            e.preventDefault();
          }}>
            <Dropdown.Toggle
              as="a"
              id="dropdown-two"
              // className={currentPath.includes("/chat") ? "active" : ""}
              onClick={() => {
                // window.location = "/chat";
                setShowPlan(true);
              }}
            >
              <span className="image">
                <img
                  src={"/assets/images/icons/subscription.png"}
                  alt="icon"
                />
                <img src={"/assets/images/icons/subscription.png"} alt="icon" />
              </span>
              Subscription
            </Dropdown.Toggle>
          </Link>
        </Dropdown>
        {/* : (currentPath === "/profile" ? "menu-item" : "menu-item") */}
        <Dropdown
          as="li"
          className={
            dropdown == "legal"
              ? "menu-item has_submenu show"
              : "menu-item has_submenu"
          }
          onClick={() => {
            if (dropdown == "legal") {
              setDropdown("");
            } else {
              setDropdown("legal");
            }
          }}
          show={dropdown == "legal"}
        >
          <Dropdown.Toggle
            as="a"
            id="dropdown-four"
            className={
              currentPath.includes("/faq") ||
                currentPath.includes("/about") ||
                currentPath.includes("/contact") ||
                currentPath.includes("/privacy") ||
                currentPath.includes("/terms")
                ? "active"
                : ""
            }
          >
            <span className="image">
              <img src={"/assets/images/icons/legal.svg"} alt="icon" />
              <img src={"/assets/images/icons/legal_blue.svg"} alt="icon" />
            </span>
            Legal
          </Dropdown.Toggle>
          <Dropdown.Menu show>
            <Dropdown.Item className={currentPath === "/faq" ? "active" : ""}>
              <Link href="/faq">FAQ's</Link>
            </Dropdown.Item>
            <Dropdown.Item className={currentPath === "/about" ? "active" : ""}>
              <Link href="/about">About Us</Link>
            </Dropdown.Item>
            <Dropdown.Item
              className={currentPath === "/contact" ? "active" : ""}
            >
              <Link href="/contact">Contact Us</Link>
            </Dropdown.Item>
            <Dropdown.Item
              className={currentPath === "/privacy" ? "active" : ""}
            >
              <Link href="/privacy">Privacy Policy</Link>
            </Dropdown.Item>
            <Dropdown.Item className={currentPath === "/terms" ? "active" : ""}>
              <Link href="/terms">Terms & Conditions</Link>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setShow(true);
              }}
            >
              Delete Account
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Modal
          size="sm"
          className="custom_modal"
          centered
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <Modal.Header>
            <Modal.Title className="fw-600">Are You sure?</Modal.Title>
            <button
              type="button"
              className="btn-close m-0"
              aria-label="Close"
              onClick={() => {
                setShow(false);
              }}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <form className="setavailablity image_radio basic checkbox">
              <div className="form-group password_icon">
                <label className="text-black">
                  This action cannot be undone. Are you sure you want to delete
                  your account?
                </label>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              onClick={() => {
                setShow(false);
              }}
              className="btn btn-warning mx-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleDelete}
              className="btn btn-warning mx-auto"
            >
              Confirm
            </button>
          </Modal.Footer>
        </Modal>

        <li className="menu-item logout">
          <a href="#" onClick={handleLogout}>
            <span className="image">
              <img src={"/assets/images/icons/logout.png"} alt="icon" />
            </span>
            Logout
          </a>
        </li>
      </ul>
      <JobPlanModal showPlanModal={showPlan} closeModal={() => { setShowPlan(false) }} />
    </Fragment>
  );
};
export default Sidebar;
