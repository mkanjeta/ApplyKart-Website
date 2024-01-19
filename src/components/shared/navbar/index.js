import React from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';


const NavBar = () => {
    const router = useRouter();


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
        </div>
    )
}

export default NavBar;