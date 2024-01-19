import TimelineHeader from 'components/shared/timelineHeader';
import React, { useState } from 'react';
import TrendingTags from '../network/trending-tags';
import ShareViaModal from 'components/modals/shareViaModal';
import JobPreferenceModal from 'components/modals/jobPreferenceModal';
import SetAvailabilityModal from 'components/modals/setAvailbilityModal';
import ProfileCard from './profileCard';
import AboutCard from './aboutCard';
import ExperienceCard from './experienceCard';
import SkillsCard from './skillsCard';
import PortfolioCard from './portfolioCard';
import EducationCard from './educationCard';
import PostItem from 'components/timeline/posts/postItem';
import HighlightCard from './highlightCard';
import { useQRCode } from 'next-qrcode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../redux/actions/myProfileActions";
import domtoimage from 'dom-to-image';
import { useRouter } from 'next/router';
import Loader from 'components/shared/loader';
import PrivateRoute from 'components/privateRoute';
import { TimeLinePosts } from 'components/timeline/posts';
import CommonPosts from 'components/timeline/posts/commonPosts';

function MyProfile(props) {
    const [userId, setUserId] = useState(0);
    const [userInfo, setUserInfo] = useState();
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const [originUrl, setOriginUrl] = useState('');
    const { Image } = useQRCode();
    // const [shareModal, setShareModal] = useState(false);
    const handleToggleShareModal = () => {
        // setShareModal(!shareModal)
        domtoimage.toBlob(document.getElementById('profile-qr-code'))
            .then(function (blob) {
                const link = window.URL.createObjectURL(blob);
                navigator.share(
                    {
                        link,
                        title: 'Profile QR',
                        text: 'Profile QR Code'
                    }
                ).then((res) => { }).catch(err => { console.log(err) });
            })
    }
    const [preferenceModal, setPreferenceModal] = useState(false);
    const handleTogglePreferenceModal = () => {
        setPreferenceModal(!preferenceModal)
    }
    const [availabilityModal, setAvailabilityModal] = useState(false);
    const handleToggleAvailabilityModal = () => {
        setAvailabilityModal(!availabilityModal)
    }
    const dispatch = useDispatch();
    const [mediaUploadProcess, setMediaUploadProcess] = useState(false);
    const { myProfile, updateMyProfile, myExperience, myPortfolio, updateSkills, updatePortfolio, addPortfolio, updateExperience, updateEducation, loading, updateJobPreferences,updateJobAvailability } = useSelector(({ myProfileReducer }) => myProfileReducer);
    useEffect(() => {
        if (router.asPath?.includes('userId')) {
            setVisible(true);
            dispatch(action.getMyProfile({
                UserId: router.asPath.split('userId=')[1]
            }));
            dispatch(action.getMyExperience({
                UserId: router.asPath.split('userId=')[1]
            }));
            dispatch(action.getMyPortfolio({
                UserId: router.asPath.split('userId=')[1]
            }));
        } else {
            setVisible(false);
            dispatch(action.getMyProfile({
                UserId: 0
            }));
            dispatch(action.getMyExperience({
                UserId: 0
            }));
            dispatch(action.getMyPortfolio({
                UserId: 0
            }));
        }
    }, []);
    useEffect(() => {
        if (updateMyProfile?.success || updateSkills?.success || updatePortfolio?.message || addPortfolio?.success || updateExperience?.success || updateEducation?.success || updateJobPreferences?.success || updateJobAvailability?.success) {
            if (router.asPath?.includes('userId')) {
                setVisible(true);
                dispatch(action.getMyProfile({
                    UserId: router.asPath.split('userId=')[1]
                }));
                dispatch(action.getMyExperience({
                    UserId: router.asPath.split('userId=')[1]
                }));
                dispatch(action.getMyPortfolio({
                    UserId: router.asPath.split('userId=')[1]
                }));
            } else {
                setVisible(false);
                dispatch(action.getMyProfile({
                    UserId: 0
                }));
                dispatch(action.getMyExperience({
                    UserId: 0
                }));
                dispatch(action.getMyPortfolio({
                    UserId: 0
                }));
            }
        }
    }, [updateMyProfile?.success, updateSkills?.success, updatePortfolio?.message, addPortfolio?.success, updateExperience?.success, updateEducation?.success, updateJobPreferences?.success, updateJobAvailability?.success]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOriginUrl(window.location.origin);
        }
    }, []);
    useEffect(() => {
        const applyKart = localStorage.getItem("applyKart");
        if (!applyKart) {
            return false;
        } else {
            const userData = JSON.parse(applyKart)
            setUserInfo(JSON.parse(applyKart));
            setUserId(userData?.userId)
        }
    }, []);
    // useEffect(() => {
    //     if (myProfile) {
    //         console.log(myProfile, "myProfile");
    //         console.log(myExperience, "myProfileex");
    //     }
    // }, [myProfile]);
    const downloadQR = (e) => {
        e.preventDefault();
        domtoimage.toBlob(document.getElementById('profile-qr-code'))
            .then(function (blob) {
                const link = window.URL.createObjectURL(blob);
                let downloadLink = document.createElement("a");
                downloadLink.href = link;
                downloadLink.download = `user-profile-${myProfile?.user_Id}.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });
    };
    const printQr = e => {
        e.preventDefault();
        domtoimage.toBlob(document.getElementById('profile-qr-code'))
            .then(function (blob) {
                const link = window.URL.createObjectURL(blob);
                var printW = window.open(link);
                printW.document.close();
                printW.focus();
                printW.print();
            });
    }

    return (
        <PrivateRoute>
            <main className="main_wrapper wrapper_style_two">
                <TimelineHeader />
                {loading || mediaUploadProcess && <Loader />}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <ProfileCard item={myProfile} data={myExperience} show={visible} />
                            <AboutCard show={visible} allItem={myProfile} item={myExperience} />
                            {visible ? <HighlightCard item={myExperience} /> : null}
                            <ExperienceCard show={visible} allItem={myProfile} experience={myExperience} />
                            <SkillsCard show={visible} item={myProfile} />
                            <PortfolioCard show={visible} portfolio={myPortfolio} item={myProfile} />
                            <EducationCard show={visible} education={myExperience} allItem={myProfile} />
                            {/* <h5 className='text-black mb-xl-30 text-left h3 fw-600'>All Posts</h5>
                            <CommonPosts userInfo={userInfo} id={userId} setMediaUploadProcess={setMediaUploadProcess} /> */}
                        </div>
                        <div className="col-lg-3">
                            <div className="qr-code-box">
                                <h6 className='title'>QR Code</h6>
                                <button type='button' className='share-btn' onClick={handleToggleShareModal}>
                                    <i className='icon-share-icon' />
                                </button>
                                <div className="qr-image">
                                    <div className='position-relative' id={'profile-qr-code'}>
                                        <Image
                                            text={`${originUrl}/timeline/my-profile?userId=${myProfile?.user_Id}`}
                                            options={{
                                                level: 'M',
                                                margin: 3,
                                                scale: 4,
                                                width: 200,
                                                color: {
                                                    dark: '#000000',
                                                    light: '#FFFFFF',
                                                },
                                            }}
                                        />
                                        <img className='qr-img1 position-absolute' style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} height="50" src={"/assets/qr-pin.png"} alt="QrCode" />
                                    </div>
                                    {/* <img src='/assets/images/qr-image.png' alt='img' /> */}
                                </div>
                                <ul className="qr-code-box-footer">
                                    <li>
                                        <button type='button' onClick={downloadQR}><i className='icon-download' />
                                            Save to Device</button>
                                    </li>
                                    <li>
                                        <button type='button' onClick={printQr}><i className='icon-printer' />
                                            Print QR Code</button>
                                    </li>
                                </ul>
                            </div>
                            <ul className='single-bars'>
                                <li>
                                    <button type='button' onClick={handleTogglePreferenceModal}>Job Preference <i className='icon-back_chev' /></button>
                                </li>
                                <li>
                                    <button type='button' onClick={handleToggleAvailabilityModal}>Set Availability <i className='icon-back_chev' /></button>
                                </li>
                            </ul>
                            <TrendingTags />
                        </div>
                    </div>
                </div>
                {/* <ShareViaModal action={handleToggleShareModal} state={shareModal} size={"sm"} /> */}
                {preferenceModal ? <JobPreferenceModal action={handleTogglePreferenceModal} state={preferenceModal} allData={myProfile} size={"md"} /> : null}
                {availabilityModal ? <SetAvailabilityModal action={handleToggleAvailabilityModal} state={availabilityModal} size={"md"} allData={myProfile} /> : null}
            </main>
        </PrivateRoute>
    );
}

export default MyProfile;