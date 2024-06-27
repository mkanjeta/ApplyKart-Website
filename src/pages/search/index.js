"use client";
import { Fragment, useEffect, useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
// import * as action from "redux/actions/timelineActions";
import * as action from "redux/actions/networkActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getJobBrowseList} from "redux/actions/jobBrowse";
import TimelineHeader from "components/shared/timelineHeader";
import DashboardComp from "components/dashboard/dashboardComp";
import { CONNECT_REQUEST_CLEAR } from 'redux/actionTypes/network.actionTypes';

const Searchpage = () => {
  const router = useRouter();

  const [data, setData] = useState(() => []);
  const {
    jobBrowseList,
    loading
  } = useSelector(({ jobBrowseReducer }) => jobBrowseReducer);

  const { networkSuggestions,loading:Netloading,connectRequest } = useSelector(({ networkReducer }) => networkReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (router?.query?.search && router?.query?.search.trim() != "") {
      let obj = {
        search: router?.query?.search,
        pageNo: 1
      };
      dispatch(getJobBrowseList(obj));
      dispatch(action.getNetworkSuggestionsList({
        pageNo: 1,
        pageSize: 5,
        searchText: router?.query?.search
        })
      );
    } else {
      let obj = {
        search: "",
        pageNo:1,
      };
      dispatch(getJobBrowseList(obj));
      dispatch(action.getNetworkSuggestionsList({
        pageNo: 1,
        pageSize: 5,
        searchText: ""
        })
      );
    }
  }, [router?.query?.search]);

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

  const handleConnectRequest = (item) => {
    dispatch(action.connectRequestAction({
          toUserId: item?.userId
  }));
  }

  useEffect(() => {
    if (connectRequest?.success) {
        dispatch({ type: CONNECT_REQUEST_CLEAR });
        dispatch(action.getNetworkSuggestionsList({
            pageNo: 1,
            pageSize: 5,
            searchText: router?.query?.search
        }));
    }
}, [connectRequest?.success])

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main_wrapper wrapper_style_two">
        <TimelineHeader searchText={router?.query?.search}/>
        <div className="container">
          <div className="right_side dashboard" id="right_side">
            <div className="row content-wrap">
            <h2>Search Results</h2>
              <div className="row">
                <div className="col-md-6">
                  <div className="dashboard_title_bar">
                    <h3 className="title"> Jobs</h3>
                    <button
                      type="button"
                      className={`connect-btn mb-0 primary`}
                      style={{ marginLeft: "auto" }}
                    >
                      View All
                    </button>
                  </div>

                    <div className="position-relative" style={{minHeight:"100px"}}>
                    {loading && 
                    <div className="loader blob-loader-bg">
                      <div className="bg-blur position-absolute"></div>
                      <div className="loading position-absolute" style={{width:"100%",height:"100%"}}>
                        <span className="blob1 blob"></span>
                        <span className="blob2 blob"></span>
                        <span className="blob3 blob"></span>
                      </div>
                    </div>}
                    {data && data.length > 0 && 
                      data.slice(0, 5).map((item, i) => (
                        <DashboardComp key={i} jobBrowseListById={item} hideMap={true} />
                      ))
                    }
                    {!loading && data.length == 0 ? (
                    <div className="card col-12 p-0">
                      <div className="card-body">
                        <p className="text-center">No Job Found !!</p>
                      </div>
                    </div>
                  ):(
                      <></>
                  )}
                    </div>
                </div>
                <div className="col-md-6">
                <div className="dashboard_title_bar">
                  <h3 className="title"> Users</h3>
                  <button
                    type="button"
                    className={`connect-btn mb-0 primary`}
                    style={{ marginLeft: "auto" }}
                  >
                    View All
                  </button>
                </div>
                <div className="col-xl-12 search-users row position-relative" style={{minHeight:"100px"}}>
                {Netloading && 
                    <div className="loader blob-loader-bg">
                      <div className="bg-blur position-absolute"></div>
                      <div className="loading position-absolute" style={{width:"100%",height:"100%"}}>
                        <span className="blob1 blob"></span>
                        <span className="blob2 blob"></span>
                        <span className="blob3 blob"></span>
                      </div>
                    </div>}
                  {networkSuggestions?.data?.length > 0 ?
                    networkSuggestions?.data.map((item, index) => {
                      return (
                        <div key={index} className="card col-12 p-0">
                          <div className="img-avatar">
                            <img
                            className="rounded-pill h-100"
                              src={
                                item?.profilePic?.trim() ||
                                "/assets/images/profile.jpg"
                              }
                              alt="profile-img"
                            />
                          </div>
                          <div className="card-text">
                            <div className="portada"></div>
                            <div className="title-total">
                              <h5>
                                <Link href={`/timeline/${item?.userId}`}>
                                  {item?.firstName + " " + item?.lastName}
                                </Link>
                              </h5>
                              <div className="title">{item?.jobTitle ? (item?.jobTitle || '-' , item?.company || '-') : 'User'}</div>

                              <div className="desc"><i className='icon-Icon-feather-map-pin' /> {item?.location || '-'}</div>
                            </div>
                            <div className="d-flex justify-content-end align-items-center px-2 px-md-3">
                            {item?.connectionStatus === 4 ?
                                        (
                                          <button
                                              type='button'
                                              className='connect-btn warning'
                                              disabled
                                          >
                                              <i className='icon-connect' /> Pending
                                          </button>
                                        )
                                        : (
                                          <button
                                              type='button'
                                              className='connect-btn primary'
                                              onClick={() => handleConnectRequest(item)}
                                          >
                                              <i className='icon-connect' /> Connect
                                          </button>
                                        )
                                    }
                              {/* <button className="btn btn-primary">
                                <i className="icon-add-user"></i> 
                                <span>{item?.connectionStatus === 4 ? " Requested" : " Connect"}</span>
                              </button> */}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  :<></>}
                  {networkSuggestions?.data && networkSuggestions?.data.length == 0 ? (
                    <div className="card col-12 p-0">
                      <div className="card-body">
                        <p className="text-center">No User Found !!</p>
                      </div>
                    </div>
                  ):(
                      <></>
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Searchpage;
