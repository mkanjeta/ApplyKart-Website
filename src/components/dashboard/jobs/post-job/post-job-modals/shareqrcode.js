import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ShareQrCode = ({showModal, closeModal, setSelectedQr, handleSubmit, selectedQr}) => {

  // console.log(selectedQr);
  const setQr = (e) => {
    setSelectedQr(e.target.value)
  }

  return (
    <>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <h2>Generate a QR Code and share it with the job seekers</h2>
        </Modal.Header>
        <Modal.Body>
          <div className='qr-code-options'>
            <div className='option-card-wrap'>
              <label htmlFor="optionOne" className='option-card cursor-p'>
                <h3>Option 01</h3>
                <div className='option-card-box option-card1'>
                    <div className='option-card-inner-box '>
                        <img className='option-card-hand top-hand' src={"/assets/images/upper_hand.png"} alt="hand" />
                        <img className='option-card-hand bottom-hand' src={"/assets/images/lower_hand.png"} alt="hand" />
                        <img className='qr-logo' src={"/assets/images/logo-icon.png"} alt="logo" />
                        <h5 className='option-card-name'>ApplyKart.co</h5>
                        <img className='qr-img1' src={"/assets/images/qr-code.png"} alt="QrCode" />
                        <p className='option-card-hriring-text'>We are hiring for:</p>
                        <h4 className='option-card-post'>Marketing Manager</h4>
                        <p className='option-card-know-more'>Scan QR code to know more and apply</p>
                    </div>
                </div>
              </label>
              <div className='image_radio d-flex justify-content-center'>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="shareQr1"
                    id="optionOne"
                    value={1}
                    checked={parseInt(selectedQr) === 1}
                    onChange={setQr}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="optionOne"
                  >
                    <span className="icon">
                      <img
                        src="/assets/images/icons/radio/inactive.png"
                        alt="icon"
                      />
                      <img
                        src="/assets/images/icons/radio/active.png"
                        alt="icon"
                      />
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className='option-card-wrap'>
              <label htmlFor="optionTwo" className='option-card cursor-p'>
                <h3>Option 02</h3>
                <div className='option-card-box option-card2'>
                  <div className='option-card-header'>
                    <img className='option-card-header-logo' src={"/assets/images/logo-icon.png"} alt="logo" />
                    <h5 className='option-card-name'>ApplyKart.co</h5>
                  </div>
                  <div className='option-card-body'>
                    <img className='qr-img2' src={"/assets/images/qr-code.png"} alt="QrCode" />
                    <div className='option-card-box-divider' />
                    <p className="option-card-hriring-text">We are hiring for:</p>
                    <h4 className='option-card-post'>Marketing Manager</h4>
                    <p className='option-card-know-more'>Scan QR code to know more and apply</p>
                  </div>
                </div>
              </label>
              <div className='image_radio d-flex justify-content-center'>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="shareQr2"
                    id="optionTwo"
                    value={2}
                    checked={parseInt(selectedQr) === 2}
                    onChange={setQr}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="optionTwo"
                  >
                  <span className="icon">
                    <img
                      src="/assets/images/icons/radio/inactive.png"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/radio/active.png"
                      alt="icon"
                    />
                  </span>
                  </label>
                </div>
              </div>
            </div>
            <div className='option-card-wrap'>
              <label htmlFor="optionThree" className='option-card cursor-p'>
                <h3>Option 03</h3>
                <div className='option-card-box option-card3'>
                  <img className='mobile-img' src={"/assets/images/mobile-img.png"} alt="mobile" />
                  <div className='option-card-body'>
                    <div className='option-card-logo'>
                      <img src={"/assets/images/logo-icon.png"} alt="logo" />
                      <h5 className='option-card-name'>ApplyKart.co</h5>
                    </div>
                    <img className='qr-img2' src={"/assets/images/qr-code.png"} alt="QrCode" />
                    <div className='option-card-box-divider' />
                    <p className="option-card-hriring-text">We are hiring for:</p>
                    <h4 className='option-card-post'>Marketing Manager</h4>
                    <p className='option-card-know-more'>Scan QR code to know more and apply</p>
                  </div>
                </div>
              </label>
              <div className='image_radio d-flex justify-content-center'>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="shareQr3"
                    id="optionThree"
                    value={3}
                    checked={parseInt(selectedQr) === 3}
                    onChange={setQr}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="optionThree"
                  >
                  <span className="icon">
                    <img
                      src="/assets/images/icons/radio/inactive.png"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/radio/active.png"
                      alt="icon"
                    />
                  </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='text-center'>
            <button className='btn btn-warning' onClick={handleSubmit}>
              <img className='me-2' src={"/assets/images/icons/grid.svg"} alt="grid" />
              Select
              <i className="fal fa-long-arrow-right fs-4"></i>
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ShareQrCode;