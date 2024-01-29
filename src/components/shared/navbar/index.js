import React,{ useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import Autocomplete from "react-google-autocomplete";

const NavBar = () => {
    const router = useRouter();

    const [search, setSearch] = useState(() => "");
    const [location, setLocation] = useState(() => {
      return router.query.location ? router.query.location : ''
    });
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    function handleJobClick (jobType)  {
        if(jobType == "APPLIED_JOB") {
            window.location.href = "/jobs"
        } else if(jobType == "ALL_JOB") {
            window.location.href = "/dashboard?jobType=ALLJOBS"
        } else if(jobType == "POST_NEW_JOB") {
            window.location.href = "/jobs/post-job"
        } else if(jobType == "CREATED_JOBS") {
            window.location.href = "/dashboard?jobType=CREATEDJOBS"
        }
    }

    function handleChatClick() {
        window.location.href = "/chat"
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let obj = {
          search: search,
          WorkLocation: "",
        };
        // dispatch(getJobBrowseList(obj));
        // router?.push(`/dashboard?search=${search}&location=${location}`);
        window.location.href = `/dashboard?search=${search}&location=`;
      };

    return (
        <div className="menu-wrap">
            <ul className="main-menu">
                <li className={router.pathname === '/timeline' ? "active":''}>
                    <Link href='/timeline'><a><i className="icon-home_selected"/>Home</a></Link>
                </li>
                <li className="has-sub-menu">
                    <a onClick={(e) => {e.preventDefault()}}><i className="icon-job_unselected"/>My Jobs</a>
                    <ul className="sub-menu">
                        <li onClick={() => handleJobClick("APPLIED_JOB")}><a><span>Applied Jobs</span></a></li>
                        <li onClick={() => handleJobClick("ALL_JOB")}><a><span>All Jobs</span></a></li>
                        <li onClick={() => handleJobClick("POST_NEW_JOB")}><a><span>Post a new job</span></a></li>
                        <li onClick={() => handleJobClick("CREATED_JOBS")}><a><span>Created Jobs</span></a></li>
                    </ul>
                </li>
                <li className={router.pathname === '/timeline/network' ? "active":''}>
                    {/* <Link href={"/timeline/network"}>Network</Link> */}
                    <Link href="/timeline/network"><a><i className="icon-network_selected"/>Network</a></Link>
                </li>

                {/* Messages only enable for localhost or production server, not for http protocal */}
                <li className={router.pathname === "/chat" ? "active" : ""} onClick={handleChatClick}>
                    {/* <Link href=""> */}
                        <a><i className="icon-message_unselected"/>Messages</a>
                    {/* </Link> */}
                </li>
                
                <li className="has-sub-menu">
                    <a href="#"><i className="icon-legal_unselected"/>Legal</a>
                    <ul className="sub-menu">
                        <li><Link href="/contact"><a><span>Contact Us</span></a></Link></li>
                        <li><Link href="/privacy"><a><span>Privacy Policy</span></a></Link></li>
                        <li><Link href="/terms"><a><span>Terms & Conditions</span></a></Link></li>
                    </ul>
                </li>
            </ul>
            <form onSubmit={handleSearch}>
                  <div className="search-job-w flex-row mb-0">
                    <div className="job-title1 mb-0">
                      <span className="job-search-icons" style={{top:"13px",left:"9px"}}>
                        <img
                          src={"/assets/images/icon-search.svg"}
                          alt="search"
                        />
                      </span>
                      <input
                        type="text"
                        className="banner-searchbar"
                        placeholder="Search Jobs By Title"
                        value={search}
                        style={{minHeight:"33px",padding:"0px 10px 0px 30px"}}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-warning search-btn"
                      // onClick={handleSearch}
                      style={{fontSize:"12px",lineHeight:"12px",padding:"8px 10px"}}
                    >
                      Search Job
                      <span className="ps-2 btn-right-arrow">
                        <img
                          src={"/assets/images/right-arrow.svg"}
                          alt="right-arrow"
                        />
                      </span>
                    </button>
                  </div>
                </form>
        </div>
    )
}

export default NavBar;