import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import NotificationBar from '../notification-bar';
import NavBar from 'components/shared/navbar';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import jobTitles from '../../../../public/assets/titles.json';

// import { Link } from 'react-router-dom';
const TimelineHeader = (props) => {
  const router = useRouter();
  const [localStorageData, setLocalStorageData] = useState('');
  const [profile, setProfile] = useState(() => '/assets/images/placeholder.jpg');
  const [name, setName] = useState(() => 'N/a');
  const [notificationBar, setNotificationBar] = useState(false);
  const [search, setSearch] = useState(() => '');
  const [showSearch, setShowSearch] = useState(false);
  const [change, onChange] = useState(false);
  const handleToggleNotificationBar = () => {
    setNotificationBar(!notificationBar);
  };

  const handleSearchClick = () => {
    console.log('here');
    return <></>;
  };

  const [searchBar, setSearchBar] = useState(false);
  // const handleToggleSearchBar = () => {
  //   setSearchBar(!searchBar);
  // }

  useEffect(()=>{
    setSearch(props.searchText)
  },[props.searchText]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocalStorageData(localStorage?.getItem('applyKart'));
      const localStorageData = JSON.parse(localStorage?.getItem('applyKart'));
      let profilePic = '';
      let firstName = '';
      let lastName = '';
      let userName = '';

      profilePic = localStorageData?.profilePic;
      firstName = localStorageData?.firstName;
      lastName = localStorageData?.lastName;
      userName = localStorageData?.userName;

      setProfile(profilePic);
      if (firstName || lastName) {
        setName(`${firstName} ${lastName || ''}`);
      } else {
        setName(userName);
      }
    }
  }, []);

  // useEffect(() => {

  // }, []);

  // useEffect(() => {

  //   let inputBox = document.querySelector('.input-box');
  //   let searchIcon = document.querySelector('.search');
  //   let closeIcon = document.querySelector('.close-icon');

  // searchIcon.addEventListener('click', () => {
  // inputBox.classList.add('open');
  // });

  //     closeIcon.addEventListener('click', () => {
  //       inputBox.classList.remove('open');
  //     });

  // },

  // []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // searchIcon.addEventListener('click', () => {
  //   inputBox.classList.add('open')
  // });

  // closeIcon.addEventListener('click', () => {
  //   inputBox.classList.remove('open')
  //   });

  const handleSearch = e => {
    e.preventDefault();
    if(!search || !search.length){
      document.querySelector('#searchTextMobile').placeholder = 'Please enter search text';
      document.querySelector('#searchTextMobile').style.border = '1px solid red';

      return false;
    }
    let obj = {
      search: search,
      WorkLocation: '',
    };
    // dispatch(getJobBrowseList(obj));
    router?.push(`/search?search=${search}`);
    // window.location.href = `/search?search=${search}`;
  };

  const handleIconClick = () => {
    setShowSearch(prev => !prev);
  };

  return (
    <>
      <header className="header">
        <div className="container d-flex justify-content-between w-100 align-items-center">
          <div>
            <Link href={'/timeline'}>
              <a className="logo" href="#">
                <img src="/assets/images/dark-logo.svg" alt="applykar-logo" style={{ maxWidth: '150px' }} />
              </a>
            </Link>
          </div>

          {/* <div >
            <button
              className="btn btn-warning search-btn d-block d-md-none btn-merge"
              // onClick={handleSearch}
              style={{ fontSize: '12px', lineHeight: '12px', padding: '5px 10px' }}
            >
              <span className="d-sm-block d-none" style={{margin:'0 10px 0 10px'}}>Search Job &nbsp;</span>
              <span className="btn-right-arrow">
                <img src={'/assets/images/right-arrow.svg'} alt="right-arrow" />
              </span>
            </button>
          </div> */}

          {/* <div className='d-block d-md-block d-lg-none'>
                        {/* let inputBox = document.querySelector('.input-box'),
                      const  searchIcon = document.querySelector('.search'),
                      const closeIcon = document.querySelector('.close-icon'); */}
          {/* <input
                        type="text"
                        className="banner-searchbar"
                        placeholder="Search Jobs By Title"
                        value={search}
                        list="titles"
                        style={{minHeight:"33px",padding:"0px 10px 0px 30px", border:'2px solid blue'}}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />    
          </div> */}
          {/* <div className="input-box d-lg-none">
              <input type="text" placeholder="Search..." />
              <span className="search"><img src="/assets/images/icon-search.svg" alt="search" /></span>
              <img src="/assets/images/right-arrow.svg" className="close-icon" alt="right-arrow" />
          </div> */}

          {localStorageData && (
            <div
              className="content-area d-none d-md-block"
              // style={{
              //   width: 'calc(100% - 700px)',
              //   flex: '1 1 auto',
              //   marginLeft: 'calc(100% - 1000px)'
              // }}
            >
              <NavBar searchText={search} />
            </div>
          )}

          {!localStorageData && (
            <div className="actions timelinelogin">
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
          )}

          {localStorageData && (
            <>
              <div className="menu-row d-flex">
                <span className="d-lg-none search-bar" onClick={handleIconClick}>
                  {showSearch ? (
                    <i className="fas fa-times" style={{ width: '18px' }}></i>
                  ) : (
                    <i className="fas fa-search" style={{ width: '18px' }}></i>
                  )}
                </span>

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
                  <button type="button" className="notification" onClick={handleToggleNotificationBar}>
                    <i className="icon-bell" /> <span />
                  </button>
                </div>
                <Dropdown>
                  <Dropdown.Toggle as="div" id="dropdown-basic">
                    <i className="fa fa-bars" style={{ fontSize: '20px' }}></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="w-100 mt-2 custom-submenu"
                    style={{ minWidth: '12rem' }}
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    <li>
                      <Dropdown.Item onClick={()=>{router.push("/timeline/my-profile")}}>
                        <div className="row">
                          <div className="profile-img col-4 p-1">
                            <img
                              src={profile ? profile.trim() : '/assets/images/profile.jpg'}
                              alt={name || '-'}
                              className="image-fit rounded-circle image"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = '/assets/images/profile.jpg';
                              }}
                            />
                          </div>
                          <span className="text-capitalize col-8 p-0" style={{ whiteSpace: 'break-spaces' }}>
                            {name}
                          </span>
                        </div>
                      </Dropdown.Item>
                    </li>
                    <li>
                      <div
                        className="content-area navMobile menumobile d-block d-md-none"
                        // style={{
                        //   width: 'calc(100% - 700px)',
                        //   flex: '1 1 auto',
                        //   marginLeft: 'calc(100% - 1000px)'
                        // }}
                      >
                        <NavBar />
                      </div>
                    </li>
                    <li>
                      <Dropdown.Item onClick={()=>{router.push("/timeline/my-profile")}}>My Profile</Dropdown.Item>
                    </li>
                    <li>
                      <Dropdown.Item onClick={()=>{router.push("/profile/my-vcard")}}>My V-Card</Dropdown.Item>
                    </li>
                    <li>
                      <Dropdown.Item onClick={()=>{router.push("/profile/calendar")}}>Calendar</Dropdown.Item>
                    </li>
                    <li>
                      <Dropdown.Item onClick={()=>{router.push("/jobs/favorite")}}>Favorite</Dropdown.Item>
                    </li>
                    <li>
                      <Dropdown.Item as={'button'} onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </>
          )}
        </div>
        {/* <li class="mobilehide"> */}
        {/* <form onSubmit={handleSearch}> */}
        <div className="container mt-0 ">
          <div className="row search-bar-icon">
            {showSearch && (
              <div className="input-container">
                <input
                  type="text"
                  id="searchTextMobile"
                  className="banner-searchbar combine-search-bar"
                  placeholder="Search Applykart"
                  value={search}
                  list="titles"
                  style={{ minHeight: '33px', padding: '0px 10px 0px 30px', border: '2px solid #1F47E3' }}
                  onChange={e => {
                    setSearch(e.target.value);
                    document.querySelector('#searchTextMobile').style.border = '';
                  }}
                />
                <datalist id="titles">
                  {search &&
                    search.length > 3 &&
                    jobTitles.titles.map((item, key) => <option key={key} value={_.capitalize(item)} />)}
                </datalist>

                <span className="btn-right-arrow combine-btn-right-arrow">
                  <img src={'/assets/images/right-arrow.svg'} alt="right-arrow" onClick={handleSearch} />
                </span>
              </div>
            )}
          </div>
        </div>
        {/* </form> */}
        {/* </li> */}
      </header>
      {notificationBar ? <NotificationBar action={handleToggleNotificationBar} state={notificationBar} /> : null}
    </>
  );
};
export default TimelineHeader;
