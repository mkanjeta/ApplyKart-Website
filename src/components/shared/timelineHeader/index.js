import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import NotificationBar from '../notification-bar';
import NavBar from "components/shared/navbar";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
const TimelineHeader = () => {
  const router = useRouter();
  const [localStorageData, setLocalStorageData] = useState('');
  const [profile, setProfile] = useState(
    () => "/assets/images/placeholder.jpg"
  );
  const [name, setName] = useState(
    () => "N/a"
  );
  const [notificationBar, setNotificationBar] = useState(false);
  const handleToggleNotificationBar = () => {
    setNotificationBar(!notificationBar);
  }

  const [searchBar, setSearchBar] = useState(false);
  // const handleToggleSearchBar = () => {
  //   setSearchBar(!searchBar);
  // }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStorageData(localStorage?.getItem("applyKart"))
      const localStorageData = JSON.parse(
        localStorage?.getItem("applyKart")
      );
      let profilePic = '';
      let firstName = '';
      let lastName = '';
      let userName = '';

      profilePic = localStorageData?.profilePic
      firstName = localStorageData?.firstName
      lastName = localStorageData?.lastName
      userName = localStorageData?.userName

      setProfile(profilePic);
      if(firstName || lastName) {
        setName(`${firstName} ${lastName || ''}`);
      } else {
        setName(userName);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }
  return (
    <>
      <header className='header'>
        <div className='container d-flex justify-content-between w-100 align-items-center'>

          <div>
            <Link
              href={'/timeline'}
            >
              <a href='#'>
                <img src="/assets/images/dark-logo.svg" alt='applykar-logo' width="200px" height="50px" />
              </a>
            </Link>
          </div>

          {
            localStorageData && (
              <div
                className="content-area d-none d-md-block"
              // style={{ 
              //   width: 'calc(100% - 700px)', 
              //   flex: '1 1 auto', 
              //   marginLeft: 'calc(100% - 1000px)' 
              // }}
              >
                <NavBar />
              </div>
            )
          }

          {
            !localStorageData && (
              <div className="actions">
                <Link href="/login" passHref>
                  <button
                    type="button"
                    //onClick={loginClick}
                    className="btn btn-outline-info me-4"
                  >
                    Login
                  </button>
                </Link>
                <Link href="/register" passHref>
                  <button
                    type="button"
                    //onClick={registerClick}
                    className="btn btn-info"
                  >
                    Register
                  </button>
                </Link>
              </div>
            )
          }


          {
            localStorageData && (
              <>
                <div className='menu-row d-flex'>
                  {/* <div className='searchbar' /> */}
                  {/* <button type='button' className='d-md-none d-block notification' onClick={handleToggleSearchBar}>
              <i className={searchBar ? "bi bi-x-lg search-img":"icon-search search-img"}/>
            </button>
            <div className={searchBar ? "searchbar position-relative active" : "searchbar position-relative"}>
              <i className='icon-search search-img'></i>
              <input type="text" className='form-control' placeholder='Search job by category, title or company name' />
            </div> */}
                  {/* <ul className='nav-menu'>
            <li className='nav-link active'><Link href='/dashboard'><a><i className='icon-home_selected'></i>Home</a></Link></li>
            <li className='nav-link'><Link href='/jobs'><a><i className="icon-job_unselected"></i>My Jobs</a></Link></li>
            <li className='nav-link'><Link href='/networks'><a><i className='icon-network_selected'></i>Network</a></Link></li>
            <li className='nav-link'><Link href='/messages'><a><i className='icon-message_unselected'></i>Messages</a></Link></li>
            <li className='nav-link'><Link href='/legal'><a><i className='icon-legal_unselected'></i>Legal</a></Link></li>
          </ul> */}
                  <div>
                    <button type='button' className='notification' onClick={handleToggleNotificationBar}><i className='icon-bell' /> <span /></button>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle as="div" id="dropdown-basic" >
                    <i className="fa fa-bars" style={{fontSize:"20px"}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="ul" className='w-100 mt-2 custom-submenu' style={{minWidth: "12rem"}}>
                    <li><Dropdown.Item>
                      <div className="row">
                      <div className='profile-img col-4 p-1'>
                        <img src={profile ? profile.trim() : "/assets/images/profile.jpg"} alt={name || '-'} className='image-fit rounded-circle image' onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                      </div>
                      <span className='text-capitalize col-8 p-0'  style={{whiteSpace:"break-spaces"}}>{name}</span>
                      </div></Dropdown.Item></li>
                      <li><Dropdown.Item href="/timeline/my-profile">My Profile</Dropdown.Item></li>
                      <li><Dropdown.Item href="/profile/my-vcard">My V-Card</Dropdown.Item></li>
                      <li><Dropdown.Item href="/profile/calendar">Calendar</Dropdown.Item></li>
                      <li><Dropdown.Item href="/jobs/favorite">Favorite</Dropdown.Item></li>
                      <li><Dropdown.Item as={'button'} onClick={handleLogout}>Logout</Dropdown.Item></li>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </>
            )
          }

        </div>

        <div className="container mt-2">
        <div className="row">
                      <div
                        className="content-area navMobile d-block d-md-none"
                      // style={{ 
                      //   width: 'calc(100% - 700px)', 
                      //   flex: '1 1 auto', 
                      //   marginLeft: 'calc(100% - 1000px)' 
                      // }}
                      >
                        <NavBar />
                      </div>
          </div>    
        </div>

      </header>
      {notificationBar ? <NotificationBar action={handleToggleNotificationBar} state={notificationBar} /> : null}
    </>
  )
}
export default TimelineHeader;