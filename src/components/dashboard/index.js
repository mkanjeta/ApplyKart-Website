'use client';
import { Fragment, useEffect, useState, useRef } from "react";
import { Accordion, ProgressBar } from "react-bootstrap";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
import Filter from "components/shared/filter";
import { BASE_URL } from "constants/constants";
import Router from "next/router";
import Pagination from "react-responsive-pagination";
import Link from "next/link";

// For map
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getJobBrowseList,
  getJobTypeList,
  particularJobDetail,
  postFavoriteJob,
} from "redux/actions/jobBrowse";
import {
  getJobCategory,
  getJobsubCategory,
} from "redux/actions/categoryActions";
import { getSystemErrorName } from "util";
import DashboardComp from "./dashboardComp";
import Swal from "sweetalert2";
import Loader from "components/shared/loader";
import { toggleHamburger } from "../../helper/helper";
import { Dropdown } from "react-bootstrap";
import { useDebounce } from "use-debounce";
import TimelineHeader from "components/shared/timelineHeader";
import JobPlanModal from "./jobs/post-job/post-job-modals/jobplanmodal";
// import InfiniteScroll from "react-infinite-scroll-component";

// const LocationMap = dynamic(() => import("./map/Map"), {
//   ssr: false,
// });

const RecommendedJobs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isCreatedJob = router?.query?.jobType == "CREATEDJOBS";
  console.log("isCreatedJob", isCreatedJob)

  const [fav, setFav] = useState(null);
  const [data, setData] = useState(() => []);
  const {
    jobBrowseList,
    totalData,
    jobTypeList,
    url,
    favoriteJobs,
    search,
    loading,
    location
  } = useSelector(({ jobBrowseReducer }) => jobBrowseReducer);

  const { jobCategory, jobSubCategory } = useSelector(
    ({ categoryReducer }) => categoryReducer
  );

  // console.log("isCreatedJob ==>>", isCreatedJob)
  // console.log('work location', location)
  const { deleted, currentSubscriptionPlan } = useSelector(({ AuthReducer }) => AuthReducer);
  const [showPlan, setShowPlan] = useState(() => false);

  // console.log("currentSubscriptionPlan ==>>", currentSubscriptionPlan)
  const { uplodedDocumentData } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  const [filter, setFilter] = useState({ jobType: "" });

  const [category, setCategory] = useState(() => []);
  const [jobType, setJobType] = useState(() => []);
  const [subCategory, setSubCategory] = useState(() => []);
  const [pageNo, setPageNo] = useState(() => 1);
  const listInnerRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [value] = useDebounce(searchText, 1000);
  const [localStorageData, setLocalStorageData] = useState(null);
  const [experience, setExperience] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let localStorageData = localStorage?.getItem("applyKart");
      localStorageData = JSON.parse(localStorageData);

      setLocalStorageData(localStorageData);
    }
  }, []);

  // console.log("job type ==>", jobType)
  useEffect(() => {
    if (search && search.trim() != '') {
      let obj = {
        search: router?.query?.search ? router?.query?.search : search ? search : "",
        workLocation: router.query?.location ? router.query?.location : location ? location : "",
        pageNo: 1,
        jobType: jobType,
        category: category,
        isCreatedJob: isCreatedJob,
        Experience: experience
      };
      // console.log(obj);
      dispatch(getJobBrowseList(obj));
    } else {
      let obj = {
        search: router?.query?.search ? router?.query?.search : search ? search : "",
        WorkLocation: router.query?.location ? router.query?.location : location ? location : "",
        pageNo,
        jobType: jobType,
        category: category,
        isCreatedJob: isCreatedJob,
        Experience: experience
      };
      // console.log(obj, router);
      dispatch(getJobBrowseList(obj));
      // setPageNo(1);
    }
  }, [pageNo, router?.query?.location, router.asPath, jobType, category, isCreatedJob]);

  useEffect(() => {
    dispatch(getJobCategory());
    dispatch(getJobTypeList());
    dispatch({ type: "GET_JOB_SEEKER_DETAIL_INIT" });
  }, [dispatch]);

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

  useEffect(() => {
    if (jobBrowseList) {
      if (jobBrowseList?.jobs) {
        setData(jobBrowseList?.jobs);
      } else if (jobBrowseList?.data) {
        setData(jobBrowseList?.data);
      } else {
        setData([]);
      }
    }
  }, [jobBrowseList]);

  // const [currentPage, setCurrentPage] = useState(1);

  const filterWithoutLogin = (jobTypeList?.length > 0 || jobCategory?.length > 0) || false;

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main_wrapper">
        <TimelineHeader />
        <div className="container">
          <div className="right_side dashboard" id="right_side">
          
            {loading && <Loader />}

            <Filter
              jobType={jobType}
              category={category}
              pageNo={pageNo}
              setPageNo={setPageNo}
              searchText={searchText}
              setSearchText={setSearchText}
              value={value}
              setExperience={setExperience}
              experience={experience}
            />

            <div className="row">

              {(filterWithoutLogin) && (
                <div className="col-xl-3">
                  {/* Filter */}
                  <form className="side_filter">
                    <h5 className="title">Filter</h5>

                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header
                          as="div"
                        // style={{ fontWeight: "bold", color: "black" }}
                        >
                          Job type
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="image_radio basic checkbox">
                            {jobTypeList?.map((item, index) => (
                              <div key={index} className="form-check">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    onChange={(e) => {
                                      if (jobType.includes(item?.job_Type_id)) {
                                        let arr = jobType.filter(
                                          (val) => val != item?.job_Type_id
                                        );
                                        // console.log(arr);
                                        setJobType([...arr]);
                                      } else {
                                        let arr = [...jobType];
                                        arr = [...arr, item?.job_Type_id];
                                        setJobType([...arr]);
                                      }
                                    }}
                                    type="checkbox"
                                    name="flexRadioDefault"
                                    id={item?.job_Type_id}
                                    checked={jobType.includes(item?.job_Type_id)}
                                  />
                                  <span className="icon">
                                    {!jobType.includes(item?.job_Type_id) && (
                                      <img
                                        src="/assets/images/icons/checkbox/inactive.svg"
                                        alt="icon"
                                      />
                                    )}
                                    {jobType.includes(item?.job_Type_id) && (
                                      <img
                                        src="/assets/images/icons/checkbox/active.svg"
                                        alt="icon"
                                      />
                                    )}
                                  </span>
                                  <div className="text">{item?.job_Type}</div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>

                      <Accordion.Item eventKey="1">
                        <Accordion.Header as="div">Category</Accordion.Header>
                        <Accordion.Body>
                          <div className="image_radio basic checkbox">
                            {jobCategory?.jobCategories?.map((item, index) => (
                              <div key={index} className="form-check">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    onChange={(e) => {
                                      if (
                                        category.includes(item?.job_Category_id)
                                      ) {
                                        let arr = category.filter(
                                          (val) => val != item?.job_Category_id
                                        );
                                        setCategory([...arr]);
                                      } else {
                                        let arr = [...category];
                                        arr = [...arr, item?.job_Category_id];
                                        setCategory([...arr]);
                                      }
                                    }}
                                    type="checkbox"
                                    name="flexRadioDefault"
                                    id={item?.job_Category_id}
                                    checked={category.includes(
                                      item?.job_Category_id
                                    )}
                                  />
                                  <span className="icon">
                                    {!category.includes(
                                      item?.job_Category_id
                                    ) && (
                                        <img
                                          src="/assets/images/icons/checkbox/inactive.svg"
                                          alt="icon"
                                        />
                                      )}
                                    {category.includes(item?.job_Category_id) && (
                                      <img
                                        src="/assets/images/icons/checkbox/active.svg"
                                        alt="icon"
                                      />
                                    )}
                                  </span>
                                  <div className="text">{item?.job_Category}</div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </form>
                  {/* Filter */}
                </div>
              )}
              <div className={`col-xl-${filterWithoutLogin ? '7' : '9'}`}>
                <div className="dashboard_title_bar">
                  <h3 className="title"> Jobs

                    {!loading ? (
                      <small style={{ marginLeft: "10px" }}>
                        {" "}
                        {(pageNo - 1) * 50 + data.length}/{totalData}
                      </small>
                    ) : (
                      <></>
                    )}
                  </h3>
                  <form></form>

                  {/* pagination */}
                  <div className="style-pagination mb-1">
                    <Pagination
                      current={pageNo}
                      total={parseInt(totalData / 50 + 1)}
                      onPageChange={setPageNo}
                    />
                  </div>
                </div>
                {/* Job Box */}
                {/* {console.log("data ==>>", data)} */}
                {/* {search && (
                  data &&
                  data.length > 0 && (
                    <div
                      className="row"
                    >
                      {data.map((item, index) => (
                        <div
                          className="col-xl-4 col-md-6 col-12"
                          style={{ padding: "1rem" }}
                          key={item?.index}
                        >
                          <div
                            key={index}
                            className="v_card fixed-height"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="image">
                              <img
                                src={item?.profile_pic}
                                style={{ borderRadius: "50%" }}
                                className="image-fit"
                                alt="img"
                                id={`profilepic${index}`}
                                onError={() => {
                                  imageError(`profilepic${index}`);
                                }}
                              />
                            </div>
                            <div
                              className="card_content section-bg no-overlay position-relative overflow-visible"
                              style={{
                                background:
                                  "center / cover no-repeat url(" +
                                  BASE_URL +
                                  "/../assets/images/v_card_bg.png),transparent linear-gradient(90deg, #0000FF 0%, #1CB5E0 100%)",
                              }}
                            >
                              <div className="user_info">
                                <h5 className="name">
                                  {item?.first_name} {item?.last_name || ""}
                                </h5>
                                <p className="designation">
                                  {item?.job_title || ""}
                                </p>
                                <ul className="user_data">
                                  <li>
                                    <span className="icon">
                                      <img
                                        src={
                                          "/assets/images/icons/experience.svg"
                                        }
                                        alt="icon"
                                        className="image-fit-contain"
                                      />
                                    </span>
                                    {item?.total_experience
                                      ? `${item?.total_experience}`
                                      : "0 years"}
                                  </li>
                                  <li style={{ borderRight: "none" }}>
                                    <span className="icon">
                                      <img
                                        src={"/assets/images/icons/location.svg"}
                                        alt="icon"
                                        className="image-fit-contain"
                                      />
                                    </span>
                                    {item?.location
                                      ? item?.location.split(",")[0]
                                      : ""}
                                  </li>
                                  <li>
                                    <span className="icon">
                                      <img
                                        src={"/assets/images/icons/language.svg"}
                                        alt="icon"
                                        className="image-fit-contain"
                                      />
                                    </span>
                                    {item?.language
                                      ? item?.language.length > 1
                                        ? "Multilingual"
                                        : item?.language[0].language
                                      : ""}
                                  </li>
                                </ul>
                                {item?.skills && !!item?.skills?.length ? (
                                  <>
                                    {item?.skills
                                      .filter((item, index) => {
                                        if (index <= 2) return item;
                                      })
                                      .map((val) => (
                                        <button
                                          type="button"
                                          className="tag"
                                          key={val?.Skill_id}
                                        >
                                          {val?.Skill}
                                        </button>
                                      ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )} */}

                {data && data.length > 0 && (
                  <div>
                    {data.map((item, i) => (
                      <DashboardComp
                        key={i}
                        jobBrowseListById={item}
                      />
                    ))}
                    <Pagination
                      current={pageNo}
                      total={parseInt(totalData / 50 + 1)}
                      onPageChange={setPageNo}
                    />
                  </div>
                )}
              </div>
                
              <div className="col-xl-2 text-center">
                <h6 className="mt-3 text-dark">Download Our App</h6>
              <img src="/assets/images/applykart-portal.png" />

              <a href="https://play.google.com/store/apps/details?id=com.applykart" target="blank" className="my-3 btn btn-warning">Play Store</a>

              <a href="https://apps.apple.com/us/app/applykart/id1638867413" target="blank" className="btn btn-warning">App Store</a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />
        <JobPlanModal showPlanModal={showPlan} closeModal={() => { setShowPlan(false) }} />
      </main>
    </Fragment>
  );
};

export default RecommendedJobs;
