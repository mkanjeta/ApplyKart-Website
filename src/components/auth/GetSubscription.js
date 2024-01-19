import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentPlan, updateQRType, validateSession } from 'redux/actions/authActions';
import { useRouter } from 'next/router';
import { GET_CURRENT_PLAN_RESET, UPDATE_QR_TYPE_FAILED, VALIDATE_SESSION_FAILED } from 'redux/actionTypes/auth.actionTypes';
import { Modal } from 'react-bootstrap';
import ShareQrCode from 'components/dashboard/jobs/post-job/post-job-modals/shareqrcode';
import { postedNewJob } from 'redux/actions/jobBrowse';


const GetSubscription = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, currentSubscriptionPlan, planSuccess, sessionValidateSuccess, qrUpdated } = useSelector(state => state?.AuthReducer);
  const { redirect, jobDetail, status } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  const [show, setShow] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [selectedQr, setSelectedQr] = useState('')
  // useEffect(() => {
  //   if (isLoggedIn && typeof window != 'undefined') {
  //     let userType = localStorage.getItem("userTypeId");
  //     if (userType == 3) {
  //       dispatch(getCurrentPlan());
  //     }
  //   }
  // }, [isLoggedIn])

  useEffect(() => {
    if (router?.query?.session_id) {
      dispatch(validateSession({ sessionId: router?.query?.session_id }));
    }
  }, [router])


  useEffect(() => {
    if (sessionValidateSuccess) {
      setShowQr(true);
      dispatch({ type: VALIDATE_SESSION_FAILED })
      // dispatch(getCurrentPlan());

    }
  }, [sessionValidateSuccess])

  useEffect(() => {
    if (qrUpdated) {
      setShowQr(false);
      dispatch({ type: UPDATE_QR_TYPE_FAILED });
      dispatch(getCurrentPlan());
    }
  }, [qrUpdated])

  useEffect(() => {

    if (planSuccess) {
      dispatch({ type: GET_CURRENT_PLAN_RESET })
      if (localStorage.getItem('unsavedJob')) {
        setShow(true);
      }
    }
  }, [planSuccess])

  const handleClose = () => {
    localStorage.removeItem('unsavedJob');
    // router.push('/dashboard');
    setShow(false);
  };
  const postUnsavedJob = () => {
    let obj = JSON.parse(localStorage.getItem('unsavedJob'));
    dispatch({ type: "POSTED_NEW_JOB_INIT" });
    dispatch(postedNewJob(obj));
  }

  useEffect(() => {
    if (redirect && !router?.pathname.includes('/jobs/post-job')) {
      dispatch({ type: "RESET_REDIRECT_FALSE" });
      setShow(false)
      router.push(`/jobs/details/${jobDetail.job_Id}`);
    }
  }, [redirect])

  const handleSubmit = () => {
    if (selectedQr) {
      let applykart = JSON.parse(localStorage.getItem('applyKart'))?.userId;
      let obj = {
        "user_id": applykart,
        "action_type": "qr",
        "value": parseInt(selectedQr)
      }
      dispatch(updateQRType(obj));
    }
  }

  return <>
    <Modal
      size="sm"
      className="custom_modal"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title className="fw-600">Unsaved job found, do you want to post?</Modal.Title>
        <button
          type="button"
          className="btn-close m-0"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <h5>You'll be redirected to job details once job posted</h5>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="submit"
          onClick={postUnsavedJob}
          className="btn btn-warning mx-auto w-75"
        >
          Yes <i className="fal fa-long-arrow-right"></i>
        </button>
        <button
          type="submit"
          onClick={handleClose}
          className="btn btn-warning mx-auto w-75"
        >
          No <i className="fal fa-long-arrow-right"></i>
        </button>
      </Modal.Footer>
    </Modal>

    <ShareQrCode showModal={showQr} closeModal={() => { setShowQr(false) }} setSelectedQr={setSelectedQr} selectedQr={selectedQr} handleSubmit={handleSubmit} />
  </>
}

export default GetSubscription;