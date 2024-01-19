import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from 'react-redux';
import jobBrowseReducer from 'redux/reducers/jobBrowseReducer';
import { getSubscriptionPlans } from 'redux/actions/jobBrowse';
import Loader from 'components/shared/loader';
import { baseUrl, clientSecret } from 'api/constant';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const JobPlanModal = ({showPlanModal, closeModal, jobId, redirect=''}) => {

  // console.log(redirect, )
  const { subscriptionPlans, subscriptionLoading } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  const { currentSubscriptionPlan } = useSelector(state=>state?.AuthReducer);
  const router = useRouter();
  const [type, setType] = useState('monthly');
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  // console.log(subscriptionPlans, currentSubscriptionPlan);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!subscriptionPlans?.length && showPlanModal){
      dispatch(getSubscriptionPlans());
    }
  }, [subscriptionPlans, showPlanModal])

  useEffect(()=>{
    if(subscriptionPlans?.length){
      setMonthly(subscriptionPlans.filter(item=>item?.planType == 'Free' || item?.planType == 'Monthly'));
      setYearly(subscriptionPlans?.filter(item=>item?.planType == 'Quarterly'))
    }
  }, [subscriptionPlans])

  const generatePaymentLink = (e, item) => {
    e.preventDefault();

    const applyKart = localStorage.getItem("applyKart");
    if (!applyKart) {
      return;
    }
    const { encryptedToken } = JSON.parse(applyKart);

    let body = {
                "productId": item?.stripeProductId,
                "productName": item?.description,
                "productPrice": item?.price,
                "currency":"AUD",
                "url": `${window.location.origin}/dashboard`,
                "jobId": jobId ? jobId : 0
              };
              const headers = {
                "content-type": "application/json",
                connection: "keep-alive",
                "X-Requested-With": "XMLHttpRequest",
                "client-secret": clientSecret,
                "authorization": encryptedToken
              };

    axios.post(`${baseUrl}/stripe/paymentLink`, body, {headers: headers})
    .then(response=>{
      if(response){
        // console.log(response?.data?.data?.paymentDetails?.url);
       window.location.href = response?.data?.data?.paymentDetails?.url, true;
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Try again later'
        })
      }
      
    })
    .catch(err=>{
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Try again later'
      })
    })

    // console.log(item);
  }
  
  if(subscriptionLoading){
    return <Loader />
  }

  return (
    <>
      <Modal show={showPlanModal} onHide={closeModal} size="lg" centered dialogClassName='job-plan-modal'>
        <Modal.Header closeButton>
          <h2>Choose your plan!</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div className="switch-container">
            <span className={`switch-label left ${type == 'monthly' ? 'active' : ''}`}>Monthly</span>
            <label className="switch-wrap">
              <input type="checkbox" checked={type == 'quaterly' ? 1 : 0} onClick={(e)=>{setType(e.target.checked ? 'quaterly' : 'monthly')}}/>
              <span className="switch-slider"></span>
            </label>
            <span className={`switch-label right ${type == 'quaterly' ? 'active' : ''}`}>Quaterly</span>
           
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='current-plan-status'>
            <p><span>Current Plan:</span>{currentSubscriptionPlan?.planType}</p>
            <p><span>Expires on:</span>{currentSubscriptionPlan?.expireOn ? currentSubscriptionPlan?.expireOn.split('T')[0] : 'Never'}</p>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            grabCursor={true}
            pagination={true}
            modules={[Pagination]}
              breakpoints={{
                768: {
                  slidesPerView: 2
                },
                992: {
                  slidesPerView: 3
                },
                1200: {
                  slidesPerView: 4
                },
              }}
            className="plan-slider-wrap"
          >
            {
              (type == 'monthly' ? monthly : yearly)?.map((item, key)=>(
            <SwiperSlide key={key}>
              <div className={`plan-slider-card ${currentSubscriptionPlan?.subscriptionPlanId == item?.subscriptionPlanId ? 'active' : ''}`}>
                <h4 className='plan-name'>{item?.description} Plan</h4>
                 <h3 className='plan-price'>{item?.price ? `$${item?.price}` : 'Free Plan'}</h3>
                <ul className='plan-description'>
                  <li>
                    <i className="fal fa-check check-icon"/>
                    <span>{item?.jobs} Job/Month</span></li>
                  <li>
                    <i className={`fal ${item?.qrEligible? 'fa-check check-icon' : 'fa-times cross-icon'}`}/>
                    <span>Generate QR Code</span>
                  </li>
                </ul>
                {
                  currentSubscriptionPlan?.subscriptionPlanId == item?.subscriptionPlanId ?
                  <button className='btn btn-warning w-100' disabled>
                 Current Plan
                </button>
                :
                <button className='btn btn-warning w-100' onClick={(e)=>{generatePaymentLink(e, item)}}>
                Get Started
              </button>
                }
               
              </div>
            </SwiperSlide>
              ))
            }
            {/* <SwiperSlide>
              <div className='plan-slider-card'>
                <h4 className='plan-name'>Basic Plan</h4>
                <h3 className='plan-price'>Free</h3>
                <ul className='plan-description'>
                  <li>
                    <i className="fal fa-check check-icon"/>
                    <span>1 Job/Month</span></li>
                  <li>
                    <i className="fal fa-times cross-icon"/>
                    <span>No QR Code</span>
                  </li>
                </ul>
                <button className='btn btn-warning w-100' >
                  Get Started
                </button>
              </div>
            </SwiperSlide> */}
            {/* <SwiperSlide>
              <div className='plan-slider-card active'>
                <h4 className='plan-name'>Small Biz Plan</h4>
                <h3 className='plan-price'>$29.99</h3>
                <ul className='plan-description'>
                  <li>
                    <i className="fal fa-check check-icon"/>
                    <span>5 Job/Month</span></li>
                  <li>
                    <i className="fal fa-times cross-icon"/>
                    <span>Generate QR Code</span>
                  </li>
                </ul>
                <button className='btn btn-warning w-100' >
                  Get Started
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='plan-slider-card'>
                <h4 className='plan-name'>Small Biz Plan</h4>
                <h3 className='plan-price'>$29.99</h3>
                <ul className='plan-description'>
                  <li>
                    <i className="fal fa-check check-icon"/>
                    <span>5 Job/Month</span></li>
                  <li>
                    <i className="fal fa-times cross-icon"/>
                    <span>Generate QR Code</span>
                  </li>
                </ul>
                <button className='btn btn-warning w-100' >
                  Get Started
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='plan-slider-card'>
                <h4 className='plan-name'>Small Biz Plan</h4>
                <h3 className='plan-price'>$29.99</h3>
                <ul className='plan-description'>
                  <li>
                    <i className="fal fa-check check-icon"/>
                    <span>5 Job/Month</span></li>
                  <li>
                    <i className="fal fa-times cross-icon"/>
                    <span>Generate QR Code</span>
                  </li>
                </ul>
                <button className='btn btn-warning w-100' >
                  Get Started
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='plan-slider-card'>
                <h4 className='plan-name'>Small Biz Plan</h4>
                <h3 className='plan-price'>$29.99</h3>
                <ul className='plan-description'>
                  <li>
                    <i className="fal fa-check check-icon"/>
                    <span>5 Job/Month</span></li>
                  <li>
                    <i className="fal fa-times cross-icon"/>
                    <span>Generate QR Code</span>
                  </li>
                </ul>
                <button className='btn btn-warning w-100' >
                  Get Started
                </button>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default JobPlanModal;