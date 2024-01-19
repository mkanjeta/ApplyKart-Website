import Type1 from 'components/QRCodes/Type1';
import Type2 from 'components/QRCodes/Type2';
import Type3 from 'components/QRCodes/Type3';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PreviewJobQrCode = ({showModal, closeModal, qrType = 1, jobDetails}) => {

  return (
    <>
      <Modal show={showModal} onHide={closeModal}  centered dialogClassName='preview-job-qr-modal'>
        <Modal.Header closeButton>
          <h2>Preview Job QR Code</h2>
        </Modal.Header>
        <Modal.Body>
          {qrType == 1 ? <Type1 jobDetails={jobDetails}/> : <></>}
          {qrType == 2 ? <Type3 jobDetails={jobDetails}/> : <></>}
          {qrType == 3? <Type2 jobDetails={jobDetails}/> : <></>}
          {/* <div className='option-card-box option-card1'>
              <div className='option-card-inner-box '>
                  <img className='option-card-hand top-hand' src={"/assets/images/upper_hand_big.png"} alt="hand" />
                  <img className='option-card-hand bottom-hand' src={"/assets/images/lower_hand_big.png"} alt="hand" />
                  <img className='qr-logo' src={"/assets/images/logo-icon.png"} alt="logo" />
                  <h5 className='option-card-name'>ApplyKart.co</h5>
                  <img className='qr-img1' src={"/assets/images/qr-code.png"} alt="QrCode" />
                  <p className='option-card-hriring-text'>We are hiring for:</p>
                  <h4 className='option-card-post'>Marketing Manager</h4>
                  <p className='option-card-know-more'>Scan QR code to know more and apply</p>
              </div>
          </div> */}
          {/* <div className='modal-btn-grp'>
            <button className='btn'>
              <i className="far fa-arrow-to-bottom fs-6"></i>
              Save to device
            </button>
            <button className='btn'>
              <i className="fas fa-share fs-6"></i>
              Share
            </button>
            <button className='btn'>
              <i className="far fa-print fs-6"></i>
              Print
            </button>
          </div> */}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default PreviewJobQrCode;