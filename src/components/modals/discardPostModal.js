import React, { useState } from 'react';
import ModalLayout from './modalLayout';
import Lottie from "lottie-react";
import questionAnimation from "../../../public/assets/animations/question.json";
import SuccessPostModal from './successPostModal';

function DiscardPostModal(props) {
    
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <div className="timeline-modal-layout">
                <h4 className='title-header'><button type='button' className='back-button' onClick={props.action}> <i className="fal fa-chevron-left" /> </button> Discard post</h4>
                <div className="success-modal py-5">
                    <div className="icon">
                        <Lottie animationData={questionAnimation} />
                    </div>
                    <h5 className='title fw-500'>You haven’t finished your post yet. Are you sure you want to leave and discard your post?</h5>
                </div>
                {/* buttons area */}
                <div className="buttons-area justify-content-end">
                    <div className="action-buttons">
                        <button type="button" className="btn btn-transparent" onClick={props.action}>Cancel</button>
                        <button type="button" className="btn btn-primary"  onClick={handleToggleSuccessModal}>Discard</button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
}

export default DiscardPostModal;