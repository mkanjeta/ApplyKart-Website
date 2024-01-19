import NavBar from 'components/shared/navbar';
import TimelineHeader from 'components/shared/timelineHeader';
import React, { useState } from 'react';
import Follower from './follower';
import Following from './following';
import Requests from './requests';
import Suggestions from './suggestions';
import Loader from 'components/shared/loader';
import { useSelector } from "react-redux";
import PrivateRoute from 'components/privateRoute';

function Network(props) {
    const [dataCount, setDataCount] = useState(0);
    const [activeFollower, setFollowerActive] = useState(false);
    const [activeFollowing, setFollowingActive] = useState(false);
    const [activeRequests, setRequestsActive] = useState(false);
    const [activeSuggestions, setSuggestionsActive] = useState(true);
    const { networkFollower, networkFollowing, networkRequests, networkSuggestions, loading } = useSelector(({ networkReducer }) => networkReducer);

    // console.log(networkFollower, networkFollowing, networkRequests, networkSuggestions)

    const handleNetworkToggle = (type) => {
        if (type === 0) {
            setFollowerActive(true); setFollowingActive(false); setRequestsActive(false); setSuggestionsActive(false);
        } else if (type === 1) {
            setFollowerActive(false); setFollowingActive(true); setRequestsActive(false); setSuggestionsActive(false);
        } else if (type === 2) {
            setFollowerActive(false); setFollowingActive(false); setRequestsActive(true); setSuggestionsActive(false);
        } else if (type === 3) {
            setFollowerActive(false); setFollowingActive(false); setRequestsActive(false); setSuggestionsActive(true);
        }
    }
    return (
        <PrivateRoute>
            <main className="main_wrapper wrapper_style_two">
                <TimelineHeader />
                {loading && <Loader />}
                <div className="container">
                    <div className="content-wrap">
                        <div className="left-sidebar" />
                        <div className="right-sidebar" />
                        {/* <div className="content-area">
                            <NavBar />
                        </div> */}
                    </div>
                    <ul className="network-tabs mb-xl-30 nav nav-tabs">
                        <li className='nav-item'><button type='button' onClick={() => handleNetworkToggle(3)} className={activeSuggestions ? 'nav-link active' : 'nav-link'}>{"Suggestions"}</button></li>
                        <li className='nav-item'><button type='button' onClick={() => handleNetworkToggle(0)} className={activeFollower ? 'nav-link active' : 'nav-link'}>{networkSuggestions?.totalFollowersCount || 0} Follower</button></li>
                        <li className='nav-item'><button type='button' onClick={() => handleNetworkToggle(1)} className={activeFollowing ? 'nav-link active' : 'nav-link'}>{networkSuggestions?.totalFollowingCount || 0} Following</button></li>
                        <li className='nav-item'><button type='button' onClick={() => handleNetworkToggle(2)} className={activeRequests ? 'nav-link active' : 'nav-link'}>{networkSuggestions?.totalRequests || 0} Requests</button></li>
                    </ul>
                    <div className="tab-content">
                        {activeFollower && activeFollower ? <Follower setCount={setDataCount} /> : null}
                        {activeFollowing && activeFollowing ? <Following setCount={setDataCount} /> : null}
                        {activeRequests && activeRequests ? <Requests setCount={setDataCount} /> : null}
                        {activeSuggestions && activeSuggestions ? <Suggestions setCount={setDataCount} /> : null}
                    </div>
                </div>
            </main>
        </PrivateRoute>
    );
}

export default Network;